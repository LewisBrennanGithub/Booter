import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { appStyles } from '../../containers/AppStyles';

const LoggedPlayerAddressUpdateForm = ({ 
  setLoggedPlayer,
  address, 
  handleUpdateAddress, 
  toggleEditAddressFalse,
}) => {
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

  const processUpdateAddress = () => {
    const updatedData = {
      propertyNumberOrName,
      street,
      city,
      country,
      postCode
    };
    
    console.log('Address prop:', address);
    handleUpdateAddress(address.id, updatedData)
      .then(newAddress => {
        if (typeof toggleEditAddressFalse === 'function') {
          toggleEditAddressFalse(newAddress);
        }
        setLoggedPlayer(prevLoggedPlayer => ({
          ...prevLoggedPlayer,
          address: newAddress
        }));
      })
      .catch(error => {
        console.error("Error updating address:", error);
      });
  };

  return (
    <View style={appStyles.card}>
      <Text style={appStyles.cardTitleText}>Update Address</Text>
      <Text style={appStyles.cardText}>Property Number or Name</Text>
      <TextInput
        style={appStyles.input}
        placeholder="Property Number or Name"
        value={propertyNumberOrName}
        onChangeText={text => setPropertyNumberOrName(text)}
      />
      <Text style={appStyles.cardText}>Street</Text>
      <TextInput
        style={appStyles.input}
        placeholder="Street"
        value={street}
        onChangeText={text => setStreet(text)}
      />
      <Text style={appStyles.cardText}>Village, Town or City</Text>
      <TextInput
        style={appStyles.input}
        placeholder="Village, Town or City"
        value={city}
        onChangeText={text => setCity(text)}
      />
      <Text style={appStyles.cardText}>Country</Text>
      <TextInput
        style={appStyles.input}
        placeholder="Country"
        value={country}
        onChangeText={text => setCountry(text)}
      />
      <Text style={appStyles.cardText}>Post Code</Text>
      <TextInput
        style={appStyles.input}
        placeholder="Post Code"
        value={postCode}
        onChangeText={text => setPostCode(text)}
      />
      <TouchableOpacity style={appStyles.buttonColor} onPress={toggleEditAddressFalse}>
        <Text style={appStyles.buttonColorText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={appStyles.buttonColor} onPress={processUpdateAddress}>
        <Text style={appStyles.buttonColorText}>Update Address</Text>
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
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LoggedPlayerAddressUpdateForm;
