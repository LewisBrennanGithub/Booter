import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as PlayerServices from "../../services/PlayerServices";

const PlayerForm = ({ addresses, onPlayerAdded }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [selfAssessedAbilityLevel, setSelfAssessedAbilityLevel] = useState('');
  const [selfAssessedSeriousnessLevel, setSelfAssessedSeriousnessLevel] = useState('');

  const levels = Array.from({ length: 11 }, (_, i) => (i * 0.5).toFixed(1));

const handleAddPlayer = () => {
  const selectedAddress = addresses.find((a) => a.id == address);
  if (!selectedAddress) {
    console.error('No address selected');
    return;
  }

  const newPlayer = {
    firstName,
    lastName,
    userName,
    phoneNumber,
    address: {
      id: selectedAddress.id
    },
    age: Number(age),
    selfAssessedAbilityLevel: Number(selfAssessedAbilityLevel),
    selfAssessedSeriousnessLevel: Number(selfAssessedSeriousnessLevel)
  };
    onPlayerAdded(newPlayer);
};

  return (
    <View>
      <Text>Add Player</Text>
      <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} />
      <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} />
      <TextInput placeholder="User Name" value={userName} onChangeText={setUserName} />
      <TextInput placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} />
      <TextInput placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
      
      <Text>Select an address:</Text>
      {addresses && (
          <Picker
              selectedValue={address}
              onValueChange={(itemValue) => setAddress(itemValue)}
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
      
      <Text>Self Assessed Ability Level</Text>
      <Picker
          selectedValue={selfAssessedAbilityLevel}
          onValueChange={(itemValue) => setSelfAssessedAbilityLevel(itemValue)}
      >
          {levels.map((level) => (
              <Picker.Item key={level} label={level} value={level} />
          ))}
      </Picker>

      <Text>Self Assessed Seriousness Level</Text>
      <Picker
          selectedValue={selfAssessedSeriousnessLevel}
          onValueChange={(itemValue) => setSelfAssessedSeriousnessLevel(itemValue)}
      >
          {levels.map((level) => (
              <Picker.Item key={level} label={level} value={level} />
          ))}
      </Picker>

      <Button title="Add Player" onPress={handleAddPlayer} />
    </View>
  );
}

export default PlayerForm;
