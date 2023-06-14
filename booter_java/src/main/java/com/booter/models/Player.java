package com.booter.models;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table (name = "players")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="first_name")
    private String firstName;
    @Column(name="last_name")
    private String lastName;
    @Column(name="user_name")
    private String userName;
    @Column(name="phone_number")
    private String phoneNumber;
    @Column(name="age")
    private int age;
    @ManyToOne
    @JoinColumn(name="address_id")
    private Address address;
    @Column(name="displayed_ability_level")
    private double displayedAbilityLevel;
    @Column(name="composite_ability_level")
    private double compositeAbilityLevel;
    @Column(name="self_assessed_ability_level")
    private double selfAssessedAbilityLevel;
    @Column(name="community_assessed_ability_level")
    private double communityAssessedAbilityLevel;
    @Column(name="community_assessed_ability_count")
    private int communityAssessedAbilityLevelCount;
    @Column(name="displayed_seriousness_level")
    private double displayedSeriousnessLevel;
    @Column(name="composite_seriousness_level")
    private double compositeSeriousnessLevel;
    @Column(name="self_assessed_seriousness_level")
    private double selfAssessedSeriousnessLevel;
    @Column(name="community_assessed_seriousness_level")
    private double communityAssessedSeriousnessLevel;
    @Column(name="community_assessed_serious_count")
    private int communityAssessedSeriousnessLevelCount;
    @ManyToMany(mappedBy = "players")
    private List<Game> games = new ArrayList<>();

    @OneToMany(mappedBy = "creator")
    private List<Game> createdGames;

//    KEEP FOR UNIT TESTING
//    @JsonManagedReference("player_last_game_created")
//    @OneToOne(mappedBy = "creator")
//    private Game lastGameCreated;

    public Player(String firstName, String lastName, String userName, String phoneNumber, Address address, int age, double selfAssessedAbilityLevel, double selfAssessedSeriousnessLevel) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.age = age;
        this.displayedAbilityLevel = selfAssessedAbilityLevel;
        this.compositeAbilityLevel = selfAssessedAbilityLevel;
        this.selfAssessedAbilityLevel = selfAssessedAbilityLevel;
        this.communityAssessedAbilityLevel = 0.0;
        this.communityAssessedAbilityLevelCount = 0;
        this.displayedSeriousnessLevel = selfAssessedSeriousnessLevel;
        this.selfAssessedSeriousnessLevel = selfAssessedSeriousnessLevel;
        this.compositeSeriousnessLevel = selfAssessedSeriousnessLevel;
        this.communityAssessedSeriousnessLevel = 0.0;
        this.communityAssessedSeriousnessLevelCount = 0;
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

    public double getDisplayedAbilityLevel() {
        return displayedAbilityLevel;
    }

    public double getCompositeAbilityLevel() {
        return compositeAbilityLevel;
    }

    public double getSelfAssessedAbilityLevel() {
        return selfAssessedAbilityLevel;
    }

    public double getCommunityAssessedAbilityLevel() {
        return communityAssessedAbilityLevel;
    }

    public int getCommunityAssessedAbilityLevelCount() {
        return communityAssessedAbilityLevelCount;
    }

    public double getDisplayedSeriousnessLevel() {
        return displayedSeriousnessLevel;
    }

    public double getCompositeSeriousnessLevel() {
        return compositeSeriousnessLevel;
    }

    public double getSelfAssessedSeriousnessLevel() {
        return selfAssessedSeriousnessLevel;
    }

    public double getCommunityAssessedSeriousnessLevel() {
        return communityAssessedSeriousnessLevel;
    }

    public int getCommunityAssessedSeriousnessLevelCount() {
        return communityAssessedSeriousnessLevelCount;
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

    public void setDisplayedAbilityLevel(double displayedAbilityLevel) {
        this.displayedAbilityLevel = displayedAbilityLevel;
    }

    public void setCompositeAbilityLevel(double compositeAbilityLevel) {
        this.compositeAbilityLevel = compositeAbilityLevel;
    }

    public void setSelfAssessedAbilityLevel(double selfAssessedAbilityLevel) {
        this.selfAssessedAbilityLevel = selfAssessedAbilityLevel;
    }

    public void setCommunityAssessedAbilityLevel(double communityAssessedAbilityLevel) {
        this.communityAssessedAbilityLevel = communityAssessedAbilityLevel;
    }

    public void setCommunityAssessedAbilityLevelCount(int communityAssessedAbilityLevelCount) {
        this.communityAssessedAbilityLevelCount = communityAssessedAbilityLevelCount;
    }

    public void setDisplayedSeriousnessLevel(double displayedSeriousnessLevel) {
        this.displayedSeriousnessLevel = displayedSeriousnessLevel;
    }

    public void setCompositeSeriousnessLevel(double compositeSeriousnessLevel) {
        this.compositeSeriousnessLevel = compositeSeriousnessLevel;
    }

    public void setSelfAssessedSeriousnessLevel(double selfAssessedSeriousnessLevel) {
        this.selfAssessedSeriousnessLevel = selfAssessedSeriousnessLevel;
    }

    public void setCommunityAssessedSeriousnessLevel(double communityAssessedSeriousnessLevel) {
        this.communityAssessedSeriousnessLevel = communityAssessedSeriousnessLevel;
    }

    public void setCommunityAssessedSeriousnessLevelCount(int communityAssessedSeriousnessLevelCount) {
        this.communityAssessedSeriousnessLevelCount = communityAssessedSeriousnessLevelCount;
    }

    public void setGames(List<Game> games) {
        this.games = games;
    }

//    SPECIFIC METHODS/GETTERS/SETTERS
//    THIS WILL NEED HOOKED UP TO THE DATABASE
//    EDIT - CONSIDER REMOVING AND HAVE HANDLED BY POST METHOD
    public Game createGame(String name, Address address, ZonedDateTime dateAndTime, int duration, double recommendedAbilityLevel, double recommendedSeriousnessLevel, double actualAbilityLevel, double actualSeriousnessLevel, int maxPlayers ) {
        Game newGame = new Game(this, name, address, dateAndTime, duration, recommendedAbilityLevel, recommendedSeriousnessLevel, actualAbilityLevel, actualSeriousnessLevel, false, maxPlayers);
        this.games.add(newGame);
        return newGame;
    }
    // ^^ FOR UNITTESTS >> address.getGames().add(newGame);

//    WILL ALSO NEED TO BE REMOVED AT SOME STAGE
//    public Game getLastGameCreated() {
//        return games.get(games.size() - 1);
//    }

    public void joinGame(Game game) {
        for (Player existingPlayer : game.getPlayers()) {
            if (existingPlayer.getId().equals(this.getId())) {
                return;
            }
        }
        if (game.getPlayers().size() < game.getMaxPlayers()) {
            this.games.add(game);
            game.getPlayers().add(this);
        }
    }

    public void setCompletedStatus(Game game, boolean status) {
        if (game.getCreator().equals(this)) {
            game.setCompletedStatus(status);
        }
    }

//    RATINGS SECTION

    public double displayedAbilityLevelVariableMethod() {
        if (communityAssessedAbilityLevelCount < 2) {
            return displayedAbilityLevel = selfAssessedAbilityLevel;
        }
        else {
            return displayedAbilityLevel = compositeAbilityLevel;
        }
    }

    public void updateCompositeAbilityLevel() {
            compositeAbilityLevel = 0.3 * selfAssessedAbilityLevel + 0.7 * communityAssessedAbilityLevel;
        }

    public void updateSelfAssessedAbilityLevel(double newAbilityLevel) {
        if (newAbilityLevel < 0.0 || newAbilityLevel > 5.0 || newAbilityLevel % 1.0 != 0) {
            System.out.println("Invalid rating. Please enter a rating between 0.0 and 5.0 in increments of 1.0.");
            return;
        }
        selfAssessedAbilityLevel = newAbilityLevel;
        updateCompositeAbilityLevel();
    }

    public void addCommunityAssessedAbilityRating(Player player, double newRating) {
        if (newRating < 0.0 || newRating > 5.0 || newRating % 0.5 != 0) {
            System.out.println("Invalid rating. Please enter a rating between 0.0 and 5.0 in increments of 1.0.");
            return;
        }
        player.communityAssessedAbilityLevelCount++;
        if(player.communityAssessedAbilityLevelCount != 0) {
            player.communityAssessedAbilityLevel = (player.communityAssessedAbilityLevel * ((double)player.communityAssessedAbilityLevelCount - 1) + newRating) / (player.communityAssessedAbilityLevelCount);
            player.updateCompositeAbilityLevel();
            player.displayedAbilityLevelVariableMethod();
        }
    }

    public double displayedSeriousnessLevelVariableMethod() {
        if (communityAssessedSeriousnessLevelCount < 2) {
            return displayedSeriousnessLevel = selfAssessedSeriousnessLevel;
        }
        else {
            return displayedSeriousnessLevel = compositeSeriousnessLevel;
        }
    }

    public void updateCompositeSeriousnessLevel() {
            compositeSeriousnessLevel = 0.3 * selfAssessedSeriousnessLevel + 0.7 * communityAssessedSeriousnessLevel;
        }

    public void updateSelfAssessedSeriousnessLevel(double newSeriousnessLevel) {
        if (newSeriousnessLevel < 0.0 || newSeriousnessLevel > 5.0 || newSeriousnessLevel % 1.0 != 0) {
            System.out.println("Invalid rating. Please enter a rating between 0.0 and 5.0 in increments of 1.0.");
            return;
        }
        selfAssessedSeriousnessLevel = newSeriousnessLevel;
        updateCompositeSeriousnessLevel();
    }

    public void addCommunityAssessedSeriousnessRating(Player player, double newRating) {
        if (newRating < 0.0 || newRating > 5.0 || newRating % 0.5 != 0) {
            System.out.println("Invalid rating. Please enter a rating between 0.0 and 5.0 in increments of 0.5.");
            return;
        }
        player.communityAssessedSeriousnessLevelCount++;
        if(player.communityAssessedSeriousnessLevelCount != 0) {
            player.communityAssessedSeriousnessLevel = (player.communityAssessedSeriousnessLevel * ((double)player.communityAssessedSeriousnessLevelCount - 1) + newRating) / (player.communityAssessedSeriousnessLevelCount);
            player.updateCompositeSeriousnessLevel();
            player.displayedSeriousnessLevelVariableMethod();
        }
    }

}
