import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as AddressServices from "../services/AddressServices";
import AddressList from '../components/Addresses/AddressList';
import AddressForm from '../components/Addresses/AddressForm';

const BooterContainer = () => {
  const [addresses, setAddresses] = useState(null);
  const [addressById, setAddressById] = useState(null);

  useEffect(() => {
    fetchAllAddresses();
  }, []);

  const fetchAllAddresses = () => {
    AddressServices.getAddresses().then(data => {
      setAddresses(data);
    });
  };

  const fetchAddressById = (id) => {
    AddressServices.getAddressesById(id).then(data => {
      setAddressById(data);
    });
  };

  const handleDeleteAddress = (id) => {
    AddressServices.deleteAddress(id).then(() => {
      fetchAllAddresses();
    });
  };

  const handleAddAddress = (addressData) => {
    AddressServices.postAddress(addressData)
      .then(() => {
        fetchAllAddresses();
      })
      .catch(error => {
        // Handle error, e.g., show an error message
      });
  };

  return (
    <View>
      <Text>BooterContainer</Text>
      <AddressForm onSubmit={handleAddAddress} onCancel={() => {}} />
      <AddressList 
        addresses={addresses} 
        addressById={addressById}
        fetchAddressById={fetchAddressById}
        handleDeleteAddress={handleDeleteAddress}
      />
    </View>
  );
};

export default BooterContainer;
