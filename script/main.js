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
    let player = gameManager.current_turn;
    if(player === 1 && gameBoard.board[ypos][xpos] === ' ')
    {
        gameBoard.board[ypos][xpos] = 'O';
        gameManager.current_turn--;
        gameManager.turns++;
        scanForWinner(ypos, xpos, 'O');
    }
    else if(player === 0 && gameBoard.board[ypos][xpos] === ' ')
    {
        gameBoard.board[ypos][xpos] = 'X';
        gameManager.turns++;
        scanForWinner(parseInt(ypos), parseInt(xpos), 'X');
        gameManager.current_turn++;

    }
    updateBoard();
}

function winner(player) {
    console.log(player + " has won!");
}

function resetGame() {
    location.reload();
}


function scanForWinner(y, x, player)
{
    let n = 3;
    let counter = gameManager.turns;
    let board = gameBoard.board;

    if(counter < n + (n - 1))
        return ;
    for(let i = 0; i < n; ++i)
    {
        if(board[i][x] !== player)
            break ;
        if(i === n - 1)
            winner(player);
    }
    for(let i = 0; i < n; ++i)
    {
        if(board[y][i] !== player)
            break ;
        if(i === n - 1)
            winner(player);
    }
    if(x == y)
    {
        for(let i = 0; i < n; ++i)
        {
            if(board[i][i] !== player)
                break;
            if(i === n - 1)
                winner(player);
        }
    }
    if(x + y == n - 1) {
        for(let i = 0; i < n; ++i)
        {
            if(board[i][(n - 1 ) - i] !== player)
                break;
            if(i === n - 1)
                winner(player);
        }
    }
    if(counter >= (n * n))
        resetGame();
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
    gameManager.current_turn = 0;
    for(let y = 0; y < 3; ++y)
    {
        for(let x = 0; x < 3; ++x)
            gameBoard.board[y][x] = " ";
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
const prof_x = player('X');
const dr_o = player('O');
initBoard();
renderBoard();