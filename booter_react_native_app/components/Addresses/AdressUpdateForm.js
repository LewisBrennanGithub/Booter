import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as AddressServices from "../../services/AddressServices";

const AddressUpdateForm = ({ address, onUpdate, onSuccess }) => {
  const [propertyNumberOrName, setPropertyNumberOrName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postCode, setPostCode] = useState('');

  useEffect(() => {
    if (address) {
      setPropertyNumberOrName(address.propertyNumberOrName || '');
      setStreet(address.street || '');
      setCity(address.city || '');
      setCountry(address.country || '');
      setPostCode(address.postCode || '');
    }
  }, [address]);

  const handleUpdateAddress = () => {
    const updatedData = {
      propertyNumberOrName,
      street,
      city,
      country,
      postCode
    };
      
    console.log('Address ID:', address.id);
    onUpdate(address.id, updatedData);
    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.heading}>Update Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Property Number or Name"
        value={propertyNumberOrName}
        onChangeText={text => setPropertyNumberOrName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Street"
        value={street}
        onChangeText={text => setStreet(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={text => setCity(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={country}
        onChangeText={text => setCountry(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Post Code"
        value={postCode}
        onChangeText={text => setPostCode(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateAddress}>
        <Text style={styles.buttonText}>Update Address</Text>
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

export default AddressUpdateForm;
