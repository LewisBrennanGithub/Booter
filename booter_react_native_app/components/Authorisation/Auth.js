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
          setIsLoggedIn(true);
        })
        .catch(error => console.log(error));
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
          onPress={() => promptAsync({ prompt: 'login' })} // Added prompt: 'login'
        />
      ) : (
        <View>
          <Text>You are logged in!</Text>
          <Button title="Logout" onPress={logout} />
        </View>
      )}
    </View>
  );
};

export default Auth;
