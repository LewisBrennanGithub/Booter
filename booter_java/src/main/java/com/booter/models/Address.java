package com.booter.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    REMEMBER ON THE FRONT END THAT THESE WILL BE *REQUIRED* FIELDS!
    @Column(name = "property_number_or_name")
    private String propertyNumberOrName;
    @Column(name = "street")
    private String street;
    @Column(name = "city")
    private String city;
    @Column(name = "country")
    private String country;
    @Column(name = "post_code")
    private String postCode;
    @JsonIgnore
    @OneToMany(mappedBy = "address")
    private List<Game> games;

    @JsonIgnore
    @OneToMany(mappedBy = "address")
    private List<Player> players = new ArrayList<>();

    public Address(String propertyNumberOrName, String street, String city, String country, String postCode) {
        this.propertyNumberOrName = propertyNumberOrName;
        this.street = street;
        this.city = city;
        this.country = country;
        this.postCode = postCode;
        this.games = new ArrayList<>();
    }

    public Address() {
    }

    public Long getId() {
        return id;
    }
    public String getPropertyNumberOrName() {
        return propertyNumberOrName;
    }

    public String getStreet() {
        return street;
    }

    public String getCity() {
        return city;
    }

    public String getCountry() {
        return country;
    }

    public String getPostCode() {
        return postCode;
    }

    public List<Game> getGames() {
        return games;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPropertyNumberOrName(String propertyNumberOrName) {
        this.propertyNumberOrName = propertyNumberOrName;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    public void setGames(List<Game> games) {
        this.games = games;
    }

    @Override
    public String toString() {
        return (propertyNumberOrName != null ? propertyNumberOrName : "N/A") + ", " +
                (street != null ? street : "N/A") + ", " +
                (city != null ? city : "N/A") + ", " +
                (country != null ? country : "N/A") + ", " +
                (postCode != null ? postCode : "N/A");
    }

}
