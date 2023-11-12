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




const myGameBoard = gameBoard();
myGameBoard.makeMove(0, 0, "X");
console.log(myGameBoard.printBoard());