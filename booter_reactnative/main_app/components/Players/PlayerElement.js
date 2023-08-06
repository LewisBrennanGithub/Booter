import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CustomSlider from '../../Reusable/CustomSlider';
import { appStyles } from '../../containers/AppStyles';

const PlayerElement = ({ 
  player, 
  handleRatePlayerAbility, 
  handleRatePlayerSeriousness 
}) => {
  const [selectedAbilityRating, setSelectedAbilityRating] = useState(0);
  const [selectedSeriousnessRating, setSelectedSeriousnessRating] = useState(0);

  return (
    <View style={appStyles.card}>
          <Text style={appStyles.cardTitleText}>{player.userName}</Text>
        <Text style={appStyles.cardText}>Participating Games:</Text>
        {player.games && player.games.map((game) => (
          <Text style={appStyles.cardText} key={game.id}>- {game.name}</Text>
        ))}
      <Text style={appStyles.cardText}>Ability Rating: {player.displayedAbilityLevel.toFixed(1)}</Text>
      <Text style={appStyles.cardText}>Seriousness Rating: {player.displayedSeriousnessLevel.toFixed(1)}</Text>
      <View style={appStyles.presentationalTurqouoiseLine}></View>
          <Text style={appStyles.subHeaderText}>Rate Player</Text>
          <Text style={appStyles.cardText}>Slider Value: {selectedAbilityRating}</Text>
          <CustomSlider
            value={selectedAbilityRating}
            onValueChange={setSelectedAbilityRating}
            step={0.5}
          />
        <TouchableOpacity style={appStyles.buttonColor} onPress={() => handleRatePlayerAbility(player, selectedAbilityRating)}>
            <Text style={appStyles.buttonColorText}>Rate Ability</Text>
          </TouchableOpacity>
          <Text style={appStyles.cardText}>Slider Value: {selectedSeriousnessRating}</Text>
          <CustomSlider
            value={selectedSeriousnessRating}
            onValueChange={setSelectedSeriousnessRating}
            step={0.5}
          />
          <TouchableOpacity style={appStyles.buttonColor} onPress={() => handleRatePlayerSeriousness(player, selectedSeriousnessRating)}>
            <Text style={appStyles.buttonColorText}>Rate Seriousness</Text>
          </TouchableOpacity>
    </View>
  );
};


export default PlayerElement;
