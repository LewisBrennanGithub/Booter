// import React, { useEffect } from 'react';
// import { useAuth0 } from 'react-native-auth0';
// import { Button, Text } from 'react-native';
// import * as PlayerServices from "../../services/PlayerServices";

// const LogInButton = ({ setAuth0Id, setLoggedPlayer }) => {
//   const { authorize, user } = useAuth0();
//   const [booleanFlag, setBooleanFlag] = useState(false);

//   useEffect(() => {
//     setAuth0Id(user?.sub || null);
//     fetchPlayerByAuth0Id(user.sub);
//   }, [booleanFlag]);

//   const fetchPlayerByAuth0Id = async (id) => {
//     if(id){
//       try{
//         const data = await PlayerServices.getPlayerByAuth0Id(id);
//         setLoggedPlayer(data);
//       }catch(error){
//         console.log("Error fetching player: ", error);
//       }
//     }
//   }

//   const handleAuthorize = async () => {
//     try {
//       await authorize();
//       setBooleanFlag(true); 
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const handleSetUser = () => {
//     setAuth0Id(user?.sub || null);
//     if(user?.sub){
//       fetchPlayerByAuth0Id(user.sub);
//     }
//   };

//   return (
//     <>
//       <Button onPress={handleAuthorize} title="Log in" />
//       <Button onPress={handleSetUser} title="Set User Data" />
//     </>
//   );
// }

// export default LogInButton;

// const LogInButton = ({ setAuth0Id, setLoggedPlayer }) => {
//   const { authorize, user } = useAuth0();

//   const fetchPlayerByAuth0Id = (id) => {
//     PlayerServices.getPlayerByAuth0Id(id).then(data => {setLoggedPlayer(data)
//     });
//   }

//   useEffect(() => {
//     setAuth0Id(user?.sub || null);
//     fetchPlayerByAuth0Id(user.sub);
//   }, [user?.sub]);

//   useEffect(() => {
//     setAuth0Id(user?.sub || null);
//     const fetchData = async () => {
//       if (user?.sub){
//         await fetchPlayerByAuth0Id(user.sub);
//       }
//     };
//     fetchData();
//   }, [user?.sub]);

//   const handleAuthorize = async () => {
//     try {
//       await authorize();
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return (
//     <>
//       <Button onPress={handleAuthorize} title="Log in" />
//     </>
//   );
// }

// export default LogInButton;

// const LogInButton = ({ setAuth0Id, setLoggedPlayer }) => {
//   const { authorize, user } = useAuth0();

//   const fetchPlayerByAuth0Id = async (id) => {
//     if(id){
//       try{
//         const data = await PlayerServices.getPlayerByAuth0Id(id);
//         setLoggedPlayer(data);
//       }catch(error){
//         console.log("Error fetching player: ", error);
//       }
//     }
//   }

//   useEffect(() => {
//     setAuth0Id(user?.sub || null);
//     if(user?.sub){
//       fetchPlayerByAuth0Id(user.sub);
//     }
//   }, [user?.sub]);

//   const handleAuthorize = async () => {
//     try {
//       await authorize();
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return (
//     <>
//       <Button onPress={handleAuthorize} title="Log in" />
//     </>
//   );
// }

// export default LogInButton;

// const LogInButton = ({ auth0Id, setAuth0Id, setLoggedPlayer }) => {
//   const { authorize, user } = useAuth0();

//   useEffect(() => {
//     const updateAuth0IdAndFetchPlayer = async () => {
//       setAuth0Id(user?.sub || null);
        
//       if (user?.sub) {
//         try {
//           const player = await PlayerServices.getPlayerByAuth0Id(user.sub);
//           setLoggedPlayer(player);
//         } catch (e) {
//           console.log(e);
//         }
//       }
//     };
      
//     updateAuth0IdAndFetchPlayer();
//   }, [user]);

//   const handleAuthorize = async () => {
//     try {
//       const { sub: userId } = await authorize({scope: 'openid profile email'});
//       console.log(userId);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return (
//     <>
//       <Text>{`Auth0 State: ${auth0Id ? auth0Id : 'Not logged in'}`}</Text>
//       <Button onPress={handleAuthorize} title="Log in" />
//     </>
//   );
// }

// export default LogInButton;

// --2

// const LogInButton = ({ auth0Id, setAuth0Id, setLoggedPlayer }) => {
//   const { authorize, user } = useAuth0();

//   const fetchPlayerByAuth0Id = () => {
//     PlayerServices.getPlayerByAuth0Id(auth0Id).then(data => { setLoggedPlayer(data)});
//   }

//   useEffect(() => {
//     setAuth0Id(user?.sub || null);
//   }, [user]);

//   const handleAuthorize = async () => {
//     try {
//       const { sub: userId } = await authorize({scope: 'openid profile email'});
//       fetchPlayerByAuth0Id(userId);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return (
//     <>
//       <Text>{`Auth0 State: ${auth0Id ? auth0Id : 'Not logged in'}`}</Text>
//       <Button onPress={handleAuthorize} title="Log in" />
//     </>
//   );
// }

// export default LogInButton;
