import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/orderComponent/HomeScreen';
import CartScreen from './components/orderComponent/CartScreen';

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  setCart: () => {},
});

const Stack = createStackNavigator();

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: cart.length + 1 }]);
  };

  return (
    <NavigationContainer>
      <CartContext.Provider value={{ cart, addToCart, setCart }}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
      </CartContext.Provider>
    </NavigationContainer>
  );
};

export default App;