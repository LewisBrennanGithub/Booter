import { StyleSheet } from 'react-native';

// COLOUR PALETE 

// IN USE
// #f0ebe9 < BACKGROUND
// #068DA9 < UNUSED TURQUOISE
// #d44908 < NEWEST ORANGE
// #FFFFFF < WHITE
// #000000 < BLACK

// #068DA9 < UNUSED TURQUOISE
// #5c9c99 < NEWISH TURQUOISE
// #86b8ac < NEWEST ^
// #bf5900 < BRASS ORANGE
// #b3571e < DULLER ORANGE
// #d44908 < NEWEST ORANGE

// FONTS
// 'Calistoga' / 'Bungee' / 'Josefin Sans' / 'Passion One'
// 'Raleway' / 'Righteous' /

export const appStyles = StyleSheet.create({

  // GENERAL
  container: {
    flex: 1,
  },
  
  content: {
    flex: 1, 
  },

  centralAligner: {
    alignItems: 'center'
  },

  clearSpace: {
    padding: 5,
  },

  // HEADERS
  
  header: {
    backgroundColor: '#068DA9',
    height: 82.5, 
    alignItems: 'center',
    paddingTop: 25, 
    borderBottomWidth: 5,
    borderBottomColor: '#d44908',
  },

  headerLogoText: {
    fontFamily: 'Josefin Sans',
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#d44908',
  },

  headerText: {
    fontFamily: 'Josefin Sans',
    color: '#ffffff',
  },

  subHeader: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
  },

  subHeaderText: {
    fontFamily: 'Josefin Sans',
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical: 5,
  },

  // CARDS

  // REMOVE?
  // cardContainer: {
  //   marginVertical: 10,
  // },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    paddingBottom: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 5,
    marginHorizontal: 10,
  },

  cardNoBackground: {
    padding: 10,
  },

  // REMOVE?
  // cardTitle: {
  //   fontFamily: 'Josefin Sans',
  //   fontWeight: 'bold',
  //   color: '#ffffff',
  //   backgroundColor: '#068DA9',
  //   alignItems: 'center',
  //   padding: 10,
  //   paddingBottom: 5,
  //   marginBottom: 10,
  // },

  cardTitleText: {
    fontFamily: 'Josefin Sans',
    fontWeight: 'bold',
    color: '#d44908',
    textTransform: 'uppercase',
    fontSize: 20,
  },

  cardText: {
    fontFamily: 'Josefin Sans',
    marginTop: 2.5,
    marginBottom: 2.5,
  },

// BUTTONS

  buttonColor: {
    backgroundColor: '#068DA9',
    padding: 10,
    marginBottom: 2.5,
    marginTop: 2.5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    // borderRadius: 4,
  },

  buttonColorText: {
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Josefin Sans',
    fontWeight: 'bold',
  },

// FORMS

input: {
  height: 35,
  borderColor: 'gray',
  borderWidth: 1,
  marginBottom: 10,
  paddingHorizontal: 10,
  fontFamily: 'Josefin Sans',
},

// MISC

presentationalTurqouoiseLine: {
  height: 1,
  borderColor: '#068DA9',
  borderWidth: 2,
  marginVertical: 5,
},

presentationalCopperLine: {
  height: 1,
  borderColor: '#d44908',
  borderWidth: 2,
  marginVertical: 5,
}

});
