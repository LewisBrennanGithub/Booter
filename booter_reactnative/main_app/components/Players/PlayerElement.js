import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomSlider from '../../Reusable/CustomSlider';
import { appStyles } from '../../containers/AppStyles';

const PlayerElement = ({ 
  player, 
  handleRatePlayerAbility, 
  handleRatePlayerSeriousness 
}) => {
  const levels = Array.from({ length: 11 }, (_, i) => (i * 0.5).toFixed(1));
  const [selectedAbilityRating, setSelectedAbilityRating] = useState(levels[0]);
  const [selectedSeriousnessRating, setSelectedSeriousnessRating] = useState(levels[0]);

  return (
    <View style={appStyles.card}>
          <Text style={appStyles.cardTitleText}>{player.userName}</Text>
      <View>
        <Text style={appStyles.cardText}>Participating Games:</Text>
        {player.games && player.games.map((game) => (
          <Text style={appStyles.cardText} key={game.id}>- {game.name}</Text>
        ))}
      </View>
      <Text style={appStyles.cardText}>Ability Rating: {player.displayedAbilityLevel.toFixed(1)}</Text>
      <Text style={appStyles.cardText}>Seriousness Rating: {player.displayedSeriousnessLevel.toFixed(1)}</Text>
      <View style={appStyles.presentationalTurqouoiseLine}></View>
          <Text style={appStyles.subHeaderText}>Rate Player</Text>
        {/* <View style={styles.container}> */}
          <Text style={appStyles.cardText}>Slider Value: {selectedAbilityRating}</Text>
          <CustomSlider
            value={selectedAbilityRating}
            onValueChange={setSelectedAbilityRating}
            step={0.5}
          />
        {/* </View> */}
        <TouchableOpacity style={appStyles.buttonColor} onPress={() => handleRatePlayerAbility(player, selectedAbilityRating)}>
            <Text style={appStyles.buttonColorText}>Rate Ability</Text>
          </TouchableOpacity>
        {/* <View style={styles.container}> */}
          <Text style={appStyles.cardText}>Slider Value: {selectedSeriousnessRating}</Text>
          <CustomSlider
            value={selectedSeriousnessRating}
            onValueChange={setSelectedSeriousnessRating}
            step={0.5}
          />
          <TouchableOpacity style={appStyles.buttonColor} onPress={() => handleRatePlayerSeriousness(player, selectedSeriousnessRating)}>
            <Text style={appStyles.buttonColorText}>Rate Seriousness</Text>
          </TouchableOpacity>
        {/* </View> */}
    </View>
  );
};


export default PlayerElement;
