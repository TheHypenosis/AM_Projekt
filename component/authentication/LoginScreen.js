import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../userHandling/UserContext';
import AuthViewScreen from '../userHandling/Authentication';



const LoginScreen = () => {
    const navigation = useNavigation(); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { setUser } = useUser();

    const handleLogin = (user) => {
      setUser(user);
    };


    return (
     <View style={styles.container}>
        <View style={styles.header}>
            <Button title="Back" onPress={() => navigation.goBack()} />
        </View>
        <Text style={styles.title}>Log In</Text>
          <TextInput
        placeholder="E-mail"
        value={username}
        onChangeText={setUsername}
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
