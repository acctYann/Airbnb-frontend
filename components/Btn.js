import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const Btn = ({ title, setFunction, backgroundColor }) => {
  return (
    <TouchableOpacity
      style={backgroundColor ? [styles.btn, styles.bg] : styles.btn}
      onPress={() => {
        setFunction();
      }}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Btn;

const styles = StyleSheet.create({
  btn: {
    borderColor: "#F9575C",
    borderWidth: 3,
    borderRadius: 50,
    height: 60,
    width: 200,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  bg: {
    backgroundColor: "#E7E7E7",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#848484",
  },
});
