import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView, SafeAreaView, StyleSheet, Image, TouchableHighlight, TextInput } from 'react-native';
import { getPaymentInfo } from '../db/queries/creditInfo.query';
import { getAddressInfo } from '../db/queries/addressInfo.query';
import { useCart } from '../orderComponent/CartContext'
import { useUser } from '../userHandling/UserContext';


const CheckoutScreen = ({ route, navigation }) => {
    const [addressInfoMapped, setAddressInfoMapped] = useState([]); 
    const [paymentInfoMapped, setPaymentInfoMapped] = useState([]);  
    const { user } = useUser();
    const { sum } = route.params;
 

    const handleGoBack = () => {
        navigation.goBack();
      };

      const fetchData = async () => {
        try {
            const defaultAddressInfo = await getAddressInfo(user.Address);
            const addressInfoMapped = defaultAddressInfo.map((item) => {
                return {
                    key: item.ID,
                    addressLine1: item.AddressLine1,
                    addressLine2: item.AddressLine2,
                    postalCode: item.PostalCode,
                    city: item.City,
                    country: item.Country,
                    name: item.Name,
                    surname: item.Surname
                };
            });

            setAddressInfoMapped(addressInfoMapped);
            console.log('Mapped Address Info: ', addressInfoMapped);
        } catch (error) {
            console.error('Error fetching default address info:', error);
        }

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

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // Fetch data when the screen comes into focus
          fetchData();
        });
    
        return unsubscribe;
      }, [navigation]); // Add navigation as a dependency
    

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
            {/* Custom header */}
                <View style={styles.headerContainer}>
                    {/* Top left icon (back button) */}
                    <TouchableOpacity onPress={handleGoBack} style={styles.headerIcon}>
                    <Image source={require('../../assets/img/ProductPage/Arrow-left.png')} style={styles.iconImage} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Checkout</Text>
                </View>
            
            <ScrollView>
                <View style={styles.contentContainer}>
                    <View style={styles.contentContextContainer}>
                        <View style={styles.contentHeaderContainer}>
                            <Text style={styles.contentHeaderText}>Payment Method</Text>
                            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('PaymentMethodEdit')}>
                                <Text>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.paymentMethodCardContainer}>
                            <Image source={require('../../assets/img/Checkout/CreditCard.png')} style={styles.backgroundImage}/>
                            <View style={styles.overlayContent}>
                                {paymentInfoMapped.length > 0 ? (
                                    paymentInfoMapped.map((payment) => (
                                        <View key={payment.key} style={styles.paymentInfoContainer}>
                                            <View style={styles.cardHolderContainer}>
                                                <Text style={styles.cardHolderName}>{payment.cardHolderName}</Text>
                                            </View>
                                            <View style={styles.cardNumberContainer}>
                                                <Text style={styles.cardNumber}>
                                                    {typeof payment.cardNumber === 'string' || typeof payment.cardNumber === 'number' ?
                                                        `**** **** **** ${String(payment.cardNumber).slice(-4)}` :
                                                        `Unexpected Value: ${JSON.stringify(payment.cardNumber)}`
                                                    }
                                                </Text>
                                            </View>
                                        </View>
                                    ))
                                ) : (
                                    <View style={styles.noTextContainer}>
                                        <Text style={styles.noText}>No Payment Method information available.</Text>
                                    </View>
                                )}
                            </View>



                        </View>
                    </View>
                    <View style={styles.contentContextContainer}>
                        <View style={styles.contentHeaderContainer}>
                            <Text style={styles.contentHeaderText}>Address</Text>
                            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('AddressEdit')}>
                                <Text>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.addressContentContainer}>
                        {addressInfoMapped.length > 0 ? (
                            addressInfoMapped.map((address) => (
                                <View style={styles.addressContextContainer}>
                                    <Text style={styles.addressContextContainerName}>{address.name} {address.surname}</Text>
                                    <Text style={styles.addressContextContainerText}>{address.addressLine1} {address.addressLine2}</Text>
                                    <Text style={styles.addressContextContainerText}>{address.postalCode}, {address.city}</Text>
                                    <Text style={styles.addressContextContainerText}>{address.country}</Text>
                                </View>
                                )) 
                        ) : (
                            <View >
                                <View style={styles.noTextContainer}>
                                <Text style={styles.noText}>No address information available.</Text>
                                </View>
                            </View>
                        )}
                        </View>
                    </View>
                    <View style={styles.promoCodeContainer}>
                        <TextInput
                            style={styles.promoCodeInput}
                            placeholder="Promo code"
                        />
                        <TouchableOpacity style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.paymentFinalizationContainer}>
                        <View style={styles.paymentFinalizationTextContainer}>
                            <Text style={styles.paymentFinalizationBasicText}>Delivery</Text>
                            <Text style={styles.paymentFinalizationSmallText}>Free</Text>
                        </View>
                        <View style={styles.paymentFinalizationTextContainer}>
                            <Text style={styles.paymentFinalizationBigText}>Total</Text>
                            <Text style={styles.paymentFinalizationSum}>${sum.toFixed(2)}</Text>
                        </View>
                    </View>
                    <View style={styles.finalPaymentButtonContainer}>
                    <TouchableHighlight
                        style={styles.payNowButton}
                        onPress={() => navigation.navigate('OrderFinalized', {sum})}
                        underlayColor="#444" 
                        >
                        <Text style={styles.payNowButtonText}>Pay now</Text>
                    </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
            </View>
        </SafeAreaView>
    )
}


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
    contentContextContainer:{
        paddingTop:20,
        paddingBottom: 15,
        borderBottomWidth:1,
        borderBottomColor: '#D2D3D3',
    },
    contentHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end', // Align items at the bottom
        paddingBottom: 30, // Adjusted paddingBottom
        },
    contentHeaderText: {
        fontFamily: 'LoraSemiBold',
        fontSize: 18,
        color: '#363939',
        marginLeft: 20,
    },
    editButton: {
        top: 8,
        right: 8,
        borderColor: '#363939',
        borderWidth: 1,
        borderRadius: 6,
        width: 60,
        height: 35, // Set a fixed height for the button
        justifyContent: 'center', // Center text vertically
        alignItems: 'center', // Center text horizontally
    },
    paymentMethodCardContainer: {
        position: 'relative',
        width: '90%',
        height: 210,
    },
    backgroundImage: {
        resizeMode: 'cover',
        width: '100%', // Use 100% width to cover the entire container
        height: 210, // Use 100% height to cover the entire container
        left:20,
    },
        overlayContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 20,
    },   
    visible: {
        display: 'flex',
    },
    hidden: {
        display: 'none',
    },
    noTextContainer:{
        alignItems: 'center',
    },
    noText:{
        fontFamily:'InterSemiBold',
        fontSize:18,
    },
    paymentInfoContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flex: 1,
        width: '100%',
        padding: 20,
    },
    cardHolderContainer: {
        position: 'absolute',
        top: 25,
        right:-35,
    },
    cardHolderName: {
        fontFamily: 'InterMedium',
        fontSize: 14,
        color: '#1F2223',
    },
    cardNumberContainer: {
        position: 'absolute',
        bottom: -10,
        left: 15,
    },
    cardNumber: {
        fontFamily: 'InterMedium',
        fontSize: 14,
        color: '#1F2223',
    },
    promoCodeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding:25,
        borderBottomWidth: 1,
        borderBottomColor: '#D2D3D3',
    },
    promoCodeInput: {
        width: '80%',
        borderColor: '#D2D3D3',
        borderWidth: 1,
        borderRadius: 6,
        padding: 8,
    },
    submitButton: {
        backgroundColor: '#363939',
        borderRadius: 6,
        padding: 10,
        marginLeft: 10, // Adjust the margin as needed
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontFamily: 'InterMedium',
        fontSize: 14,
        textAlign: 'center',
    },
    addressContextContainer:{
        paddingLeft:20,
    },
    addressContextContainerName:{
        fontFamily: 'InterSemiBold',
        fontSize: 16,
        color: '#363939',
        paddingBottom:5,
    },
    addressContextContainerText:{
        fontFamily: 'InterRegular',
        fontSize: 14,
        color: '#797A7B',
    },
    paymentFinalizationContainer:{
        borderColor: '#D2D3D3',
        borderBottomWidth: 1,
    },
    paymentFinalizationTextContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:15,
        marginLeft:20,
        marginRight:20,
        // marginBottom:10,
    },
    paymentFinalizationBasicText:{
        fontFamily: 'InterSemiBold',
        fontSize: 16,
        color: '#363939',
    },
    paymentFinalizationSmallText:{
        fontFamily: 'InterRegular',
        fontSize: 16,
        color: '#363939',
    },
    paymentFinalizationBigText:{
        fontFamily: 'InterSemiBold',
        fontSize: 20,
        color: '#363939',
    },
    paymentFinalizationSum:{
        fontFamily: 'LoraSemiBold',
        fontSize: 24,
        color: '#363939',
    },
    finalPaymentButtonContainer:{
        height:100,
    },  
    payNowButton: {
        borderRadius: 6,
        borderWidth: 1,
        width: '90%',
        alignItems: 'center',
        backgroundColor: '#363939',
        alignSelf: 'center',  // Align the button to the center horizontally
        marginTop: 20,        // Adjust the margin as needed
        paddingTop: 10,
        paddingBottom: 10,
      },
      
      payNowButtonText: {
        fontFamily: 'InterMedium',
        fontSize: 16,
        color: '#FFFFFF',
      },
});
export default CheckoutScreen;