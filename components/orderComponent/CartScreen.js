import React, { useState, useEffect } from 'react';
import {  Text, TouchableOpacity, View, ScrollView } from 'react-native';
import CartItem from './CartItem';

const getTotalPrice = (cartItems) => {
  return cartItems.reduce((total, product) => total + product.price, 0);
};

const CartScreen = ({ route, navigation }) => {
  const { cart } = route.params;
  const [cartItems, setCartItems] = useState(cart);
  const [totalPrice, setTotalPrice] = useState(getTotalPrice(cartItems));

  useEffect(() => {
    setCartItems(cart);
    setTotalPrice(getTotalPrice(cart)); 
  }, [cart]);

  const removeItem = (cartId) => {
    const updatedCart = cartItems.filter((item) => item.cartId !== cartId);
    setCartItems(updatedCart);
    navigation.setParams({ cart: updatedCart });
  };

  const goBackToHome = () => {
    navigation.navigate('Home', { cart: cartItems });
  };


return (
  <ScrollView style={styles.scrollContainer}>
    <View style={styles.container}>
      <View style={styles.orderHeader}>
        <Text style={styles.headerOrder}>Koszyk</Text>
      </View>
      {cartItems.map((product) => (
        <CartItem key={product.cartId} product={product} removeItem={removeItem} />
      ))}
      <Text style={styles.totalPrice}>Suma: ${totalPrice}</Text>
      <TouchableOpacity style={styles.placeOrderButton}>
        <Text style={styles.placeOrderButtonText}>Złóż zamówienie</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goBackToHome} style={styles.goBackButton}>
        <Text style={styles.goBackButtonText}>Powrót</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
 );
};

const styles = {
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    orderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 50,
    },
    headerOrder: {
      fontSize: 24,
    },
    goBackButton: {
      backgroundColor: 'red',
      padding: 10,
      marginTop: 10,
      borderRadius: 5,
      width: '100%', 
    },
    orderMessage: {
      color: 'red', 
      marginBottom: 10,
      textAlign: 'center',
    },
  };
export default CartScreen;