
/* ==========================================
   RACE GAME - COMPLETE GAME SYSTEM
========================================== */

const game = {
    name: "RACE GAME",
    season: 2027
};

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

try {
    const saved = localStorage.getItem("raceGameCareer");
    if (saved) {
        career = { ...career, ...JSON.parse(saved) };
    }
} catch (error) {
    console.warn("Opgeslagen carrière kon niet worden geladen.");
}

function saveCareer() {
    localStorage.setItem("raceGameCareer", JSON.stringify(career));
}

/* ==========================================
   EXTRA STYLING
========================================== */

const extraStyle = document.createElement("style");

extraStyle.textContent = `
.career-start {
    min-height:520px;
    padding:35px;
    border-radius:12px;
    background:
        linear-gradient(90deg,#07111e 0%,#0b1c30e8 55%,#07111e88),
        linear-gradient(135deg,#102a43,#07111e);
    border:1px solid #263e57;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:22px;
    position:relative;
    overflow:hidden;
}

.career-start::after {
    content:"RACE";
    position:absolute;
    right:-25px;
    bottom:-60px;
    font-size:180px;
    font-weight:1000;
    color:#ffffff08;
    pointer-events:none;
}

.career-kicker {
    color:#168bff;
    font-size:11px;
    font-weight:900;
    letter-spacing:3px;
}

.career-start h2 {
    font-size:clamp(38px,6vw,66px);
    line-height:1;
    margin:0;
    font-weight:1000;
}

.career-start h2 span {
    color:#168bff;
}

.career-description {
    color:#9db1c7;
    max-width:520px;
    line-height:1.7;
}

.career-setup {
    display:grid;
    grid-template-columns:minmax(0,400px) minmax(180px,1fr);
    gap:25px;
    align-items:end;
    max-width:750px;
}

.career-field label {
    display:block;
    font-size:10px;
    font-weight:900;
    color:#8fa6bf;
    letter-spacing:1px;
    margin-bottom:9px;
}

.career-field input {
    width:100%;
    padding:14px;
    background:#0a1725;
    border:1px solid #314b65;
    color:white;
    border-radius:6px;
    font-size:15px;
}

.color-options {
    display:flex;
    gap:10px;
    flex-wrap:wrap;
}

.color-choice {
    width:32px;
    height:32px;
    border-radius:50%;
    border:3px solid transparent;
    cursor:pointer;
}

.color-choice.selected {
    outline:2px solid white;
    outline-offset:3px;
}

.start-career-button {
    max-width:320px;
    padding:17px 25px;
    border:0;
    background:#168bff;
    color:white;
    border-radius:5px;
    font-weight:1000;
    letter-spacing:1px;
    cursor:pointer;
}

.start-career-button:hover {
    background:#0874dc;
}

.career-overview {
    display:grid;
    gap:18px;
}

.career-banner {
    padding:28px;
    background:linear-gradient(110deg,#102944,#0b1726);
    border:1px solid #29435d;
    border-radius:10px;
}

.career-banner h2 {
    font-size:32px;
    margin:8px 0;
}

.career-banner span {
    color:#168bff;
    font-size:11px;
    font-weight:900;
    letter-spacing:2px;
}

.career-cards {
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:12px;
}

.career-card {
    padding:20px;
    background:#111e2d;
    border:1px solid #293d53;
    border-radius:8px;
}

.career-card small {
    color:#8fa6bf;
    font-size:10px;
}

.career-card strong {
    display:block;
    font-size:24px;
    margin-top:8px;
}

.race-page {
    display:flex;
    flex-direction:column;
    gap:16px;
}

.race-header {
    padding:22px;
    background:linear-gradient(110deg,#102944,#0b1726);
    border:1px solid #29435d;
    border-radius:10px;
}

.race-header small {
    color:#168bff;
    font-weight:900;
    letter-spacing:2px;
}

.race-header h2 {
    margin:8px 0;
    font-size:27px;
}

.race-camera-buttons {
    display:flex;
    gap:8px;
    flex-wrap:wrap;
}

.race-camera-button,
.race-tactic {
    padding:12px 16px;
    background:#17283a;
    border:1px solid #30465e;
    color:white;
    border-radius:6px;
    font-weight:800;
    cursor:pointer;
}

.race-camera-button.active,
.race-tactic.selected {
    background:#124477;
    border-color:#168bff;
}

.race-scene {
    height:360px;
    position:relative;
    overflow:hidden;
    border:1px solid #40546a;
    border-radius:10px;
    background:linear-gradient(#9aaf9d,#59784d);
}

.race-road {
    position:absolute;
    width:130%;
    height:65%;
    left:-15%;
    top:18%;
    background:#343b40;
    border-top:5px solid #aeb4b3;
    border-bottom:5px solid #aeb4b3;
    transform:rotate(-5deg);
}

.race-road::after {
    content:"";
    position:absolute;
    top:50%;
    width:100%;
    border-top:3px dashed #ddd;
}

.race-scene.rear-camera .race-road {
    width:160%;
    height:95%;
    left:-30%;
    top:20%;
    transform:perspective(400px) rotateX(35deg);
    border-radius:45% 45% 0 0;
}

.race-riders {
    position:absolute;
    inset:20px;
}

.race-rider {
    position:absolute;
    width:45px;
    height:35px;
    transition:all .8s ease;
    z-index:3;
    filter:drop-shadow(0 3px 3px #0008);
}

.race-rider svg {
    width:100%;
    height:100%;
}

.race-rider.player {
    width:58px;
    height:45px;
    z-index:5;
    filter:drop-shadow(0 0 8px #168bff);
}

.race-scene.rear-camera .race-rider.player {
    width:85px;
    height:65px;
    left:48% !important;
    top:68% !important;
}

.race-live-label {
    position:absolute;
    z-index:8;
    top:12px;
    left:12px;
    padding:8px 12px;
    background:#07111ddd;
    border-radius:5px;
    font-size:10px;
    font-weight:900;
}

.race-stats {
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:10px;
}

.race-stat {
    background:#111e2d;
    border:1px solid #293d53;
    padding:16px;
    border-radius:8px;
}

.race-stat span {
    display:block;
    color:#8fa6bf;
    font-size:10px;
    margin-bottom:8px;
}

.race-stat strong {
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

.race-start-button {
    padding:17px;
    background:#168bff;
    color:white;
    border:0;
    border-radius:6px;
    font-weight:1000;
    cursor:pointer;
}

.race-log {
    padding:16px;
    background:#0b1521;
    border:1px solid #293d53;
    border-radius:8px;
    color:#aebfd0;
    line-height:1.7;
    min-height:55px;
}

@media(max-width:700px) {
    .career-setup,
    .career-cards,
    .race-stats {
        grid-template-columns:1fr;
    }

    .career-start {
        padding:22px;
    }
}
`;

document.head.appendChild(extraStyle);


/* ==========================================
   PAGE SETUP
========================================== */

const main = document.querySelector(".main-content");
const topbar = document.querySelector(".topbar");
const pageTitle = document.querySelector(".topbar h1");

if (!main || !topbar || !pageTitle) {
    console.error("RACE GAME: pagina-elementen niet gevonden.");
} else {

    const originalContent = [...main.children].filter(
        element => element !== topbar
    );

    const pageContainer = document.createElement("section");
    pageContainer.className = "panel";
    pageContainer.hidden = true;

    main.insertBefore(pageContainer, topbar.nextSibling);


    /* ======================================
       CAREER SCREEN
    ====================================== */

    function careerPageContent() {
        if (!career.started) {
            return `
                <div class="career-start">
                    <div class="career-kicker">
                        RACE GAME / CAREER MODE
                    </div>

                    <h2>BUILD YOUR<br><span>LEGACY.</span></h2>

                    <p class="career-description">
                        Begin jouw eigen wielerverhaal.
                        Richt je team op, ontdek talent en bouw
                        aan een succesvolle wielercarrière.
                    </p>

                    <div class="career-setup">
                        <div class="career-field">
                            <label>TEAMNAAM</label>
                            <input id="career-team-name"
                                placeholder="Bijvoorbeeld Blue Racing Team"
                                maxlength="30">
                        </div>

                        <div class="career-field">
                            <label>TEAMKLEUR</label>
                            <div class="color-options">
                                <button class="color-choice selected"
                                    data-color="#168bff"
                                    style="background:#168bff"></button>
                                <button class="color-choice"
                                    data-color="#e53935"
                                    style="background:#e53935"></button>
                                <button class="color-choice"
                                    data-color="#00b894"
                                    style="background:#00b894"></button>
                                <button class="color-choice"
                                    data-color="#f1c40f"
                                    style="background:#f1c40f"></button>
                                <button class="color-choice"
                                    data-color="#9b59b6"
                                    style="background:#9b59b6"></button>
                            </div>
                        </div>
                    </div>

                    <button class="start-career-button"
                        id="start-career-button">
                        START JOUW CARRIÈRE →
                    </button>

                    <small style="color:#71869d">
                        SEIZOEN 2027 · NIEUW TEAM · NIEUW BEGIN
                    </small>
                </div>
            `;
        }

        return `
            <div class="career-overview">
                <div class="career-banner">
                    <span>JOUW WIELERVERHAAL</span>
                    <h2>${escapeHTML(career.teamName)}</h2>
                    <p style="color:#9db1c7">
                        Seizoen ${career.season} · Professioneel teambeheer
                    </p>
                </div>

                <div class="career-cards">
                    <div class="career-card">
                        <small>TEAM BUDGET</small>
                        <strong>€${career.budget.toLocaleString("nl-NL")}</strong>
                    </div>
                    <div class="career-card">
                        <small>OVERWINNINGEN</small>
                        <strong>${career.wins}</strong>
                    </div>
                    <div class="career-card">
                        <small>RENNERS</small>
                        <strong>${career.riders}</strong>
                    </div>
                </div>

                <div class="career-banner">
                    <span>VOLGENDE STAP</span>
                    <h3>Jouw seizoen begint nu.</h3>
                    <p style="color:#9db1c7">
                        Bouw je selectie uit en bereid je voor op de eerste koers.
                    </p>
                </div>
            </div>
        `;
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]);
    }

    let selectedTeamColor = career.teamColor;

    function connectCareerControls() {
        document.querySelectorAll(".color-choice").forEach(button => {
            button.addEventListener("click", () => {
                selectedTeamColor = button.dataset.color;

                document.querySelectorAll(".color-choice")
                    .forEach(item => {
                        item.classList.toggle("selected", item === button);
                    });
            });
        });

        const startButton =
            document.getElementById("start-career-button");

        if (startButton) {
            startButton.addEventListener("click", () => {
                const input =
                    document.getElementById("career-team-name");

                const name = input.value.trim();

                if (!name) {
                    alert("Vul eerst een teamnaam in!");
                    input.focus();
                    return;
                }

                career.started = true;
                career.teamName = name;
                career.teamColor = selectedTeamColor;

                saveCareer();
                showPage("Mijn carrière");
            });
        }
    }


    /* ======================================
       RACE SIMULATOR
    ====================================== */

    let race = {
        running: false,
        remaining: 120,
        speed: 0,
        tactic: "Volgen",
        camera: "aerial",
        timer: null
    };

    const riderSVG = (color) => `
        <svg viewBox="0 0 100 70">
            <circle cx="20" cy="49" r="15"
                fill="none" stroke="#dce4ed" stroke-width="3"/>
            <circle cx="78" cy="49" r="15"
                fill="none" stroke="#dce4ed" stroke-width="3"/>
            <path d="M20 49 L43 25 L57 49 L20 49
                M43 25 L78 49 M57 49 L78 49"
                fill="none" stroke="#cbd5df" stroke-width="3"/>
            <circle cx="48" cy="10" r="7" fill="#e9b995"/>
            <path d="M40 10 Q45 -1 55 8 L54 12Z" fill="#e8f1fa"/>
            <path d="M43 19 L60 22 L68 35 L54 37
                L44 29 L34 34 L27 29Z"
                fill="${color}"/>
            <path d="M43 29 L37 43 L29 46
                M55 36 L62 44"
                fill="none" stroke="#e9b995" stroke-width="5"
                stroke-linecap="round"/>
            <path d="M48 37 L44 49 L38 55
                M55 37 L63 48 L69 53"
                fill="none" stroke="#182431" stroke-width="5"
                stroke-linecap="round"/>
        </svg>
    `;

    function racePageContent() {
        const positions = [
            [8,43],[12,25],[14,57],[18,39],
            [21,68],[24,19],[27,49],[30,32],
            [33,61],[36,22],[39,45],[42,69],
            [45,34],[48,56],[51,17],[54,72],
            [57,42],[60,25],[63,60],[66,38]
        ];

        return `
            <div class="race-page">
                <div class="race-header">
                    <small>RACE GAME / LIVE BROADCAST</small>
                    <h2>OMLOOP VAN BRABANT</h2>
                    <span style="color:#91a8bf">
                        Eendagskoers · 120 KM · 2027
                    </span>
                </div>

                <div class="race-camera-buttons">
                    <button class="race-camera-button active"
                        data-camera="aerial">◈ HELIKOPTER</button>
                    <button class="race-camera-button"
                        data-camera="rear">◈ ACHTERVOLGING</button>
                </div>

                <div class="race-scene" id="race-scene">
                    <div class="race-road"></div>
                    <div class="race-live-label">● LIVE CAMERA 01</div>

                    <div class="race-riders" id="race-riders">
                        ${positions.map((position, index) => `
                            <div class="race-rider ${index === 0 ? "player" : ""}"
                                data-rider="${index}"
                                style="left:${position[0]}%;top:${position[1]}%">
                                ${riderSVG(
                                    index === 0 ? career.teamColor : "#e7edf4"
                                )}
                            </div>
                        `).join("")}
                    </div>
                </div>

                <div class="race-stats">
                    <div class="race-stat">
                        <span>RESTANTE AFSTAND</span>
                        <strong id="race-distance">120 km</strong>
                    </div>
                    <div class="race-stat">
                        <span>SNELHEID</span>
                        <strong id="race-speed">0 km/u</strong>
                    </div>
                    <div class="race-stat">
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

                <strong style="color:#168bff;font-size:11px">
                    KIES JOUW KOERSTACTIE
                </strong>

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

                <button class="race-start-button" id="race-start">
                    START WEDSTRIJD →
                </button>

                <div class="race-header">
                    <small>LIVE KOERSBERICHTEN</small>
                    <div class="race-log" id="race-log">
                        Het peloton staat klaar voor de start.
                    </div>
                </div>
            </div>
        `;
    }

    function stopRace() {
        if (race.timer) {
            clearInterval(race.timer);
            race.timer = null;
        }
        race.running = false;
    }

    function startRace() {
        stopRace();

        race.remaining = 120;
        race.speed = 0;
        race.running = true;

        const button = document.getElementById("race-start");
        if (button) button.textContent = "WEDSTRIJD BEZIG...";

        const log = document.getElementById("race-log");
        if (log) log.textContent =
            "🚩 Het startschot klinkt! Het peloton is vertrokken.";

        race.timer = setInterval(updateRace, 1000);
    }

    function updateRace() {
        if (!race.running) return;

        let speed = 40;

        if (race.tactic === "Aanvallen") speed = 46 + Math.random() * 5;
        if (race.tactic === "Energie sparen") speed = 34 + Math.random() * 3;
        if (race.tactic === "Sprinten") speed = 52 + Math.random() * 8;
        if (race.tactic === "Volgen") speed = 39 + Math.random() * 4;

        race.speed = Math.round(speed);
        race.remaining = Math.max(0, race.remaining - 0.5);

        const completed = (120 - race.remaining) / 120 * 100;

        document.getElementById("race-distance").textContent =
            race.remaining.toFixed(1) + " km";

        document.getElementById("race-speed").textContent =
            race.speed + " km/u";

        document.getElementById("race-percent").textContent =
            Math.round(completed) + "%";

        document.getElementById("race-progress-fill").style.width =
            completed + "%";

        let phase = "PELOTON";
        if (race.remaining < 15) phase = "FINALE";
        else if (race.remaining < 45) phase = "SLOTFASE";
        else if (race.remaining < 90) phase = "MIDDENKOERS";

        document.getElementById("race-phase").textContent = phase;

        document.querySelectorAll(".race-rider").forEach((rider, index) => {
            if (race.camera === "rear" && index === 0) return;

            const base = 8 + index * 2;
            const movement = Math.min(90, base + Math.random() * 5);

            rider.style.left = movement + "%";
            rider.style.top = (12 + Math.random() * 68) + "%";
        });

        if (Math.round(completed) % 10 === 0) {
            document.getElementById("race-log").textContent =
                "📡 " + phase + ". Het peloton rijdt " +
                race.speed + " km/u. Tactiek: " + race.tactic + ".";
        }

        if (race.remaining <= 0) {
            stopRace();
            document.getElementById("race-phase").textContent = "FINISH";
            document.getElementById("race-log").textContent =
                "🏁 De finish! De testwedstrijd is afgelopen.";
            document.getElementById("race-start").textContent =
                "START OPNIEUW →";
        }
    }

    function connectRaceControls() {
        document.querySelectorAll(".race-camera-button").forEach(button => {
            button.addEventListener("click", () => {
                race.camera = button.dataset.camera;

                document.getElementById("race-scene")
                    .classList.toggle("rear-camera", race.camera === "rear");

                document.querySelectorAll(".race-camera-button")
                    .forEach(item => {
                        item.classList.toggle("active", item === button);
                    });
            });
        });

        document.querySelectorAll(".race-tactic").forEach(button => {
            button.addEventListener("click", () => {
                race.tactic = button.dataset.tactic;

                document.querySelectorAll(".race-tactic")
                    .forEach(item => {
                        item.classList.toggle("selected", item === button);
                    });

                document.getElementById("race-log").textContent =
                    "Tactiek gewijzigd: " + race.tactic + ".";
            });
        });

        const startButton = document.getElementById("race-start");
        if (startButton) {
            startButton.addEventListener("click", startRace);
        }
    }


    /* ======================================
       OTHER GAME PAGES
    ====================================== */

    const pages = {
        "Mijn carrière": {
            title: "Mijn carrière",
            content: careerPageContent
        },

        "Mijn team": {
            title: "Mijn team",
            content: () => `
                <h2>Teamselectie</h2>
                <p class="muted">Beheer jouw renners en bouw je team uit.</p>
                <div class="race-info">
                    <div><strong>${career.riders}</strong><span>RENNERS</span></div>
                    <div><strong>4</strong><span>VRIJE PLEKKEN</span></div>
                    <div><strong>78%</strong><span>GEMIDDELDE VORM</span></div>
                </div>
            `
        },

        "Training": {
            title: "Training",
            content: () => `
                <h2>Trainingscentrum</h2>
                <p class="muted">Ontwikkel de kwaliteiten van jouw renners.</p>
                <div class="race-info">
                    <div><strong>Uithouding</strong><span>TRAINING</span></div>
                    <div><strong>Sprint</strong><span>TRAINING</span></div>
                    <div><strong>Klimmen</strong><span>TRAINING</span></div>
                </div>
            `
        },

        "Wedstrijdkalender": {
            title: "Wedstrijdkalender",
            content: () => `
                <h2>Wedstrijdseizoen 2027</h2>
                <p class="muted">Plan je wedstrijden en bereid je team voor.</p>
                <div class="race-info">
                    <div><strong>15 MRT</strong><span>OMLOOP VAN DE KEMPEN</span></div>
                    <div><strong>21 MRT</strong><span>GP ZUID-LIMBURG</span></div>
                    <div><strong>28 MRT</strong><span>RONDE VAN BRABANT</span></div>
                </div>
            `
        },

        "Koerssimulator": {
            title: "Koerssimulator",
            content: racePageContent
        },

        "Financiën": {
            title: "Financiën",
            content: () => `
                <h2>Teamfinanciën</h2>
                <p class="muted">Beheer het budget van jouw wielerteam.</p>
                <div class="race-info">
                    <div><strong>€${career.budget.toLocaleString("nl-NL")}</strong><span>TEAMBUDGET</span></div>
                    <div><strong>€0</strong><span>INKOMSTEN</span></div>
                    <div><strong>€0</strong><span>UITGAVEN</span></div>
                </div>
            `
        }
    };


    /* ======================================
       NAVIGATION
    ====================================== */

    function showPage(name) {
        const isDashboard = name === "Dashboard";

        if (name !== "Koerssimulator") {
            stopRace();
        }

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

        if (name === "Mijn carrière") {
            connectCareerControls();
        }

        if (name === "Koerssimulator") {
            connectRaceControls();
        }
    }

    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            showPage(link.textContent.trim());
        });
    });

    console.log("RACE GAME is succesvol geladen!");
}
