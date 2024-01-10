import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const ProductItem = ({ product, addToCart }) => {
  return (
    <View>
      <View>
        {product.image && (
          <Image source={product.image} style={{ width: 50, height: 50, marginRight: 10, borderRadius: 5 }} />
        )}
        <View>
          <Text>{product.name}</Text>
          <Text>Cena: ${product.price}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => addToCart(product)}>
        <Text>Dodaj do koszyka</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductItem;