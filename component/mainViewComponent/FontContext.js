import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Font from 'expo-font';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        LoraRegular: require('../../assets/fonts/Lora/Lora-Regular.ttf'), // Update the path
        LoraItalic: require('../../assets/fonts/Lora/Lora-Italic.ttf'), // Update the path
        LoraBold: require('../../assets/fonts/Lora/Lora-Bold.ttf'), // Update the path
        InterRegular: require('../../assets/fonts/Inter(1)/static/Inter-Regular.ttf'),
        // Add other variants if needed
      });

      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  return (
    <FontContext.Provider value={fontsLoaded}>{children}</FontContext.Provider>
  );
};

export const useFontsLoaded = () => {
    const context = useContext(FontContext);
    if (context === undefined) {
      throw new Error('useFontsLoaded must be used within a FontProvider');
    }
    return context;
  };
  
