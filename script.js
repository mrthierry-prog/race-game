
/* ==========================================
   RACE GAME - MAIN SYSTEM
========================================== */

const game = {
    name: "RACE GAME",
    season: 2027
};

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
        const saved = localStorage.getItem("raceGameCareer");
        if (saved) {
            career = { ...defaultCareer, ...JSON.parse(saved) };
        }
    } catch (error) {
        console.error("Could not load career:", error);
    }
}

function saveCareer() {
    localStorage.setItem("raceGameCareer", JSON.stringify(career));
}

loadCareer();


/* ==========================================
   CAREER DESIGN
========================================== */

const careerStyles = document.createElement("style");

careerStyles.textContent = `
.career-screen {
    color: #edf4fb;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.career-hero {
    min-height: 350px;
    padding: 35px;
    border-radius: 14px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background:
        linear-gradient(90deg, rgba(5,12,21,.97), rgba(5,12,21,.65), rgba(5,12,21,.2)),
        linear-gradient(0deg, rgba(5,12,21,.5), transparent),
        url('https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1600&q=85')
        center 45% / cover;
    border: 1px solid #263b50;
}

.career-eyebrow {
    color: #168bff;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 3px;
    margin-bottom: 16px;
}

.career-hero h2 {
    font-size: clamp(38px, 6vw, 66px);
    line-height: .98;
    letter-spacing: -2px;
    margin: 0;
    font-weight: 900;
    max-width: 600px;
}

.career-hero h2 span {
    color: #168bff;
}

.career-hero p {
    color: #bdcad8;
    max-width: 430px;
    line-height: 1.7;
    font-size: 14px;
    margin: 20px 0;
}

.career-tags {
    display: flex;
    gap: 9px;
    flex-wrap: wrap;
}

.career-tag {
    background: rgba(22,139,255,.15);
    border: 1px solid rgba(22,139,255,.4);
    color: #8ecaff;
    border-radius: 4px;
    padding: 7px 11px;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 1px;
}

.career-section-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.career-section-title h2 {
    margin: 0;
    font-size: 19px;
    letter-spacing: 1px;
}

.career-section-title span {
    font-size: 10px;
    color: #71869d;
    letter-spacing: 1px;
}

.career-facts {
    display: grid;
    grid-template-columns: repeat(2, minmax(0,1fr));
    gap: 14px;
}

.career-fact {
    background: #111e2d;
    border: 1px solid #263b50;
    border-radius: 9px;
    padding: 18px;
}

.career-fact span {
    display: block;
    color: #8299b0;
    font-size: 10px;
    letter-spacing: 1.5px;
    margin-bottom: 9px;
}

.career-fact strong {
    font-size: 23px;
    color: #fff;
}

.career-setup {
    background: #111e2d;
    border: 1px solid #263b50;
    border-radius: 12px;
    padding: 25px;
}

.career-setup-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
    margin-top: 22px;
}

.career-field {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.career-field label {
    color: #9eb1c5;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 1.5px;
}

.career-field input {
    width: 100%;
    box-sizing: border-box;
    background: #09131f;
    border: 1px solid #30465e;
    border-radius: 6px;
    padding: 15px;
    color: white;
    font-size: 14px;
    outline: none;
}

.career-field input:focus {
    border-color: #168bff;
}

.career-colors {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.career-color {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 3px solid transparent;
    outline: 1px solid transparent;
    cursor: pointer;
}

.career-color.selected {
    outline-color: white;
    border-color: #111e2d;
}

.career-start-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-top: 28px;
    padding-top: 22px;
    border-top: 1px solid #263b50;
}

.career-budget-label {
    color: #8299b0;
    font-size: 10px;
    letter-spacing: 1.5px;
}

.career-budget-value {
    color: white;
    font-size: 25px;
    font-weight: 900;
    margin-top: 5px;
}

.career-start-button {
    background: #168bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 17px 25px;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 1px;
    cursor: pointer;
    transition: .2s;
}

.career-start-button:hover {
    background: #0875df;
    transform: translateY(-2px);
}

.career-error {
    color: #ff7777;
    font-size: 12px;
    margin-top: 12px;
}

.career-overview {
    background: #111e2d;
    border: 1px solid #263b50;
    border-radius: 12px;
    padding: 25px;
}

.career-team-heading {
    border-left: 5px solid;
    padding-left: 18px;
    margin: 20px 0;
}

.career-team-heading h2 {
    margin: 0 0 7px;
    font-size: 28px;
}

.career-team-heading p {
    color: #8299b0;
    margin: 0;
    font-size: 12px;
}

@media (max-width: 650px) {
    .career-hero {
        padding: 24px;
        min-height: 300px;
    }

    .career-setup-grid {
        grid-template-columns: 1fr;
    }

    .career-start-bottom {
        align-items: stretch;
        flex-direction: column;
    }

    .career-start-button {
        width: 100%;
    }
}
`;

document.head.appendChild(careerStyles);


/* ==========================================
   CAREER SCREEN CONTENT
========================================== */

function careerPageContent() {
    if (!career.started) {
        return `
        <div class="career-screen">

            <section class="career-hero">
                <div class="career-eyebrow">
                    YOUR JOURNEY STARTS HERE
                </div>

                <h2>
                    BUILD YOUR<br>
                    <span>LEGACY.</span>
                </h2>

                <p>
                    Van een klein amateurteam naar de absolute top
                    van het wielrennen. Bouw jouw ploeg en schrijf geschiedenis.
                </p>

                <div class="career-tags">
                    <span class="career-tag">2027 SEASON</span>
                    <span class="career-tag">CAREER MODE</span>
                    <span class="career-tag">NEW CHALLENGE</span>
                </div>
            </section>

            <div class="career-section-title">
                <h2>CREATE YOUR TEAM</h2>
                <span>TEAM SETUP / 01</span>
            </div>

            <div class="career-facts">
                <div class="career-fact">
                    <span>STARTBUDGET</span>
                    <strong>€100.000</strong>
                </div>

                <div class="career-fact">
                    <span>TEAMNIVEAU</span>
                    <strong>AMATEUR</strong>
                </div>
            </div>

            <section class="career-setup">

                <div class="career-section-title">
                    <h2>TEAMGEGEVENS</h2>
                    <span>BUILD YOUR SQUAD</span>
                </div>

                <div class="career-setup-grid">

                    <div class="career-field">
                        <label for="career-team-name">TEAMNAAM</label>
                        <input
                            id="career-team-name"
                            type="text"
                            maxlength="30"
                            placeholder="Bijvoorbeeld: Blue Storm Racing"
                        >
                    </div>

                    <div class="career-field">
                        <label>TEAMKLEUR</label>

                        <div class="career-colors">
                            <button class="career-color selected"
                                type="button" data-color="#168bff"
                                style="background:#168bff"></button>

                            <button class="career-color"
                                type="button" data-color="#e63946"
                                style="background:#e63946"></button>

                            <button class="career-color"
                                type="button" data-color="#20b486"
                                style="background:#20b486"></button>

                            <button class="career-color"
                                type="button" data-color="#f0b429"
                                style="background:#f0b429"></button>

                            <button class="career-color"
                                type="button" data-color="#a855f7"
                                style="background:#a855f7"></button>

                            <button class="career-color"
                                type="button" data-color="#f5f5f5"
                                style="background:#f5f5f5"></button>
                        </div>
                    </div>

                </div>

                <div class="career-start-bottom">
                    <div>
                        <div class="career-budget-label">
                            AVAILABLE STARTING BUDGET
                        </div>
                        <div class="career-budget-value">€100.000</div>
                    </div>

                    <button class="career-start-button" id="start-career-button">
                        START CAREER →
                    </button>
                </div>

                <div id="career-error" class="career-error"></div>

            </section>
        </div>
        `;
    }

    return `
        <div class="career-screen">
            <section class="career-hero">
                <div class="career-eyebrow">YOUR JOURNEY HAS BEGUN</div>
                <h2>WELCOME TO<br><span>${escapeHTML(career.teamName)}</span></h2>
                <p>Het seizoen 2027 is begonnen. Bouw aan je team en jaag op overwinningen.</p>
                <div class="career-tags">
                    <span class="career-tag">SEASON 2027</span>
                    <span class="career-tag">CAREER MODE</span>
                </div>
            </section>

            <div class="career-overview">
                <div class="career-team-heading"
                    style="border-color:${career.teamColor}">
                    <h2>${escapeHTML(career.teamName)}</h2>
                    <p>AMATEUR TEAM · SEASON ${career.season}</p>
                </div>

                <div class="career-facts">
                    <div class="career-fact">
                        <span>TEAM BUDGET</span>
                        <strong>€${career.budget.toLocaleString("nl-NL")}</strong>
                    </div>
                    <div class="career-fact">
                        <span>OVERWINNINGEN</span>
                        <strong>${career.wins}</strong>
                    </div>
                    <div class="career-fact">
                        <span>GEREDEN KOERSEN</span>
                        <strong>${career.races}</strong>
                    </div>
                    <div class="career-fact">
                        <span>RENNERS</span>
                        <strong>${career.riders}</strong>
                    </div>
                </div>
            </div>
        </div>
    `;
}


/* ==========================================
   HELPER
========================================== */

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}


/* ==========================================
   PAGE SYSTEM
========================================== */

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
        content: careerPageContent
    },

    "Mijn team": {
        title: "Mijn team",
        content: () => `
            <h2>TEAM MANAGEMENT</h2>
            <p>Hier gaan we straks jouw renners beheren.</p>
        `
    },

    "Training": {
        title: "Training",
        content: () => `
            <h2>TRAINING CENTER</h2>
            <p>Hier gaan we straks je renners trainen.</p>
        `
    },

    "Wedstrijdkalender": {
        title: "Wedstrijdkalender",
        content: () => `
            <h2>RACE CALENDAR</h2>
            <p>Hier komen straks alle wedstrijden van het seizoen.</p>
        `
    },

    "Koerssimulator": {
        title: "Koerssimulator",
        content: () => `
            <h2>RACE SIMULATOR</h2>
            <p>Hier gaan we later de echte koerssimulator bouwen.</p>
        `
    },

    "Financiën": {
        title: "Financiën",
        content: () => `
            <h2>TEAM FINANCES</h2>
            <p>Hier kun je straks inkomsten en uitgaven beheren.</p>
        `
    }
};


/* ==========================================
   START CAREER BUTTON
========================================== */

let selectedTeamColor = "#168bff";

function connectCareerControls() {
    const colorButtons = pageContainer.querySelectorAll(".career-color");

    colorButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedTeamColor = button.dataset.color;

            colorButtons.forEach(item => {
                item.classList.toggle("selected", item === button);
            });
        });
    });

    const startButton = document.getElementById("start-career-button");

    if (startButton) {
        startButton.addEventListener("click", () => {
            const name = document.getElementById("career-team-name").value.trim();
            const error = document.getElementById("career-error");

            if (!name) {
                error.textContent = "Vul eerst een teamnaam in.";
                return;
            }

            career = {
                ...defaultCareer,
                started: true,
                teamName: name,
                teamColor: selectedTeamColor
            };

            saveCareer();
            showPage("Mijn carrière");
        });
    }
}


/* ==========================================
   SHOW PAGE
========================================== */

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
        pageContainer.innerHTML = page.content();

        if (name === "Mijn carrière") {
            connectCareerControls();
        }
    }

    document.querySelectorAll("nav a").forEach(link => {
        link.classList.toggle(
            "active",
            link.textContent.trim() === name
        );
    });
}


/* ==========================================
   NAVIGATION
========================================== */

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        showPage(link.textContent.trim());
    });
});

console.log("RACE GAME loaded!");

/* ==========================================
   RACE GAME - LIVE RACE SIMULATOR
========================================== */

let liveRace = {
    running: false,
    distance: 120,
    remaining: 120,
    speed: 0,
    tactic: "Volgen",
    timer: null
};

const raceStyles = document.createElement("style");

raceStyles.textContent = `
.live-race {
    display: flex;
    flex-direction: column;
    gap: 18px;
    color: #edf4fb;
}

.race-hero {
    background: linear-gradient(120deg, #101f30, #080f18);
    border: 1px solid #263b50;
    border-radius: 12px;
    padding: 24px;
}

.race-hero h2 {
    font-size: 27px;
    margin: 8px 0;
}

.race-label {
    color: #168bff;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 2px;
}

.race-track {
    position: relative;
    height: 240px;
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid #30465e;
    background:
        linear-gradient(0deg, #101820 0%, #101820 25%,
        #26333c 25%, #26333c 75%, #101820 75%);
}

.track-line {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    border-top: 3px dashed #d6dce1;
    opacity: .5;
}

.race-riders {
    position: absolute;
    inset: 25px 15px;
}

.race-rider {
    position: absolute;
    font-size: 24px;
    transition: left .8s ease, top .8s ease;
    filter: drop-shadow(0 2px 3px #000);
}

.race-rider.player {
    font-size: 30px;
    z-index: 3;
}

.race-rider.attack {
    filter: drop-shadow(0 0 7px #168bff);
}

.race-status {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}

.race-stat {
    background: #111e2d;
    border: 1px solid #263b50;
    border-radius: 8px;
    padding: 15px;
}

.race-stat span {
    display: block;
    color: #8196ad;
    font-size: 10px;
    letter-spacing: 1px;
    margin-bottom: 8px;
}

.race-stat strong {
    font-size: 21px;
}

.race-progress {
    height: 8px;
    background: #263b50;
    border-radius: 10px;
    overflow: hidden;
}

.race-progress-fill {
    height: 100%;
    width: 0%;
    background: #168bff;
    transition: width .5s;
}

.race-controls {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

.race-tactic {
    background: #17283a;
    border: 1px solid #30465e;
    color: #edf4fb;
    padding: 15px;
    border-radius: 7px;
    cursor: pointer;
    font-weight: 800;
    transition: .2s;
}

.race-tactic:hover,
.race-tactic.selected {
    background: #123b61;
    border-color: #168bff;
}

.race-start {
    background: #168bff;
    border: none;
    color: white;
    border-radius: 6px;
    padding: 16px;
    font-weight: 900;
    letter-spacing: 1px;
    cursor: pointer;
}

.race-start:hover {
    background: #0875df;
}

.race-log {
    background: #0b1521;
    border: 1px solid #263b50;
    padding: 15px;
    border-radius: 8px;
    min-height: 70px;
    color: #9eb1c5;
    font-size: 12px;
    line-height: 1.8;
}

@media (max-width: 600px) {
    .race-status {
        grid-template-columns: 1fr;
    }
}
`;

document.head.appendChild(raceStyles);


/* ==========================================
   RACE SCREEN
========================================== */

function racePageContent() {
    return `
        <div class="live-race">

            <div class="race-hero">
                <div class="race-label">RACE GAME / LIVE RACE</div>
                <h2>OMLOOP VAN BRABANT</h2>
                <p style="color:#91a8bf;margin:0">
                    Eendagskoers · 120 kilometer · 2027
                </p>
            </div>

            <div class="race-status">
                <div class="race-stat">
                    <span>RESTERENDE AFSTAND</span>
                    <strong id="race-distance">120 km</strong>
                </div>

                <div class="race-stat">
                    <span>GEMIDDELDE SNELHEID</span>
                    <strong id="race-speed">0 km/u</strong>
                </div>

                <div class="race-stat">
                    <span>KOERSFASE</span>
                    <strong id="race-phase">START</strong>
                </div>
            </div>

            <div>
                <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:11px">
                    <strong>KOERSVERLOOP</strong>
                    <span id="race-percent">0%</span>
                </div>
                <div class="race-progress">
                    <div class="race-progress-fill" id="race-progress-fill"></div>
                </div>
            </div>

            <div class="race-track">
                <div class="track-line"></div>
                <div class="race-riders" id="race-riders">
                    <span class="race-rider player" style="left:8%;top:43%">🚴</span>
                    <span class="race-rider" style="left:12%;top:22%">🚴</span>
                    <span class="race-rider" style="left:16%;top:58%">🚴</span>
                    <span class="race-rider" style="left:21%;top:34%">🚴</span>
                    <span class="race-rider" style="left:26%;top:68%">🚴</span>
                    <span class="race-rider" style="left:30%;top:18%">🚴</span>
                    <span class="race-rider" style="left:34%;top:48%">🚴</span>
                    <span class="race-rider" style="left:38%;top:73%">🚴</span>
                    <span class="race-rider" style="left:43%;top:30%">🚴</span>
                    <span class="race-rider" style="left:48%;top:55%">🚴</span>
                    <span class="race-rider" style="left:53%;top:15%">🚴</span>
                    <span class="race-rider" style="left:58%;top:65%">🚴</span>
                </div>
            </div>

            <div class="race-label">KIES JOUW KOERSTACTIE</div>

            <div class="race-controls">
                <button class="race-tactic selected" data-tactic="Volgen">
                    🚴 VOLGEN
                </button>
                <button class="race-tactic" data-tactic="Aanvallen">
                    ⚡ AANVALLEN
                </button>
                <button class="race-tactic" data-tactic="Energie sparen">
                    🛡️ ENERGIE SPAREN
                </button>
                <button class="race-tactic" data-tactic="Sprinten">
                    🏁 SPRINTEN
                </button>
            </div>

            <button class="race-start" id="race-start-button">
                START WEDSTRIJD →
            </button>

            <div class="race-hero">
                <div class="race-label">LIVE KOERSBERICHTEN</div>
                <div class="race-log" id="race-log">
                    De renners staan klaar voor de start.
                    Start de wedstrijd om de koers te volgen.
                </div>
            </div>

        </div>
    `;
}


/* ==========================================
   RACE SIMULATION
========================================== */

function stopRace() {
    if (liveRace.timer) {
        clearInterval(liveRace.timer);
        liveRace.timer = null;
    }
    liveRace.running = false;
}

function startRace() {
    stopRace();

    liveRace = {
        running: true,
        distance: 120,
        remaining: 120,
        speed: 0,
        tactic: "Volgen",
        timer: null
    };

    const startButton = document.getElementById("race-start-button");
    startButton.textContent = "WEDSTRIJD BEZIG...";
    startButton.disabled = true;

    document.getElementById("race-log").textContent =
        "🚩 Het startschot klinkt! Het peloton is vertrokken.";

    liveRace.timer = setInterval(updateRace, 1000);
}

function updateRace() {
    if (!liveRace.running) return;

    const tactic = liveRace.tactic;

    let speed = 40;

    if (tactic === "Aanvallen") speed = 46 + Math.random() * 5;
    if (tactic === "Volgen") speed = 39 + Math.random() * 4;
    if (tactic === "Energie sparen") speed = 34 + Math.random() * 3;
    if (tactic === "Sprinten") speed = 52 + Math.random() * 8;

    liveRace.speed = Math.round(speed);

    // Eén seconde simuleert ongeveer 500 meter koers.
    liveRace.remaining = Math.max(0, liveRace.remaining - 0.5);

    const completed =
        (liveRace.distance - liveRace.remaining) / liveRace.distance * 100;

    document.getElementById("race-distance").textContent =
        liveRace.remaining.toFixed(1) + " km";

    document.getElementById("race-speed").textContent =
        liveRace.speed + " km/u";

    document.getElementById("race-percent").textContent =
        Math.round(completed) + "%";

    document.getElementById("race-progress-fill").style.width =
        completed + "%";

    let phase = "PELOTON";

    if (liveRace.remaining < 15) phase = "FINALE";
    else if (liveRace.remaining < 45) phase = "SLOTFASE";
    else if (liveRace.remaining < 90) phase = "MIDDENKOERS";

    document.getElementById("race-phase").textContent = phase;

    const riders = document.querySelectorAll(".race-rider");

    riders.forEach((rider, index) => {
        const movement = 8 + Math.random() * 4 + completed * 0.3;
        const position = Math.min(90, movement + index * 2);

        rider.style.left = position + "%";
        rider.style.top = (12 + Math.random() * 68) + "%";

        rider.classList.toggle(
            "attack",
            tactic === "Aanvallen" && index === 0
        );
    });

    if (Math.round(completed) % 10 === 0) {
        document.getElementById("race-log").textContent =
            "📡 " + phase + ": het peloton rijdt " +
            liveRace.speed + " km/u. Jouw tactiek: " + tactic + ".";
    }

    if (liveRace.remaining <= 0) {
        finishRace();
    }
}

function finishRace() {
    stopRace();

    document.getElementById("race-phase").textContent = "FINISH";
    document.getElementById("race-log").textContent =
        "🏁 De finish! De wedstrijd is afgelopen. Dit is voorlopig een demo-uitslag.";

    document.getElementById("race-start-button").textContent =
        "START OPNIEUW";

    document.getElementById("race-start-button").disabled = false;
}


/* ==========================================
   RACE BUTTONS
========================================== */

function connectRaceControls() {
    const startButton = document.getElementById("race-start-button");

    if (startButton) {
        startButton.addEventListener("click", startRace);
    }

    document.querySelectorAll(".race-tactic").forEach(button => {
        button.addEventListener("click", () => {
            if (!liveRace.running) {
                liveRace.tactic = button.dataset.tactic;
            } else {
                liveRace.tactic = button.dataset.tactic;
            }

            document.querySelectorAll(".race-tactic").forEach(item => {
                item.classList.toggle("selected", item === button);
            });

            document.getElementById("race-log").textContent =
                "Tactiek gewijzigd: " + liveRace.tactic + ".";
        });
    });
}


/* ==========================================
   CONNECT TO PAGE SYSTEM
========================================== */

pages["Koerssimulator"] = {
    title: "Koerssimulator",
    content: racePageContent
};

// Vervang de bestaande showPage zodat de koersknoppen
// ook na het openen van de pagina worden gekoppeld.

const previousShowPage = showPage;

showPage = function(name) {
    if (name !== "Koerssimulator") {
        stopRace();
    }

    previousShowPage(name);

    if (name === "Koerssimulator") {
        connectRaceControls();
    }
};

console.log("LIVE RACE simulator geladen!");
