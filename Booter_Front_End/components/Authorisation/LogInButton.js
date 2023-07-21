import React, { useEffect } from 'react';
import { useAuth0 } from 'react-native-auth0';
import { Button, Text } from 'react-native';
import * as PlayerServices from "../../services/PlayerServices";

const LogInButton = ({ setAuth0Id, setLoggedPlayer }) => {
  const { authorize, user } = useAuth0();

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

  const handleAuthorize = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetUser = () => {
    setAuth0Id(user?.sub || null);
    if(user?.sub){
      fetchPlayerByAuth0Id(user.sub);
    }
  };

  return (
    <>
      <Button onPress={handleAuthorize} title="Log in" />
      <Button onPress={handleSetUser} title="Set User Data" />
    </>
  );
}

export default LogInButton;

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