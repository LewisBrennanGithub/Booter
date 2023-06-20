package com.booter.controller;

import com.booter.models.Address;
import com.booter.models.Game;
import com.booter.models.Player;
import com.booter.repository.AddressRepository;
import com.booter.repository.GameRepository;
import com.booter.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Response;
import java.util.List;
import java.util.Optional;

@RestController
public class GameController {

    @Autowired
    GameRepository gameRepository;
    @Autowired
    PlayerRepository playerRepository;
    @Autowired
    AddressRepository addressRepository;

    @GetMapping(value = "/games")
    public ResponseEntity<List<Game>> getAllGames(){
        return new ResponseEntity<>(gameRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/games/{id}")
    public ResponseEntity getGame(@PathVariable Long id){
        return new ResponseEntity<>(gameRepository.findById(id), HttpStatus.OK);
    }

    @GetMapping("/games/{gameId}/players")
    public ResponseEntity<List<Player>> getGamePlayers(@PathVariable Long gameId) {
        Optional<Game> gameOptional = gameRepository.findById(gameId);
        Game game = gameOptional.get();
        List<Player> players = game.getPlayers();
        return new ResponseEntity<>(players, HttpStatus.OK);
    }

    @PostMapping(value= "/games")
    public ResponseEntity<Game> postGame(@RequestBody Game game){
        gameRepository.save(game);
        return new ResponseEntity<>(game, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/games/{id}")
    public ResponseEntity<Void> deleteGame(@PathVariable Long id) {
        Optional<Game> gameOptional = gameRepository.findById(id);
            Game game = gameOptional.get();
            List<Player> players = game.getPlayers();
            for (Player player : players) {
                player.getGames().remove(game);
                playerRepository.save(player);
            }
            gameRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/games/{id}")
    public ResponseEntity<Game> updateGame(@PathVariable Long id, @RequestBody Game game) {
        Optional<Game> gameOptional = gameRepository.findById(id);
            Game existingGame = gameOptional.get();
            existingGame.setName(game.getName());
            existingGame.setAddress(game.getAddress());
            existingGame.setDateAndTime(game.getDateAndTime());
            existingGame.setDuration(game.getDuration());
            existingGame.setRecommendedAbilityLevel(game.getRecommendedAbilityLevel());
            existingGame.setRecommendedSeriousnessLevel(game.getRecommendedSeriousnessLevel());
            existingGame.setPlayers(game.getPlayers());
            existingGame.setMaxPlayers(game.getMaxPlayers());
            gameRepository.save(existingGame);
            return new ResponseEntity<>(existingGame, HttpStatus.OK);
    }
}
