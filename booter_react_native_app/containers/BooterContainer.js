import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
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
import GamesScreen from '../screens/GamesScreen';
import PlayersScreen from '../screens/PlayersScreen';
import AddContentScreen from '../screens/AddContentScreen';
import { StyleSheet } from 'react-native';
import { styles } from './AppStyles';

const Stack = createStackNavigator();

const BooterContainer = () => {
  const [addresses, setAddresses] = useState(null);
  const [addressById, setAddressById] = useState(null);
  const [games, setGames] = useState(null);
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
  GameServices.getGames()
    .then(data => {
      setGames(data);
    })
    .catch(err => console.error('Error fetching games:', err));
};

  const handleAddGame = (gameData) => {
    GameServices.postGame(gameData)
    .then(() => {
      fetchAllGames();
    });
  };

  const handleDeleteGame = (id) => {
    GameServices.deleteGame(id)
      .then(() => {
        fetchAllGames();
      })
      .catch(err => console.error('Error deleting game:', err));
  };

  const handleUpdateGame = (id, updatedData) => {
    GameServices.updateGame(id, updatedData)
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
    <View style={styles.bodyStyle}>
      <View style={styles.headerStyle}>
        <View style={styles.topLineStyle}>
          <View style={styles.leftContent}>
            <Text style={styles.iconWhiteText}>Booter Beta 0.1</Text>
          </View>
          <View style={styles.rightContent}>
            <Text style={styles.iconWhiteText}>
              {loggedPlayer ? <Text style={styles.whiteText}>{loggedPlayer.userName}</Text> : 'No logged user'}
            </Text>
          </View>
        </View>

        <View style={styles.navBarStyle}>
          <TouchableOpacity onPress={() => { setGamesPage(true); setPlayersPage(false); setAddContentPage(false); }}>
            <Text style={styles.whiteText}>Games</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setGamesPage(false); setPlayersPage(true); setAddContentPage(false); }}>
            <Text style={styles.whiteText}>Players</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setGamesPage(false); setPlayersPage(false); setAddContentPage(true); }}>
            <Text style={styles.whiteText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      {gamesPage && (
        <GameList
          players={players}
          games={games}
          handleDeleteGame={handleDeleteGame}
          handleJoinGame={handleJoinGame}
          handleUpdateGame={handleUpdateGame}
          loggedPlayer={loggedPlayer}
          handleSetGameCompletedStatus={handleSetGameCompletedStatus}
          fetchAllGames={fetchAllGames}
        />
      )}

      {playersPage && (
        <PlayerList
          players={players}
          loggedPlayer={loggedPlayer}
          setLoggedPlayer={setLoggedPlayer}
          handleRatePlayerAbility={handleRatePlayerAbility}
          handleRatePlayerSeriousness={handleRatePlayerSeriousness}
          fetchAllPlayers={fetchAllPlayers}
        />
      )}

      {addContentPage && (
        <>
          <PlayerForm
            addresses={addresses}
            onSubmitPlayerAdded={handleAddPlayer}
            fetchAllPlayers={fetchAllPlayers}
          />
          <GameForm
            addresses={addresses}
            onSubmitGameAdded={handleAddGame}
            onCancel={() => {}}
            loggedPlayer={loggedPlayer}
            fetchAllGames={fetchAllGames}
          />
          <AddressForm
            onSubmitAddressAdded={handleAddAddress}
            onCancel={() => {}}
            fetchAllAddresses={fetchAllAddresses}
          />
        </>
      )}
    </View>
);

};

export default BooterContainer;
