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
    console.log("Next Value:", nextVal); // debugging next value

    const win = calculateWinner(squares);
    setWinner(win);
    console.log("Winner:", win); // debugging winner
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
      <button
        className="square-button bg-slate-100 h-28 w-28 border m-2 text-amber-400 rounded-lg text-8xl"
        onClick={() => selectSquare(i)}
      >
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div>{status}</div>
      <div className="flex items-center">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="flex items-center">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="flex items-center">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button
        className="bg-slate-600 text-4xl px-4 py-2 mt-2 rounded-lg"
        onClick={restart}
      >
        Restart
      </button>
    </div>
  );
}

// komponen Game
function Game() {
  return (
    <div className="flex justify-center text-center text-white">
      <div className="text-2xl">
        <h1 className="text-6xl mb-8 mt-4">Tic Tac Toe</h1>
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
