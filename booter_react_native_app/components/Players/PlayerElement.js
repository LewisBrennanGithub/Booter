import { View, Text } from "react-native-web";

const PlayerElement = ({player}) => {
  return ( 
    <View>
      <Text>Username: {player.userName}</Text>
    </View>
   );
}
 
export default PlayerElement;