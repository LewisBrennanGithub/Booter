import React from 'react';
import { View, Text } from 'react-native';
import GameElement from './GameElement';

const GameList = ({ players, games, handleDeleteGame, handleJoinGame, handleUpdateGame, loggedPlayer, handleSetGameCompletedStatus }) => {

  // console.log('Games in GameList:', games); 

  return (
    <View>
      {games && games.map((game) => (
          <GameElement
            key={game.id}
            game={game}
            handleDeleteGame={handleDeleteGame}
            handleJoinGame={handleJoinGame}
            players={players}
            handleUpdateGame={handleUpdateGame}
            loggedPlayer={loggedPlayer}
            handleSetGameCompletedStatus={handleSetGameCompletedStatus}
          />
        ))}
    </View>
  );
};

export default GameList;
