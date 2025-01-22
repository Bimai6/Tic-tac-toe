import { useState, useEffect } from 'react';
import Board from './Board';
import './Game.css';

const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const winner = calculateWinner(squares);

    useEffect(() => {
        const body = document.querySelector('body');
        body.style.background = isXNext
            ? "linear-gradient(to right, red 50%, #141111de 50%)"
            : "linear-gradient(to right, #141111de 50%, blue 50%)";
    }, [isXNext]);

    const handleClick = (index) => {
        if (squares[index] || winner) return;

        const newSquares = squares.slice();
        newSquares[index] = isXNext ? 'X' : 'O';
        setSquares(newSquares);
        setIsXNext(!isXNext);
    };

    const handleReset = () => {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
    };

    const getGameInfoStyles = () => {
        if (winner) {
            return {
                color: winner === 'X' ? 'red' : 'blue',
                left: isXNext ? '80%' : '10%',
            };
        } else if (squares.every((square) => square !== null)) {
            return {
                color: 'yellow',
                left: isXNext ? '80%' : '10%',
            };
        } else {
            return {
                left: isXNext ? '5%' : '75%',
                fontSize: '5rem'
            };
        }
    };

    const getMessage = () => {
        if (winner) {
            return `YOU WIN!`;
        } else if (squares.every((square) => square !== null)) {
            return 'DRAW!';
        } else {
            return `YOUR TURN`;
        }
    };

    return (
        <div className="game">
            <h1>Tic-tac-toe</h1>
            <Board squares={squares} onSquareClick={handleClick} />
            <div className="game-info" style={getGameInfoStyles()}>
                {getMessage()}
            </div>  
            {(winner || squares.every((square) => square !== null)) && (
                <button className="reset-button" onClick={handleReset}>
                    Play again
                </button>
            )}
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