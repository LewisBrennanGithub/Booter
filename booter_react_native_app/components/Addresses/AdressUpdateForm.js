import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import * as AddressServices from "../../services/AddressServices";
import { styles } from '../../containers/AppStyles';

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
<TouchableOpacity style={styles.buttonStyle} onPress={handleUpdateAddress}>
  <Text style={styles.whiteText}>Update Address</Text>
</TouchableOpacity>

    </View>
  );
};

export default AddressUpdateForm;
