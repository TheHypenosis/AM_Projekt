import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, ScrollView, SafeAreaView, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { useCart } from '../orderComponent/CartContext'

const CartScreen = ({ navigation }) => {
  const { cartState, dispatch } = useCart();
  const { items } = cartState;
  const [sum, setSum] = useState(0);

  useEffect(() => {
    // Calculate the total sum when the items array changes
    const totalSum = items.reduce((total, item) => {
      const formattedPrice = parseFloat(item.price.replace('$', '').replace(',', ''));
      const itemPrice = typeof formattedPrice === 'number' ? formattedPrice : 0;
      const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 0;
        
      return total + itemPrice * itemQuantity;
    }, 0);
    setSum(totalSum);
  }, [items]);
  

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleIncreaseAmount = (prodID) => {
    // Dispatch an action to increase the amount of the item in the cart
    dispatch({ type: 'INCREASE_AMOUNT', payload: { prodID } });
  };

  const handleDecreaseAmount = (prodID) => {
    // Dispatch an action to decrease the amount of the item in the cart
    dispatch({ type: 'DECREASE_AMOUNT', payload: { prodID } });
  };

  const isCartEmpty = items.length === 0;

  return (
    <SafeAreaView style={styles.safeAreaView}>
      
        <View style={styles.container}>
          {/* Custom header */}
          <View style={styles.headerContainer}>
            {/* Top left icon (back button) */}
            <TouchableOpacity onPress={handleGoBack} style={styles.headerIcon}>
              <Image source={require('../../assets/img/Cart/x.png')} style={styles.iconImage} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Cart</Text>
          </View>
          <ScrollView style={styles.productItemContainer}>
          {items.map((item) => (
            <View key={item.key} style={styles.productItem}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
                <View style={styles.amountContainer}>
                  <TouchableOpacity onPress={() => handleDecreaseAmount(item.prodID)}>
                    <Text style={styles.amountButtonLeft}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.amountText}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => handleIncreaseAmount(item.prodID)}>
                    <Text style={styles.amountButtonRight}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          </ScrollView>
        </View>
      
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarTextContainer}>
          <Text style={styles.overallText}>Cart total</Text>
          <Text style={styles.priceText}>${sum.toFixed(2)}</Text>
        </View>
        <TouchableHighlight
          style={isCartEmpty ? styles.checkoutButtonDisabled : styles.checkoutButton}
          onPress={() => !isCartEmpty && navigation.navigate('Checkout', { sum })}
          underlayColor="#444"
          disabled={isCartEmpty}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth:1,
    borderBottomColor: '#D2D3D3',
  },
  headerText: {
    flex: 1, 
    textAlign: 'center', 
    fontFamily: 'LoraSemiBold',
    fontSize: 18,
    color: '#363939',
    left:-20,
  },
  headerIcon: {
    padding: 8,
    zIndex: 2,
  },
  productItemContainer: {
    flexGrow: 1,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
  },
  productImage: {
    width: '40%',
    height: 200,
    borderRadius: 8,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  productTitle: {
    fontFamily: 'LoraBold',
    fontSize: 18,
    marginBottom: 8,
    color: '#1F2223',
  },
  productPrice: {
    fontFamily: 'LoraRegular',
    fontSize: 16,
    color: '#363939',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    borderWidth:1,
    borderRadius:7,
    borderColor: '#EAEAEA',
    width: '40%',
  },
  amountButtonLeft: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: '#363939',
    borderRightWidth:1,
    borderColor: '#EAEAEA',
  },
  amountButtonRight: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: '#363939',
    borderLeftWidth:1,
    borderColor: '#EAEAEA',
  },
  amountText: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
    marginHorizontal: 10,
    color: '#363939',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth:1,
    borderTopColor: '#D2D3D3',
    backgroundColor: '#FFFFFF'
  },
  bottomBarTextContainer:{
    alignItems: 'center', 
  },
  overallText:{
    fontFamily: 'InterMedium',
    fontSize:14,
    color: '#797A7B',
  },
  priceText:{
    fontFamily: 'InterSemiBold',
    fontSize:20,
    color: '#363939',
  },
  checkoutButton: {
    borderRadius: 6,
    borderWidth: 1,
    width: '60%',
    alignItems: 'center',
    backgroundColor: '#363939',
    marginRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },

  checkoutButtonDisabled: {
    borderRadius: 6,
    borderWidth: 1,
    width: '60%',
    alignItems: 'center',
    backgroundColor: '#B0B0B0',
    borderColor: '#B0B0B0',
    marginRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  checkoutButtonText: {
    fontFamily: 'InterMedium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default CartScreen;
