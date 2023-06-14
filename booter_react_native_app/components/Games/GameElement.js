// REMOVE USEEFFECT
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import GameUpdateForm from './GameUpdateForm';
import * as GameServices from "../../services/GameServices";

const GameElement = ({ players, game, handleDeleteGame, handleJoinGame, loggedPlayer }) => {
  const [isEditing, setIsEditing] = useState(false);

  // DELETE BELOW THIS LINE
  // TESTING PURPOSES ONLY - DELETE THIS
  const [gamePlayers, setGamePlayers] = useState([]);
  // TESTING PURPOSES ONLY - DELETE THIS
  useEffect(() => {
    fetchGamePlayers();
  }, [game]);
  // TESTING PURPOSES ONLY - DELETE THIS
  const fetchGamePlayers = async () => {
    try {
      const fetchedGamePlayers = await GameServices.getGamePlayers(game.id);
      setGamePlayers(fetchedGamePlayers);
    } catch (err) {
      console.error('Error fetching game players:', err);
    }
  };
  // DELETE ABOVE THIS LINE
  
  const playerIsInGame = game?.players?.some(player => player.id === loggedPlayer?.id);
  const gameIsFull = (game.players?.length ?? 0) >= game.maxPlayers;

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

  const getPlayerUsername = (playerId) => {
    const player = players.find((player) => player.id === playerId);
    return player ? player.userName : 'N/A';
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
          <Text>Creator: {players && game && game.creator ? getPlayerUsername(game.creator.id) : 'N/A'}</Text>
          <Text>Address: {game.address ? `${game.address.street}, ${game.address.city}` : 'N/A'}</Text>
          <Text>Date and Time: {game.dateAndTime}</Text>
          <Text>Duration: {game.duration}</Text>
          <Text>Recommended Ability Level: {game.recommendedAbilityLevel}</Text>
          <Text>Recommended Seriousness Level: {game.recommendedSeriousnessLevel}</Text>
          <Text>Actual Ability Level: {game.actualAbilityLevel}</Text>
          <Text>Actual Seriousness Level: {game.actualSeriousnessLevel}</Text>
          <Text>Completed: {game.completedStatus ? 'Yes' : 'No'}</Text>
          <Text>Max Players: {game.maxPlayers}</Text>
          {gamePlayers.map(player => (
  <Text key={player.id}>Player: {player.userName}</Text>
))}
          {!playerIsInGame && !gameIsFull && (
            <Button title="Join" onPress={() => handleJoinGame(game.id, loggedPlayer)} />
          )}
          <Button title="Edit" onPress={handleEditGame} />
          <Button title="Delete" onPress={() => handleDeleteGame(game.id)} />
        </>
      )}
    </View>
  );
};

export default GameElement;
