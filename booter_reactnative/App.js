<script src="http://localhost:8097"></script>
import { NavigationContainer } from '@react-navigation/native';
import BooterContainer from './main_app/containers/BooterContainer';
import {Auth0Provider} from 'react-native-auth0';

export default function App() {
  return (
    <Auth0Provider domain={"dev-jbsvjbwih2gygs04.uk.auth0.com"} clientId={"rPScIrLIXAkRbZtUgbdvDsarHIetMx2g"}>
    <NavigationContainer style={{flex: 1}}>
        <BooterContainer />
    </NavigationContainer>
    </Auth0Provider>
  );
} 
