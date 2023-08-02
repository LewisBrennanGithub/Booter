import {useAuth0} from 'react-native-auth0';
import { Text } from 'react-native';

const LogProfileInformation = () => {
    const {user} = useAuth0();

    return (
        <>
            {user && <Text>Logged in as {user.sub}</Text>}
            {!user && <Text>Not logged in</Text>}
        </>
    )
}

export default LogProfileInformation;