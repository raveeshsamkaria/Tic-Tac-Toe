// Variable Declaration
let btnRef = document.querySelectorAll(".button-option");
let popUpRef = document.querySelector(".popup");
let newGameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("msg");

// Winning Pattern Array
let winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Player 'X' plays first
let xTurn = true;
let count = 0;

// Disable All Buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  // Enable PopUp
  popUpRef.classList.remove("hide");
};

// Enable All Buttons (For New Game & Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  // Disable PopUp
  popUpRef.classList.add("hide");
};

// New Game
newGameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

// Restart Game
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

// This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};

// Draw Function
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

// Win Logic
const winChecker = () => {
  // Loop through all win patterns
  for(let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    // Check if elements are filled
    if (element1 != "" && element2 != "" && element3 != "") {
      if (element1 == element2 && element2 == element3) {
        // If all 3 buttons have same values then pass the value to winFunction()
        winFunction(element1);
      }
    }
  }
};

// Display X/O on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      // Display X
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      // Display O
      element.innerText = "O";
      element.disabled = true;
    }
    // Increment count on each click
    count += 1;
    if(count == 9) {
      drawFunction();
    }
    // Check for win on every click
    winChecker();
  });
});

// Enable Buttons & Disable PopUp on Page Load
window.onload = enableButtons;