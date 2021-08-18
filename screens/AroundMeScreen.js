import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import LoadingIndicator from "../components/LoadingIndicator";
import Distance from "../components/Distance";

const AroundMeScreen = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const askPermission = async () => {
      try {
        // Demander la permission d'accès aux coordonnées de l'appareil
        const { status } = await Location.requestForegroundPermissionsAsync();
        // console.log({ status }); // "status": "granted",
        let response;
        if (status === "granted") {
          // 1 - récupérer les coordonnées GPS (et les stocker dans un state pour ensuite pouvoir centrer la carte sur l'emplacement du user)
          // 2 - requête pour récupérer les annonces aux alentours du user (envoyer les coordonnées GPS en query)
          const location = await Location.getCurrentPositionAsync();
          // console.log(location); // "latitude": 37.785834,  "longitude": -122.406417,
          setUserLatitude(location.coords.latitude);
          setUserLongitude(location.coords.longitude);

          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );
          // si accès aux coordonnées GPS refusé :
        } else {
          // 1 - requête pour récupérer les annonces (pas d'envoi de coordonnées GPS en query)

          response = await axios.get(
            "https://express-airbnb-api.herokuapp.com/rooms/around"
          );
        }

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    askPermission();
  }, []);

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: userLatitude ? userLatitude : 48.856614,
        longitude: userLongitude ? userLongitude : 2.3522219,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      showsUserLocation={true}
    >
      {data.map((item, index) => {
        return (
          <Marker
            style={styles.marker}
            key={index}
            onPress={() => {
              navigation.navigate("Room", { id: item._id });
            }}
            coordinate={{
              latitude: item.location[1],
              longitude: item.location[0],
            }}
          >
            <Text numberOfLines={1} style={styles.text}>
              {item.title}
            </Text>
            {userLatitude && userLongitude && (
              <Distance
                location={item.location}
                latitude={userLatitude}
                longitude={userLongitude}
              />
            )}
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={35}
              color="#EB5A62"
            />
          </Marker>
        );
      })}
    </MapView>
  );
};

export default AroundMeScreen;
const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  marker: {
    alignItems: "center",
    width: 100,
  },
  text: {
    width: 110,
    textAlign: "center",
    padding: 5,
    fontSize: 15,
    fontWeight: "700",
    backgroundColor: "#fff",
  },
});
