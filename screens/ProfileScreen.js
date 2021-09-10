import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

// Icons
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

// Components
import LoadingIndicator from "../components/LoadingIndicator";
import Btn from "../components/Btn";
import Input from "../components/Input";
import InputMulti from "../components/InputMulti";
import ErrorMessage from "../components/ErrorMessage ";

function ProfileScreen({ userToken, userId, setToken, setId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [isPictureModified, setIsPictureModified] = useState(false);
  const [isInfoModified, setIsInfoModified] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(null);

  // Récupérer les données de l'API lorsque l'écran est monté :
  useEffect(() => {
    fetchData();
  }, []);

  // Fonction conservée en dehors de useEffet à appeler ailleurs :
  const fetchData = async () => {
    try {
      // Récupération des données utilisateur :
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setEmail(response.data.email);
      setUsername(response.data.username);
      setDescription(response.data.description);
      // Uniquement si une photo est disponible :
      if (response.data.photo) {
        setPicture({ uri: response.data.photo[0].url });
      }
      // Données chargées.
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
      setIsLoading(false);
    }
  };

  // Mettre à jour les informations de profil et/ou la photo :
  const updateProfile = async () => {
    setDisplayMessage(false);

    // A la presse, si image/infos ont été modifiées, lancez le chargement :
    if (isPictureModified || isInfoModified) {
      setIsLoading(true);

      // Si l'image est modifiée, envoyez une demande de mise à jour :
      if (isPictureModified) {
        try {
          const uri = picture.uri;
          const uriParts = uri.split(".");
          const fileType = uriParts[1];

          const formData = new FormData();
          formData.append("photo", {
            uri,
            name: `userPicture`,
            type: `image/${fileType}`,
          });

          const response = await axios.put(
            `https://express-airbnb-api.herokuapp.com/user/upload_picture`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );

          if (response.data) {
            console.log("res", response.data);
            // Une nouvelle image s'affichera à l'écran :
            setPicture({ uri: response.data.photo[0].url });
            setDisplayMessage("Your profile has been updated");
          }
        } catch (error) {
          setDisplayMessage("Your profile has been successfully updated");
        }
      }
      // Si les informations sont modifiées, envoyez une demande de mise à jour :
      if (isInfoModified) {
        try {
          const objToSend = {
            email: email,
            username: username,
            description: description,
          };

          const response = await axios.put(
            `https://express-airbnb-api.herokuapp.com/user/update`,
            objToSend,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );

          if (response.data) {
            setDisplayMessage("Your profile has been successfully updated");
          }
        } catch (error) {
          setDisplayMessage(`${error.response.data.error}`);
        }
      }

      // Réinitialisez ces états :
      isPictureModified && setIsPictureModified(false);
      isInfoModified && setIsInfoModified(false);
      setIsLoading(false);

      // Rafraîchir avec les nouvelles données :
      fetchData();
    } else {
      setDisplayMessage("Change at least one information");
    }
  };

  const getFromLibrary = async () => {
    // Demander la permission d'accéder à la pellicule :
    const libraryPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (libraryPermission.status === "granted") {
      const pickerResult = await ImagePicker.launchImageLibraryAsync();
      setPicture(pickerResult);
      setIsPictureModified(true);
    }
  };

  const getFromCamera = async () => {
    // Demander la permission d'accéder à la caméra et à la pellicule :
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const libraryPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (
      cameraPermission.status === "granted" &&
      libraryPermission.status === "granted"
    ) {
      const pickerResult = await ImagePicker.launchCameraAsync();
      setPicture(pickerResult);
      setIsPictureModified(true);
    }
  };

  // Masquer le message après 2,5 secondes :
  if (displayMessage) {
    setTimeout(() => setDisplayMessage(false), 2500);
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.text}>{`Hello${
            username ? `, ${username}` : ""
          }`}</Text>
          <View style={styles.topView}>
            <TouchableOpacity style={styles.pictureView}>
              <Image
                style={styles.avatar}
                source={
                  picture === null
                    ? require("../assets/img/no-avatar.png")
                    : { uri: picture.uri }
                }
              />
            </TouchableOpacity>
            <View style={styles.icons}>
              <TouchableOpacity onPress={getFromLibrary}>
                <MaterialIcons name="photo-library" size={30} color="#737373" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={getFromCamera}
              >
                <FontAwesome5 name="camera" size={30} color="#737373" />
              </TouchableOpacity>
            </View>
          </View>
          <Input
            value={email}
            setFunction={setEmail}
            setDisplayMessage={setDisplayMessage}
            setIsInfosModified={setIsInfoModified}
            placeholder={"email"}
            keyboardType={"email-address"}
          />
          <Input
            value={username}
            setFunction={setUsername}
            setDisplayMessage={setDisplayMessage}
            setIsInfosModified={setIsInfoModified}
            placeholder="username"
          />
          <InputMulti
            value={description}
            setFunction={setDescription}
            setDisplayMessage={setDisplayMessage}
            setIsInfosModified={setIsInfoModified}
            placeholder="Descible yourself in a few words..."
          />

          <View style={styles.view}>
            {displayMessage && <ErrorMessage content={displayMessage} />}
          </View>
          <Btn style={styles.btn} title="Update" setFunction={updateProfile} />
          <Btn
            style={styles.btn}
            title="Log out"
            setFunction={() => {
              setToken(null);
              setId(null);
            }}
            backgroundColor={true}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    justifyContent: "center",
    marginTop: 10,
    fontSize: 20,
    fontWeight: "700",
    color: "#848484",
  },
  picture: {
    height: 150,
    width: 150,
    borderRadius: 150,
  },
  pictureView: {
    marginVertical: 20,
    width: 170,
    height: 170,
    borderRadius: 170,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FFBAC0",
    borderWidth: 2,
  },
  avatar: {
    marginVertical: 20,
    width: 170,
    height: 170,
    borderRadius: 170,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FFBAC0",
    borderWidth: 2,
  },
  topView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  icons: {
    marginLeft: 20,
  },
  iconButton: {
    marginTop: 40,
  },
  view: {
    height: 30,
  },
});
