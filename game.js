const Player = (name) => {
  const getName = () => name;
  const setName = () => {
    name = prompt("Please enter player name");
    gameBoard.render();
  };
  return { setName, getName };
};

const name1 = Player("Player 1");
const name2 = Player("Player 2");

const gameBoard = (function () {
  let _boardArray = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  let _currentTurn = "X";
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  // cache DOM
  let boardDisplay = document.querySelectorAll(".box");
  let turnDisplay = document.getElementById("currentTurn");
  let restart = document.getElementById("restart");
  let player1 = document.getElementById("player1");
  let player2 = document.getElementById("player2");

  //bind click events
  boardDisplay.forEach((div) => {
    div.addEventListener("click", setBox);
  });
  restart.addEventListener("click", restartGame);
  player1.addEventListener("click", name1.setName);
  player2.addEventListener("click", name2.setName);

  render();

  function render() {
    boardDisplay.forEach((div, i) => {
      div.textContent = _boardArray[i];
    });
    turnDisplay.textContent = _currentTurn;
    player1.textContent = name1.getName();
    player2.textContent = name2.getName();
  }

  function setBox() {
    if (_boardArray[this.id] === " ") {
      _boardArray[this.id] = _currentTurn;
      render();
      checkForWin();
      updateCurrentTurn();
    }
  }

  function restartGame() {
    _boardArray = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    _currentTurn = "X";
    render();
    boardDisplay.forEach((div) => {
      div.addEventListener("click", setBox);
    });
    context.clearRect(0, 0, canvas.height, canvas.width);
  }
  //
  // function changeName() {
  //   this.setName(prompt("Please enter player name"));
  // }

  function checkForWin() {
    let box1 = _boardArray[0];
    let box2 = _boardArray[1];
    let box3 = _boardArray[2];
    let box4 = _boardArray[3];
    let box5 = _boardArray[4];
    let box6 = _boardArray[5];
    let box7 = _boardArray[6];
    let box8 = _boardArray[7];
    let box9 = _boardArray[8];
    if (
      (box1 === box2 && box2 === box3 && box1 !== " ") ||
      (box4 === box5 && box5 === box6 && box4 !== " ") ||
      (box7 === box8 && box8 === box9 && box7 !== " ") ||
      (box1 === box4 && box4 === box7 && box1 !== " ") ||
      (box2 === box5 && box5 === box8 && box2 !== " ") ||
      (box3 === box6 && box6 === box9 && box3 !== " ") ||
      (box1 === box5 && box5 === box9 && box1 !== " ") ||
      (box3 === box5 && box5 === box7 && box3 !== " ")
    ) {
      turnDisplay.textContent = `${_currentTurn} wins!`;
      removeEventListeners();
      drawStrikeThru();
      return;
    }
    if (
      box1 !== " " &&
      box2 !== " " &&
      box3 !== " " &&
      box4 !== " " &&
      box5 !== " " &&
      box6 !== " " &&
      box7 !== " " &&
      box8 !== " " &&
      box9 !== " "
    ) {
      turnDisplay.textContent = "Cat's game";
    }
  }

  function removeEventListeners() {
    boardDisplay.forEach((div) => {
      div.removeEventListener("click", setBox);
    });
  }

  function updateCurrentTurn() {
    return _currentTurn === "X" ? (_currentTurn = "O") : (_currentTurn = "X");
  }

  function drawStrikeThru() {
    let box1 = _boardArray[0];
    let box2 = _boardArray[1];
    let box3 = _boardArray[2];
    let box4 = _boardArray[3];
    let box5 = _boardArray[4];
    let box6 = _boardArray[5];
    let box7 = _boardArray[6];
    let box8 = _boardArray[7];
    let box9 = _boardArray[8];

    canvas.setAttribute("z-index", 2);
    context.strokeStyle = "black";
    context.lineWidth = 2;
    if (box1 === box2 && box2 === box3 && box1 !== " ") {
      context.beginPath();
      context.moveTo(25, 32);
      context.lineTo(150, 32);
      context.stroke();
    }
    if (box4 === box5 && box5 === box6 && box4 !== " ") {
      context.beginPath();
      context.moveTo(25, 83);
      context.lineTo(150, 83);
      context.stroke();
    }
    if (box7 === box8 && box8 === box9 && box7 !== " ") {
      context.beginPath();
      context.moveTo(25, 133);
      context.lineTo(150, 133);
      context.stroke();
    }
    if (box1 === box4 && box4 === box7 && box1 !== " ") {
      context.beginPath();
      context.moveTo(37, 22);
      context.lineTo(37, 145);
      context.stroke();
    }
    if (box2 === box5 && box5 === box8 && box2 !== " ") {
      context.beginPath();
      context.moveTo(87, 22);
      context.lineTo(87, 145);
      context.stroke();
    }
    if (box3 === box6 && box6 === box9 && box3 !== " ") {
      context.beginPath();
      context.moveTo(137, 22);
      context.lineTo(137, 145);
      context.stroke();
    }
    if (box1 === box5 && box5 === box9 && box1 !== " ") {
      context.beginPath();
      context.moveTo(25, 25);
      context.lineTo(150, 150);
      context.stroke();
    }
    if (box3 === box5 && box5 === box7 && box3 !== " ") {
      context.beginPath();
      context.moveTo(150, 25);
      context.lineTo(25, 150);
      context.stroke();
    }
  }
  return { render };
})();
