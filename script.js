
/* =================================
   RACE GAME
   Main JavaScript
================================= */

/* BASISINSTELLINGEN */

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
   CARRIERE OPSLAAN EN LADEN
================================= */

const defaultCareer = {
    started: false,
    teamName: "",
    teamColor: "#168bff",
    budget: 100000,
    season: 2027,
    wins: 0,
    races: 0,
    riders: 12
};

let career = { ...defaultCareer };

function loadCareer() {
    try {
        const savedCareer = localStorage.getItem("raceGameCareer");

        if (savedCareer) {
            career = {
                ...defaultCareer,
                ...JSON.parse(savedCareer)
            };
        }
    } catch (error) {
        console.error("Carrière kon niet worden geladen:", error);
    }
}

function saveCareer() {
    localStorage.setItem("raceGameCareer", JSON.stringify(career));
}

loadCareer();


/* =================================
   CARRIERE STARTEN
================================= */

function startCareer(teamName, teamColor) {
    if (!teamName || !teamName.trim()) {
        alert("Vul eerst een teamnaam in!");
        return;
    }

    career = {
        ...defaultCareer,
        started: true,
        teamName: teamName.trim(),
        teamColor: teamColor
    };

    saveCareer();
    showPage("Mijn carrière");

    alert("Je carrière is gestart! Welkom bij " + career.teamName + "!");
}


/* =================================
   HULPFUNCTIE
================================= */

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}


/* =================================
   CARRIEREPAGINA
================================= */

function careerPageContent() {
    if (!career.started) {
        return `
            <div class="career-start">
                <h2>START JOUW CARRIÈRE</h2>
                <p class="muted">
                    Bouw jouw eigen wielerteam en schrijf geschiedenis.
                </p>

                <div class="career-form">
                    <label for="team-name">TEAMNAAM</label>

                    <input
                        type="text"
                        id="team-name"
                        placeholder="Bijvoorbeeld: Blue Storm Racing"
                        maxlength="30"
                    >

                    <label for="team-color">TEAMKLEUR</label>

                    <select id="team-color">
                        <option value="#168bff">Electric Blue</option>
                        <option value="#e63946">Racing Red</option>
                        <option value="#20b486">Emerald Green</option>
                        <option value="#f0b429">Championship Gold</option>
                        <option value="#a855f7">Purple</option>
                    </select>

                    <div class="career-budget">
                        <span>STARTBUDGET</span>
                        <strong>€100.000</strong>
                    </div>

                    <button
                        class="career-button"
                        onclick="startCareer(
                            document.getElementById('team-name').value,
                            document.getElementById('team-color').value
                        )"
                    >
                        START CARRIÈRE →
                    </button>
                </div>
            </div>
        `;
    }

    return `
        <div class="career-overview">
            <h2>WELKOM BIJ ${escapeHTML(career.teamName)}</h2>

            <p class="muted">
                Jouw wielercarrière is begonnen. Tijd om geschiedenis te schrijven!
            </p>

            <div class="race-info">
                <div>
                    <strong>${career.season}</strong>
                    <span>HUIDIG SEIZOEN</span>
                </div>

                <div>
                    <strong>€${career.budget.toLocaleString("nl-NL")}</strong>
                    <span>TEAMBUDGET</span>
                </div>

                <div>
                    <strong>${career.wins}</strong>
                    <span>OVERWINNINGEN</span>
                </div>

                <div>
                    <strong>${career.riders}</strong>
                    <span>RENNERS</span>
                </div>
            </div>

            <div class="career-team-color"
                 style="border-left: 5px solid ${career.teamColor}; padding: 15px; margin-top: 25px;">
                <strong>JOUW TEAMKLEUR</strong>
                <p>${career.teamColor}</p>
            </div>
        </div>
    `;
}


/* =================================
   PAGINA-INHOUD
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
        content: () => careerPageContent()
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


/* =================================
   PAGINA OPENEN
================================= */

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

        pageContainer.innerHTML =
            typeof page.content === "function"
                ? page.content()
                : page.content;
    }

    document.querySelectorAll("nav a").forEach(link => {
        link.classList.toggle(
            "active",
            link.textContent.trim() === name
        );
    });
}


/* =================================
   MENU-KNOPPEN
================================= */

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const pageName = link.textContent.trim();

        showPage(pageName);
    });
});


/* =================================
   RACE GAME GESTART
================================= */

console.log("RACE GAME is klaar!");
console.log("Carrière geladen:", career.started);
