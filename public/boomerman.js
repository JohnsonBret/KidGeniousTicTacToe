let gameBoard = document.getElementById("board");

let boomerman;

let boomermanPosition = {
    x: 1,
    y: 1,
}

let explosionDurationTime = 1000;


let levelOne = {
    r1: [0,1,0,0,0,0,0,0, 1,0,0,0,0,0,0,0, 1,0,0,0,0,0,0,0],
    r2: [0,1,0,1,1,1,1,0, 1,0,0,0,0,0,0,0, 1,0,0,0,0,0,0,0],
    r3: [0,1,0,1,0,0,1,0, 1,0,0,0,0,0,0,0, 1,1,0,1,1,1,0,0],
    r4: [0,1,0,1,0,0,1,0, 1,0,0,0,0,0,0,0, 0,0,0,0,0,1,0,0],
    r5: [0,2,0,1,2,2,1,0, 1,0,0,0,0,0,0,0, 0,1,1,0,0,1,0,1],
    r6: [0,2,0,0,0,0,0,0, 1,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,1],
    r7: [0,1,0,0,0,0,0,0, 1,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,1],
    r8: [0,1,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,1,1,2,1,1,1],
    r9: [0,1,0,0,0,0,0,0, 1,1,1,1,1,1,1,0, 0,0,0,0,0,0,0,0],
    r10: [1,0,0,0,0,0,0,0, 1,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0],
    r11: [0,0,0,0,0,0,0,0, 1,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0],
    r12: [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
    r13: [1,1,1,1,1,0,0,0, 1,0,1,1,1,1,1,0, 0,0,0,0,0,0,0,0],
    r14: [0,0,0,0,1,0,0,0, 1,0,1,0,0,0,1,0, 0,0,0,0,0,0,0,0],
    r15: [1,0,1,0,1,0,0,0, 1,0,1,0,0,0,1,0, 0,0,0,0,0,0,0,0],
    r16: [1,0,1,0,1,0,0,0, 1,1,1,0,0,0,1,0, 0,0,0,0,0,0,0,0],
    r17: [1,0,0,0,0,0,0,0, 0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,0],
    r18: [1,0,1,1,1,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
    r19: [0,0,0,1,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0],
    r20: [0,1,0,1,0,0,0,0, 0,0,1,1,1,1,1,0, 1,0,0,1,0,0,0,0],
    r21: [0,1,0,1,0,0,0,0, 0,0,1,0,0,0,0,0, 1,0,1,1,1,0,0,0],
    r22: [0,1,0,1,0,0,0,0, 0,0,1,1,1,0,0,0, 1,0,0,1,0,0,0,1],
    r23: [0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 1,0,0,0,0,1,0,1],
    r24: [0,1,0,0,1,1,1,1, 0,0,0,0,0,0,0,0, 1,0,0,1,1,1,0,1]
}

const setupGameBoard = async ()=>{
    for(let y = 1; y <= 24; y++)
    {
        for(let x = 1; x <= 24; x++)
        {
      
            let newDiv = document.createElement("div");
            newDiv.setAttribute("id", `x${x}y${y}`);
            newDiv.classList.add("cell");
            newDiv.style.gridColumn = `${x}/${x+1}`;
            newDiv.style.gridRow = `${y}/${y+1}`;
    
            if(x % 2 == 0)
            {
                if(y % 2 == 0)
                {
                    newDiv.classList.add("lightgreen");
                }
                else{
                    newDiv.classList.add("mediumgreen");
                }
            }
            else{
                if(y % 2 == 0)
                {
                    newDiv.classList.add("mediumgreen");
                }
                else{
                    newDiv.classList.add("lightgreen");
                }
            }
    
            gameBoard.appendChild(newDiv);
            // let rect = newDiv.getBoundingClientRect();
            // console.log(rect.top, rect.bottom, rect.left, rect.right);
        }
    }

    generateWalls();
}

const generateWalls = ()=>{

    console.log("Generate Walls");

    for(let y = 1; y <= Object.keys(levelOne).length; y++)
    {

        for(let x = 0; x < levelOne[`r${y}`].length; x++)
        {
            console.log(` Current Cell is: ${levelOne[`r${y}`][x]}`);

            let currentCell = document.getElementById(`x${x+1}y${y}`)

            if(levelOne[`r${y}`][x] == 1)
            {
                if(currentCell.classList.contains("mediumgreen") || currentCell.classList.contains("lightgreen"))
                {
                    // console.log(`Remove medium green from x${x+1}, y${y}`);
                    currentCell.classList.remove("mediumgreen", "lightgreen");
                    // console.log(`I should be a wall x${x+1}, y${y} Current Cell`,currentCell);
                    currentCell.classList.add("wall");
                }
            }
            else if(levelOne[`r${y}`][x] == 2)
            {
                if(currentCell.classList.contains("mediumgreen") || currentCell.classList.contains("lightgreen"))
                {
                    currentCell.classList.remove("mediumgreen", "lightgreen");
                    currentCell.classList.add("breakWall");
                }
            }
        }
        
    }
}

const checkMoveStaysWithinBoardBoundary = (xPos, yPos)=>{

    console.log("Boundary Check", xPos, yPos);
    if(xPos > 24 || xPos < 0)
    {
        return false;
    }

    if(yPos > 24 || yPos < 0)
    {
        return false;
    }
    return true;
}

const checkDesiredMoveCellIsNotWall = (xPos, yPos) =>{
    let checkWallCell = document.getElementById(`x${xPos}y${yPos}`);

    if(checkWallCell.classList.contains("wall"))
    {
        console.log(`Wall in way at cell x${xPos}y${yPos}`);
        return true;
    }
    else if(checkWallCell.classList.contains("breakWall"))
    {
        console.log(`Break Wall in the way at cell X:${xPos} Y:${yPos}`);
        return true;
    }
    else{
        return false;
    }
}

const moveBoomerman = async(xPos, yPos)=>{

    if(!checkMoveStaysWithinBoardBoundary(boomermanPosition.x + xPos, boomermanPosition.y + yPos))
    {
        console.log("Out of bounds", xPos, yPos);
        return;
    }

    if(checkDesiredMoveCellIsNotWall(boomermanPosition.x + xPos, boomermanPosition.y + yPos))
    {
        return;
    }

    boomermanPosition.x = boomermanPosition.x + xPos;
    boomermanPosition.y = boomermanPosition.y + yPos;

    boomerman.style.gridColumn = `${boomermanPosition.x}/${boomermanPosition.x + 1}`;
    boomerman.style.gridRow = `${boomermanPosition.y}/${boomermanPosition.y + 1}`;
}

const checkIfDestructableWithinExplosion = (xPos, yPos, minX, maxX, minY, maxY)=>{

    for(let x = minX; x < maxX; x++)
    {
        let currentCell = document.getElementById(`x${x}y${yPos}`);

        if(currentCell.classList.contains("breakWall"))
        {
            console.log(`I blew up a wall at X${x} Y${yPos}`);
            currentCell.classList.remove("breakWall");
            currentCell.classList.add("rubble");
        }
    }

    for(let y = minY; y < maxY; y++)
    {
        let currentCell = document.getElementById(`x${xPos}y${y}`);

        if(currentCell.classList.contains("breakWall"))
        {
            console.log(`I blew up a wall at X${xPos} Y${y}`);
            currentCell.classList.remove("breakWall");
            currentCell.classList.add("rubble");
        }
    }
}

const createBombExplosion = (xPos, yPos)=>{
    let newExplosionX = document.createElement("div");
    newExplosionX.classList.add("explosion");
    console.log("Explode X!");

    let minX = xPos - 1;
    let maxX = xPos + 2;

    if(minX < 1)
    {
        minX = 1;
    }

    if(maxX > 25)
    {
        maxX = 25;
    }
    console.log(`Min X ${minX}, Max X ${maxX}`);
    newExplosionX.style.gridColumn = `${minX}/${maxX}`;
    newExplosionX.style.gridRow = `${yPos}/${yPos + 1}`;

    let newExplosionY = document.createElement("div");
    newExplosionY.classList.add("explosion");
    console.log("Explode Y!");

    let minY = yPos - 1;
    let maxY = yPos + 2;

    if(minY < 1)
    {
        minY = 1;
    }

    if(maxY > 25)
    {
        maxY = 25;
    }
    console.log(`Min Y ${minY}, Max Y ${maxY}`);
    newExplosionY.style.gridColumn = `${xPos}/${xPos + 1}`;
    newExplosionY.style.gridRow = `${minY}/${maxY}`;

    gameBoard.appendChild(newExplosionX);
    gameBoard.appendChild(newExplosionY);

    checkIfDestructableWithinExplosion(xPos, yPos, minX, maxX, minY, maxY);

    setTimeout(()=>{
        gameBoard.removeChild(newExplosionX); 
        gameBoard.removeChild(newExplosionY);}
        , explosionDurationTime );
}

const dropBomb = ()=>{
    let newBomb = document.createElement("div");
    newBomb.classList.add("bomb");
    console.log("Drop the Bomb!");
    newBomb.style.gridColumn = `${boomermanPosition.x}/${boomermanPosition.x + 1}`;
    newBomb.style.gridRow = `${boomermanPosition.y}/${boomermanPosition.y + 1}`;

    let bombSound = document.getElementById("soundBombDrop");
    bombSound.play();

    let bombX = boomermanPosition.x;
    let bombY = boomermanPosition.y;

    setTimeout(()=>{
        console.log(`Bomb Explodes at ${newBomb.style.gridColumn} ${newBomb.style.gridRow}`);
        createBombExplosion(bombX , bombY);
        gameBoard.removeChild(newBomb);
    }, 3000);

    gameBoard.appendChild(newBomb);
}

const getPlayerInput = async (event)=>{
    switch(event.key){
        case "ArrowUp":
            moveBoomerman(0, -1);
            break;
        case "ArrowDown":
            moveBoomerman(0, 1);
            break;
        case "ArrowLeft":
            moveBoomerman(-1, 0);
            break;
        case "ArrowRight":
            moveBoomerman(1, 0);
            break;
        case "x":
            dropBomb();
            break;
    }
}

const createBoomerman = async ()=>{
    boomerman = document.createElement("div");
    boomerman.setAttribute("id", "boomerman");
    boomerman.classList.add("boomerman");
    document.addEventListener("keydown", getPlayerInput);

    gameBoard.appendChild(boomerman);
}




const initializeGame = async ()=>{
    await setupGameBoard();
    await createBoomerman();
    moveBoomerman(0,0);
}

initializeGame();








