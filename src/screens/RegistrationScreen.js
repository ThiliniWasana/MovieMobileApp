import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate password strength (example: minimum 6 characters)
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Function to check if the email already exists in local storage
  const isEmailAlreadyRegistered = async (email) => {
    const storedUserData = await AsyncStorage.getItem('users');
    const users = storedUserData ? JSON.parse(storedUserData) : [];
    return users.some((user) => user.email === email);
  };

  const handleRegister = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Check if email format is valid
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Check if password is valid
    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    // Check if email is already registered
    const emailExists = await isEmailAlreadyRegistered(email);
    if (emailExists) {
      Alert.alert('Error', 'This email is already registered');
      return;
    }

    // Store the new user data in AsyncStorage
    const newUser = { email, password };
    
    const storedUserData = await AsyncStorage.getItem('users');
    const users = storedUserData ? JSON.parse(storedUserData) : [];
    users.push(newUser);

    await AsyncStorage.setItem('users', JSON.stringify(users));

    // Clear the form fields after successful registration
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    Alert.alert('Success', 'Account created successfully');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Register" onPress={handleRegister} />
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account? Login
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
