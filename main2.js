const canvas2 = document.querySelector('canvas');
const ctx2 = canvas.getContext('2d')


const images = {
bg:
    './images/fondoCalle.png',
  rappi:
    'https://abacolatam.com/dist/landing/images/rappi.svg',
  logo:
    'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/logo.png?raw=true',
}

let interval;
let frames = 0;
const obstacles = [];
const users =   [];
const foods = [];
let score = 0;
let hp = 4


class Board {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas2.width;
    this.height = canvas2.height;
    this.img = new Image();
    this.img.src = images.bg;
  };
  draw() {
    this.x--;
    if (this.x < -canvas2.width) this.x = 0;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.img, this.x + canvas2.width, this.y, this.width, this.height);
  }
}

class Rappi {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0
    this.vy = 0
    this.animate = 0;
    this.width = 75;
    this.height = 75;
    this.img = new Image();
    this.img.src = "./images/rappisprite.png";
    };

  draw() {
    if (this.y > canvas2.height - this.height ) { 
      this.y = canvas2.height - this.height
    } else {
      ctx.drawImage(this.img,(this.animate * 896) / 3, 0,  896 / 3,279,this.x,this.y,this.width,this.height
            );
    }
    if (this.y < !this.y + 134) {
       this.y = !this.y + 134 
      } else {
        ctx.drawImage(this.img,(this.animate * 896) / 3, 0,  896 / 3,279,this.x,this.y,this.width,this.height
        );
        };
    };
  
  fly() {
    this.y -= 80;
  }
  moveRight() {
    this.x += 42
  }
  moveLeft() {
    this.x -= 42
  }
  moveUp() {
    this.y -= 42;
    
    if (this.y < !this.y + 134 ) { 
      this.width = this.width - 0;
      this.height = this.height - 0;
      this.x += 0;
    } else {
      this.width = this.width - 3;
      this.height = this.height - 3;
      this.x += 15;
    }
   
  }
  moveDown() {
    this.y += 42
    
    if (this.y >= canvas2.height - this.height ) { 
      this.width = this.width + 0;
      this.height = this.height + 0;
      this.x -= 0;
    } else {
      this.width = this.width + 3;
      this.height = this.height + 3;
      this.x -= 15;
    }
    
  }
  isTouching(obstacle) {
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y
    );
  }
}


function RappiAnimation() {
  const users = new Users();
  if (frames % 23 === 0) {
    if (rappi.animate === 2) {
        console.log()
        rappi.animate = 0
    } else {
      rappi.animate++

    }
  }
}


class Obstacle {
  constructor(y) {
    this.x = canvas2.width + 50;
    this.y = y;
    this.height = 80;
    this.width = 110;
    this.animate = 0;
    this.img = new Image();
    this.img.src = "./images/uberstring.png";
    

  }
    draw() {
        this.x = this.x - frames /300  
        if (frames % 14 === 0) {
          if (this.animate === 2) {
             this.animate = 0
          }
          this.animate++
          }
        if (this.y >= canvas2.height - this.height) { 
          this.y = canvas2.height - this.height - 12
        } else {
          ctx.drawImage(this.img,(this.animate * 603) / 3, 0,  602 / 3,  121,this.x,this.y,this.width,this.height);
        }
          if (this.y < !this.y + 210) {
             this.y = !this.y + 210 

            } else {
              ctx.drawImage(this.img,(this.animate * 603) / 3, 0,  602 / 3,  121,this.x,this.y,this.width,this.height);
              };
              
          };
   }

function generateObstacles(){

  if (frames % 100 === 0) {
    const randomPosition = Math.floor(Math.random() * canvas2.height) + 50
    const obs = new Obstacle(randomPosition)
    obstacles.push(obs)
  }
};

function drawObstacles() {
  obstacles.forEach(obs => obs.draw())
}


class Users {
  constructor(x) {
    this.x = x;
    this.y = 147;
    this.animate = 0;
    this.height = 60;
    this.width = 30;
    this.img = new Image();
    this.img.src = "./images/mansprite.png";
    this.img.onload = () => {
      this.draw()
    }
  }
    draw() { 
      this.x--;
      if (frames % 14 === 0) {
        if (this.animate === 3) {
           this.animate = 0
        }
        this.animate++
        }
      ctx.drawImage(
        this.img,(this.animate * 254) / 4,0,63.5,126,this.x,this.y,this.width,this.height
      )       
   }
  }
  
  function generateUsers (){
    if (frames % 80 === 0) {
      const randomPosition = Math.floor(Math.random() * canvas2.width) 
      const us = new Users(randomPosition)
      users.push(us)
    }
  };
  
  function drawUsers() {
    users.forEach(us => us.draw())
  }

  
  
  class Food {
    constructor(y) {
      this.x = canvas2.width ;
      this.y = y;
      this.height = 45;
      this.width = 35;
      this.animate = 0;
      this.img = new Image();
      this.img.src = "./images/groceries.png";
      this.img.onload = () => {
      this.draw()
      }
    }
      draw() {
          this.x--;

          if (frames % 14 === 0) {
            if (this.animate === 3) {
               this.animate = 0
            }
            this.animate++
            }
          if (this.y >= canvas2.height - this.height) { 
            this.y = canvas2.height - this.height - 12
          } else {
            ctx.drawImage(this.img,(this.animate * 640) / 4, 0,  640 / 4,  172,this.x,this.y,this.width,this.height
            );
          }
            if (this.y < !this.y + 210) {
               this.y = !this.y + 210 
  
              } else {
                ctx.drawImage(this.img,(this.animate * 640) / 4, 0, 640 / 4, 172,this.x,this.y,this.width,this.height
                );
                };
                
            };
     }
  
  function generateFood(){
    if (frames % 430 === 0) {
      const randomPosition = Math.floor(Math.random() * canvas.height) + 50
      const fo = new Food(randomPosition)
      foods.push(fo)
    }
  };
  
  function drawFood() {
    foods.forEach(fo => fo.draw())
  }
  
 

window.onload = function() {
  document.getElementById("Player2").onclick = function() {
    start()
  }
};
function clearCanvas() {
  ctx.clearRect(0, 0, canvas2.width, canvas2.height);
}

class Healt {
  constructor(){
      this.x = 600;
      this.y = 10;
      this.width =  180;
      this.height = 57;
      this.image = new Image();
      this.image.src = '';
  }
  draw(){
      if (hp === 3) this.image.src = './images/dead1.png';
      if (hp === 2) this.image.src = './images/dead2.png';
      if (hp === 1) this.image.src = './images/dead.png';

      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}


class Boardscore {
  constructor(){
      this.x = 10;
      this.y = 10;
      this.width =  80;
      this.height = 80;
      this.image = new Image();
      this.image.src = './images/scoreboard.png';
  }
  draw(){
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
function drawScore(){
  ctx.font = '30px Arial'
  ctx.fillStyle = 'red';
  ctx.fillText(` ${score}`, 54, 70)
}

function userScore(){
  users.forEach((us, i) => {
    if (rappi.isTouching(us)) { setTimeout (
      users.splice(i, 1),10000)  
    }
  })
}

function foodscore (){
  foods.forEach((fo, i) => {
  if (rappi.isTouching(fo)) {
    foods.splice(i, 1)
    score += 1
  }
})
}


function checkCollition() {
  // setInterval
  obstacles.forEach((obs, i) => {
    if (rappi.isTouching(obs)) {
      obstacles.splice(i, 1)
      hp -=1
    }
  })
  };

function gameOver() {
  if (hp <= 0) {
    clearInterval(interval)
    ctx.font = '30px Arial'
    ctx.fillStyle = 'white'
    ctx.fillText('Game Over', canvas2.width / 2 - 30, canvas2.height / 2 - 10)
    clearCanvas();
    console.log(score)
  }
}
function start() {
  goFullScreen(document.querySelector('canvas'))
  if (interval) return;
  interval = setInterval(update, 1000 / 60);
}




document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 32:
      rappi.fly();
      break;
      case 37:
rappi.moveLeft()
break;
case 39:
  rappi.moveRight()
break;
case 38:
  rappi.moveUp()
  break;
case 40:
  rappi.moveDown()
  break;
    case 82:
      restart();
      break;

    default:
      break;
  }
};

document.onkeyup = e => {
  Rappi.x = 0
Rappi.y = 0
}



function update() {
  frames++;
  clearCanvas();
  board.draw();
  RappiAnimation();
  rappi.draw();
  healt.draw();
  boardscore.draw();
  generateObstacles();
  drawObstacles();
  generateUsers ();
  drawUsers();
  generateFood();
  drawFood();
  userScore();
  foodscore();
  drawScore();
  checkCollition();
  gameOver()
}


const board = new Board();
const rappi = new Rappi();
const healt = new Healt();
const boardscore = new Boardscore();





function goFullScreen(element) {
  if (element.requestFullscreen) element.requestFullscreen()
  else if (element.mozRequestFullScreen) element.mozRequestFullScreen()
  else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen()
  else if (element.msRequestFullscreen) element.msRequestFullscreen()
}