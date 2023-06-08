package com.booter.controller;

import com.booter.models.Player;
import com.booter.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PlayerController {

    @Autowired
    PlayerRepository playerRepository;

//    @GetMapping(value = "/players")
//    public ResponseEntity<List<Player>> getAllPlayers(){
//        return new ResponseEntity<>(playerRepository.findAll(), HttpStatus.OK);
//    }

    @GetMapping(value = "/players")
    public ResponseEntity<?> getAllPlayers() {
        try {
            List<Player> players = playerRepository.findAll();
            return new ResponseEntity<>(players, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>("Error fetching players: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
