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
import Btn from "../components/Btn";
import RedirectBtn from "../components/RedirectBtn";
import HidePassword from "../components/HidePassword";

// Dimensions
const windowHeight = Dimensions.get("window").height;
const statusBarHeight = Constants.statusBarHeight;
const scrollViewHeight = windowHeight - statusBarHeight;

const SignInScreen = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const submit = async () => {
    // Vérifier que tout est remplis
    if (email && password) {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email,
            password,
          }
        );
        // console.log(response.data);
        setToken(response.data.token);
      } catch (error) {
        console.log(error.response.status);
        console.log(error.response.data);
        if (error.response.data.error === "Unauthorized") {
          setError(error.response.data.error);
        } else {
          setError("An error occurred");
        }
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
      <KeyboardAwareScrollView>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.view}>
            <Logo />
            <Text style={styles.title}>Sign in</Text>
          </View>
          <View style={styles.view}>
            <Input
              setFunction={setEmail}
              placeholder="email"
              keyboardType={"email-address"}
            />
            <View
              style={
                (styles.view, { flexDirection: "row", marginHorizontal: 15 })
              }
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
          </View>
          <View style={styles.view}>
            <Text style={{ marginTop: 30, color: "#EB5A62" }}>{error}</Text>
            <Btn title="Sign in" setFunction={submit} />
            <RedirectBtn title="No account ? Register" screen="SignUp" />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    height: scrollViewHeight,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
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

export default SignInScreen;
