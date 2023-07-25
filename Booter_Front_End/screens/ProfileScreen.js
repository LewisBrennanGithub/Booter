import { View, Text, TouchableOpacity } from "react-native";
import LoggedPlayerElement from "../components/Profiles/LoggedPlayerElement";

const ProfileScreen = ({
    loggedPlayer,
    players,
    addresses,
    handleAddPlayer,
    auth0Id,
    setLoggedPlayer
}) => {

    return(
        <View>
            <LoggedPlayerElement
                loggedPlayer={loggedPlayer}
                players={players}
                addresses={addresses}
                onSubmitPlayerAdded={handleAddPlayer}
                auth0Id={auth0Id}
                setLoggedPlayer={setLoggedPlayer}
            />
        </View>
    )
}

export default ProfileScreen