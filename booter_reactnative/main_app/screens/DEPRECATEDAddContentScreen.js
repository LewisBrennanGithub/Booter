// AddContentPage.js

import React from 'react';
import { View, ScrollView } from 'react-native';
import PlayerForm from '../components/Profiles/LoggedPlayerForm';
import GameForm from '../components/Games/GameForm';
import AddressForm from '../components/Addresses/AddressForm';

// MUST RENAME TO SCREEN WHEN TIME PERMITS
const AddContentPage = ({
  addresses,
  handleAddPlayer,
  handleAddGame,
  loggedPlayer,
  handleAddAddress,
  auth0Id,
  setLoggedPlayer
}) => {
  return (
    <ScrollView>
      <PlayerForm
        addresses={addresses}
        onSubmitPlayerAdded={handleAddPlayer}
        auth0Id={auth0Id}
        setLoggedPlayer={setLoggedPlayer}
      />
      {/* <GameForm
        addresses={addresses}
        onSubmitGameAdded={handleAddGame}
        loggedPlayer={loggedPlayer}
      /> */}
      <AddressForm
        onSubmitAddressAdded={handleAddAddress}
      />
    </ScrollView>
  );
};

export default AddContentPage;
