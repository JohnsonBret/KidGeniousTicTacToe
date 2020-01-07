let gameBoard = document.getElementById("board");
let boomerman;

let boomermanPosition = {
    x: 1,
    y: 1,
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

const moveBoomerman = async(xPos, yPos)=>{

    if(!checkMoveStaysWithinBoardBoundary(boomermanPosition.x + xPos, boomermanPosition.y + yPos))
    {
        console.log("Out of bounds", xPos, yPos);
        return;
    }

    boomermanPosition.x = boomermanPosition.x + xPos;
    boomermanPosition.y = boomermanPosition.y + yPos;

    boomerman.style.gridColumn = `${boomermanPosition.x}/${boomermanPosition.x + 1}`;
    boomerman.style.gridRow = `${boomermanPosition.y}/${boomermanPosition.y + 1}`;
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








