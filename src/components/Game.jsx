import { useState, useEffect } from 'react';
import Board from './Board';
import './Game.css';

const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    useEffect(() => {
        const body = document.querySelector('body');
        body.style.background = isXNext
            ? "linear-gradient(to right, red 50%, #141111de 50%)"
            : "linear-gradient(to right, #141111de 50%, blue 50%)";
    }, [isXNext]);

    const handleClick = (index) => {
        if (squares[index] || calculateWinner(squares)) return;

        const newSquares = squares.slice();
        newSquares[index] = isXNext ? 'X' : 'O';
        setSquares(newSquares);
        setIsXNext(!isXNext);

        const gameInfo = document.querySelector('.game-info');
        switch (true) {
            case !!winner:
                // Handle winner styling
                gameInfo.textContent = `Ganador: ${winner}`;
                gameInfo.style.position = 'absolute';
                gameInfo.style.color = winner === 'X' ? 'red' : 'blue';
                gameInfo.style.fontSize = '2rem';
                break;
    
            case newSquares.every((square) => square !== null): // Handle draw
                gameInfo.textContent = '¡Es un empate!';
                gameInfo.style.position = 'absolute';
                gameInfo.style.color = 'purple';
                gameInfo.style.fontSize = '2rem';
                break;
    
            default:
                // Handle next player's turn
                gameInfo.textContent = `YOUR TURN`;
                gameInfo.style.fontSize = '2.5rem';
                gameInfo.style.position= 'absolute';
                gameInfo.style.top= '58%';
                gameInfo.style.left= isXNext ? '80%' : '10%';
                break;
        }
    };

    const winner = calculateWinner(squares);

    

    return (
        <div className="game">
            <h1>Tic-tac-toe</h1>
            <Board squares={squares} onSquareClick={handleClick} />
            <div className="game-info">
                
            </div>
        </div>
    );
};

const calculateWinner = (squares) => {
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
};

export default Game;