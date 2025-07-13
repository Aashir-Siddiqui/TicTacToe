import { useState } from 'react';
import circle from '../assets/circle.png';
import cross from '../assets/cross.png';

export default function TicTacToe() {
  const [data, setData] = useState<string[]>(["", "", "", "", "", "", "", "", ""]);
  const [count, setCount] = useState<number>(0);
  const [lock, setLock] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Tic Tac Toe");

  const toggle = (num: number) => {
    if (lock || data[num]) return;

    const newData = [...data];
    if (count % 2 === 0) {
      newData[num] = 'x';
      setCount(count + 1);
    } else {
      newData[num] = 'o';
      setCount(count + 1);
    }
    setData(newData);
    checkWin(newData);
  };

  const checkWin = (board: string[]) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        won(board[a]);
        return;
      }
    }

    if (board.every(cell => cell !== "")) {
      setLock(true);
      setMessage("Game Draw!");
    }
  };

  const won = (winner: string) => {
    setLock(true);
    setMessage(
      winner === 'x'
        ? `Congratulations: <img src="${cross}" alt="cross" class="inline w-8 h-8" /> wins`
        : `Congratulations: <img src="${circle}" alt="circle" class="inline w-8 h-8" /> wins`
    );
  };

  const resetGame = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setLock(false);
    setMessage("Tic Tac Toe");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1
        className="text-2xl sm:text-4xl font-bold text-white mb-8"
        dangerouslySetInnerHTML={{ __html: message }}
      />
      <div className={`grid grid-cols-3 gap-2 w-80 sm:w-96 h-80 sm:h-96 place-items-center bg-gray-800 p-4 rounded-lg shadow-xl ${lock ? 'opacity-50' : ''}`}>
        {data.map((cell, index) => (
          <div
            key={index}
            className="bg-gray-700 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors duration-200 w-20 sm:w-28 h-20 sm:h-28"
            onClick={() => toggle(index)}
          >
            {cell === 'x' && <img src={cross} alt="cross" className="w-14 sm:w-20 h-14 sm:h-20" />}
            {cell === 'o' && <img src={circle} alt="circle" className="w-20 h-20" />}
          </div>
        ))}
      </div>
      <button
        className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors duration-200 font-semibold cursor-pointer"
        onClick={resetGame}
      >
        Reset
      </button>
    </div>
  );
}