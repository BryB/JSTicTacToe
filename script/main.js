const gameManager = (() => {
    let turns = 0;
    let current_turn = 0;
    let started = 0;
    let winner = 0;
    return {
        turns,
        current_turn,
        started,
        winner
    };
})();

const gameBoard = (() => {
    let board =[
    [ , , ],
    [ , , ],
    [ , , ]
    ];
    const modBoard = () => markSpot(y, x);
    return {
    modBoard,
    board,
    };

})();

const player = type => {
    let marker = type;
    const mark = (x, y) => {
        if(gameBoard.board[x][y] === ' ')
            gameBoard.board[x][y] = marker;
    };
    return{mark};
};

function markSpot(xpos, ypos) {
    let turn = gameManager.current_turn;
    if(turn === 1 && gameBoard.board[ypos][xpos] === ' ')
    {
        gameBoard.board[ypos][xpos] = 'O';
        gameManager.current_turn--;
    }
    else if(turn === 0 && gameBoard.board[ypos][xpos] === ' ')
    {
        gameBoard.board[ypos][xpos] = 'X';
        gameManager.current_turn++;
    }
    updateBoard();
}

function addListeners() {
    let buttons = document.querySelectorAll(".boardCell");

    for(let i = 0; i < buttons.length; ++i)
    {
        let dataX = buttons[i].dataset.x;
        let dataY = buttons[i].dataset.y;
        buttons[i].addEventListener('click', e => {
            e.preventDefault();
            markSpot(dataX,dataY);
        });
    }
}

function initBoard() {
    let g_board = gameBoard.board;

    for(let y = 0; y < 3; ++y)
    {
        for(let x = 0; x < 3; ++x)
            g_board[y][x] = " ";
    }
}

function updateBoard() {
    let g_Board = gameBoard.board;
    let r_Buttons = document.querySelectorAll('.cellText');
    let count = 0;
    for(let y = 0; y < g_Board.length; ++y)
    {
        for(let x = 0; x < g_Board[y].length; ++x)
        {
            r_Buttons[count].innerHTML = g_Board[y][x];
            count++;
        }
    }
    scanBoard();
}

function renderBoard() {
    let r_Board = document.getElementById('gameBoard');
    let g_board = gameBoard.board;
    for(let y = 0; y < 3; ++y)
    {
        for(let x = 0; x < 3; ++x)
        {
            if(x % 3 === 0)
                r_Board.innerHTML += `<br>`;
            r_Board.innerHTML += `
            <button data-y=${y} data-x=${x} class="boardCell">
            <h1 class="cellText">${g_board[y][x]}</h1>
            </button>
            `;
        }
    }
    r_Board.innerHTML += '<br>';
    addListeners();
}

function scanBoard() {
    let xCoords = [];
    let oCoords = [];
    let board = gameBoard.board;
    for(let y = 0; y < board.length; y++)
    {
        for(let x = 0; x < board[y].length; x++)
        {
            if(board[y][x] !== ' ' && board[y][x] === prof_x.marker)
                xCoords.push(x);
            else if (board[y][x] !== ' ' && board[y][x] === dr_o.marker)
                oCoords.push(x);
        }
    }

    console.log("X coords: " + xCoords);
    console.log("O coords: " + oCoords);
}


const prof_x = player('X');
const dr_o = player('O');
initBoard();
renderBoard();