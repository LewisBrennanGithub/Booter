import React from 'react';
import { View, Text } from 'react-native';
import GameElement from './GameElement';

const GameList = ({ games, handleDeleteGame }) => {
  return (
    <View>
      <Text>GameList</Text>
      {games &&
        games.map((game) => (
          <GameElement
            key={game.id}
            game={game}
            handleDeleteGame={handleDeleteGame}
          />
        ))}
    </View>
  );
};

export default GameList;