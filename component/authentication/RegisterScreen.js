import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../userHandling/UserContext';
import { addUserData } from '../db/queries/addUser.query';

const RegisterScreen = () => {

    const navigation = useNavigation(); 
    const { setUser } = useUser();
    
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [areacode, setAreacode] = useState('');
    const [phone, setPhone] = useState('');

  const handleRegister = async () => {
    

    console.log('Registering with:', { mail, password, name, surname, areacode, phone });

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
        
      } else {
        console.error('Error registering user:', response.message);
       
      }
    } catch (error) {
      console.error('Error registering user:', error);
      
    }
    const handleGoBack = () => {
      navigation.goBack();
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
       <TouchableOpacity onPress={handleGoBack} style={styles.headerIcon}>
         <Image source={require('../../assets/img/ProductPage/Arrow-left.png')} style={styles.iconImage} />
       </TouchableOpacity>
     </View>        
        <Text style={styles.title}>Register</Text>
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
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
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
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  phoneInput: {
    flex: 2,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
});

export default RegisterScreen;
