import React from 'react';
import { View } from 'react-native';
import PlayerList from '../components/Players/PlayerList';

const PlayersScreen = ({
  players,
  loggedPlayer,
  setLoggedPlayer,
  handleRatePlayerAbility,
  handleRatePlayerSeriousness
}) => {
  return (
    <View>
        <PlayerList
          players={players}
          loggedPlayer={loggedPlayer}
          setLoggedPlayer={setLoggedPlayer}
          handleRatePlayerAbility={handleRatePlayerAbility}
          handleRatePlayerSeriousness={handleRatePlayerSeriousness}
        />
    </View>
  );
};

export default PlayersScreen;
