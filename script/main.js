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
    let cellText = document.querySelectorAll(".cellText");

    for(let y = 0; y < board.length; ++y)
        for(let x = 0; x < board[y].length; ++x)
        {
            cellText[counter].innerHTML = board[y][x];
            counter++;
        }
    }
    const resetText = () => {
        let cellText = document.querySelectorAll(".cellText");
        
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
    let scoreDisp1 = document.getElementById('player1');
    let scoreDisp2 = document.getElementById('player2');
    let score1 = 0;
    let score2 = 0;
    const player1 = player('Player 1', 'X');
    const player2 = player('Player 2', 'O');
    scoreDisp1.innerHTML = player1.getName() + ": " + score1;
    scoreDisp2.innerHTML = player2.getName() + ": " + score2;
    const currentTurn = () => (turn % 2) === 1 ? player1 : player2;
    const nextTurn = () => ++turn;
    const getTurnCount = () => turnCount;
    const addTurn = () => ++turnCount;
    const getTurn = () => turn;
    const getStarted = () => started;
    const setStarted = () => ++started;
    const tagSpot = (x, y) => {
        let player = currentTurn();
        let blank = '&#8205';
        if(gameBoard.board[y][x] === blank)
        {
            gameBoard.board[y][x] = player.getTag();
            nextTurn();
            addTurn();
            checkWinner(y, x, player);
        }
        gameBoard.updateBoard();
    }
    const dispWinner = (name) => {
        if(name === player1.getName())
            scoreDisp1.innerHTML = name + ": " +  ++score1;
        else
             scoreDisp2.innerHTML = name + ": " +  ++score2;
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
            if(board[i][x] !== player.getTag())
                break ;
            if(i === n - 1)
                dispWinner(player.getName());
        }
        for (let i = 0; i < n; ++i)
        {
            if(board[y][i] !== player.getTag())
                break ;
            if(i === n - 1)
                dispWinner(player.getName());
        }
        if (x == y)
            for(let i = 0; i < n; ++i)
            {
                if(board[i][i] !== player.getTag())
                    break;
                if(i === n - 1)
                    dispWinner(player.getName());
            }
        if (x + y == n - 1)
            for(let i = 0; i < n; ++i)
            {
                if(board[i][(n - 1 ) - i] !== player.getTag())
                    break;
                if(i === n - 1)
                    dispWinner(player.getName());
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

function addListeners() {
    let buttons = document.querySelectorAll(".boardCell");
    for(let i = 0; i < buttons.length; ++i)
    {
        let dataX = buttons[i].dataset.x;
        let dataY = buttons[i].dataset.y;
        buttons[i].addEventListener('click', e => {
            e.preventDefault();
            gameManager.tagSpot(parseInt(dataX),parseInt(dataY));
        });
    }
}

gameBoard.initBoard();
gameBoard.renderBoard();