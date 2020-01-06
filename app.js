/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
/*Variables*/
let scores = [0,0];
let roundScore = 0;
let activePlayer = 0;
let dice;
const topDice = document.querySelector(".dice");
const buttonRoll = document.querySelector(".btn-roll");
const buttonHold = document.querySelector(".btn-hold");
const newGame = document.querySelector(".btn-new");
/*Functions*/
function changePlayer(){
    roundScore = 0;
    document.querySelector(`#current-${activePlayer.toString()}`).textContent = roundScore;;    
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove("active");   
    if(activePlayer === 0){
        activePlayer = 1;
    }else{activePlayer = 0;}
    document.querySelector(`.player-${activePlayer}-panel`).classList.add("active"); 
    topDice.style.display = "none"; 
}
function getRandomNumber(max){
    return Math.floor((Math.random()* max)  + 1);
}
function rollDice(){
    dice = getRandomNumber(6);    
    topDice.style.display = "block";   
    /*Display the result as a dice image*/   
    topDice.setAttribute("src", `dice-${dice.toString()}.png`);
    /*Select the current Player's total Score*/      
    if(dice !== 1){
        /*Add the Dice Roll to the Current Round Score*/
        roundScore += dice;
        /*Set the text-content of the current player to the current round Score*/
        document.querySelector(`#current-${activePlayer.toString()}`).textContent = roundScore;
    }else{           
            changePlayer();
        }     
    /*Change the Active Player On the Display*/         
}
function holdDice(){
    //Update Scores by adding the round score 
    scores[activePlayer] += roundScore;
    //Update the Score on the screen under the players name... 
    document.querySelector(`#score-${activePlayer.toString()}`).textContent = scores[activePlayer];  
    if(scores[activePlayer] >= 100){
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove("active");
        document.querySelector(`.player-${activePlayer}-panel`).classList.add("winner");
        topDice.style.display = "none";
        buttonRoll.removeEventListener("click", rollDice);          
        buttonHold.removeEventListener("click", holdDice); 
        document.querySelector(`#name-${activePlayer}`).textContent = "Winner!";
        let updateCurrent = document.querySelectorAll(".player-current-score");
        for(let i = 0; i<updateCurrent.length; i++){
            updateCurrent[i].textContent = 0;
        }
    }
    else{changePlayer();}    
}
function beginGame(){   
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove("winner");
    document.querySelector(`#name-${activePlayer}`).textContent = `Player ${activePlayer + 1}`;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;    
    document.querySelector(`.player-${activePlayer}-panel`).classList.add("active");
    document.querySelector("#score-0").textContent = scores[0];
    document.querySelector("#score-1").textContent = scores[1];
    buttonRoll.addEventListener("click", rollDice);
    buttonHold.addEventListener("click", holdDice);
}
/*Actions*/
/*Attach an event handler to the roll dice button*/
newGame.addEventListener("click", beginGame);
beginGame();
