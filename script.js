const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("reset-btn");
const startBtn = document.querySelector(".start-btn");
const winContainer = document.querySelector(".win-container");
const msg = document.querySelector("#msg");

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let turnX = true,
  count = 0,
  winner = false;

const showWinner = (winner) => {
  count = 0;
  msg.innerHTML = `Congratualtions <br/> Winner is ${winner}`;
  winContainer.classList.add("slide-down");
};

const checkWinner = () => {
  winPatterns.forEach((pattern) => {
    const [pos1Val, pos2Val, pos3Val] = pattern.map((i) => boxes[i].innerText);
    if (pos1Val && pos1Val == pos2Val && pos2Val == pos3Val) {
      showWinner(pos1Val);
      boxes.forEach((box) => (box.disabled = true));
      winner = true;
    }
  });
};

const showDraw = () => {
  msg.innerHTML = `Game is Draw`;
  winContainer.classList.add("slide-down");
};

const gameDraw = () => {
  if (++count === 9 && !winner) {
    count = 0;
    showDraw();
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    e.preventDefault();
    if (!box.innerHTML) {
      box.innerHTML = turnX ? "X" : "O";
      box.style.color = turnX ? "#ba274a" : "#841c26";
      turnX = !turnX;
      box.disabled = true;
      checkWinner();
      gameDraw();
    }
  });
});

const resetGame = (e) => {
  if(e) e.preventDefault();
  count = 0;
  winner = false;
  turnX = true;
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.disabled = false;
  });
  winContainer.classList.remove("slide-down");
};

startBtn.addEventListener("click",e => resetGame(e));

resetBtn.addEventListener("click", e => resetGame(e));
