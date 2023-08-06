import { useAuth0 } from 'react-native-auth0';
import { TouchableOpacity, Text } from 'react-native';
import { appStyles } from '../../containers/AppStyles';

const LogOutButton = ({setAuth0Id, setLoggedPlayer}) => {
    const {clearSession} = useAuth0();

    const clearState = () => {
        setAuth0Id(null),
        setLoggedPlayer(null)
    }

    const onPress = async () => {
        try {
            await clearSession();
            clearState();
        } catch (e) {
            console.log(e);
        }
    };

    return ( 
  <TouchableOpacity style={appStyles.buttonColor} onPress={onPress}>
    <Text style={appStyles.buttonColorText}>Log Out</Text>
  </TouchableOpacity>
    );
}

export default LogOutButton;