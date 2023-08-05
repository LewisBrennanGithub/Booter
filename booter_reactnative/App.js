<script src="http://localhost:8097"></script>
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import BooterContainer from './main_app/containers/BooterContainer';
import {Auth0Provider} from 'react-native-auth0';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF', 
  },
};

export default function App() {
  return (
    <Auth0Provider domain={"dev-jbsvjbwih2gygs04.uk.auth0.com"} clientId={"rPScIrLIXAkRbZtUgbdvDsarHIetMx2g"}>
    <StatusBar barStyle="light-content" /> 
    <NavigationContainer theme={MyTheme}>
        <BooterContainer />
    </NavigationContainer>
    </Auth0Provider>
  );
} 
