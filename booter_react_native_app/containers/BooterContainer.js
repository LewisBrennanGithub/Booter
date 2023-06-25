import React, { useState, useEffect } from 'react';
import { View, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as GameServices from "../services/GameServices";
import * as AddressServices from "../services/AddressServices";
import * as PlayerServices from "../services/PlayerServices";
import GamesScreen from '../screens/GamesScreen';
import PlayersScreen from '../screens/PlayersScreen';
import AddContentScreen from '../screens/AddContentScreen';

// const Stack = createStackNavigator();
// const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const BooterContainer = () => {
  const [addresses, setAddresses] = useState(null);
  const [games, setGames] = useState(null);
  const [players, setPlayers] = useState(null);
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
  
  const TopTabNavigator = () => (
    <TopTab.Navigator>
      <TopTab.Screen
        name="GamesScreen"
        options={{ title: 'Games' }}
        children={(props) => (
          <GamesScreen
            {...props}
            players={players}
            games={games}
            handleDeleteGame={handleDeleteGame}
            handleJoinGame={handleJoinGame}
            handleUpdateGame={handleUpdateGame}
            loggedPlayer={loggedPlayer}
            handleSetGameCompletedStatus={handleSetGameCompletedStatus}
          />
        )}
      />
      <TopTab.Screen
        name="PlayersScreen"
        options={{ title: 'Players' }}
        children={(props) => (
          <PlayersScreen
            {...props}
            players={players}
            loggedPlayer={loggedPlayer}
            setLoggedPlayer={setLoggedPlayer}
            handleRatePlayerAbility={handleRatePlayerAbility}
            handleRatePlayerSeriousness={handleRatePlayerSeriousness}
          />
        )}
      />
      <TopTab.Screen
        name="AddContentScreen"
        options={{ title: 'Add Content' }}
        children={(props) => (
          <AddContentScreen
            {...props}
            addresses={addresses}
            handleAddPlayer={handleAddPlayer}
            handleAddGame={handleAddGame}
            handleAddAddress={handleAddAddress}
            loggedPlayer={loggedPlayer}
          />
        )}
      />
    </TopTab.Navigator>
  );

  return (
    <View>
    <Text>
      {`Booter - Logged in as: ${loggedPlayer ? loggedPlayer.userName : 'Guest'}`}
    </Text>
    <TopTabNavigator />
  </View>
);

};

export default BooterContainer;
