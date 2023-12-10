// MORE ANIMATIONS

const mario = document.querySelector(".mario");
const questionBlock = document.querySelector(".brick:nth-child(2)");
const coin = document.getElementById("coinAnimation");

const marioMove = [{ transform: "translateY(-120px)" }];
const blockMove = [{ transform: "translateY(-20px)" }];
const coinMove = [{ transform: "translateY(-150px)" }];

const marioTiming = { duration: 100, iterations: 1 }; // animation taking duration amount of time
const blockTiming = { duration: 100, iterations: 1 };
const coinTiming = { duration: 200, iterations: 1 };

// COIN CLICKER

// set variable that is set, not to be changed
const countUp = document.querySelector(".counter");
const multiplierDisplayLuigi = document.querySelector(".multi-luigi");
const multiplierDisplayToad = document.querySelector(".multi-toad");
const luigiBtn = document.querySelector(".luigi");
const toadBtn = document.querySelector(".toad");
const resetBtn = document.querySelector(".reset");
// variables that can be changed || = OR operator provides a default value if the first part is falsy
let counter = parseInt(localStorage.getItem("counter")) || 0;
let luigiCount = parseInt(localStorage.getItem("luigiCount")) || 0;
let toadCount = parseInt(localStorage.getItem("toadCount")) || 0;
let luigiUpgradeCost = parseInt(localStorage.getItem("luigiUpgradeCost")) || 10;
let toadUpgradeCost = parseInt(localStorage.getItem("toadUpgradeCost")) || 20;

let luigiDisplayCost = document.querySelector(".luigiDisplayCost");
let toadDisplayCost = document.querySelector(".toadDisplayCost");

// Update display with the retrieved values for local storage
countUp.textContent = counter;
multiplierDisplayLuigi.textContent = luigiCount;
multiplierDisplayToad.textContent = toadCount;
luigiDisplayCost.textContent = luigiUpgradeCost;
toadDisplayCost.textContent = toadUpgradeCost;

questionBlock.addEventListener("click", function () {
  counter = counter + 1 + luigiCount;
  countUp.textContent = counter;
  updateLocalStorage();
  clickSound.play(); // each time a coin is added the .wav audio is played
  mario.animate(marioMove, marioTiming);
  questionBlock.animate(blockMove, blockTiming);
  coin.style.visibility = "visible";
  coin.animate(coinMove, coinTiming);
  setTimeout(function () {
    coin.style.visibility = "hidden";
  }, 200);
});

// load .wav file
const clickSound = new Audio("./audio/audio_coin.wav");
const clickLuigi = new Audio("./audio/1-up.wav");
const clickToad = new Audio("./audio/toad.wav");

// click hire luigi to show how many luigis we have
luigiBtn.addEventListener("click", function () {
  if (counter >= luigiUpgradeCost) {
    // clickLuigi.play();
    luigiCount++;
    multiplierDisplayLuigi.textContent = luigiCount;
    counter = counter - luigiUpgradeCost;
    //update the counter on display
    countUp.textContent = counter;
    luigiUpgradeCost = Math.floor(luigiUpgradeCost * 1.5);
    luigiDisplayCost.textContent = luigiUpgradeCost;
    updateLocalStorage();
  }
});

toadBtn.addEventListener("click", function () {
  if (counter >= toadUpgradeCost) {
    toadCount++;
    multiplierDisplayToad.textContent = toadCount;
    counter = counter - toadUpgradeCost;
    countUp.textContent = counter;
    toadUpgradeCost = Math.floor(toadUpgradeCost * 1.5);
    toadDisplayCost.textContent = toadUpgradeCost;
    updateLocalStorage();
  }
});

setInterval(function () {
  counter = counter + toadCount;
  countUp.textContent = counter;
  updateLocalStorage();
}, 1000);

function updateLocalStorage() {
  localStorage.setItem("counter", counter);
  localStorage.setItem("luigiCount", luigiCount);
  localStorage.setItem("toadCount", toadCount);
  localStorage.setItem("luigiUpgradeCost", luigiUpgradeCost);
  localStorage.setItem("toadUpgradeCost", toadUpgradeCost);
}

resetBtn.addEventListener("click", function () {
  // localStorage.clear();

  // Reset both counter
  counter = 0;
  luigiCount = 0;
  toadCount = 0;
  luigiUpgradeCost = 10;
  toadUpgradeCost = 20;
  // and multiplier values
  multiplierDisplayLuigi.textContent = luigiCount;
  multiplierDisplayToad.textContent = toadCount;
  countUp.textContent = counter;
  luigiDisplayCost.textContent = luigiUpgradeCost;
  toadDisplayCost.textContent = toadUpgradeCost;
  // Update localStorage with the reset values
  updateLocalStorage();
});
