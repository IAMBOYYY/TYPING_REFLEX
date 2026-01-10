const startBtn = document.getElementById("startBtn");
const overlay = document.getElementById("overlay");
const music = document.getElementById("bgMusic");
const gameArea = document.getElementById("gameArea");
const speedSelect = document.getElementById("speed");

let bubbles = [];

startBtn.onclick = () => {
  overlay.style.display = "none";
  music.play();
  startGame();
};

function randomChar() {
  const chars = "asdfjkl;";
  return chars[Math.floor(Math.random() * chars.length)];
}

function createBubble() {
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  const char = randomChar();
  bubble.textContent = char;
  bubble.dataset.char = char;

  bubble.style.left = Math.random() * (window.innerWidth - 70) + "px";
  bubble.style.top = window.innerHeight + "px";

  const speed = speedSelect.value;
  bubble.style.animationDuration = speed + "ms";

  bubble.onclick = () => popBubble(bubble);

  gameArea.appendChild(bubble);
  bubbles.push(bubble);

  setTimeout(() => popBubble(bubble), speed);
}

function popBubble(bubble) {
  if (!bubble) return;
  bubble.classList.add("pop");
  bubbles = bubbles.filter(b => b !== bubble);
  setTimeout(() => bubble.remove(), 300);
}

document.addEventListener("keydown", e => {
  const key = e.key.toLowerCase();
  for (let b of bubbles) {
    if (b.dataset.char === key) {
      popBubble(b);
      break;
    }
  }
});

function startGame() {
  setInterval(createBubble, 800);
}
