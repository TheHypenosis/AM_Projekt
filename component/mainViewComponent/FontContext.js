import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Font from 'expo-font';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        LoraRegular: require('../../assets/fonts/Lora/Lora-Regular.ttf'), 
        LoraItalic: require('../../assets/fonts/Lora/Lora-Italic.ttf'), 
        LoraBold: require('../../assets/fonts/Lora/Lora-Bold.ttf'), 
        LoraSemiBold: require('../../assets/fonts/Lora/static/Lora-SemiBold.ttf'),
        InterRegular: require('../../assets/fonts/Inter/static/Inter-Regular.ttf'),
        InterSemiBold: require('../../assets/fonts/Inter/static/Inter-SemiBold.ttf'),
        InterMedium: require('../../assets/fonts/Inter/static/Inter-Medium.ttf'),
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
  
