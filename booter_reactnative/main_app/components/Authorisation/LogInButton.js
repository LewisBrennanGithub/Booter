import React, { useEffect, useState } from 'react';
import { useAuth0 } from 'react-native-auth0';
import { TouchableOpacity, Text } from 'react-native';
import * as PlayerServices from "../../services/PlayerServices";
import { appStyles } from '../../containers/AppStyles';

const LogInButton = ({ setAuth0Id, setLoggedPlayer }) => {
  const { authorize, user } = useAuth0();
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    if (shouldFetch) {
      setAuth0Id(user?.sub || null);
      if(user?.sub){
        fetchPlayerByAuth0Id(user.sub);
      }
      setShouldFetch(false);  
    }
  }, [shouldFetch]); 
  
  const handleAuthorize = async () => {
    try {
      await authorize();
      setShouldFetch(true);  
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
    <TouchableOpacity style={appStyles.buttonColor} onPress={handleAuthorize} >
      <Text style={appStyles.buttonColorText}>Log In</Text>
    </TouchableOpacity>
  );
}

export default LogInButton;