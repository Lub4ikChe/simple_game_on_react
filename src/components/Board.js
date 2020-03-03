import React from 'react';
import Square from './Square';
import './Board.css';


class Board extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };

        this.renderSquare = (i) => {
            return <Square value={this.state.squares[i]}
                onClick={() => this.hendleClick(i)} />;
        }

        this.hendleClick = (i) => {
            const squares = this.state.squares.slice();
            if (this.isWinner(squares)) {
                return;
            }
            if (squares[i] === null) {
                squares[i] = this.state.xIsNext ? 'X' : 'O';
                this.setState({
                    squares: squares,
                    xIsNext: !this.state.xIsNext
                });
            }
        }
    }

    isWinner(squares) {
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

    isDraw(squares) {
        let isFiled = squares.every(elem => {
            return elem !== null;
        });
        return isFiled;
    }

    newGame() {
        window.location.reload();
    }

    render() {
        let winner = this.isWinner(this.state.squares);
        let status, startNewGame;
        if (winner) {
            status = 'Winner: ' + winner + ' player';
            startNewGame = <button onClick={this.newGame}>Start new Game</button>
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            if (this.isDraw(this.state.squares)) {
                status = 'Draw';
                startNewGame = <button onClick={this.newGame}>Start new Game</button>
            }
        }

        return (
            <div >
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                {startNewGame}
            </div>
        );
    }
}

export default Board;
