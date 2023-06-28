import React from 'react';
import { View, StyleSheet } from 'react-native';
import Auth from '../components/Authorisation/Auth';

const LoginPage = () => {
  return (
    <View style={styles.container}>
      <Auth />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginPage;
