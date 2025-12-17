alert("נטען");
const STORAGE_KEY = "life_app_stage1";

const COLOR_PALETTE = [
  "#7C7CFF","#4DD0E1","#FF8A65","#81C784","#BA68C8",
  "#FFD54F","#4DB6AC","#F06292","#7986CB","#A1887F",
  "#90A4AE","#DCE775","#FFB74D","#9575CD","#64B5F6",
  "#E57373","#AED581","#4FC3F7","#CE93D8","#FFCC80"
];

let selectedColor = COLOR_PALETTE[0];

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

  setContent(`
    <div class="grid">
      ${state.areas.map(a => `
        <div class="tile" style="background:${a.color}">
          ${a.title}
        </div>
      `).join("")}
    </div>

    <button onclick="openAreaModal()">＋ הוסף תחום</button>
  `);
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
function openAreaModal() {
  areaTitleInput.value = "";
  selectedColor = COLOR_PALETTE[0];

  colorPalette.innerHTML = COLOR_PALETTE.map(c => `
    <div class="color-option ${c===selectedColor?"selected":""}"
         style="background:${c}"
         onclick="selectColor('${c}', this)">
    </div>
  `).join("");

  areaModalOverlay.style.display = "flex";
}

function closeAreaModal() {
  areaModalOverlay.style.display = "none";
}

function selectColor(color, el) {
  selectedColor = color;
  document.querySelectorAll(".color-option")
    .forEach(x => x.classList.remove("selected"));
  el.classList.add("selected");
}

function confirmAddArea() {
  const title = areaTitleInput.value.trim();
  if (!title) return;

  state.areas.push({
    id: Date.now(),
    title,
    color: selectedColor
  });

  saveState();
  closeAreaModal();
  showAreas();
}
