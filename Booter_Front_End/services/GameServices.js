export const getGames = () => {
  return fetch("http://localhost:8080/games").then((res) => res.json());
}

export const getGamesById = (id) => {
  return fetch(`http://localhost:8080/games/${id}`).then((res) => res.json());
};

export const getGamePlayers = (gameId) => {
  return fetch(`http://localhost:8080/games/${gameId}/players`).then((res) => res.json());
}

export const postGame = (gameData) => {
  return fetch('http://localhost:8080/games', {
    method: 'POST',
    body: JSON.stringify(gameData),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((data) => {
      return {
        ...data,
        ...gameData,
      };
    });
};

export const updateGame = (id, updatedData) => {
  return fetch(`http://localhost:8080/games/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedData),
    headers: { "Content-Type": "application/json"},
  })
  .then((res) => res.json());
}

export const deleteGame = (id) => {
  return fetch(`http://localhost:8080/games/${id}`, {
    method: "DELETE",
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
  });
}

