import {useAuth0, Auth0Provider} from 'react-native-auth0';
import { Text } from 'react-native';

const LogProfileInformation = () => {
    const {user, error} = useAuth0();

    return (
        <>
            {user && <Text>Logged in as {user.sub}</Text>}
            {!user && <Text>Not logged in</Text>}
            {error && <Text>{error.message}</Text>}
        </>
    )
}

export default LogProfileInformation;