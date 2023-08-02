package com.booter.controller;

import com.booter.models.Address;
import com.booter.models.Game;
import com.booter.models.Player;
import com.booter.repository.GameRepository;
import com.booter.repository.PlayerRepository;
import com.booter.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class PlayerController {

    @Autowired
    PlayerRepository playerRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private AddressRepository addressRepository;

    @GetMapping(value = "/players")
    public ResponseEntity<List<Player>> getAllPlayers(){
        return new ResponseEntity<>(playerRepository.findAll(Sort.by("id")), HttpStatus.OK);
    }

    @GetMapping(value = "/players/id/{id}")
    public ResponseEntity getPlayer(@PathVariable Long id){
        return new ResponseEntity<>(playerRepository.findById(id), HttpStatus.OK);
    }

    @GetMapping(value = "/players/{auth0Id}")
    public ResponseEntity<Player> getPlayerByAuth0Id(@PathVariable String auth0Id){
        Player player = playerRepository.findByAuth0Id(auth0Id);
        if(player == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(player, HttpStatus.OK);
    }

    @GetMapping(value = "/players/{playerId}/games")
    public ResponseEntity<List<Game>> getPlayerGames(@PathVariable Long playerId) {
        Optional<Player> playerOptional = playerRepository.findById(playerId);
        if (!playerOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Player player = playerOptional.get();
        List<Game> games = player.getGames();
        return new ResponseEntity<>(games, HttpStatus.OK);
    }

    @PostMapping(value = "/players")
    public ResponseEntity<Player> postPlayer(@RequestBody Player player){
        Player existingPlayer = playerRepository.findByAuth0Id(player.getAuth0Id());
        if (existingPlayer != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        playerRepository.save(player);
        return new ResponseEntity<>(player, HttpStatus.CREATED);
    }

    @PatchMapping(value = "/players/{id}")
    public ResponseEntity<?> updatePlayer(@PathVariable Long id, @RequestBody Player player) {
        Optional<Player> playerOptional = playerRepository.findById(id);
        if (!playerOptional.isPresent()) {
            return new ResponseEntity<>(Collections.singletonMap("message", "Player not found"), HttpStatus.NOT_FOUND);
        }
        Player existingPlayer = playerOptional.get();
        if (player.getAddress() != null) {
            Optional<Address> addressOptional = addressRepository.findById(player.getAddress().getId());
            if (!addressOptional.isPresent()) {
                return new ResponseEntity<>(Collections.singletonMap("message", "Address not found"), HttpStatus.NOT_FOUND);
            }
            existingPlayer.setAddress(addressOptional.get());
        }
        existingPlayer.setFirstName(player.getFirstName());
        existingPlayer.setLastName(player.getLastName());
        existingPlayer.setUserName(player.getUserName());
        existingPlayer.setPhoneNumber(player.getPhoneNumber());
        existingPlayer.setAge(player.getAge());
        existingPlayer.setSelfAssessedAbilityLevel(player.getSelfAssessedAbilityLevel());
        existingPlayer.setSelfAssessedSeriousnessLevel(player.getSelfAssessedSeriousnessLevel());
        playerRepository.save(existingPlayer);
        return new ResponseEntity<>(existingPlayer, HttpStatus.OK);
    }

    @PatchMapping("/players/{playerId}/joinGame/{gameId}")
    public ResponseEntity<?> joinGame(@PathVariable Long playerId, @PathVariable Long gameId) {
        Optional<Player> playerOptional = playerRepository.findById(playerId);
        Optional<Game> gameOptional = gameRepository.findById(gameId);
        Player player = playerOptional.get();
        Game game = gameOptional.get();
        player.joinGame(game);
        playerRepository.save(player);
        gameRepository.save(game);
        return new ResponseEntity<>(Collections.singletonMap("message", "Player joined the game"), HttpStatus.OK);
    }

    @PatchMapping("/players/{playerId}/setCompletedStatus/{gameId}")
    public ResponseEntity<?> setCompletedStatus(@PathVariable Long playerId, @PathVariable Long gameId) {
        Optional<Player> playerOptional = playerRepository.findById(playerId);
        Optional<Game> gameOptional = gameRepository.findById(gameId);
        Player player = playerOptional.get();
        Game game = gameOptional.get();
        boolean currentStatus = game.getCompletedStatus();
        player.setCompletedStatus(game, !currentStatus);
        gameRepository.save(game);
        return new ResponseEntity<>(Collections.singletonMap("message", "Player has changed game completed status"), HttpStatus.OK);
    }

    @PatchMapping("/players/{ratingAbilityPlayerId}/rateOtherPlayerAbility/{ratedAbilityPlayerId}")
    public ResponseEntity<Map<String, String>> rateOtherPlayerAbility(
            @PathVariable Long ratingAbilityPlayerId,
            @PathVariable Long ratedAbilityPlayerId,
            @RequestParam double abilityRating) {
        Optional<Player> ratingAbilityPlayerOptional = playerRepository.findById(ratingAbilityPlayerId);
        Optional<Player> ratedAbilityPlayerOptional = playerRepository.findById(ratedAbilityPlayerId);
        if (!ratingAbilityPlayerOptional.isPresent() || !ratedAbilityPlayerOptional.isPresent()) {
            return new ResponseEntity<>(Collections.singletonMap("message", "Player not found"), HttpStatus.NOT_FOUND);
        }
        Player ratingAbilityPlayer = ratingAbilityPlayerOptional.get();
        Player ratedAbilityPlayer = ratedAbilityPlayerOptional.get();
        ratingAbilityPlayer.addCommunityAssessedAbilityRating(ratedAbilityPlayer, abilityRating);
        playerRepository.save(ratedAbilityPlayer);
        return new ResponseEntity<>(Collections.singletonMap("message", "Player has rated other player's ability"), HttpStatus.OK);
    }


    @PatchMapping("/players/{ratingSeriousnessPlayerId}/rateOtherPlayerSeriousness/{ratedSeriousnessPlayerId}")
    public ResponseEntity<Map<String, String>> rateOtherPlayerSeriousness(
            @PathVariable Long ratingSeriousnessPlayerId,
            @PathVariable Long ratedSeriousnessPlayerId,
            @RequestParam double seriousnessRating) {
        Optional<Player> ratingSeriousnessPlayerOptional = playerRepository.findById(ratingSeriousnessPlayerId);
        Optional<Player> ratedSeriousnessPlayerOptional = playerRepository.findById(ratedSeriousnessPlayerId);
        if (!ratingSeriousnessPlayerOptional.isPresent() || !ratedSeriousnessPlayerOptional.isPresent()) {
            return new ResponseEntity<>(Collections.singletonMap("message", "Player not found"), HttpStatus.NOT_FOUND);
        }
        Player ratingSeriousnessPlayer = ratingSeriousnessPlayerOptional.get();
        Player ratedSeriousnessPlayer = ratedSeriousnessPlayerOptional.get();
        ratingSeriousnessPlayer.addCommunityAssessedSeriousnessRating(ratedSeriousnessPlayer, seriousnessRating);
        playerRepository.save(ratedSeriousnessPlayer);
        return new ResponseEntity<>(Collections.singletonMap("message", "Player has rated other player's seriousness"), HttpStatus.OK);
    }

    @DeleteMapping("/players/{playerId}")
    public ResponseEntity<?> deletePlayer(@PathVariable Long playerId) {
        Optional<Player> playerOptional = playerRepository.findById(playerId);
        if (playerOptional.isPresent()) {
            Player player = playerOptional.get();
            List<Game> games = player.getGames();
            for (Game game : games) {
                game.removePlayer(player);
                gameRepository.save(game);
            }
            List<Game> createdGames = gameRepository.findByCreator(player);
            for (Game createdGame : createdGames) {
                List<Player> playersInGame = createdGame.getPlayers();
                if (!playersInGame.isEmpty()) {
                    for (Player newCreator : playersInGame) {
                        if (!newCreator.equals(player)) {
                            createdGame.setCreator(newCreator);
                            break;
                        }
                    }
                    gameRepository.save(createdGame);
                } else {
                    gameRepository.delete(createdGame);
                }
            }
            playerRepository.deleteById(playerId);
            return new ResponseEntity<>(Collections.singletonMap("message", "Player deleted"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Collections.singletonMap("message", "Player not found"), HttpStatus.NOT_FOUND);
        }
    }


}
