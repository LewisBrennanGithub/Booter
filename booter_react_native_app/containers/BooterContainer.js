import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as GameServices from "../services/GameServices";
import * as AddressServices from "../services/AddressServices";
import * as PlayerServices from "../services/PlayerServices";
import AddressList from '../components/Addresses/AddressList';
import AddressForm from '../components/Addresses/AddressForm';
import GameList from '../components/Games/GameList';
import GameUpdateForm from '../components/Games/GameUpdateForm';
import GameForm from '../components/Games/GameForm';
import PlayerList from '../components/Players/PlayerList';
import PlayerForm from '../components/Players/PlayerForm';

const BooterContainer = () => {
  const [addresses, setAddresses] = useState(null);
  const [addressById, setAddressById] = useState(null);
  const [games, setGames] = useState(null);
  const [gamesById, setGamesById] = useState(null);
  const [players, setPlayers] = useState(null);
  const [playersById, setPlayersById] = useState(null);
  const [loggedPlayer, setLoggedPlayer] = useState(null);
  const [gamesPage, setGamesPage] = useState(true);
  const [playersPage, setPlayersPage] = useState(false);
  const [addContentPage, setAddContentPage] = useState(false);

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
      setGames(gamesData);
      setPlayers(playersData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

// PLAYERS

const fetchAllPlayers = () => {
  PlayerServices.getPlayers().then(data => { setPlayers(data)
  });
}

const fetchPlayerGames = () => {
  PlayerServices.getPlayerGames().then(data => { setPlayers(data)
  });
}

const handleJoinGame = (gameId, player) => {
  PlayerServices.playerJoinGame(player.id, gameId, {})
    .then(data => {
        console.log(data);
        fetchAllGames();
        fetchAllPlayers();
    })
    .catch(err => console.error("Error joining game:", err));
};

const handleAddPlayer = (playerData) => {
  PlayerServices.postPlayer(playerData)
    .then(() => {
      fetchAllPlayers();
    }).catch(error => {
      console.error('An error occurred:', error);
    });
};

const handleSetGameCompletedStatus = (game) => {
  PlayerServices.playerSetGameCompletedStatus(loggedPlayer.id, game.id)
    .then(response => {
      console.log(response);
      fetchAllGames();
    })
    .catch(err => console.error('Error setting game completed status:', err));
};

const handleRatePlayerAbility = (player, selectedAbilityRating) => {
  if (!loggedPlayer) {
    console.error("No player is logged in.");
    return;
  }

  const abilityRatingNumber = parseFloat(selectedAbilityRating);

  PlayerServices.rateOtherPlayerAbility(loggedPlayer.id, player.id, abilityRatingNumber)
    .then(response => {
      console.log(response);
      fetchAllPlayers();
    })
    .catch(error => console.error('Error rating player ability:', error));
};

const handleRatePlayerSeriousness = (player, selectedSeriousnessRating) => {
  if (!loggedPlayer) {
    console.error("No player is logged in.");
    fetchAllPlayers();
    return;
  }

  const seriousnessRatingNumber = parseFloat(selectedSeriousnessRating);

  PlayerServices.rateOtherPlayerSeriousness(loggedPlayer.id, player.id, seriousnessRatingNumber)
    .then(response => {
      console.log(response);
      fetchAllPlayers(); 
    })
    .catch(error => console.error('Error rating player seriousness:', error));
};


// GAMES

  const fetchAllGames = () => {
    GameServices.getGames().then(data => {
      setGames(data);
    })
    .catch(err => console.error('Error fetching games:', err));
  };

  const fetchGamesById = (id) => {
    GameServices.getGamesById(id).then(data => {
      setGamesById(data);
    });
  };

  const handleDeleteGame = (id) => {
    GameServices.deleteGame(id).then(() => {
      fetchAllGames();
    })
    .catch(err => console.error('Error deleting game:', err));
  };

  const handleAddGame = (gameData) => {
    GameServices.postGame(gameData)
    .then(() => {
      fetchAllGames();
    });
  };

  const handleUpdateGame = (id, updatedData) => {
    GameServices.updateGame(id, updatedData).then(() => {
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

  const handleAddAddress = (addressData) => {
    AddressServices.postAddress(addressData)
      .then(() => {
        fetchAllAddresses();
      })
  };

  const handleUpdateAddress = (id, updatedData) => {
    AddressServices.updateAddress(id, updatedData).then(() => {
      fetchAllAddresses(); 
    });
  };

  const handleDeleteAddress = (id) => {
    AddressServices.deleteAddress(id).then(() => {
      fetchAllAddresses();
    });
  };
  

  return (
    <View>
    <Text>BooterContainer</Text>
    <View>
      <Button onPress={() => { setGamesPage(true); setPlayersPage(false); setAddContentPage(false); }}>Games</Button>
      <Button onPress={() => { setGamesPage(false); setPlayersPage(true); setAddContentPage(false); }}>Players</Button>
      <Button onPress={() => { setGamesPage(false); setPlayersPage(false); setAddContentPage(true); }}>Add Content</Button>
    </View>

    {/* Conditionally render based on page state */}
    {gamesPage && (
      <>
        {/* Game-related components */}
        <GameList
          players={players}
          games={games}
          handleDeleteGame={handleDeleteGame}
          handleJoinGame={handleJoinGame}
          handleUpdateGame={handleUpdateGame}
          loggedPlayer={loggedPlayer}
          handleSetGameCompletedStatus={handleSetGameCompletedStatus}
        />
        {/* Additional game-related components */}
        {/* <AddressForm
          onSubmitAddressAdded={handleAddAddress}
          onCancel={() => {}}
        />
        <AddressList
          addresses={addresses}
          addressById={addressById}
          fetchAddressById={fetchAddressById}
          handleDeleteAddress={handleDeleteAddress}
          handleUpdateAddress={handleUpdateAddress}
        /> */}
      </>
    )}

    {playersPage && (
      <>
        {/* Player-related components */}
        <PlayerList
          players={players}
          loggedPlayer={loggedPlayer}
          setLoggedPlayer={setLoggedPlayer}
          handleRatePlayerAbility={handleRatePlayerAbility}
          handleRatePlayerSeriousness={handleRatePlayerSeriousness}
        />
      </>
    )}

    {addContentPage && (
      <>
        {/* Additional content-related components */}
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
      </>
    )}
  </View>
);

};

export default BooterContainer;
