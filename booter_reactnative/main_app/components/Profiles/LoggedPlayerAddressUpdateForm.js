import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
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

export default LoggedPlayerAddressUpdateForm;
