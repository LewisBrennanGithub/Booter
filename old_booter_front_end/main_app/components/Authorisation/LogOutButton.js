import { useAuth0 } from 'react-native-auth0';
import { Button } from 'react-native';

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

    return <Button onPress={onPress} title="Log out" />
}

export default LogOutButton;