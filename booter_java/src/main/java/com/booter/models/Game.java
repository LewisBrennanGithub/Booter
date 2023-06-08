package com.booter.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.time.ZonedDateTime;

@Entity
@Table (name = "games")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="creator_id")
    @JsonBackReference
    private Player creator;
    @Column(name="name")
    private String name;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="address_id")
    private Address address;
    @Column(name="date_and_time")
    private ZonedDateTime dateAndTime;
    @Column(name="duration")
    private int duration;
    @Column(name="recommended_ability_level")
    private double recommendedAbilityLevel;
    @Column(name="recommended_seriousness_level")
    private double recommendedSeriousnessLevel;
    @Column(name="actual_ability_level")
    private double actualAbilityLevel;
    @Column(name="actual_seriousness_level")
    private double actualSeriousnessLevel;
    @Column(name="completed_status")
    private boolean completedStatus;
    @JsonManagedReference
    @ManyToMany
    @JoinTable(
            name = "players_games",
            joinColumns = {@JoinColumn(name = "game_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name="player_id", nullable = false, updatable = false)}
    )
    private List<Player> players;
    @Column(name="max_players")
    private int maxPlayers;

    public Game(Player creator, String name, Address address, ZonedDateTime dateAndTime, int duration, double recommendedAbilityLevel, double recommendedSeriousnessLevel, double actualAbilityLevel, double actualSeriousnessLevel, boolean completed, int maxPlayers) {
        this.creator = creator;
        this.name = name;
        this.address = address;
        this.dateAndTime = dateAndTime;
        this.duration = duration;
        this.recommendedAbilityLevel = recommendedAbilityLevel;
        this.recommendedSeriousnessLevel = recommendedSeriousnessLevel;
        this.actualAbilityLevel = actualAbilityLevel;
        this.actualSeriousnessLevel = actualSeriousnessLevel;
        this.completedStatus = completed;
        this.players = new ArrayList<>();
        this.maxPlayers = maxPlayers;
    }

    public Game() {
    }

    public Long getId() {
        return id;
    }

    public Player getCreator() {
        return creator;
    }

    public String getName() {
        return name;
    }

    public Address getAddress() {
        return address;
    }

    public ZonedDateTime getDateAndTime() {
        return dateAndTime;
    }

    public int getDuration() {
        return duration;
    }

    public double getRecommendedAbilityLevel() {
        return recommendedAbilityLevel;
    }

    public double getRecommendedSeriousnessLevel() {
        return recommendedSeriousnessLevel;
    }

    public double getActualAbilityLevel() {
        return actualAbilityLevel;
    }

    public double getActualSeriousnessLevel() {
        return actualSeriousnessLevel;
    }

    public boolean getCompletedStatus() {
        return completedStatus;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public int getMaxPlayers() {
        return maxPlayers;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCreator(Player creator) {
        this.creator = creator;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public void setDateAndTime(ZonedDateTime dateAndTime) {
        this.dateAndTime = dateAndTime;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public void setRecommendedAbilityLevel(double recommendedAbilityLevel) {
        this.recommendedAbilityLevel = recommendedAbilityLevel;
    }

    public void setRecommendedSeriousnessLevel(double recommendedSeriousnessLevel) {
        this.recommendedSeriousnessLevel = recommendedSeriousnessLevel;
    }

    public void setActualAbilityLevel(double actualAbilityLevel) {
        this.actualAbilityLevel = actualAbilityLevel;
    }

    public void setActualSeriousnessLevel(double actualSeriousnessLevel) {
        this.actualSeriousnessLevel = actualSeriousnessLevel;
    }

    public void setCompletedStatus(boolean completed) {
        this.completedStatus = completed;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }

    public void setMaxPlayers(int maxPlayers) {
        this.maxPlayers = maxPlayers;
    }
}
