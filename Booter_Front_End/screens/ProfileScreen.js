import { ScrollView } from "react-native";
import LoggedPlayerElement from "../components/Profiles/LoggedPlayerElement";

const ProfileScreen = ({
    loggedPlayer,
    setLoggedPlayer,
    auth0Id,
    handleAddPlayer,
    handleEditPlayer,
    handleDeletePlayer,
    addresses,
    handleUpdateAddress,
    fetchAllPlayers,
    fetchAllAddresses
}) => {

    return(
        <ScrollView>
            <LoggedPlayerElement
                loggedPlayer={loggedPlayer}
                setLoggedPlayer={setLoggedPlayer}
                auth0Id={auth0Id}
                onSubmitPlayerAdded={handleAddPlayer}
                handleEditPlayer={handleEditPlayer}
                handleDeletePlayer={handleDeletePlayer}
                addresses={addresses}
                handleUpdateAddress={handleUpdateAddress}
                fetchAllPlayers={fetchAllPlayers}
                fetchAllAddresses={fetchAllAddresses}
            />
        </ScrollView>
    )
}

export default ProfileScreen