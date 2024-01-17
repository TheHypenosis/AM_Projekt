import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import WishlistScreen from "./WishlistScreen";
import ProfileScreen from "./ProfileScreen";
import SearchScreen from "./SearchScreen";

const Tab = createBottomTabNavigator();

const AppScreen = () => {
  return (
    <Tab.Navigator screenOptions={{
    headerShown: false
  }}>
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />

    </Tab.Navigator>
  )
}

export default AppScreen
