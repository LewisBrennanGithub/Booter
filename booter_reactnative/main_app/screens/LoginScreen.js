import React from 'react';
import { View, StyleSheet } from 'react-native';
import LogInButton from '../components/Authorisation/LogInButton';
import LogOutButton from '../components/Authorisation/LogOutButton';
import LogProfileInformation from '../components/Authorisation/LogProfileInformation';

const LoginScreen= ({setAuth0Id, setLoggedPlayer }) => {

  return (
    <View style={styles.container}>
      <LogInButton 
        setAuth0Id={setAuth0Id}
        setLoggedPlayer={setLoggedPlayer}
        />
      <LogOutButton 
        setAuth0Id={setAuth0Id}
        setLoggedPlayer={setLoggedPlayer}
      />
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
