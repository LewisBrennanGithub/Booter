import { View } from 'react-native';
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
    <View>
        <GameList
          players={players}
          games={games}
          handleDeleteGame={handleDeleteGame}
          handleJoinGame={handleJoinGame}
          handleUpdateGame={handleUpdateGame}
          loggedPlayer={loggedPlayer}
          handleSetGameCompletedStatus={handleSetGameCompletedStatus}
        />
    </View>
  );
};

export default GamesScreen;
