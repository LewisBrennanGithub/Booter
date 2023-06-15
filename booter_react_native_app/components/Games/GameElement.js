// REMOVE USEEFFECT
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import GameUpdateForm from './GameUpdateForm';
import * as GameServices from "../../services/GameServices";
import * as PlayerServices from "../../services/PlayerServices";
import { styles } from '../../containers/AppStyles';

const GameElement = ({ players, game, handleDeleteGame, handleJoinGame, loggedPlayer, handleUpdateGame, handleSetGameCompletedStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [gamePlayers, setGamePlayers] = useState([]);

  // CONSIDER REVISING - POSSIBLY UN-NECESSARY
  useEffect(() => {
    fetchGamePlayers();
  }, [game]);
  const fetchGamePlayers = async () => {
    try {
      const fetchedGamePlayers = await GameServices.getGamePlayers(game.id);
      setGamePlayers(fetchedGamePlayers);
    } catch (err) {
      console.error('Error fetching game players:', err);
    }
  };

  const isCreator = loggedPlayer?.id === game?.creator?.id;

  
  const playerIsInGame = game?.players?.some(player => player.id === loggedPlayer?.id);
  const gameIsFull = (game.players?.length ?? 0) >= game.maxPlayers;

  const handleEditGame = () => {
    setIsEditing(true);
  };

  const handleCancelUpdate = () => {
    setIsEditing(false);
  };

  const handleEdit = (updatedData) => {
    setIsEditing(false);
    handleUpdateGame(game.id, updatedData); 
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
          handleUpdateGame={handleEdit}
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
  <TouchableOpacity style={styles.buttonStyle} onPress={() => handleJoinGame(game.id, loggedPlayer)}>
    <Text style={styles.whiteText}>Join</Text>
  </TouchableOpacity>
)}
{isCreator && (
  <TouchableOpacity style={styles.buttonStyle} onPress={() => handleSetGameCompletedStatus(game)}>
    <Text style={styles.whiteText}>Toggle Completed Status</Text>
  </TouchableOpacity>
)}
<TouchableOpacity style={styles.buttonStyle} onPress={handleEditGame}>
  <Text style={styles.whiteText}>Edit</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.buttonStyle} onPress={() => handleDeleteGame(game.id)}>
  <Text style={styles.whiteText}>Delete</Text>
</TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default GameElement;
