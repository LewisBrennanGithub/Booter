import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, Picker } from 'react-native-web';
import * as PlayerServices from '../../services/PlayerServices';

const PlayerElement = ({ player, loggedPlayer, setLoggedPlayer, handleRatePlayerAbility, handleRatePlayerSeriousness }) => {
  const isSelected = loggedPlayer && loggedPlayer.id === player.id;

  const [selectedAbilityRating, setSelectedAbilityRating] = useState('');
  const [selectedSeriousnessRating, setSelectedSeriousnessRating] = useState('');

  const levels = Array.from({ length: 11 }, (_, i) => (i * 0.5).toFixed(1));

  return (
    <View>
      <TouchableOpacity onPress={() => setLoggedPlayer(player)}>
        <Text style={{ color: isSelected ? 'green' : 'black' }}>Username: {player.userName}</Text>
      </TouchableOpacity>
      <View>
        <Text>Participating Games:</Text>
        {player.games && player.games.map((game) => (
          <Text key={game.id}>- {game.name}</Text>
        ))}
      </View>
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
          <Button title="Rate Ability" onPress={() => handleRatePlayerAbility(player, selectedAbilityRating)} />
          <Picker
            selectedValue={selectedSeriousnessRating}
            onValueChange={(itemValue) => setSelectedSeriousnessRating(itemValue)}
          >
            {levels.map((level) => (
              <Picker.Item key={level} label={level} value={level} />
            ))}
          </Picker>
          <Button title="Rate Seriousness" onPress={() => handleRatePlayerSeriousness(player, selectedSeriousnessRating)} />
        </>
      )}
    </View>
  );
};

export default PlayerElement;
