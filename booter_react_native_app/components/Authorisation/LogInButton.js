import {useAuth0, Auth0Provider} from 'react-native-auth0';
import { Button } from 'react-native';

const LogInButton = ({onLogin}) => {
    const {authorize} = useAuth0();

    const handleAuthorize = async () => {
        const { sub: userId } = await authorize({scope: 'openid profile email'}, {customScheme: 'booterapp'});
        onLogin(userId);
      };

    const onPress = async () => {
        try {
            console.log('Attempting to authorize'); // Debugging statement
            handleAuthorize();
            console.log('Authorized successfully'); // Debugging statement
        } catch (e) {
            console.log('Error in authorization:', e);
        }
    };

    return <Button onPress={onPress} title="Log in" />
}

export default LogInButton;