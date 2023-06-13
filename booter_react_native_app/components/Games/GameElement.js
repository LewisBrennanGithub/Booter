import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import GameUpdateForm from './GameUpdateForm';


const GameElement = ({ game, handleDeleteGame, handleUpdateGameProp }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditGame = () => {
    setIsEditing(true);
  };

  const handleCancelUpdate = () => {
    setIsEditing(false);
  };

  const handleUpdateGame = () => {
    setIsEditing(false);
    handleUpdateGameProp(game.id);
  };

  return (
    <View>
      {isEditing ? (
        <GameUpdateForm
          game={game}
          onUpdate={handleUpdateGame}
          onCancel={handleCancelUpdate}
        />
      ) : (
        <>
          <Text>Game Element</Text>
          <Text>Name: {game.name}</Text>
          <Text>Creator: {game && game.creator ? game.creator.userName : 'N/A'}</Text>
          <Text>
  Address: {game.address ? `${game.address.street}, ${game.address.city}` : 'N/A'}
</Text>
          <Text>Date and Time: {game.dateAndTime}</Text>
          <Text>Duration: {game.duration}</Text>
          <Text>Recommended Ability Level: {game.recommendedAbilityLevel}</Text>
          <Text>Recommended Seriousness Level: {game.recommendedSeriousnessLevel}</Text>
          <Text>Actual Ability Level: {game.actualAbilityLevel}</Text>
          <Text>Actual Seriousness Level: {game.actualSeriousnessLevel}</Text>
          <Text>Completed: {game.completedStatus ? 'Yes' : 'No'}</Text>
          <Text>Max Players: {game.maxPlayers}</Text>
          <Button title="Edit" onPress={handleEditGame} />
          <Button title="Delete" onPress={() => handleDeleteGame(game.id)} />
        </>
      )}
    </View>
  );
};

export default GameElement;
