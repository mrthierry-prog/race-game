
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

function racePageContent() {

    // Maak de wielrenners als kleine SVG-tekeningen
    const riderGraphic = `
        <svg viewBox="0 0 100 70" class="cyclist-svg">
            <circle cx="20" cy="49" r="15" fill="none"
                stroke="#cbd5df" stroke-width="3"/>
            <circle cx="78" cy="49" r="15" fill="none"
                stroke="#cbd5df" stroke-width="3"/>
            <path d="M20 49 L43 25 L57 49 L20 49 L38 49 L78 49 L57 49 L43 25"
                fill="none" stroke="#168bff" stroke-width="3"/>
            <path d="M43 25 L37 17 L30 17"
                fill="none" stroke="#dce6f0" stroke-width="3"/>
            <circle cx="48" cy="10" r="7" fill="#e9b995"/>
            <path d="M40 10 Q45 -1 55 8 L54 12 Z"
                fill="#e8f1fa"/>
            <path d="M43 19 L60 22 L68 35 L54 37 L44 29 L34 34 L27 29 Z"
                fill="TEAMCOLOR" stroke="#101820" stroke-width="1.5"/>
            <path d="M43 29 L37 43 L29 46 M55 36 L62 44"
                fill="none" stroke="#e9b995" stroke-width="5"
                stroke-linecap="round"/>
            <path d="M48 37 L44 49 L38 55 M55 37 L63 48 L69 53"
                fill="none" stroke="#182431" stroke-width="5"
                stroke-linecap="round"/>
        </svg>
    `;

    const positions = [
        [8, 43], [12, 25], [14, 57], [18, 39],
        [21, 68], [24, 19], [27, 49], [30, 32],
        [33, 61], [36, 22], [39, 45], [42, 69]
    ];

    const riders = positions.map((pos, index) => `
        <div class="race-rider ${index === 0 ? "player" : ""}"
             style="left:${pos[0]}%;top:${pos[1]}%">
            ${riderGraphic.replace(
                "TEAMCOLOR",
                index === 0 ? "#168bff" : "#e7edf4"
            )}
        </div>
    `).join("");

    // Styling van de nieuwe koersweergave
    if (!document.getElementById("real-race-styles")) {
        const style = document.createElement("style");
        style.id = "real-race-styles";

        style.textContent = `
            .real-race {
                display:flex;
                flex-direction:column;
                gap:18px;
                color:#edf4fb;
            }

            .race-heading {
                background:linear-gradient(110deg,#101e2d,#080e16);
                border:1px solid #263b50;
                border-radius:12px;
                padding:22px;
            }

            .race-heading small {
                color:#168bff;
                font-weight:900;
                letter-spacing:2px;
            }

            .race-heading h2 {
                margin:8px 0;
                font-size:27px;
            }

            .camera-buttons {
                display:flex;
                gap:8px;
                flex-wrap:wrap;
            }

            .camera-button {
                background:#142336;
                color:#aebfd0;
                border:1px solid #30445b;
                padding:11px 16px;
                border-radius:6px;
                font-weight:800;
                cursor:pointer;
            }

            .camera-button.active {
                color:white;
                background:#124477;
                border-color:#168bff;
            }

            .race-scene {
                height:380px;
                position:relative;
                overflow:hidden;
                border-radius:12px;
                border:1px solid #40546a;
                background:#526c43;
            }

            .race-sky {
                position:absolute;
                inset:0;
                background:
                    linear-gradient(180deg,#9bb4c0 0%,#7b9875 48%,#34452e 100%);
            }

            .race-road {
                position:absolute;
                width:120%;
                height:68%;
                left:-10%;
                top:16%;
                background:
                    linear-gradient(180deg,#343a3e,#242a2e 50%,#343a3e);
                transform:rotate(-5deg);
                border-top:5px solid #aeb4b3;
                border-bottom:5px solid #aeb4b3;
                box-shadow:0 0 25px #1119;
            }

            .race-road::before {
                content:"";
                position:absolute;
                top:50%;
                left:0;
                width:100%;
                border-top:3px dashed #c5c8c0;
                opacity:.65;
            }

            .race-road::after {
                content:"";
                position:absolute;
                top:0;
                left:50%;
                width:3px;
                height:100%;
                background:#ffffff12;
            }

            .race-riders {
                position:absolute;
                inset:20px 10px;
            }

            .race-rider {
                position:absolute;
                width:48px;
                height:38px;
                z-index:3;
                transition:left .8s ease,top .8s ease;
                filter:drop-shadow(0 4px 3px #0009);
            }

            .race-rider.player {
                width:58px;
                height:45px;
                z-index:5;
                filter:drop-shadow(0 0 8px #168bff);
            }

            .cyclist-svg {
                width:100%;
                height:100%;
            }

            .race-rider.attack {
                filter:drop-shadow(0 0 12px #168bff);
            }

            .race-scene.rear-camera .race-road {
                width:155%;
                height:95%;
                left:-27%;
                top:18%;
                transform:perspective(400px) rotateX(35deg);
                border-radius:45% 45% 0 0;
            }

            .race-scene.rear-camera .race-riders {
                inset:30px 0 0;
                transform:scale(1.15);
            }

            .race-scene.rear-camera .race-rider {
                width:60px;
                height:48px;
            }

            .race-scene.rear-camera .race-rider.player {
                width:85px;
                height:65px;
                left:48% !important;
                top:68% !important;
            }

            .race-camera-label {
                position:absolute;
                top:14px;
                left:14px;
                z-index:10;
                background:#07111ddd;
                padding:8px 12px;
                border-radius:5px;
                color:white;
                font-size:10px;
                font-weight:900;
                letter-spacing:1px;
            }

            .race-live-dot {
                display:inline-block;
                width:7px;
                height:7px;
                border-radius:50%;
                background:#ff4545;
                margin-right:6px;
            }

            .race-stats {
                display:grid;
                grid-template-columns:repeat(3,1fr);
                gap:10px;
            }

            .race-stat-box {
                padding:16px;
                background:#111e2d;
                border:1px solid #293d53;
                border-radius:8px;
            }

            .race-stat-box span {
                display:block;
                color:#849ab1;
                font-size:10px;
                margin-bottom:7px;
            }

            .race-stat-box strong {
                font-size:21px;
            }

            .race-progress {
                height:8px;
                background:#263b50;
                border-radius:10px;
                overflow:hidden;
            }

            .race-progress-fill {
                height:100%;
                width:0;
                background:#168bff;
                transition:width .5s;
            }

            .race-tactics {
                display:grid;
                grid-template-columns:repeat(2,1fr);
                gap:10px;
            }

            .race-tactic {
                padding:15px;
                color:white;
                background:#17283a;
                border:1px solid #30465e;
                border-radius:7px;
                cursor:pointer;
                font-weight:800;
            }

            .race-tactic.selected {
                background:#124477;
                border-color:#168bff;
            }

            .race-start {
                padding:17px;
                color:white;
                background:#168bff;
                border:0;
                border-radius:6px;
                font-weight:900;
                cursor:pointer;
            }

            .race-log {
                background:#0b1521;
                padding:16px;
                border:1px solid #263b50;
                border-radius:8px;
                color:#aebfd0;
                min-height:60px;
                font-size:13px;
                line-height:1.7;
            }

            @media(max-width:600px) {
                .race-stats {
                    grid-template-columns:1fr;
                }
                .race-scene {
                    height:280px;
                }
            }
        `;

        document.head.appendChild(style);
    }

    return `
        <div class="real-race">

            <div class="race-heading">
                <small>RACE GAME / LIVE BROADCAST</small>
                <h2>OMLOOP VAN BRABANT</h2>
                <span style="color:#91a8bf">
                    Eendagskoers · 120 KM · SEIZOEN 2027
                </span>
            </div>

            <div class="camera-buttons">
                <button class="camera-button active"
                    onclick="setRaceCamera('aerial')">
                    ◈ HELIKOPTER
                </button>

                <button class="camera-button"
                    onclick="setRaceCamera('rear')">
                    ◈ ACHTERVOLGING
                </button>
            </div>

            <div class="race-scene" id="race-camera-scene">
                <div class="race-sky"></div>
                <div class="race-road"></div>

                <div class="race-camera-label">
                    <span class="race-live-dot"></span>
                    LIVE CAMERA 01
                </div>

                <div class="race-riders" id="race-riders">
                    ${riders}
                </div>
            </div>

            <div class="race-stats">
                <div class="race-stat-box">
                    <span>RESTANTE AFSTAND</span>
                    <strong id="race-distance">120 km</strong>
                </div>
                <div class="race-stat-box">
                    <span>GEMIDDELDE SNELHEID</span>
                    <strong id="race-speed">0 km/u</strong>
                </div>
                <div class="race-stat-box">
                    <span>KOERSFASE</span>
                    <strong id="race-phase">START</strong>
                </div>
            </div>

            <div>
                <div style="display:flex;justify-content:space-between;
                    margin-bottom:8px;font-size:11px">
                    <strong>KOERSVERLOOP</strong>
                    <span id="race-percent">0%</span>
                </div>
                <div class="race-progress">
                    <div class="race-progress-fill"
                        id="race-progress-fill"></div>
                </div>
            </div>

            <div style="color:#168bff;font-weight:900;font-size:11px;
                letter-spacing:1px">
                JOUW KOERSTACTIE
            </div>

            <div class="race-tactics">
                <button class="race-tactic selected"
                    data-tactic="Volgen">🚴 VOLGEN</button>
                <button class="race-tactic"
                    data-tactic="Aanvallen">⚡ AANVALLEN</button>
                <button class="race-tactic"
                    data-tactic="Energie sparen">🛡 ENERGIE SPAREN</button>
                <button class="race-tactic"
                    data-tactic="Sprinten">🏁 SPRINTEN</button>
            </div>

            <button class="race-start" id="race-start-button">
                START WEDSTRIJD →
            </button>

            <div class="race-heading">
                <small>LIVE KOERSBERICHTEN</small>
                <div class="race-log" id="race-log">
                    Het peloton staat klaar voor de start.
                </div>
            </div>

        </div>
    `;
}

function setRaceCamera(mode) {
    const scene = document.getElementById("race-camera-scene");
    if (!scene) return;

    scene.classList.toggle("rear-camera", mode === "rear");

    document.querySelectorAll(".camera-button").forEach(button => {
        button.classList.toggle(
            "active",
            button.textContent.includes(
                mode === "rear" ? "ACHTERVOLGING" : "HELIKOPTER"
            )
        );
    });
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
