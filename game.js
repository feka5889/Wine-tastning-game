const firebaseConfig = {
  apiKey: "AIzaSyDrIbleUKKI6ebwtMKwVWN0PK1ikxuFdhE",
  authDomain: "vinspel.firebaseapp.com",
  databaseURL: "https://vinspel-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vinspel",
  storageBucket: "vinspel.firebasestorage.app",
  messagingSenderId: "865809904871",
  appId: "1:865809904871:web:57449d098182ef5c8b1e42",
  measurementId: "G-E8BBGS4MHT"
};

const DEFAULT_AROMAS = [
  "röda bär",
  "mörka bär",
  "körsbär",
  "plommon",
  "citrus",
  "örter",
  "kryddig",
  "lavendel",
  "peppar",
  "salvia",
  "fat",
  "vanilj",
  "ceder",
  "choklad",
  "tobak",
  "läder",
  "jordig",
  "mineral"
];

const COUNTRY_META = {
  Spanien: {
    path: "M56 366 L87 323 L133 305 L208 292 L301 294 L386 302 L445 320 L489 345 L513 378 L505 413 L470 444 L421 458 L347 474 L264 485 L186 483 L123 475 L80 449 L58 410 Z",
    labelX: 170,
    labelY: 525
  },
  Frankrike: {
    path: "M350 106 L398 84 L467 79 L520 92 L572 122 L608 159 L632 204 L638 252 L626 304 L599 349 L563 383 L517 406 L468 416 L426 407 L386 387 L355 352 L334 310 L324 262 L325 210 L333 166 Z",
    labelX: 436,
    labelY: 246
  },
  Italien: {
    path: "M706 142 L743 155 L779 180 L797 215 L794 248 L771 278 L740 298 L748 333 L770 371 L799 412 L803 449 L793 486 L775 527 L759 564 L740 600 L720 591 L715 552 L707 504 L696 458 L676 422 L653 382 L636 345 L629 308 L633 274 L647 240 L667 211 L685 181 Z M632 616 L682 621 L707 650 L694 665 L645 660 L620 638 Z",
    labelX: 736,
    labelY: 474
  }
};

const REGION_META = {
  "Norra Spanien": {
    country: "Spanien",
    x: 285,
    y: 328,
    districtInfo:
      "Norra Spanien rymmer klassiska områden som Rioja. Stilen är ofta strukturerad med mörk frukt, kryddor, fattoner och tydlig friskhet."
  },
  "Södra Rhône": {
    country: "Frankrike",
    x: 530,
    y: 342,
    districtInfo:
      "Södra Rhône ger ofta kryddiga och generösa röda viner med mörka bär, örter och varmfruktig stil. Côtes du Rhône är ett av de mest kända områdena här."
  },
  Veneto: {
    country: "Italien",
    x: 731,
    y: 264,
    districtInfo:
      "Veneto är hem för Valpolicella och Ripasso. Vinerna härifrån har ofta körsbärsfrukt, örtighet, frisk syra och i ripasso-stil mer djup, krydda och chokladton."
  }
};

const SYSTEMBOLAGET_LINKS = [
  "https://www.systembolaget.se/produkt/vin/zecci-7418901/",
  "https://www.systembolaget.se/produkt/vin/alain-jaume-7203401/",
  "https://www.systembolaget.se/produkt/vin/baron-de-ley-252501/"
];

const SYSTEMBOLAGET_CATALOG = {
  "7418901": {
    name: "Zecci Valpolicella Ripasso Superiore",
    systembolagetUrl: SYSTEMBOLAGET_LINKS[0],
    country: "Italien",
    region: "Veneto",
    clocks: { fyllighet: 9, stravhet: 8, fruktsyra: 9 },
    aromas: ["körsbär", "plommon", "kryddig", "choklad", "örter"],
    summary:
      "Nyanserad, kryddig smak med fatkaraktär, inslag av mörka körsbär, choklad, salvia, plommon, sandelträ och vanilj.",
    districtInfo:
      "Veneto är regionen, och just det här vinet kommer från Valpolicella Ripasso. Stilen är fruktig och kryddig med mörka körsbär, örter, chokladton och hög fruktsyra.",
    source: "Systembolaget"
  },
  "7203401": {
    name: "Alain Jaume Grand Veneur Organic Reserve",
    systembolagetUrl: SYSTEMBOLAGET_LINKS[1],
    country: "Frankrike",
    region: "Södra Rhône",
    clocks: { fyllighet: 8, stravhet: 8, fruktsyra: 9 },
    aromas: ["mörka bär", "kryddig", "örter", "lavendel", "peppar"],
    summary:
      "Fruktig smak med inslag av skogshallon, lavendel, salvia, mörka körsbär och vitpeppar.",
    districtInfo:
      "Södra Rhône är regionen, och Côtes du Rhône är en av dess mest kända appellationer. Vinerna är ofta kryddiga med mörka bär, örter och pepprig ton.",
    source: "Systembolaget"
  },
  "252501": {
    name: "Barón de Ley Reserva",
    systembolagetUrl: SYSTEMBOLAGET_LINKS[2],
    country: "Spanien",
    region: "Norra Spanien",
    clocks: { fyllighet: 9, stravhet: 9, fruktsyra: 9 },
    aromas: ["mörka bär", "fat", "choklad", "tobak", "kryddig", "läder"],
    summary:
      "Kryddig, nyanserad smak med fatkaraktär och inslag av mörka körsbär, choklad, tobak, ceder, vanilj och kanel.",
    districtInfo:
      "Norra Spanien rymmer Rioja, där tempranillo och fatlagring ger tydlig struktur och toner av mörka bär, ceder, vanilj och tobak.",
    source: "Systembolaget och kompletterande produktprofil"
  }
};

const DEFAULT_WINES = SYSTEMBOLAGET_LINKS.map(link => createWineFromCatalog(link));

const state = {
  role: null,
  sessionCode: null,
  playerId: null,
  playerName: null,
  currentWine: 0,
  playerWine: 0,
  roundStatus: "lobby",
  wines: [],
  draftGuesses: {},
  localDraftGuesses: {},
  localDirty: {},
  submitted: false,
  scores: {},
  mapLookup: {}
};

const elements = {
  landing: document.getElementById("landing"),
  hostSetup: document.getElementById("host-setup"),
  playerJoin: document.getElementById("player-join"),
  playerGame: document.getElementById("player-game"),
  configPanel: document.getElementById("config-panel"),
  sessionPill: document.getElementById("session-pill"),
  sessionCode: document.getElementById("session-code"),
  playerList: document.getElementById("player-list"),
  statusText: document.getElementById("status-text"),
  wineGrid: document.getElementById("wine-grid"),
  results: document.getElementById("results"),
  stats: document.getElementById("stats"),
  playerWineTitle: document.getElementById("player-wine-title"),
  roundBadge: document.getElementById("round-badge"),
  wineTabs: document.getElementById("wine-tabs"),
  guessCountry: document.getElementById("guess-country"),
  guessRegion: document.getElementById("guess-region"),
  map: document.getElementById("map"),
  aromaTags: document.getElementById("aroma-tags"),
  playerSummary: document.getElementById("player-summary"),
  regionInfo: document.getElementById("region-info"),
  saveGuess: document.getElementById("save-guess"),
  wineGlassFigure: document.getElementById("wine-glass-figure"),
  wineNote: document.getElementById("wine-note"),
  wineRating: document.getElementById("wine-rating"),
  playerResults: document.getElementById("player-results"),
  playerLeaderboardWrap: document.getElementById("player-leaderboard-wrap"),
  submitModal: document.getElementById("submit-modal"),
  cancelSubmit: document.getElementById("cancel-submit"),
  confirmSubmit: document.getElementById("confirm-submit"),
  submitGuess: document.getElementById("submit-guess")
};

let db = null;

function cloneValue(value) {
  return window.structuredClone ? window.structuredClone(value) : structuredCloneFallback(value);
}

function createWineFromCatalog(link) {
  const productId = extractProductId(link);
  const wine = SYSTEMBOLAGET_CATALOG[productId];
  return wine ? cloneValue(wine) : null;
}

function extractProductId(link) {
  const match = String(link || "").match(/-(\d{6,7})\/?$/);
  return match ? match[1] : null;
}

function slugToName(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function inferRegionInfo(region, country, summary) {
  if (REGION_META[region]?.districtInfo) return REGION_META[region].districtInfo;
  return `${region} i ${country} brukar ge viner som speglar stilen i provningsvinet: ${summary}`;
}

function structuredCloneFallback(value) {
  return JSON.parse(JSON.stringify(value));
}

function showPanel(panel) {
  [elements.landing, elements.hostSetup, elements.playerJoin, elements.playerGame, elements.configPanel]
    .forEach(section => section.classList.add("hidden"));
  panel.classList.remove("hidden");
}

function generateCode() {
  const letters = "ABCDEFGHJKMNPQRSTUVWXYZ";
  const nums = "23456789";
  return `${letters[Math.floor(Math.random() * letters.length)]}${letters[Math.floor(Math.random() * letters.length)]}${nums[Math.floor(Math.random() * nums.length)]}${nums[Math.floor(Math.random() * nums.length)]}`;
}

function ensurePlayerId() {
  const stored = localStorage.getItem("winePlayerId");
  if (stored) {
    state.playerId = stored;
    return;
  }
  const id = `p_${Math.random().toString(36).slice(2, 9)}`;
  localStorage.setItem("winePlayerId", id);
  state.playerId = id;
}

function initFirebase() {
  if (firebaseConfig.apiKey === "REPLACE_ME") {
    showPanel(elements.configPanel);
    const template = `// Fyll i din Firebase-konfiguration i game.js\nconst firebaseConfig = {\n  apiKey: "...",\n  authDomain: "...",\n  databaseURL: "...",\n  projectId: "...",\n  storageBucket: "...",\n  messagingSenderId: "...",\n  appId: "..."\n};`;
    document.getElementById("config-template").textContent = template;
    return false;
  }
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  db = firebase.database();
  return true;
}

function setSessionPill(code) {
  elements.sessionPill.textContent = code ? `Session ${code}` : "Ingen session";
}

function makeDial(containerId, onSelect) {
  const dial = document.getElementById(containerId);
  dial.innerHTML = "";
  const radius = 70;
  for (let i = 1; i <= 12; i += 1) {
    const angle = (i - 3) * (Math.PI / 6);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = i;
    btn.style.left = `${85 + radius * Math.cos(angle) - 17}px`;
    btn.style.top = `${85 + radius * Math.sin(angle) - 17}px`;
    btn.addEventListener("click", () => {
      setDialValue(containerId, i);
      onSelect(i);
    });
    dial.appendChild(btn);
  }
}

function setDialValue(containerId, value) {
  const dial = document.getElementById(containerId);
  dial.querySelectorAll("button").forEach(button => {
    const number = Number(button.textContent);
    button.classList.toggle("active", Boolean(value) && number <= value);
  });
}

function getDialValue(containerId) {
  const active = Array.from(document.querySelectorAll(`#${containerId} button.active`)).map(button => Number(button.textContent));
  return active.length ? Math.max(...active) : null;
}

function normalizeAroma(value) {
  return value
    .toLowerCase()
    .replace(/[.]/g, "")
    .trim();
}

function scoreAromaMatch(actualAromas, guessedAromas) {
  if (!actualAromas.length || !guessedAromas.length) return 0;
  const actualSet = new Set(actualAromas.map(normalizeAroma));
  const guessedSet = new Set(guessedAromas.map(normalizeAroma));
  const matches = Array.from(guessedSet).filter(item => actualSet.has(item));
  const unionSize = new Set([...actualSet, ...guessedSet]).size;
  return Math.round((matches.length / unionSize) * 4);
}

function renderRatingButtons() {
  elements.wineGlassFigure.innerHTML = `
    <svg class="glass-svg" viewBox="0 0 140 190" aria-hidden="true">
      <defs>
        <clipPath id="wine-bowl-clip">
          <path d="M36 18 H104 C103 53 95 78 82 96 H58 C45 78 37 53 36 18 Z"></path>
        </clipPath>
      </defs>
      <path d="M36 18 H104 C103 53 95 78 82 96 H58 C45 78 37 53 36 18 Z" fill="rgba(255,255,255,0.09)" stroke="rgba(255,255,255,0.82)" stroke-width="3"></path>
      <rect id="wine-fill" x="34" y="82" width="72" height="0" fill="#8b1e3f" clip-path="url(#wine-bowl-clip)"></rect>
      <ellipse id="wine-surface" cx="70" cy="82" rx="34" ry="7" fill="#b23b5d" opacity="0" clip-path="url(#wine-bowl-clip)"></ellipse>
      <path d="M70 96 L70 150" stroke="rgba(255,255,255,0.82)" stroke-width="4" stroke-linecap="round"></path>
      <path d="M49 160 C60 156 80 156 91 160" stroke="rgba(255,255,255,0.82)" stroke-width="4" stroke-linecap="round" fill="none"></path>
    </svg>
  `;
  elements.wineRating.addEventListener("input", () => {
    if (state.submitted) return;
    setRatingValue(Number(elements.wineRating.value));
  });
  setRatingValue(Number(elements.wineRating.value));
}

function setRatingValue(value) {
  const safeValue = Math.max(0, Math.min(5, Number(value) || 0));
  elements.wineRating.value = String(safeValue);
  document.getElementById("wine-rating-value").textContent = String(safeValue);
  const ratio = safeValue / 5;
  const maxFillHeight = 58;
  const fillHeight = maxFillHeight * ratio;
  const fillTop = 84 - fillHeight;
  const fill = document.getElementById("wine-fill");
  const surface = document.getElementById("wine-surface");
  if (fill) {
    fill.setAttribute("y", String(fillTop));
    fill.setAttribute("height", String(fillHeight));
  }
  if (surface) {
    surface.setAttribute("cy", String(fillTop));
    surface.setAttribute("opacity", fillHeight > 0 ? "0.95" : "0");
  }
}

function getRatingValue() {
  const value = Number(elements.wineRating.value);
  return value > 0 ? value : null;
}

function getSessionAromas(wines) {
  const aromas = Array.from(
    new Set(
      (wines || [])
        .flatMap(wine => wine.aromas || [])
        .map(aroma => aroma.trim())
        .filter(Boolean)
    )
  );
  return aromas.length ? aromas : DEFAULT_AROMAS;
}

function getGuessForWine(index) {
  const submittedGuess = state.submitted ? state.submissionGuesses?.[index] : null;
  return submittedGuess || state.localDraftGuesses?.[index] || state.draftGuesses?.[index] || null;
}

function cacheCurrentWineDraft(isDirty = true) {
  if (state.submitted || !elements.playerGame || elements.playerGame.classList.contains("hidden")) return;
  const guess = getCurrentGuessFromUI();
  state.localDraftGuesses[state.playerWine] = guess;
  state.localDirty[state.playerWine] = isDirty;
  renderTabStates();
}

function buildMapData(wines) {
  const lookup = {};
  const countries = [];
  const seenCountries = new Set();
  const regions = [];
  const seenRegions = new Set();

  (wines || []).forEach(wine => {
    if (wine.country && COUNTRY_META[wine.country] && !seenCountries.has(wine.country)) {
      seenCountries.add(wine.country);
      countries.push({ name: wine.country, ...COUNTRY_META[wine.country] });
    }
    if (wine.region && REGION_META[wine.region] && !seenRegions.has(wine.region)) {
      seenRegions.add(wine.region);
      const info = {
        name: wine.region,
        country: wine.country,
        x: REGION_META[wine.region].x,
        y: REGION_META[wine.region].y,
        districtInfo: wine.districtInfo || REGION_META[wine.region].districtInfo || wine.summary || ""
      };
      regions.push(info);
      lookup[wine.region] = info;
    }
  });

  state.mapLookup = lookup;
  return { countries, regions };
}

function renderCountryOptions(wines) {
  const countries = Array.from(new Set((wines || []).map(wine => wine.country).filter(Boolean)));
  elements.guessCountry.innerHTML = `<option value="">Välj land</option>${countries
    .map(country => `<option value="${country}">${country}</option>`)
    .join("")}`;
}

function showRegionInfo(regionName) {
  const region = state.mapLookup[regionName];
  if (!region) {
    elements.regionInfo.textContent = "Tryck på ett distrikt för att se stil och ledtrådar.";
    return;
  }
  elements.regionInfo.innerHTML = `<strong>${region.name}</strong><span>${region.districtInfo}</span>`;
}

function makeMap(wines) {
  const mapData = buildMapData(wines);
  if (!mapData.countries.length) {
    elements.map.innerHTML = `<p class="muted">Kartan visas när värden har sparat viner med land och distrikt.</p>`;
    showRegionInfo(null);
    return;
  }

  elements.map.innerHTML = `
    <svg viewBox="0 0 820 620" aria-label="Vinkarta">
      <defs>
        <linearGradient id="sea" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#d9f0ea"></stop>
          <stop offset="100%" stop-color="#b9dfd4"></stop>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="820" height="620" rx="28" fill="url(#sea)"></rect>
      <path d="M564 0 H820 V224 L782 230 L744 220 L714 203 L692 184 L663 181 L637 196 L619 214 L600 228 L581 221 L572 196 L560 168 Z" fill="#f4b135" opacity="0.9"></path>
      <path d="M758 236 L820 236 V620 H712 L730 577 L748 531 L766 474 L771 434 L766 397 L746 361 L725 331 L715 301 L738 279 Z" fill="#2a69b8" opacity="0.16"></path>
      <path d="M0 0 H248 L266 46 L272 102 L258 146 L226 158 L182 151 L138 144 L86 141 L34 133 L0 114 Z" fill="#eef6f4" opacity="0.85"></path>
      <path class="coast-line" d="M36 92 H786"></path>
      <path class="coast-line" d="M36 548 H786"></path>
      <g>
        ${mapData.countries
          .map(
            country => `
              <path class="country-shape ${country.name}" d="${country.path}"></path>
              <text class="country-label" x="${country.labelX}" y="${country.labelY}">${country.name}</text>
            `
          )
          .join("")}
      </g>
      <g>
        ${mapData.regions
          .map(
            region => {
              const labelWidth = Math.max(112, region.name.length * 11);
              const labelX = region.x + 18;
              const labelY = region.y - 18;
              return `
                <circle class="region-dot" data-region="${region.name}" data-country="${region.country}" cx="${region.x}" cy="${region.y}" r="11"></circle>
                <rect class="region-chip" x="${labelX}" y="${labelY}" width="${labelWidth}" height="30" rx="2"></rect>
                <text class="region-label" x="${labelX + 12}" y="${labelY + 20}">${region.name}</text>
              `;
            }
          )
          .join("")}
      </g>
    </svg>
  `;

  elements.map.querySelectorAll(".region-dot").forEach(dot => {
    dot.addEventListener("click", () => {
      elements.map.querySelectorAll(".region-dot").forEach(node => node.classList.remove("active"));
      dot.classList.add("active");
      elements.guessRegion.value = dot.dataset.region;
      if (!elements.guessCountry.value) {
        elements.guessCountry.value = dot.dataset.country;
      }
      showRegionInfo(dot.dataset.region);
      cacheCurrentWineDraft(true);
    });
  });

  showRegionInfo(elements.guessRegion.value || null);
}

function makeTags(wines) {
  elements.aromaTags.innerHTML = "";
  getSessionAromas(wines).forEach(aroma => {
    const tag = document.createElement("button");
    tag.type = "button";
    tag.className = "tag";
    tag.textContent = aroma;
    tag.addEventListener("click", () => {
      tag.classList.toggle("active");
      cacheCurrentWineDraft(true);
    });
    elements.aromaTags.appendChild(tag);
  });
}

function collectTagValues() {
  return Array.from(elements.aromaTags.querySelectorAll(".tag.active")).map(tag => tag.textContent);
}

function getCurrentGuessFromUI() {
  return {
    country: elements.guessCountry.value,
    region: elements.guessRegion.value,
    clocks: {
      fyllighet: getDialValue("dial-fyllighet"),
      stravhet: getDialValue("dial-stravhet"),
      fruktsyra: getDialValue("dial-fruktsyra")
    },
    aromas: collectTagValues(),
    note: elements.wineNote.value.trim(),
    rating: getRatingValue(),
    updatedAt: Date.now()
  };
}

function setInputsDisabled(disabled) {
  [
    elements.guessCountry,
    elements.wineNote,
    elements.wineRating,
    ...elements.wineTabs.querySelectorAll(".tab"),
    ...elements.aromaTags.querySelectorAll(".tag"),
    ...document.querySelectorAll(".dial button"),
    ...elements.map.querySelectorAll(".region-dot")
  ].forEach(node => {
    if (node.tagName === "SELECT" || node.tagName === "BUTTON" || node.tagName === "TEXTAREA" || node.tagName === "INPUT" || node.classList.contains("region-dot")) {
      if ("disabled" in node) {
        node.disabled = disabled;
      }
      if (disabled) {
        node.classList.add("disabled");
      } else {
        node.classList.remove("disabled");
      }
      if (node.classList.contains("region-dot")) {
        node.style.pointerEvents = disabled ? "none" : "auto";
      }
    }
  });
  elements.saveGuess.disabled = disabled;
  elements.submitGuess.disabled = disabled;
}

function renderTabStates() {
  elements.wineTabs.querySelectorAll(".tab").forEach(tab => {
    const index = Number(tab.dataset.wine);
    tab.classList.toggle("active", index === state.playerWine);
    tab.classList.toggle("saved", Boolean(getGuessForWine(index)));
  });
}

function updatePlayerRound(data) {
  if (!data) return;
  cacheCurrentWineDraft(Boolean(state.localDirty[state.playerWine]));
  state.currentWine = data.currentWine ?? 0;
  state.roundStatus = data.status || "lobby";
  state.wines = data.wines || [];
  state.submitted = Boolean(data.submissions?.[state.playerId]);
  state.submissionGuesses = data.submissions?.[state.playerId]?.guesses || {};
  state.draftGuesses = state.submitted ? state.submissionGuesses : data.drafts?.[state.playerId] || {};
  if (state.submitted) {
    state.localDraftGuesses = cloneValue(state.submissionGuesses);
    state.localDirty = {};
  } else {
    Object.keys(state.draftGuesses).forEach(index => {
      if (!state.localDirty[index]) {
        state.localDraftGuesses[index] = cloneValue(state.draftGuesses[index]);
      }
    });
    Object.keys(state.localDraftGuesses).forEach(index => {
      if (!state.draftGuesses[index] && !state.localDirty[index]) {
        delete state.localDraftGuesses[index];
      }
    });
  }
  renderCountryOptions(state.wines);
  makeMap(state.wines);
  makeTags(state.wines);
  elements.playerWineTitle.textContent = `Vin ${state.playerWine + 1}`;
  elements.roundBadge.textContent = state.roundStatus === "round" ? "Gissa nu" : "Vänta";
  renderTabStates();
  setInputsDisabled(state.submitted);
  loadGuessForWine(state.playerWine);
}

function applyScores(scores) {
  state.scores = scores || {};
  const mine = state.scores[state.playerId];
  if (mine) {
    elements.playerSummary.textContent = `Din totalscore: ${mine.total} poäng.`;
    elements.playerLeaderboardWrap.classList.remove("hidden");
  }
  if (state.submitted) {
    renderPlayerLeaderboard();
  }
}

function renderPlayerLeaderboard() {
  const sorted = Object.entries(state.scores || {})
    .map(([playerId, score]) => ({ playerId, ...score }))
    .sort((a, b) => b.total - a.total);
  elements.playerResults.innerHTML = sorted
    .map(
      (player, rank) => `
        <div class="result-card">
          <strong>${rank + 1}. ${player.name}</strong>
          <div class="muted">Total: ${player.total} poäng</div>
        </div>
      `
    )
    .join("");
}

function renderPlayers(players = {}) {
  elements.playerList.innerHTML = "";
  Object.values(players).forEach(player => {
    const pill = document.createElement("div");
    pill.className = "player-pill";
    pill.textContent = player.name;
    elements.playerList.appendChild(pill);
  });
  elements.statusText.textContent = `Spelare: ${Object.keys(players).length}`;
}

function renderWineCards(wines) {
  elements.wineGrid.innerHTML = "";
  wines.forEach((wine, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>Vin ${index + 1}</h3>
      <label>
        <span>Systembolaget-länk</span>
        <input type="url" data-field="systembolagetUrl" value="${wine.systembolagetUrl || ""}" placeholder="https://www.systembolaget.se/produkt/..." />
      </label>
      <label>
        <span>Vinnamn</span>
        <input type="text" data-field="name" value="${wine.name || ""}" placeholder="Ex. Chianti Classico" />
      </label>
      <div class="form-grid">
        <label>
          <span>Land</span>
          <select data-field="country">
            <option value="">Välj</option>
            <option value="Frankrike">Frankrike</option>
            <option value="Italien">Italien</option>
            <option value="Spanien">Spanien</option>
          </select>
        </label>
        <label>
          <span>Distrikt</span>
          <input type="text" data-field="region" placeholder="Ex. Rioja" />
        </label>
      </div>
      <div class="form-grid">
        <label>
          <span>Fyllighet (1-12)</span>
          <input type="number" min="1" max="12" data-field="fyllighet" value="${wine.clocks?.fyllighet || ""}" />
        </label>
        <label>
          <span>Strävhet (1-12)</span>
          <input type="number" min="1" max="12" data-field="stravhet" value="${wine.clocks?.stravhet || ""}" />
        </label>
        <label>
          <span>Fruktsyra (1-12)</span>
          <input type="number" min="1" max="12" data-field="fruktsyra" value="${wine.clocks?.fruktsyra || ""}" />
        </label>
      </div>
      <label>
        <span>Doft & smak (komma-separerat)</span>
        <input type="text" data-field="aromas" value="${(wine.aromas || []).join(", ")}" placeholder="Ex. körsbär, ek, kryddig" />
      </label>
      <label>
        <span>Distriktsinfo på kartan</span>
        <textarea rows="3" data-field="districtInfo" placeholder="Kort stilbeskrivning för området.">${wine.districtInfo || ""}</textarea>
      </label>
      <div class="action-row">
        <button class="ghost" data-action="systembolaget">Läs från Systembolaget-länk</button>
        <button class="ghost" data-action="fetch">Hämta info online</button>
        <button class="ghost" data-action="save">Spara</button>
      </div>
      <p class="muted" data-field="summary">${wine.summary || ""}</p>
    `;

    const select = card.querySelector("select[data-field='country']");
    if (wine.country) select.value = wine.country;
    card.querySelector("input[data-field='region']").value = wine.region || "";

    card.querySelector("button[data-action='systembolaget']").addEventListener("click", () => importSystembolagetWine(index, card));
    card.querySelector("button[data-action='fetch']").addEventListener("click", () => autoFetchWine(index, card));
    card.querySelector("button[data-action='save']").addEventListener("click", () => saveWine(index, card));

    elements.wineGrid.appendChild(card);
  });
}

function fillCardWithWine(card, wine) {
  card.querySelector("input[data-field='systembolagetUrl']").value = wine.systembolagetUrl || "";
  card.querySelector("input[data-field='name']").value = wine.name || "";
  card.querySelector("select[data-field='country']").value = wine.country || "";
  card.querySelector("input[data-field='region']").value = wine.region || "";
  card.querySelector("input[data-field='fyllighet']").value = wine.clocks?.fyllighet || "";
  card.querySelector("input[data-field='stravhet']").value = wine.clocks?.stravhet || "";
  card.querySelector("input[data-field='fruktsyra']").value = wine.clocks?.fruktsyra || "";
  card.querySelector("input[data-field='aromas']").value = (wine.aromas || []).join(", ");
  card.querySelector("textarea[data-field='districtInfo']").value = wine.districtInfo || "";
  card.querySelector("p[data-field='summary']").textContent = wine.summary || "";
}

async function fetchSystembolagetPage(url) {
  const proxyUrl = `https://r.jina.ai/http://${url.replace(/^https?:\/\//, "")}`;
  const response = await fetch(proxyUrl);
  if (!response.ok) {
    throw new Error("fetch_failed");
  }
  return response.text();
}

function parseClockValue(content, label) {
  const regex = new RegExp(`${label}[\\s\\S]{0,80}?(\\d{1,2})\\s*(?:av 12|/12)`, "i");
  const match = content.match(regex);
  return match ? Number(match[1]) : null;
}

function parseSystembolagetText(url, content) {
  const titleMatch = content.match(/^Title:\\s*(.+)$/m);
  const title = titleMatch ? titleMatch[1].replace(/\s*- Systembolaget.*$/, "").trim() : slugToName(url.split("/").filter(Boolean).slice(-2, -1)[0] || "Vin");
  const country = ["Frankrike", "Italien", "Spanien"].find(item => content.includes(item)) || "";
  const region = Object.keys(REGION_META).find(item => content.includes(item)) || "";
  const summaryMatch = content.match(/(Nyanserad|Kryddig|Fruktig)[^.]{0,260}\./i);
  const summary = summaryMatch ? summaryMatch[0].trim() : "";
  const aromas = DEFAULT_AROMAS.filter(item => content.toLowerCase().includes(item.toLowerCase()));

  return {
    name: title,
    systembolagetUrl: url,
    country,
    region,
    clocks: {
      fyllighet: parseClockValue(content, "Fyllighet"),
      stravhet: parseClockValue(content, "Strävhet"),
      fruktsyra: parseClockValue(content, "Fruktsyra")
    },
    aromas,
    summary,
    districtInfo: inferRegionInfo(region, country, summary),
    source: "Systembolaget-länk"
  };
}

async function importSystembolagetWine(index, card) {
  const link = card.querySelector("input[data-field='systembolagetUrl']").value.trim();
  const summaryEl = card.querySelector("p[data-field='summary']");
  if (!link) {
    summaryEl.textContent = "Fyll i en Systembolaget-länk först.";
    return;
  }

  const productId = extractProductId(link);
  if (productId && SYSTEMBOLAGET_CATALOG[productId]) {
    const wine = cloneValue(SYSTEMBOLAGET_CATALOG[productId]);
    fillCardWithWine(card, wine);
    saveWine(index, card);
    return;
  }

  summaryEl.textContent = "Försöker läsa från länken...";
  try {
    const content = await fetchSystembolagetPage(link);
    const wine = parseSystembolagetText(link, content);
    fillCardWithWine(card, wine);
    saveWine(index, card);
  } catch (error) {
    summaryEl.textContent = "Kunde inte läsa länken. Använd manuell inmatning eller någon av standardlänkarna.";
  }
}

async function autoFetchWine(index, card) {
  const name = card.querySelector("input[data-field='name']").value.trim();
  const summaryEl = card.querySelector("p[data-field='summary']");
  if (!name) {
    summaryEl.textContent = "Fyll i ett vinnamn först.";
    return;
  }

  summaryEl.textContent = "Hämtar info...";
  try {
    const searchUrl = `https://sv.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(name)}&limit=1&namespace=0&format=json&origin=*`;
    const searchResp = await fetch(searchUrl);
    const searchData = await searchResp.json();
    const title = searchData[1]?.[0];
    if (!title) {
      summaryEl.textContent = "Hittade inget på Wikipedia.";
      return;
    }
    const summaryUrl = `https://sv.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const summaryResp = await fetch(summaryUrl);
    const summaryData = await summaryResp.json();
    const extract = summaryData.extract || "";
    summaryEl.textContent = extract;

    const country = ["Frankrike", "Italien", "Spanien"].find(item => extract.includes(item)) || "";
    const region = Object.keys(REGION_META).find(item => extract.includes(item)) || "";

    if (country) card.querySelector("select[data-field='country']").value = country;
    if (region) {
      card.querySelector("input[data-field='region']").value = region;
      card.querySelector("textarea[data-field='districtInfo']").value = inferRegionInfo(region, country, extract);
    }
  } catch (error) {
    summaryEl.textContent = "Kunde inte hämta info.";
  }
}

function saveWine(index, card) {
  const wine = {
    systembolagetUrl: card.querySelector("input[data-field='systembolagetUrl']").value.trim(),
    name: card.querySelector("input[data-field='name']").value.trim(),
    country: card.querySelector("select[data-field='country']").value,
    region: card.querySelector("input[data-field='region']").value.trim(),
    clocks: {
      fyllighet: Number(card.querySelector("input[data-field='fyllighet']").value) || null,
      stravhet: Number(card.querySelector("input[data-field='stravhet']").value) || null,
      fruktsyra: Number(card.querySelector("input[data-field='fruktsyra']").value) || null
    },
    aromas: card.querySelector("input[data-field='aromas']").value
      .split(",")
      .map(item => item.trim())
      .filter(Boolean),
    districtInfo: card.querySelector("textarea[data-field='districtInfo']").value.trim(),
    summary: card.querySelector("p[data-field='summary']").textContent.trim()
  };

  db.ref(`sessions/${state.sessionCode}/wines/${index}`).set(wine);
}

function setPlayerWine(index) {
  if (index !== state.playerWine) {
    cacheCurrentWineDraft(Boolean(state.localDirty[state.playerWine]));
  }
  state.playerWine = index;
  elements.playerWineTitle.textContent = `Vin ${index + 1}`;
  renderTabStates();
  loadGuessForWine(index);
}

function clearGuessUI() {
  elements.guessCountry.value = "";
  elements.guessRegion.value = "";
  elements.wineNote.value = "";
  elements.map.querySelectorAll(".region-dot").forEach(dot => dot.classList.remove("active"));
  elements.aromaTags.querySelectorAll(".tag").forEach(tag => tag.classList.remove("active"));
  setDialValue("dial-fyllighet", null);
  setDialValue("dial-stravhet", null);
  setDialValue("dial-fruktsyra", null);
  setRatingValue(0);
  showRegionInfo(null);
}

async function loadGuessForWine(index) {
  clearGuessUI();
  if (!state.sessionCode || !state.playerId || !db) return;
  const guess = getGuessForWine(index);
  if (!guess) return;

  elements.guessCountry.value = guess.country || "";
  elements.guessRegion.value = guess.region || "";
  if (guess.region) {
    elements.map.querySelectorAll(".region-dot").forEach(dot => {
      if (dot.dataset.region === guess.region) {
        dot.classList.add("active");
      }
    });
    showRegionInfo(guess.region);
  }
  setDialValue("dial-fyllighet", guess.clocks?.fyllighet || null);
  setDialValue("dial-stravhet", guess.clocks?.stravhet || null);
  setDialValue("dial-fruktsyra", guess.clocks?.fruktsyra || null);
  elements.wineNote.value = guess.note || "";
  setRatingValue(guess.rating || 0);
  elements.aromaTags.querySelectorAll(".tag").forEach(tag => {
    if (guess.aromas?.includes(tag.textContent)) {
      tag.classList.add("active");
    }
  });
}

function saveDraftGuess() {
  if (state.submitted) return;
  cacheCurrentWineDraft(false);
  const guess = cloneValue(state.localDraftGuesses[state.playerWine]);
  state.draftGuesses[state.playerWine] = guess;
  state.localDirty[state.playerWine] = false;
  renderTabStates();
  db.ref(`sessions/${state.sessionCode}/drafts/${state.playerId}/${state.playerWine}`).set(guess);
  elements.playerSummary.textContent = `Vin ${state.playerWine + 1} sparat.`;
}

function calculateScore(wine, guess) {
  if (!wine || !guess) return 0;
  let score = 0;

  if (wine.country && guess.country === wine.country) score += 3;
  if (wine.region && guess.region === wine.region) score += 4;

  ["fyllighet", "stravhet", "fruktsyra"].forEach(key => {
    const actual = wine.clocks?.[key];
    const guessed = guess.clocks?.[key];
    if (!actual || !guessed) return;
    const diff = Math.min(Math.abs(actual - guessed), 12 - Math.abs(actual - guessed));
    if (diff <= 1) score += 2;
    else if (diff <= 3) score += 1;
  });

  score += scoreAromaMatch(wine.aromas || [], guess.aromas || []);
  return score;
}

function getWineDisplayName(wine, index) {
  return wine?.name || `Vin ${index + 1}`;
}

function getAverage(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function getStdDev(values) {
  if (values.length <= 1) return 0;
  const avg = getAverage(values);
  const variance = getAverage(values.map(value => (value - avg) ** 2));
  return Math.sqrt(variance);
}

function renderStats(data, scores) {
  const wines = data.wines || [];
  const submissions = data.submissions || {};
  const playerIds = Object.keys(submissions);

  if (!wines.length || !playerIds.length) {
    elements.stats.innerHTML = "";
    return;
  }

  const wineStats = wines.map((wine, index) => {
    const ratings = [];
    const scoreValues = [];
    let exactCountryHits = 0;
    let exactRegionHits = 0;

    playerIds.forEach(playerId => {
      const guess = submissions[playerId]?.guesses?.[index];
      if (!guess) return;
      if (guess.rating) ratings.push(guess.rating);
      const score = scores[playerId]?.perWine?.[index];
      if (typeof score === "number") scoreValues.push(score);
      if (guess.country && guess.country === wine.country) exactCountryHits += 1;
      if (guess.region && guess.region === wine.region) exactRegionHits += 1;
    });

    return {
      index,
      name: getWineDisplayName(wine, index),
      avgRating: getAverage(ratings),
      avgScore: getAverage(scoreValues),
      ratingSpread: getStdDev(ratings),
      exactCountryHits,
      exactRegionHits,
      ratingCount: ratings.length
    };
  });

  const mostLoved = [...wineStats].sort((a, b) => b.avgRating - a.avgRating)[0];
  const bestGuessed = [...wineStats].sort((a, b) => b.avgScore - a.avgScore)[0];
  const hardest = [...wineStats].sort((a, b) => a.avgScore - b.avgScore)[0];
  const mostDivisive = [...wineStats].sort((a, b) => b.ratingSpread - a.ratingSpread)[0];

  const cards = [
    {
      title: "Publikfavorit",
      body: `${mostLoved.name} fick hogst snittbetyg med ${mostLoved.avgRating.toFixed(1)} av 5 glas.`
    },
    {
      title: "Basta Gissningarna",
      body: `${bestGuessed.name} var lattast att lasa av med ${bestGuessed.avgScore.toFixed(1)} poang i snitt.`
    },
    {
      title: "Kvällens Luring",
      body: `${hardest.name} var svarast att pricka med bara ${hardest.avgScore.toFixed(1)} poang i snitt.`
    },
    {
      title: "Mest Debatt",
      body: `${mostDivisive.name} splittrade bordet mest med storst spridning i betyg.`
    },
    {
      title: "Ursprungsnäsor",
      body: `${bestGuessed.name} gav ${bestGuessed.exactCountryHits} ratt land och ${bestGuessed.exactRegionHits} ratt distrikt.`
    }
  ];

  elements.stats.innerHTML = cards
    .map(
      card => `
        <div class="result-card stat-card">
          <strong>${card.title}</strong>
          <div class="muted">${card.body}</div>
        </div>
      `
    )
    .join("");
}

function renderResults(data) {
  if (!data) return;
  const players = data.players || {};
  const submissions = data.submissions || {};
  const wines = data.wines || [];
  const scores = {};

  Object.keys(submissions).forEach(playerId => {
    if (!players[playerId]) return;
    let total = 0;
    const perWine = wines.map((wine, index) => {
      const guess = submissions?.[playerId]?.guesses?.[index];
      const score = calculateScore(wine, guess);
      total += score;
      return score;
    });
    scores[playerId] = { total, perWine, name: players[playerId].name };
  });

  if (JSON.stringify(scores) !== JSON.stringify(data.scores || {})) {
    db.ref(`sessions/${state.sessionCode}/scores`).set(scores);
  }
  const sorted = Object.values(scores).sort((a, b) => b.total - a.total);
  elements.results.innerHTML = sorted
    .map(
      (player, rank) => `
        <div class="result-card">
          <strong>${rank + 1}. ${player.name}</strong>
          <div class="muted">Total: ${player.total} poäng · Vin 1: ${player.perWine[0] || 0} · Vin 2: ${player.perWine[1] || 0} · Vin 3: ${player.perWine[2] || 0}</div>
        </div>
      `
    )
    .join("");
  renderStats(data, scores);
}

function listenToSession(code, role) {
  db.ref(`sessions/${code}`).on("value", snapshot => {
    const data = snapshot.val();
    if (!data) return;
    state.sessionCode = code;
    state.submissionGuesses = data.submissions?.[state.playerId]?.guesses || {};
    setSessionPill(code);
    renderResults(data);

    if (role === "host") {
      renderPlayers(data.players);
      renderWineCards(data.wines || []);
    }

    if (role === "player") {
      updatePlayerRound(data);
      applyScores(data.scores);
    }
  });
}

function createSession() {
  const code = generateCode();
  const wines = DEFAULT_WINES.map(wine => cloneValue(wine));
  state.sessionCode = code;
  setSessionPill(code);
  elements.sessionCode.textContent = code;

  db.ref(`sessions/${code}`).set({
    createdAt: Date.now(),
    status: "lobby",
    currentWine: 0,
    wines
  });

  listenToSession(code, "host");
}

function joinSession() {
  const name = document.getElementById("player-name").value.trim();
  const code = document.getElementById("player-code").value.trim().toUpperCase();
  if (!name || !code) return;

  ensurePlayerId();
  state.playerName = name;
  state.sessionCode = code;

  db.ref(`sessions/${code}/players/${state.playerId}`).set({
    name,
    joinedAt: Date.now()
  });

  listenToSession(code, "player");
  showPanel(elements.playerGame);
}

function startRound() {
  db.ref(`sessions/${state.sessionCode}/status`).set("round");
}

function revealResults() {
  db.ref(`sessions/${state.sessionCode}/status`).set("revealed");
}

function nextWine() {
  const next = (state.currentWine + 1) % 3;
  db.ref(`sessions/${state.sessionCode}/currentWine`).set(next);
  db.ref(`sessions/${state.sessionCode}/status`).set("round");
}

function submitGuess() {
  if (state.submitted) return;
  elements.submitModal.classList.remove("hidden");
}

function closeSubmitModal() {
  elements.submitModal.classList.add("hidden");
}

function confirmSubmit() {
  if (state.submitted) return;
  cacheCurrentWineDraft(false);
  state.draftGuesses[state.playerWine] = cloneValue(state.localDraftGuesses[state.playerWine]);
  const submission = {
    guesses: cloneValue(state.localDraftGuesses),
    submittedAt: Date.now()
  };
  db.ref(`sessions/${state.sessionCode}/drafts/${state.playerId}`).set(state.localDraftGuesses);
  db.ref(`sessions/${state.sessionCode}/submissions/${state.playerId}`).set(submission);
  state.submitted = true;
  state.submissionGuesses = submission.guesses;
  setInputsDisabled(true);
  renderTabStates();
  elements.playerSummary.textContent = "Dina svar är submitade och låsta.";
  elements.playerLeaderboardWrap.classList.remove("hidden");
  closeSubmitModal();
}

function bindEvents() {
  document.getElementById("host-btn").addEventListener("click", () => {
    if (!db && !initFirebase()) return;
    showPanel(elements.hostSetup);
    createSession();
  });

  document.getElementById("player-btn").addEventListener("click", () => {
    if (!db && !initFirebase()) return;
    showPanel(elements.playerJoin);
  });

  document.getElementById("new-session").addEventListener("click", () => createSession());
  document.getElementById("end-session").addEventListener("click", () => {
    if (state.sessionCode) {
      db.ref(`sessions/${state.sessionCode}`).remove();
    }
    setSessionPill(null);
    showPanel(elements.landing);
  });

  document.getElementById("start-round").addEventListener("click", startRound);
  document.getElementById("reveal-results").addEventListener("click", revealResults);
  document.getElementById("next-wine").addEventListener("click", nextWine);
  document.getElementById("join-session").addEventListener("click", joinSession);
  elements.saveGuess.addEventListener("click", saveDraftGuess);
  elements.submitGuess.addEventListener("click", submitGuess);
  elements.cancelSubmit.addEventListener("click", closeSubmitModal);
  elements.confirmSubmit.addEventListener("click", confirmSubmit);
  elements.guessCountry.addEventListener("change", () => cacheCurrentWineDraft(true));
  elements.wineNote.addEventListener("input", () => cacheCurrentWineDraft(true));
  elements.wineRating.addEventListener("input", () => cacheCurrentWineDraft(true));
  elements.wineTabs.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => setPlayerWine(Number(tab.dataset.wine)));
  });
}

function setupDials() {
  makeDial("dial-fyllighet", () => cacheCurrentWineDraft(true));
  makeDial("dial-stravhet", () => cacheCurrentWineDraft(true));
  makeDial("dial-fruktsyra", () => cacheCurrentWineDraft(true));
}

function init() {
  bindEvents();
  makeTags([]);
  renderRatingButtons();
  makeMap([]);
  setupDials();
  setPlayerWine(0);
  setSessionPill(null);
}

init();
