import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Button } from 'react-native';

const Container = () => {
  const [addresses, setAddresses] = useState(null);
  const [players, setPlayers] = useState(null);
  const [playersGames, setPlayersGames] = useState({});
  const [games, setGames] = useState(null);
  const [gamePlayers, setGamePlayers] = useState({});
  const [loggedPlayer, setLoggedPlayer] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [hostedGame, setHostedGame] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all([
          fetch('http://localhost:8080/players'),
          fetch('http://localhost:8080/addresses'),
          fetch('http://localhost:8080/games')
        ]);
  
        const playersData = await results[0].json();
        const addressesData = await results[1].json();
        const gamesData = await results[2].json();
  
        setPlayers(playersData);
        setAddresses(addressesData);
        setGames(gamesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

// ADDRESS BASED FUNCTIONS

  const fetchAddressById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/addresses/${id}`);
      const address = await response.json();
      console.log('Fetched address by ID:', address);
      // You may set this to state or pass it to a component for display
    } catch (error) {
      console.error('Error fetching address by ID:', error);
    }
  };

  
  const createAddress = async (addressData) => {
    try {
      const response = await fetch('http://localhost:8080/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addressData)
      });
      const newAddress = await response.json();
      console.log('Address created:', newAddress);
    } catch (error) {
      console.error('Error creating address:', error);
    }
  };
  

  const updateAddress = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:8080/addresses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
  
      const updatedAddress = await response.json();
      console.log('Address updated:', updatedAddress);
      // You might want to update your addresses state here
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  
  const deleteAddress = async (id) => {
    try {
      await fetch(`http://localhost:8080/addresses/${id}`, {
        method: 'DELETE'
      });
  
      console.log('Address deleted');
      // You might want to update your addresses state here
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  // GAME BASED FUNCTIONS

  const fetchGameById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/games/${id}`);
      const game = await response.json();
      console.log('Fetched game by ID:', game);
      // You may set this to state or pass it to a component for display
    } catch (error) {
      console.error('Error fetching game by ID:', error);
    }
  };

  const fetchGamesPlayers = async (gameId) => {
    try {
      const response = await fetch(`http://localhost:8080/games/${gameId}/players`);
      const playersData = await response.json();
  
      // Update the gamePlayers state with the players data
      setGamePlayers(prevState => ({
        ...prevState,
        [gameId]: playersData
      }));
    } catch (error) {
      console.error('Error fetching players for game:', error);
    }
  };


  const addressObject = {
    id: 471,
    propertyNumberOrName: 25,
    street: "cow road",
    city: "ivopy",
    country: "moon",
    postCode: "two"
};

  const createGame = async (creatorId, name, address, dateAndTime, duration, recommendedAbilityLevel, recommendedSeriousnessLevel, actualAbilityLevel, actualSeriousnessLevel, completedStatus, maxPlayers) => {
    try {
      const gameData = {
        creator: creatorId,
        name,
        address: addressObject,
        dateAndTime,
        duration,
        recommendedAbilityLevel,
        recommendedSeriousnessLevel,
        actualAbilityLevel,
        actualSeriousnessLevel,
        completedStatus,
        maxPlayers,
      };
  
      const response = await fetch('http://localhost:8080/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData)
      });
  
      const newGame = await response.json();
      console.log('Game created:', newGame);
      // You might want to update your games state here
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };
  
  

  const deleteGame = async (id) => {
    try {
      await fetch(`http://localhost:8080/games/${id}`, {
        method: 'DELETE'
      });
  
      console.log('Game deleted');
      // You might want to update your games state here
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };
  
  // PLAYER FUNCTIONS

  const fetchPlayerById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/players/${id}`);
      const player = await response.json();
      console.log('Fetched player by ID:', player);
      // You may set this to state or pass it to a component for display
    } catch (error) {
      console.error('Error fetching player by ID:', error);
    }
  };

  
  const fetchPlayerGames = async (playerId) => {
    try {
        const response = await fetch(`http://localhost:8080/players/${playerId}/games`);
        const games = await response.json();
        console.log('Fetched games for player:', games);

        // Update the playersGames state with the games data
        setPlayersGames(prevState => ({
            ...prevState,
            [playerId]: games
        }));
        
    } catch (error) {
        console.error('Error fetching games for player:', error);
    }
};

  
  const createPlayer = async (playerData) => {
    try {
      const response = await fetch('http://localhost:8080/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playerData)
      });
  
      const newPlayer = await response.json();
      console.log('Player created:', newPlayer);
      // You might want to update your players state here
    } catch (error) {
      console.error('Error creating player:', error);
    }
  };

  
  const playerJoinGame = async (playerId, gameId) => {
    try {
      await fetch(`http://localhost:8080/players/${playerId}/joinGame/${gameId}`, {
        method: 'PUT'
      });
  
      console.log('Player joined the game');
      // You might want to update your games and players state here
    } catch (error) {
      console.error('Error while player joining the game:', error);
    }
  };

  const setCompletedStatus = async (playerId, gameId) => {
    try {
      await fetch(`http://localhost:8080/players/${playerId}/setCompletedStatus/${gameId}`, {
        method: 'PATCH'
      });
  
      console.log('Game completed status changed');
      // You might want to update your games state here
    } catch (error) {
      console.error('Error changing game completed status:', error);
    }
  };

  const rateOtherPlayerAbility = async (ratingAbilityPlayerId, ratedAbilityPlayerId, abilityRating) => {
    try {
      await fetch(`http://localhost:8080/players/${ratingAbilityPlayerId}/rateOtherPlayerAbility/${ratedAbilityPlayerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ abilityRating })
      });
  
      console.log('Player ability rated');
      // You might want to update your players state here
    } catch (error) {
      console.error('Error rating player ability:', error);
    }
  };

  const rateOtherPlayerSeriousness = async (ratingSeriousnessPlayerId, ratedSeriousnessPlayerId, seriousnessRating) => {
    try {
      await fetch(`http://localhost:8080/players/${ratingSeriousnessPlayerId}/rateOtherPlayerSeriousness/${ratedSeriousnessPlayerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seriousnessRating })
      });
  
      console.log('Player seriousness rated');
      // You might want to update your players state here
    } catch (error) {
      console.error('Error rating player seriousness:', error);
    }
  };

  const deletePlayer = async (playerId) => {
    try {
      await fetch(`http://localhost:8080/players/${playerId}`, {
        method: 'DELETE'
      });
  
      console.log('Player deleted');
      // You might want to update your players state here
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  // GENERAL FUNCTIONS

  const handleLogin = (player) => {
    setLoggedPlayer(player);
  };
  
  const handleLogout = () => {
    setLoggedPlayer(null);
  };

  const handleHostGame = (game) => {
    setHostedGame(game);
  };

  const handleSelectPlayer = (player) => {
    setSelectedPlayer(player);
  };
  
  const handleSelectGame = (game) => {
    setSelectedGame(game);
  };
    
  // RENDERING

//   const renderPlayer = ({ item }) => {

//     if (!playersGames[item.id]) {
//       fetchPlayerGames(item.id);
//     }
// return (
//     <View>
//       <Text>userName: {item.userName}</Text>
//       <Text>displayedAbilityLevel: {item.displayedAbilityLevel}</Text>
//       <Text>displayedSeriousnessLevel: {item.displayedSeriousnessLevel}</Text>

//       {playersGames[item.id] && playersGames[item.id].map(game => (
//           <Text key={game.id}>Player: {game.name}</Text>
//       ))}
//     </View>
//       );
//   };


const renderPlayer = ({ item }) => {
  if (!playersGames[item.id]) {
    fetchPlayerGames(item.id);
  }

  const selectedPlayerStyle = selectedPlayer && selectedPlayer.id === item.id ? { backgroundColor: 'lightgrey' } : {};

  return (
    <TouchableOpacity onPress={() => handleSelectPlayer(item)} style={selectedPlayerStyle}>
      <View>
        <Text>userName: {item.userName}</Text>
        <Text>displayedAbilityLevel: {item.displayedAbilityLevel}</Text>
        <Text>displayedSeriousnessLevel: {item.displayedSeriousnessLevel}</Text>
        {playersGames[item.id] && playersGames[item.id].map(game => (
            <Text key={game.id}>Player: {game.name}</Text>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const renderLoggedPlayer = ({ item }) => {

  const loggedPlayerStyle = loggedPlayer && loggedPlayer.id === item.id ? { backgroundColor: 'green' } : {};

  return (
    <TouchableOpacity onPress={() => handleLogin(item)} style={loggedPlayerStyle}>
    <View>
      <Text>userName: {item.userName}</Text>
    </View>
  </TouchableOpacity>
  )

}

const renderGame = ({ item }) => {
  const { propertyNumberOrName, street, city, country, postCode } = item.address;
  const addressString = `${propertyNumberOrName || 'N/A'}, ${street || 'N/A'}, ${city || 'N/A'}, ${country || 'N/A'}, ${postCode || 'N/A'}`;

  // Fetch players for this game if not already fetched
  if (!gamePlayers[item.id]) {
    fetchGamesPlayers(item.id);
  }

  return (
    <View>
      <Text>Name: {item.name}</Text>
      <Text>Duration: {item.duration}</Text>
      <Text>Address: {addressString}</Text>

      {/* Display players if they are fetched */}
      {gamePlayers[item.id] && gamePlayers[item.id].map(player => (
        <Text key={player.id}>Player: {player.userName}</Text>
      ))}
    </View>
  );
};

const handleCreateGame = () => {
  // You can change these values or get them from user input
  createGame(
    472, // creatorId
    'New Game', // name
    471,
    '2023-06-12T15:30:00Z', // dateAndTime
    120, // duration
    3, // recommendedAbilityLevel
    2, // recommendedSeriousnessLevel
    3, // actualAbilityLevel
    2, // actualSeriousnessLevel
    false, // completedStatus
    10 // maxPlayers
  );
};

  return (
    <View style={{ flex: 1, margin: 10 }}>
        <FlatList
            data={players}
            renderItem={renderLoggedPlayer}
            keyExtractor={(item) => item.id.toString()}
        />
        <FlatList
            data={players}
            renderItem={renderPlayer}
            keyExtractor={(item) => item.id.toString()}
        />   
        <FlatList
          data={games}
          renderItem={renderGame}
          keyExtractor={(item) => item.id.toString()}
        />
        <Button
          title="Create New Game"
          onPress={handleCreateGame}
        />
    </View>
  );
};

export default Container;
