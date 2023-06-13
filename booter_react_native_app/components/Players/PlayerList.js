import { View, Text } from "react-native-web";
import PlayerElement from "./PlayerElement";

const PlayerList = ({players,}) => {
  return ( 
    <View>
      <Text>Player List</Text>
      {players && players.map((player) => (
        <PlayerElement 
          key={player.id}
          player={player}
        />
      ))}
    </View>
   );
}
 
export default PlayerList;