import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { appStyles } from '../containers/AppStyles';
import LogInButton from '../components/Authorisation/LogInButton';
import LogOutButton from '../components/Authorisation/LogOutButton';
import LogProfileInformation from '../components/Authorisation/LogProfileInformation';

const LoginScreen= ({setAuth0Id, setLoggedPlayer }) => {

  return (
    <View>
      <LogInButton 
        setAuth0Id={setAuth0Id}
        setLoggedPlayer={setLoggedPlayer}
        />
      <LogOutButton 
        setAuth0Id={setAuth0Id}
        setLoggedPlayer={setLoggedPlayer}
      />
    </View>
  );
};

export default LoginScreen;
