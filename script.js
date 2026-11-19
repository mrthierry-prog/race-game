
/* =================================
   RACE GAME
   Main JavaScript
================================= */

// Game-instellingen
const game = {
    name: "RACE GAME",
    season: 2027,
    mode: "Career Mode",
    team: "Amateurteam"
};

// Controleer of de game geladen is
function initializeGame() {
    console.log("RACE GAME is gestart!");
    console.log("Seizoen:", game.season);
    console.log("Spelmodus:", game.mode);
    console.log("Team:", game.team);
}

// Start de game
initializeGame();
