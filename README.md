Booter - 1.1

Premise

Booter is an app designed to allow people to organise games of football with other players at a desired level of skill and seriousness with which they take the game. This happens by players rating themselves and then rating other players whom they've played with. When players create games they can set guideline levels but there will also be an actual level displayed which is calculated from the accumulated ratings of other players in the game.

This idea was born out of a desire from myself to find other players who don't rate themselves too highly on ability and just want to play for fun. My hope is that I can launch the app and find this, but also any other number of combinations can take place, for example players who rate themselves highly and want competitive games can also organise, with everything in between being possible as-well.

The app has been primarily designed for use on IOS phones however in time I'd like to expand this to web browsers and Android.

Prerequisites

Below are some prerequisites for making a working clone of the app, along with some installation advice. Some are recomendations, for example Yarn may suffice in place of Node, but any which are essential I will mark with an asterisk.

Node.js - https://nodejs.org/en
*React Native CLI - npm install -g react-native-cli
*Xcode - Download from Mac App Store
*PostgreSQL - https://www.postgresql.org/
Postico - https://eggerapps.at/postico2/
*IntelliJ - https://www.jetbrains.com/idea/download/?section=mac

Installation

1) Begin by creating a destination folder then cloning the app: 'git clone git@github.com:LewisBrennanGithub/Booter.git'.
2) Once in, 'cd' into 'booter_reactnative', then 'npm install'.
3) Anywhere in the terminal 'createdb booter'.
4) Open up the Java portion in IntelliJ and once set up there run 'BooterApplication' in src > main > java > com.booter.
5) If not already there cd back into 'booter_reactnative' and 'npm start', input 'i' to start it on in IOS mode in XCode Simulator.

Suggested Walkthrough

You will notice that the header has some information regarding whether or not you're logged in and whether you have an associated player account. The first step I would suggest is that you navigate to the right most tab and create an account to login with. This is handled by Auth0. Once done the next step is to create an associated player, you can do this by navigating to the 3rd tab from the left, feel free to add in mock data here. Once this is completed you can now more effectively interact with the Games and Players tabs, either joining/creating games or rating other players. Full create, read, update and delete functionality is implemented so feel free to then alter things as you please.

Roadmap

The app at this stage is fairly simple and whilst I'm proud of it I'm planning on adding more features, including:
- The ability to leave games after joining them.
- An optional request>accept/decline system for joining some games, where a player will request to join and it will be up to the game's creator to accept or decline this invite.
- Refactoring how player ratings are taken. Currently any player can rate any other player however many times they please. I intend to have this changed to one game played with another player allows you to rate their ability and seriousness once, and once more per game played with them.
- Integrating a geography and distance calculating API or similar, or at the very least allow for search filtering for games and players.

Acknowledgments

This app was started as my Capstone project for CodeClan and has come a long way since. I'd like to pay tribute to my instructors Sky, Mar and Keith who gave me what I consider to be the best possible start in the world of programming and for their help in keeping me right in this particular project.  
