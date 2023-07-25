import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import * as GameServices from "../services/GameServices";
import * as AddressServices from "../services/AddressServices";
import * as PlayerServices from "../services/PlayerServices";
import GamesScreen from '../screens/GamesScreen';
import PlayersScreen from '../screens/PlayersScreen';
import AddContentScreen from '../screens/AddContentScreen';
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

// AUTH0

// const checkAuthSession = async () => {
//   try {
//     const authResult = await checkSession();
//     const { sub: auth0Id } = authResult.idTokenPayload;  // extract the auth0 id from the token payload
//     setAuth0Id(auth0Id);
//     fetchPlayerByAuth0Id(auth0Id);
//   } catch (error) {
//     console.log("No active session:", error);
//   }
// };

// const handleLogin = (id) => {
//   console.log('handleLogin called with id:', id);  // Debug line
//   setAuth0Id(id);
// };

// const handleLogout = () => {
//   console.log('handleLogout called');  // Debug line
//   setAuth0Id(null);
// };

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

// const handleAddPlayer = (playerData) => {
//   PlayerServices.postPlayer(playerData)
//     .then(() => {
//       fetchAllPlayers();
//     }).catch(error => {
//       console.error('An error occurred:', error);
//     });
// };

// const handleAddPlayer = (playerData, addressData) => {
//   Promise.all([AddressServices.postAddress(addressData), PlayerServices.postPlayer(playerData)])
//     .then(() => {
//       fetchAllPlayers();
//       fetchAllAddresses();
//     })
//     .catch((error) => {
//       console.error('An error occurred:', error);
//     });
// };

// const handleAddPlayer = async (playerData, addressData) => {
//   try {
//     await AddressServices.postAddress(addressData);
//     await PlayerServices.postPlayer(playerData);

//     fetchAllPlayers();
//     fetchAllAddresses();
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// };

// const handleAddPlayer = async (playerData, addressData) => {
//   try {
//     const response = await AddressServices.postAddress(addressData);
//     console.log(response); // Log the response data
//     const savedAddressId = response.data.id; // adjust this line based on the actual response structure
    
//     // Add the address ID to the player data
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
    await PlayerServices.postPlayer(newPlayerData);
    fetchAllPlayers();
    fetchAllAddresses();
  } catch (error) {
    console.error('An error occurred:', error);
  }
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
            players={players}
            games={games}
            handleDeleteGame={handleDeleteGame}
            handleJoinGame={handleJoinGame}
            handleUpdateGame={handleUpdateGame}
            loggedPlayer={loggedPlayer}
            handleSetGameCompletedStatus={handleSetGameCompletedStatus}
            address={addresses}
            handleAddGame={handleAddGame}
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
      {/* <BottomTab.Screen
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
            auth0Id={auth0Id}
            setLoggedPlayer={setLoggedPlayer}
          />
        )}
      /> */}
      <BottomTab.Screen 
        name="Profile"
        options={{ title: 'Profile' }}
        children={(props) => (
          <ProfileScreen
          {...props}
          loggedPlayer={loggedPlayer}
          auth0Id={auth0Id}
          players={players}
          addresses={addresses}
          handleAddPlayer={handleAddPlayer}
          setLoggedPlayer={setLoggedPlayer}
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
    height: 50, // or whatever height you want for the header
    backgroundColor: 'lightgrey', // or any other styling you want for the header
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1, // this ensures that the content takes up all remaining space
  }
});

export default BooterContainer;
