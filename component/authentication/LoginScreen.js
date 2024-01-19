import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../userHandling/UserContext';
import { getUserData } from '../db/queries/authValidation.query';

const LoginScreen = () => {

    const navigation = useNavigation();

    const { setUser } = useUser();
    const [loggedInUser, setLoggedInUser] = useState();
    const [errorMessage, setErrorMessage] = useState(''); 

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      try {
        // Fetch user data from the database
        const userData = await getUserData({ login, password });

        if (userData && userData.length > 0) {
          const user = userData[0];
          setLoggedInUser(user);
          setUser(user);
          setErrorMessage('');
        } else {
          console.log('User not found');
          setErrorMessage('User not found. Please check your login and password.')
        }
      } catch (error) {
        console.error('Error during login:', error);
        setErrorMessage('An error occurred during login. Please try again.');
      }
    };
    const handleGoBack = () => {
      navigation.goBack();
    };
    return (
     <View style={styles.container}>
     <Image
        source={require('../../assets/img/Onboarding+Intro/Background-Intro1.png')} 
        style={styles.backgroundImage}
      />
     <View style={styles.header}>
       <TouchableOpacity onPress={handleGoBack} style={styles.headerIcon}>
         <Image source={require('../../assets/img/ProductPage/Arrow-left.png')} style={styles.iconImage} />
       </TouchableOpacity>
     </View>

     <View style={styles.content}>
        <Text style={styles.title}>MATCHY MATCHY</Text>
          <TextInput placeholder="E-mail" value={login} onChangeText={setLogin} style={styles.input}/>
          <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input}/>
          {errorMessage ? (<Text style={styles.errorMessage}>{errorMessage}</Text>) : null}
      </View>
       
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text>Sign In</Text>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    width: '100%',
  },
  headerIcon: {
    position: 'absolute',
    top: 40,
    left: 24,
  },
  header: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#ECD7BA',
    paddingTop: 78,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    top: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 390,
    textAlign: 'center',
    color: '#CA9446',
    fontSize: 24,
    fontFamily: 'LoraBold',
    fontWeight: '600',
    wordWrap: 'break-word',
    marginBottom: 50,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom:20,
    padding: 10,
  },
  loginButton: {
    width: 342,
    height: 48,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#CA9446',
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    fontSize: 16.,
    fontFamily: 'InterRegular',
    fontWeight: 500,
    color: '#363939',
    marginBottom: 300,
    marginTop: -200,
    position: 'absolute',
    bottom: -250,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default LoginScreen;
