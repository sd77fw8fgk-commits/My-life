
const STORAGE_KEY = "life_app_stage1";

/* ---------- State ---------- */
let state = loadState() || {
  areas: []
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* ---------- UI ---------- */
function setHeader(text) {
  document.getElementById("header").innerText = text;
}

function setContent(html) {
  document.getElementById("content").innerHTML = html;
}

/* ---------- Screens ---------- */
function showAreas() {
  setHeader("תחומים");

  if (state.areas.length === 0) {
    setContent(`
      <div class="card">אין תחומים עדיין</div>
      <button onclick="addArea()">＋ הוסף תחום</button>
    `);
    return;
  }

  setContent(`
    ${state.areas.map(a => `
      <div class="card">${a.title}</div>
    `).join("")}
    <button onclick="addArea()">＋ הוסף תחום</button>
  `);
}

/* ---------- Actions ---------- */
function addArea() {
  const title = prompt("שם התחום:");
  if (!title) return;

  state.areas.push({
    id: Date.now(),
    title
  });

  saveState();
  showAreas();
}

/* ---------- Init ---------- */
showAreas();
