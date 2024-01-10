import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';

const CartItem = ({ product, removeItem}) => {
  return (
    <View>
      <Text>
        {product.name} - ${product.price}
      </Text>
      <TouchableOpacity onPress={() => removeItem(product.cartId)}>
        <Text>Usuń</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;