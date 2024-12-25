document.addEventListener("DOMContentLoaded", function() {
    const gameBoard = document.getElementById("gameBoard");
    const cells = document.querySelectorAll(".tic");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("reset");
  
    let currentPlayer = "X";
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];
  
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    function checkWin() {
      for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (
          gameState[a] &&
          gameState[a] === gameState[b] &&
          gameState[a] === gameState[c]
        ) {
          return gameState[a]; // Returns the winning player (either "X" or "O")
        }
      }
      return null; // Returns null if no winner is found
    }
  
    function checkDraw() {
      return gameState.every(cell => {
        return cell !== "";
      });
    }
  
    function handleCellClick(clickedCell, clickedCellIndex) {
      if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
      }
  
      gameState[clickedCellIndex] = currentPlayer;
      clickedCell.textContent = currentPlayer;
  
      const winner = checkWin();
      if (winner) {
        message.textContent = `${winner} wins!`;
        gameActive = false;
        return;
      }
  
      if (checkDraw()) {
        message.textContent = "It's a draw!";
        gameActive = false;
        return;
      }
  
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      message.textContent = `${currentPlayer}'s turn`;
    }
  
    function handleReset() {
      currentPlayer = "X";
      gameActive = true;
      gameState = ["", "", "", "", "", "", "", "", ""];
      message.textContent = `${currentPlayer}'s turn`;
      cells.forEach(cell => {
        cell.textContent = "";
      });
    }
  
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => handleCellClick(cell, index));
    });
  
    resetButton.addEventListener("click", handleReset);
  });
  