import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as AddressServices from '../../services/AddressServices';

const AddressForm = ({ address = {}, onSubmitAddressAdded }) => {
  const [propertyNumberOrName, setPropertyNumberOrName] = useState(address.propertyNumberOrName || '');
  const [street, setStreet] = useState(address.street || '');
  const [city, setCity] = useState(address.city || '');
  const [country, setCountry] = useState(address.country || '');
  const [postCode, setPostCode] = useState(address.postCode || '');

  const handleAddAddress = () => {
    const addressData = {
      propertyNumberOrName,
      street,
      city,
      country,
      postCode,
    };

    onSubmitAddressAdded(addressData);
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.heading}>Address Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Property Number or Name"
        value={propertyNumberOrName}
        onChangeText={(text) => setPropertyNumberOrName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Street"
        value={street}
        onChangeText={(text) => setStreet(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={country}
        onChangeText={(text) => setCountry(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Post Code"
        value={postCode}
        onChangeText={(text) => setPostCode(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddAddress}>
        <Text style={styles.buttonText}>Add Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#783c08',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default AddressForm;
