import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import AddressUpdateForm from './AdressUpdateForm';

const AddressElement = ({ address, addressById, fetchAddressById, handleDeleteAddress, handleUpdateAddress }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { id, propertyNumberOrName, street, city, country, postCode } = address;
  const addressString = `${propertyNumberOrName || 'N/A'}, ${street || 'N/A'}, ${city || 'N/A'}, ${country || 'N/A'}, ${postCode || 'N/A'}`;

  const handleEditAddress = () => {
    setIsEditing(true);
  };

  // const handleCancelUpdate = () => {
  //   setIsEditing(false);
  // };

  return (
    <View>
      {isEditing ? (
        <AddressUpdateForm
          address={address}
          onUpdate={handleUpdateAddress}
          // onCancel={handleCancelUpdate}
          onSuccess={() => setIsEditing(false)}
        />
      ) : (
        address && (
          <>
            <Text>Address Element</Text>
            <Text>
              {address.propertyNumberOrName || 'N/A'}, {address.street || 'N/A'},
              {address.city || 'N/A'}, {address.country || 'N/A'},
              {address.postCode || 'N/A'}
            </Text>
            <Button title="Update" onPress={handleEditAddress} />
            <Button title="Delete" onPress={() => handleDeleteAddress(id)} />
          </>
        )
      )}
    </View>
  );
  
};

export default AddressElement;
