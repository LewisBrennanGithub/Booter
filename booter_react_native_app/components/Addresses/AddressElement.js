import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import AddressUpdateForm from './AdressUpdateForm';

const AddressElement = ({ address, addressById, fetchAddressById, handleDeleteAddress }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { id, propertyNumberOrName, street, city, country, postCode } = address;
  const addressString = `${propertyNumberOrName || 'N/A'}, ${street || 'N/A'}, ${city || 'N/A'}, ${country || 'N/A'}, ${postCode || 'N/A'}`;

  const handleEditAddress = () => {
    setIsEditing(true);
  };

  const handleCancelUpdate = () => {
    setIsEditing(false);
  };

  const handleUpdateAddress = () => {
    setIsEditing(false);
    fetchAddressById(address.id); // Fetch the updated address data after updating
  };

  return (
    <View>
      {isEditing ? (
        <AddressUpdateForm
          address={address}
          onUpdate={handleUpdateAddress}
          onCancel={handleCancelUpdate}
        />
      ) : (
        <>
          <Text>Address Element</Text>
          <Text>{addressString}</Text>
          <Button title="Update" onPress={handleEditAddress} />
          <Button title="Delete" onPress={() => handleDeleteAddress(id)} />
        </>
      )}
    </View>
  );
};

export default AddressElement;
