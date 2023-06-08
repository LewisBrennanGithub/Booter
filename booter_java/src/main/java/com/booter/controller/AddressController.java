package com.booter.controller;

import com.booter.models.Address;
import com.booter.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
public class AddressController {

    @Autowired
    AddressRepository addressRepository;

    @GetMapping(value = "/addresses")
    public ResponseEntity<List<Address>> getAllAddresses(){
        return new ResponseEntity<>(addressRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "/addresses/{id}")
    public ResponseEntity getAddress(@PathVariable Long id){
        return new ResponseEntity<>(addressRepository.findById(id), HttpStatus.OK);
    }
}
