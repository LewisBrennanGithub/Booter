import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AddressElement from './AddressElement';

const AddressList = ({ addresses, addressById, fetchAddressById, handleDeleteAddress, handleUpdateAddress }) => {
  return (
    <View>
      {addresses && addresses.map((address) => (
        <AddressElement
          key={address.id}
          address={address}
          addressById={addressById}
          fetchAddressById={fetchAddressById}
          handleDeleteAddress={handleDeleteAddress}
          handleUpdateAddress={handleUpdateAddress}
        />
      ))}

      <Text>Select an address:</Text>
      {addresses && (
        <Picker
          selectedValue={addressById || ''}
          onValueChange={(itemValue) => fetchAddressById(itemValue)}
        >
          {addresses.map((address) => (
            <Picker.Item
              key={address.id}
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
