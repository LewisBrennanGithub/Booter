package com.booter.components;

import com.booter.models.Address;
import com.booter.models.Game;
import com.booter.models.Player;
import com.booter.repository.AddressRepository;
import com.booter.repository.GameRepository;
import com.booter.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DataLoader implements ApplicationRunner {
    @Autowired
    PlayerRepository playerRepository;
    @Autowired
    GameRepository gameRepository;
    @Autowired
    AddressRepository addressRepository;

    public DataLoader(){
    }

    public void run(ApplicationArguments args) {
        gameRepository.deleteAll();
        playerRepository.deleteAll();
        addressRepository.deleteAll();

        Address dumbiedykesLane6 = new Address("6", "Dumbiedykes Lane", "Edinburgh", "United Kingdom", "ED12 2YP");
        addressRepository.save(dumbiedykesLane6);

        Address georgeStreet8 = new Address("8", "George Street", "Manchester", "United Kingdom", "M1 4AB");
        addressRepository.save(georgeStreet8);

        Address piccadillySquare10 = new Address("10", "Piccadilly Square", "London", "United Kingdom", "SW1A 1AA");
        addressRepository.save(piccadillySquare10);

        Address bakerStreet12 = new Address("12", "Baker Street", "London", "United Kingdom", "NW1 6XE");
        addressRepository.save(bakerStreet12);

        Address highStreet14 = new Address("14", "High Street", "Birmingham", "United Kingdom", "B4 7SL");
        addressRepository.save(highStreet14);

        Address castleStreet16 = new Address("16", "Castle Street", "Edinburgh", "United Kingdom", "EH2 3AT");
        addressRepository.save(castleStreet16);

        Address marketStreet18 = new Address("18", "Market Street", "Manchester", "United Kingdom", "M1 1PD");
        addressRepository.save(marketStreet18);

        Address queenStreet20 = new Address("20", "Queen Street", "Cardiff", "United Kingdom", "CF10 2BU");
        addressRepository.save(queenStreet20);

        Address parkLane22 = new Address("22", "Park Lane", "Leeds", "United Kingdom", "LS3 1AA");
        addressRepository.save(parkLane22);

        Address victoriaStreet24 = new Address("24", "Victoria Street", "Liverpool", "United Kingdom", "L1 6DE");
        addressRepository.save(victoriaStreet24);

        Address oxfordStreet26 = new Address("26", "Oxford Street", "London", "United Kingdom", "W1D 1LL");
        addressRepository.save(oxfordStreet26);

        Address kingStreet28 = new Address("28", "King Street", "Manchester", "United Kingdom", "M2 6AZ");
        addressRepository.save(kingStreet28);

        Player clive = new Player("Clive", "Fumagalli", "Fumi", "0123456789", dumbiedykesLane6, 22, 2.0, 4.0);
        playerRepository.save(clive);

        Player john = new Player("John", "Doe", "JD", "0234567891", georgeStreet8, 28, 3.5, 3.0);
        playerRepository.save(john);

        Player jane = new Player("Jane", "Smith", "JSmith", "0345678923", piccadillySquare10, 30, 4.0, 4.5);
        playerRepository.save(jane);

        Player alice = new Player("Alice", "Johnson", "AJ", "0456789123", bakerStreet12, 24, 3.0, 3.5);
        playerRepository.save(alice);

        Player bob = new Player("Bob", "Williams", "BWilliams", "0567891234", highStreet14, 32, 3.5, 4.0);
        playerRepository.save(bob);

        Player charlie = new Player("Charlie", "Brown", "CBrown", "0678912345", castleStreet16, 27, 2.5, 3.0);
        playerRepository.save(charlie);

        Player diana = new Player("Diana", "Miller", "DMiller", "0789123456", marketStreet18, 29, 3.5, 4.5);
        playerRepository.save(diana);

        Player elizabeth = new Player("Elizabeth", "Taylor", "ETaylor", "0891234567", queenStreet20, 31, 4.0, 4.0);
        playerRepository.save(elizabeth);

        Player frank = new Player("Frank", "Anderson", "FAnderson", "0901234567", parkLane22, 25, 2.5, 3.5);
        playerRepository.save(frank);

        Player george = new Player("George", "Thomas", "GThomas", "0912345678", victoriaStreet24, 33, 3.0, 4.5);
        playerRepository.save(george);

        Player hannah = new Player("Hannah", "Martin", "HMartin", "0923456789", oxfordStreet26, 26, 4.5, 4.0);
        playerRepository.save(hannah);

        Player isaac = new Player("Isaac", "Rodriguez", "IRodriguez", "0934567890", kingStreet28, 28, 3.5, 3.5);
        playerRepository.save(isaac);

        ZonedDateTime game1DateTime = ZonedDateTime.now().plusDays(3);
        List<Player> game1Players = new ArrayList<>(Arrays.asList(clive, john, jane, alice, bob));
        Game game1 = new Game(clive, "Soccer Match", dumbiedykesLane6, game1DateTime, 90, 3.5, 4.0, 3.5, 4.0, false, 5);
        game1.setPlayers(game1Players);
        gameRepository.save(game1);

        ZonedDateTime game2DateTime = ZonedDateTime.now().plusDays(7);
        List<Player> game2Players = new ArrayList<>(Arrays.asList(charlie, diana));
        Game game2 = new Game(charlie, "Basketball Game", georgeStreet8, game2DateTime, 60, 4.0, 3.5, 4.0, 3.5, false, 10);
        game2.setPlayers(game2Players);
        gameRepository.save(game2);

        ZonedDateTime game3DateTime = ZonedDateTime.now().plusDays(10);
        List<Player> game3Players = new ArrayList<>(Arrays.asList(elizabeth, frank, george));
        Game game3 = new Game(elizabeth, "Tennis Match", piccadillySquare10, game3DateTime, 45, 3.0, 4.5, 3.0, 4.5, false, 4);
        game3.setPlayers(game3Players);
        gameRepository.save(game3);

        ZonedDateTime game4DateTime = ZonedDateTime.now().plusDays(14);
        Game game4 = new Game(hannah, "Volleyball Game", bakerStreet12, game4DateTime, 60, 4.5, 4.0, 4.5, 4.0, false, 6);
        gameRepository.save(game4);

    }
}
