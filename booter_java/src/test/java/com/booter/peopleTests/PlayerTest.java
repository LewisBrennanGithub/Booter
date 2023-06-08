package com.booter.peopleTests;
import com.booter.models.Game;
import com.booter.models.Player;
import com.booter.models.Address;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


import java.time.ZoneId;
import java.time.ZonedDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PlayerTest {

    Address address1;
    Address address2;
    Address address3;
    Player player1;
    Player player2;
    Player player3;
    Player player4;
    Player player5;
    Player player6;
    Player player7;
    Player player8;
    Player player9;
    Player player10;
    Player player11;
    Player player12;
    ZonedDateTime dateAndTime1;

    @BeforeEach
    public void before() {
        address1 = new Address("6", "Dumbiedykes Lane", "Edinburgh", "United Kingdom", "ED12 2YP");
        address2 = new Address("8", "George Street", "Manchester", "United Kingdom", "M1 4AB");
        address3 = new Address("10", "Piccadilly Square", "London", "United Kingdom", "SW1A 1AA");

        player1 = new Player("Clive", "Fumagalli", "Fumi", "0123456789", address1, 22, 2.0, 4.0);
        player1.setId(1L);

        player2 = new Player("John", "Doe", "Johnny", "0223456789", address2, 25, 4.0, 4.0);
        player2.setId(2L);

        player3 = new Player("Jane", "Smith", "Janey", "0323456789", address1, 30, 5.0, 4.0);
        player3.setId(3L);

        player4 = new Player("Sam", "Johnson", "Sammy", "0423456789", address2, 28, 4.0, 3.0);
        player4.setId(4L);

        player5 = new Player("Emma", "Williams", "Emmy", "0523456789", address1, 32, 4.0, 4.0);
        player5.setId(5L);

        player6 = new Player("Liam", "Taylor", "Liam", "0623456789", address3, 35, 5.0, 4.0);
        player6.setId(6L);

        player7 = new Player("Olivia", "Brown", "Livvy", "0723456789", address1, 33, 4.0, 4.0);
        player7.setId(7L);

        player8 = new Player("Noah", "Miller", "Noah", "0823456789", address2, 38, 5.0, 4.0);
        player8.setId(8L);

        player9 = new Player("Ava", "Davis", "Ava", "0923456789", address1, 40, 4.0, 4.0);
        player9.setId(9L);

        player10 = new Player("Lucas", "Garcia", "Luke", "1023456789", address3, 42, 5.0, 5.0);
        player10.setId(10L);

        player11 = new Player("Sophia", "Rodriguez", "Sophie", "1123456789", address2, 45, 5.0, 5.0);
        player11.setId(11L);

        player12 = new Player("Mason", "Martinez", "Mason", "1223456789", address1, 50, 5.0, 5.0);
        player12.setId(12L);

        dateAndTime1 = ZonedDateTime.of(2023, 6, 1, 14, 0, 0, 0, ZoneId.systemDefault());
    }

    @Test
    public void canGetPlayerId() {assertEquals(1, player1.getId());}
    @Test
    public void canGetPlayerFirstName(){ assertEquals("Clive", player1.getFirstName());}
    @Test
    public void canGetPlayerLastName(){ assertEquals("Fumagalli", player1.getLastName());}
    @Test
    public void canGetPlayerUserName(){ assertEquals("Fumi", player1.getUserName());}

    @Test
    public void canGetPlayerPhoneNumber(){ assertEquals("0123456789", player1.getPhoneNumber());}

    @Test
    public void canGetPlayerAddressStreet() { assertEquals("Dumbiedykes Lane", player1.getAddress().getStreet());}

    @Test
    public void canGetPlayerAddressFull() { assertEquals("6, Dumbiedykes Lane, Edinburgh, United Kingdom, ED12 2YP", player1.getAddress().toString());}

    @Test
    public void canGetPlayerAge() { assertEquals(22, player1.getAge());}

    @Test
    public void playerCanCreateGameAndGetName() {
        player1.createGame("Soccer", address1, dateAndTime1, 90, 3.0, 3.0, 4.0, 2.0, 10);
        Game lastGameCreated = player1.getLastGameCreated();
        assertEquals("Soccer", lastGameCreated.getName());
    }

    @Test
    public void playerCanCreateGameAndGetTime() {
        player1.createGame("Soccer", address1, dateAndTime1, 90, 3.0, 3.0, 4.0, 2.0, 10);
        Game lastGameCreated = player1.getLastGameCreated();
        assertEquals(14, lastGameCreated.getDateAndTime().getHour());
    }

    @Test
    public void playerCanCreateGameAndGetEmptyListOfPlayers() {
        player1.createGame("Soccer", address1, dateAndTime1, 90, 3.0, 3.0, 4.0, 2.0, 10);
        Game lastGameCreated = player1.getLastGameCreated();
        assertEquals(0, lastGameCreated.getPlayers().size());
    }

    @Test
    public void playerCanCreateGameAndCompletedStatus() {
        player1.createGame("Soccer", address1, dateAndTime1, 90, 3.0, 3.0, 4.0, 2.0, 10);
        Game lastGameCreated = player1.getLastGameCreated();
        assertEquals(false, lastGameCreated.getCompletedStatus());
    }

    @Test
    public void playerCanCreateGameAndGetMaxPlayers() {
        player1.createGame("Soccer", address1, dateAndTime1, 90, 3.0, 3.0, 4.0, 2.0, 10);
        Game lastGameCreated = player1.getLastGameCreated();
        assertEquals(10, lastGameCreated.getMaxPlayers());
    }

    @Test
    public void playerCanCreateGameAndGetActualAbilityLevel() {
        player1.createGame("Soccer", address1, dateAndTime1, 90, 3.0, 3.0, 4.0, 2.0, 10);
        Game lastGameCreated = player1.getLastGameCreated();
        assertEquals(4.0, lastGameCreated.getActualAbilityLevel(), 0.0);
    }

    @Test
    public void playerCanCreateGameAndJoinIt() {
        player1.createGame("Soccer", address1, dateAndTime1, 90, 3.0, 3.0, 4.0, 2.0, 10);
        Game lastGameCreated = player1.getLastGameCreated();
        player1.joinGame(lastGameCreated);
        assertEquals(1, lastGameCreated.getPlayers().size());
    }

    @Test
    public void playerCanGreatGameAndCantJoinTwice() {
        player1.createGame("Soccer", address1, dateAndTime1, 90, 3.0, 3.0, 4.0, 2.0, 10);
        Game lastGameCreated = player1.getLastGameCreated();
        player1.joinGame(lastGameCreated);
        player1.joinGame(lastGameCreated);
        assertEquals(1, lastGameCreated.getPlayers().size());
    }

    @Test
    public void playerCanCreateGameAndFillItUp() {
        player1.createGame("Soccer", address1, dateAndTime1, 90, 3.0, 3.0, 4.0, 2.0, 10);
        Game lastGameCreated = player1.getLastGameCreated();
        player1.joinGame(lastGameCreated);
        player2.joinGame(lastGameCreated);
        player3.joinGame(lastGameCreated);
        player4.joinGame(lastGameCreated);
        player5.joinGame(lastGameCreated);
        player6.joinGame(lastGameCreated);
        assertEquals(6, lastGameCreated.getPlayers().size());
    }

    @Test
    public void playerCanCreateGameAndOtherPlayersCantJoinIfFull() {
        player1.createGame("Soccer", address1, dateAndTime1, 90, 3.0, 3.0, 4.0, 2.0, 6);
        Game lastGameCreated = player1.getLastGameCreated();
        player1.joinGame(lastGameCreated);
        player2.joinGame(lastGameCreated);
        player3.joinGame(lastGameCreated);
        player4.joinGame(lastGameCreated);
        player5.joinGame(lastGameCreated);
        player6.joinGame(lastGameCreated);
        player7.joinGame(lastGameCreated);
        assertEquals(6, lastGameCreated.getPlayers().size());
    }

    @Test
    public void playerCanCreateEmptyGameAndGetCreatorId() {
        player1.createGame("Soccer", address1, dateAndTime1, 90, 3.0, 3.0, 4.0, 2.0, 10);
        Game lastGameCreated = player1.getLastGameCreated();
        assertEquals(1L, lastGameCreated.getCreator().getId());
    }

    @Test
    public void playerCanCreateAGameAndAddSelfAndGetCreatorId() {
        player1.createGame("Soccer", address1, dateAndTime1, 90, 3.0, 3.0, 4.0, 2.0, 10);
        Game lastGameCreated = player1.getLastGameCreated();
        player1.joinGame(lastGameCreated);
        assertEquals(1L, lastGameCreated.getCreator().getId());
    }

    @Test
    public void playerCanCreateAGameAndHaveMultiplePlayersAndGetCreatorId() {
        player1.createGame("Soccer", address1, dateAndTime1, 90, 3.0, 3.0, 4.0, 2.0, 10);
        Game lastGameCreated = player1.getLastGameCreated();
        player1.joinGame(lastGameCreated);
        player2.joinGame(lastGameCreated);
        assertEquals(1L, lastGameCreated.getCreator().getId());
    }

    @Test
    public void playerCanSetCompletedStatusToTrue() {
        player1.createGame("Soccer", address1, dateAndTime1, 90, 3.0, 3.0, 4.0, 2.0, 10);
        Game lastGameCreated = player1.getLastGameCreated();
        player1.setCompletedStatus(lastGameCreated, true);
        assertEquals(true, lastGameCreated.getCompletedStatus());
    }

    @Test
    public void playerCannotSetCompletedStatusToTrueIfNotCreator() {
        player1.createGame("Soccer", address1, dateAndTime1, 90, 3.0, 3.0, 4.0, 2.0, 10);
        Game lastGameCreated = player1.getLastGameCreated();
        player2.setCompletedStatus(lastGameCreated, true);
        assertEquals(false, lastGameCreated.getCompletedStatus());
    }

//    RATINGS

    @Test
    public void playerCanStarterDisplayedAbilityRating() {
        assertEquals(2.0, player1.getDisplayedAbilityLevel(), 0.0);
    }

    @Test
    public void playerCanRateOtherPlayerWithoutImpactOnDisplayedLevel() {
        player2.addCommunityAssessedAbilityRating(player1,5.0);
        assertEquals(2.0, player1.getDisplayedAbilityLevel(), 0.0);
    }

    @Test
    public void playersCanRateOtherPlayersWithImpactOnDisplayedLevel() {
        player2.addCommunityAssessedAbilityRating(player1,5.0);
        player2.addCommunityAssessedAbilityRating(player1,5.0);
        player1.displayedAbilityLevelVariableMethod();
        assertEquals(4.1, player1.getDisplayedAbilityLevel(), 0.0);
    }

    @Test
    public void lotsOfPlayersCanRateOtherPlayersWithImpactOnDisplayedLevel() {
        player2.addCommunityAssessedAbilityRating(player1,5.0);
        player2.addCommunityAssessedAbilityRating(player1,5.0);
        player3.addCommunityAssessedAbilityRating(player1,5.0);
        player3.addCommunityAssessedAbilityRating(player1,5.0);
        player1.displayedAbilityLevelVariableMethod();
        assertEquals(4.1, player1.getDisplayedAbilityLevel(), 0.0);
    }

    @Test
    public void playerCanRateOtherPlayerSeriousnessWithoutImpactOnDisplayedLevel() {
        player2.addCommunityAssessedSeriousnessRating(player1,5.0);
        assertEquals(4.0, player1.getDisplayedSeriousnessLevel(), 0.0);
    }

    @Test
    public void playersCanRateOtherPlayersSeriousnessWithImpactOnDisplayedLevel() {
        player2.addCommunityAssessedSeriousnessRating(player1,5.0);
        player2.addCommunityAssessedSeriousnessRating(player1,5.0);
        player1.displayedSeriousnessLevelVariableMethod();
        assertEquals(4.7, player1.getDisplayedSeriousnessLevel(), 0.0);
    }

    @Test
    public void lotsOfPlayersCanRateOtherPlayersSeriousnessWithImpactOnDisplayedLevel() {
        player2.addCommunityAssessedSeriousnessRating(player1,5.0);
        player2.addCommunityAssessedSeriousnessRating(player1,5.0);
        player3.addCommunityAssessedSeriousnessRating(player1,5.0);
        player3.addCommunityAssessedSeriousnessRating(player1,5.0);
        player1.displayedSeriousnessLevelVariableMethod();
        assertEquals(4.7, player1.getDisplayedSeriousnessLevel(), 0.0);
    }

    @Test
    public void lotsOfPlayersCanRateOtherPlayersSeriousnessWithoutImpactOnSelfLevel() {
        player2.addCommunityAssessedSeriousnessRating(player1,5.0);
        player2.addCommunityAssessedSeriousnessRating(player1,5.0);
        player3.addCommunityAssessedSeriousnessRating(player1,5.0);
        player3.addCommunityAssessedSeriousnessRating(player1,5.0);
        player1.displayedSeriousnessLevelVariableMethod();
        assertEquals(2.0, player1.getSelfAssessedAbilityLevel(), 0.0);
    }

    @Test
    public void lotsOfPlayersCanRateOtherPlayersSeriousnessWithImpactOnCommunityLevel() {
        player2.addCommunityAssessedSeriousnessRating(player1,5.0);
        player2.addCommunityAssessedSeriousnessRating(player1,5.0);
        player3.addCommunityAssessedSeriousnessRating(player1,5.0);
        player3.addCommunityAssessedSeriousnessRating(player1,5.0);
        player1.displayedSeriousnessLevelVariableMethod();
        assertEquals(5.0, player1.getCommunityAssessedSeriousnessLevel(), 0.0);
    }

    @Test
    public void canGetSeriousnessRatingCount() {
        player2.addCommunityAssessedSeriousnessRating(player1,5.0);
        player2.addCommunityAssessedSeriousnessRating(player1,5.0);
        player3.addCommunityAssessedSeriousnessRating(player1,5.0);
        player3.addCommunityAssessedSeriousnessRating(player1,5.0);
        player1.displayedSeriousnessLevelVariableMethod();
        assertEquals(4, player1.getCommunityAssessedSeriousnessLevelCount(), 0.0);
    }

    @Test
    public void canGetAbilityRatingCount() {
        player2.addCommunityAssessedAbilityRating(player1,5.0);
        player2.addCommunityAssessedAbilityRating(player1,5.0);
        player3.addCommunityAssessedAbilityRating(player1,5.0);
        player3.addCommunityAssessedAbilityRating(player1,5.0);
        player1.displayedAbilityLevelVariableMethod();
        assertEquals(4, player1.getCommunityAssessedAbilityLevelCount(), 0.0);
    }

    @Test
    public void AbilityLevelCountStartsAtZero() {
        assertEquals(0, player1.getCommunityAssessedAbilityLevelCount(), 0.0);
    }

}
