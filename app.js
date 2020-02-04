var express = require('express');

var app = express();

var path = require('path'); 
app.use(express.static(__dirname + "/public"));

const port = 3000;

app.get('/', (req, res)=>{

    res.status(200).sendFile(path.join(__dirname, 'index.html'));  
});

app.get('/lobby', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, 'lobby.html'));  
});

app.get('/minesweeper', (req, res)=>{
    console.log("Travis is ip: " + req.connection.remoteAddress);
    res.status(200).sendFile(path.join(__dirname, 'minesweeper.html'));
});

app.get('/boomerman', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, 'boomerman.html'));
});

var server = app.listen(port, ()=>{

    console.log(`Server is up on port ${port}`);
});

var io = require('socket.io').listen(server); 

let isPlayerOneTurn = true;
let numberOfPlayers = 0;

let playerOneID = "";
let playerTwoID = "";

let playerOneWantsToPlayAgain = false;
let playerTwoWantsToPlayAgain = false;

const resetPlayerIDs = ()=>{
     playerOneID = "";
     playerTwoID = "";
     numberOfPlayers = 0;                                        
}

const resetPlayersWantToPlayAgain = ()=>{
    playerOneWantsToPlayAgain = false;
    playerTwoWantsToPlayAgain = false;
}

const resetServerGameBoard = ()=>{

    console.log("Reset Server Game Board");

    gameBoard.r1_c1 = ""; 
    gameBoard.r1_c2 = ""; 
    gameBoard.r1_c3 = ""; 
    gameBoard.r2_c1 = ""; 
    gameBoard.r2_c2 = ""; 
    gameBoard.r2_c3 = ""; 
    gameBoard.r3_c1 = ""; 
    gameBoard.r3_c2 = ""; 
    gameBoard.r3_c3 = ""; 

    console.log(JSON.stringify(gameBoard, undefined,2));
}

let gameBoard = {
    r1_c1: "",
    r1_c2: "",
    r1_c3: "",
    r2_c1: "",
    r2_c2: "",
    r2_c3: "",
    r3_c1: "",
    r3_c2: "",
    r3_c3: "",
}

const bothPlayersWantToPlayAgain = ()=>{
    if(playerOneWantsToPlayAgain == true && playerTwoWantsToPlayAgain == true)
    {
        console.log("Both Players want to play again: True");
        return true;
    }
    else
    {
        return false;
    }
}

const checkThreeCells = (cell1, cell2, cell3)=>{
    console.log(`Cell 1 ${cell1} Cell 2 ${cell2} Cell 3 ${cell3}`);
    if(cell1 === "X" && cell2 === "X" && cell3 === "X")
    {
        return true;
    }
    else if(cell1 === "O" && cell2 === "O" && cell3 === "O"){
        return true;
    }
    else{
        return false;
    }

}

const checkWinner = ()=>{
    
    //HORIZONTAL
    if(checkThreeCells(gameBoard.r1_c1, gameBoard.r1_c2, gameBoard.r1_c3))
    {
        return true;
    }
    if(checkThreeCells(gameBoard.r2_c1, gameBoard.r2_c2, gameBoard.r2_c3))
    {
        return true;
    }
    if(checkThreeCells(gameBoard.r3_c1, gameBoard.r3_c2, gameBoard.r3_c3))
    {
        return true;
    }
    //VERTICAL
    if(checkThreeCells(gameBoard.r1_c1, gameBoard.r2_c1, gameBoard.r3_c1))
    {
        return true;
    }
    if(checkThreeCells(gameBoard.r1_c2, gameBoard.r2_c2, gameBoard.r3_c2))
    {
        return true;
    }
    if(checkThreeCells(gameBoard.r1_c3, gameBoard.r2_c3, gameBoard.r3_c3))
    {
        return true;
    }
    //DIAGONAL
    if(checkThreeCells(gameBoard.r1_c1, gameBoard.r2_c2, gameBoard.r3_c3))
    {
        return true;
    }
    if(checkThreeCells(gameBoard.r1_c3, gameBoard.r2_c2, gameBoard.r3_c1))
    {
        return true;
    }
    
    return false;
}


io.on('connection', function(socket){
    console.log(`a user connected Socket ID: ${socket.id}`);

    numberOfPlayers++;

    if(numberOfPlayers == 1)
    {
        playerOneID = socket.id;
        io.emit('playerNumber', 'PlayerOne');
        
    }
    else if(numberOfPlayers == 2)
    {
        playerTwoID = socket.id;
        io.emit('playerNumber', 'PlayerTwo');
        io.emit('gameStart');
    }
    else{
        console.log("Too many players Joining!");
        socket.disconnect(true);
        numberOfPlayers--;
    }

    console.log(`
    Number of players ${numberOfPlayers}
    Player one ID ${playerOneID}
    Player two ID ${playerTwoID}
    `);

    socket.on('playAgain', (playerNum)=>{
        console.log(`${playerNum} wants to play again!`)

        if(playerNum === "PlayerOne")
        {
            playerOneWantsToPlayAgain = true;
        }
        else if(playerNum === "PlayerTwo")
        {
            playerTwoWantsToPlayAgain = true;
        }

        if(bothPlayersWantToPlayAgain())
        {
            io.emit('resetBoard');
            resetServerGameBoard();
            resetPlayersWantToPlayAgain();
        }

    });
    

    socket.on('playerMove', (message, playerNum)=>{
        console.log(`Player ${playerNum} Moved to ${message}`);

        if(playerNum === "PlayerOne")
        {
            gameBoard[message] = "X";
        }
        else{
            gameBoard[message] = "O";
        }

        if(checkWinner())
        {
            console.log(`${playerNum} is the Winner!`);
            io.emit('gameWon', playerNum);
        }

        console.log(JSON.stringify(gameBoard, undefined,2));

        io.emit('updateBoard', playerNum, message);
    });

    socket.on('quitRequest', (playerNum)=>{
        console.log(`Player ${playerNum} wants to Quit he is a quitter`);
        io.emit('resetBoard');
        io.emit('sendPlayersBackToLobby');
        resetServerGameBoard();
        resetPlayersWantToPlayAgain();
        resetPlayerIDs();
    })
});



