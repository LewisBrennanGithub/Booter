import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AddressInputs from '../Addresses/AddressInputs';
import CustomSlider from '../../Reusable/CustomSlider';

const LoggedPlayerForm = ({ 
  onSubmitPlayerAdded,
  auth0Id,
  setLoggedPlayer,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [selfAssessedAbilityLevel, setSelfAssessedAbilityLevel] = useState(0);
  const [selfAssessedSeriousnessLevel, setSelfAssessedSeriousnessLevel] = useState(0);
  const [propertyNumberOrName, setPropertyNumberOrName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postCode, setPostCode] = useState('');

  const levels = Array.from({ length: 11 }, (_, i) => (i * 0.5).toFixed(1));

  const handleAddPlayer = () => {
    const addressData = {
      propertyNumberOrName,
      street,
      city,
      country,
      postCode
    };
  
    const newPlayer = {
      auth0Id,
      firstName,
      lastName,
      userName,
      phoneNumber,
      age: Number(age),
      selfAssessedAbilityLevel: Number(selfAssessedAbilityLevel),
      selfAssessedSeriousnessLevel: Number(selfAssessedSeriousnessLevel)
    };
  
    onSubmitPlayerAdded(newPlayer, addressData).then((createdPlayer) => {
      setLoggedPlayer(createdPlayer)
    });
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
        <Text style={styles.label}>Self Assessed Ability Level</Text>
        <View style={styles.container}>
          <Text>Slider Value: {selfAssessedAbilityLevel.toFixed(1)}</Text>
          <CustomSlider
            value={selfAssessedAbilityLevel}
            onValueChange={setSelfAssessedAbilityLevel}
            step={0.5}
          />
        </View>
        <Text style={styles.label}>Self Assessed Seriousness Level</Text>
        <View style={styles.container}>
          <Text>Slider Value: {selfAssessedSeriousnessLevel.toFixed(1)}</Text>
          <CustomSlider
            value={selfAssessedSeriousnessLevel}
            onValueChange={setSelfAssessedSeriousnessLevel}
            step={0.5}
          />
        </View>
      <Text style={styles.label}>Select an address:</Text>
      <AddressInputs 
        propertyNumberOrName={propertyNumberOrName} setPropertyNumberOrName={setPropertyNumberOrName}
        street={street} setStreet={setStreet}
        city={city} setCity={setCity}
        country={country} setCountry={setCountry}
        postCode={postCode} setPostCode={setPostCode}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddPlayer}>
        <Text style={styles.buttonText}>Add Player</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    marginVertical: 10,
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  picker: {
    // height: 40,
    // borderColor: 'gray',
    // borderWidth: 1,
    // borderRadius: 4,
    // marginBottom: 10,
  },
  button: {
    backgroundColor: '#783c08',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LoggedPlayerForm;
