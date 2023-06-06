package com.booter.booter.people;

import com.booter.booter.games.Game;
import com.booter.booter.places.Address;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String userName;
    private String phoneNumber;
    private int age;

    @ManyToOne
    @JoinColumn(name="address_id")
    private Address address;
    private double compositeAbilityLevel;
    private double compositeSeriousnessLevel;
    @ManyToMany(mappedBy = "players")
    private List<Game> games;

    public Player(String firstName, String lastName, String userName, String phoneNumber, Address address, int age, double compositeAbilityLevel, double compositeSeriousnessLevel) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.age = age;
        this.compositeAbilityLevel = compositeAbilityLevel;
        this.compositeSeriousnessLevel = compositeSeriousnessLevel;
        this.games = new ArrayList<>();
    }

    public Player(){
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getUserName() {
        return userName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Address getAddress() {
        return address;
    }

    public int getAge() {
        return age;
    }

    public double getCompositeAbilityLevel() {
        return compositeAbilityLevel;
    }

    public double getCompositeSeriousnessLevel() {
        return compositeSeriousnessLevel;
    }

    public List<Game> getGames() {
        return games;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setCompositeAbilityLevel(double compositeAbilityLevel) {
        this.compositeAbilityLevel = compositeAbilityLevel;
    }

    public void setCompositeSeriousnessLevel(double compositeSeriousnessLevel) {
        this.compositeSeriousnessLevel = compositeSeriousnessLevel;
    }

    public void setGames(List<Game> games) {
        this.games = games;
    }
}
