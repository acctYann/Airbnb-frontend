import React from "react";
import { StyleSheet, Text } from "react-native";

const InlineErrorMessage = ({ content }) => {
  return <Text style={styles.text}>{content}</Text>;
};

const styles = StyleSheet.create({
  text: { color: "#EB5A62", marginVertical: 16, textAlign: "center" },
});

export default InlineErrorMessage;
