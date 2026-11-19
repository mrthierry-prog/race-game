
/* =================================
   RACE GAME
   Main JavaScript
================================= */

const game = {
    name: "RACE GAME",
    season: 2027,
    mode: "Career Mode",
    team: "Amateurteam"
};

function initializeGame() {
    console.log("RACE GAME is gestart!");
    console.log("Seizoen:", game.season);
}

initializeGame();

/* =================================
   NAVIGATIE
================================= */

const main = document.querySelector(".main-content");
const topbar = document.querySelector(".topbar");
const pageTitle = document.querySelector(".topbar h1");

const originalContent = [...main.children].filter(
    element => element !== topbar
);

const pageContainer = document.createElement("section");
pageContainer.className = "panel";
pageContainer.hidden = true;

main.insertBefore(pageContainer, topbar.nextSibling);

const pages = {
    "Mijn carrière": {
        title: "Mijn carrière",
        content: `
            <h2>Jouw wielercarrière</h2>
            <p class="muted">Van amateurteam naar de absolute top.</p>
            <div class="race-info">
                <div><strong>2027</strong><span>HUIDIG SEIZOEN</span></div>
                <div><strong>Amateur</strong><span>TEAMNIVEAU</span></div>
                <div><strong>0</strong><span>SEIZOENSWINS</span></div>
            </div>
        `
    },

    "Mijn team": {
        title: "Mijn team",
        content: `
            <h2>Teamselectie</h2>
            <p class="muted">Beheer je renners en ontdek hun specialiteiten.</p>
            <div class="race-info">
                <div><strong>12</strong><span>RENNERS</span></div>
                <div><strong>4</strong><span>VRIJE PLEKKEN</span></div>
                <div><strong>78%</strong><span>GEMIDDELDE VORM</span></div>
            </div>
        `
    },

    "Training": {
        title: "Training",
        content: `
            <h2>Trainingscentrum</h2>
            <p class="muted">Ontwikkel de kwaliteiten van jouw renners.</p>
            <div class="race-info">
                <div><strong>Uithouding</strong><span>TRAININGSTYPE</span></div>
                <div><strong>Sprint</strong><span>TRAININGSTYPE</span></div>
                <div><strong>Klimmen</strong><span>TRAININGSTYPE</span></div>
            </div>
        `
    },

    "Wedstrijdkalender": {
        title: "Wedstrijdkalender",
        content: `
            <h2>Wedstrijdseizoen 2027</h2>
            <p class="muted">Plan je wedstrijden en selecteer je renners.</p>
            <div class="race-info">
                <div><strong>15 MRT</strong><span>OMLOOP VAN DE KEMPEN</span></div>
                <div><strong>21 MRT</strong><span>GP ZUID-LIMBURG</span></div>
                <div><strong>28 MRT</strong><span>RONDE VAN BRABANT</span></div>
            </div>
        `
    },

    "Koerssimulator": {
        title: "Koerssimulator",
        content: `
            <h2>Live koerscentrum</h2>
            <p class="muted">Volg de wedstrijd en bepaal jouw tactiek.</p>
            <div class="race-info">
                <div><strong>146 KM</strong><span>KOERSAFSTAND</span></div>
                <div><strong>180</strong><span>RENNERS</span></div>
                <div><strong>00:00</strong><span>KOERSTIJD</span></div>
            </div>
            <p style="margin-top:25px;color:#72baff">
                De echte koerssimulator bouwen we later!
            </p>
        `
    },

    "Financiën": {
        title: "Financiën",
        content: `
            <h2>Teamfinanciën</h2>
            <p class="muted">Beheer het budget van jouw wielerteam.</p>
            <div class="race-info">
                <div><strong>€25.000</strong><span>TEAMBUDGET</span></div>
                <div><strong>€0</strong><span>INKOMSTEN</span></div>
                <div><strong>€0</strong><span>UITGAVEN</span></div>
            </div>
        `
    }
};

/* Pagina openen */

function showPage(name) {
    const isDashboard = name === "Dashboard";

    originalContent.forEach(element => {
        element.hidden = !isDashboard;
    });

    pageContainer.hidden = isDashboard;

    if (isDashboard) {
        pageTitle.textContent = "Dashboard";
    } else {
        const page = pages[name];

        if (!page) return;

        pageTitle.textContent = page.title;
        pageContainer.innerHTML = page.content;
    }

    document.querySelectorAll("nav a").forEach(link => {
        link.classList.toggle(
            "active",
            link.textContent.trim() === name
        );
    });
}

/* Klikken op het menu */

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const pageName = link.textContent.trim();
        showPage(pageName);
    });
});
// ================================
// RACE GAME - CARRIERE SYSTEEM
// ================================

let career = {
    started: false,
    teamName: "",
    teamColor: "#168bff",
    budget: 100000,
    season: 2027,
    wins: 0,
    races: 0,
    riders: 12
};

function startCareer(teamName, teamColor) {
    if (!teamName.trim()) {
        alert("Vul eerst een teamnaam in!");
        return;
    }

    career.started = true;
    career.teamName = teamName.trim();
    career.teamColor = teamColor;

    localStorage.setItem("raceGameCareer", JSON.stringify(career));

    alert("Je carrière is gestart! Welkom bij " + career.teamName + "!");
}

function loadCareer() {
    const savedCareer = localStorage.getItem("raceGameCareer");

    if (savedCareer) {
        career = JSON.parse(savedCareer);
    }
}

loadCareer();
