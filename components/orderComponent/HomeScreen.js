import React, { useContext, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';
import ProductItem from './ProductItem';
import { products } from './data';
import { CartContext } from '../../App';

const HomeScreen = ({ navigation, route }) => {
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    if (route.params && route.params.cart) {
      setCart(route.params.cart);
    }
  }, [route.params, setCart]);

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: cart.length + 1 }]);
  };

  const bluzy = products.filter((product) => product.type === 'bluza');

  return (
    <ScrollView>
      <View>
        <Text>Sklep</Text>
        {bluzy.map((product) => (
          <ProductItem key={product.id} product={product} addToCart={addToCart} setCart={setCart} />
        ))}
      <TouchableOpacity onPress={() => navigation.navigate('Cart', { cart: cart })}>
       <Text>Koszyk</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
export default HomeScreen;