package com.booter.booter.gameTests;

import com.booter.booter.games.Game;
import com.booter.booter.people.Player;
import com.booter.booter.places.Address;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.ZoneId;
import java.time.ZonedDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class GameTest {

    Player player1;
    Address address1;
    Address address2;
    Game game1;


    @BeforeEach
    public void before() {
        player1 = new Player("Clive", "Fumagalli", "Fumi", "0123456789", address1, 22, 82.0, 65.0);
        address1 = new Address("6", "Dumbiedykes Lane", "Edinburgh", "United Kingdom", "ED12 2YP");
        address2 = new Address("23","Percival Square", "Glasgow", "United Kingdom", "ED42 9YP");
        ZonedDateTime dateAndTime1 = ZonedDateTime.of(2023, 6, 1, 14, 0, 0, 0, ZoneId.systemDefault());
        game1 = new Game(player1, "Casual Kickabout", address2, dateAndTime1, 90, 60.0, 60.0, 80.0, 100.0, false, 10);
    }

    @Test
    public void canGetGameName(){ assertEquals("Casual Kickabout", game1.getName());}

    @Test
    public void canGetFullAddress(){ assertEquals("23, Percival Square, Glasgow, United Kingdom, ED42 9YP", game1.getAddress().toString());}

    @Test
    public void canGetYearOfGame(){ assertEquals(2023, game1.getDateAndTime().getYear());}

    @Test
    public void canGetMonthOfGame(){ assertEquals(6, game1.getDateAndTime().getMonthValue());}

    @Test
    public void canGetGameDuration(){ assertEquals(90, game1.getDuration());}

    @Test
    public void canGetRecommendedAbilityLevel(){ assertEquals(60.0, game1.getRecommendedAbilityLevel());}

    @Test
    public void canGetCompletedStatus(){ assertEquals(false, game1.getCompletedStatus());}
}
