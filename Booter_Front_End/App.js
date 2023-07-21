<script src="http://localhost:8097"></script>
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet} from 'react-native';
import BooterContainer from './containers/BooterContainer';
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });
