import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Container from './OldContainer';
import BooterContainer from './containers/BooterContainer';
import OldContainer from './OldContainer';

export default function App() {
  return (
    <View style={styles.container}>
      <BooterContainer />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
