import React from 'react';
import { Button, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

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

  return <Button title="Login with Auth0" disabled={!request} onPress={() => promptAsync({ useProxy: false })} />;
};

export default Auth;
