import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function FloatingActionButton({ count }) {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>Clicks: {count}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
