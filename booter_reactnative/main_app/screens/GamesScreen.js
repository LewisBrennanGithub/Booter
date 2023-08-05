import { ScrollView, View, Text } from 'react-native';
import { appStyles } from '../containers/AppStyles';
import GameList from '../components/Games/GameList';
import GameForm from '../components/Games/GameForm';

const GamesScreen = ({ 
  loggedPlayer,
  setLoggedPlayer,
  players,
  games,
  handleAddGame,
  handleUpdateGame,
  handleDeleteGame,
  handleJoinGame,
  handleSetGameCompletedStatus,
  handleUpdateAddress
}) => {

  return (
      <ScrollView>
        { loggedPlayer ? (
        <GameForm 
            handleAddGame={handleAddGame}
            loggedPlayer={loggedPlayer}
        /> 
        ) : null }
          <GameList
            loggedPlayer={loggedPlayer}
            setLoggedPlayer={setLoggedPlayer}
            players={players}
            games={games}
            handleDeleteGame={handleDeleteGame}
            handleUpdateGame={handleUpdateGame}
            handleJoinGame={handleJoinGame}
            handleSetGameCompletedStatus={handleSetGameCompletedStatus}
            handleUpdateAddress={handleUpdateAddress}
          />
      </ScrollView>
  );
};

export default GamesScreen;
