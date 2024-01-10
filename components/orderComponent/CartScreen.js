import React, { useState, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native';
import CartItem from './CartItem';

const getTotalPrice = (cartItems) => {
  return cartItems.reduce((total, product) => total + product.price, 0);
};

const CartScreen = ({ route, navigation }) => {
  const { cart } = route.params;
  const [cartItems, setCartItems] = useState(cart);
  const [totalPrice, setTotalPrice] = useState(getTotalPrice(cartItems));
  const [orderMessage, setOrderMessage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editCard, setEditCard] = useState(false);
  const [isDateValid, setIsDateValid] = useState(true);

  const [addressLine1, setAddressLine1] = useState('2972 Westheimer Rd.');
  const [addressLine2, setAddressLine2] = useState('Santa Ana, Illinois 85486');
  const [addressLine3, setAddressLine3] = useState('United States of America');
  const [cardNumber, setCardNumber] = useState('1234 1234 1234 1234');
  const [cvv, setCvv] = useState('956');
  const [expirationDate, setExpirationDate] = useState('06/26');

  useEffect(() => {
    setCartItems(cart);
    setTotalPrice(getTotalPrice(cart)); 
  }, [cart]);

  const removeItem = (cartId) => {
    const updatedCart = cartItems.filter((item) => item.cartId !== cartId);
    setCartItems(updatedCart);
    navigation.setParams({ cart: updatedCart });
  };

  const placeOrder = () => {
    if (cartItems.length === 0) {
      setOrderMessage('Your cart is empty. Please add items before placing an order.');
    } else {
      setIsOrderModalVisible(true);
    }
  };
  
  const handleSendOrder = () => {
    // Sprawdź, czy pola miasta, ulicy, adresu, numeru karty, numeru CVV i ważności karty są uzupełnione
    if (!addressLine1 || !addressLine2 || !addressLine3 || !cardNumber || !cvv || !expirationDate) {
      setOrderMessage('Please fill in all required fields before placing an order.');
      return;
    }
  
    // Sprawdź, czy numer karty ma 16 liczb i 3 spacje
    const cardNumberWithoutSpaces = cardNumber.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cardNumberWithoutSpaces)) {
      setOrderMessage('Card number must have 16 digits and 3 spaces.');
      return;
    }
  
    // Sprawdź, czy numer CVV ma 3 liczby
    if (!/^\d{3}$/.test(cvv)) {
      setOrderMessage('CVV must have 3 digits.');
      return;
    }
  
    // Sprawdź, czy ważność karty kredytowej ma prawidłowy format daty (MM/YY)
    if (!/^(0[1-9]|1[0-2])\/(2[2-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])$/.test(expirationDate)) {
      setOrderMessage('Invalid credit card expiration date format (MM/YY).');
      return;
    }
  
    // Sprawdź, czy koszyk nie jest pusty
    if (cartItems.length === 0) {
      setOrderMessage('Your cart is empty. Please add items before placing an order.');
    } else {
      // Tutaj możesz dodać logikę obsługi wysyłki zamówienia
      // Na potrzeby przykładu, po prostu zamknij modal, wyświetl komunikat, zaktualizuj koszyk i sumę
      setIsOrderModalVisible(false);
      setOrderMessage('Order successfully placed!');
      setCartItems([]); // Wyczyszczenie koszyka
  
      // Aktualizacja stanu sumy w koszyku
      setTotalPrice(0);
    }
  };
  

  const handleBackToCart = () => {
    setIsOrderModalVisible(false);
    setOrderMessage(null);
  };

  
  const handleEdit = () => {
    setEditMode(!editMode);
 };

 const handleSave = () => {
    setEditMode(!editMode);
 };

 const handleEditCard = () => {
  setEditCard(!editCard);
};

const handleSaveCard = () => {
  setEditCard(!editCard);
};
  
const setCardNumberWithSpaces = (text) => {
  // Remove non-numeric characters and limit to 16 digits
  const cleanedText = text.replace(/\D/g, '').slice(0, 16);

  // Insert spaces every 4 digits
  const formattedText = cleanedText.replace(/(\d{4})(?=\d)/g, '$1 ');

  // Set the formatted number to the state
  setCardNumber(formattedText);
};


const handleExpirationDateChange = (input) => {
  // Format input to MM/YY
  let formattedInput = input
    .replace(/\s/g, '')
    .replace(/[^0-9]/g, '')
    .slice(0, 4);

  // Add a slash after the first two digits
  if (formattedInput.length >= 2) {
    formattedInput = formattedInput.slice(0, 2) + '/' + formattedInput.slice(2);
  }

  const isValid = /^(0[1-9]|1[0-2])\/(2[4-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])$/.test(
    formattedInput
  );

  
  
  setExpirationDate(formattedInput);
  setIsDateValid(isValid);
  };


  const closeModal = () => {
    setIsModalVisible(false);
    setOrderMessage(null); // Dodaj to, aby wyczyścić komunikat po zamknięciu modala
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
      {orderMessage && <Text style={styles.orderMessage}>{orderMessage}</Text>}
      <TouchableOpacity onPress={placeOrder} style={styles.placeOrderButton}>
        <Text style={styles.placeOrderButtonText}>Złóż zamówienie</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}>{orderMessage}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOrderModalVisible}
        onRequestClose={handleBackToCart}
      >
           <ScrollView>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalMessage}>Wprowadź swoje dane:</Text>
            <View style={styles.cardInputContainer}>
        <Text style={styles.userInfoLabel}>Miasto:</Text>
        <TextInput
          value={addressLine1}
          onChangeText={(text) => setAddressLine1(text)}
          editable={editMode}
          style={styles.userInfoInput}
        />
          </View>
          <View style={styles.cardInputContainer}>
        <Text style={styles.userInfoLabel}>Ulica:</Text>
        <TextInput
          value={addressLine2}
          onChangeText={(text) => setAddressLine2(text)}
          editable={editMode}
          style={styles.userInfoInput}
        />
        </View>
        <View style={styles.cardInputContainer}>
        <Text style={styles.userInfoLabel}>Adres:</Text>
        <TextInput
          value={addressLine3}
          onChangeText={(text) => setAddressLine3(text)}
          editable={editMode}
          style={styles.userInfoInput}
        />
        </View>
        <TouchableOpacity
          style={styles.userInfoButton}
          onPress={editMode ? handleSave : handleEdit}
        >
          <Text style={styles.userInfoButtonText}>{editMode ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>

      <View style={styles.cardInputContainer}>
        <Text style={styles.cardInputLabel}>Numer karty</Text>
        <TextInput
          value={cardNumber}
          onChangeText={setCardNumberWithSpaces}
          editable={editCard}
          style={styles.cardInput}
          maxLength={19} // 16 digits + 3 spaces
          keyboardType="numeric"
        />
      </View>
      <View style={styles.cardInputContainer}>
        <Text style={styles.cardInputLabel}>Numer CVV</Text>
        <TextInput
          value={cvv}
          onChangeText={(text) => setCvv(text)}
          editable={editCard}
          style={styles.cardInput}
          maxLength={3}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.cardInputContainer}>
        <Text style={styles.cardInputLabel}>Ważność karty kredytowej</Text>
        <TextInput
          style={styles.cardInput}
          value={expirationDate}
          editable={editCard}
          onChangeText={handleExpirationDateChange}
          maxLength={5}
          keyboardType="numeric"
        />
      </View>
      {!isDateValid && (
        <Text style={styles.errorText}>Podaj prawidłowy format daty (MM/YY)</Text>
      )}
      <TouchableOpacity
        style={styles.cardButton}
        onPress={editCard ? handleSaveCard : handleEditCard}
      >
        <Text style={styles.cardButtonText}>{editCard ? 'Save' : 'Edit'}</Text>
      </TouchableOpacity>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Kod promocyjny:</Text>
  
            </View>

            {orderMessage && (
              <Text style={styles.orderMessage}>{orderMessage}</Text>
            )}

            <Text style={styles.modalMessage}>Suma: ${totalPrice}</Text>
            <TouchableOpacity style={styles.sendButton} onPress={handleSendOrder}>
              <Text style={styles.buttonText}>Wyślij</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBackToCart} style={styles.goBackButton}>
              <Text style={styles.buttonText}>Powrót</Text>
            </TouchableOpacity>
          </View>
        </View>
         </ScrollView>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: 'green',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    width: '100%', 
  },
  goBackButton: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    width: '100%', 
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  orderMessage: {
    color: 'red', 
    marginBottom: 10,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputLabel: {
    marginRight: 10,
    width: '30%',
  },
  cardInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
  cardInputLabel: {
    marginRight: 10,
    width: '30%',
  },
  cardInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    padding: 10,
  },
  cardButton: {
    backgroundColor: 'purple',
    padding: 10,
    marginTop: 20,
    width: '100%',
  },
  cardButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  userInfoLabel: {
    fontSize: 16,
    color: 'black', 
    marginLeft: 60,
  },
  userInfoInput: {
    height: 40,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    width: '100%', 
  },
  userInfoButton: {
    backgroundColor: 'orange', 
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    width: '100%',
  },
  userInfoButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  };
export default CartScreen;