var socket = io('http://localhost:3000/');

let cells = document.getElementsByClassName("cell");

let cellArray = Array.from(cells);
let isPlayerOneTurn = true; 
let turnPlayerText = document.getElementById("turnText");

let clientPlayerNumber = "";
let isGameStarted = false;


socket.on('playerNumber', function (data) {
    console.log(`Player Number ${data}`);

    clientPlayerNumber = data;
});

socket.on('gameStart', ()=>{
    isGameStarted = true;
    console.log(`Game Started is ${isGameStarted}`);
});



const onCellClicked = (cell)=>{

    if(!isGameStarted)
    {
        return;
    }

    if(cell.innerHTML != "")
    {
        return;
    }

    isPlayerOneTurn ? cell.innerHTML = "X" : cell.innerHTML = "O";
    isPlayerOneTurn = isPlayerOneTurn ? false : true;

    let text;
    if(isPlayerOneTurn)
    {
        text = "It's X's Turn";
    }
    else{
        text = "It's O's Turn";
    }
    turnPlayerText.innerHTML = text;

    socket.emit('playerMove', cell.id, ()=>{
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