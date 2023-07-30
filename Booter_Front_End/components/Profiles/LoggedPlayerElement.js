import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from 'react';
import PlayerForm from "../Players/PlayerForm";
import LoggedPlayerUpdateForm from "./LoggedPlayerUpdateForm";
import AddressUpdateForm from "../Addresses/AdressUpdateForm";

const LoggedPlayerElement = ({ 
  loggedPlayer,
  auth0Id,
  setLoggedPlayer,
  fetchAllPlayers,
  onSubmitPlayerAdded,
  handleEditPlayer,
  addresses,
  fetchAllAddresses,
  handleUpdateAddress,
  handleDeleteAddress
}) => {
  const [editingAddressBoolean, setEditingAddressBoolean] = useState(false);
  const [triggerUseEffect, setTriggerUseEffect] = useState(false);

  useEffect(() => {
    if (triggerUseEffect) {
      fetchAllAddresses();
      fetchAllPlayers();
      setTriggerUseEffect(false);
      console.log(loggedPlayer.address.propertyNumberOrName)
    }
  }, [triggerUseEffect]);

  const toggleEditAddressTrue = () => {
    setEditingAddressBoolean(true);
  }
  const toggleEditAddressFalse = () => {
    setEditingAddressBoolean(false);
    setTriggerUseEffect(true);
  }
    return (
        loggedPlayer ? (
            <ScrollView style={styles.cardContainer}>
                <LoggedPlayerUpdateForm
                handleEditPlayer={handleEditPlayer}
                loggedPlayer={loggedPlayer}
                auth0Id={auth0Id}
                setLoggedPlayer={setLoggedPlayer}
                fetchAllPlayers={fetchAllPlayers}
                />
                <Text style={styles.usernameText}>{loggedPlayer.userName}</Text>
                <View>
                    <Text>Participating Games:</Text>
                    {loggedPlayer.games && loggedPlayer.games.length > 0 
                        ? loggedPlayer.games.map((game) => (
                            <Text key={game.id}>- {game.name}</Text>
                          ))
                        : <Text>None</Text>
                    }
                </View>
                <Text>Ability Rating: {loggedPlayer.displayedAbilityLevel}</Text>
                <Text>Seriousness Rating: {loggedPlayer.displayedSeriousnessLevel}</Text>
                <Text>Address:</Text>
        {editingAddressBoolean ? (
          <AddressUpdateForm
            address={loggedPlayer.address}
            onUpdate={handleUpdateAddress}
            onSuccess={() => toggleEditAddressFalse()}
            fetchAllPlayers={fetchAllPlayers}
            fetchAllAddresses={fetchAllAddresses}
            setLoggedPlayer={setLoggedPlayer}
          />
        ) : (
          loggedPlayer.address ? (
            <>
              <Text>
                {loggedPlayer.address.propertyNumberOrName || 'N/A'}, {loggedPlayer.address.street || 'N/A'},
                {loggedPlayer.address.city || 'N/A'}, {loggedPlayer.address.country || 'N/A'},
                {loggedPlayer.address.postCode || 'N/A'}
              </Text>
              <TouchableOpacity style={styles.buttonStyle} onPress={toggleEditAddressTrue}>
                <Text style={styles.whiteText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => handleDeleteAddress(loggedPlayer.address.id)}>
                <Text style={styles.whiteText}>Delete</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text>No address available</Text>
          )
        )}
            </ScrollView>
        ) : (
            <ScrollView>
                <Text>Create a new player</Text>
                <PlayerForm 
                        addresses={addresses}
                        onSubmitPlayerAdded={onSubmitPlayerAdded}
                        auth0Id={auth0Id}
                        setLoggedPlayer={setLoggedPlayer}
                        fetchAllPlayers={fetchAllPlayers}
                />
            </ScrollView>
        )
    );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  username: {
    color: 'black',
    marginBottom: 8,
  },
  usernameText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedUsername: {
    backgroundColor: 'green',
    color: 'white',
    marginBottom: 8,
    padding: 4,
    borderRadius: 4,
  },
  cardButton: {
    backgroundColor: '#783c08',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default LoggedPlayerElement;