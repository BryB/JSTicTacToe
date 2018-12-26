let buttons = document.querySelectorAll('#boardCell');
const gameBoard = (() => {
    let board =[
    [ , , ],
    [ , , ],
    [ , , ]
    ];
    const modBoard = (symbol,x, y) => {
        if(!board[x][y])
            board[x][y] = symbol
    };
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

buttons.addEventListener('click', () => {
    console.log("clicked");
});

function setpiece(x,y,piece) {
    gameBoard.modboard(piece, x, y);
    renderBoard();
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
            <button data-y=${y} 
                    data-x=${x}>
            <h1 class="cellText">${g_board[x][y]}</h1>
            </button>
            `;
        }
    }
    r_Board.innerHTML += '<br>';
}

const prof_x = player('X');
const dr_o = player('O');

prof_x.mark(1, 4);
dr_o.mark(3,6);
renderBoard();
