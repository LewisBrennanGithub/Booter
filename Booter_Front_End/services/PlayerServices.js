export const getPlayers = () => {
  return fetch("http://localhost:8080/players")
  .then((res) => res.json());
}

// SHOULD REALLY BE PLAYER RATHER THAN PLAYERS! SHOULD ALSO BE CALLED PROPERLY, LIKE THE OTHERS
export const getPlayerById = (id) => {
  return fetch(`http://localhost:8080/players/${id}`).then((res) => res.json());
}

export const getPlayerByAuth0Id = (auth0Id) => {
  return fetch(`http://localhost:8080/players/${auth0Id}`).then((res) => res.json());
}

export const getPlayerGames = (playerId) => {
  return fetch(`http://localhost:8080/players/${playerId}/games`).then((res) => res.json());
}

export const postPlayer = (playerData) => {
  return fetch('http://localhost:8080/players', {
    method: 'POST',
    body: JSON.stringify(playerData),
    headers: { 'Content-Type': 'application/json' },
  })
  .then((res) => {
    if (!res.ok) {
      return res.json().then(err => {
        console.error('Server responded with an error:', err);
        throw new Error('Server error');
      });
    }
    return res.json();
  })
  .then((data) => {
    return {
      ...data,
      ...playerData,
    };
  });
};


export const updatePlayer = (id, updatedData) => {
  return fetch(`http://localhost:8080/players/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedData),
    headers: { "Content-Type": "application/json"},
  })
  .then(res => res.json());
}

export const playerJoinGame = (playerId, gameId, updatedData) => {
  return fetch(`http://localhost:8080/players/${playerId}/joinGame/${gameId}`, {
    method: "PATCH",
    body: JSON.stringify(updatedData),
    headers: { "Content-Type": "application/json"},
  })
  .then(res => res.text());
}

export const playerSetGameCompletedStatus = (playerId, gameId) => {
  return fetch(`http://localhost:8080/players/${playerId}/setCompletedStatus/${gameId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json"},
  })
  .then(res => res.json());
}

export const rateOtherPlayerAbility = (ratingAbilityPlayerId, ratedAbilityPlayerId, abilityRating) => {
  return fetch(`http://localhost:8080/players/${ratingAbilityPlayerId}/rateOtherPlayerAbility/${ratedAbilityPlayerId}?abilityRating=${abilityRating}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return response.text().then(text => Promise.reject(text));
    }
  });
}

export const rateOtherPlayerSeriousness = (ratingSeriousnessPlayerId, ratedSeriousnessPlayerId, seriousnessRating) => {
  return fetch(`http://localhost:8080/players/${ratingSeriousnessPlayerId}/rateOtherPlayerSeriousness/${ratedSeriousnessPlayerId}?seriousnessRating=${seriousnessRating}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  })
  .then(res => res.json());
}

export const deletePlayer = (id) => {
  return fetch(`http://localhost:8080/players/${id}`, {
    method: "DELETE",
  })
  .then(res => res.json());
}
