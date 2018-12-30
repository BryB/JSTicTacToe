const gameManager = (() => {
    let turns = 0;
    let current_turn = 'X';
    let started = 0;
    return {
        turns,
        current_turn,
        started,
    };
})();

const gameBoard = (() => {
    let board =[
    [ , , ],
    [ , , ],
    [ , , ]
    ];
    return {
    board
    };
})();

const player = type => {
    let marker = type;
};

function markSpot(xpos, ypos) {
    let player = gameManager.current_turn;
    if(player === 'O' && gameBoard.board[ypos][xpos] === '&#8205')
    {
        gameBoard.board[ypos][xpos] = player;
        gameManager.current_turn = 'X';
        gameManager.turns++;
        scanForWinner(parseInt(ypos), parseInt(xpos), player);
    }
    else if(player === 'X' && gameBoard.board[ypos][xpos] === '&#8205')
    {
        gameBoard.board[ypos][xpos] = player;
        gameManager.current_turn = 'O';
        gameManager.turns++;
        scanForWinner(parseInt(ypos), parseInt(xpos), player);
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

function resetText() {
    let cellText = document.querySelectorAll(".cellText");
    let g_board = gameBoard.board;
        for(let i = 0; i < cellText.length; ++i)
            cellText[i].innerHTML = "&#8205";
}

function initBoard() {
    for(let y = 0; y < 3; ++y)
        for(let x = 0; x < 3; ++x)
            gameBoard.board[y][x] = "&#8205";
}

function updateBoard() {
    let g_Board = gameBoard.board;
    let r_Buttons = document.querySelectorAll('.cellText');
    let count = 0;
    for(let y = 0; y < g_Board.length; ++y)
        for(let x = 0; x < g_Board[y].length; ++x)
        {
            r_Buttons[count].innerHTML = g_Board[y][x];
            count++;
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

function scanForWinner(y, x, player)
{
    let n = 3;
    let board = gameBoard.board;
    let turns = gameManager.turns;
    
    if(turns < n + (n - 1))
        return ;
    for (let i = 0; i < n; ++i)
    {
        if(board[i][x] !== player)
            break ;
        if(i === n - 1)
            winner(player);
    }
    for (let i = 0; i < n; ++i)
    {
        if(board[y][i] !== player)
            break ;
        if(i === n - 1)
            winner(player);
    }
    if (x == y)
        for(let i = 0; i < n; ++i)
        {
            if(board[i][i] !== player)
                break;
            if(i === n - 1)
                winner(player);
        }
    if (x + y == n - 1)
        for(let i = 0; i < n; ++i)
        {
            if(board[i][(n - 1 ) - i] !== player)
                break;
            if(i === n - 1)
                winner(player);
        }
    if (turns >= (n * n))
        resetGame();
}

function winner(player) {
    let header =  document.getElementById('header');
    
    header.innerHTML = player + ' Has Won!';
    gameManager.current_turn = 'X';
    gameManager.turns = 0;
    initBoard();
    resetText();
}

function resetGame() {
    location.reload();
}

initBoard();
renderBoard();