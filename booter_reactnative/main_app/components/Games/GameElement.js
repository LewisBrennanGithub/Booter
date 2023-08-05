import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { appStyles } from '../../containers/AppStyles';
import { formatGameDateAndTime } from '../../Reusable/DateTimeInterpreter';
// Why the straight import? Consider prop drilling
import * as GameServices from "../../services/GameServices";
import GameUpdateForm from './GameUpdateForm';
import GameAddressUpdateForm from './GameAddressUpdateForm';

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
          <Text style={appStyles.cardTitleText}>{game.name}</Text>
          <Text style={appStyles.subHeaderText}>Game Information</Text>
          <Text style={appStyles.cardText}>Creator: {players && game && game.creator ? getPlayerUsername(game.creator.id) : 'N/A'}</Text>
          <Text style={appStyles.cardText}>Address: {game.address ? `${game.address.street}, ${game.address.city}` : 'N/A'}</Text>
          <Text style={appStyles.cardText}>Date and Time: {formatGameDateAndTime(game.dateAndTime)}</Text>
          <Text style={appStyles.cardText}>Duration: {game.duration}</Text>
          <Text style={appStyles.cardText}>Completed: {game.completedStatus ? 'Yes' : 'No'}</Text>
          <View style={appStyles.presentationalCopperLine}></View>
          <Text style={appStyles.subHeaderText}>Game Composition</Text>
          <Text style={appStyles.cardText}>Recommended Ability Level: {game.recommendedAbilityLevel}</Text>
          <Text style={appStyles.cardText}>Recommended Seriousness Level: {game.recommendedSeriousnessLevel}</Text>
          <Text style={appStyles.cardText}>Actual Ability Level: {game.actualAbilityLevel.toFixed(1)}</Text>
          <Text style={appStyles.cardText}>Actual Seriousness Level: {game.actualSeriousnessLevel.toFixed(1)}</Text>
          <View style={appStyles.presentationalCopperLine}></View>
          <Text style={appStyles.subHeaderText}>Game Player Information</Text>
          <Text style={appStyles.cardText}>Max Players: {game.maxPlayers}</Text>
          <Text style={appStyles.cardText}>Players:</Text>
          {gamePlayers.map(player => (
            <Text  style={appStyles.cardText} key={player.id}>- {player.userName}</Text>
          ))}
          {!playerIsInGame && !gameIsFull && (

            <TouchableOpacity style={appStyles.buttonColor} onPress={() => handleJoinGame(game.id, loggedPlayer)}>
              <Text style={appStyles.buttonColorText}>Join Game</Text>
            </TouchableOpacity>

          )}
          {isCreator && (
            <>
              <TouchableOpacity style={appStyles.buttonColor} onPress={toggleEditGameTrue}>
                <Text style={appStyles.buttonColorText}>Edit Game</Text>
              </TouchableOpacity>
              <TouchableOpacity style={appStyles.buttonColor} onPress={toggleEditAddressTrue}>
                <Text style={appStyles.buttonColorText}>Edit Address</Text>
              </TouchableOpacity>
              <TouchableOpacity style={appStyles.buttonColor} onPress={() => handleSetGameCompletedStatus(game)}>
                <Text style={appStyles.buttonColorText}>Game Completed</Text>
              </TouchableOpacity>
              <TouchableOpacity style={appStyles.buttonColor} onPress={() => handleDeleteGame(game.id)}>
                <Text style={appStyles.buttonColorText}>Delete Game</Text>
              </TouchableOpacity>
              </>
          )}
        </View>
      )}
    </View>
  );
};

export default GameElement;
