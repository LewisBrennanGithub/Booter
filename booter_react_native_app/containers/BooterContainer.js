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
import PlayerForm from '../components/Players/PlayerForm';

const BooterContainer = () => {
  const [addresses, setAddresses] = useState(null);
  const [addressById, setAddressById] = useState(null);
  const [games, setGames] = useState(null);
  const [gamesById, setGamesById] = useState(null);
  const [players, setPlayers] = useState(null);
  const [playersById, setPlayersById] = useState(null);
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
      setGames(gamesData);
      setPlayers(playersData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

// const fetchAllData = async () => {
//   try {
//     const [addressesData, gamesData, playersData] = await Promise.all([
//       AddressServices.getAddresses(),
//       GameServices.getGames(),
//       PlayerServices.getPlayers()
//     ]);
//     setAddresses(addressesData);
//     setGames(gamesData);
//     setPlayers(playersData);
    // 1
    // const fetchedIndividualGames = await Promise.all(gamesData.map(game => GameServices.getGamesById(game.id)))
    // setGames(fetchedIndividualGames);
    // 2
    // const fetchedIndividualGames = await Promise.all(gamesData.map(game => fetchGamesById(game.id)))
    // setGames(fetchedIndividualGames);

//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

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

const handleSetGameCompletedStatus = (game) => {
  PlayerServices.playerSetGameCompletedStatus(loggedPlayer.id, game.id)
    .then(response => {
      console.log(response);
      fetchAllGames();
      // You may also want to update the UI to reflect the change or refetch the game details.
    })
    .catch(err => console.error('Error setting game completed status:', err));
};



// GAMES

  // const fetchAllGames = () => {
  //   GameServices.getGames().then(data => { setGames(data);
  //   });
  // };
  // const fetchAllGames = () => {
  //   GameServices.getGames().then(data => {
  //     setGames(data); // Assuming setGames is your state setter for games.
  //   });
  // };

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

  // NEED TO IMPLEMENT FIND GAME-PLAYERS
  // const fetchGamePlayers = (id) => {
  //   GameServices.getGamePlayers(id).then(data => {set})
  // }

  // const handleDeleteGame = (id) => {
  //   GameServices.deleteGame(id).then(data => {
  //     fetchAllGames();
  //   });
  // };

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

  // const handleUpdateGame = (id, updatedData) => {
  //   GameServices.updateGame(id, updatedData).then(() => {
  //     fetchAllGames(); // Re-fetch all the addresses to refresh the component
  //   });
  // };

  const handleUpdateGame = (id, updatedData) => {
    GameServices.updateGame(id, updatedData).then(() => {
      fetchAllGames(); // Re-fetch all the games to refresh the component
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
      fetchAllAddresses(); // Re-fetch all the addresses to refresh the component
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
        <PlayerForm 
        addresses={addresses}
        onPlayerAdded={fetchAllPlayers}
        />
        <PlayerList 
        players={players} 
        loggedPlayer={loggedPlayer} 
        setLoggedPlayer={setLoggedPlayer}
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
        handleUpdateGame={handleUpdateGame}
        loggedPlayer={loggedPlayer}
        handleSetGameCompletedStatus={handleSetGameCompletedStatus} 
        />
        <AddressForm 
        onSubmit={handleAddAddress} 
        onCancel={() => {}} 
        />
        <AddressList 
        addresses={addresses} 
        addressById={addressById}
        fetchAddressById={fetchAddressById}
        handleDeleteAddress={handleDeleteAddress}
        handleUpdateAddress={handleUpdateAddress}
        />
    </View>
);

};

export default BooterContainer;
