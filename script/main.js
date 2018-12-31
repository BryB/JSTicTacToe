const player = (name,tag) => {
    const getName = () => name;
    const getTag = () => tag;
    const setName = (newName) => name = newName;
    return{
        getName,
        getTag,
        setName
    };
};

const gameBoard = (() => {
    let board =[
    [ , , ],
    [ , , ],
    [ , , ]
    ];
    let blank = '&#8205';
    let cellText = document.querySelectorAll(".cellText");
    let r_Board = document.getElementById('gameBoard');
    const initBoard = () => {
          for(let y = 0; y < 3; ++y)
            for(let x = 0; x < 3; ++x)
                board[y][x] = blank;
    }
    const renderBoard = () => {
        for(let y = 0; y < 3; ++y)
        {
            for(let x = 0; x < 3; ++x)
            {
                if(x % 3 === 0)
                    r_Board.innerHTML += `<br>`;
                r_Board.innerHTML += `
                <button data-y=${y} data-x=${x} class="boardCell">
                <h1 class="cellText">${board[y][x]}</h1>
                </button>
                `;
            }
        }
        r_Board.innerHTML += '<br>';
        addListeners();
    }
    const updateBoard = () => {
    let counter = 0;
    for(let y = 0; y < board.length; ++y)
        for(let x = 0; x < board[y].length; ++x)
        {
            cellText[counter].innerHTML = board[y][x];
            counter++;
        }
    }
    const resetText = () => {
        for(let i = 0; i < cellText.length; ++i)
            cellText[i].innerHTML = blank;
    }
    return {
        initBoard,
        updateBoard,
        renderBoard,
        resetText,
        board,
    };
})();

const gameManager = (() => {
    let turnCount = 0;
    let turn = 1;
    let started = 0;
    let header = document.getElementById('header');
    const player1 = player('Player 1', 'X');
    const player2 = player('Player 2', 'O');
    const currentTurn = () => turn % 2 === 1 ? player1 : player2;
    const nextTurn = () => ++turn;
    const getTurnCount = () => turnCount;
    const addTurn = () => ++turnCount;
    const getTurn = () => turn;
    const getStarted = () => started;
    const setStarted = () => ++started;
    const tagSpot = (x, y) => {
        let player = currentTurn;
        let winCheck = checkWinner();
        let blank = '&#8205';

        if(gameBoard.board[y][x] === blank)
        {
            gameBoard.board[y][x] = player.getTag;
            nextTurn();
            addTurn();
            winCheck(x, y, player);
        }
        gameBoard.updateBoard();
    }
    const dispWinner = (player) => {
        header.innerHTML = player.getName() + ' Has Won!';
        turn = 1;
        turnCount = 0;
        gameBoard.initBoard();
        gameBoard.resetText();
    }
    const checkWinner = (y, x, player) => {
        let n = gameBoard.board.length;
        let board = gameBoard.board;
        if(turnCount < n + (n - 1))
            return ;
        for (let i = 0; i < n; ++i)
        {
            if(board[i][x] !== player.getTag)
                break ;
            if(i === n - 1)
                dispWinner(player.getName);
        }
        for (let i = 0; i < n; ++i)
        {
            if(board[y][i] !== player.getTag)
                break ;
            if(i === n - 1)
                dispWinner(player.getName);
        }
        if (x == y)
            for(let i = 0; i < n; ++i)
            {
                if(board[i][i] !== player.getTag)
                    break;
                if(i === n - 1)
                    dispWinner(player.getName);
            }
        if (x + y == n - 1)
            for(let i = 0; i < n; ++i)
            {
                if(board[i][(n - 1 ) - i] !== player.getTag)
                    break;
                if(i === n - 1)
                    dispWinner(player.getName);
            }
        if (turnCount >= (n * n))
            resetGame();
    }
    const resetGame = () => {
        location.reload();
    }
    return {
        getTurn,
        currentTurn,
        nextTurn,
        getTurnCount,
        addTurn,
        getStarted,
        setStarted,
        tagSpot,
        dispWinner,
        checkWinner,
        resetGame,
    };
})();

/* done */
/*
function winner(player) {
    let header =  document.getElementById('header');

    header.innerHTML = player + ' Has Won!';
    gameManager.current_turn = 'X';
    gameManager.turnCount = 0;
    initBoard();
    resetText();
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

function resetText() {
    let cellText = document.querySelectorAll(".cellText");
    let g_board = gameBoard.board;
        for(let i = 0; i < cellText.length; ++i)
            cellText[i].innerHTML = "&#8205";
}


TODO: DONE MAYBE 


function markSpot(xpos, ypos) {
    let player = gameManager.current_turn;
    if (player === 'O' && gameBoard.board[ypos][xpos] === '&#8205')
    {
        gameBoard.board[ypos][xpos] = player;
        gameManager.current_turn = 'X';
        gameManager.turnCount++;
        scanForWinner(parseInt(ypos), parseInt(xpos), player);
    }
    else if (player === 'X' && gameBoard.board[ypos][xpos] === '&#8205')
    {
        gameBoard.board[ypos][xpos] = player;
        gameManager.current_turn = 'O';
        gameManager.turnCount++;
        scanForWinner(parseInt(ypos), parseInt(xpos), player);
    }
    updateBoard();
}

function initBoard() {
    for(let y = 0; y < 3; ++y)
        for(let x = 0; x < 3; ++x)
            gameBoard.board[y][x] = "&#8205";
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
    let turnCount = gameManager.turnCount;
    
    if(turnCount < n + (n - 1))
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
    if (turnCount >= (n * n))
        resetGame();
}

initBoard();
renderBoard();
*/

function addListeners() {
    let buttons = document.querySelectorAll(".boardCell");
    let tagger = gameManager.tagSpot();
    for(let i = 0; i < buttons.length; ++i)
    {
        let dataX = buttons[i].dataset.x;
        let dataY = buttons[i].dataset.y;
        buttons[i].addEventListener('click', e => {
            e.preventDefault();
            tagger(dataX,dataY);
        });
    }
}

gameBoard.initBoard();
gameBoard.renderBoard();222222222222