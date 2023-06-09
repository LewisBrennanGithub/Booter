package com.booter.controller;

import com.booter.models.Address;
import com.booter.models.Game;
import com.booter.models.Player;
import com.booter.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class PlayerController {

    @Autowired
    PlayerRepository playerRepository;

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
            // handle player not found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Player player = playerOptional.get();
        List<Game> games = player.getGames();

        return new ResponseEntity<>(games, HttpStatus.OK);
    }

}
