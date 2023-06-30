import React, { useEffect, useState } from 'react';
import { Button, Platform, View, Text } from 'react-native';
import * as AuthSession from 'expo-auth-session';

const Auth = () => {
  const auth0ClientId = '2mBqbkMQU2KUcCeahRAbRKEFvIFQVULq';
  const auth0Domain = 'dev-jbsvjbwih2gygs04.uk.auth0.com';

  const redirectUri = AuthSession.makeRedirectUri({
    native: 'booterapp://auth',
    useProxy: Platform.OS !== 'web',
  });

  console.log('Redirect URI:', redirectUri);

  const discovery = AuthSession.useAutoDiscovery(`https://${auth0Domain}`);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: auth0ClientId,
      redirectUri,
      scopes: ['openid', 'profile'],
    },
    discovery
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // <-- new state for holding user id

  useEffect(() => {
      if (response?.type === 'success') {
          const { code } = response.params;
  
          // Exchange code for tokens
          fetch(`https://${auth0Domain}/oauth/token`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  grant_type: 'authorization_code',
                  client_id: auth0ClientId,
                  code,
                  redirect_uri: redirectUri,
              }),
          })
          .then(response => response.json())
          .then(tokenResponse => {
              console.log('Token response:', tokenResponse);
  
              // set the userId if available in the tokenResponse
              if (tokenResponse && tokenResponse.id_token) {
                  const decodedToken = JSON.parse(atob(tokenResponse.id_token.split('.')[1]));
                  setUserId(decodedToken.sub); // <-- assuming user ID is stored in the 'sub' claim
              }
  
              setIsLoggedIn(true); // <-- set the logged in state to true
          })
          .catch(error => console.log(error));
      } else if (response?.type === 'error') {
        console.log('Authentication error:', response);
    }
  }, [response]);

  const logout = () => {
    WebBrowser.openBrowserAsync(`https://${auth0Domain}/v2/logout?client_id=${auth0ClientId}&returnTo=${encodeURIComponent(redirectUri)}`);
    setIsLoggedIn(false);
  };

  return (
    <View>
        {!isLoggedIn ? (
            <Button
                title="Login with Auth0"
                disabled={!request}
                onPress={() => promptAsync({ prompt: 'login' })}
            />
        ) : (
            <View>
                <Text>You are logged in!</Text>
                {userId && <Text>User ID: {userId}</Text>} {/* <-- Display User ID */}
                <Button title="Logout" onPress={logout} />
            </View>
        )}
    </View>
);
};

export default Auth;
