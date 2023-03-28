const boxes=document.querySelectorAll(".box");
const gameInfo  =document.querySelector(".game-info")
const newGameBtn  =document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
//let's create a function to intialise the game
function intiGame(){
    currentPlayer='X';
    gameGrid=["","","","","","","","",""];
    // game ke start  UI empty hoga
  boxes.forEach((box,index)=>{
    box.innerText="";
    boxes[index].style.pointerEvents="all";
   box.classList= `box box${index+1}`
  })
  newGameBtn.classList.remove("active")
  gameInfo.innerText=`Current Player-${currentPlayer}`
}
intiGame();
boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
     
    })
})
// X or  O dala 
function handleClick(index){
   
   if(gameGrid[index] === ""){
    // update in UI
    boxes[index].innerText=currentPlayer;
    boxes[index].style.pointerEvents="none";
    // update in js 
    gameGrid[index] = currentPlayer;
    //swap kro turn ko
    swapTurn();
    //jeeta to nhi 
    checkGameOver();
   
   } 
  
}
function swapTurn(){
    if(currentPlayer === 'X'){
        currentPlayer='O';
    }
    else{
        currentPlayer ='X';
    }
    gameInfo.innerText=`Current Player-${currentPlayer}`
}
function checkGameOver(){
    // let answer="";
    winningPositions.forEach((position)=>{
          //all 3 boxes should be non-empty and exactly same in value
        if(( (gameGrid[position[0]] !== "") || (gameGrid[position[1]] !== "") || (gameGrid[position[2]]!== "") ) &&
        (gameGrid[position[0]] === gameGrid[position[1]]) &&  (gameGrid[position[1]] === gameGrid[position[2]])){
          gameInfo.innerText=`Winner Player-${gameGrid[position[0]]}`
          newGameBtn.classList.add("active");
             //now adding backgroundcolor to winner
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win")
      
        }
        //We know, NO Winner Found, let's check whether there is tie
  let fillCount  = 0;
   gameGrid.forEach((box)=>{
    if( box !== "")
    fillCount++;
  });
//board is filled ,game is tie
if(fillCount === 9){
    gameInfo.innerText='Game Tied !';
    newGameBtn.classList.add("active");
}   
    })
 
}
newGameBtn.addEventListener('click',()=>{

    intiGame();
})
