import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AddressElement from './AddressElement';

const AddressList = ({ addresses, addressById, fetchAddressById, handleDeleteAddress }) => {
  return (
    <View>
      {addresses && addresses.map((address, index) => (
        <AddressElement key={index} address={address} handleDeleteAddress={handleDeleteAddress}/>
      ))}

      <Text>Select an address:</Text>
      {addresses && (
        <Picker
          selectedValue={addressById || ''}
          onValueChange={(itemValue) => fetchAddressById(itemValue)}
        >
          {addresses.map((address, index) => (
            <Picker.Item
              key={index}
              label={`${address.propertyNumberOrName}, ${address.street}, ${address.city}, ${address.country}, ${address.postCode}`}
              value={address.id}
            />
          ))}
        </Picker>
      )}
    </View>
  );
};

export default AddressList;
