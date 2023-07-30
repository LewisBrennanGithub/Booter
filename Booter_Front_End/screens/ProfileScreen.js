import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import LoggedPlayerElement from "../components/Profiles/LoggedPlayerElement";
import LoggedPlayerUpdateForm from "../components/Profiles/LoggedPlayerUpdateForm";

const ProfileScreen = ({
    loggedPlayer,
    auth0Id,
    setLoggedPlayer,
    fetchAllPlayers,
    handleAddPlayer,
    handleEditPlayer,
    addresses,
    fetchAllAddresses,
    handleUpdateAddress,
    handleDeleteAddress
}) => {

    return(
        <ScrollView>
            <LoggedPlayerElement
                loggedPlayer={loggedPlayer}
                auth0Id={auth0Id}
                setLoggedPlayer={setLoggedPlayer}
                fetchAllPlayers={fetchAllPlayers}
                onSubmitPlayerAdded={handleAddPlayer}
                handleEditPlayer={handleEditPlayer}
                addresses={addresses}
                fetchAllAddresses={fetchAllAddresses}
                handleUpdateAddress={handleUpdateAddress}
                handleDeleteAddress={handleDeleteAddress}
                
            />
        </ScrollView>
    )
}

export default ProfileScreen