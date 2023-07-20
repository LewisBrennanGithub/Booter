<script src="http://localhost:8097"></script>
import React, { useEffect } from 'react';
import { useAuth0 } from 'react-native-auth0';
import { Button, Text } from 'react-native';

const LogInButton = ({ auth0Id, setAuth0Id }) => {
  const { authorize, user } = useAuth0();

  useEffect(() => {
    setAuth0Id(user?.sub || null);
  }, [user]);

  const handleAuthorize = async () => {
    try {
      const { sub: userId } = await authorize({scope: 'openid profile email'});
      console.log(userId);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Text>{`Auth0 State: ${auth0Id ? auth0Id : 'Not logged in'}`}</Text>
      <Button onPress={handleAuthorize} title="Log in" />
    </>
  );
}

export default LogInButton;
