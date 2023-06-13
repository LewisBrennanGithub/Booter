export const getPlayers = () => {
  return fetch("http://localhost:8080/players")
  .then((res) => res.json())
}

export const getPlayersById = (id) => {
  return fetch(`http://localhost:8080/players/${id}`).then((res => res.json));
}

export const getPlayerGames = (playerId) => {
  return fetch(`http://localhost8080/players/${playerId}/players`).then((res) => res.json())
}

export const postPlayer = (playerData) => {
  return fetch('http://localhost:8080/players', {
    method: 'POST',
    body: JSON.stringify(playerData),
    headers: { 'Content-Type': 'application.json' },
  })
  .then((res) => res.json())
  .then((data) => {
    return {
      ...data,
      ...playerData,
    };
  });
};

export const updatePlayer = (id, updatedData) => {
  return fetch(`http://localhost:8080/players/${id}`, {
    // CONSIDER PATCH?
    method: "PUT",
    body: JSON.stringify(updatedData),
    headers: { "Content-Type": "application/json"},
  })
  .then(res => res.json())
}

export const playerJoinGame = (playerId, gameId, updatedData) => {
  return fetch(`http://localhost:8080/players/${playerId}/games/${gameId}`, {
    // CONSIDER PATCH?
    method: "PUT",
    body: JSON.stringify(updatedData)
    headers: { "Content-Type": "application/json"},
  })
  .then(res => res.json())
}

export const deletePlayer = (id) => {
  return fetch(`http://localhost:8080/players/${id}`, {
    method: "DELETE",
  })
  .then(res => res.json())
}
