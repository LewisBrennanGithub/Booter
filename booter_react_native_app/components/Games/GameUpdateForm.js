import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as GameServices from '../../services/GameServices';

const GameUpdateForm = ({ game, handleUpdateGame, onCancel }) => {
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
    <View style={styles.cardContainer}>
      <Text style={styles.heading}>Edit Game</Text>
      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Date and Time:</Text>
      <TextInput style={styles.input} value={dateAndTime} onChangeText={setDateAndTime} />
      <Text style={styles.label}>Duration:</Text>
      <TextInput style={styles.input} value={String(duration)} onChangeText={text => setDuration(Number(text))} />
      <Text style={styles.label}>Max Players:</Text>
      <TextInput style={styles.input} value={String(maxPlayers)} onChangeText={text => setMaxPlayers(Number(text))} />
      <TouchableOpacity style={styles.button} onPress={updateGame}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#783c08',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default GameUpdateForm;
