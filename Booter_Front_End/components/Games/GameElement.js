import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import GameUpdateForm from './GameUpdateForm';
import * as GameServices from "../../services/GameServices";
import * as PlayerServices from "../../services/PlayerServices";

const GameElement = ({ players, game, handleDeleteGame, handleJoinGame, loggedPlayer, handleUpdateGame, handleSetGameCompletedStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [gamePlayers, setGamePlayers] = useState([]);

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

  // console.log('Game in GameElement:', game);

  return (
    <View style={styles.cardContainer}>
      {isEditing ? (
        <GameUpdateForm
          game={game}
          handleUpdateGame={handleEdit}
          onCancel={handleCancelUpdate}
        />
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Name: {game.name}</Text>
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
            <TouchableOpacity style={styles.cardButton} onPress={() => handleJoinGame(game.id, loggedPlayer)}>
              <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity>
          )}
          {isCreator && (
            <TouchableOpacity style={styles.cardButton} onPress={() => handleSetGameCompletedStatus(game)}>
              <Text style={styles.buttonText}>Toggle Completed Status</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.cardButton} onPress={handleEditGame}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardButton} onPress={() => handleDeleteGame(game.id)}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
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

export default GameElement;
