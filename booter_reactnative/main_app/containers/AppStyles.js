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

  // HEADERS
  
  header: {
    backgroundColor: '#068DA9',
    height: 80, 
    alignItems: 'center',
    paddingTop: 20, 
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
    // fontWeight: 'bold',
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
    // textTransform: 'uppercase',
  },

  // CARDS

  cardContainer: {
    marginVertical: 10,
  },

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
    // borderRadius: 4,
    marginHorizontal: 10,
  },

  cardNoBackground: {
    padding: 10,
    marginBottom: -15,
  },

  cardTitle: {
    fontFamily: 'Josefin Sans',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#068DA9',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 5,
    marginBottom: 10,
    // borderWidth: 2.5,
    // borderColor: '#b3571e',
    
  },

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

  soloButtonAlinger: {
    alignItems: 'center',
  },

// BUTTONS

  buttonGroup: {
    flexDirection: 'row', 
    flexWrap: 'wrap',  
    justifyContent: 'space-around', 
    alignItems: 'center',
},

  button: {
    backgroundColor: '#f0ebe9',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    maxWidth: 150,
    minWidth: 150,
    // borderRadius: 4,
  },

  buttonText: {
    color: '#d44908',
    textAlign: 'center',
    fontFamily: 'Josefin Sans',
    fontWeight: 'bold',
  },

  buttonNoCard: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginHorizontal: 50,
    marginTop: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    // borderRadius: 4,
  },

  buttonNoCardText: {
    color: '#d44908',
    textAlign: 'center',
    fontFamily: 'Josefin Sans',
    fontWeight: 'bold',
  },

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

  bespokeButtonOne: {
    backgroundColor: '#068DA9',
    padding: 10,
    marginBottom: 5,
    // marginTop: 2.5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

// FORMS

input: {
  height: 40,
  borderColor: 'gray',
  borderWidth: 1,
  // borderRadius: 4,
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
