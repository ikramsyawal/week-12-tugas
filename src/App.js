import { useState, useEffect } from "react";

// komponen Board
function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [status, setStatus] = useState("");
  const [nextValue, setNextValue] = useState(calculateNextValue(squares));
  const [winner, setWinner] = useState(calculateWinner(squares));

  function selectSquare(square) {
    if (winner) {
      return;
    }
    setSquares((prevSquares) => {
      if (prevSquares[square] === null) {
        const newSquares = [...prevSquares];
        newSquares[square] = nextValue;
        return newSquares;
      }
      return prevSquares;
    });
  }

  useEffect(() => {
    const nextVal = calculateNextValue(squares);
    setNextValue(nextVal);
    console.log("Next Value:", nextVal); // Debugging nextValue

    const win = calculateWinner(squares);
    setWinner(win);
    console.log("Winner:", win); // Debugging winner
  }, [squares]);

  useEffect(() => {
    const stat = calculateStatus(winner, squares, nextValue);
    setStatus(stat);
  }, [winner, squares, nextValue]);

  function restart() {
    setSquares(Array(9).fill(null));
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div>{status}</div>
      <div>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button onClick={restart}>restart</button>
    </div>
  );
}

// komponen Game
function Game() {
  return (
    <div>
      <div>
        <h1>Tic Tac Toe</h1>
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// componen app
function App() {
  return <Game />;
}

export default App;
