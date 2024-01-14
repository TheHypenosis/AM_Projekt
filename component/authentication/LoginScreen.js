import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../userHandling/UserContext';
import { getUserData } from '../db/queries/authValidation.query';



const LoginScreen = () => {

    const navigation = useNavigation();

    const { setUser } = useUser();
    const [loggedInUser, setLoggedInUser] = useState(/* your user object here */);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      // Hardcoded login and password for testing purposes
      console.log(login);
      try {
        // Fetch user data from the database
        const userData = await getUserData({ login, password });
  
        // Assuming the query returns an array with user data
        if (userData && userData.length > 0) {
          const user = userData[0];
          setLoggedInUser(user);
          setUser(user);
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };
    return (
     <View style={styles.container}>
        <View style={styles.header}>
            <Button title="Back" onPress={() => navigation.goBack()} />
        </View>
        <Text style={styles.title}>Log In</Text>
          <TextInput
        placeholder="E-mail"
        value={login}
        onChangeText={setLogin}
        style={styles.input}
      />
          <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
         <Button title="Log In" onPress={handleLogin} />
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
});

export default LoginScreen;
