export const getPlayers = () => {
  return fetch("http://localhost:8080/players")
  .then((res) => res.json())
}

export const getPlayersById = (id) => {
  return fetch(`http://localhost:8080/players/${id}`).then((res => res.json));
}

export const getPlayerGames = (playerId) => {
  return fetch(`http://localhost:8080/players/${playerId}/games`).then((res) => res.json())
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
    method: "PATCH",
    body: JSON.stringify(updatedData),
    headers: { "Content-Type": "application/json"},
  })
  .then(res => res.json())
}

export const playerJoinGame = (playerId, gameId, updatedData) => {
  return fetch(`http://localhost:8080/players/${playerId}/joinGame/${gameId}`, {
    method: "PATCH",
    body: JSON.stringify(updatedData),
    headers: { "Content-Type": "application/json"},
  })
  .then(res => res.text())
}

export const playerSetGameCompletedStatus = (playerId, gameId) => {
  return fetch(`http://localhost:8080/players/${playerId}/setCompletedStatus/${gameId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json"},
  })
  .then(res => res.json())
}

// export const rateOtherPlayerAbility = (ratingAbilityPlayerId, ratedAbilityPlayerId, abilityRating) => {
//   return fetch(`http://localhost:8080/players/${ratingAbilityPlayerId}/rateOtherPlayerAbility/${ratedAbilityPlayerId}?abilityRating=${abilityRating}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//   })
//   .then(res => res.json());
// }

// export const rateOtherPlayerAbility = (ratingAbilityPlayerId, ratedAbilityPlayerId, abilityRating) => {
//   return fetch(`http://localhost:8080/players/${ratingAbilityPlayerId}/rateOtherPlayerAbility/${ratedAbilityPlayerId}?abilityRating=${abilityRating}`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//   })
//   .then(response => {
//     // Log the raw response text to see what's actually being returned
//     return response.text().then(text => {
//       console.log('Raw response:', text);

//       // Now, attempt to parse the response as JSON and proceed
//       try {
//         return JSON.parse(text);
//       } catch (error) {
//         console.error('Failed to parse response as JSON:', error);
//         // Optionally, you could reject the promise here if parsing fails.
//         // return Promise.reject('Failed to parse response as JSON');
//       }
//     });
//   });
// }

export const rateOtherPlayerAbility = (ratingAbilityPlayerId, ratedAbilityPlayerId, abilityRating) => {
  return fetch(`http://localhost:8080/players/${ratingAbilityPlayerId}/rateOtherPlayerAbility/${ratedAbilityPlayerId}?abilityRating=${abilityRating}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  })
  .then(response => {
    // Check if the response status is OK (200), and parse as JSON.
    if (response.ok) {
      return response.json();
    } else {
      // If the server responded with an error, reject the promise.
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
  .then(res => res.json())
}
