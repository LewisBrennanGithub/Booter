import React from 'react';
import { View, ScrollView } from 'react-native';
import PlayerList from '../components/Players/PlayerList';

const PlayersScreen = ({
  players,
  loggedPlayer,
  setLoggedPlayer,
  handleRatePlayerAbility,
  handleRatePlayerSeriousness
}) => {
  return (
    <ScrollView>
        <PlayerList
          players={players}
          loggedPlayer={loggedPlayer}
          setLoggedPlayer={setLoggedPlayer}
          handleRatePlayerAbility={handleRatePlayerAbility}
          handleRatePlayerSeriousness={handleRatePlayerSeriousness}
        />
    </ScrollView>
  );
};

export default PlayersScreen;
