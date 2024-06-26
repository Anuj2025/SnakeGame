const playboard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".Score");
const highScoreElement = document.querySelector(".high-Score");
const controls = document.querySelectorAll(".controls i");
const loader = document.querySelector(".loader");
const main = document.querySelector("main");

const endboard = document.querySelector(".End-board");





let gameOver = false;
let foodX, foodY;
let snakeBody = [];
let snakeX = 5, snakeY = 10;
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("high-Score") || 0;
highScoreElement.innerHTML = `highScore : ${highScore}`;
//loader 


window.addEventListener('load', () => {
  setInterval(() => {
    loader.style.display = 'none';
    main.style.display = 'block';
  }, 1000);
});

// randomization the food 

const ChangePosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
}

// Game Over Time Limit
const GamOverTime = () => {
  clearInterval(setIntervalId);
  location.reload();
}

//gameover alert 

const handleGameOver = () => {
  playboard.style.display = 'none';
  endboard.style.display = 'block';
  setInterval(GamOverTime, 3000);
}



// change the direction of snake with keys
const ChangeDirectiom = (e) => {
  if (e.key === 'ArrowDown') {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === 'ArrowUp') {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === 'ArrowLeft') {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === 'ArrowRight') {
    velocityX = 1;
    velocityY = 0;
  }
}


controls.forEach(key => {
  key.addEventListener('click', () => ChangeDirectiom({key: key.dataset.key }));
});


// main game Charectoars
const initGame = () => {
  
  if (gameOver) return handleGameOver();
  
  let htmlmarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX} "></div>`;
  
  for (var i = snakeBody.length - 1; i > 0 ; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  
  // updating the snake position 
  snakeX += velocityX;
  snakeY += velocityY;
  
  // changing food position after snake eats
  
  if (snakeX == foodX && snakeY == foodY ) {
    ChangePosition();
    snakeBody.push([foodX, foodY]);
    score++;
    
   scoreElement.innerHTML = `score: ${score}`;
   highScore = score >= highScore ? score: highScore;
   
   localStorage.setItem("highScore", highScore);
   highScoreElement.innerHTML = `highScore : ${highScore}`;
   
   highScoreElement.innerHTML = highScore + localStorage.getItem(valueOf.highScoreElement)
   
  }
  
  snakeBody[0] = [snakeX, snakeY];
  
  
  // wall over
  
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }
  
  for (var i = 0; i < snakeBody.length; i++) {
htmlmarkup += `<div class="snake" style="grid-area: ${snakeBody[i][0]} / ${snakeBody[i][1]} "></div>`;
if (i === 0 && snakeBody[i][0] === snakeBody[i][1] && snakeBody[i][1] === snakeBody[i][0] ) {
  gameOver = false;
}
  }
  
  
  playboard.innerHTML = htmlmarkup;
}

ChangePosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener('keydown', ChangeDirectiom);
