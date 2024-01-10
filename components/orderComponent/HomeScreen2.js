import React, { useContext, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';
import ProductItem from './ProductItem';
import { products } from './data';
import { CartContext } from '../../App';


const HomeScreen2 = ({ navigation, route }) => {
    const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    if (route.params && route.params.cart) {
        setCart(route.params.cart);
      }
    }, [route.params, setCart]);

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: cart.length + 1 }]);
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const spodnie = products.filter((product) => product.type === 'spodnie');

  return (
    <ScrollView>
      <View>
        <Text>Sklep 2</Text>
        {spodnie.map((product) => (
          <ProductItem key={product.id} product={product} addToCart={addToCart} />
        ))}
        <TouchableOpacity onPress={() => navigation.navigate('Cart', { cart: cart })}>
          <Text>Koszyk   {cart.length > 0 && <Badge status="error" value={cart.length} />}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToHome()}>
          <Text>Przenieś do Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


export default HomeScreen2;