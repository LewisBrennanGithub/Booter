import { View, ScrollView, StyleSheet } from 'react-native';
import GameList from '../components/Games/GameList';
import GameForm from '../components/Games/GameForm';

const GamesScreen = ({ 
  loggedPlayer,
  setLoggedPlayer,
  players,
  games,
  addresses,
  handleAddGame,
  handleUpdateGame,
  handleDeleteGame,
  handleJoinGame,
  handleSetGameCompletedStatus,
  handleUpdateAddress
}) => {
  
  // console.log('Games in GamesScreen:', games);

  return (
      <ScrollView>
        { loggedPlayer ? (
        <GameForm 
            addresses={addresses}
            handleAddGame={handleAddGame}
            loggedPlayer={loggedPlayer}
        /> 
        ) : null }
          <GameList
            loggedPlayer={loggedPlayer}
            setLoggedPlayer={setLoggedPlayer}
            players={players}
            games={games}
            addresses={addresses}
            handleDeleteGame={handleDeleteGame}
            handleUpdateGame={handleUpdateGame}
            handleJoinGame={handleJoinGame}
            handleSetGameCompletedStatus={handleSetGameCompletedStatus}
            handleUpdateAddress={handleUpdateAddress}
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
