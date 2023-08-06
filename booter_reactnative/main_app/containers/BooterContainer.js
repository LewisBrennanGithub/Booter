import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { appStyles } from './AppStyles';
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
  };

// PLAYERS

const fetchAllPlayers = () => {
  PlayerServices.getPlayers().then(data => { 
    setPlayers(data);
  });
};

const handleJoinGame = (gameId, player) => {
  PlayerServices.playerJoinGame(player.id, gameId, {})
    .then(data => {
        console.log(data);
        fetchAllGames();
        fetchAllPlayers();
    })
    .then(() => {
      fetchPlayerByAuth0Id(auth0Id);
    })
    .catch(err => console.error("Error joining game:", err));
};

const handleAddPlayer = async (playerData, addressData) => {
  try {
    const response = await AddressServices.postAddress(addressData);
    const savedAddressId = response.id; 
    const newPlayerData = {...playerData, address: {id: savedAddressId}};
    const playerResponse = await PlayerServices.postPlayer(newPlayerData);
    fetchPlayerByAuth0Id(auth0Id); 
    fetchAllPlayers();
    return playerResponse; 
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

const handleEditPlayer = (playerData) => {
  return PlayerServices.updatePlayer(loggedPlayer.id, playerData) 
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

const handleDeletePlayer = (id) => {
  PlayerServices.deletePlayer(id)
  .then(() => {
    fetchAllPlayers();
    fetchAllGames();
    setLoggedPlayer(null);
  })
}
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
    return AddressServices.updateAddress(id, updatedData)
      .then(updatedAddress => {
        fetchAllAddresses();
        fetchAllPlayers();
        fetchAllGames();
        return updatedAddress;
      });
  };
  
  const handleDeleteAddress = (id) => {
    AddressServices.deleteAddress(id).then(() => {
      fetchAllAddresses(); 
      fetchAllPlayers(); 
      setLoggedPlayer(prevLoggedPlayer => ({ 
        ...prevLoggedPlayer,
        address: null
      }));
    });
  };
  
  const BottomTabNavigator = () => (
    <View style={appStyles.container}>
    <View style={appStyles.header}>
    <Text style={appStyles.headerLogoText}>Booter</Text>
      <Text style={appStyles.headerText}>{`Logged Player: ${loggedPlayer ? loggedPlayer.userName : 'Guest'}`} | {`Account: ${auth0Id ? 'Logged in' : 'Not logged in'}`}</Text>
    </View>
    <View style={appStyles.content}>
    <BottomTab.Navigator
  screenOptions={{
    tabBarActiveTintColor: '#d44908',
    tabBarInactiveTintColor: '#068DA9',
    tabBarLabelStyle: { fontSize: 12 },
    tabBarStyle: { backgroundColor: '#f0ebe9' },
  }}
    >
      <BottomTab.Screen
        name="GamesScreen"
        options={{ title: 'Games', headerShown: false }}
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
            handleUpdateAddress={handleUpdateAddress}
          />
        )}
      />
      <BottomTab.Screen
        name="PlayersScreen"
        options={{ title: 'Players', headerShown: false }}
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
        options={{ title: 'Profile', headerShown: false }}
        children={(props) => (
          <ProfileScreen
          {...props}
          loggedPlayer={loggedPlayer}
          setLoggedPlayer={setLoggedPlayer}
          auth0Id={auth0Id}
          handleAddPlayer={handleAddPlayer}
          handleEditPlayer={handleEditPlayer}
          handleDeletePlayer={handleDeletePlayer}
          handleUpdateAddress={handleUpdateAddress}
          fetchAllPlayers={fetchAllPlayers}
          />
        )}
        />
      <BottomTab.Screen
          name="LoginScreen"
          options={{ title: 'Login', headerShown: false }}
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


export default BooterContainer;
