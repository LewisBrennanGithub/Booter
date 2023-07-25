import React, { useState, useEffect } from 'react';
import Auth0 from 'react-native-auth0';
import * as PlayerServices from "../services/PlayerServices";
import { AuthContext } from './AuthContext';

const auth0 = new Auth0({
  domain: 'dev-jbsvjbwih2gygs04.uk.auth0.com',
  clientId: 'rPScIrLIXAkRbZtUgbdvDsarHIetMx2g',
});

export const AuthProvider = ({ children }) => {
  const [loggedPlayer, setLoggedPlayer] = useState(null);
  const [auth0Id, setAuth0Id] = useState(null);

  useEffect(() => {
    checkAuthSession();
  }, []);

  const checkAuthSession = async () => {
    try {
      const authResult = await auth0.webAuth.authorize({scope: 'openid profile email'});
      const { idToken } = authResult;
      const decoded = jwt_decode(idToken);
      const auth0Id = decoded.sub;
      setAuth0Id(auth0Id);
      fetchPlayerByAuth0Id(auth0Id);
    } catch (error) {
      console.log("No active session:", error);
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
    <AuthContext.Provider value={{ loggedPlayer, auth0Id }}>
      {children}
    </AuthContext.Provider>
  );
};
