// AddContentPage.js

import React from 'react';
import { View, ScrollView } from 'react-native';
import PlayerForm from '../components/Players/PlayerForm';
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
      <GameForm
        addresses={addresses}
        onSubmitGameAdded={handleAddGame}
        onCancel={() => {}}
        loggedPlayer={loggedPlayer}
      />
      <AddressForm
        onSubmitAddressAdded={handleAddAddress}
        onCancel={() => {}}
      />
    </ScrollView>
  );
};

export default AddContentPage;
