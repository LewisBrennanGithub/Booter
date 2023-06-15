import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import AddressUpdateForm from './AdressUpdateForm';
import { styles } from '../../containers/AppStyles';

const AddressElement = ({ address, addressById, fetchAddressById, handleDeleteAddress, handleUpdateAddress }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { id, propertyNumberOrName, street, city, country, postCode } = address;
  const addressString = `${propertyNumberOrName || 'N/A'}, ${street || 'N/A'}, ${city || 'N/A'}, ${country || 'N/A'}, ${postCode || 'N/A'}`;

  const handleEditAddress = () => {
    setIsEditing(true);
  };

  return (
    <View>
      {isEditing ? (
        <AddressUpdateForm
          address={address}
          onUpdate={handleUpdateAddress}
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
            <TouchableOpacity style={styles.buttonStyle} onPress={handleEditAddress}>
  <Text style={styles.whiteText}>Update</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.buttonStyle} onPress={() => handleDeleteAddress(id)}>
  <Text style={styles.whiteText}>Delete</Text>
</TouchableOpacity>
          </>
        )
      )}
    </View>
  );
  
};

export default AddressElement;
