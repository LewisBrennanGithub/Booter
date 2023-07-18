import {useAuth0, Auth0Provider} from 'react-native-auth0';
import { Button } from 'react-native';

const LogInButton = () => {
    const {authorize} = useAuth0();

    const onPress = async () => {
        try {
            await authorize();
        } catch (e) {
            console.log(e);
        }
    };

    return <Button onPress={onPress} title="Log in" />
}

export default LogInButton;