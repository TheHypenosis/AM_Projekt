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
import AuthViewScreen from './component/userHandling/quickAuth.js';
import WishlistTemp from './component/mainViewComponent/wishlistTemp.js';
import PaymentMethodConfig from './component/userProfile/PaymentMethodConfig.js';
import AddressConfig from './component/userProfile/AdressConfig.js';
import PhotoConfig from './component/userProfile/PhotoConfig.js';
import { UserProvider } from './component/userHandling/UserContext.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const CatalogStack = createStackNavigator();
const ProfileStack = createStackNavigator();



function ProfileStackScreen() {
  return(
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}> 
      <ProfileStack.Screen name="Profile" component = {Profile} />
      <ProfileStack.Screen name="PaymentMethodConfig" component = {PaymentMethodConfig} />
      <ProfileStack.Screen name='AddressConfig' component = {AddressConfig} />
      <ProfileStack.Screen name='PhotoConfig' component = {PhotoConfig} />
    </ProfileStack.Navigator>
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
      <HomeStack.Screen name="HomeProductScreen" component={ProductScreen} />
    </HomeStack.Navigator>
  );
}

export function AuthView() {
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={AuthViewScreen}/>
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
      <Tab.Screen name="WishList" component={WishlistTemp} options={{
          tabBarIcon: () => (
            <Image
              source={require('./assets/img/Home/Wishlist.png')}
            />
          ),
          tabBarLabel: 'Wishlist',
        }} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} options={{
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
  const [userToken, setUserToken] = React.useState('X5929755');

  useEffect(() => {
    initializeDatabase();
    LogBox.ignoreLogs(['ViewPropTypes will be removed']);
  }, []);

  return (
    <FontProvider> 
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userToken === null ? (
              // No token found, user isn't signed in
              <Stack.Screen name="Auth" component={AuthView} />
            ) : (
              // User is signed in
              <Stack.Screen name="MainView" component={MainView}/>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
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


