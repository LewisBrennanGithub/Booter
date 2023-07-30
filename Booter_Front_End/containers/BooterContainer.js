import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useAuth0} from 'react-native-auth0';
import * as GameServices from "../services/GameServices";
import * as AddressServices from "../services/AddressServices";
import * as PlayerServices from "../services/PlayerServices";
import GamesScreen from '../screens/GamesScreen';
import PlayersScreen from '../screens/PlayersScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';

const BottomTab = createBottomTabNavigator();

const BooterContainer = () => {
  const [addresses, setAddresses] = useState(null);
  const [games, setGames] = useState(null);
  const [players, setPlayers] = useState(null);
  const [loggedPlayer, setLoggedPlayer] = useState(null);
  const [auth0Id, setAuth0Id] = useState(null);
  const {user} = useAuth0();

  useEffect(() => {
    fetchAllData();
    if (user && user.sub) {
      setAuth0Id(user.sub);
      if (auth0Id) {
        fetchPlayerByAuth0Id(auth0Id);
      }  
    }  
  }, [user, auth0Id]);

  const fetchAllData = async () => {
    try {
      const [addressesData, gamesData, playersData] = await Promise.all([
        AddressServices.getAddresses(),
        GameServices.getGames(),
        PlayerServices.getPlayers(),
      ]);
      setAddresses(addressesData);
      setGames(gamesData);
      setPlayers(playersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchPlayerByAuth0Id = async (id) => {
    if(id){
      try{
        const data = await PlayerServices.getPlayerByAuth0Id(id);
        setLoggedPlayer(data);
      }catch(error){
        console.log("Error fetching player: ", error);
      }
    }
  }

// PLAYERS

const fetchAllPlayers = () => {
  PlayerServices.getPlayers().then(data => { 
    setPlayers(data);
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

// const handleAddPlayer = async (playerData, addressData) => {
//   try {
//     const response = await AddressServices.postAddress(addressData);
//     const savedAddressId = response.id; 
//     const newPlayerData = {...playerData, address: {id: savedAddressId}};
//     await PlayerServices.postPlayer(newPlayerData);
//     fetchAllPlayers();
//     fetchAllAddresses();
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// };

const handleAddPlayer = async (playerData, addressData) => {
  try {
    const response = await AddressServices.postAddress(addressData);
    const savedAddressId = response.id; 
    const newPlayerData = {...playerData, address: {id: savedAddressId}};
    const playerResponse = await PlayerServices.postPlayer(newPlayerData);
    fetchAllPlayers();
    fetchAllAddresses();
    return playerResponse;  // This is the newly created player data.
  } catch (error) {
    console.error('An error occurred:', error);
  }
};


// const handleEditPlayer = (playerData) => {
//   PlayerServices.updatePlayer(loggedPlayer.id, playerData)
//     .then(() => { fetchAllPlayers(); })
//     .catch(err => console.error('Error updating player profile', err));
// };

const handleEditPlayer = (playerData) => {
  return PlayerServices.updatePlayer(loggedPlayer.id, playerData) // Return the promise
    .then(() => { fetchAllPlayers(); })
    .catch(err => console.error('Error updating player profile', err));
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

const handleAddGame = async (gameData, addressData) => {
  try {
    const response = await AddressServices.postAddress(addressData);
    const savedAddressId = response.id;
    const newGameData = {...gameData, address: {id: savedAddressId}};
    await GameServices.postGame(newGameData);
    fetchAllGames();
    fetchAllAddresses();
  } catch (error) {
    console.error('An error occured:', error);
  }
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

  // const handleUpdateAddress = (id, updatedData) => {
  //   AddressServices.updateAddress(id, updatedData).then(() => {
  //     fetchAllAddresses(); 
  //     fetchAllPlayers();
  //   });
  // };

  // const handleUpdateAddress = (id, updatedData) => {
  //   return AddressServices.updateAddress(id, updatedData)
  //     .then((updatedAddress) => {
  //       fetchAllAddresses(); 
  //       return updatedAddress;
  //     });
  // };

  const handleUpdateAddress = (id, updatedData) => {
    return AddressServices.updateAddress(id, updatedData)
      .then(updatedAddress => {
        fetchAllAddresses();
        fetchAllPlayers();
        fetchAllGames();
        // return the updated address so we can use it in the `.then()` in your `AddressUpdateForm` component
        return updatedAddress;
      });
  };
  
  // const handleDeleteAddress = (id) => {
  //   AddressServices.deleteAddress(id).then(() => {
  //     fetchAllAddresses();
  //   });
  // };

  const handleDeleteAddress = (id) => {
    AddressServices.deleteAddress(id).then(() => {
      fetchAllAddresses(); 
      fetchAllPlayers(); // fetch all players to update players list
      setLoggedPlayer(prevLoggedPlayer => ({ // update loggedPlayer's address to null
        ...prevLoggedPlayer,
        address: null
      }));
    });
  };
  
  
  const BottomTabNavigator = () => (
    <View style={styles.container}>
    <View style={styles.header}>
    <Text>Booter {user ? user.sub : 'Nothing'} </Text>
      <Text>{`Logged Player: ${loggedPlayer ? loggedPlayer.userName : 'Guest'}`} {`Auth0 State: ${auth0Id ? auth0Id : 'Not logged in'}`}</Text>
    </View>
    <View style={styles.content}>
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="GamesScreen"
        options={{ title: 'Games' }}
        children={(props) => (
          <GamesScreen
            {...props}
            loggedPlayer={loggedPlayer}
            setLoggedPlayer={setLoggedPlayer}
            players={players}
            games={games}
            handleAddGame={handleAddGame}
            handleUpdateGame={handleUpdateGame}
            handleDeleteGame={handleDeleteGame}
            handleJoinGame={handleJoinGame}
            handleSetGameCompletedStatus={handleSetGameCompletedStatus}
            address={addresses}
            handleUpdateAddress={handleUpdateAddress}
          />
        )}
      />
      <BottomTab.Screen
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
      <BottomTab.Screen 
        name="Profile"
        options={{ title: 'Profile' }}
        children={(props) => (
          <ProfileScreen
          {...props}
          loggedPlayer={loggedPlayer}
          auth0Id={auth0Id}
          players={players}
          handleAddPlayer={handleAddPlayer}
          setLoggedPlayer={setLoggedPlayer}
          handleEditPlayer={handleEditPlayer}
          fetchAllPlayers={fetchAllPlayers}
          addresses={addresses}
          fetchAllAddresses={fetchAllAddresses}
          handleUpdateAddress={handleUpdateAddress}
          handleDeleteAddress={handleDeleteAddress}
          />
        )}
        />
      <BottomTab.Screen
          name="LoginScreen"
          options={{ title: 'Login' }}
          children={(props) => (
            <LoginScreen
              {...props}
              auth0Id={auth0Id}
              setAuth0Id={setAuth0Id}
              setLoggedPlayer={setLoggedPlayer}
            />
          )}
        />
    </BottomTab.Navigator>
    </View>
    </View>
  );

  return (
    <>
    <BottomTabNavigator />
    </>
);

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50, 
    backgroundColor: 'lightgrey', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1, 
  }
});

export default BooterContainer;
