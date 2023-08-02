import React, { useEffect } from 'react';
import { Button, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const Auth = () => {
  const auth0ClientId = '2mBqbkMQU2KUcCeahRAbRKEFvIFQVULq';
  const auth0Domain = 'dev-jbsvjbwih2gygs04.uk.auth0.com';

  const redirectUri = AuthSession.makeRedirectUri({
    native: 'booterapp://auth',
    useProxy: true, // set this to true
  });

  const discovery = AuthSession.useAutoDiscovery(`https://${auth0Domain}`);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: auth0ClientId,
      redirectUri,
      scopes: ['openid', 'profile'],
    },
    discovery
  );
  
  useEffect(() => {
    if (response) {
        console.log(response);
    }
}, [response]);

// useEffect(() => {
//   if (response?.type === 'success') {
//     const { code } = response.params;

//     // Exchange code for tokens
//     fetch(`https://${auth0Domain}/oauth/token`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         grant_type: 'authorization_code',
//         client_id: auth0ClientId,
//         code,
//         redirect_uri: redirectUri,
//       }),
//     })
//       .then(response => response.json())
//       .then(tokenResponse => {
//         console.log('Token response:', tokenResponse);
//       })
//       .catch(error => console.log(error));
//   }
// }, [response]);

  return <Button title="Login with Auth0" disabled={!request} onPress={() => promptAsync()} />;
};

export default Auth;
