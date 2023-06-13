import React from 'react';
import { View, Text } from 'react-native';
import GameElement from './GameElement';

const GameList = ({ games, handleDeleteGame, handleUpdateGame }) => {
  return (
    <View>
      <Text>GameList</Text>
      {games &&
        games.map((game) => (
          <GameElement
            key={game.id}
            game={game}
            handleDeleteGame={handleDeleteGame}
            handleUpdateGameProp={handleUpdateGame} // Renamed prop
          />
        ))}
    </View>
  );
};

export default GameList;
