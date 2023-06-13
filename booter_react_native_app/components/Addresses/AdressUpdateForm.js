import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import * as AddressServices from "../../services/AddressServices";

const AddressUpdateForm = ({ address, onUpdate, onCancel }) => {
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

    AddressServices.updateAddress(address.id, updatedData)
      .then(() => {
        onUpdate();
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
      });
  };

  return (
    <View>
      <Text>Update Address</Text>
      <TextInput
        placeholder="Property Number or Name"
        value={propertyNumberOrName}
        onChangeText={text => setPropertyNumberOrName(text)}
      />
      <TextInput
        placeholder="Street"
        value={street}
        onChangeText={text => setStreet(text)}
      />
      <TextInput
        placeholder="City"
        value={city}
        onChangeText={text => setCity(text)}
      />
      <TextInput
        placeholder="Country"
        value={country}
        onChangeText={text => setCountry(text)}
      />
      <TextInput
        placeholder="Post Code"
        value={postCode}
        onChangeText={text => setPostCode(text)}
      />
      <Button title="Update Address" onPress={handleUpdateAddress} />
      <Button title="Cancel" onPress={onCancel} />
    </View>
  );
};

export default AddressUpdateForm;