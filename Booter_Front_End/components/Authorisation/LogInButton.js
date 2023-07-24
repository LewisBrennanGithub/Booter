import React, { useEffect, useState } from 'react';
import { useAuth0 } from 'react-native-auth0';
import { Button, Text } from 'react-native';
import * as PlayerServices from "../../services/PlayerServices";

const LogInButton = ({ setAuth0Id, setLoggedPlayer }) => {
  const { authorize, user } = useAuth0();
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    if (shouldFetch) {
      setAuth0Id(user?.sub || null);
      if(user?.sub){
        fetchPlayerByAuth0Id(user.sub);
      }
      setShouldFetch(false);  // reset the flag after done fetching
    }
  }, [shouldFetch]);  // watch for changes in `shouldFetch` and `user?.sub`
  
  const handleAuthorize = async () => {
    try {
      await authorize();
      setShouldFetch(true);  // raise the flag after authorization
    } catch (e) {
      console.log(e);
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

  return (
    <>
      <Button onPress={handleAuthorize} title="Log in" />
    </>
  );
}

export default LogInButton;