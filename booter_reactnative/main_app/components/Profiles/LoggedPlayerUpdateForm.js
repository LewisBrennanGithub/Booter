import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import CustomSlider from '../../Reusable/CustomSlider';
import * as PlayerServices from "../../services/PlayerServices";
import { appStyles } from '../../containers/AppStyles';

const LoggedPlayerUpdateForm = ({
    loggedPlayer,
    auth0Id,
    setLoggedPlayer,
    handleEditPlayer,
    fetchAllPlayers,
    toggleEditProfileFalse
}) => {
    const [firstName, setFirstName] = useState(loggedPlayer.firstName);
    const [lastName, setLastName] = useState(loggedPlayer.lastName);
    const [userName, setUserName] = useState(loggedPlayer.userName);
    const [phoneNumber, setPhoneNumber] = useState(loggedPlayer.phoneNumber);
    const [age, setAge] = useState(loggedPlayer.age.toString());
    const [selfAssessedAbilityLevel, setSelfAssessedAbilityLevel] = useState(loggedPlayer.selfAssessedAbilityLevel);
    const [selfAssessedSeriousnessLevel, setSelfAssessedSeriousnessLevel] = useState(loggedPlayer.selfAssessedSeriousnessLevel);

  const handleUpdatePlayer = async () => {
    const updatedPlayer = {
      firstName,
      lastName,
      userName,
      phoneNumber,
      age: Number(age),
      selfAssessedAbilityLevel: Number(selfAssessedAbilityLevel),
      selfAssessedSeriousnessLevel: Number(selfAssessedSeriousnessLevel),
      addressId: loggedPlayer.addressId 
    }
    
    await handleEditPlayer(updatedPlayer); 
    await fetchAllPlayers();
    await fetchPlayerByAuth0Id(auth0Id);
  }

  const fetchPlayerByAuth0Id = async (id) => {
    if(id){
      try{
        const data = await PlayerServices.getPlayerByAuth0Id(id);
        setLoggedPlayer(data);
      }catch(error){
        console.log("Error fetching player: ", error);
      }
    }
  }

    return (
        <View style={appStyles.card}>
        <View style={appStyles.presentationalTurqouoiseLine}></View>
        <Text style={appStyles.cardTitleText}>Edit Player</Text>
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
        <Text style={appStyles.cardText}>Username</Text>
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
          <Text style={appStyles.cardText}>Slider Value: {selfAssessedAbilityLevel.toFixed(1)}</Text>
          <CustomSlider
            value={selfAssessedAbilityLevel}
            onValueChange={setSelfAssessedAbilityLevel}
            step={0.5}
          />
        <Text style={appStyles.cardText}>Self Assessed Seriousness Level</Text>
          <Text style={appStyles.cardText}>Slider Value: {selfAssessedSeriousnessLevel.toFixed(1)}</Text>
          <CustomSlider
            value={selfAssessedSeriousnessLevel}
            onValueChange={setSelfAssessedSeriousnessLevel}
            step={0.5}
          />
        <TouchableOpacity style={appStyles.buttonColor} onPress={handleUpdatePlayer}>
          <Text style={appStyles.buttonColorText}>Update Player</Text>
        </TouchableOpacity>
        <TouchableOpacity style={appStyles.buttonColor} onPress={toggleEditProfileFalse}>
        <Text style={appStyles.buttonColorText}>Cancel Edit Profile</Text>
        </TouchableOpacity>
        </View>
    );
};

export default LoggedPlayerUpdateForm;