import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../userHandling/UserContext';
import { addUserData } from '../db/queries/addUser.query';

const RegisterScreen = () => {

    const navigation = useNavigation(); 
    const { setUser } = useUser();

    const [errorMessage, setErrorMessage] = useState('');
    
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [areacode, setAreacode] = useState('');
    const [phone, setPhone] = useState('');

  const handleRegister = async () => {
    

    console.log('Registering with:', { mail, password, name, surname, areacode, phone });
    if (!mail || !password || !name || !surname || !areacode || !phone) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const areaCodeWithPhone = `${areacode}${phone}`;
      const response = await addUserData({
        email: mail,
        password,
        name,
        surname,
        phone: areaCodeWithPhone,
      });
  
      if (response.success) {
        console.log('User registered successfully');
         setUser({ email: mail, name, surname, phone: areaCodeWithPhone });
        
      } else if (response.message === 'User already exists') {
        console.error('User already exists:', response.message);
        setErrorMessage('User with this email already exists.');

      } else {
        console.error('Error registering user:', response.message);
        setErrorMessage('Registration failed. Please try again.');
       
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessage('Email already used.');

      
    }    
  };
  
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={handleGoBack} style={styles.headerIcon}>
          <Image source={require('../../assets/img/ProductPage/Arrow-left.png')} style={styles.iconImage} />
        </TouchableOpacity>
     </View>
     <View style={styles.content}>
     <Text style={styles.title}> JOIN MATCHY MATCHY</Text>
      <TextInput
        placeholder="Email"
        value={mail}
        onChangeText={setMail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Surname"
        value={surname}
        onChangeText={setSurname}
        style={styles.input}
      />
      <View style={styles.phoneContainer}>
        <TextInput
          placeholder="Area Code"
          value={areacode}
          onChangeText={setAreacode}
          style={styles.areacodeInput}
        />
        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          style={styles.phoneInput}
        />
        </View>
        
      {errorMessage ? (<Text style={styles.errorMessage}>{errorMessage}</Text>) : null}
      </View>
      <TouchableOpacity style={styles.RegisterButton} onPress={handleRegister}>
        <Text>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#CA9446',
    fontFamily: 'LoraBold',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    width: '100%',
    marginTop: 130,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 121,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  phoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  areacodeInput: {
    flex: 1,
    marginRight: 10,
    height: 40,
    padding: 10,
    width: 15,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    
  },
  phoneInput: {
    flex: 2,
    height: 40,
    width: 70,
    padding: 10,
    marginLeft: 10,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  RegisterButton: {
    width: 342,
    height: 48,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#CA9446',
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontFamily: 'InterRegular',
    fontWeight: '500',
    color: '#363939',
    marginBottom: 56,
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
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});

export default RegisterScreen;
