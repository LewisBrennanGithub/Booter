// AddContentPage.js

import React from 'react';
import { View } from 'react-native';
import PlayerForm from '../components/Players/PlayerForm';
import GameForm from '../components/Games/GameForm';
import AddressForm from '../components/Addresses/AddressForm';

const AddContentPage = ({
  addresses,
  handleAddPlayer,
  handleAddGame,
  loggedPlayer,
  handleAddAddress
}) => {
  return (
    <View>
      <PlayerForm
        addresses={addresses}
        onSubmitPlayerAdded={handleAddPlayer}
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
    </View>
  );
};

export default AddContentPage;
