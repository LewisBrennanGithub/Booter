import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { appStyles } from '../../containers/AppStyles';
import GameUpdateForm from './GameUpdateForm';
import * as GameServices from "../../services/GameServices";
import GameAddressUpdateForm from './GameAddressUpdateForm';
import { formatGameDateAndTime } from '../../Reusable/DateTimeInterpreter';


const GameElement = ({ 
  loggedPlayer, 
  setLoggedPlayer,
  players, 
  game, 
  handleUpdateGame, 
  handleDeleteGame, 
  handleJoinGame, 
  handleSetGameCompletedStatus,
  handleUpdateAddress
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false); 
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

  const toggleEditGameTrue = () => {
    if (isCreator) {
      setIsEditing(true);
    } else {
      alert("You are not the creator of this game and therefore cannot edit it.");
    }
  };

  const handleCancelGameUpdate = () => {
    setIsEditing(false);
  };

  const toggleEditAddressTrue = () => {
    if (isCreator) {
      setIsEditingAddress(true);
    } else {
      alert("You are not the creator of this game and therefore cannot edit its address.");
    }
  };

  const handleCancelUpdateAddress = () => {
    setIsEditingAddress(false);
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
    <View style={appStyles.cardContainer}>
      {isEditing && isCreator ? (
        <GameUpdateForm
          game={game}
          handleUpdateGame={handleEdit}
          handleCancelGameUpdate={handleCancelGameUpdate}
        />
      ) : isEditingAddress && isCreator ? (   
        <GameAddressUpdateForm
          setLoggedPlayer={setLoggedPlayer}
          address={game.address}
          handleUpdateAddress={handleUpdateAddress}
          handleCancelUpdateAddress={handleCancelUpdateAddress}
        />
      ) : (
        <View style={appStyles.card}>
          <View style={appStyles.cardTitle}>
          <Text style={appStyles.cardTitleText}>Name: {game.name}</Text>
          </View>
          <Text>Creator: {players && game && game.creator ? getPlayerUsername(game.creator.id) : 'N/A'}</Text>
          <Text>Address: {game.address ? `${game.address.street}, ${game.address.city}` : 'N/A'}</Text>
          <Text>Date and Time: {formatGameDateAndTime(game.dateAndTime)}</Text>
          <Text>Duration: {game.duration}</Text>
          <Text>Recommended Ability Level: {game.recommendedAbilityLevel}</Text>
          <Text>Recommended Seriousness Level: {game.recommendedSeriousnessLevel}</Text>
          <Text>Actual Ability Level: {game.actualAbilityLevel.toFixed(1)}</Text>
          <Text>Actual Seriousness Level: {game.actualSeriousnessLevel.toFixed(1)}</Text>
          <Text>Completed: {game.completedStatus ? 'Yes' : 'No'}</Text>
          <Text>Max Players: {game.maxPlayers}</Text>
          {gamePlayers.map(player => (
            <Text key={player.id}>Player: {player.userName}</Text>
          ))}
          {!playerIsInGame && !gameIsFull && (
            <TouchableOpacity style={appStyles.button} onPress={() => handleJoinGame(game.id, loggedPlayer)}>
              <Text style={appStyles.buttonText}>Join</Text>
            </TouchableOpacity>
          )}
          {isCreator && (
            <View>
              <TouchableOpacity style={appStyles.button} onPress={() => handleSetGameCompletedStatus(game)}>
                <Text style={appStyles.buttonText}>Toggle Completed Status</Text>
              </TouchableOpacity>
              <TouchableOpacity style={appStyles.button} onPress={toggleEditGameTrue}>
                <Text style={appStyles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={appStyles.button} onPress={toggleEditAddressTrue}>
                <Text style={appStyles.buttonText}>Edit Address</Text>
              </TouchableOpacity>
              <TouchableOpacity style={appStyles.button} onPress={() => handleDeleteGame(game.id)}>
                <Text style={appStyles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
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
