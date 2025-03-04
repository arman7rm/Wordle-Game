let secret;

const wordOfDayUrl = "https://words.dev-apis.com/word-of-the-day";
let count = 1;
let messageBoard = document.querySelector(".message-board");

let playAgainBtn = document.querySelector(".play-again-btn");

playAgainBtn.addEventListener("click", async () => {
  const randomWordUrl =
    "https://words.dev-apis.com/wordof-the-day/get-word-of-the-day?random=1";
  getSecretWord(randomWordUrl);
  count = 1;
  document.querySelector(".guess-container").innerHTML =
    '<input class="guess1" type="text">';
  messageBoard.textContent =
    "Think you can guess the word of the day? Go ahead! Take a guess!";
  playAgainBtn.style.display = "none";
});

const handleSubmit = () => {
  let guess = document.querySelector(`.guess${count}`).value;
  console.log(guess);
  if (guess == secret) {
    messageBoard.textContent = "Congratulations, you won!";
    playAgainBtn.style.display = "block";
    document.querySelector(".main").appendChild(playAgainBtn);
  } else {
    if (count < 6) {
      messageBoard.textContent = "Not Quite! Have another go!";
      let input = document.createElement("input");
      input.type = "text";
      count++;
      input.classList.add(`guess${count}`);
      document.querySelector(".guess-container").appendChild(input);
    } else {
      messageBoard.textContent = "Sorry! You took too may tries! Game Over!";
      playAgainBtn.style.display = "block";
    }
  }
};
async function getSecretWord(url) {
  const promise = await fetch(url, { method: "GET" });
  const processedResponse = await promise.json();
  secret = processedResponse.word;
}

let submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", handleSubmit);

getSecretWord(wordOfDayUrl);
