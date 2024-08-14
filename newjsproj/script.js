
const start = document.getElementById('startButton');
const pop = document.getElementById('pop');
const closeP = document.getElementById('closeP');

start.addEventListener('click', function() {
    Gstart();
});
const reset = document.getElementById('restartButton');

reset.addEventListener('click', function() {
    Greset();
});



function Gstart() {
    gridSize = parseInt(document.getElementById("gridSize").value);
    if(gridSize > 7) {
        gridSize = 7;
    }
    create(gridSize);
    Greset();
}

function create(size) {
    const boardElement = document.getElementById("board");
    boardElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    boardElement.innerText = "";
    board = Array(size * size).fill("");

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `cell-${i}`;
        cell.onclick = () => makeMove(i);
        boardElement.appendChild(cell);
    }
}

function makeMove(index) {
    if (board[index] === "" && active) {
        board[index] = activeP;
        document.getElementById(`cell-${index}`).innerText = activeP;
        if (activeP === "X") {
            document.getElementById(`cell-${index}`).style.backgroundColor = "red";
        } else {
            document.getElementById(`cell-${index}`).style.backgroundColor = "blue";
        }
    }
    checkResult();
    activeP = activeP === "X" ? "O" : "X";
    changePlayer();

}

function checkResult() {
    const win = checkWin(gridSize);

    for (let value of win) {
        const [a, b, c, ...rest] = value;
        if (board[a] && value.every(index => board[index] === board[a])) {
            document.getElementById('popupText').innerText = `Player ${activeP} wins1`;
            if(activeP == "X") {
                document.getElementById('popupText').style.color = "Red";
            }
            else {
                document.getElementById('popupText').style.color = "Blue";
            }
            pop.style.display = 'block';
            active = false;
            Greset();
            return;
        }
    }

    if (!board.includes("")) {
        document.getElementById('popupText').innerText = `It is a draw!! Play again`;
        document.getElementById('popupText').style.color="yellow";
        pop.style.display = 'block';
        active = false;
        Greset();
    }
}

function checkWin(size) {
    const winArr = [];

    // Rows
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(i * size + j);
        }
        winArr.push(row);
    }

    // Columns
    for (let i = 0; i < size; i++) {
        const column = [];
        for (let j = 0; j < size; j++) {
            column.push(j * size + i);
        }
        winArr.push(column);
    }

    // Diagonals
    const d1 = [];
    const d2 = [];
    for (let i = 0; i < size; i++) {
        d1.push(i * size + i);
        d2.push(i * size + (size - i - 1));
    }
    winArr.push(d1);
    winArr.push(d2);

    return winArr;
}

function changePlayer() {
    const pX = document.getElementById("playerX");
    const pO = document.getElementById("playerO");

    if (activeP === "X") {
        pX.classList.add("active");
        pO.classList.remove("active");
    } else {
        pX.classList.remove("active");
        pO.classList.add("active");
    }
}

function displayMessage(message) {
    document.getElementById("message").innerText = message;
}

function Greset() {
    activeP = "X";
    active = true;
    board.fill("");
    document.querySelectorAll(".cell").forEach(cell => {
        cell.innerText = "";
        cell.style.backgroundColor="rgb(251, 94, 4)";
    });
    displayMessage("");
    changePlayer();
}

//For pop-up block

closeP.addEventListener('click', () => {
    pop.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === pop) {
        pop.style.display = 'none';
    }
});
