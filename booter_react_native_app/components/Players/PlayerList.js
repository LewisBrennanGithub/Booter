import { View, Text, TouchableOpacity } from "react-native-web";
import PlayerElement from "./PlayerElement";
import { styles } from '../../containers/AppStyles';

const PlayerList = ({ players, loggedPlayer, setLoggedPlayer, handleRatePlayerAbility, handleRatePlayerSeriousness }) => {
  return (
    <View>
      {players && players.map((player) => (
        <PlayerElement
          key={player.id}
          player={player}
          loggedPlayer={loggedPlayer}
          setLoggedPlayer={setLoggedPlayer}
          handleRatePlayerAbility={handleRatePlayerAbility}
          handleRatePlayerSeriousness={handleRatePlayerSeriousness}
        />
      ))}
    </View>
  );
};

 
export default PlayerList;