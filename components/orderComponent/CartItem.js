import React from 'react';
import { View, Text} from 'react-native';

const CartItem = ({ product}) => {
  return (
    <View>
      <Text>
        {product.name} - ${product.price}
      </Text>
    </View>
  );
};

export default CartItem;