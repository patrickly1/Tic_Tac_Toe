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
        return board.map((row) => row.map((cell) => cell.getValue()))
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

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? player[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        return `${getActivePlayer().name}'s turn`
    };

    const playRound = (row, column) => {
        console.log(
            `${getActivePlayer().name} places ${getActivePlayer().symbol}}`
        );
        board.makeMove(row, column, getActivePlayer().symbol);

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();
}


const myGameBoard = gameBoard();
myGameBoard.makeMove(0, 0, "X");
myGameBoard.makeMove(1, 1, "O");
console.log(myGameBoard.printBoard());