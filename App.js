import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import RoomScreen from "./screens/RoomScreen";
import AroundMeScreen from "./screens/AroundMeScreen";
import ProfileScreen from "./screens/ProfileScreen";

// Components
import BackBtn from "./components/BackBtn";

// Icons
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // Sauvegarde ou enlève le token de AsyncStorage & state
  const setToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
      setUserToken(token);
    } else {
      AsyncStorage.removeItem("userToken");
      setUserToken(null);
    }
  };

  // Sauvegarde ou enlève l'id de AsyncStorage & state
  const setId = async (id) => {
    if (id) {
      AsyncStorage.setItem("userId", id);
      setUserId(id);
    } else {
      AsyncStorage.removeItem("userId");
      setUserId(null);
    }
  };

  useEffect(() => {
    // Récupérer le token dans le stockage, puis accéder à notre endroit approprié
    const bootstrapAsync = async () => {
      // Nous devons également gérer les erreurs pour les applications de production
      const userToken = await AsyncStorage.getItem("userToken");
      setIsLoading(false);
      setUserToken(userToken);
    };
    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? ( // Nous n'avons pas encore fini de vérifier le token
        // Aucun token trouvé, l'utilisateur n'est pas connecté
        <Stack.Navigator>
          <Stack.Screen name="SignIn" options={{ headerShown: false }}>
            {() => <SignInScreen setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen name="SignUp" options={{ headerShown: false }}>
            {() => <SignUpScreen setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // L'utilisateur est connecté
        <Stack.Navigator>
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: "#EB5A62",
                  inactiveTintColor: "#737373",
                }}
              >
                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          headerTitleAlign: "center",
                          title: (
                            <FontAwesome5
                              name="airbnb"
                              size={35}
                              color="#EB5A62"
                            />
                          ),
                        }}
                      >
                        {(props) => <HomeScreen {...props} />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Room"
                        options={{
                          headerTitleAlign: "center",
                          title: (
                            <FontAwesome5
                              name="airbnb"
                              size={35}
                              color="#EB5A62"
                            />
                          ),
                          headerBackTitleVisible: false,
                          headerLeft: () => <BackBtn />,
                        }}
                      >
                        {(props) => <RoomScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="AroundMe"
                  options={{
                    tabBarLabel: " Around me",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons
                        name="map-marker-outline"
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="AroundScreen"
                        options={{
                          headerTitleAlign: "center",
                          title: (
                            <FontAwesome5
                              name="airbnb"
                              size={35}
                              color="#EB5A62"
                            />
                          ),
                        }}
                      >
                        {(props) => <AroundMeScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="Profile"
                  options={{
                    tabBarLabel: "My profile",
                    tabBarIcon: ({ color, size }) => (
                      <AntDesign name="user" size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Profile"
                        options={{
                          headerTitleAlign: "center",
                          title: (
                            <FontAwesome5
                              name="airbnb"
                              size={35}
                              color="#EB5A62"
                            />
                          ),
                        }}
                      >
                        {(props) => (
                          <ProfileScreen
                            {...props}
                            setToken={setToken}
                            setId={setId}
                            userToken={userToken}
                            userId={userId}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
export default App;
