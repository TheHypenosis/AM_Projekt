// App.js

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import initializeDatabase from './component/db/dbInit';

export default function App() {
  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello, SQLite!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
