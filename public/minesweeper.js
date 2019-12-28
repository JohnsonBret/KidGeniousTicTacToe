
//TODO - don't let the player put a flag on a revealed space
//TODO - Figure out why the revealed colors might be changing

let gameBoard = document.getElementById("board");

let numberOfMines = 30;
let numberOfFoundMines = 0;

let minesDisplay = document.getElementById("numMinesDisplay");
let minesDisplayString = `Mines ${numberOfMines}`;
minesDisplay.innerHTML = minesDisplayString;

const checkIfAllMinesFound = ()=>{
    if(numberOfFoundMines == numberOfMines)
    {
        alert("You Found all the Mines!  You Win!");
    }
}

const changeToRevealColorScheme = (clickedSquare)=>{
    if(clickedSquare.classList.contains("lightgreen"))
    {
        clickedSquare.classList.remove("lightgreen");
        clickedSquare.classList.add("lightskin");
    }
    else{
        clickedSquare.classList.remove("mediumgreen");
        clickedSquare.classList.add("darkskin");
    }
}

const randomlyPlaceMines = ()=>{
    for(let i = 0; i < numberOfMines; i++)
    {
        let row = Math.floor(Math.random() * 14) + 1;
        let column = Math.floor(Math.random() * 18) + 1;
        console.log(`Placing Mine on ->Row: ${row} Column: ${column} i is: ${i}`);

        let mineCell = document.getElementById(`c${column}r${row}`);

        //Contains a hidden mine? redo the random numbers and try and place mine again
        if(!mineCell.classList.contains("hiddenMine"))
        {
            mineCell.classList.add("hiddenMine");
        }
        else{
            i = i - 1;
            console.log("Double Mine - Go Again", i);
        }
        
    }
}

const checkAdjacentSquaresForZeroes = async (zeroCell)=>{
    let cellId = zeroCell.getAttribute("id");
    
    let c = parseInt(cellId.substring(cellId.lastIndexOf("c") + 1,cellId.lastIndexOf("r")));
    let r = parseInt(cellId.substring(cellId.lastIndexOf("r") + 1, cellId.length));
    
    console.log(`Checking cell at c${c} r${r}`);

    for(let x = -1; x <= 1; x++)
    {
        for(let y = -1; y <= 1; y++)
        {
            if(x == 0 && y ==0)
            {
                continue;
            }

            let cellx = c + x;
            let celly = r + y;
            if(cellx < 1 || cellx > 18)
            {
                continue;
            }
            if(celly < 1 || celly > 14)
            {
                continue;
            }
            
            let checkedAdjacentCell = document.getElementById(`c${cellx}r${celly}`);
            console.log(`Zero Checking cell at ${cellx} : ${celly}`);
            if(checkedAdjacentCell.children[0].innerHTML == "0")
            {
                console.log("Its Zero!")
                if(checkedAdjacentCell.children[0].style.display == "none")
                {
                    checkedAdjacentCell.children[0].style.display = "block";
                    checkedAdjacentCell.children[0].style.visibility = "hidden";
                    changeToRevealColorScheme(checkedAdjacentCell);
                    checkAdjacentSquaresForZeroes(checkedAdjacentCell);
                }
            }
            else if(checkedAdjacentCell.children[0].innerHTML == "M")
            {

            }
            else{
                checkedAdjacentCell.children[0].style.display = "block";
                changeToRevealColorScheme(checkedAdjacentCell);
            }
        }
    }
}

const revealSquare = async(clickedSquare)=>{

    if(clickedSquare.classList.contains("lightskin") || 
    clickedSquare.classList.contains("darkskin"))
    {
        console.log("Clicked a revealed square!");
        return;
    }

    if(clickedSquare.children[0])
    {
        clickedSquare.children[0].style.display = "block";
        console.log(clickedSquare.children[0].innerHTML);

        changeToRevealColorScheme(clickedSquare);


        if(clickedSquare.children[0].innerHTML == "0")
        {
            console.log("Its Zero!")
            clickedSquare.children[0].style.visibility = "hidden";
            await checkAdjacentSquaresForZeroes(clickedSquare);
        }
    }

}

const colorCellNumberBasedOnDanger = (cellNum, paragraph)=>{

    let color = "";

    if(cellNum == 1)
    {
        color = "blue";
    }
    else if(cellNum == 2)
    {
        color = "purple";
    }
    else if(cellNum == 3)
    {
        color = "orange";
    }
    else if(cellNum >= 4)
    {
        color = "red"
    }
    paragraph.style.color = color;
}

//Initalize cell mine counter number
//Check adjacent cell
//Check if the cell is in bounds
//Mine? -> increment mine counter number
//Probably a paragraph that is visibility hidden until clicked on then number or blank space is revealed
const countAdjacentMines = ()=>{

    for(let r = 1; r <= 14; r++)
    {
        for(let c = 1; c <= 18; c++)
        {
            // console.log(`Checking Row: ${r} Column ${c}`)
            let minesAdjacentToCurrentCell = 0;

            for(let x = -1; x <= 1; x++)
            {
                for(let y = -1; y <= 1; y++)
                {
                    cellx = c + x;
                    celly = r + y;
                    if(cellx < 1 || cellx > 18)
                    {
                        continue;
                    }
                    if(celly < 1 || celly > 14)
                    {
                        continue;
                    }
                    // console.log(`Checking cell at ${cellx} : ${celly}`);
                    let checkedAdjacentCell = document.getElementById(`c${cellx}r${celly}`);
                    if(checkedAdjacentCell.classList.contains("hiddenMine"))
                    {
                        minesAdjacentToCurrentCell++;
                    }
                }
            }

            let currentCell = document.getElementById(`c${c}r${r}`);

            let paragraphMineCount = document.createElement("p");
            //Comment this line out to see all the numbers and mines
            paragraphMineCount.style.display = "none";

            if(currentCell.classList.contains("hiddenMine"))
            {
                paragraphMineCount.innerHTML = "M";
            }
            else
            {
                paragraphMineCount.innerHTML = minesAdjacentToCurrentCell;
                colorCellNumberBasedOnDanger(minesAdjacentToCurrentCell,paragraphMineCount);
            }
            // paragraphMineCount.style.visibility = "hidden";
            currentCell.appendChild(paragraphMineCount);
        }
    }
}

for(let r = 1; r <= 14; r++)
{
    for(let c = 1; c <= 18; c++)
    {
  
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", `c${c}r${r}`);
        newDiv.classList.add("cell");

        if(r % 2 == 0)
        {
            if(c % 2 == 0)
            {
                newDiv.classList.add("lightgreen");
            }
            else{
                newDiv.classList.add("mediumgreen");
            }
        }
        else{
            if(c % 2 == 0)
            {
                newDiv.classList.add("mediumgreen");
            }
            else{
                newDiv.classList.add("lightgreen");
            }
        }

        newDiv.addEventListener("click", (event)=>{

            console.log("Clicked button: ", event.shiftKey, c, r);

            //Holding down shift? We are placing flags
            if(event.shiftKey)
            {
                if(event.target.classList.contains("flag"))
                {
                    event.target.classList.remove("flag");
                    if(event.target.classList.contains("hiddenMine"))
                    {
                        numberOfFoundMines--;
                    }
                }
                else{
                    if(event.target.children[0]== undefined)
                    {
                        return;
                    }
                   
                    if(event.target.children[0].style.display == "none")
                    {
                        event.target.classList.add("flag");

                        if(event.target.classList.contains("hiddenMine"))
                        {
                            numberOfFoundMines++;
                            console.log("Marked Mine", numberOfFoundMines);
                            checkIfAllMinesFound();
                        }
                    }
                    
                }
                
            }//Digging for mines
            else{
                if(event.target.classList.contains("flag"))
                {
                    console.log("You clicked a flag - nothing happens...");
                }
                else if(event.target.classList.contains("hiddenMine"))
                {
                    event.target.classList.add("showMine");
                    setTimeout(()=>{
                        alert("GAME OVER - You Blew up!");
                    }, 1000);
                    
                }
                else{
                    revealSquare(event.target);
                }
            }
        });


        gameBoard.appendChild(newDiv);
        // let rect = newDiv.getBoundingClientRect();
        // console.log(rect.top, rect.bottom, rect.left, rect.right);
    }
}

randomlyPlaceMines();
countAdjacentMines();