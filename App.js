import React from 'react';
import { StyleSheet, Text, Image, SafeAreaView, Button, Alert, View, TouchableNativeFeedback } from 'react-native';
import Search from './components/Search';

export default function App() {
  const handleClick = () => {
    Alert.alert('Info', 'Button clicked');
  };

  return (
    <Search />
  );
}