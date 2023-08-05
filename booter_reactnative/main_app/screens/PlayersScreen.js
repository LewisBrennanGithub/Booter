import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { appStyles } from '../containers/AppStyles';
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
        <View style={appStyles.subHeader}>
          <Text style={appStyles.subHeaderText}>Players</Text>
        </View>
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
