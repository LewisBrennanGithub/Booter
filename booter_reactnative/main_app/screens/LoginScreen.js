import React from 'react';
import { View } from 'react-native';
import { appStyles } from '../containers/AppStyles';
import LogInButton from '../components/Authorisation/LogInButton';
import LogOutButton from '../components/Authorisation/LogOutButton';

const LoginScreen= ({setAuth0Id, setLoggedPlayer }) => {

  return (
    <>    
    <View style={appStyles.clearSpace}></View>
    <View style={appStyles.card}>
      <LogInButton 
        setAuth0Id={setAuth0Id}
        setLoggedPlayer={setLoggedPlayer}
        />
      <LogOutButton 
        setAuth0Id={setAuth0Id}
        setLoggedPlayer={setLoggedPlayer}
      />
    </View>
    </>

  );
};

export default LoginScreen;
