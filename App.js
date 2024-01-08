// App.js

import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState  } from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontProvider } from './component/mainViewComponent/FontContext';

import Home from './component/mainViewComponent/Home.js';
import Profile from './component/userProfile/UserProfile.js';
import initializeDatabase from './component/db/dbInit';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function WishListPlaceholder() {
  return(
    <View>
        <Text>Wishlist</Text>
    </View>
  )    
}

function SearchPlaceHolder() {
  return(
    <View>
        <Text>Search</Text>
    </View>
)    
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
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
}

export function AuthView() {
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={AuthPlaceHolder}/>
    </Stack.Navigator>
  )
}

export function MainView() {
  return(
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBarOptions={{ labelStyle: styles.tabText, }}>
      <Tab.Screen name="Home" component={HomeStackScreen} options={{
          tabBarIcon: () => (
            <Image
              source={require('./img/Home/Home.png')}
            />
          ),
          tabBarLabel: 'Home',
        }}/>
      <Tab.Screen name="WishList" component={WishListPlaceholder} options={{
          tabBarIcon: () => (
            <Image
              source={require('./img/Home/Wishlist.png')}
            />
          ),
          tabBarLabel: 'Wishlist',
        }} />
      <Tab.Screen name="Profile" component={Profile} options={{
          tabBarIcon: () => (
            <Image
              source={require('./img/Home/Profile.png')}
            />
          ),
          tabBarLabel: 'Profile',
        }}/>
      <Tab.Screen name="Search" component={SearchPlaceHolder} options={{
          tabBarIcon: () => (
            <Image
              source={require('./img/Home/Search.png')}
            />
          ),
          tabBarLabel: 'Search',
        }}/>
    </Tab.Navigator>
  );
}

export default function App() {
  const [userToken, setUserToken] = React.useState('X5929755');

  useEffect(() => {
    initializeDatabase();
  }, []);

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
    fontFamily: 'InterRegular',
    fontSize: 10,
    color: '#1F2223',
  }
});


