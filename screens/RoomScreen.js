import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import LoadingIndicator from "../components/LoadingIndicator";

const RoomScreen = ({ route }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayAllText, setDisplayAllText] = useState(false);

  const id = route.params.id;

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fecthData();
  }, [id]);

  const displayStars = (ratingValue) => {
    const tab = [];
    for (let i = 0; i < 5; i++) {
      if (ratingValue > i) {
        tab.push(<Entypo name="star" size={24} color="#FFB000" key={i} />);
      } else {
        tab.push(<Entypo name="star" size={24} color="#BBBBBB" key={i} />);
      }
    }
    return tab;
  };

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <ScrollView style={styles.container} keyExtractor={(item) => item._id}>
      <SwiperFlatList
        horizontal={true}
        index={0}
        showPagination
        data={data.photos}
        renderItem={({ item }) => (
          <ImageBackground source={{ uri: item.url }} style={styles.bgImg}>
            <View style={styles.priceView}>
              <Text style={styles.priceText}>{data.price} €</Text>
            </View>
          </ImageBackground>
        )}
      />
      <View style={styles.view}>
        <View style={styles.content}>
          <View style={styles.titleContent}>
            <Text numberOfLines={1} style={styles.title}>
              {data.title}
            </Text>
            <View style={styles.reviews}>
              {displayStars(data.ratingValue)}
              <Text style={styles.reviewsText}>{data.reviews} reviews</Text>
            </View>
          </View>
          <View>
            <Image
              source={{
                uri: data.user.account.photo.url,
              }}
              style={styles.userImg}
            ></Image>
          </View>
        </View>
        <Text
          style={styles.description}
          numberOfLines={!displayAllText ? 3 : null}
          onPress={() => {
            setDisplayAllText(!displayAllText);
          }}
        >
          {data.description}
        </Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: data.location[1],
          longitude: data.location[0],
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: data.location[1],
            longitude: data.location[0],
          }}
          title={data.title}
        />
      </MapView>
    </ScrollView>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bgImg: {
    width: Dimensions.get("window").width,
    height: 250,
    justifyContent: "flex-end",
  },
  priceView: {
    backgroundColor: "black",
    width: 110,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  priceText: {
    color: "white",
    fontSize: 20,
  },
  view: {
    marginHorizontal: 20,
  },
  content: {
    width: Dimensions.get("window").width * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleContent: {},
  title: {
    width: Dimensions.get("window").width * 0.66,
    fontSize: 22,
    marginVertical: 20,
  },
  reviews: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewsText: {
    marginLeft: 10,
    color: "#BBBBBB",
  },
  userImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  description: {
    marginBottom: 20,
    fontSize: 15,
    lineHeight: 22,
  },
  map: { width: "100%", height: 300 },
});
