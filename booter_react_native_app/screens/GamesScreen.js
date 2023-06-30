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
  
  // console.log('Games in GamesScreen:', games);

  return (
      <ScrollView>
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
  outerContainer: {
    flexGrow: 0,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#f0f', // Optional: set a background color to visualize
  },
});

export default GamesScreen;
