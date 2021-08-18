import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const BackBtn = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <MaterialIcons name="arrow-back" size={24} color="#737373" />
    </TouchableOpacity>
  );
};

export default BackBtn;
