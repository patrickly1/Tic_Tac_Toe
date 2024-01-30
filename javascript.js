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
    let value = null;

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

    const playRound = (row, column, resultsDiv) => {
        if (winner) {
            console.log("Game over, there is already a winner!");
            resultsDiv.textContent = `Game over, ${winner} wins!`;
            return;
        }

        console.log(
            `${getActivePlayer().name} places ${getActivePlayer().symbol}`
        );
        board.makeMove(row, column, getActivePlayer().symbol);
    
        // check win condition for rows
        for (let i = 0; i < 3; i++) {
            if (
                board.getBoard()[i][0].getValue() != null &&
                board.getBoard()[i][0].getValue() === board.getBoard()[i][1].getValue() &&
                board.getBoard()[i][0].getValue() === board.getBoard()[i][2].getValue()
            ) {
                winner = getActivePlayer().name;
                console.log(`Game over, ${winner} wins using rows!`);
                resultsDiv.textContent = `Game over, ${winner} wins using rows!`;
                break;
            }
        }

        // check win condition for columns
        for (let i = 0; i < 3; i++) {
            if (
                board.getBoard()[0][i].getValue() != null &&
                board.getBoard()[0][i].getValue() === board.getBoard()[1][i].getValue() &&
                board.getBoard()[0][i].getValue() === board.getBoard()[2][i].getValue()
            ) {
                winner = getActivePlayer().name;
                console.log(`Game over, ${winner}  wins using columns!`);
                resultsDiv.textContent = `Game over, ${winner}  wins using columns!`;
                break;
            }
        }

        // check win condition for diagonals
        if (
            board.getBoard()[0][0].getValue() != null &&
            board.getBoard()[0][0].getValue() === board.getBoard()[1][1].getValue() &&
            board.getBoard()[0][0].getValue() === board.getBoard()[2][2].getValue()
        ) {
            winner = getActivePlayer().name;
            console.log(`Game over, ${winner} wins using diagonal one!`);
            resultsDiv.textContent = `Game over, ${winner} wins using the diagonal!`;
        } else if (
            board.getBoard()[0][2].getValue() != null &&
            board.getBoard()[0][2].getValue() === board.getBoard()[1][1].getValue() &&
            board.getBoard()[0][2].getValue() === board.getBoard()[2][0].getValue()
        ) {
            winner = getActivePlayer().name;
            console.log(`Game over, ${winner} wins using diagonal two!`);
            resultsDiv.textContent = `Game over, ${winner} wins using the diagonal!`;
        } else if (!board.getBoard().flat().some(cell => !cell.getValue())) {
            console.log("Game over. It's a tie!");
            resultsDiv.textContent = "Game over. It's a tie!";
        }

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {
        playRound,
        //getWinner,
        getActivePlayer,
        getBoard: board.getBoard
    };
}

//add UI
function ScreenController(){
    const game = Game();
    const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");
    const resultsDiv = document.querySelector(".results");

    //let winner = game.getWinner();

    const updateScreen = () => {
        //clear board
        boardDiv.innerHTML = "";

        //new version of board and player turn
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        //display player turn
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

        //Render board squares
        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = rowIndex
                cellButton.dataset.column = columnIndex;
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            })
        })

        //const winner = game.getWinner();
        //resultsDiv.textContent = winner ? `${winner} wins!` : "";
    }

    function clickHandlerBoard(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;


        if (//winner === null &&
        !isNaN(selectedRow) &&
        !isNaN(selectedColumn) &&
        selectedRow >= 0 &&
        selectedRow < 3 &&
        selectedColumn >= 0 &&
        selectedColumn < 3 &&
        game.getBoard()[selectedRow][selectedColumn].getValue() === null
        ) {
        game.playRound(selectedRow, selectedColumn, resultsDiv);
        updateScreen();
        }
    }

    boardDiv.addEventListener("click", clickHandlerBoard);
    
    updateScreen();
}

ScreenController();

//const myGame = new Game(); // create an instance of the game
//myGame.playRound(0, 0);
//myGame.playRound(1, 1);
//myGame.playRound(0, 1);
//myGame.playRound(1, 2);
//myGame.playRound(0, 2);

//const myGameBoard = gameBoard();
//myGameBoard.makeMove(0, 0, "X");
//myGameBoard.makeMove(1, 1, "O");
//myGameBoard.makeMove(0, 1, "X");
//myGameBoard.makeMove(1, 2, "O");
//myGameBoard.makeMove(0, 2, "X");
//console.log(myGameBoard.printBoard());
//console.log(Game.playRound);