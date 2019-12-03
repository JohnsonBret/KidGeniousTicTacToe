let gameBoard = document.getElementById("board");

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


        gameBoard.appendChild(newDiv);
    }
}