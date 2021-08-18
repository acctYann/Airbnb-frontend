import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";

import LoadingIndicator from "../components/LoadingIndicator";

// const width = Dimensions.get("window").width;
// const height = Dimensions.get("window").height;
// console.log(width);
// console.log(height);

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fecthData();
  }, []);

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

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          style={styles.flatList}
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            // console.log(item.title);
            return (
              <TouchableOpacity
                style={styles.container}
                onPress={() => {
                  navigation.navigate("Room", {
                    id: item._id,
                  });
                }}
              >
                <ImageBackground
                  source={{ uri: item.photos[0].url }}
                  style={styles.bgImg}
                >
                  <View style={styles.priceView}>
                    <Text style={styles.priceText}>{item.price} €</Text>
                  </View>
                </ImageBackground>
                <View style={styles.view}>
                  <View style={styles.content}>
                    <View style={styles.titleContent}>
                      <Text numberOfLines={1} style={styles.title}>
                        {item.title}
                      </Text>
                      <View style={styles.reviews}>
                        {displayStars(item.ratingValue)}
                        <Text style={styles.reviewsText}>
                          {item.reviews} reviews
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Image
                        source={{
                          uri: item.user.account.photo.url,
                        }}
                        style={styles.userImg}
                      ></Image>
                    </View>
                  </View>
                  <View style={styles.divider}></View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: "#fff",
  },
  container: {
    alignItems: "center",
  },
  bgImg: {
    width: Dimensions.get("window").width * 0.9,
    height: 250,
    justifyContent: "flex-end",
    marginTop: 20,
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
    width: Dimensions.get("window").width * 0.9,
  },
  content: {
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
  divider: {
    borderColor: "#BBBBBB",
    borderWidth: 0.5,
  },
});
