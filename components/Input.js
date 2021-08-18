import React from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = ({
  setFunction,
  placeholder,
  secureTextEntry,
  keyboardType,
  setDisplayMessage,
  setIsInfoModified,
  type,
  value,
}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      value={value && value}
      textContentType={type}
      keyboardType={keyboardType ? keyboardType : "default"}
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

export default Input;

const styles = StyleSheet.create({
  input: {
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    width: "80%",
    height: 40,
    marginBottom: 10,
    fontSize: 16,
  },
});
