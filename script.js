let secret;
const wordOfDayUrl = "https://words.dev-apis.com/word-of-the-day?random=1";
let count = 1;
let messageBoard = document.querySelector(".message-board");
let playAgainBtn = document.querySelector(".play-again-btn");
var answer = document.querySelector(".answer");
var triesLeft = document.querySelector(".tries-left");
let submitBtn = document.querySelector(".submit-btn");

document.addEventListener("keydown", function handleKeyPress(event) {
  const action = event.key;
  if (action == "Enter") {
    const boxes = document.querySelectorAll(".guess-box");
    let i = boxes.length-1;
    while(boxes[i].value.length===0)i--;
    if(i!=0 && (i+1)/5==count){
      handleSubmit();
    }
  }
  else if (action == "Backspace") {
    const boxes = document.querySelectorAll(".guess-box");
    let i = boxes.length-1;
    while(boxes[i].value.length===0)i--;
    if(Math.floor(i/5)===count-1){
      boxes[i].value='';
      boxes[i].focus();
    }
  }
});

const initializeGame = async () => {
  await getSecretWord(wordOfDayUrl); // Fetch the secret word before starting the game
  
  console.log(secret);
  messageBoard.textContent =
    "Think you can guess the five letter word of the day? Go ahead! Take a guess!";
};

const handleSubmit = () => {
  const guesses = document.querySelectorAll(".guess-input");
  let boxes = Array.from(guesses[guesses.length - 1].children);

  let guess = "";
  boxes.forEach((box) => {
    guess += box.value;
  });
  if(guess.length<5){
    const boxes = document.querySelectorAll(".guess-box");
    let i = boxes.length-1;
    while(boxes[i].value.length===0 && i/5>count-1)i--;
    boxes[i].focus();
    return;
  }
  guess = guess.toLowerCase();
  if (guess === secret) {
    messageBoard.textContent = "Congratulations, you won!";
    const winningBoxes = document.querySelectorAll(".guess-box");
    let i = winningBoxes.length-1;
    let j = 5;
    while(j>0){
      j--;
      winningBoxes[i].classList.add("winningBox");
      i--;
    }
    document.querySelector(".tries-left").textContent = '';
    playAgainBtn.style.display = "block";
    submitBtn.style.display = "none";
    document.querySelector(".main").appendChild(playAgainBtn);
  } else {
    if (count < 6) {
      messageBoard.textContent = "Not Quite! Have another go!";
      triesLeft.textContent = `You have ${6 - count} tries left`;
      triesLeft.style.display = "block";
      boxes.forEach((box, index) => {
        if (box.value == secret[index]) {
          box.style.border = "2px solid green";
        } else if (secret.includes(box.value)) {
          box.style.border = "2px solid orange";
        } else {
          box.style.border = "2px solid red";
        }
      });

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
      const lastGuessBox = document.querySelectorAll(".guess-box");
      lastGuessBox[lastGuessBox.length-5].focus();
    } else {
      triesLeft.style.display = "none";
      submitBtn.style.display = "none";
      messageBoard.textContent = "Sorry! You took too many tries! Game Over!";
      answer.textContent = `The correct answer was: ${secret}`;
      answer.style.display = "block";
      playAgainBtn.style.display = "block";
    }

    handleNavigation();
  }
};

const getSecretWord = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  secret = data.word; // Set the secret word
};



initializeGame(); // Initialize the game and set the secret word

playAgainBtn.addEventListener("click", async () => {
  count = 1;
  document.querySelector(".guess-container").innerHTML = `
    <div class="container-row guess-input">
      <input class="guess-box" type="text" maxlength="1" id="box1">
      <input class="guess-box" type="text" maxlength="1" id="box2">
      <input class="guess-box" type="text" maxlength="1" id="box3">
      <input class="guess-box" type="text" maxlength="1" id="box4">
      <input class="guess-box" type="text" maxlength="1" id="box5">
    </div>
  `;
  playAgainBtn.style.display = "none";
  answer.style.display = "none";
  submitBtn.style.display = "block";
  submitBtn.addEventListener("click", handleSubmit);
  await initializeGame(); // Fetch a new secret word when playing again
  handleNavigation();
});

submitBtn.addEventListener("click", handleSubmit);

// Handle input navigation
const handleNavigation = () => {
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
};

handleNavigation();
