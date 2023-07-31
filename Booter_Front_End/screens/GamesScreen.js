import { ScrollView } from 'react-native';
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

export default GamesScreen;
