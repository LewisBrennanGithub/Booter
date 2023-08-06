import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AddressInputs from '../Addresses/AddressInputs';
import CustomSlider from '../../Reusable/CustomSlider';
import { appStyles } from '../../containers/AppStyles';

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
    <View style={appStyles.card}>
      <Text style={appStyles.cardTitleText}>Add Player</Text>
      <Text style={appStyles.cardText}>First Name</Text>
      <TextInput
        style={appStyles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <Text style={appStyles.cardText}>Last Name</Text>
      <TextInput
        style={appStyles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <Text style={appStyles.cardText}>User Name</Text>
      <TextInput
        style={appStyles.input}
        placeholder="User Name"
        value={userName}
        onChangeText={setUserName}
      />
      <Text style={appStyles.cardText}>Phone Number</Text>
      <TextInput
        style={appStyles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Text style={appStyles.cardText}>Age</Text>
      <TextInput
        style={appStyles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
        <Text style={appStyles.cardText}>Self Assessed Ability Level</Text>
          <Text>Slider Value: {selfAssessedAbilityLevel.toFixed(1)}</Text>
          <CustomSlider
            value={selfAssessedAbilityLevel}
            onValueChange={setSelfAssessedAbilityLevel}
            step={0.5}
          />
        <Text style={appStyles.cardText}>Self Assessed Seriousness Level</Text>
          <Text>Slider Value: {selfAssessedSeriousnessLevel.toFixed(1)}</Text>
          <CustomSlider
            value={selfAssessedSeriousnessLevel}
            onValueChange={setSelfAssessedSeriousnessLevel}
            step={0.5}
          />
      <Text style={appStyles.cardText}>Select an address:</Text>
      <AddressInputs 
        propertyNumberOrName={propertyNumberOrName} setPropertyNumberOrName={setPropertyNumberOrName}
        street={street} setStreet={setStreet}
        city={city} setCity={setCity}
        country={country} setCountry={setCountry}
        postCode={postCode} setPostCode={setPostCode}
      />
      <TouchableOpacity style={appStyles.buttonColor} onPress={handleAddPlayer}>
        <Text style={appStyles.buttonColorText}>Add Player</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoggedPlayerForm;
