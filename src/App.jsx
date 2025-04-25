import React, { useState } from 'react';
import './App.css';

// Helper function to check for a winner
const checkWinner = (board) => {
  const directions = [
    { r: 0, c: 1 }, // Horizontal
    { r: 1, c: 0 }, // Vertical
    { r: 1, c: 1 }, // Diagonal down-right
    { r: 1, c: -1 }, // Diagonal up-right
  ];

  const rows = board.length;
  const cols = board[0].length;

  // Check every cell for potential starting points of a 4-in-a-row
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const current = board[row][col];
      if (!current) continue; // Skip empty cells

      // Check all directions
      for (let { r, c } of directions) {
        let count = 1;
        let newRow = row + r;
        let newCol = col + c;

        // Count in the current direction
        while (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          board[newRow][newCol] === current
        ) {
          count++;
          newRow += r;
          newCol += c;
        }

        // If we find 4 in a row, return the winner
        if (count >= 4) return current;
      }
    }
  }

  return null; // No winner yet
};

const App = () => {
  const columns = 7;
  const rows = 6;

  const [board, setBoard] = useState(Array(rows).fill().map(() => Array(columns).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('Red');
  const [winner, setWinner] = useState(null);

  // Handle when a player clicks on a slot
  const handleSlotClick = (rowIndex, colIndex) => {
    if (winner || board[rowIndex][colIndex]) return; // Do nothing if there's a winner or the slot is already taken

    const newBoard = [...board];
    newBoard[rowIndex][colIndex] = currentPlayer;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setCurrentPlayer(currentPlayer === 'Red' ? 'Yellow' : 'Red');
    }
  };

  return (
    <div className="game">
      <h1>{winner ? `${winner} Wins!` : `${currentPlayer}'s Turn`}</h1>
      <div className="board">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="slot"
                onClick={() => handleSlotClick(rowIndex, colIndex)}
              >
                {board[rowIndex][colIndex] && (
                  <div className={`token ${board[rowIndex][colIndex]}`}></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      {winner && (
        <button onClick={() => {
          setBoard(Array(rows).fill().map(() => Array(columns).fill(null)));
          setWinner(null);
          setCurrentPlayer('Red');
        }}>
          Restart Game
        </button>
      )}
    </div>
  );
};

export default App;
