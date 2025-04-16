const screens = document.querySelectorAll(".screen");
const chooseInsectButtons = document.querySelectorAll(".choose-insect-btn");
const startButton = document.getElementById("start-btn");
const gameContainer = document.getElementById("game-container");
const timeElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const message = document.getElementById("message");

let seconds = 0;
let score = 0;
let selectedInsect = {};
let insectCount = 0;
let spawnInterval = window.innerWidth < 600 ? 2500 : 2000; // Adjust based on screen size
let spawnLimit = window.innerWidth < 500 ? 6 : 10; // Lower insect count for smaller screens

startButton.addEventListener("click", () => screens[0].classList.add("up"));

const increaseScore = () => {
  score++;
  if (score > 19) message.classList.add("visible");
  scoreElement.innerHTML = `Score: ${score}`;
};

const catchInsect = function () {
  increaseScore();
  this.classList.add("caught");

  setTimeout(() => {
    this.remove();
    insectCount--;
  }, 2000);
};

const getRandomLocation = () => {
  const width = gameContainer.clientWidth;
  const height = gameContainer.clientHeight;
  const x = Math.random() * (width - 100);
  const y = Math.random() * (height - 100);
  return { x, y };
};

const createInsect = () => {
  if (insectCount >= spawnLimit) return;

  const insect = document.createElement("div");
  insect.classList.add("insect");
  const { x, y } = getRandomLocation();
  insect.style.top = `${y}px`;
  insect.style.left = `${x}px`;
  insect.innerHTML = `<img src="${selectedInsect.src}" alt="${selectedInsect.alt}" 
    style="transform: rotate(${Math.random() * 360}deg)" />`;

  insect.addEventListener("click", catchInsect);
  gameContainer.appendChild(insect);
  insectCount++;
};

// Gradually increase spawn rate every 7 seconds
const increaseSpawnRate = () => {
  if (spawnInterval > 400) { 
    spawnInterval -= 200; // Make insects appear faster
    spawnLimit += 2; // Allow more insects on screen
    clearInterval(spawnTimer);
    spawnTimer = setInterval(createInsect, spawnInterval);
  }
};

// Ensure game adjusts when screen resizes
window.addEventListener("resize", () => {
  spawnInterval = window.innerWidth < 600 ? 2500 : 2000;
  spawnLimit = window.innerWidth < 500 ? 6 : 10;
});

let spawnTimer;
const startGame = () => {
  setInterval(increaseTime, 1000);
  spawnTimer = setInterval(createInsect, spawnInterval);
  setInterval(increaseSpawnRate, 7000); // Every 7s, increase spawn rate
};

const increaseTime = () => {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeElement.innerHTML = `Time: ${m}:${s}`;
  seconds++;
};

chooseInsectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    const src = image.getAttribute("src");
    const alt = image.getAttribute("alt");
    selectedInsect = { src, alt };
    screens[1].classList.add("up");
    setTimeout(createInsect, 1000);
    startGame();
  });
});