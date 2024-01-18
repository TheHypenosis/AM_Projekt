import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import WishlistScreen from "./WishlistScreen";
import ProfileScreen from "./ProfileScreen";
import SearchScreen from "./SearchScreen";

// Tworzenie nawigatora dolnej zakładki
const Tab = createBottomTabNavigator();

// Komponent AppScreen zawierający dolny nawigator zakładek
const AppScreen = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false // Ukrywanie nagłówka dla wszystkich ekranów w nawigatorze
    }}>
      {/* Ekran główny */}
      <Tab.Screen name="Home" component={HomeScreen}/>
      
      {/* Ekran listy życzeń */}
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      
      {/* Ekran profilu zamowienia */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
      
      {/* Ekran wyszukiwania */}
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
}

export default AppScreen;
