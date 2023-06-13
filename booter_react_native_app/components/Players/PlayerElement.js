import { View, Text, TouchableOpacity } from "react-native-web";

const PlayerElement = ({ player, loggedPlayer, setLoggedPlayer }) => {
  const isSelected = loggedPlayer && loggedPlayer.id === player.id;

  return ( 
    <TouchableOpacity onPress={() => setLoggedPlayer(player)}>
      <View>
        <Text style={{ color: isSelected ? 'green' : 'black' }}>Username: {player.userName}</Text>
      </View>
    </TouchableOpacity>
   );
}
 
export default PlayerElement;