import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS
import * as GameServices from "../../services/GameServices";

const GameForm = ({ game = {}, addresses, onSubmit, onCancel, loggedPlayer }) => {
  const [name, setName] = useState(game.name || '');
  const [address, setAddress] = useState(game.address ? game.address : '');
  const [dateAndTime, setDateAndTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [duration, setDuration] = useState(game.duration || '');
  const [recommendedAbilityLevel, setRecommendedAbilityLevel] = useState(game.recommendedAbilityLevel || '');
  const [recommendedSeriousnessLevel, setRecommendedSeriousnessLevel] = useState(game.recommendedSeriousnessLevel || '');
  const [maxPlayers, setMaxPlayers] = useState(game.maxPlayers || 2);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateAndTime;
    setShowDatePicker(Platform.OS === 'ios');
    setDateAndTime(currentDate); // make sure this uses the setDateAndTime from useState
  };

  const handleAddGame = () => {
    const selectedAddress = addresses.find((a) => a.id == address);
  
    const newGame = {
      creator: {id: loggedPlayer.id},
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
  
    onSubmit(newGame); // Call the onSubmit prop
  };

const levels = Array.from({ length: 11 }, (_, i) => (i * 0.5).toFixed(1));
const maxPlayersOptions = Array.from({ length: 19 }, (_, i) => i + 2);


return (
  <View>
      <Text>Add Game</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
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
      <Text>Date and Time</Text>
{showDatePicker && (
    Platform.OS === 'web' ? (
        <ReactDatePicker
            selected={dateAndTime}
            onChange={date => setDateAndTime(date)}
            showTimeSelect
            dateFormat="Pp"
        />
    ) : (
        <DateTimePicker
            value={dateAndTime || new Date()}
            mode="datetime"
            display="default"
            onChange={handleDateChange}
        />
    )
)}
<Button title="Select Date and Time" onPress={() => setShowDatePicker(true)} />
      <TextInput placeholder="Duration" value={duration} onChangeText={setDuration} />
      <Text>Recommended Ability Level</Text>
      <Picker
          selectedValue={recommendedAbilityLevel}
          onValueChange={(itemValue) => setRecommendedAbilityLevel(itemValue)}
      >
          {levels.map((level) => (
              <Picker.Item key={level} label={level} value={level} />
          ))}
      </Picker>
      <Text>Recommended Seriousness Ability</Text>
      <Picker
          selectedValue={recommendedSeriousnessLevel}
          onValueChange={(itemValue) => setRecommendedSeriousnessLevel(itemValue)}
      >
          {levels.map((level) => (
              <Picker.Item key={level} label={level} value={level} />
          ))}
      </Picker>
      <Text>Max Players</Text>
      <Picker
          selectedValue={maxPlayers}
          onValueChange={(itemValue) => setMaxPlayers(itemValue)}
      >
          {maxPlayersOptions.map((players) => (
              <Picker.Item key={players} label={players.toString()} value={players} />
          ))}
      </Picker>
      <Button title="Add Game" onPress={handleAddGame} />
      {/* <Button title="Cancel" onPress={onCancel} /> */}
  </View>
);
}
 
export default GameForm;