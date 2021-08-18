import React from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const HidePassword = ({ hidePassword, setHidePassword }) => {
  return (
    <View style={styles.view}>
      {hidePassword ? (
        <Feather
          name="eye"
          size={24}
          color="#848484"
          onPress={() => setHidePassword(false)}
        />
      ) : (
        <Feather
          name="eye-off"
          size={24}
          color="#848484"
          onPress={() => setHidePassword(true)}
        />
      )}
    </View>
  );
};
export default HidePassword;

const styles = StyleSheet.create({
  view: {
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    height: 40,
    paddingTop: 10,
  },
});
