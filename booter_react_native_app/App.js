import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BooterContainer from './containers/BooterContainer';
import {useAuth0, Auth0Provider} from 'react-native-auth0';

export default function App() {
  return (
    <Auth0Provider domain={"dev-jbsvjbwih2gygs04.uk.auth0.com"} clientId={"2mBqbkMQU2KUcCeahRAbRKEFvIFQVULq"}>
    <NavigationContainer style={{flex: 1}}>
      {/* <View style={styles.container}> */}
        <BooterContainer />
        {/* <StatusBar style="auto" />
      </View> */}
    </NavigationContainer>
    </Auth0Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
