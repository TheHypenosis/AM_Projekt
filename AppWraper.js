// AppWrapper.js
import React from 'react';
import { UserProvider } from './component/userHandling/UserContext.js';  // Importuj UserProvider

const AppWrapper = (WrappedComponent) => {
  // Funkcja zwracająca komponent opakowany w UserProvider
  return () => (
    <UserProvider>
      <WrappedComponent />
    </UserProvider>
  );
};

export default AppWrapper;