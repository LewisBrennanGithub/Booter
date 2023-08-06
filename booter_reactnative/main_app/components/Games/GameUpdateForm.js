import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import CustomSlider from '../../Reusable/CustomSlider';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReactDatePicker from 'react-datepicker';
import { appStyles } from '../../containers/AppStyles';

const GameUpdateForm = ({ 
  game, 
  handleUpdateGame, 
  handleCancelGameUpdate
}) => {
  const [name, setName] = useState(game.name || '');
  const [dateAndTime, setDateAndTime] = useState(new Date(game.dateAndTime) || new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [duration, setDuration] = useState(game.duration ? game.duration.toString() : '');
  const [recommendedAbilityLevel, setRecommendedAbilityLevel] = useState(game.recommendedAbilityLevel || 0);
  const [recommendedSeriousnessLevel, setRecommendedSeriousnessLevel] = useState(game.recommendedSeriousnessLevel || 0);
  const [maxPlayers, setMaxPlayers] = useState(game.maxPlayers || 2);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateAndTime;
    setShowDatePicker(Platform.OS === 'ios');
    setDateAndTime(currentDate);
  };

  const updateGame = () => {
    const updatedData = {
      name,
      dateAndTime,
      duration,
      recommendedAbilityLevel,
      recommendedSeriousnessLevel,
      maxPlayers,
    };
    handleUpdateGame(updatedData); 
  };

  return (
    <View style={appStyles.card}>
          <Text style={appStyles.cardTitleText}>Edit Game</Text>
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
            <Text>Slider Value: {recommendedAbilityLevel.toFixed(1)}</Text>
            <CustomSlider
              value={recommendedAbilityLevel}
              onValueChange={setRecommendedAbilityLevel}
              step={0.5}
            />
          <Text style={appStyles.cardText}>Recommended Seriousness Ability</Text>
            <Text>Slider Value: {recommendedSeriousnessLevel.toFixed(1)}</Text>
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
          <TouchableOpacity style={appStyles.buttonColor} onPress={updateGame}>
            <Text style={appStyles.buttonColorText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={appStyles.buttonColor} onPress={() => handleCancelGameUpdate()}>
            <Text style={appStyles.buttonColorText}>Cancel</Text>
          </TouchableOpacity>
    </View>
  );
}

export default GameUpdateForm;
