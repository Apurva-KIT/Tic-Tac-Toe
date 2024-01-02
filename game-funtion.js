var container_ele = document.getElementById('container');
var board = initializeBoard();

var click_count = 0;
var currentPlayer = 'X';

const message_ele = document.getElementById('message');

const MAX_CLICK_COUNT_TO_CHECK_WINNER = 5;
const MAX_CLICK_COUNT = 9;

function findWinner(board,player) {

    for (i = 0; i < 3; i++) {

        if ((board[i][0] === player && board[i][1] === player && board[i][0] === player && board[i][2] === player )||
            (board[0][i] === player && board[1][i] === player && board[0][i] === player && board[2][i] === player)) {
            return true
        }
    }

    if (board[0][0] === player && board[1][1] === player && board[0][0] === player && board[2][2] === player) {
        return true;
    }

    return false;
}

function initializeBoard() {
    return [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
}

function isBoardFull(click_count) {
    return click_count === MAX_CLICK_COUNT;
}

function resetGame() {
    board = initializeBoard();
    console.log("Insiede rest",board);
    const spanElements = container_ele.querySelectorAll('span');

    spanElements.forEach(span => {
        span.parentNode.removeChild(span);
    });

    click_count = 0;
    currentPlayer = 'X';
}

function playGame() {
    message_ele.textContent = '';

    container_ele.addEventListener('click', (e) => {
        const grid_ele = document.getElementById(e.target.id);

        if (!grid_ele) {
            console.log("Invalid..")
            return;
        }

        let rc = e.target.id.split(/\D+/).filter(Boolean);

        let row_num = rc[0] - 1;
        let column_num = rc[1] - 1;


        if (isBoardFull(click_count)) {
            return;
        }

        const node = document.createElement("span");
        node.classList.add("material-icons");

        console.log("Board==>", board)

        if (currentPlayer === 'X') {
            node.textContent = "close";
            node.style.color = "lightblue";

            board[row_num][column_num] = 'X';

        }
        else {
            node.textContent = "panorama_fish_eye";
            node.style.color = "#e6adc0";

            board[row_num][column_num] = 'O';
        }

        grid_ele.appendChild(node);
        click_count++;

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        console.log("current player..", currentPlayer)

        if (click_count >= MAX_CLICK_COUNT_TO_CHECK_WINNER) {
            if(findWinner(board,currentPlayer)){
                message_ele.textContent = 'Winner : '+currentPlayer;
            }
        }

        if(click_count === MAX_CLICK_COUNT){
            message_ele.textContent = 'Draw!!!'
        }
    })
}

playGame();