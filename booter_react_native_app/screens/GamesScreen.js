import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import GameList from '../components/Games/GameList';
import * as GameServices from '../services/GameServices';

const GamesScreen = ({ 
  games,
  handleDeleteGame,
  handleUpdateGame,
  handleJoinGame,
  loggedPlayer,
  handleSetGameCompletedStatus,
  players,
}) => {
  
  return (
    <View>
      {games && (
        <GameList
          players={players}
          games={games}
          handleDeleteGame={handleDeleteGame}
          handleJoinGame={handleJoinGame}
          handleUpdateGame={handleUpdateGame}
          loggedPlayer={loggedPlayer}
          handleSetGameCompletedStatus={handleSetGameCompletedStatus}
        />
      )}
    </View>
  );
};

export default GamesScreen;
