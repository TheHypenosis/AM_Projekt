
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Komponent powitalny
const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Log In"
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          title="Sign In"
          onPress={() => navigation.navigate('Register')}
        />
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
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
});

export default WelcomeScreen;