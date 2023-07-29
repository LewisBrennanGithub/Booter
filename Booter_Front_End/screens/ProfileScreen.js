import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import LoggedPlayerElement from "../components/Profiles/LoggedPlayerElement";
import LoggedPlayerUpdateForm from "../components/Profiles/LoggedPlayerUpdateForm";

const ProfileScreen = ({
    loggedPlayer,
    addresses,
    handleAddPlayer,
    auth0Id,
    setLoggedPlayer,
    handleEditPlayer,
    fetchAllPlayers
}) => {

    return(
        <ScrollView>
            <LoggedPlayerElement
                loggedPlayer={loggedPlayer}
                addresses={addresses}
                onSubmitPlayerAdded={handleAddPlayer}
                auth0Id={auth0Id}
                setLoggedPlayer={setLoggedPlayer}
                handleEditPlayer={handleEditPlayer}
                fetchAllPlayers={fetchAllPlayers}
            />
        </ScrollView>
    )
}

export default ProfileScreen