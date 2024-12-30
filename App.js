import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator'; // Import AppNavigator
import { ClickCountProvider } from './src/context/ClickCountContext'; 

export default function App() {
  return (
    <ClickCountProvider>
    <NavigationContainer>
      <AppNavigator /> {/* Use AppNavigator here */}
    </NavigationContainer>
    </ClickCountProvider>
  );
}
