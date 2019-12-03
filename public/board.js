var socket = io('/');

let cells = document.getElementsByClassName("cell");

let cellArray = Array.from(cells);
let isPlayerOneTurn = true; 
let turnPlayerText = document.getElementById("turnText");

let clientPlayerNumber = "";
let isGameStarted = false;

let timeParagraph = document.getElementById("time");
setInterval(() => {
    timeParagraph.innerHTML = Date(Date.now()).toString();
}, 1000);


let playAgainBtn = document.getElementById("playAgain");

playAgainBtn.addEventListener("click", ()=>{

    socket.emit('playAgain', clientPlayerNumber, ()=>{
        console.log(`${clientPlayerNumber} wants to play again!`);
    });

    let endSection = document.getElementById("endGame");
    endSection.style.display = "none";
})

let quitBtn = document.getElementById("quit");

quitBtn.addEventListener("click", ()=>{
    console.log(`${clientPlayerNumber} wants to quit`);

    socket.emit('quitRequest', clientPlayerNumber, ()=>{
        console.log("Emitting quit event");
    });

    let endSection = document.getElementById("endGame");
    endSection.style.display = "none";

    location.href = "/lobby";
});



socket.on('playerNumber', function (data) {
    

    if(clientPlayerNumber === "")
    {
        clientPlayerNumber = data;
        console.log(`Player Number ${data}`);
    }
    
});

socket.on('gameStart', ()=>{
    isGameStarted = true;
    console.log(`Game Started is ${isGameStarted}`);
    updateTurnDisplay(); 
});

socket.on('gameWon', (playerNum)=>{
    isGameStarted = false;
    console.log(`${playerNum} has won the game!`)
    
    let winSection = document.getElementById("endGame");
    winSection.style.display = "grid";

    let winner = document.getElementById("winner");
    winner.innerHTML = playerNum;
});

socket.on('resetBoard', ()=>{
    let boardCells = document.getElementsByClassName("cell");
    let boardCellsArray = Array.from(boardCells);

    for(let i = 0; i < boardCellsArray.length; i++)
    {
        boardCellsArray[i].innerHTML = "";
    }

    isGameStarted = true;
    // isPlayerOneTurn = true;
});

socket.on('sendPlayersBackToLobby', ()=>{
    console.log("back to the lobby players");
    location.href = "/lobby";
});

const updateTurnDisplay = ()=>{
    let turnDisp = document.getElementById("turnText");
    let turnString = `It's ${isPlayerOneTurn ? "X's" : "O's"} turn.`;
    turnDisp.innerHTML = turnString;
}

socket.on('updateBoard', (playerNum, cell)=>{
    console.log(`Update Board Player ${playerNum} moved to ${cell}`);

    if(clientPlayerNumber === playerNum)
    {
        console.log("I'm not updating my own board! I already moved!");
        return;
    }

    isPlayerOneTurn = isPlayerOneTurn ? false : true;

    updateTurnDisplay();

    let cellToUpdate = document.getElementById(cell);

    if(playerNum === "PlayerOne")
    {
        cellToUpdate.innerHTML = "X";
    }
    else{
        cellToUpdate.innerHTML = "O";
    }

});



const onCellClicked = (cell)=>{

    if(!isGameStarted)
    {
        return;
    }

    if(cell.innerHTML != "")
    {
        alert(`Hey Dummy ${cell.innerHTML} is already in that cell!`);
        return;
    }

    if(isPlayerOneTurn && clientPlayerNumber === "PlayerTwo")
    {
        alert(`It's not your turn ${clientPlayerNumber}`)
        return;
    }

    if(!isPlayerOneTurn && clientPlayerNumber === "PlayerOne")
    {
        alert(`It's not your turn ${clientPlayerNumber}`)
        return;
    }

    isPlayerOneTurn ? cell.innerHTML = "X" : cell.innerHTML = "O";
    isPlayerOneTurn = isPlayerOneTurn ? false : true;

    updateTurnDisplay();

    socket.emit('playerMove', cell.id, clientPlayerNumber, ()=>{
        console.log("Emitting Player Move Event")
    });
}

for(let i = 0; i < cellArray.length; i++)
{
 cellArray[i].addEventListener("click", (event)=>{
    console.log(`You Clicked me I am cell: ${event.target.id}`);
    onCellClicked(event.target);
 });
}