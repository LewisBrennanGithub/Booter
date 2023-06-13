import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as GameServices from "../services/GameServices";
import * as AddressServices from "../services/AddressServices";
import * as PlayerServices from "../services/PlayerServices";
import AddressList from '../components/Addresses/AddressList';
import AddressForm from '../components/Addresses/AddressForm';
import GameList from '../components/Games/GameList';
import GameUpdateForm from '../components/Games/GameUpdateForm';
import GameForm from '../components/Games/GameForm';
import PlayerList from '../components/Players/PlayerList';

const BooterContainer = () => {
  const [addresses, setAddresses] = useState(null);
  const [addressById, setAddressById] = useState(null);
  const [games, setGames] = useState(null);
  const [gamesById, setGamesById] = useState(null);
  const [players, setPlayers] = useState(null);
  const [playersById, setByPlayers] =useState(null);
  const [loggedPlayer, setLoggedPlayer] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

const fetchAllData = async () => {
  try {
    const [addressesData, gamesData, playersData] = await Promise.all([
      AddressServices.getAddresses(),
      GameServices.getGames(),
      PlayerServices.getPlayers()
    ]);
    setAddresses(addressesData);
    // setGames(gamesData);
    setPlayers(playersData);
    // 1
    const fetchedIndividualGames = await Promise.all(gamesData.map(game => GameServices.getGamesById(game.id)))
    setGames(fetchedIndividualGames);
    // 2
    // const fetchedIndividualGames = await Promise.all(gamesData.map(game => fetchGamesById(game.id)))
    // setGames(fetchedIndividualGames);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// PLAYERS

const fetchAllPlayers = () => {
  PlayerServices.getPlayers().then(data => { setPlayers(data)
  });
}

const handleJoinGame = (gameId, player) => {
  PlayerServices.playerJoinGame(player.id, gameId, {})
    .then(data => {
        console.log(data);
        fetchAllGames();
    })
    .catch(err => console.error("Error joining game:", err));
};

// GAMES

  const fetchAllGames = () => {
    GameServices.getGames().then(data => { setGames(data);
    });
  };

  const fetchGamesById = (id) => {
    GameServices.getGamesById(id).then(data => {
      setGamesById(data);
    });
  };

  // NEED TO IMPLEMENT FIND GAME-PLAYERS
  // const fetchGamePlayers = (id) => {
  //   GameServices.getGamePlayers(id).then(data => {set})
  // }

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
        <PlayerList 
        players={players} 
        loggedPlayer={loggedPlayer} setLoggedPlayer={setLoggedPlayer}
        />
        <GameForm 
        addresses={addresses} 
        onSubmit={handleAddGame} 
        onCancel={() => {}} 
        loggedPlayer={loggedPlayer}  
        /> 
        <GameList 
        players={players} 
        games={games} 
        handleDeleteGame={handleDeleteGame}
        handleJoinGame={handleJoinGame}
        loggedPlayer={loggedPlayer} 
        />
        <AddressForm 
        onSubmit={handleAddAddress} 
        onCancel={() => {}} />
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
