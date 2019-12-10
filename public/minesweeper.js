let gameBoard = document.getElementById("board");

let numberOfMines = 30;

const randomlyPlaceMines = ()=>{
    for(let i = 0; i < numberOfMines; i++)
    {
        let row = Math.floor(Math.random() * 14) + 1;
        let column = Math.floor(Math.random() * 18) + 1;
        console.log(`Row: ${row} Column: ${column}`);

        let mineCell = document.getElementById(`c${column}r${row}`);

        //Contains a hidden mine? redo the random numbers and try and place mine again
        if(!mineCell.classList.contains("hiddenMine"))
        {
            mineCell.classList.add("hiddenMine");
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
                    checkAdjacentSquaresForZeroes(checkedAdjacentCell);
                }
            }
            else if(checkedAdjacentCell.children[0].innerHTML == "M")
            {

            }
            else{
                checkedAdjacentCell.children[0].style.display = "block";
            }
        }
    }
}

const revealSquare = async(clickedSquare)=>{
    clickedSquare.children[0].style.display = "block";

    console.log(clickedSquare.children[0].innerHTML);

    if(clickedSquare.children[0].innerHTML == "0")
    {
        console.log("Its Zero!")
        await checkAdjacentSquaresForZeroes(clickedSquare);
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
            console.log(`Checking Row: ${r} Column ${c}`)
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
                    console.log(`Checking cell at ${cellx} : ${celly}`);
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
                }
                else{
                    event.target.classList.add("flag");
                }
                
            }//Digging for mines
            else{
                if(event.target.classList.contains("hiddenMine"))
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
    }
}

randomlyPlaceMines();
countAdjacentMines();