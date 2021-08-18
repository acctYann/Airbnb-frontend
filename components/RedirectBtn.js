import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const RedirectBtn = ({ title, screen }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={() => {
        navigation.navigate(screen);
      }}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default RedirectBtn;

const styles = StyleSheet.create({
  btn: {
    marginTop: 20,
  },
  text: {
    color: "#848484",
  },
});
