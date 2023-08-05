import { ScrollView, View, Text } from 'react-native';
import { appStyles } from '../containers/AppStyles';
import LoggedPlayerElement from "../components/Profiles/LoggedPlayerElement";

const ProfileScreen = ({
    loggedPlayer,
    setLoggedPlayer,
    auth0Id,
    handleAddPlayer,
    handleEditPlayer,
    handleDeletePlayer,
    handleUpdateAddress,
    fetchAllPlayers,
    fetchAllAddresses
}) => {

    return(
        <ScrollView>
        <View style={appStyles.subHeader}>
          <Text style={appStyles.subHeaderText}>Profile</Text>
        </View>
            <LoggedPlayerElement
                loggedPlayer={loggedPlayer}
                setLoggedPlayer={setLoggedPlayer}
                auth0Id={auth0Id}
                onSubmitPlayerAdded={handleAddPlayer}
                handleEditPlayer={handleEditPlayer}
                handleDeletePlayer={handleDeletePlayer}
                handleUpdateAddress={handleUpdateAddress}
                fetchAllPlayers={fetchAllPlayers}
                fetchAllAddresses={fetchAllAddresses}
            />
        </ScrollView>
    )
}

export default ProfileScreen