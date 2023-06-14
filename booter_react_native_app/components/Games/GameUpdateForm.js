import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import * as GameServices from '../../services/GameServices';

// const GameUpdateForm = ({ game, handleUpdateGame, onCancel, handleEdit }) => {
//   const [name, setName] = useState(game.name);
//   const [dateAndTime, setDateAndTime] = useState(game.dateAndTime);
//   const [duration, setDuration] = useState(game.duration);
//   const [maxPlayers, setMaxPlayers] = useState(game.maxPlayers);

//   const UpdateGame = () => {
//     const updatedData = {
//       name,
//       dateAndTime,
//       duration,
//       maxPlayers,
//     };

//     GameServices.updateGame(game.id, updatedData)
//       .then(() => {
//         handleUpdateGame(); 
//       })
//       .catch((error) => {
//       });
//   };

//   return (
//     <View>
//       <Text>Edit Game</Text>
//       <Text>Name:</Text>
//       <TextInput value={name} onChangeText={setName} />
//       <Text>Date and Time:</Text>
//       <TextInput value={dateAndTime} onChangeText={setDateAndTime} />
//       <Text>Duration:</Text>
//       <TextInput value={String(duration)} onChangeText={text => setDuration(Number(text))} />
//       <Text>Max Players:</Text>
//       <TextInput value={String(maxPlayers)} onChangeText={text => setMaxPlayers(Number(text))} />
//       <Button title="Save" onPress={UpdateGame} />
//       <Button title="Cancel" onPress={onCancel} />
//     </View>
//   );
// };

// export default GameUpdateForm;

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

    // Call handleUpdateGame passed from GameElement component with the updated data
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
      <Button title="Save" onPress={updateGame} />
      {/* <Button title="Cancel" onPress={onCancel} /> */}
    </View>
  );
};

export default GameUpdateForm;