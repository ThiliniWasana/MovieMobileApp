import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Check if email and password fields are empty
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    // Check if email format is valid
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    try {
      // Retrieve stored users data from AsyncStorage
      const storedUserData = await AsyncStorage.getItem('users');
      const users = storedUserData ? JSON.parse(storedUserData) : [];

      // Find the user by email
      const user = users.find((user) => user.email === email);

      // If user exists and password matches
      if (user && user.password === password) {
        // Navigate to Home screen
        navigation.navigate('Home', { username: email });
      } else {
        // If email or password is incorrect
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (error) {
      // If there's an issue retrieving data
      Alert.alert('Error', 'Something went wrong during login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Register')}
      >
        Don't have an account? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20 },
  link: { color: 'blue', marginTop: 10, textAlign: 'center' },
});
