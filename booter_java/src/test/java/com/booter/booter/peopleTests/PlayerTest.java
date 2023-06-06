package com.booter.booter.peopleTests;
import com.booter.booter.people.Player;
import com.booter.booter.places.Address;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


import static org.junit.jupiter.api.Assertions.assertEquals;

public class PlayerTest {

    Address address1;
    Player player1;

    @BeforeEach
    public void before() {
        address1 = new Address("6", "Dumbiedykes Lane", "Edinburgh", "United Kingdom", "ED12 2YP");
        player1 = new Player("Clive", "Fumagalli", "Fumi", "0123456789", address1, 22, 82.0, 65.0);
    }

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
    public void canGetPlayerCompositeAbilityLevel(){ assertEquals(82.0, player1.getCompositeAbilityLevel(), 0.0);}

    @Test
    public void canGetPlayerCompositeSeriousnessLevel(){ assertEquals(65.0, player1.getCompositeSeriousnessLevel(), 0.0);}
}
