let gameBoard = document.getElementById("board");

let boomerman;

let isBoomermanAlive = true;
let isLevelLoading = false;

let boomermanPosition = {
    x: 1,
    y: 1,
}

let enemies = [];

let exitPosition = {
    x: -1,
    y: -1,
}

let levelClock;
let levelClockParagraph = document.getElementById("levelClock");
let levelTimeLimit = 120000;

let explosionDurationTime = 1000;

let levelOneEnemies = [
    {x: 3,y: 2},
    {x: 5,y: 2},
    {x: 1,y: 19},
]

let levelTwoEnemies = [
    {x: 5, y: 5},
    {x: 20, y: 20},
    {x: 10, y: 19},
]

let levelThreeEnemies = [
    {x: 12, y: 3},
    {x: 12, y: 5},
    {x: 12, y: 7},
]

let allLevelEnemies = [
    levelOneEnemies,
    levelTwoEnemies,
    levelThreeEnemies,
]

let levelOne = {
    r1:  [0,1,0,0,0,0,0,0, 1,0,0,0,0,0,0,0, 1,0,0,0,0,0,0,0],
    r2:  [0,1,0,1,1,1,1,0, 1,0,0,0,0,0,0,0, 1,0,0,0,0,0,0,0],
    r3:  [0,1,0,1,0,0,1,0, 1,0,0,0,0,0,0,0, 1,1,2,1,1,1,0,0],
    r4:  [0,1,0,1,0,0,1,0, 1,0,0,0,0,0,0,0, 0,0,0,0,0,1,0,0],
    r5:  [0,2,0,1,2,2,1,0, 1,0,0,0,0,0,0,0, 0,1,1,2,2,1,2,1],
    r6:  [0,2,0,0,0,0,0,0, 1,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,1],
    r7:  [0,1,0,0,0,0,0,0, 1,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,1],
    r8:  [0,1,0,0,0,0,0,0, 2,0,0,0,0,0,0,0, 0,0,1,1,2,1,1,1],
    r9:  [0,1,0,0,0,0,0,0, 1,1,1,1,1,1,1,0, 0,0,0,0,0,0,0,0],
    r10: [1,0,0,0,0,0,0,0, 1,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0],
    r11: [0,0,0,0,0,0,0,0, 1,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0],
    r12: [0,0,0,0,0,0,0,0, 2,0,2,0,0,0,0,0, 0,0,0,0,0,0,0,0],
    r13: [1,1,1,1,1,2,2,2, 1,0,1,1,1,1,1,0, 0,0,0,0,0,0,0,0],
    r14: [0,0,0,0,1,0,0,0, 1,0,1,0,0,0,1,0, 0,0,0,0,0,0,0,0],
    r15: [1,2,1,0,1,0,0,0, 1,0,1,0,0,0,1,0, 0,0,0,0,0,0,0,0],
    r16: [1,0,1,0,1,0,0,0, 1,1,1,0,0,0,1,0, 0,0,0,0,0,0,0,0],
    r17: [1,0,2,0,2,0,0,0, 0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,0],
    r18: [1,0,1,1,1,0,0,0, 0,0,0,0,0,0,2,0, 0,0,0,0,0,0,0,0],
    r19: [0,0,0,1,0,0,0,0, 0,0,0,0,0,0,2,0, 0,0,0,0,0,0,0,0],
    r20: [0,1,0,1,0,0,0,0, 0,0,1,1,1,1,1,2, 1,0,0,1,0,0,0,0],
    r21: [0,1,0,1,0,0,0,0, 0,0,1,0,0,0,0,0, 1,2,1,1,1,0,0,0],
    r22: [0,1,0,1,0,0,0,0, 0,0,1,1,1,0,0,0, 1,0,0,1,0,0,0,1],
    r23: [0,0,0,2,0,0,0,0, 0,0,0,0,0,0,0,0, 1,0,0,2,0,1,0,1],
    r24: [0,1,0,2,1,1,1,1, 0,0,0,0,0,0,0,0, 1,0,0,1,1,1,3,1]
}

let levelTwo = {
    r1:  [0,1,0,0,0,0,0,0, 1,0,0,0,0,0,0,0, 1,0,0,0,0,0,0,0],
    r2:  [0,1,0,1,1,1,1,0, 1,0,0,0,0,0,0,0, 1,0,0,0,0,0,0,0],
    r3:  [0,1,0,1,0,0,1,0, 1,0,0,0,0,0,0,0, 1,1,2,1,1,1,0,0],
    r4:  [0,1,0,1,0,0,1,0, 1,0,0,0,0,0,0,0, 0,0,0,0,0,1,0,0],
    r5:  [0,2,0,1,2,2,1,0, 1,0,0,0,0,0,0,0, 0,1,1,2,2,1,2,1],
    r6:  [0,2,0,0,0,0,0,0, 1,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,1],
    r7:  [0,1,0,0,0,0,0,0, 1,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,1],
    r8:  [0,1,0,0,0,0,0,0, 2,0,0,0,0,0,0,0, 0,0,1,1,2,1,1,1],
    r9:  [0,1,0,1,1,1,0,0, 1,1,1,1,1,1,1,0, 0,0,0,0,0,0,0,0],
    r10: [2,0,0,1,0,1,0,0, 1,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0],
    r11: [0,0,0,0,0,0,0,0, 1,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0],
    r12: [0,0,0,0,0,0,0,0, 2,0,2,0,0,0,0,0, 0,0,0,0,0,0,0,0],
    r13: [1,1,1,1,1,2,2,2, 1,0,1,1,1,1,1,0, 0,0,0,0,0,0,0,0],
    r14: [0,0,0,0,1,0,0,0, 1,0,1,0,0,0,1,0, 0,0,0,0,0,0,0,0],
    r15: [1,2,1,0,1,0,0,0, 1,0,1,0,0,0,1,0, 0,0,0,0,0,0,0,0],
    r16: [1,0,1,0,1,0,0,0, 1,1,1,0,0,0,1,0, 0,0,0,0,0,0,0,0],
    r17: [1,0,2,0,2,0,0,0, 0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,0],
    r18: [1,0,1,1,1,0,0,0, 0,0,0,0,0,0,2,0, 0,0,0,0,0,0,0,0],
    r19: [0,0,0,1,0,0,0,0, 0,0,0,0,0,0,2,0, 0,0,0,0,0,0,0,0],
    r20: [0,1,0,1,0,0,0,0, 0,0,1,1,1,1,1,2, 1,0,0,1,0,0,0,0],
    r21: [0,1,0,1,0,0,0,0, 0,0,1,0,0,0,0,0, 1,2,1,1,1,0,0,0],
    r22: [0,1,0,1,0,0,0,0, 0,0,1,1,1,0,0,0, 1,0,0,1,0,0,0,1],
    r23: [0,0,0,2,0,0,0,0, 0,0,0,0,0,0,0,0, 1,0,0,2,0,1,0,1],
    r24: [0,1,0,2,1,1,1,1, 0,0,0,0,0,0,0,0, 1,0,0,1,1,1,3,1]
}

let levelThree = {
    r1:  [0,1,0,0,0,0,0,0, 1,0,0,0,0,0,0,0, 1,0,0,0,0,0,0,0],
    r2:  [0,1,0,1,1,1,1,0, 1,0,0,0,0,0,0,0, 1,0,0,0,0,0,0,0],
    r3:  [0,1,0,1,0,0,1,0, 1,0,0,2,2,2,0,1, 1,1,2,1,1,1,0,0],
    r4:  [0,1,0,1,0,0,1,0, 1,0,0,0,0,2,0,1, 0,0,0,0,0,1,0,0],
    r5:  [0,2,0,1,2,2,1,0, 1,0,0,0,2,2,0,1, 0,1,1,2,2,1,2,1],
    r6:  [0,2,0,0,0,0,0,0, 1,0,0,0,0,2,0,1, 0,0,1,0,0,0,0,1],
    r7:  [0,1,0,0,0,0,0,0, 1,0,0,2,2,2,0,1, 0,0,1,0,0,0,0,1],
    r8:  [0,1,0,0,0,0,0,0, 2,0,0,0,0,0,0,1, 0,0,1,1,2,1,1,1],
    r9:  [0,1,0,1,1,1,0,0, 1,1,1,1,1,1,1,0, 0,0,0,0,0,0,0,0],
    r10: [2,0,0,1,0,1,0,0, 1,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0],
    r11: [0,0,0,0,0,0,0,0, 1,0,1,0,0,0,0,0, 0,0,0,0,0,0,0,0],
    r12: [0,0,0,0,0,0,0,0, 2,0,2,0,0,0,0,0, 0,0,0,0,0,0,0,0],
    r13: [1,1,1,1,1,2,2,2, 1,0,1,1,1,1,1,0, 0,0,0,0,0,0,0,0],
    r14: [0,0,0,0,1,0,0,0, 1,0,1,0,0,0,1,0, 0,0,0,0,0,0,0,0],
    r15: [1,2,1,0,1,0,0,0, 1,0,1,0,0,0,1,0, 0,0,0,0,0,0,0,0],
    r16: [1,0,1,0,1,0,0,0, 1,1,1,0,0,0,1,0, 0,0,0,0,0,0,0,0],
    r17: [1,0,2,0,2,0,0,0, 0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,0],
    r18: [1,0,1,1,1,0,0,0, 0,0,0,0,0,0,2,0, 0,0,0,0,0,0,0,0],
    r19: [0,0,0,1,0,0,0,0, 0,0,0,0,0,0,2,0, 0,0,0,0,0,0,0,0],
    r20: [0,1,0,1,0,0,0,0, 0,0,1,1,1,1,1,2, 1,0,0,1,0,0,0,0],
    r21: [0,1,0,1,0,0,0,0, 0,0,1,0,0,0,0,0, 1,2,1,1,1,0,0,0],
    r22: [0,1,0,1,0,0,0,0, 0,0,1,1,1,0,0,0, 1,0,0,1,0,0,0,1],
    r23: [0,0,0,2,0,0,0,0, 0,0,0,0,0,0,0,0, 1,0,0,2,0,1,0,1],
    r24: [0,1,0,2,1,1,1,1, 0,0,0,0,0,0,0,0, 1,0,0,1,1,1,3,1]
}

let allLevelGeometry = [
    levelOne,
    levelTwo,
    levelThree,
];

let currentLevel = 0;


const setupGameBoard = async (level)=>{
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

    generateWalls(level);
}

const generateWalls = (level)=>{

    console.log("Generate Walls");

    for(let y = 1; y <= Object.keys(level).length; y++)
    {

        for(let x = 0; x < level[`r${y}`].length; x++)
        {
            // console.log(` Current Cell is: ${levelOne[`r${y}`][x]}`);

            let currentCell = document.getElementById(`x${x+1}y${y}`)

            if(level[`r${y}`][x] == 1)
            {
                if(currentCell.classList.contains("mediumgreen") || currentCell.classList.contains("lightgreen"))
                {
                    // console.log(`Remove medium green from x${x+1}, y${y}`);
                    currentCell.classList.remove("mediumgreen", "lightgreen");
                    // console.log(`I should be a wall x${x+1}, y${y} Current Cell`,currentCell);
                    currentCell.classList.add("wall");
                }
            }
            else if(level[`r${y}`][x] == 2)
            {
                if(currentCell.classList.contains("mediumgreen") || currentCell.classList.contains("lightgreen"))
                {
                    currentCell.classList.remove("mediumgreen", "lightgreen");
                    currentCell.classList.add("breakWall");
                }
            }
            else if(level[`r${y}`][x] == 3)
            {
                if(currentCell.classList.contains("mediumgreen") || currentCell.classList.contains("lightgreen"))
                {
                    currentCell.classList.remove("mediumgreen", "lightgreen");
                    currentCell.classList.add("door");
                    exitPosition.x = x + 1;
                    exitPosition.y = y;
                    console.log(`Exit Position set to ${exitPosition.x} ${exitPosition.y}`);
                }
            }  
        }
    }
}

const checkMoveStaysWithinBoardBoundary = (xPos, yPos)=>{

    // console.log("Boundary Check", xPos, yPos);
    if(xPos > 24 || xPos <= 0)
    {
        return false;
    }

    if(yPos > 24 || yPos <= 0)
    {
        return false;
    }
    return true;
}

const checkDesiredMoveCellIsNotWall = (xPos, yPos) =>{

    if(!checkMoveStaysWithinBoardBoundary(xPos, yPos))
    {
        return;
    }

    let checkWallCell = document.getElementById(`x${xPos}y${yPos}`);

    if(checkWallCell.classList.contains("wall"))
    {
        // console.log(`Wall in way at cell x${xPos}y${yPos}`);
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

const checkBoomermanIsOnExit = (boomermanX, boomermanY)=>{
    return boomermanX == exitPosition.x && boomermanY == exitPosition.y;
}

const setBoomermanPosition = (xPos, yPos)=>{
    boomermanPosition.x = xPos;
    boomermanPosition.y = yPos;

    boomerman.style.gridColumn = `${boomermanPosition.x}/${boomermanPosition.x + 1}`;
    boomerman.style.gridRow = `${boomermanPosition.y}/${boomermanPosition.y + 1}`;
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

    if(checkBoomermanIsOnExit(boomermanPosition.x, boomermanPosition.y))
    {
        // alert("You Won the Level -> You are on the Exit!");
        // location.reload();
        if(isLevelLoading == false)
        {
            isLevelLoading = true;
            currentLevel++;
            await unLoadCurrentLevel();
            loadNextLevel(allLevelGeometry[currentLevel]);
        }

    }


    for(let e = 0; e < enemies.length; e++)
    {
        if(checkEnemyCollision(enemies[e].x, enemies[e].y))
        {
            if(enemies[e].isDead == false)
            {
                alert("Balloon enemy killed you~!");
                setBoomermanToDead(); 
            }
        }
    }
}

const removeExplosionSprites = (cells)=>{
    for(let i = 0; i < cells.length; i++){
        if(cells[i].classList.contains("explosion-center"))
        {
            cells[i].classList.remove("explosion-center");
        }

        if(cells[i].classList.contains("explosion-top"))
        {
            cells[i].classList.remove("explosion-top");
        }

        if(cells[i].classList.contains("explosion-bottom"))
        {
            cells[i].classList.remove("explosion-bottom");
        }

        if(cells[i].classList.contains("explosion-left"))
        {
            cells[i].classList.remove("explosion-left");
        }

        if(cells[i].classList.contains("explosion-right"))
        {
            cells[i].classList.remove("explosion-right");
        }
    }
}

const addBombExplosionSpritesToBoard = (xPos, yPos, minX, maxX, minY, maxY)=>{
    console.log(`Explosion Sprites xpos: ${xPos} ypos ${yPos} x-min:${minX} x-max:${maxX} y-min:${minY} ymax:${maxY}`)

    let cellDivArry = [];

    //Center Sprite

    
    let exploCenter = document.getElementById(`x${xPos}y${yPos}`);
    exploCenter.classList.add("explosion-center");
    cellDivArry.push(exploCenter);

    if(xPos != maxX)
    {
        let exploRight = document.getElementById(`x${maxX - 1}y${yPos}`);
        exploRight.classList.add("explosion-right");
        cellDivArry.push(exploRight);
    }

    if(xPos != minX)
    {
        let exploLeft = document.getElementById(`x${minX}y${yPos}`);
        exploLeft.classList.add("explosion-left");
        cellDivArry.push(exploLeft);
    }


    let exploTop = document.getElementById(`x${xPos}y${minY}`);
    exploTop.classList.add("explosion-top");
    cellDivArry.push(exploTop);

    let exploBottom = document.getElementById(`x${xPos}y${maxY - 1}`);
    exploBottom.classList.add("explosion-bottom");
    cellDivArry.push(exploBottom);

    return cellDivArry;

}

const setBoomermanToDead = () =>{
    boomerman.classList.remove("boomerman");
    boomerman.classList.add("boomerman-dead");
    isBoomermanAlive = false;

    setTimeout(()=>{
        location.reload();
    },3000)
}

const setBalloonToDead = (balloon) =>{
    balloon.elem.classList.remove("balloon");
    balloon.elem.classList.add("balloon-dead");
    balloon.isDead = true;

    setTimeout(()=>{
        gameBoard.removeChild(balloon.elem);
    },3000)
}


const checkIfBoomermanWithinExplosion = (xPos, yPos, minX, maxX, minY, maxY)=>{

    for(let x = minX; x < maxX; x++)
    {
        
        if(boomermanPosition.x == x && boomermanPosition.y == yPos)
        {
            console.log(`I blew up Boomerman at X${xPos} Y${y}`);
            alert("! Be careful with E X P L O S I V E S - You blew yourself up !");
            setBoomermanToDead();
        }
    }

    for(let y = minY; y < maxY; y++)
    {
        
        if(boomermanPosition.y == y && boomermanPosition.x == xPos)
        {
            console.log(`I blew up Boomerman at X${xPos} Y${y}`);
            alert("! Be careful with E X P L O S I V E S - You blew yourself up !");
            setBoomermanToDead();
        }
    }
}

const checkIfBalloonWithinExplosion = (xPos, yPos, minX, maxX, minY, maxY, balloon)=>{

    for(let x = minX; x < maxX; x++)
    {
        
        if(balloon.x == x && balloon.y == yPos)
        {
            console.log(`I blew up a Balloon at X${x} Y${yPos}`);
            setBalloonToDead(balloon);
        }
    }

    for(let y = minY; y < maxY; y++)
    {
        
        if(balloon.y == y && balloon.x == xPos)
        {
            console.log(`I blew up Balloon at X${xPos} Y${y}`);
            setBalloonToDead(balloon);
        }
    }
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
    
    let spriteCells = addBombExplosionSpritesToBoard(xPos, yPos, minX, maxX, minY, maxY);

    checkIfBoomermanWithinExplosion(xPos, yPos, minX, maxX, minY, maxY);

    //Check if any of our enemies are withing the explosion
    console.log(`Enemies LEngth ${enemies.length}`)
    for(let e = 0; e < enemies.length; e++){
    checkIfBalloonWithinExplosion(xPos, yPos, minX, maxX, minY, maxY, enemies[e]);
    }

    setTimeout(()=>{
        gameBoard.removeChild(newExplosionX); 
        gameBoard.removeChild(newExplosionY);
        removeExplosionSprites(spriteCells);
    }, explosionDurationTime );
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

    if(!isBoomermanAlive)
    {
        return;
    }

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

const checkEnemyCollision = (enemyX, enemyY)=>{
    return enemyX == boomermanPosition.x && enemyY == boomermanPosition.y;
}

const checkDesiredMoveCellHasNoEnemies = (desiredX, desiredY)=>{

    for(let i = 0; i < enemies.length; i++)
    {
        if(enemies[i].x == desiredX && enemies[i].y == desiredY)
        {
            return false;
        }
    }
    return true;
}

const chooseBalloonMoveDirection = ()=>{
    let xVec = Math.floor(Math.random() * 3 - 1);
    let yVec;
    if(Math.abs(xVec) == 1)
    {
        yVec = 0;
    }
    else{
        let rando = Math.random();
        yVec = rando > 0.5 ? 1 : -1;
    }

    // console.log(`Balloon New Direction X${xVec} Y${yVec}`)

    return {
        xVec,
        yVec
    }
}

const moveBalloonEnemy = (balloonEnemy)=>{

    if(balloonEnemy.isDead)
    {
        return;
    }

    if(checkDesiredMoveCellIsNotWall(balloonEnemy.x + balloonEnemy.xVec, balloonEnemy.y + balloonEnemy.yVec))
    {
        //Pick new move direction
        let balloonVec = chooseBalloonMoveDirection()
        balloonEnemy.xVec = balloonVec.xVec,
        balloonEnemy.yVec = balloonVec.yVec,
        moveBalloonEnemy(balloonEnemy);
        return;
    }
    
    if(!checkMoveStaysWithinBoardBoundary(balloonEnemy.x + balloonEnemy.xVec, balloonEnemy.y + balloonEnemy.yVec))
    {
        //Pick new move direction
        let balloonVec = chooseBalloonMoveDirection()
        balloonEnemy.xVec = balloonVec.xVec,
        balloonEnemy.yVec = balloonVec.yVec,
        moveBalloonEnemy(balloonEnemy);
        return;
    }

    if(!checkDesiredMoveCellHasNoEnemies(balloonEnemy.x + balloonEnemy.xVec, balloonEnemy.y + balloonEnemy.yVec))
    {
        //Pick new move direction
        let balloonVec = chooseBalloonMoveDirection()
        balloonEnemy.xVec = balloonVec.xVec,
        balloonEnemy.yVec = balloonVec.yVec,
        moveBalloonEnemy(balloonEnemy);
        return;
    }

     //Move that direction
     balloonEnemy.x = balloonEnemy.x + balloonEnemy.xVec;
     balloonEnemy.y = balloonEnemy.y + balloonEnemy.yVec;
 
     balloonEnemy.elem.style.gridColumn = `${balloonEnemy.x}/${balloonEnemy.x + 1}`;
     balloonEnemy.elem.style.gridRow = `${balloonEnemy.y}/${balloonEnemy.y + 1}`;
    
    if(checkEnemyCollision(balloonEnemy.x, balloonEnemy.y)){
        alert("You ran into a Balloon when Balloon Moved");
        setBoomermanToDead();
    }
}

const createEnemyBalloon = (xPos, yPos)=>{

    let balloonDiv = document.createElement("div");
    balloonDiv.classList.add("enemy");
    balloonDiv.classList.add("balloon");
    
    
    balloonDiv.style.gridColumn = `${xPos}/${xPos + 1}`;
    balloonDiv.style.gridRow = `${yPos}/${yPos + 1}`;

    let balloonVec = chooseBalloonMoveDirection();

    console.log(`Baloon Move Vector X${balloonVec.xVec}, Y${balloonVec.yVec}`);

    let balloon = {
        elem: balloonDiv,
        x: xPos,
        y: yPos,
        xVec: balloonVec.xVec,
        yVec: balloonVec.yVec,
        isDead: false,
        interval: null,
    }

    //Make interval smaller every level
    //currentLevel is where we are storing the level index
    //0 1 2 3
    //To make 1500 SMALLER??!!!!
    //Fraction
    let moveTime = 1500 / (currentLevel + 1);

    balloon.interval = setInterval(()=>{
        moveBalloonEnemy(balloon);
    }, moveTime);

    enemies.push(balloon);

    gameBoard.appendChild(balloonDiv);
}

const createBoomerman = async ()=>{
    boomerman = document.createElement("div");
    boomerman.setAttribute("id", "boomerman");
    boomerman.classList.add("boomerman");
    document.addEventListener("keydown", getPlayerInput);

    gameBoard.appendChild(boomerman);
}

const checkIfTimeIsUp = ()=>{
    return levelTimeLimit <= 0;
}

const resetLevelClock = ()=>{
    levelTimeLimit = 120000;
}

const startLevelClock = ()=>{
    let startTime = Date.now();

    levelClock = setInterval(() => {
        levelTimeLimit -= 1000;

        let minutes =  Math.floor(levelTimeLimit / 60000);
        let seconds = Math.round((levelTimeLimit / 1000) % 60);

        minutes = minutes < 0 ? 0 : minutes;
        seconds = seconds < 0 ? 0 : seconds;

        if(seconds < 10)
        {
            seconds = `0${seconds}`
        }

        let timeFormat = `Time left ${minutes}:${seconds}`;

        levelClockParagraph.innerHTML = timeFormat;

        if(checkIfTimeIsUp() && isBoomermanAlive){
            alert("You R - A - N out of TiMe...");
            setBoomermanToDead();
        }
    }, 1000);
}

const createLevelEnemies = (enemiesObject)=>{
    console.log("Create Level Enemies");

    for(let i = 0; i < enemiesObject.length; i++){
        createEnemyBalloon(enemiesObject[i].x, enemiesObject[i].y);
    }
}

const unLoadCurrentLevel = async()=>{
    while (gameBoard.firstChild) {
        gameBoard.firstChild.remove();
    }
}

const removeEnemiesFromLevel = async()=>{
    for(let i = 0; i < enemies.length; i++)
    {
        clearInterval(enemies[i].interval);
    }

    enemies = [];
}

const loadNextLevel = async(level)=>{
    await setupGameBoard(level);
    await createBoomerman();
    setBoomermanPosition(1,1);

    removeEnemiesFromLevel();
    createLevelEnemies(allLevelEnemies[currentLevel]);
    resetLevelClock();
    isLevelLoading = false;
}

const initializeGame = async ()=>{
    await setupGameBoard(allLevelGeometry[currentLevel]);
    await createBoomerman();
    moveBoomerman(0,0);

    console.log("Load Level Enemies");
    createLevelEnemies(allLevelEnemies[currentLevel]);
    startLevelClock();
}

initializeGame();








