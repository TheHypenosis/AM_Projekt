import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getUserData } from '../db/queries/authValidation.query';

// Action types
const SET_USER = 'SET_USER';

// Reducer function to handle state changes
const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// Create the context
const UserContext = createContext();

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// UserProvider component to wrap your application
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });

  // Function to set the user in the context
  const setUser = (user) => {
    dispatch({ type: SET_USER, payload: user });
  };

  // Function to update user data in the context based on fetched data
  const updateUserData = async ({ login, password }) => {
    try {
      const userData = await getUserData({ login, password });

      if (userData && userData.length > 0) {
        setUser(userData[0]);
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  useEffect(() => {
    const login = null;
    const password = null;

    // Fetch user data during initialization
    updateUserData({ login, password });
  }, []);

  const updateUser = (newUserData) => {
    setUser(newUserData);
  };

  return (
    <UserContext.Provider value={{ user: state.user, updateUser, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};
