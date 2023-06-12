package com.booter.controller;

import com.booter.models.Address;
import com.booter.models.Player;
import com.booter.repository.AddressRepository;
import com.booter.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class AddressController {

    @Autowired
    AddressRepository addressRepository;

    @Autowired
    PlayerRepository playerRepository;

    @GetMapping(value = "/addresses")
    public ResponseEntity<List<Address>> getAllAddresses(){
        return new ResponseEntity<>(addressRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/addresses/{id}")
    public ResponseEntity getAddress(@PathVariable Long id){
        return new ResponseEntity<>(addressRepository.findById(id), HttpStatus.OK);
    }

    @PostMapping(value = "/addresses")
    public ResponseEntity<Address> postAddress(@RequestBody Address address) {
        addressRepository.save(address);
        return new ResponseEntity<>(address, HttpStatus.CREATED);
    }

    @PutMapping(value = "/addresses/{id}")
    public ResponseEntity<Address> updateAddress(@PathVariable Long id, @RequestBody Address address) {
        Optional<Address> addressOptional = addressRepository.findById(id);
            Address existingAddress = addressOptional.get();
            existingAddress.setPropertyNumberOrName(address.getPropertyNumberOrName());
            existingAddress.setStreet(address.getStreet());
            existingAddress.setCity(address.getCity());
            existingAddress.setCountry(address.getCountry());
            existingAddress.setPostCode(address.getPostCode());
            existingAddress.setGames(address.getGames());
            addressRepository.save(existingAddress);
            return new ResponseEntity<>(existingAddress, HttpStatus.OK);
    }

    @DeleteMapping(value = "/addresses/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long id) {
        Optional<Address> addressOptional = addressRepository.findById(id);
            List<Player> players = playerRepository.findByAddressId(id);
            for (Player player : players) {
                player.setAddress(null);
                playerRepository.save(player);
            }
            addressRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
