import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

// Komponent powitalny
const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/img/Onboarding+Intro/Background-Onboarding.png')} 
        style={styles.backgroundImage}
      />
      <Text style={styles.title}>Welcome to MATCHY-MATCHY</Text>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonregister} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonregistertext}>Let's begin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonlogin} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonlogintext}>Already have an account?</Text>
        </TouchableOpacity>
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 390,
    textAlign: 'center',
    color: '#1F2223',
    fontSize: 40,
    fontFamily: 'LoraRegular',
    fontWeight: '400',
    lineHeight: 50,
    wordWrap: 'break-word',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop:234,
    marginBottom: -250, 
  },
  buttonregister: {
    width: 342,
    height: 48,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#CA9446',
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonregistertext: {
    textAlign: 'center',
    color: '#363939',
    fontSize: 16,
    fontFamily: 'InterRegular',
    fontWeight: '400',
    lineHeight: 19.84,
    wordWrap: 'break-word',
  },
  buttonlogin: {
    width: 342,
    height: 36,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#ECD7BA',
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonlogintext: {
    textAlign: 'center',
    color: '#363939',
    fontSize: 14,
    fontFamily: 'InterRegular',
    fontWeight: '600',
    lineHeight: 17.36,
    wordWrap: 'break-word',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    width: '100%',
  },
});

export default WelcomeScreen;