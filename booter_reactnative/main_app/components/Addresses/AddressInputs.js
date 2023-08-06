import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { appStyles } from '../../containers/AppStyles';

const AddressInputs = ({ 
  propertyNumberOrName, setPropertyNumberOrName,
  street, setStreet,
  city, setCity,
  country, setCountry,
  postCode, setPostCode
}) => {
  return (
    <View style={appStyles.cardContainer}>
      <Text style={appStyles.subHeaderText}>Address Form</Text>
      <Text style={appStyles.cardText}>Property Number or Name</Text>
      <TextInput
        style={appStyles.input}
        placeholder="Property Number or Name"
        value={propertyNumberOrName}
        onChangeText={(text) => setPropertyNumberOrName(text)}
      />
      <Text style={appStyles.cardText}>Street</Text>
      <TextInput
        style={appStyles.input}
        placeholder="Street"
        value={street}
        onChangeText={(text) => setStreet(text)}
      />
      <Text style={appStyles.cardText}>Village, Town or City</Text>
      <TextInput
        style={appStyles.input}
        placeholder="Village, Town or City"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <Text style={appStyles.cardText}>Country</Text>
      <TextInput
        style={appStyles.input}
        placeholder="Country"
        value={country}
        onChangeText={(text) => setCountry(text)}
      />
      <Text style={appStyles.cardText}>Post Code</Text>
      <TextInput
        style={appStyles.input}
        placeholder="Post Code"
        value={postCode}
        onChangeText={(text) => setPostCode(text)}
      />
    </View>
  );
};

export default AddressInputs;
