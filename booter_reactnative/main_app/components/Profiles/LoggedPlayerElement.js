import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState } from 'react';
import LoggedPlayerForm from "./LoggedPlayerForm";
import LoggedPlayerUpdateForm from "./LoggedPlayerUpdateForm";
import LoggedPlayerAddressUpdateForm from "./LoggedPlayerAddressUpdateForm";
import { appStyles } from "../../containers/AppStyles";

const LoggedPlayerElement = ({ 
  loggedPlayer,
  setLoggedPlayer,
  auth0Id,
  onSubmitPlayerAdded,
  handleEditPlayer,
  handleDeletePlayer,
  handleUpdateAddress,
  fetchAllPlayers,
}) => {
  const [editingProfileBoolean, setEditingProfileBoolean] = useState(false);
  const [editingAddressBoolean, setEditingAddressBoolean] = useState(false);

  const toggleEditProfileTrue = () => {
    setEditingProfileBoolean(true);
  }

  const toggleEditProfileFalse = () => {
    setEditingProfileBoolean(false);
  }

  const toggleEditAddressTrue = () => {
    setEditingAddressBoolean(true);
  }
  const toggleEditAddressFalse = () => {
    setEditingAddressBoolean(false);
  }

  return (
    loggedPlayer ? (
      <ScrollView style={appStyles.card}>
        <Text style={appStyles.cardTitleText}>{loggedPlayer.userName}</Text>
        <Text style={appStyles.subHeaderText}>Personal Information</Text>
        <Text style={appStyles.cardText}>Name: {loggedPlayer.firstName} {loggedPlayer.lastName}</Text>
        <Text style={appStyles.cardText}>Age: {loggedPlayer.age}</Text>
        <Text style={appStyles.cardText}>Telephone Number: {loggedPlayer.phoneNumber}</Text>
        <Text style={appStyles.cardText}>Address: {loggedPlayer.address.propertyNumberOrName || 'N/A'}, {loggedPlayer.address.street || 'N/A'}, {loggedPlayer.address.city || 'N/A'}, {loggedPlayer.address.country || 'N/A'}, {loggedPlayer.address.postCode || 'N/A'}</Text>
        <View style={appStyles.presentationalCopperLine}></View>
        <Text style={appStyles.subHeaderText}>Rating Information</Text>
        <Text style={appStyles.cardText}>Ability Rating: {loggedPlayer.displayedAbilityLevel}</Text>
        <Text style={appStyles.cardText}>Seriousness Rating: {loggedPlayer.displayedSeriousnessLevel}</Text>
        <View style={appStyles.presentationalCopperLine}></View>
        <Text style={appStyles.subHeaderText}>Game Information</Text>
          <Text style={appStyles.cardText}>Participating Games:</Text>
          {loggedPlayer.games && loggedPlayer.games.length > 0 
            ? loggedPlayer.games.map((game) => (
              <Text style={appStyles.cardText} key={game.id}>- {game.name}</Text>
            ))
            : <Text style={appStyles.cardText}>None</Text>
          }
              {editingProfileBoolean ? (
          <LoggedPlayerUpdateForm
            loggedPlayer={loggedPlayer}
            auth0Id={auth0Id}
            setLoggedPlayer={setLoggedPlayer}
            handleEditPlayer={handleEditPlayer}
            fetchAllPlayers={fetchAllPlayers}
            toggleEditProfileFalse={toggleEditProfileFalse}
          />
        ) : (
          <TouchableOpacity style={appStyles.buttonColor} onPress={toggleEditProfileTrue}>
            <Text style={appStyles.buttonColorText}>Update Profile</Text>
          </TouchableOpacity>
        )}
        {editingAddressBoolean ? (
          <LoggedPlayerAddressUpdateForm
            setLoggedPlayer={setLoggedPlayer}
            address={loggedPlayer.address}
            handleUpdateAddress={handleUpdateAddress}
            toggleEditAddressFalse={toggleEditAddressFalse}
          />
        ) : (
            <>
              <TouchableOpacity style={appStyles.buttonColor} onPress={toggleEditAddressTrue}>
                <Text style={appStyles.buttonColorText}>Update Address</Text>
              </TouchableOpacity>
            </>
   
        )}

        <TouchableOpacity style={appStyles.buttonColor} onPress={() => handleDeletePlayer(loggedPlayer.id)}>
          <Text style={appStyles.buttonColorText}>Delete Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    ) : (
      <ScrollView>
        <LoggedPlayerForm 
          onSubmitPlayerAdded={onSubmitPlayerAdded}
          auth0Id={auth0Id}
          setLoggedPlayer={setLoggedPlayer}
        />
      </ScrollView>
    )
  );

};

export default LoggedPlayerElement;