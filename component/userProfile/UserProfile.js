import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Modal, Button, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { useNavigation, useIsFocused  } from '@react-navigation/native';
import { useUser } from '../userHandling/UserContext';
import { UserImage } from '../imageHandler/userImageHandler';

const windowWidth = Dimensions.get('window').width;


export default function Profile() {
    const { user, updateUser } = useUser();
    const userImageKey = user.Photo;
    const [selectedImage, setSelectedImage] = useState();
    const navigation = useNavigation();
    const isFocused = useIsFocused();  // Use isFocused hook
    const [reloadImage, setReloadImage] = useState(false);
    
    const optionsData = [
      {
        name: "Orders",
        image: require('../../assets/img/Profile/shopping-bag.png'),
      },
      {
          name: "Payment Methods",
          image: require('../../assets/img/Profile/credit-card.png'),
        },
      {
        name: "Address",
        image: require('../../assets/img/Profile/map-pin.png'),
      },
    ];

    const handleImageReload = () => {
      setSelectedImage({uri: user.Photo})
      setReloadImage((prev) => !prev);
    };
    useEffect(() => {
      {UserImage[userImageKey] ? setSelectedImage(UserImage[userImageKey]) : setSelectedImage({uri: user.Photo})}
    }, []);

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        // When the screen is focused, reload the image
        handleImageReload();
      });
  
      // Return the unsubscribe function to clean up the listener
      return unsubscribe;
    }, [navigation, isFocused]); 

    

    function viewOptions() {
        return console.log("View All Button pressed - Options!");
      }

      
      const renderOptionsCarouselItem = ({ item }) => {

        const handleCarouselPress = () => {
          switch (item.name) {
            case 'Orders':
              navigation.navigate('PaymentMethodConfig');
              break;
            case 'Payment Methods':
              navigation.navigate('PaymentMethodConfig');
              break;
            case 'Address':
              navigation.navigate('AddressConfig');
              break;
          }
        }

        return (
          <TouchableOpacity onPress={handleCarouselPress}>
            <View style={styles.optionsCarouselItem}>
              {/* Centered Image */}
              <Image source={item.image} style={styles.optionsCarouselImage} />
          
              {/* Text under the image */}
              <Text style={styles.optionsCarouselText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        );
      };
      
      return (
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Profile</Text>
                <TouchableOpacity onPress={() => console.log('Top Right Icon Pressed')} style={styles.headerIcon}>
                <Image source={require('../../assets/img/Home/Cart.png')} style={styles.iconImage} />
                </TouchableOpacity>
            </View>
            <View style={styles.userPhotoContainer}>
                <TouchableOpacity style={styles.photoEditButton} onPress={() => navigation.navigate('PhotoConfig')}>
                    <Text>Edit</Text>
                </TouchableOpacity>
                <Image key={reloadImage} source={selectedImage}  style={styles.userPhoto} />
                <Text style={styles.userNameText}>{user.Name} {user.Surname}</Text>
            </View>
            <View style={styles.configContainer}>
                <View style={styles.configHeaderContainer}>
                    <Text style={styles.configHeaderText}>Account</Text>
                    <TouchableOpacity onPress={viewOptions}>
                        {/* <Text style={styles.viewAllText}>View all</Text> */}
                    </TouchableOpacity>
                </View>
                <View>
                <Carousel
                    data={optionsData}
                    renderItem={renderOptionsCarouselItem}
                    sliderWidth={windowWidth}
                    itemWidth={windowWidth - 240}
                    layout="default"
                    inactiveSlideScale={1} // Scale factor for inactive slides
                    inactiveSlideOpacity={1} // Opacity for inactive slides
                    firstItem={0} 
                    activeSlideAlignment="start"
                    //contentContainerCustomStyle={{ paddingLeft: 20, paddingRight: 40, overflow: 'visible' }} 
                />
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
        paddingTop: 46,
        paddingBottom: 8,
      },
      headerText:{
        fontFamily:'LoraSemiBold',
        fontSize:24,
        color: '#363939',
        paddingLeft:10,
      },
      userPhotoContainer: {
        alignItems: 'center', // Center children horizontally
        position: 'relative', // Allow absolute positioning for the Edit button
        marginTop:30,
    },
      photoEditButton: {
        position: 'absolute',
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
      userPhoto: {
        width: 180,
        height: 180,
        borderRadius: 90,
        marginTop: 48,
      },
      userNameText: {
        fontFamily: 'LoraSemiBold',
        fontSize: 24,
        color: '#363939',
        marginTop: 8,
      },
      configHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
        marginTop:40,
      },
      configHeaderText: {
        fontFamily: 'LoraSemiBold',
        fontSize: 18,
        color: '#363939',
      },
      viewAllText: {
        fontFamily: 'InterRegular',
        fontSize: 14,
        color: '#797A7B',
      },
      optionsCarouselItem:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F0F0', // Set your desired background color
        padding: 16, // Adjust the padding as needed
        borderRadius: 10, // Adjust the border radius as needed
        backgroundColor: '#F6F6F6',
        marginLeft: 16,
        height:120,
        marginTop:20,
      },
      optionsCarouselImage:{
      },
      optionsCarouselText:{
        marginTop: 8, // Adjust the margin as needed
        fontSize: 16, // Adjust the font size as needed
        fontWeight: 'bold', // Adjust the font weight as needed
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderWidth:1,
        borderColor: '#363939',
        margin:40,
      },
      paymentMethodsText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      creditCardInput: {
        height: 40,
        borderColor: '#363939',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
      },
      
      
});