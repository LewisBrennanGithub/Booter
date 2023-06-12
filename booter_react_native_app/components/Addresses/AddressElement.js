import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import AddressForm from './AddressForm';

const AddressElement = ({ address, handleDeleteAddress }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { id, propertyNumberOrName, street, city, country, postCode } = address;
  const addressString = `${propertyNumberOrName || 'N/A'}, ${street || 'N/A'}, ${city || 'N/A'}, ${country || 'N/A'}, ${postCode || 'N/A'}`;

  const handleEditAddress = () => {
    setIsEditing(true);
  };
  
  const handleUpdateAddress = (updatedData) => {
    AddressServices.updateAddress(id, updatedData)
      .then(() => {
        // Handle successful update, e.g., show a success message or update the list of addresses
        setIsEditing(false);
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
      });
  };
  
  const handleCancelUpdate = () => {
    setIsEditing(false);
  };

  return (
    <View>
      {isEditing ? (
        // Render the update form
        <AddressForm
          address={address}
          onSubmit={handleUpdateAddress}
          onCancel={handleCancelUpdate}
        />
      ) : (
        // Render the address details
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
