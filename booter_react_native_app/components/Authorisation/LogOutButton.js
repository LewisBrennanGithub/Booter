import {useAuth0, Auth0Provider} from 'react-native-auth0';
import { Button } from 'react-native';

const LogOutButton = () => {
    const {clearSession} = useAuth0();

    const onPress = async () => {
        try {
            await clearSession({customScheme: 'booterapp'});
        } catch (e) {
            console.log(e);
        }
    };

    return <Button onPress={onPress} title="Log out" />
}

export default LogOutButton;