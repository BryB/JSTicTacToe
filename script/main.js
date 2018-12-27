let started = 0;

const gameBoard = (() => {
    let board =[
    [ , , ],
    [ , , ],
    [ , , ]
    ];
    const modBoard = (symbol,x, y) => board[x][y] = symbol;
    return {
    modBoard,
    board,
    };

})();

const player = type => {
    let marker = type;
    const mark = (x, y) => {
       console.log(marker, x, y);
    };
    return{mark};
};

function addListeners() {
    let buttons = document.querySelectorAll(".boardCell");

    for(let i = 0; i < buttons.length; ++i)
    {
        buttons[i].addEventListener('click', function() {
        console.log('clicked');
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
  //  console.log(r_Buttons);
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
gameBoard.modBoard('X', 0, 1);
gameBoard.modBoard('X', 0, 2);
updateBoard();