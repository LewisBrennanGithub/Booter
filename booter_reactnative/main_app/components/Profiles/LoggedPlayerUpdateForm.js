import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as PlayerServices from "../../services/PlayerServices";

const LoggedPlayerUpdateForm = ({
    loggedPlayer,
    auth0Id,
    setLoggedPlayer,
    handleEditPlayer,
    fetchAllPlayers,
}) => {
    const [firstName, setFirstName] = useState(loggedPlayer.firstName);
    const [lastName, setLastName] = useState(loggedPlayer.lastName);
    const [userName, setUserName] = useState(loggedPlayer.userName);
    const [phoneNumber, setPhoneNumber] = useState(loggedPlayer.phoneNumber);
    const [age, setAge] = useState(loggedPlayer.age.toString());
    // const [selfAssessedAbilityLevel, setSelfAssessedAbilityLevel] = useState(loggedPlayer.selfAssessedAbilityLevel.toString());
    // const [selfAssessedSeriousnessLevel, setSelfAssessedSeriousnessLevel] = useState(loggedPlayer.selfAssessedSeriousnessLevel.toString());
    const [selfAssessedAbilityLevel, setSelfAssessedAbilityLevel] = useState(loggedPlayer.selfAssessedAbilityLevel.toString());
    const [selfAssessedSeriousnessLevel, setSelfAssessedSeriousnessLevel] = useState(loggedPlayer.selfAssessedSeriousnessLevel.toString());
    const [editProfileBoolean, setEditProfileBoolean] = useState(false);

  const levels = Array.from({ length: 11 }, (_, i) => (i * 0.5).toFixed(1));

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

  const setEditProfileBooleanTrue = () => {
    setEditProfileBoolean(true);
  } 
  const setEditProfileBooleanFalse = () => {
    setEditProfileBoolean(false);
  }
    return (
        editProfileBoolean ? (
        <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.button} onPress={setEditProfileBooleanFalse}>
        <Text style={styles.buttonText}>Cancel Edit Profile</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Edit Player</Text>
        <Text>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <Text>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <Text>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="User Name"
          value={userName}
          onChangeText={setUserName}
        />
        <Text>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Text>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Self Assessed Ability Level</Text>
        <Picker
          style={styles.picker}
          selectedValue={selfAssessedAbilityLevel}
          onValueChange={(itemValue) => setSelfAssessedAbilityLevel(itemValue)}
        >
          {levels.map((level) => (
            // <Picker.Item key={level} label={level} value={level} />
            <Picker.Item key={level} label={level} value={level.toString()} />
          ))}
        </Picker>
        <Text style={styles.label}>Self Assessed Seriousness Level</Text>
        <Picker
          style={styles.picker}
          selectedValue={selfAssessedSeriousnessLevel}
          onValueChange={(itemValue) => setSelfAssessedSeriousnessLevel(itemValue)}
        >
          {levels.map((level) => (
            // <Picker.Item key={level} label={level} value={level} />
            <Picker.Item key={level} label={level} value={level.toString()} />

          ))}
        </Picker>
        <TouchableOpacity style={styles.button} onPress={handleUpdatePlayer}>
          <Text style={styles.buttonText}>Update Player</Text>
        </TouchableOpacity>
      </View>
        ) : (
      <View>
          <TouchableOpacity style={styles.button} onPress={setEditProfileBooleanTrue}>
              <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
      </View>
        )
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

export default LoggedPlayerUpdateForm;