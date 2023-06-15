import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bodyStyle: {
    width: '100%',
    fontFamily: 'Arial',
  },

  headerStyle: {
    backgroundColor: '#783c08',
    color: 'white',
    width: '100%',
    textAlign: 'center'
  },

  navBarStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: '5px'
  },

  iconWhiteText: {
    color: 'white',
    fontSize: '20px',
    marginBottom: '5px'
  },

  whiteText: {
    color: 'white',
  },

  buttonStyle: {
    backgroundColor: '#783c08',
    // color: '#783c08',
    textAlign: 'center'
  },

  datePickerStyle: {
    backgroundColor: '#783c08',
  }
  // Other styles...
});
