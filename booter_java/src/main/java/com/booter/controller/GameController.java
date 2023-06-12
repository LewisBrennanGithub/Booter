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

//    @PostMapping(value= "/games")
//    public ResponseEntity<Game> postGame(@RequestBody GameCreationRequest gameCreationRequest){
//        Optional<Player> creatorOptional = playerRepository.findById(gameCreationRequest.getCreatorId());
//
//        if (!creatorOptional.isPresent()) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//
//        Player creator = creatorOptional.get();
//
//        // Assuming GameCreationRequest contains all the necessary information to create a game
//        Game newGame = creator.createGame(
//                gameCreationRequest.getName(),
//                gameCreationRequest.getAddress(),
//                gameCreationRequest.getDateAndTime(),
//                gameCreationRequest.getDuration(),
//                gameCreationRequest.getRecommendedAbilityLevel(),
//                gameCreationRequest.getRecommendedSeriousnessLevel(),
//                gameCreationRequest.getActualAbilityLevel(),
//                gameCreationRequest.getActualSeriousnessLevel(),
//                gameCreationRequest.getMaxPlayers()
//        );
//
//        gameRepository.save(newGame);
//        return new ResponseEntity<>(newGame, HttpStatus.CREATED);
//    }
//    @PostMapping(value= "/games")
//    public ResponseEntity<Game> postGame(@RequestBody GameCreationRequest gameCreationRequest) {
//        // Retrieve the creator from the database
//        Optional<Player> creatorOptional = playerRepository.findById(gameCreationRequest.getCreatorId());
//        if (!creatorOptional.isPresent()) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//        Player creator = creatorOptional.get();
//
//        // Retrieve or save the address
//        Address address = null;
//        // Assuming addressId is in GameCreationRequest
//        if (gameCreationRequest.getAddressId() != null) {
//            Optional<Address> addressOptional = addressRepository.findById(gameCreationRequest.getAddressId());
//            if (!addressOptional.isPresent()) {
//                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//            }
//            address = addressOptional.get();
//        } else {
//            // assuming GameCreationRequest contains address details to create a new address
//            address = new Address(/* address details from gameCreationRequest */);
//            addressRepository.save(address);
//        }
//
//        // Create the new Game object
//        Game newGame = new Game(
//                creator,
//                gameCreationRequest.getName(),
//                address,
//                gameCreationRequest.getDateAndTime(),
//                gameCreationRequest.getDuration(),
//                gameCreationRequest.getRecommendedAbilityLevel(),
//                gameCreationRequest.getRecommendedSeriousnessLevel(),
//                gameCreationRequest.getActualAbilityLevel(),
//                gameCreationRequest.getActualSeriousnessLevel(),
//                false, // assuming the game is not completed when created
//                gameCreationRequest.getMaxPlayers()
//        );
//
//        // Save the new Game to the database
//        gameRepository.save(newGame);
//
//        // Return the saved Game object with HTTP status 201 (created)
//        return new ResponseEntity<>(newGame, HttpStatus.CREATED);
//    }

//    @PostMapping(value= "/games")
//    public ResponseEntity<Game> postGame(@RequestBody Game game){
//        // Assuming you have an AddressRepository like your PlayerRepository
//        Address address = addressRepository.findById(game.getAddress().getId()).orElse(null);
//        Player creator = playerRepository.findById(game.getCreator().getId()).orElse(null);
//
//        if (address == null || creator == null) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//
//        game.setAddress(address);
//        game.setCreator(creator);
//
//        gameRepository.save(game);
//        return new ResponseEntity<>(game, HttpStatus.CREATED);
//    }

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
}
