import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Modal, Button, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';

import { useUser, updateUser } from '../userHandling/UserContext';
import { getPaymentInfo, setPaymentInfo, updatePaymentInfo, updateUserPaymentInfo } from '../db/queries/creditInfo.query';
import { getNewUserData } from '../db/queries/userUpdate.query';

const WishlistTemp = ({ navigation }) => {
    const [paymentInfoMapped, setPaymentInfoMapped] = useState([]);  
    const [paymentSavingPressed, setPaymentSavingPressed] = useState(false);
    const [paymentInfoNew, setPaymentInfoNew] = useState({
        cardHolderName: '',
        cardNumber: '',
        ccv: '',
        expDate: '',
      });
    const { user } = useUser();
    const [isVisible, setIsVisible] = useState(true);

    const fetchData = async () => {
        try {
            const defaultPaymentInfo = await getPaymentInfo(user.PaymentMethod);
            console.log('Default Payment Info:', defaultPaymentInfo.CCV);

            const paymentInfoMapped = defaultPaymentInfo.map((item) => {
                return {
                    key: item.ID,
                    cardHolderName: item.Name,
                    cardNumber: item.CardNumber,
                    expiryDate: item.ExpiryDate,
                    ccv: item.CCV,
                };
            });

            setPaymentInfoMapped(paymentInfoMapped);
            console.log('Mapped Payment Info: ', paymentInfoMapped);
        } catch (error) {
            console.error('Error fetching default payment info:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePaymentSaving = () => {
        setPaymentSavingPressed(true);
    };

    const handleGoBack = () => {
        navigation.goBack(); // This will go back to the previous screen
      };
    const handleEditButton = () => {
        isVisible ? setIsVisible(false) : setIsVisible(true);
    }

    useEffect(() => {
        const handleSavePaymentInfo = async () => {
            try {
                if (!user.PaymentMethod) {
                    // INSERT PAYMENTMETHOD
                    const { result, insertedId } = await setPaymentInfo(
                        paymentInfoNew.cardHolderName,
                        paymentInfoNew.cardNumber,
                        paymentInfoNew.ccv,
                        paymentInfoNew.expDate
                    );

                    // Log the result and insertedId
                    console.log('Payment info set successfully:', result);
                    console.log('Inserted ID:', insertedId);

                    // UPDATE USER
                    await updateUserPaymentInfo(insertedId, user.Email);

                    // UPDATE USER CONTEXT
                    user.PaymentMethod = insertedId;
                } else {
                    await updatePaymentInfo(
                        paymentInfoNew.cardHolderName,
                        paymentInfoNew.cardNumber,
                        paymentInfoNew.ccv,
                        paymentInfoNew.expDate,
                        user.PaymentMethod
                    );
                }
            } catch (error) {
                console.error('Error setting payment info:', error);
            } finally {
                fetchData();
                setPaymentSavingPressed(false); // Reset the flag
                setIsVisible(true);
            }
        };

        if (paymentSavingPressed) {
            handleSavePaymentInfo();
        }
    }, [paymentSavingPressed, paymentInfoNew, updateUser, user.Email]);

    return (
        
        <View>
            <View style={styles.headerContainer}>
            {/* Top left icon (back button) */}
            <TouchableOpacity onPress={handleGoBack} style={styles.headerIcon}>
              <Image source={require('../../assets/img/ProductPage/Arrow-left.png')} style={styles.iconImage} />
              </TouchableOpacity>
              {isVisible ? (
                <TouchableOpacity onPress={handleEditButton} style={styles.editButton}>
                    <Text>Edit</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleEditButton}>
                    <Image source={require('../../assets/img/Cart/x.png')} style={styles.iconImage} />
                </TouchableOpacity>
              )}
            
          </View>
          {paymentInfoMapped.length > 0 ? (
            paymentInfoMapped.map((info) => (
            <View style={isVisible ? styles.visible : styles.hidden}>    
            <View style={styles.cardInfoContainer} key={info.key}>
                <Text style={styles.cardTitle}>Credit Card Information:</Text>
                <View style={styles.textRowContainer}>
                    <Text style={styles.textTitle}>Card Holder Name: </Text><Text>{info.cardHolderName}</Text>
                </View>
                <View style={styles.textRowContainer}>
                    <Text style={styles.textTitle}>Card Number: </Text><Text>{info.cardNumber}</Text>
                </View>
                <View style={styles.textRowContainer}>
                    <Text style={styles.textTitle}>Expiry Date: </Text><Text>{info.expiryDate}</Text>
                </View>
                <View style={styles.textRowContainer}>
                    <Text style={styles.textTitle}>CCV: </Text><Text>{info.ccv}</Text>
                </View>
            </View> 
            </View>
            ))
          ) : (
            <View style={isVisible ? styles.visible : styles.hidden}>
                    <View style={styles.noTextContainer}>
                    <Text style={styles.noText}>No Payment Method information available.</Text>
                    </View>
                </View>
          )
        }
        
        <View style={isVisible ? styles.hidden : styles.visible}>
            <View style={styles.inputContainer}>
            <TextInput
                placeholder="Cardholder Name"
                style={styles.input}
                value={paymentInfoNew.cardHolderName}
                onChangeText={(text) => {
                    console.log('Cardholders name:', text);
                    setPaymentInfoNew({
                        ...paymentInfoNew,
                        cardHolderName: text,
                    });
                }}
            />
            <TextInput
                placeholder="Credit Card Number"
                style={styles.input}
                value={paymentInfoNew.cardNumber}
                keyboardType="numeric"
                onChangeText={(text) => {
                    console.log('Credit Card Number:', text);
                    setPaymentInfoNew({
                        ...paymentInfoNew,
                        cardNumber: text,
                    });
                }}
            />
            <TextInput
                placeholder="Expiry Date"
                style={styles.input}
                value={paymentInfoNew.expDate}
                onChangeText={(text) => {
                    console.log('Expiry Date:', text);
                    setPaymentInfoNew({
                        ...paymentInfoNew,
                        expDate: text,
                    });
                }}
            />
            <TextInput
                placeholder="CCV"
                style={styles.input}
                value={paymentInfoNew.ccv}
                keyboardType="numeric"
                onChangeText={(text) => {
                    console.log('CCV:', text);
                    setPaymentInfoNew({
                        ...paymentInfoNew,
                        ccv: text,
                    });
                }}
            />
            <View style={styles.saveButton}>
            <Button onPress={handlePaymentSaving} title="Save"/>
            </View>
            </View>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        alignItems: 'center',
    },
    headerIcon: {
        padding: 8,
        zIndex:2,
    },
    editButton:{
        borderColor: '#363939',
        borderWidth: 1,
        borderRadius: 6,
        width: 60,
        height: 35, // Set a fixed height for the button
        justifyContent: 'center', // Center text vertically
        alignItems: 'center', // Center text horizontally
    },
    cardInfoContainer:{
        paddingTop:10,
        marginLeft:10,
    },
    cardTitle:{
        fontFamily:'InterSemiBold',
        fontSize:24,
        paddingBottom: 10,
    },
    textRowContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:8,
    },
    textTitle:{
        fontFamily:'InterSemiBold',
        fontSize:18,
    },
    noTextContainer:{
        marginTop:30,
        alignItems: 'center',
    },
    noText:{
        fontFamily:'InterSemiBold',
        fontSize:18,
    },
    inputContainer:{
        alignItems: 'center',
        width:'100%',
    },
    input:{
        borderWidth:1,
        borderColor:'#363939',
        marginTop:20,
        width:'90%',
        paddingLeft:10,
    },
    saveButton:{
        marginTop:20,
        width:'90%',
    },
    visible: {
        display: 'flex',
    },
    hidden: {
        display: 'none',
    },
});

export default WishlistTemp;
