import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PlayerForm = ({ 
  addresses, 
  onSubmitPlayerAdded,
  auth0Id
}) => {
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
      auth0Id,
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

    onSubmitPlayerAdded(newPlayer);
  };

  return (
    <View style={styles.cardContainer}>
      <Text>{auth0Id}</Text>
      <Text style={styles.heading}>Add Player</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Select an address:</Text>
      <Picker
        style={styles.picker}
        selectedValue={address}
        onValueChange={(itemValue) => setAddress(itemValue)}
      >
{addresses && addresses.map((address) => (
  <Picker.Item
    key={address.id}
    label={`${address.propertyNumberOrName}, ${address.street}, ${address.city}, ${address.country}, ${address.postCode}`}
    value={address.id}
  />
))}
      </Picker>
      <Text style={styles.label}>Self Assessed Ability Level</Text>
      <Picker
        style={styles.picker}
        selectedValue={selfAssessedAbilityLevel}
        onValueChange={(itemValue) => setSelfAssessedAbilityLevel(itemValue)}
      >
        {levels.map((level) => (
          <Picker.Item key={level} label={level} value={level} />
        ))}
      </Picker>
      <Text style={styles.label}>Self Assessed Seriousness Level</Text>
      <Picker
        style={styles.picker}
        selectedValue={selfAssessedSeriousnessLevel}
        onValueChange={(itemValue) => setSelfAssessedSeriousnessLevel(itemValue)}
      >
        {levels.map((level) => (
          <Picker.Item key={level} label={level} value={level} />
        ))}
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handleAddPlayer}>
        <Text style={styles.buttonText}>Add Player</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    // backgroundColor: '#ffffff',
    // marginVertical: 10,
    // padding: 20,
    // borderRadius: 8,
    // shadowColor: '#000000',
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // elevation: 4,
  },
  heading: {
    // fontSize: 18,
    // fontWeight: 'bold',
    // marginBottom: 10,
  },
  label: {
    // fontSize: 16,
    // marginBottom: 5,
  },
  input: {
    // height: 40,
    // borderColor: 'gray',
    // borderWidth: 1,
    // borderRadius: 4,
    // marginBottom: 10,
    // paddingHorizontal: 10,
  },
  picker: {
    // height: 40,
    // borderColor: 'gray',
    // borderWidth: 1,
    // borderRadius: 4,
    // marginBottom: 10,
  },
  button: {
    // backgroundColor: '#783c08',
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // borderRadius: 4,
  },
  buttonText: {
    // color: '#ffffff',
    // textAlign: 'center',
    // fontWeight: 'bold',
  },
});

export default PlayerForm;
