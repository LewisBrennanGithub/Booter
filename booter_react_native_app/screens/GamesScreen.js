import { View, ScrollView, StyleSheet } from 'react-native';
import GameList from '../components/Games/GameList';

const GamesScreen = ({ 
  games,
  handleDeleteGame,
  handleUpdateGame,
  handleJoinGame,
  loggedPlayer,
  handleSetGameCompletedStatus,
  players,
}) => {
  
  console.log('Games in GamesScreen:', games);

  return (
    <ScrollView style={styles.container}>
        <GameList
          players={players}
          games={games}
          handleDeleteGame={handleDeleteGame}
          handleJoinGame={handleJoinGame}
          handleUpdateGame={handleUpdateGame}
          loggedPlayer={loggedPlayer}
          handleSetGameCompletedStatus={handleSetGameCompletedStatus}
        />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: '100%'
  },
});

export default GamesScreen;
