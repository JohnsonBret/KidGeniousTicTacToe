var express = require('express');

var app = express();

var path = require('path'); 
app.use(express.static(__dirname + "/public"));

const port = 3000;

app.get('/', (req, res)=>{

    res.status(200).sendFile(path.join(__dirname, 'index.html'));  
});

var server = app.listen(port, ()=>{

    console.log(`Server is up on port ${port}`);
});

var io = require('socket.io').listen(server); 

let isPlayerOneTurn = true;
let numberOfPlayers = 0;

let playerOneID = "";
let playerTwoID = "";

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

    
    

    socket.on('playerMove', (message)=>{
        console.log(`Player Moved to ${message}`);
    });
});


