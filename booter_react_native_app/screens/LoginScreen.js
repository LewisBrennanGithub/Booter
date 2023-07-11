import React from 'react';
import { View, StyleSheet } from 'react-native';
import Auth from '../components/Authorisation - Deprecated/Auth';
import LogInButton from '../components/Authorisation/LogInButton';
import LogOutButton from '../components/Authorisation/LogOutButton';
import LogProfileInformation from '../components/Authorisation/LogProfileInformation';

const LoginScreen= () => {
  return (
    <View style={styles.container}>
      <LogInButton/>
      <LogOutButton/>
      <LogProfileInformation/>
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

export default LoginScreen;
