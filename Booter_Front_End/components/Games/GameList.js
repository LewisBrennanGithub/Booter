import React from 'react';
import { View } from 'react-native';
import GameElement from './GameElement';

const GameList = ({ 
  loggedPlayer, 
  setLoggedPlayer,
  players, 
  games, 
  handleUpdateGame, 
  handleDeleteGame, 
  handleJoinGame, 
  handleSetGameCompletedStatus,
  handleUpdateAddress 
}) => {

  return (
    <View>
      {games && games.map((game) => (
          <GameElement
            key={game.id}
            loggedPlayer={loggedPlayer}
            setLoggedPlayer={setLoggedPlayer}
            players={players}
            game={game}
            handleUpdateGame={handleUpdateGame}
            handleDeleteGame={handleDeleteGame}
            handleJoinGame={handleJoinGame}
            handleSetGameCompletedStatus={handleSetGameCompletedStatus}
            handleUpdateAddress={handleUpdateAddress}
          />
        ))}
    </View>
  );
};

export default GameList;
