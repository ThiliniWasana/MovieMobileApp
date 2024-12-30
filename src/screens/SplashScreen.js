import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the desired icon set
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    
    const timer = setTimeout(() => {
      navigation.replace('Login'); // You can use navigation.replace to remove SplashScreen from the stack
    }, 4000);

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Icon name="film" size={100} color="#fff" />  {/* Example movie-related icon */}
      <Text style={styles.title}>Welcome to MovieTime</Text>
      <Text style={styles.subtitle}>Your favorite movies, just a tap away</Text>
    </View>
  );
}


const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000', // Splash screen background color
        },
        title: {
          color: '#fff',
          fontSize: 30,
          fontWeight: 'bold',
          marginTop: 20,
        },
        subtitle: {
          color: '#fff',
          fontSize: 18,
          marginTop: 10,
        },
});
