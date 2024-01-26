function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;
    const printBoard = () => {
        console.log(board.map((row) => row.map((cell) => cell.getValue())))
    }

    // row 0 = top row
    // col 0 = left row
    const makeMove = (row, column, player) => {
        if (!board[row][column].getValue()) {
            board[row][column].addValue(player);
        }
    }

    return { getBoard, makeMove, printBoard };
}

function Cell() {
    let value = 0;

    const addValue = (player) => {
        value = player;
    };

    const getValue = () => value;

    return { addValue, getValue };
}

function Game(
    player1 = "Player One", player2 = "Player Two"
    ) {
    const board = gameBoard();

    const players = [
        {
            name: player1,
            symbol: "X"
        },
        {
            name: player2, 
            symbol: "O"
        }
    ];

    let activePlayer = players[0];
    let winner = null;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        return `${getActivePlayer().name}'s turn`
    };

    const playRound = (row, column) => {
        if (winner) {
            console.log("Game over, there is already a winner!");
        }

        console.log(
            `${getActivePlayer().name} places ${getActivePlayer().symbol}`
        );
        board.makeMove(row, column, getActivePlayer().symbol);
    
        // check win condition for rows
        for (let i = 0; i < 3; i++) {
            if (
                board.getBoard()[i][0].getValue() != 0 &&
                board.getBoard()[i][0].getValue() === board.getBoard()[i][1].getValue() &&
                board.getBoard()[i][0].getValue() === board.getBoard()[i][2].getValue()
            ) {
                winner = getActivePlayer().name;
                console.log(`Game over, ${winner} wins using rows!`);
                break;
            }
        }

        // check win condition for columns
        for (let i = 0; i < 3; i++) {
            if (
                board.getBoard()[0][i].getValue() != 0 &&
                board.getBoard()[0][i].getValue() === board.getBoard()[1][i].getValue() &&
                board.getBoard()[0][i].getValue() === board.getBoard()[2][i].getValue()
            ) {
                winner = getActivePlayer().name;
                console.log(`Game over, ${winner}  wins using columns!`);
                break;
            }
        }

        // check win condition for diagonals
        if (
            board.getBoard()[0][0].getValue() != 0 &&
            board.getBoard()[0][0].getValue() === board.getBoard()[1][1].getValue() &&
            board.getBoard()[0][0].getValue() === board.getBoard()[2][2].getValue()
        ) {
            winner = getActivePlayer().name;
            console.log(`Game over, ${winner} wins using diagonal one!`);
        } else if (
            board.getBoard()[0][2].getValue() != 0 &&
            board.getBoard()[0][2].getValue() === board.getBoard()[1][1].getValue() &&
            board.getBoard()[0][2].getValue() === board.getBoard()[2][0].getValue()
        ) {
            winner = getActivePlayer().name;
            console.log(`Game over, ${winner} wins using diagonal two!`);
        } else if (!board.getBoard().flat().some(cell => !cell.getValue())) {
            console.log("Game over. It's a tie!");
        }

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    };
}

const myGame = new Game(); // create an instance of the game
myGame.playRound(0, 0);
myGame.playRound(1, 1);
myGame.playRound(0, 1);
myGame.playRound(1, 2);
myGame.playRound(0, 2);

//const myGameBoard = gameBoard();
//myGameBoard.makeMove(0, 0, "X");
//myGameBoard.makeMove(1, 1, "O");
//myGameBoard.makeMove(0, 1, "X");
//myGameBoard.makeMove(1, 2, "O");
//myGameBoard.makeMove(0, 2, "X");
//console.log(myGameBoard.printBoard());
//console.log(Game.playRound);