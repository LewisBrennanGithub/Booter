import {useAuth0, Auth0Provider} from 'react-native-auth0';
import { Button } from 'react-native';

const LogOutButton = ({onLogout}) => {
    const {clearSession} = useAuth0();

    const handleClearSession = async () => {
        await clearSession({customScheme: 'booterapp'});
        onLogout();
      };
    
    const onPress = async () => {
        try {
            handleClearSession();
        } catch (e) {
            console.log(e);
        }
    };

    return <Button onPress={onPress} title="Log out" />
}

export default LogOutButton;