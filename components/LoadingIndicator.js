import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";

const LoadingIndicator = () => {
  return (
    <ActivityIndicator
      style={styles.activityIndicator}
      size="large"
      color="#EB5A62"
    />
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  activityIndicator: {
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
  },
});
