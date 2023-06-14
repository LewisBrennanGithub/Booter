import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, Picker } from 'react-native-web';
import * as PlayerServices from '../../services/PlayerServices';

const PlayerElement = ({ player, loggedPlayer, setLoggedPlayer }) => {
  const isSelected = loggedPlayer && loggedPlayer.id === player.id;

  const [selectedAbilityRating, setSelectedAbilityRating] = useState('');
  const [selectedSeriousnessRating, setSelectedSeriousnessRating] = useState('');

  const handleRatePlayerAbility = () => {
    if (!loggedPlayer) {
      console.error("No player is logged in.");
      return;
    }
  
    const abilityRatingNumber = parseFloat(selectedAbilityRating);
  
    PlayerServices.rateOtherPlayerAbility(loggedPlayer.id, player.id, abilityRatingNumber)
      .then(response => {
        console.log(response);
        // You might want to show some feedback to the user, e.g. "Rating submitted successfully"
      })
      .catch(error => console.error('Error rating player ability:', error));
  };

  const handleRatePlayerSeriousness = () => {
    if (!loggedPlayer) {
      console.error("No player is logged in.");
      return;
    }

    const seriousnessRatingNumber = parseFloat(selectedSeriousnessRating);

    PlayerServices.rateOtherPlayerSeriousness(loggedPlayer.id, player.id, seriousnessRatingNumber)
      .then(response => {
        console.log(response);
        // You might want to show some feedback to the user, e.g. "Rating submitted successfully"
      })
      .catch(error => console.error('Error rating player seriousness:', error));
  };

  const levels = Array.from({ length: 11 }, (_, i) => (i * 0.5).toFixed(1));

  return (
    <View>
      <TouchableOpacity onPress={() => setLoggedPlayer(player)}>
        <Text style={{ color: isSelected ? 'green' : 'black' }}>Username: {player.userName}</Text>
      </TouchableOpacity>
      <Text>Ability Rating: {player.displayedAbilityLevel}</Text>
      <Text>Seriousness Rating: {player.displayedSeriousnessLevel}</Text>
      {!isSelected && (
        <>
          <Picker
            selectedValue={selectedAbilityRating}
            onValueChange={(itemValue) => setSelectedAbilityRating(itemValue)}
          >
            {levels.map((level) => (
              <Picker.Item key={level} label={level} value={level} />
            ))}
          </Picker>
          <Button title="Rate Ability" onPress={handleRatePlayerAbility} />
      
          <Picker
            selectedValue={selectedSeriousnessRating}
            onValueChange={(itemValue) => setSelectedSeriousnessRating(itemValue)}
          >
            {levels.map((level) => (
              <Picker.Item key={level} label={level} value={level} />
            ))}
          </Picker>
          <Button title="Rate Seriousness" onPress={handleRatePlayerSeriousness} />
        </>
      )}
    </View>
  );
};

export default PlayerElement;
