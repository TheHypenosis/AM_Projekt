import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Modal, Button, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';

import { useUser, updateUser } from '../userHandling/UserContext';
import { getPaymentInfo, setPaymentInfo, updatePaymentInfo, updateUserPaymentInfo } from '../db/queries/creditInfo.query';
import { getNewUserData } from '../db/queries/userUpdate.query';

const WishlistTemp = () => {
    // const [paymentInfoMapped, setPaymentInfoMapped] = useState([]);  
    // const [paymentSavingPressed, setPaymentSavingPressed] = useState(false);
    // const [paymentInfoNew, setPaymentInfoNew] = useState({
    //     cardHolderName: '',
    //     cardNumber: '',
    //     ccv: '',
    //     expDate: '',
    //   });
    // const { user } = useUser();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const defaultPaymentInfo = await getPaymentInfo(user.PaymentMethod);
    //             console.log('Default Payment Info:', defaultPaymentInfo.CCV);

    //             const paymentInfoMapped = defaultPaymentInfo.map((item) => {
    //                 return {
    //                     key: item.ID,
    //                     cardHolderName: item.Name,
    //                     cardNumber: item.CardNumber,
    //                     expiryDate: item.ExpiryDate,
    //                     ccv: item.CCV,
    //                 };
    //             });

    //             setPaymentInfoMapped(paymentInfoMapped);
    //             console.log('Mapped Payment Info: ', paymentInfoMapped);
    //         } catch (error) {
    //             console.error('Error fetching default payment info:', error);
    //         }
    //     };

    //     fetchData(); // Call the fetchData function when the component mounts
    //     // Optionally, you can specify dependencies if needed. For example, [user.PaymentMethod]
    // }, []);

    // const handlePaymentSaving = () => {
    //     setPaymentSavingPressed(true);
    // };

    // useEffect(() => {
    //     const handleSavePaymentInfo = async () => {
    //         try {
    //             if (!user.PaymentMethod) {
    //                 // INSERT PAYMENTMETHOD
    //                 const { result, insertedId } = await setPaymentInfo(
    //                     paymentInfoNew.cardHolderName,
    //                     paymentInfoNew.cardNumber,
    //                     paymentInfoNew.ccv,
    //                     paymentInfoNew.expDate
    //                 );

    //                 // Log the result and insertedId
    //                 console.log('Payment info set successfully:', result);
    //                 console.log('Inserted ID:', insertedId);

    //                 // UPDATE USER
    //                 await updateUserPaymentInfo(insertedId, user.Email);

    //                 // UPDATE USER CONTEXT
    //                 const newUserData = await getNewUserData(user.Email);
    //                 updateUser(newUserData);
    //             } else {
    //                 await updatePaymentInfo(
    //                     paymentInfoNew.cardHolderName,
    //                     paymentInfoNew.cardNumber,
    //                     paymentInfoNew.ccv,
    //                     paymentInfoNew.expDate,
    //                     user.PaymentMethod
    //                 );
    //             }
    //         } catch (error) {
    //             console.error('Error setting payment info:', error);
    //         } finally {
    //             setPaymentSavingPressed(false); // Reset the flag
    //         }
    //     };

    //     if (paymentSavingPressed) {
    //         handleSavePaymentInfo();
    //     }
    // }, [paymentSavingPressed, paymentInfoNew, updateUser, user.Email]);

    return (
        <View>
        {/* {paymentInfoMapped.map((info) => (
        <View>
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
                value={paymentInfoNew.expiryDate}
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
        </View>
            ))}
            <Button onPress={handlePaymentSaving} title="Save" style={styles.saveButton} />
            {paymentInfoMapped.map((info) => (
            <View key={info.key}>
                <Text>Card Holder Name: {info.cardHolderName}</Text>
                <Text>Card Number: {info.cardNumber}</Text>
                <Text>Expiry Date: {info.expiryDate}</Text>
                <Text>CCV: {info.ccv}</Text>
            </View> 
            ))}
             */}
        </View>
    );
};

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor:'#363939',
        marginTop:20,
    },
    saveButton:{
        marginTop:20,
    }
});

export default WishlistTemp;
