import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomSlider from '../../Reusable/CustomSlider';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReactDatePicker from 'react-datepicker';
import AddressInputs from '../Addresses/AddressInputs';

const GameForm = ({ 
  game = {}, 
  handleAddGame, 
  loggedPlayer 
}) => {
  const [formVisible, setFormVisible] = useState(false);
  const [name, setName] = useState(game.name || '');
  const [dateAndTime, setDateAndTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [duration, setDuration] = useState(game.duration || '');
  const [recommendedAbilityLevel, setRecommendedAbilityLevel] = useState(game.recommendedAbilityLevel || 0);
  const [recommendedSeriousnessLevel, setRecommendedSeriousnessLevel] = useState(game.recommendedSeriousnessLevel || 0);
  const [maxPlayers, setMaxPlayers] = useState(game.maxPlayers || 2);
  const [propertyNumberOrName, setPropertyNumberOrName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postCode, setPostCode] = useState('');

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateAndTime;
    setShowDatePicker(Platform.OS === 'ios');
    setDateAndTime(currentDate);
};

  const handleAddNewGame = () => {
    const addressData = {
      propertyNumberOrName,
      street,
      city,
      country,
      postCode
    };
    const newGame = {
      creator: { id: loggedPlayer.id },
      name,
      dateAndTime,
      duration,
      recommendedAbilityLevel,
      recommendedSeriousnessLevel,
      playersList: [],
      maxPlayers
    };
    handleAddGame(newGame, addressData); 
};

  return (
<View style={styles.cardContainer}>
  {formVisible ? (
    <>
      <TouchableOpacity style={styles.button} onPress={() => setFormVisible(false)}>
        <Text style={styles.buttonText}>Minimize</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Add Game</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Date and Time</Text>
      {showDatePicker && (
        Platform.OS === 'web' ? (
          <ReactDatePicker
            selected={dateAndTime}
            onChange={date => setDateAndTime(date)}
            showTimeSelect
            dateFormat="Pp"
            // className={styles.datePickerStyle}
          />
        ) : (
          <DateTimePicker
            value={dateAndTime || new Date()}
            mode="datetime"
            display="default"
            onChange={handleDateChange}
            // style={styles.dateTimePicker}
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
        <View style={styles.container}>
          <Text>Slider Value: {recommendedAbilityLevel.toFixed(1)}</Text>
          <CustomSlider
            value={recommendedAbilityLevel}
            onValueChange={setRecommendedAbilityLevel}
            step={0.5}
          />
        </View>
        <Text style={styles.label}>Recommended Seriousness Ability</Text>
        <View style={styles.container}>
          <Text>Slider Value: {recommendedSeriousnessLevel.toFixed(1)}</Text>
          <CustomSlider
            value={recommendedSeriousnessLevel}
            onValueChange={setRecommendedSeriousnessLevel}
            step={0.5}
          />
        </View>
        <Text style={styles.label}>Max Players</Text>
        <View style={styles.container}>
          <Text>Slider Value: {maxPlayers.toFixed(1)}</Text>
          <Slider
            value={maxPlayers}
            onValueChange={setMaxPlayers}
            minimumValue={2}
            maximumValue={22}
            step={1}
          />
        </View>
      <Text style={styles.label}>Select an address</Text>
      <AddressInputs 
        propertyNumberOrName={propertyNumberOrName} setPropertyNumberOrName={setPropertyNumberOrName}
        street={street} setStreet={setStreet}
        city={city} setCity={setCity}
        country={country} setCountry={setCountry}
        postCode={postCode} setPostCode={setPostCode}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddNewGame}>
        <Text style={styles.buttonText}>Add Game</Text>
      </TouchableOpacity>
    </>
  ) :  (
    <TouchableOpacity style={styles.button} onPress={() => setFormVisible(true)}>
      <Text style={styles.buttonText}>Host New Game?</Text>
    </TouchableOpacity>
  )}
</View>
);
}

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
