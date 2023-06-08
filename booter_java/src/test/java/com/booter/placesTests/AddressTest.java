package com.booter.placesTests;

import com.booter.models.Address;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class AddressTest {

    Address address1;
    Address address2;

    @BeforeEach
    public void before() {
        address1 = new Address("6","Dumbiedykes Lane", "Edinburgh", "United Kingdom", "ED12 2YP");
        address2 = new Address("23","Percival Square", null, "United Kingdom", "ED42 9YP");
    }

    @Test
    public void canGetNumberOrName() { assertEquals("6", address1.getPropertyNumberOrName());}
    @Test
    public void canGetStreet(){ assertEquals("Dumbiedykes Lane", address1.getStreet());}

    @Test
    public void canGetCity() { assertEquals("Edinburgh", address1.getCity());}

    @Test
    public void canGetCountry() { assertEquals("United Kingdom", address1.getCountry());}

    @Test
    public void canGetPostCode() { assertEquals("ED12 2YP", address1.getPostCode());}

    @Test
    public void canGetFullAddress() {assertEquals("6, Dumbiedykes Lane, Edinburgh, United Kingdom, ED12 2YP", address1.toString());}

    @Test
    public void canGetPartialFullAddress() {assertEquals("23, Percival Square, N/A, United Kingdom, ED42 9YP", address2.toString());}
}
