import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReactDatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css"; // Import the CSS
import * as GameServices from "../../services/GameServices";

const GameForm = ({ game = {}, addresses, onSubmitGameAdded, loggedPlayer }) => {
  const [name, setName] = useState(game.name || '');
  // const [address, setAddress] = useState(game.address ? game.address : null);
  const [address, setAddress] = useState(game.address ? game.address : '');
  const [dateAndTime, setDateAndTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [duration, setDuration] = useState(game.duration || '');
  const [recommendedAbilityLevel, setRecommendedAbilityLevel] = useState(game.recommendedAbilityLevel || '');
  const [recommendedSeriousnessLevel, setRecommendedSeriousnessLevel] = useState(game.recommendedSeriousnessLevel || '');
  const [maxPlayers, setMaxPlayers] = useState(game.maxPlayers || 2);

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      setAddress(addresses[0].id);
    }
  }, [addresses]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateAndTime;
    setShowDatePicker(Platform.OS === 'ios');
    setDateAndTime(currentDate); 
  };

  // const handleAddGame = () => {
  //   const selectedAddress = addresses.find((a) => a.id == address);
  
  //   const newGame = {
  //     creator: {id: loggedPlayer.id},
  //     name,
  //     address: {
  //       id: selectedAddress.id
  //     },
  //     dateAndTime,
  //     duration,
  //     recommendedAbilityLevel,
  //     recommendedSeriousnessLevel,
  //     playersList: [],
  //     maxPlayers
  //   };
  
  //   onSubmitGameAdded(newGame);
  // };

  const handleAddGame = () => {
    console.log("address:", address);
    console.log("addresses:", addresses);
    
    const selectedAddress = addresses.find((a) => a.id == address);
    
    console.log("selectedAddress:", selectedAddress);
    console.log("loggedPlayer:", loggedPlayer);
    
    if (!selectedAddress || !loggedPlayer) {
      console.error("selectedAddress or loggedPlayer is undefined");
      return;
    }

    const newGame = {
      creator: { id: loggedPlayer.id },
      name,
      address: {
        id: selectedAddress.id
      },
      dateAndTime,
      duration,
      recommendedAbilityLevel,
      recommendedSeriousnessLevel,
      playersList: [],
      maxPlayers
    };
  
    onSubmitGameAdded(newGame);
};

  const levels = Array.from({ length: 11 }, (_, i) => (i * 0.5).toFixed(1));
  const maxPlayersOptions = Array.from({ length: 19 }, (_, i) => i + 2);

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.heading}>Add Game</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Select an address:</Text>
      {addresses && addresses.length > 0 && (
    <Picker
      style={styles.picker}
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
      <Text style={styles.label}>Date and Time</Text>
      {showDatePicker && (
        Platform.OS === 'web' ? (
          <ReactDatePicker
            selected={dateAndTime}
            onChange={date => setDateAndTime(date)}
            showTimeSelect
            dateFormat="Pp"
            className={styles.datePickerStyle}
          />
        ) : (
          <DateTimePicker
            value={dateAndTime || new Date()}
            mode="datetime"
            display="default"
            onChange={handleDateChange}
            style={styles.dateTimePicker}
          />
        )
      )}
      <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.buttonText}>Select Date and Time</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Duration"
        value={duration}
        onChangeText={setDuration}
      />
      <Text style={styles.label}>Recommended Ability Level</Text>
      <Picker
        style={styles.picker}
        selectedValue={recommendedAbilityLevel}
        onValueChange={(itemValue) => setRecommendedAbilityLevel(itemValue)}
      >
        {levels.map((level) => (
          <Picker.Item key={level} label={level} value={level} />
        ))}
      </Picker>
      <Text style={styles.label}>Recommended Seriousness Ability</Text>
      <Picker
        style={styles.picker}
        selectedValue={recommendedSeriousnessLevel}
        onValueChange={(itemValue) => setRecommendedSeriousnessLevel(itemValue)}
      >
        {levels.map((level) => (
          <Picker.Item key={level} label={level} value={level} />
        ))}
      </Picker>
      <Text style={styles.label}>Max Players</Text>
      <Picker
        style={styles.picker}
        selectedValue={maxPlayers}
        onValueChange={(itemValue) => setMaxPlayers(itemValue)}
      >
        {maxPlayersOptions.map((players) => (
          <Picker.Item key={players} label={players.toString()} value={players} />
        ))}
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handleAddGame}>
        <Text style={styles.buttonText}>Add Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    marginVertical: '10px',
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
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#783c08',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dateTimePicker: {
    backgroundColor: '#783c08',
  },
});

export default GameForm;
