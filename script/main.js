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

const boardManager = (() => {
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
        renderManager.addListeners(); 
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

const renderManager = (() => {
    let scoreDisp1 = document.getElementById('player1');
    let scoreDisp2 = document.getElementById('player2');
    
    const getInfo = () => {
        let p1name = document.getElementById('p1name').value;
        let p2name = document.getElementById('p2name').value;
        if(p1name)
            gameManager.player1.setName(p1name);
        if(p2name)
            gameManager.player2.setName(p2name);
    }
    const renderScore = (player, score) => {
        let player1 = gameManager.player1.getName();
        if(player === player1)
            scoreDisp1.innerHTML = player + ": " + score;
        else
            scoreDisp2.innerHTML = player + ": " + score;
    }
    const initRender = () => {
        let started = document.getElementById('start');
        started.addEventListener('click', e => {
            e.preventDefault();
            getInfo();
            renderScore(gameManager.player1.getName(), 0);
            renderScore(gameManager.player2.getName(), 0);
            boardManager.initBoard();
            boardManager.renderBoard();
            document.getElementById('info').style.visibility = "hidden";
            document.getElementById('info').disabled = true;
        });
    }
    const addListeners = () => {
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
    return {
        getInfo,
        renderScore,
        initRender,
        addListeners,
    }
})();

const gameManager = (() => {
    let turnCount = 0;
    let turn = 1;
    let score1 = 0;
    let score2 = 0;
    const player1 = player('Player 1', 'X');
    const player2 = player('Player 2', 'O');
    const currentTurn = () => (turn % 2) === 1 ? player1 : player2;
    const nextTurn = () => ++turn;
    const getTurnCount = () => turnCount;
    const addTurn = () => ++turnCount;
    const getTurn = () => turn;
    const tagSpot = (x, y) => {
        let player = currentTurn();
        let blank = '&#8205';
        if(boardManager.board[y][x] === blank)
        {
            boardManager.board[y][x] = player.getTag();
            nextTurn();
            addTurn();
            checkWinner(y, x, player);
        }
        boardManager.updateBoard();
    }
    const dispWinner = (name) => {
        if(name === player1.getName())
            renderManager.renderScore(name, ++score1);
        else
            renderManager.renderScore(name, ++score2);
        turn = 1;
        turnCount = 0;
        boardManager.initBoard();
        boardManager.resetText();
    }
    const checkWinner = (y, x, player) => {
        let n = boardManager.board.length;
        let board = boardManager.board;
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
        player1,
        player2,
        currentTurn,
        nextTurn,
        getTurnCount,
        addTurn,
        tagSpot,
        dispWinner,
        checkWinner,
        resetGame,
    };
})();
renderManager.initRender();