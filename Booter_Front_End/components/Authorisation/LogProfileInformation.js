import {useAuth0, Auth0Provider} from 'react-native-auth0';
import { Text } from 'react-native';

const LogProfileInformation = () => {
    const {user} = useAuth0();

    return (
        <>
            {user && <Text>Logged in as {user.name}</Text>}
            {!user && <Text>Not logged in</Text>}
        </>
    )
}

export default LogProfileInformation;