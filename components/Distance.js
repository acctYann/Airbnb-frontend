import { Text, StyleSheet } from "react-native";
import React from "react";
import { getDistance, convertDistance } from "geolib";

const Distance = ({ location, latitude, longitude }) => {
  let distance = getDistance(
    {
      latitude: latitude,
      longitude: longitude,
    },
    { latitude: location[1], longitude: location[0] }
  );

  return (
    <Text style={styles.text}>
      Distance: {convertDistance(distance, "km").toFixed(2)}km
    </Text>
  );
};

export default Distance;

const styles = StyleSheet.create({
  text: {
    width: 110,
    fontSize: 12,
    textAlign: "center",
    backgroundColor: "#fff",
  },
});
