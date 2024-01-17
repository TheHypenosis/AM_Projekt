import React, { useState, useEffect } from 'react';
import { View, Image, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../userHandling/UserContext';
import { saveImageToDatabase } from '../db/queries/imagesInfo.query';

export default function PhotoConfig({ navigation }) {
  const { user } = useUser();
  const [image, setImage] = useState(null);

  const handleGoBack = () => {
    navigation.goBack(); // This will go back to the previous screen
  };

  const doQuery = async () => {
    await saveImageToDatabase(user.Photo, user.Email);
    console.log("Image changed from the PhotoConfig view");
  }

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      user.Photo = result.uri;
      doQuery();
    }
  };

  const pickImageFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      user.Photo = result.uri;
      doQuery();
    }
  };

  return (
    
    <View >
            {/* Custom header */}
            <View style={styles.headerContainer}>
    {/* Top left icon (back button) */}
    <TouchableOpacity onPress={handleGoBack} style={styles.headerIcon}>
        <Image source={require('../../assets/img/ProductPage/Arrow-left.png')} style={styles.iconImage} />
    </TouchableOpacity>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
        <Text style={styles.imageText}>Take a photo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pickImageFromLibrary} style={styles.imageButton}>
        <Text style={styles.imageText}>Upload a photo</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  buttonContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top:340,
  },
  imageButton:{
    borderWidth:1,
    borderRadius:10,
    backgroundColor: '#363939',
    width:150,
    height:40,
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
    marginBottom:40,
  },
  imageText:{
    fontSize:16,
    fontFamily:'InterMedium',
    color: '#FFFFFF',
  }
});
