import React from 'react';
import { View, StyleSheet } from 'react-native';
import LogInButton from '../components/Authorisation/LogInButton';
import LogOutButton from '../components/Authorisation/LogOutButton';
import LogProfileInformation from '../components/Authorisation/LogProfileInformation';

const LoginScreen= ({ onLogin, onLogout, auth0Id, setAuth0Id }) => {

  return (
    <View style={styles.container}>
      <LogInButton 
        onLogin={onLogin} 
        auth0Id={auth0Id}
        setAuth0Id={setAuth0Id}
        />
      <LogOutButton onLogout={onLogout}/>
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
