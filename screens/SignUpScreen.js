import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import Constants from "expo-constants";

// Components
import Logo from "../components/Logo";
import Input from "../components/Input";
import InputMulti from "../components/InputMulti";
import Btn from "../components/Btn";
import RedirectBtn from "../components/RedirectBtn";
import HidePassword from "../components/HidePassword";

// Dimensions
const windowHeight = Dimensions.get("window").height;
const statusBarHeight = Constants.statusBarHeight;
const scrollViewHeight = windowHeight - statusBarHeight;

const SignUpScreen = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const submit = async () => {
    // Vérifier que tout est remplis
    if (email && username && password && confirmPassword && description) {
      // Vérifier que les 2 MDP sont identiques
      if (password === confirmPassword) {
        setError("");
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email,
              password,
              description,
              username,
            }
          );
          // console.log(response.data);
          setToken(response.data.token);
        } catch (error) {
          console.log(error.response.status);
          console.log(error.response.data); //  { "error": "This username already has an account." }
          if (
            error.response.data.error ===
              "This username already has an account" ||
            error.response.data.error === "This email already has an account."
          ) {
            setError(error.response.data.error);
          } else {
            setError("An error occurred");
          }
        }
      } else {
        setError("Passwords must be the same");
      }
    } else {
      setError("Please fill all fields");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
        <Logo />
        <Text style={styles.title}>Sign up</Text>
        <Input
          setFunction={setEmail}
          placeholder="email"
          keyboardType="email-address"
        />
        <Input setFunction={setUsername} placeholder="username" />
        <InputMulti
          placeholder="Descible yourself in a few words..."
          setFunction={setDescription}
        />
        <View
          style={(styles.view, { flexDirection: "row", marginHorizontal: 15 })}
        >
          <Input
            setFunction={setPassword}
            placeholder="password"
            secureTextEntry={hidePassword ? true : false}
          />
          <HidePassword
            hidePassword={hidePassword}
            setHidePassword={setHidePassword}
          />
        </View>
        <Input
          setFunction={setConfirmPassword}
          placeholder="confirm password"
          secureTextEntry={hidePassword ? true : false}
        />
        <View style={styles.view}>
          <Text style={{ marginTop: 30, color: "#EB5A62" }}>{error}</Text>
          <Btn title="Sign up" setFunction={submit} />
          <RedirectBtn
            title="Already have an account ? Sign in"
            screen="SignIn"
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboard: {
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    height: scrollViewHeight,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  view: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 30,
    color: "#848484",
  },
});

export default SignUpScreen;
