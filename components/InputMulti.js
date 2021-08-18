import React from "react";
import { StyleSheet, TextInput } from "react-native";

const InputMulti = ({
  placeholder,
  setFunction,
  setDisplayMessage,
  setIsInfoModified,
  value,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      maxLength={250}
      numberOfLines={10}
      multiline={true}
      value={value && value}
      onChangeText={(text) => {
        setFunction(text);
        if (setDisplayMessage) {
          setDisplayMessage(false);
        }
        if (setIsInfoModified) {
          setIsInfoModified(true);
        }
      }}
    />
  );
};

export default InputMulti;

const styles = StyleSheet.create({
  input: {
    textAlignVertical: "top",
    borderColor: "#FFBAC0",
    borderWidth: 2,
    width: "80%",
    height: 100,
    marginTop: 15,
    marginBottom: 20,
    fontSize: 16,
    padding: 10,
  },
});
