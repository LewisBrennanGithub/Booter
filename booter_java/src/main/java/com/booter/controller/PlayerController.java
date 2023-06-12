package com.booter.controller;

import com.booter.models.Address;
import com.booter.models.Game;
import com.booter.models.Player;
import com.booter.repository.GameRepository;
import com.booter.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
public class PlayerController {

    @Autowired
    PlayerRepository playerRepository;

    @Autowired
    private GameRepository gameRepository;

    @GetMapping(value = "/players")
    public ResponseEntity<List<Player>> getAllPlayers(){
        return new ResponseEntity<>(playerRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/players/{id}")
    public ResponseEntity getPlayer(@PathVariable Long id){
        return new ResponseEntity<>(playerRepository.findById(id), HttpStatus.OK);
    }

    @GetMapping("/players/{playerId}/games")
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
        playerRepository.save(player);
        return new ResponseEntity<>(player, HttpStatus.CREATED);
    }

    @PutMapping("/players/{playerId}/joinGame/{gameId}")
    public ResponseEntity<?> joinGame(@PathVariable Long playerId, @PathVariable Long gameId) {
        Optional<Player> playerOptional = playerRepository.findById(playerId);
        Optional<Game> gameOptional = gameRepository.findById(gameId);
        Player player = playerOptional.get();
        Game game = gameOptional.get();
        player.joinGame(game);
        playerRepository.save(player);
        gameRepository.save(game);
        return new ResponseEntity<>("Player joined the game", HttpStatus.OK);
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
        return new ResponseEntity<>("Player has changed game completed status", HttpStatus.OK);
    }

    @PutMapping("/players/{ratingAbilityPlayerId}/rateOtherPlayerAbility/{ratedAbilityPlayerId}")
    public ResponseEntity<?> rateOtherPlayerAbility(
            @PathVariable Long ratingAbilityPlayerId,
            @PathVariable Long ratedAbilityPlayerId,
            @RequestParam double abilityRating) {
        Optional<Player> ratingAbilityPlayerOptional = playerRepository.findById(ratingAbilityPlayerId);
        Optional<Player> ratedAbilityPlayerOptional = playerRepository.findById(ratedAbilityPlayerId);
        Player ratingAbilityPlayer = ratingAbilityPlayerOptional.get();
        Player ratedAbilityPlayer = ratedAbilityPlayerOptional.get();
        ratingAbilityPlayer.addCommunityAssessedAbilityRating(ratedAbilityPlayer, abilityRating);
        playerRepository.save(ratedAbilityPlayer);
        return new ResponseEntity<>("Player has rated other player's ability", HttpStatus.OK);
    }

    @PutMapping("/players/{ratingSeriousnessPlayerId}/rateOtherPlayerSeriousness/{ratedSeriousnessPlayerId}")
    public ResponseEntity<?> rateOtherPlayerSeriousness(
            @PathVariable Long ratingSeriousnessPlayerId,
            @PathVariable Long ratedSeriousnessPlayerId,
            @RequestParam double seriousnessRating) {
        Optional<Player> ratingSeriousnessPlayerOptional = playerRepository.findById(ratingSeriousnessPlayerId);
        Optional<Player> ratedSeriousnessPlayerOptional = playerRepository.findById(ratedSeriousnessPlayerId);
        Player ratingSeriousnessPlayer = ratingSeriousnessPlayerOptional.get();
        Player ratedSeriousnessPlayer = ratedSeriousnessPlayerOptional.get();
        ratingSeriousnessPlayer.addCommunityAssessedSeriousnessRating(ratedSeriousnessPlayer, seriousnessRating);
        playerRepository.save(ratedSeriousnessPlayer);
        return new ResponseEntity<>("Player has rated other player's seriousness", HttpStatus.OK);
    }

    @DeleteMapping("/players/{playerId}")
    public ResponseEntity<?> deletePlayer(@PathVariable Long playerId) {
        Optional<Player> playerOptional = playerRepository.findById(playerId);
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
            } else {
                createdGame.setCreator(null);
            }
            gameRepository.save(createdGame);
        }
        playerRepository.deleteById(playerId);
        return new ResponseEntity<>("Player deleted", HttpStatus.OK);
    }

}
