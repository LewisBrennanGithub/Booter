import React, { useState } from 'react';
import { Button } from 'react-native';
import * as AuthSession from 'expo-auth-session';

function Auth() {
  const [authState, setAuthState] = useState(null);

  const auth0ClientId = '2mBqbkMQU2KUcCeahRAbRKEFvIFQVULq';
  const auth0Domain = 'dev-jbsvjbwih2gygs04.uk.auth0.com';

  const discovery = {
    authorizationEndpoint: `https://${auth0Domain}/authorize`,
    tokenEndpoint: `https://${auth0Domain}/oauth/token`,
    revocationEndpoint: `https://${auth0Domain}/oauth/revoke`
  };

  const login = async () => {
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
    const result = await AuthSession.startAsync({
      clientId: auth0ClientId,
      redirectUri,
      scopes: ['openid', 'profile'],
      discovery
    });

    if (result.type === 'success') {
      setAuthState(result.params);
    }
  };

  return (
    <Button title="Login with Auth0" onPress={login} />
  );
}

export default Auth;
