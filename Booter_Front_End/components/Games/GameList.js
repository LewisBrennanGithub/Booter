import React from 'react';
import { View, Text } from 'react-native';
import GameElement from './GameElement';

const GameList = ({ 
  loggedPlayer, 
  setLoggedPlayer,
  players, 
  games, 
  addresses,
  handleUpdateGame, 
  handleDeleteGame, 
  handleJoinGame, 
  handleSetGameCompletedStatus,
  handleUpdateAddress 
}) => {

  // console.log('Games in GameList:', games); 

  return (
    <View>
      {games && games.map((game) => (
          <GameElement
            key={game.id}
            loggedPlayer={loggedPlayer}
            setLoggedPlayer={setLoggedPlayer}
            players={players}
            game={game}
            addresses={addresses}
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
