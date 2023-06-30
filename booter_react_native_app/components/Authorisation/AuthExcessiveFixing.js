import React, { useEffect, useState } from 'react';
import { Button, Platform, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

const Auth = ({ onLogin }) => {
  const auth0ClientId = '2mBqbkMQU2KUcCeahRAbRKEFvIFQVULq';
  const auth0Domain = 'dev-jbsvjbwih2gygs04.uk.auth0.com';

  const [codeVerifier, setCodeVerifier] = useState(null);

  const redirectUri = AuthSession.makeRedirectUri({
    native: 'http://localhost:19006',
    useProxy: Platform.OS !== 'web',
  });

  const discovery = AuthSession.useAutoDiscovery(`https://${auth0Domain}`);
  
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: auth0ClientId,
      redirectUri,
      scopes: ['openid', 'profile'],
      responseType: 'code',
      // codeChallenge and codeChallengeMethod will be set in useEffect
    },
    discovery
  );

  useEffect(() => {
    (async () => {
      const verifier = generateCodeVerifier();
      const challenge = await generateCodeChallenge(verifier);
      setCodeVerifier(verifier);
  
      // Check if request is not null before setting properties
      if (request) {
        request.codeChallenge = challenge;
        request.codeChallengeMethod = 'S256';
      } else {
        console.log("Request is null");
      }
    })();
  }, [request]); 


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
          code_verifier: codeVerifier,
          redirect_uri: redirectUri,
        }),
      })
      .then(response => {
        if (!response.ok) {
            // Log the response text for more details
            return response.text().then(text => {
                console.error('Response text:', text);
                throw new Error('Network response was not ok');
            });
        }
        return response.json();
    })
        .then(tokenResponse => {
          return fetch(`https://${auth0Domain}/userinfo`, {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          });
        })
        .then(response => response.json())
        .then(data => {
          onLogin(data.sub);
        })
        .catch(error => console.log(error));
    }
  }, [response]);


  const generateCodeVerifier = () => {
    const array = new Uint32Array(56);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
  };

  const generateCodeChallenge = async (verifier) => {
    const data = new TextEncoder().encode(verifier);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const variables = Array.from(new Uint8Array(hash));
    const output = variables.map(v => ('0' + v.toString(16)).substr(-2)).join('');
    return btoa(output).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };

  return (
    <Button
      title="Login with Auth0"
      disabled={!codeVerifier || !request}
      onPress={() => {
        promptAsync({ useProxy: false });
      }}
    />
  );
};

export default Auth;
