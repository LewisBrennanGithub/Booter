import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { appStyles } from '../../containers/AppStyles';
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
<View style={appStyles.cardContainer}>
  {formVisible ? (
    <View style={appStyles.card}>
      <Text style={appStyles.cardTitleText}>Add Game</Text>
      <Text style={appStyles.cardText}>Name</Text>
      <TextInput
        style={appStyles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <Text style={appStyles.cardText}>Date and Time</Text>
      {showDatePicker && (
        Platform.OS === 'web' ? (
          <View style={appStyles.centralAligner}>
          <ReactDatePicker
            selected={dateAndTime}
            onChange={date => setDateAndTime(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </View>
        ) : (
          <View style={appStyles.centralAligner}>
          <DateTimePicker
            value={dateAndTime || new Date()}
            mode="datetime"
            display="default"
            onChange={handleDateChange}
          />
          </View>
        )
      )}
      <TouchableOpacity style={appStyles.buttonColor} onPress={() => setShowDatePicker(true)}>
        <Text style={appStyles.buttonColorText}>Select Date and Time</Text>
      </TouchableOpacity>
      <Text style={appStyles.cardText}>Duration</Text>
      <TextInput
        style={appStyles.input}
        placeholder="Duration"
        value={duration}
        onChangeText={setDuration}
      />
        <Text style={appStyles.cardText}>Recommended Ability Level</Text>
          <Text style={appStyles.cardText}>Slider Value: {recommendedAbilityLevel.toFixed(1)}</Text>
          <CustomSlider
            value={recommendedAbilityLevel}
            onValueChange={setRecommendedAbilityLevel}
            step={0.5}
          />
        <Text style={appStyles.cardText}>Recommended Seriousness Ability</Text>
          <Text style={appStyles.cardText}>Slider Value: {recommendedSeriousnessLevel.toFixed(1)}</Text>
          <CustomSlider
            value={recommendedSeriousnessLevel}
            onValueChange={setRecommendedSeriousnessLevel}
            step={0.5}
          />
        <Text style={appStyles.cardText}>Max Players</Text>
          <Text>Slider Value: {maxPlayers.toFixed(1)}</Text>
          <Slider
            value={maxPlayers}
            onValueChange={setMaxPlayers}
            minimumValue={2}
            maximumValue={22}
            step={1}
            minimumTrackTintColor="#068DA9"
            maximumTrackTintColor="#d44908"
          />
      <AddressInputs 
        propertyNumberOrName={propertyNumberOrName} setPropertyNumberOrName={setPropertyNumberOrName}
        street={street} setStreet={setStreet}
        city={city} setCity={setCity}
        country={country} setCountry={setCountry}
        postCode={postCode} setPostCode={setPostCode}
      />
      <TouchableOpacity style={appStyles.buttonColor} onPress={handleAddNewGame}>
        <Text style={appStyles.buttonColorText}>Add Game</Text>
      </TouchableOpacity>
      <TouchableOpacity style={appStyles.buttonColor} onPress={() => setFormVisible(false)}>
        <Text style={appStyles.buttonColorText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  ) :  (
    <View style={appStyles.cardNoBackground}>
    <TouchableOpacity style={appStyles.buttonColor} onPress={() => setFormVisible(true)}>
      <Text style={appStyles.buttonColorText}>Host New Game</Text>
    </TouchableOpacity>
    </View>
  )}
</View>
);
}

export default GameForm;
