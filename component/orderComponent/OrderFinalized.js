import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ImageBackground } from 'react-native';
import { useCart } from './CartContext'
import { useUser } from '../userHandling/UserContext';
import { setStatus, setOrder, setOrdersProducts } from '../db/queries/newOrder.query';

const OrderFinalized = ( { route, navigation } ) => {
    const { sum } = route.params;
    const { user } = useUser();
    const { cartState, dispatch } = useCart();
    const { items } = cartState;

    const handleClearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
      };

    useEffect(() => {
        const newOrder = async () => {
            try {
            const statusID = await setStatus('In Progress');
            const orderID = await setOrder(
                user.PaymentMethod,
                user.Address,
                user.Email,
                statusID.insertedId,
                sum,
                ''
            );
            {items.map(async(item) => (
                await setOrdersProducts(orderID.insertId, item.prodID, item.quantity)
            ))}
                handleClearCart();
            } catch (error) {
                console.error('Error setting order info:', error);
            }
        }
        newOrder();
    }, []);

    const handleNavigateBack = () => {
        navigation.popToTop();
      };

      return (
        <ImageBackground source={require('../../assets/img/OrderConfirmation/bg.png')} style={styles.backgroundImage}>
          <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>Thanks for your purchase!</Text>
                <Text style={styles.subtitle}>Your order has been placed, and you will get a shipping confirmation soon.</Text>
              </View>
            </View>
            <View style={styles.bottomContent}>
              <TouchableOpacity style={styles.button} onPress={handleNavigateBack}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      );
    };
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontFamily:'LoraSemiBold',
    fontSize: 40,
    marginBottom: 10,
    color: '#363939', 
    textAlign: 'center', 
    textAlignVertical: 'center',
  },
  subtitle: {
    fontFamily:'InterRegular',
    fontSize: 16,
    textAlign: 'center',
    color: '#57595A',
  },
  button: {
      backgroundColor: '#CA9446',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
  buttonText: {
    color: '#363939',
    fontSize: 16,
    fontFamily:'InterMedium',
  },
  bottomContent: {
      width: '80%', 
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 36, 
  },
  textContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  bottomContent: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 36, 
  },
});
      
      export default OrderFinalized;