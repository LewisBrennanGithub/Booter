import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as GameServices from "../services/GameServices";
import * as AddressServices from "../services/AddressServices";
import AddressList from '../components/Addresses/AddressList';
import AddressForm from '../components/Addresses/AddressForm';
import GameList from '../components/Games/GameList';
import GameUpdateForm from '../components/Games/GameUpdateForm';

const BooterContainer = () => {
  const [addresses, setAddresses] = useState(null);
  const [addressById, setAddressById] = useState(null);
  const [games, setGames] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [addressesData, gamesData] = await Promise.all([
        AddressServices.getAddresses(),
        GameServices.getGames()
      ]);
      setAddresses(addressesData);
      setGames(gamesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

// GAMES

  const fetchAllGames = () => {
    GameServices.getGames().then(data => { setGames(data);
    });
  };

  const fetchGamesById = (id) => {
    GameServices.getGamesById(id).then(data => {
      setAddressById(data);
    });
  };

  const handleDeleteGame = (id) => {
    GameServices.deleteGame(id).then(data => {
      fetchAllGames();
    });
  };

  const handleAddGame = (gameData) => {
    GameServices.postGame(gameData)
    .then(() => {
      fetchAllGames();
    });
  };

// ADDRESSES

  const fetchAllAddresses = () => {
    AddressServices.getAddresses().then(data => {
      setAddresses(data);
    });
  };

  const fetchAddressById = (id) => {
    AddressServices.getAddressesById(id).then(data => {
      setAddressById(data);
    });
  };

  const handleDeleteAddress = (id) => {
    AddressServices.deleteAddress(id).then(() => {
      fetchAllAddresses();
    });
  };

  const handleAddAddress = (addressData) => {
    AddressServices.postAddress(addressData)
      .then(() => {
        fetchAllAddresses();
      })
  };

  return (
    <View>
      <Text>BooterContainer</Text>
      <GameUpdateForm />
      <GameList games={games} handleDeleteGame={handleDeleteGame} />
      <AddressForm onSubmit={handleAddAddress} onCancel={() => {}} />
      <AddressList 
        addresses={addresses} 
        addressById={addressById}
        fetchAddressById={fetchAddressById}
        handleDeleteAddress={handleDeleteAddress}
      />
    </View>
  );
};

export default BooterContainer;
