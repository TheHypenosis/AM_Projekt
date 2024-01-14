// App.js

import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState  } from 'react';
import { StyleSheet, Image, LogBox, View, Text   } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontProvider } from './component/mainViewComponent/FontContext';

import Home from './component/mainViewComponent/Home.js';
import Profile from './component/userProfile/UserProfile.js';
import initializeDatabase from './component/db/dbInit';
import SearchFilter from './component/prodCatalog/SearchFilter.js';
import ProductScreen from './component/prodCatalog/ProductScreen.js';
import WelcomeScreen from './component/authentication/WelcomeScreen';
import LoginScreen from './component/authentication/LoginScreen';
import RegisterScreen from './component/authentication/RegisterScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const CatalogStack = createStackNavigator();



function WishListPlaceholder() {
  return(
    <View>
        <Text>Wishlist</Text>
    </View>
  )    
}

function ProductCatalogStackScreen() {
  return (
    <CatalogStack.Navigator screenOptions={{ headerShown: false }}> 
      <CatalogStack.Screen name="Catalog" component={SearchFilter} />
      <CatalogStack.Screen name="ProductScreen" component={ProductScreen} />
    </CatalogStack.Navigator>
  );
}

function AuthPlaceHolder() {
  return(
    <View>
        <Text>Search</Text>
    </View>
)    
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}> 
      <HomeStack.Screen name="Base" component={Home} />
    </HomeStack.Navigator>
  );
}

export function AuthView() {
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

export function MainView() {
  return(
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBarOptions={{ labelStyle: styles.tabText, }}>
      <Tab.Screen name="Home" component={HomeStackScreen} options={{
          tabBarIcon: () => (
            <Image
              source={require('./assets/img/Home/Home.png')}
            />
          ),
          tabBarLabel: 'Home',
        }}/>
      <Tab.Screen name="WishList" component={WishListPlaceholder} options={{
          tabBarIcon: () => (
            <Image
              source={require('./assets/img/Home/Wishlist.png')}
            />
          ),
          tabBarLabel: 'Wishlist',
        }} />
      <Tab.Screen name="Profile" component={Profile} options={{
          tabBarIcon: () => (
            <Image
              source={require('./assets/img/Home/Profile.png')}
            />
          ),
          tabBarLabel: 'Profile',
        }}/>
      <Tab.Screen name="Search" component={ProductCatalogStackScreen} options={{
          tabBarIcon: () => (
            <Image
              source={require('./assets/img/Home/Search.png')}
            />
          ),
          tabBarLabel: 'Search',
        }}/>
    </Tab.Navigator>
  );
}

export default function App() {
  const [userToken, setUserToken] = React.useState(null);
  //const fontsLoaded = useFontsLoaded();

  useEffect(() => {
    initializeDatabase();
    LogBox.ignoreLogs(['ViewPropTypes will be removed']);
  }, []);

  // if (!fontsLoaded) {
  //   console.log('Fonts are loading in App.js ...');
  //   return null;
  // }

  return (
    <FontProvider> 
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken == null ? (
          // No token found, user isn't signed in
          <Stack.Screen name="Auth" component={AuthView} />
        ) : (
          // User is signed in
          <Stack.Screen name="MainView" component={MainView}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </FontProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    //fontFamily: 'InterRegular',
    fontSize: 10,
    color: '#1F2223',
  }
});


