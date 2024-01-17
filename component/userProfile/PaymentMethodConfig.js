import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableHighlight, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';

import { useUser, updateUser } from '../userHandling/UserContext';
import { getPaymentInfo, setPaymentInfo, updatePaymentInfo, updateUserPaymentInfo } from '../db/queries/creditInfo.query';
import { getNewUserData } from '../db/queries/userUpdate.query';

const PaymentMethodConfig = ({ navigation }) => {
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
    const [emptyFields, setEmptyFields] = useState(false);
    const [errors, setErrors] = useState(false);

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
        if (!emptyFields && !errors) {
          setPaymentSavingPressed(true);
        }
      };

    const handleGoBack = () => {
        navigation.goBack(); 
      };
    const handleEditButton = () => {
        isVisible ? setIsVisible(false) : setIsVisible(true);
    }

    useEffect(() => {
        const handleSavePaymentInfo = async () => {
            try {
                    const { result, insertedId } = await setPaymentInfo(
                        paymentInfoNew.cardHolderName,
                        paymentInfoNew.cardNumber,
                        paymentInfoNew.ccv,
                        paymentInfoNew.expDate
                    );

                    console.log('Payment info set successfully:', result);
                    console.log('Inserted ID:', insertedId);

                    await updateUserPaymentInfo(insertedId, user.Email);

                    user.PaymentMethod = insertedId;
            } catch (error) {
                console.error('Error setting payment info:', error);
            } finally {
                fetchData();
                setPaymentSavingPressed(false); 
                setIsVisible(true);
            }
        };

        if (paymentSavingPressed) {
            handleSavePaymentInfo();
        }
    }, [paymentSavingPressed, paymentInfoNew, updateUser, user.Email]);

    useEffect(() => {
        const hasEmptyFields = Object.values(paymentInfoNew).some(value => value === '');
        setEmptyFields(hasEmptyFields);
    
        const hasErrors = 
          (paymentInfoNew.cardNumber.length > 0 && !isValidCreditCard(paymentInfoNew.cardNumber)) ||
          (paymentInfoNew.expDate.length > 0 && paymentInfoNew.expDate.length < 5) ||
          (paymentInfoNew.ccv.length > 0 && !isValidCCV(paymentInfoNew.ccv));
    
        setErrors(hasErrors);
      }, [paymentInfoNew]);

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
      
        const isValid = /^(0[1-9]|1[0-2])\/(2[4-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])$/.test(formattedInput);

        setPaymentInfoNew({
            ...paymentInfoNew,
            expDate: formattedInput,
        });
        };

    const isValidCreditCard = (cardNumber) => {
        // Basic validation: check if the card number has 16 digits
        const isLengthValid = /^\d{16}$/.test(cardNumber);
        return isLengthValid;
      };
    const isValidCCV = (CCV) => {
        // Basic validation: check if the card number has 16 digits
        const isLengthValid = /^\d{3}$/.test(CCV);
        return isLengthValid;
      };

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
                    setPaymentInfoNew({
                        ...paymentInfoNew,
                        cardHolderName: text,
                    });
                }}
            />
            <TextInput
                placeholder="Credit Card Number"
                style={(paymentInfoNew.cardNumber.length > 0 && !isValidCreditCard(paymentInfoNew.cardNumber)) ? styles.inputWrong : styles.input}
                value={paymentInfoNew.cardNumber}
                keyboardType="numeric"
                onChangeText={(text) => {
                    setPaymentInfoNew({
                        ...paymentInfoNew,
                        cardNumber: text,
                    });
                }}
            />
            {(paymentInfoNew.cardNumber.length > 0 && !isValidCreditCard(paymentInfoNew.cardNumber)) && (
                <Text style={styles.errorText}>Invalid credit card number</Text>
            )}
            <TextInput
                placeholder="Expiry Date"
                style={(paymentInfoNew.expDate.length > 0 && paymentInfoNew.expDate.length < 5 ) ?  styles.inputWrong : styles.input}
                value={paymentInfoNew.expDate}
                keyboardType="numeric"
                onChangeText={handleExpirationDateChange}
            />
            {(paymentInfoNew.expDate.length > 0 && paymentInfoNew.expDate.length < 5) && (
                <Text style={styles.errorText}>Invalid Expiry Date</Text>
            )}
            <TextInput
                placeholder="CCV"
                style={(paymentInfoNew.ccv.length > 0 && !isValidCCV(paymentInfoNew.ccv)) ?  styles.inputWrong : styles.input }
                value={paymentInfoNew.ccv}
                keyboardType="numeric"
                onChangeText={(text) => {
                    setPaymentInfoNew({
                        ...paymentInfoNew,
                        ccv: text,
                    });
                }}
            />
            {(paymentInfoNew.ccv.length > 0 && !isValidCCV(paymentInfoNew.ccv)) && (
                <Text style={styles.errorText}>Invalid CCV number</Text>
            )}
            <View style={styles.saveButtonContainer}>
                <TouchableHighlight
                    style={emptyFields || errors ? styles.saveButtonEmpty : styles.saveButton}
                    onPress={handlePaymentSaving}
                    underlayColor={emptyFields || errors ? '#B0B0B0' : '#444'} 
                    >
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableHighlight>
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
    inputWrong:{
        borderWidth:1,
        borderColor:'red',
        marginTop:20,
        width:'90%',
        paddingLeft:10,
    },
    saveButtonContainer:{
        marginTop:20,
        width:'90%',
    },
    saveButton:{
        backgroundColor: '#CA9446',
        alignItems: 'center',
        padding:10,
    },
    saveButtonEmpty:{
        backgroundColor: '#B0B0B0',
        alignItems: 'center',
        padding:10,
    },
    saveButtonText:{
        color: '#363939',
        fontSize: 16,
        fontFamily:'InterSemiBold',
    },
    visible: {
        display: 'flex',
    },
    hidden: {
        display: 'none',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});

export default PaymentMethodConfig;
