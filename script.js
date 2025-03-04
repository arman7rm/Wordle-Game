let secret;
const wordOfDayUrl = "https://words.dev-apis.com/word-of-the-day";
let count = 1;
let messageBoard = document.querySelector(".message-board");
let playAgainBtn = document.querySelector(".play-again-btn");

const handleSubmit = () => {
  const letter1 = document.getElementById("box1").value;
  const letter2 = document.getElementById("box2").value;
  const letter3 = document.getElementById("box3").value;
  const letter4 = document.getElementById("box4").value;
  const letter5 = document.getElementById("box5").value;

  const guess = letter1 + letter2 + letter3 + letter4 + letter5;

  if (guess === secret) {
    messageBoard.textContent = "Congratulations, you won!";
    playAgainBtn.style.display = "block";
    document.querySelector(".main").appendChild(playAgainBtn);
  } else {
    if (count < 6) {
      messageBoard.textContent = "Not Quite! Have another go!";
      let input = document.createElement("div");
      input.innerHTML = `
        <div class="container-row guess-input">
                <input class="guess-box" type="text" maxlength="1" id="box1">
                <input class="guess-box" type="text" maxlength="1" id="box2">
                <input class="guess-box" type="text" maxlength="1" id="box3">
                <input class="guess-box" type="text" maxlength="1" id="box4">
                <input class="guess-box" type="text" maxlength="1" id="box5">
            </div>
      `;
      count++;
      document.querySelector(".guess-container").appendChild(input);
    } else {
      messageBoard.textContent = "Sorry! You took too many tries! Game Over!";
      playAgainBtn.style.display = "block";
    }
  }
};

const getSecretWord = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  secret = data.word; // Set the secret word
};

// Call this function once the page loads
const initializeGame = async () => {
  await getSecretWord(wordOfDayUrl); // Fetch the secret word before starting the game
  messageBoard.textContent = "Think you can guess the five letter word of the day? Go ahead! Take a guess!";

console.log(secret);
};

initializeGame(); // Initialize the game and set the secret word

playAgainBtn.addEventListener("click", async () => {
  count = 1;
  document.querySelector(".guess-container").innerHTML = `
    <div class="container-col">
      <input class="guess-box" type="text" maxlength="1" id="box1">
      <input class="guess-box" type="text" maxlength="1" id="box2">
      <input class="guess-box" type="text" maxlength="1" id="box3">
      <input class="guess-box" type="text" maxlength="1" id="box4">
      <input class="guess-box" type="text" maxlength="1" id="box5">
    </div>
  `;
  playAgainBtn.style.display = "none";
  await initializeGame(); // Fetch a new secret word when playing again
});

let submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", handleSubmit);

// Handle input navigation
const boxes = document.querySelectorAll(".guess-box");
boxes.forEach((box, index) => {
  box.addEventListener("input", () => {
    if (box.value.length === 1 && index < boxes.length - 1) {
      boxes[index + 1].focus();
    }
    if (box.value.length === 0 && index > 0) {
      boxes[index - 1].focus();
    }
  });
});