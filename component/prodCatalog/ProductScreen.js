import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { getAvailability } from '../db/queries/availability.query';
import { useCart } from '../orderComponent/CartContext';

const ProductScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [sizeAvailability, setSizeAvailability] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [sizes, setSizes] = useState();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { dispatch } = useCart();

const addToCart = () => {
    const isAvailable = sizeAvailability.find((size) => size.SizeName === selectedSize)?.isAvailable;

    if (isAvailable) {
      // Dispatch an action to add the item to the cart
      dispatch({ type: 'ADD_TO_CART', payload: item });
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };
    console.log('PRODID: ',item.prodID);
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const availabilityData = await getAvailability(item.prodID); 
        console.log('Availability Query:', availabilityData);
        setSizeAvailability(availabilityData);
      } catch (error) {
        console.error('Error fetching availability data:', error);
      }
    };
  
    fetchAvailability();
  }, [item.prodID]);

  useEffect(() => {
    setSizes(
      sizeAvailability.map((size) => ({ label: size.SizeName, value: size.SizeName }))
    );
  }, [sizeAvailability]);

  const viewAvailability = (size) => {
    setSelectedSize(size);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
console.log(route);
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {/* Custom header */}
          <View style={styles.headerContainer}>
            {/* Top left icon (back button) */}
            <TouchableOpacity onPress={handleGoBack} style={styles.headerIcon}>
              <Image source={require('../../assets/img/ProductPage/Arrow-left.png')} style={styles.iconImage} />
            </TouchableOpacity>

            {/* Top right icon (custom action) */}
            <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.headerIcon}>
              <Image source={require('../../assets/img/Home/Cart.png')} style={styles.iconImage} />
            </TouchableOpacity>
          </View>

          {/* Product Details */}
          <View>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.titleContainer}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Image source={require('../../assets/img/Home/Wishlist.png')} style={styles.wishlistLogo} />
            </View>

            <Text style={styles.sizeTitle}>Size</Text>
            {/* Size Dropdown */}
            <View style={styles.sizeContainer}>
              <DropDownPicker
                style={styles.dropDown}
                open={open}
                value={value}
                items={sizes}
                placeholder="Select Size"
                onChangeValue={(value) => {
                  viewAvailability(value);
                }}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setSizes}
                textStyle={styles.dropdownText}
              />

              {/* Availability Display */}
              <View style={styles.availabilityContainer}>
                {selectedSize ? (
                  <View>
                    {sizeAvailability.find((size) => size.SizeName === selectedSize)?.isAvailable ? (
                      <Text style={styles.availabilityTextTrue}>Available</Text>
                    ) : (
                      <Text style={styles.availabilityTextFalse}>Not Available</Text>
                    )}
                  </View>
                ) : (
                  <Text style={styles.defaultAvailabilityText}>No Size Selected!</Text>
                )}
              </View>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.descriptionText}>
                {showFullDescription ? item.description : `${item.description.slice(0, 200)}... `}
                <Text onPress={toggleDescription} style={styles.readMore}>
                  {showFullDescription ? ' Read less' : ' Read more'}
                </Text>
              </Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{item.price}</Text>
                <TouchableHighlight
                  style={sizeAvailability.find((size) => size.SizeName === selectedSize)?.isAvailable ? styles.addToCartButton : styles.addToCartButtonDisabled}
                  onPress={addToCart}
                  underlayColor={sizeAvailability.find((size) => size.SizeName === selectedSize)?.isAvailable ? '#444' : '#B0B0B0'}
                >
                  <Text style={styles.cartButtonText}>Add to Cart</Text>
                </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerIcon: {
    padding: 8,
    zIndex:2,
  },
  productImage: {
    width: '100%',
    height: 500,
    top: -60,
    zIndex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: -40,
  },
  productTitle: {
    fontFamily: 'LoraSemiBold',
    fontSize: 32,
    color: '#363939',
    marginLeft: 20,
  },
  wishlistLogo: {
    top: 12,
    marginRight: 20,
    height:25,
    width:25,
  },
  sizeContainer: {
    width: '40%',
    top:-10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ECD7BA',
    marginLeft: 20,
    marginBottom: 30,
    zIndex: 1,
  },
  dropDown:{
    borderWidth: 0,
    borderRadius:5,
    backgroundColor: '#ECD7BA',
    zIndex: 2,
  },
  dropdownText:{
    fontSize:14,
    fontFamily: 'InterSemiBold',
    marginLeft:2,
  },
  availabilityContainer: {
    marginTop: 24,
    zIndex: 1,
  },
  availabilityTextTrue:{
    color: '#1E9C40',
    fontFamily: 'InterSemiBold',
    fontSize: 12,
    marginLeft:12,
    top:-13,
  },
  availabilityTextFalse:{
    color: '#E90202',
    fontFamily: 'InterSemiBold',
    fontSize: 12,
    marginLeft:12,
    top:-13,
  },
  defaultAvailabilityText: {
    fontFamily: 'InterSemiBold',
    fontSize: 12,
    marginLeft:12,
    top:-13,
  },
  sizeButton: {
    padding: 10,
    borderRadius: 8,
  },
  sizeTitle: {
    fontSize: 14,
    fontFamily: 'InterMedium',
    marginLeft:24,
    top: -20,
  },
  descriptionContainer:{
    marginLeft:20,
    top:-20,
    zIndex: 0,
  },
  descriptionTitle:{
    fontFamily:'LoraSemiBold',
    fontSize:18,
    color: '#363939',
    marginBottom:5,
  },
  descriptionText:{
    fontFamily:'InterSemiBold',
    fontSize:16,
    color: '#797A7B',
    marginRight:10,
  },
  readMore: {
    fontFamily:'InterSemiBold',
    fontSize:16,
    color: '#363939',
  },
  priceContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'#ECD7BA',
    paddingTop:30,
    paddingBottom:30,
  },
  priceText:{
    fontFamily:'InterSemiBold',
    fontSize:20,
    color: '#363939',
    marginLeft:20,
    top: 8,
  },
  addToCartButton:{
    borderRadius:6,
    borderWidth:1,
    width: '60%',
    alignItems:'center',
    backgroundColor:'#363939',
    marginRight:20,
    paddingTop:10,
    paddingBottom:10,
  },
  addToCartButtonDisabled:{
    borderRadius:6,
    borderWidth:1,
    width: '60%',
    alignItems:'center',
    backgroundColor:'#B0B0B0',
    borderColor: '#B0B0B0',
    marginRight:20,
    paddingTop:10,
    paddingBottom:10,
  },
  cartButtonText: {
    fontFamily: 'InterMedium',
    fontSize: 16,
    color: '#FFFFFF',
  },

});

export default ProductScreen;
