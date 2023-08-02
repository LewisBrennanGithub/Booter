import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PlayerElement = ({ 
  player, 
  handleRatePlayerAbility, 
  handleRatePlayerSeriousness 
}) => {
  const levels = Array.from({ length: 11 }, (_, i) => (i * 0.5).toFixed(1));
  const [selectedAbilityRating, setSelectedAbilityRating] = useState(levels[0]);
  const [selectedSeriousnessRating, setSelectedSeriousnessRating] = useState(levels[0]);

  return (
    <View style={styles.cardContainer}>
          <Text style={styles.usernameText}>{player.userName}</Text>
      <View>
        <Text>Participating Games:</Text>
        {player.games && player.games.map((game) => (
          <Text key={game.id}>- {game.name}</Text>
        ))}
      </View>
      <Text>Ability Rating: {player.displayedAbilityLevel}</Text>
      <Text>Seriousness Rating: {player.displayedSeriousnessLevel}</Text>
        <>
          <Picker
            selectedValue={selectedAbilityRating}
            onValueChange={(itemValue) => setSelectedAbilityRating(itemValue)}
          >
            {levels.map((level) => (
              <Picker.Item key={level} label={level} value={level} />
            ))}
          </Picker>
          <TouchableOpacity style={styles.cardButton} onPress={() => handleRatePlayerAbility(player, selectedAbilityRating)}>
            <Text style={styles.buttonText}>Rate Ability</Text>
          </TouchableOpacity>
          <Picker
            selectedValue={selectedSeriousnessRating}
            onValueChange={(itemValue) => setSelectedSeriousnessRating(itemValue)}
          >
            {levels.map((level) => (
              <Picker.Item key={level} label={level} value={level} />
            ))}
          </Picker>
          <TouchableOpacity style={styles.cardButton} onPress={() => handleRatePlayerSeriousness(player, selectedSeriousnessRating)}>
            <Text style={styles.buttonText}>Rate Seriousness</Text>
          </TouchableOpacity>
        </>
      
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  username: {
    color: 'black',
    marginBottom: 8,
  },
  usernameText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedUsername: {
    backgroundColor: 'green',
    color: 'white',
    marginBottom: 8,
    padding: 4,
    borderRadius: 4,
  },
  cardButton: {
    backgroundColor: '#783c08',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});


export default PlayerElement;
