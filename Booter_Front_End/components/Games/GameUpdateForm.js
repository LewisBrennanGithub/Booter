import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import * as GameServices from '../../services/GameServices';
import { styles } from '../../containers/AppStyles';
import AddressUpdateForm from '../Addresses/AdressUpdateForm';

const GameUpdateForm = ({ 
  setLoggedPlayer,
  game, 
  address,
  handleUpdateGame, 
  onCancel,
  handleUpdateAddress 
}) => {
  const [name, setName] = useState(game.name);
  const [dateAndTime, setDateAndTime] = useState(game.dateAndTime);
  const [duration, setDuration] = useState(game.duration);
  const [maxPlayers, setMaxPlayers] = useState(game.maxPlayers);

  const updateGame = () => {
    const updatedData = {
      name,
      dateAndTime,
      duration,
      maxPlayers,
    };

    handleUpdateGame(updatedData);
  };

  return (
    <View>
      <Text>Edit Game</Text>
      <Text>Name:</Text>
      <TextInput value={name} onChangeText={setName} />
      <Text>Date and Time:</Text>
      <TextInput value={dateAndTime} onChangeText={setDateAndTime} />
      <Text>Duration:</Text>
      <TextInput value={String(duration)} onChangeText={text => setDuration(Number(text))} />
      <Text>Max Players:</Text>
      <TextInput value={String(maxPlayers)} onChangeText={text => setMaxPlayers(Number(text))} />
      <AddressUpdateForm 
        address={game.address} 
        onUpdate={handleUpdateAddress} 
        setLoggedPlayer={setLoggedPlayer}
        // onSuccess={toggleEditAddressFalse}
        // fetchAllPlayers={fetchAllPlayers}
        // fetchAllAddresses={fetchAllAddresses}
        // setLoggedPlayer={setLoggedPlayer} // remember to change this prop if you need to change anything regarding loggedPlayer within the update form.
      />
      <TouchableOpacity style={styles.buttonStyle} onPress={updateGame}>
  <Text style={styles.whiteText}>Save</Text>
</TouchableOpacity>

    </View>
  );
};

export default GameUpdateForm;