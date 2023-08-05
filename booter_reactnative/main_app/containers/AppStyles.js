import { StyleSheet } from 'react-native';

// COLOUR PALETE 
// #068DA9 < UNUSED TURQUOISE
// #5c9c99 < NEWISH TURQUOISE
// #86b8ac < NEWEST ^
// #bf5900 < BRASS ORANGE
// #b3571e < DULLER ORANGE

// FONTS
// 'Calistoga' / 'Bungee' / 'Josefin Sans' / 'Passion One'
// 'Raleway' / 'Righteous' /

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  content: {
    flex: 1, 
  },
  
  header: {
    backgroundColor: '#86b8ac',
    height: 75, 
    alignItems: 'center',
    paddingTop: 15, 
  },

  headerLogoText: {
    fontFamily: 'Raleway',
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#ffffff',
  },

  headerText: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    color: '#ffffff',
  },

  subHeader: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
  },

  subHeaderText: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    fontSize: 15,
  },

  cardContainer: {
    marginVertical: 10,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  cardNoBackground: {
    padding: 10,
    marginHorizontal: 4,
  },

  cardTitle: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#86b8ac',
    alignItems: 'center',
    padding: 10,
    borderRadius: 4,
  },

  cardTitleText: {
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    color: '#ffffff',
  },

  button: {
    backgroundColor: '#86b8ac',
    padding: 10,
    marginHorizontal: 50,
    marginTop: 5,
    borderRadius: 4,
  },

  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Raleway',
    fontWeight: 'bold',
  },
});
