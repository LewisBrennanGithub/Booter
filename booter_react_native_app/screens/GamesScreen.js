import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import GameList from '../components/Games/GameList';
import * as GameServices from '../services/GameServices';

const GamesScreen = ({ loggedPlayer, handleSetGameCompletedStatus }) => {
  const [games, setGames] = useState(null);
  
  useEffect(() => {
    fetchAllGames();
  }, []);

  const fetchAllGames = () => {
    GameServices.getGames()
      .then(data => {
        setGames(data);
      })
      .catch(err => console.error('Error fetching games:', err));
  };

  const handleDeleteGame = (id) => {
    GameServices.deleteGame(id)
      .then(() => {
        fetchAllGames();
      })
      .catch(err => console.error('Error deleting game:', err));
  };

  const handleAddGame = (gameData) => {
    GameServices.postGame(gameData)
      .then(() => {
        fetchAllGames();
      });
  };

  const handleUpdateGame = (id, updatedData) => {
    GameServices.updateGame(id, updatedData)
      .then(() => {
        fetchAllGames();
      });
  };

  return (
    <View>
      {games && (
        <GameList
          games={games}
          handleDeleteGame={handleDeleteGame}
          handleUpdateGame={handleUpdateGame}
          loggedPlayer={loggedPlayer}
          handleSetGameCompletedStatus={handleSetGameCompletedStatus}
        />
      )}
    </View>
  );
};

export default GamesScreen;
