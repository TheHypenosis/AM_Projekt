import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableHighlight, Button, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';

import { useUser, updateUser } from '../userHandling/UserContext';
import { getAddressInfo, setAddressInfo, updateUserAddressInfo } from '../db/queries/addressInfo.query';

const AddressConfig = ({ navigation }) => {
    const [addressInfoMapped, setAddressInfoMapped] = useState([]);  
    const [addressSavingPressed, setAddressSavingPressed] = useState(false);
    const [addressInfoNew, setAddressInfoNew] = useState({
        addressLine1: '',
        addressLine2: '',
        postalCode: '',
        city: '',
        country: '',
        name: '',
        surname: ''
      });
    const { user } = useUser();
    const [isVisible, setIsVisible] = useState(true);
    const [emptyFields, setEmptyFields] = useState(false); // New state for empty fields

    const fetchData = async () => {
        try {
            const defaultAddressInfo = await getAddressInfo(user.Address);
            console.log('Default Address Info:', defaultAddressInfo.CCV);

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
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddressSaving = () => {
        if (!emptyFields) {
            setAddressSavingPressed(true);
        }
    };

    const handleGoBack = () => {
        navigation.goBack(); 
      };
    const handleEditButton = () => {
        isVisible ? setIsVisible(false) : setIsVisible(true);
    }

    useEffect(() => {
        const hasEmptyFields = Object.values(addressInfoNew).some(value => value === '');
        setEmptyFields(hasEmptyFields);
    }, [addressInfoNew]);

    useEffect(() => {
        const handleSaveAddressInfo = async () => {
            try {
                    const { result, insertedId } = await setAddressInfo(
                        addressInfoNew.addressLine1,
                        addressInfoNew.addressLine2,
                        addressInfoNew.postalCode,
                        addressInfoNew.city,
                        addressInfoNew.country,
                        addressInfoNew.name,
                        addressInfoNew.surname
                    );

                    // Log the result and insertedId
                    console.log('Address info set successfully:', result);
                    console.log('Inserted ID:', insertedId);

                    await updateUserAddressInfo(insertedId, user.Email);
                    user.Address = insertedId;
            } catch (error) {
                console.error('Error setting address info:', error);
            } finally {
                fetchData();
                setAddressSavingPressed(false); 
                setIsVisible(true);
            }
        };

        if (addressSavingPressed) {
            handleSaveAddressInfo();
        }
    }, [addressSavingPressed, addressInfoNew, updateUser, user.Email]);

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
          {addressInfoMapped.length > 0 ? (
            addressInfoMapped.map((info) => (
            <View style={isVisible ? styles.visible : styles.hidden}>    
            <View style={styles.cardInfoContainer} key={info.key}>
                <Text style={styles.cardTitle}>Address Information:</Text>
                <View style={styles.textRowContainer}>
                    <Text style={styles.textTitle}>Address Line 1: </Text><Text>{info.addressLine1}</Text>
                </View>
                <View style={styles.textRowContainer}>
                    <Text style={styles.textTitle}>Address Line 2: </Text><Text>{info.addressLine2}</Text>
                </View>
                <View style={styles.textRowContainer}>
                    <Text style={styles.textTitle}>Postal Code: </Text><Text>{info.postalCode}</Text>
                </View>
                <View style={styles.textRowContainer}>
                    <Text style={styles.textTitle}>City: </Text><Text>{info.city}</Text>
                </View>
                <View style={styles.textRowContainer}>
                    <Text style={styles.textTitle}>Country: </Text><Text>{info.country}</Text>
                </View>
                <View style={styles.textRowContainer}>
                    <Text style={styles.textTitle}>Name: </Text><Text>{info.name}</Text>
                </View>
                <View style={styles.textRowContainer}>
                    <Text style={styles.textTitle}>Surname: </Text><Text>{info.surname}</Text>
                </View>
            </View> 
            </View>
            )) 
            ) : (
                <View style={isVisible ? styles.visible : styles.hidden}>
                    <View style={styles.noTextContainer}>
                    <Text style={styles.noText}>No address information available.</Text>
                    </View>
                </View>
            )}
        
        <View style={isVisible ? styles.hidden : styles.visible}>
            <View style={styles.inputContainer}>
            <TextInput
                placeholder="Address Line 1"
                style={styles.input}
                value={addressInfoNew.addressLine1}
                onChangeText={(text) => {
                    setAddressInfoNew({
                        ...addressInfoNew,
                        addressLine1: text,
                    });
                }}
            />
            <TextInput
                placeholder="Address Line 2"
                style={styles.input}
                value={addressInfoNew.addressLine2}
                onChangeText={(text) => {
                    setAddressInfoNew({
                        ...addressInfoNew,
                        addressLine2: text,
                    });
                }}
            />
            <TextInput
                placeholder="Postal Code"
                style={styles.input}
                value={addressInfoNew.postalCode}
                onChangeText={(text) => {
                    setAddressInfoNew({
                        ...addressInfoNew,
                        postalCode: text,
                    });
                }}
            />
            <TextInput
                placeholder="City"
                style={styles.input}
                value={addressInfoNew.city}
                onChangeText={(text) => {
                    setAddressInfoNew({
                        ...addressInfoNew,
                        city: text,
                    });
                }}
            />
            <TextInput
                placeholder="Country"
                style={styles.input}
                value={addressInfoNew.country}
                onChangeText={(text) => {
                    setAddressInfoNew({
                        ...addressInfoNew,
                        country: text,
                    });
                }}
            />
            <TextInput
                placeholder="Name"
                style={styles.input}
                value={addressInfoNew.name}
                onChangeText={(text) => {
                    setAddressInfoNew({
                        ...addressInfoNew,
                        name: text,
                    });
                }}
            />
            <TextInput
                placeholder="Surname"
                style={styles.input}
                value={addressInfoNew.surname}
                onChangeText={(text) => {
                    setAddressInfoNew({
                        ...addressInfoNew,
                        surname: text,
                    });
                }}
            />
            <View style={styles.saveButtonContainer}>
                <TouchableHighlight
                    style={emptyFields ? styles.saveButtonEmpty : styles.saveButton}
                    onPress={handleAddressSaving}
                    underlayColor={emptyFields ? '#B0B0B0' : '#444'}
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
});

export default AddressConfig;
