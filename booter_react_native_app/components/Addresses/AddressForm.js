import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import * as AddressServices from "../../services/AddressServices";

const AddressForm = ({ address = {}, onSubmitAddressAdded}) => {
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
    postCode
  };

  onSubmitAddressAdded(addressData); 
};

  return (
    <View>
      <Text>Address Form</Text>
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
      <Button
        title="Add Address"
        onPress={handleAddAddress}
      />
    </View>
  );
};

export default AddressForm;
