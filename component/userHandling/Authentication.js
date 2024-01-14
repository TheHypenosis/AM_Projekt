import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useUser } from './UserContext';
import { getUserData } from '../db/queries/authValidation.query';

const AuthViewScreen = () => {
  const { setUser } = useUser();
  const [loggedInUser, setLoggedInUser] = useState(/* your user object here */);

  const handleLogin = async () => {
    // Hardcoded login and password for testing purposes
    const login = 'leslieflores@email.com';
    const password = 'lflores';

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
    <View>
      <Text>Login Page</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default AuthViewScreen;
