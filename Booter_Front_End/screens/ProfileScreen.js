import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import LoggedPlayerElement from "../components/Profiles/LoggedPlayerElement";
import LoggedPlayerUpdateForm from "../components/Profiles/LoggedPlayerUpdateForm";

const ProfileScreen = ({
    loggedPlayer,
    setLoggedPlayer,
    auth0Id,
    players,
    handleAddPlayer,
    handleEditPlayer,
    handleDeletePlayer,
    addresses,
    handleUpdateAddress,
    handleDeleteAddress,
    fetchAllPlayers,
    fetchAllAddresses
}) => {

    return(
        <ScrollView>
            <LoggedPlayerElement
                loggedPlayer={loggedPlayer}
                setLoggedPlayer={setLoggedPlayer}
                auth0Id={auth0Id}
                players={players}
                onSubmitPlayerAdded={handleAddPlayer}
                handleEditPlayer={handleEditPlayer}
                handleDeletePlayer={handleDeletePlayer}
                addresses={addresses}
                handleUpdateAddress={handleUpdateAddress}
                handleDeleteAddress={handleDeleteAddress}
                fetchAllPlayers={fetchAllPlayers}
                fetchAllAddresses={fetchAllAddresses}
            />
        </ScrollView>
    )
}

export default ProfileScreen