import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import WishlistScreen from "./screens/WishlistScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import {Box, NativeBaseProvider, Button} from "native-base";
import AppScreen from "./screens/AppScreen";
import ProfileDetailsFilterScreen from "./screens/ProfileDetailsFilterScreen";
import SearchFilterScreen from "./screens/SearchFilterScreen";
import store from './store'
import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="App"
              component={AppScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileDetailsFilterScreen"
              component={ProfileDetailsFilterScreen}
            />
            <Stack.Screen
              name="SearchFilterScreen"
              component={SearchFilterScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
