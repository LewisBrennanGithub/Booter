import { View, Text } from "react-native-web";
import PlayerElement from "./PlayerElement";

const PlayerList = ({ players, loggedPlayer, setLoggedPlayer }) => {
  return (
    <View>
      <Text>Player List</Text>
      {players && players.map((player) => (
        <PlayerElement
          key={player.id}
          player={player}
          loggedPlayer={loggedPlayer}
          setLoggedPlayer={setLoggedPlayer}
        />
      ))}
    </View>
  );
};

 
export default PlayerList;