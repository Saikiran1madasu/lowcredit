// List of words
const words = [
  "Onion",
  "Clock",
  "Candle",
  "Hole",
  "Piano",
  "Cloud",
  "Promise",
  "Towel",
  "Age",
  "Sponge",
  "Echo",
  "Shadow",
  "Light",
  "TheLetterM",
  "Joke",
  "Fence",
  "Darkness",
  "Future",
  "Fire",
  "Bottle",
  "Soap",
  "Coin",
  "Fan",
  "Chalk",
  "Space",
  "Umbrella",
  "Envelope",
  "Egg",
  "Ice",
  "Book",
  "Star",
  "Rainbow",
  "Teeth",
  "Nose",
  "Bed",
  "Eyes",
  "Mirror",
  "Chair",
  "Foot",
  "Pencil",
  "Banana",
  "Glove"
];

// list of hints
const hints = [
  "When you cut me, you’ll cry for sure. What am I?",
  "I have hands but no arms or legs. What am I?",
  "I’m tall when I’m young and short when I’m old. What am I?",
  "The more you take from me, the bigger I become. What am I?",
  "I have keys but no locks. I open nothing. What am I?",
  "I fly without wings, I cry without eyes. What am I?",
  "You can break me without touching me. What am I?",
  "I get wetter the more I dry. What am I?",
  "I go up but never come down. What am I?",
  "I’m full of holes but still hold water. What am I?",
  "I speak without a mouth and hear without ears. What am I?",
  "I follow you everywhere, but you can’t touch me. What am I?",
  "I can fill a room but take up no space. What am I?",
  "You see me once in a minute, twice in a moment, but never in a thousand years. What am I?",
  "I can be cracked, made, told, and played. What am I?",
  "I run all around the backyard, yet I never move. What am I?",
  "The more you have of me, the less you see. What am I?",
  "I am always in front of you, but you can’t see me. What am I?",
  "I’m not alive, but I grow. I don’t have lungs, but I need air. What am I?",
  "I have a neck but no head. What am I?",
  "I get smaller every time I take a bath. What am I?",
  "I have a tail but no body. What am I?",
  "I go around and around but always stay in one place. What am I?",
  "I am white and used for writing, but I’m not a pen or paper. What am I?",
  "I’m something. I’m nothing. And I’m everywhere. What am I?",
  "I go up when the rain comes down. What am I?",
  "I start with an “e” and contain only one letter. What am I?",
  "I have a shell but I’m not a turtle. You can crack me open. What am I?",
  "I melt when I'm hot, but I'm solid when I'm cold. What am I?",
  "I have pages but I’m not a newspaper. What am I?",
  "I twinkle in the night sky. What am I?",
  "I come after rain and have many colors. What am I?",
  "I help you chew food. What am I?",
  "I smell but I’m not a flower. I’m on your face. What am I?",
  "You sleep on me every night. What am I?",
  "I help you see the world, but I’m not glasses. What am I?",
  "I reflect you, but I’m not water. What am I?",
  "You sit on me. What am I?",
  "I have toes but no fingers. What am I?",
  "I have a point but I’m not rude. What am I?",
  "I’m yellow and you peel me to eat. What am I?",
  "I have five fingers but no bones. What am I?"
];


// Initialize display word 
let displayWord = "";

// Function to shuffle letters 
function shuffle(str) {
  strArray = Array.from(str);
  for (let i = 0; i < strArray.length - 1; ++i) {
    let j = Math.floor(Math.random() * strArray.length);
    // Swap letters 
    let temp = strArray[i];
    strArray[i] = strArray[j];
    strArray[j] = temp;
  }
  return strArray.join(" ");
}

// Function to check input and display result 
function check() {
  let input = document.getElementById("input");
  let output = document.getElementById("output");
  if (
    input.value.toLocaleLowerCase() ===
    displayWord.toLocaleLowerCase()
  ) {
    output.innerHTML = "Result: Correct";
    fadeOutAndRefresh();
  } else {
    input.style.animation = "shakeAnimation 0.5s ease-in-out";
    setTimeout(() => {
      input.style.animation = "";
    }, 500);
    output.innerHTML = "Result: Incorrect";
  }
}

// To fade out the current word and hint, then show new word and hint
function fadeOutAndRefresh() {
  const scrambleWord = document.getElementById("scrambleWord");
  const hint = document.getElementById("hint");

  scrambleWord.style.transition = "opacity 0.5s";
  hint.style.transition = "opacity 0.5s";
  scrambleWord.style.opacity = "0";
  hint.style.opacity = "0";

  setTimeout(() => {
    refresh();
    scrambleWord.style.opacity = "1";
    hint.style.opacity = "1";
  }, 500);
}

// To refresh and show new word 
function refresh() {
  document.getElementById("input").value = "";
  index = Math.floor(Math.random() * 42);
  displayWord = words[index];
  displayHint = hints[index];
  const scrambleWord = document.getElementById("scrambleWord");
  scrambleWord.innerText = shuffle(displayWord).toUpperCase();
  const hint = document.getElementById("hint");
  hint.innerHTML = "<b>Hint:</b> " + displayHint;
  // document.getElementById("output").innerText = "Result:";
}

// Function call when page load for first time 
refresh();
