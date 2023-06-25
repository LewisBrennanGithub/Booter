import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BooterContainer from './containers/BooterContainer';

export default function App() {
  return (
    <NavigationContainer style={{flex: 1}}>
      {/* <View style={styles.container}> */}
        <BooterContainer />
        {/* <StatusBar style="auto" />
      </View> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
