// import { createStackNavigator } from '@react-navigation/stack';
// const Stack = createStackNavigator();


// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// const TopTab = createMaterialTopTabNavigator();
// const TopTabNavigator = () => (
//     <TopTab.Navigator>
//       <TopTab.Screen
//         name="GamesScreen"
//         options={{ title: 'Games' }}
//         children={(props) => (
//           <GamesScreen
//             {...props}
//             players={players}
//             games={games}
//             handleDeleteGame={handleDeleteGame}
//             handleJoinGame={handleJoinGame}
//             handleUpdateGame={handleUpdateGame}
//             loggedPlayer={loggedPlayer}
//             handleSetGameCompletedStatus={handleSetGameCompletedStatus}
//           />
//         )}
//       />
//       <TopTab.Screen
//         name="PlayersScreen"
//         options={{ title: 'Players' }}
//         children={(props) => (
//           <PlayersScreen
//             {...props}
//             players={players}
//             loggedPlayer={loggedPlayer}
//             setLoggedPlayer={setLoggedPlayer}
//             handleRatePlayerAbility={handleRatePlayerAbility}
//             handleRatePlayerSeriousness={handleRatePlayerSeriousness}
//           />
//         )}
//       />
//       <TopTab.Screen
//         name="AddContentScreen"
//         options={{ title: 'Add Content' }}
//         children={(props) => (
//           <AddContentScreen
//             {...props}
//             addresses={addresses}
//             handleAddPlayer={handleAddPlayer}
//             handleAddGame={handleAddGame}
//             handleAddAddress={handleAddAddress}
//             loggedPlayer={loggedPlayer}
//           />
//         )}
//       />
//     </TopTab.Navigator>
//   );

// return (
//   <View>
//   <Text>
//     {`Booter - Logged in as: ${loggedPlayer ? loggedPlayer.userName : 'Guest'}`}
//   </Text>
//   {/* <TopTabNavigator /> */}
//   <BottomTabNavigator />
// </View>
// );