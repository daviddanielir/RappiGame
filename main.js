const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')
const gamesong = document.querySelector('#game')

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
const users = [];
const foods = [];
let score = 0;
let hp = 6


class Board {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = images.bg;
  };
  draw() {
    this.x--;
    if (this.x < -canvas.width) this.x = 0;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
  }
}

class Rappi {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0
    this.vy = 0
    this.animate = 0;
    this.width = 88;
    this.height = 82;
    this.img = new Image();
    this.img.src = "./images/Rappi.png";
    };

  draw() {
    if (this.y > canvas.height - this.height ) { 
      this.y = canvas.height - this.height
    } else {
      ctx.drawImage(this.img,(this.animate * 800) / 3, 0,  800 / 3, 315,this.x,this.y,this.width,this.height
            );
    }
    if (this.y < !this.y + 125) {
       this.y = !this.y + 125 
      } else {
        ctx.drawImage(this.img,(this.animate * 800) / 3, 0,  800 / 3, 315,this.x,this.y,this.width,this.height
        );
        };

    if (this.y > canvas.width ) { 
          this.y = canvas.width 
      } else {
        ctx.drawImage(this.img,(this.animate * 800) / 3, 0,  800 / 3, 315,this.x,this.y,this.width,this.height
                );
        }
    };
    
  
  fly() {
    this.x-=80

  }
  moveRight() {
    this.x += 42
  }
  moveLeft() {
    this.x -= 42
  }
  moveUp() {
    this.y -= 42;
    
    if (this.y < !this.y + 125 ) { 
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
    
    if (this.y >= canvas.height - this.height ) { 
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
  if (frames % 14 === 0) {
    if (rappi.animate === 2) {
        rappi.animate = 0
    } else {
      rappi.animate++

    }
  }
}


class Obstacle {
  constructor(y) {
    this.x = canvas.width + 50;
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
        if (this.y >= canvas.height - this.height) { 
          this.y = canvas.height - this.height - 12
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
    const randomPosition = Math.floor(Math.random() * canvas.height) + 50
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
      if (frames % 9 === 0) {
        if (this.animate === 3) {
           this.animate = 0;
        }
        this.animate++
        }
      ctx.drawImage(
        this.img,(this.animate * 254) / 4,0, 254 / 4,126,this.x,this.y,this.width,this.height
      )       
   }
  }
  
  function generateUsers (){
    if (frames % 400 === 0) {
      const randomPosition = Math.floor(Math.random() * canvas.width) 
      const us = new Users(randomPosition)
      users.push(us)
    }
  };
  
  function drawUsers() {
    users.forEach(us => us.draw())
  }

  
  
  class Food {
    constructor(y) {
      this.x = canvas.width ;
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

          if (frames % 100 === 0) {
            if (this.animate === 3) {
               this.animate = 0
            }
            this.animate++
            }
          if (this.y >= canvas.height - this.height) { 
            this.y = canvas.height - this.height - 12
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
  document.getElementById("start-button").onclick = function() {
    start()
  }
};
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
      this.x = 7;
      this.y = 10;
      this.width =  100;
      this.height = 80;
      this.image = new Image();
      this.image.src = './images/scoreboard.png';
  }
  draw(){
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

class Credito {
  constructor(){
      this.x = 55;
      this.y = 20;
      this.width =  697;
      this.height = 437;
      this.image = new Image();
      this.image.src = './images/rappi100.jpg';
  }
  draw(){
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}




function drawScore(){
  ctx.font = '40px Arial'
  ctx.fillStyle = 'red';
  ctx.fillText(` ${score}`, 49, 74)
}

function userScore(){
  users.forEach((us, i) => {
    if (rappi.isTouching(us)) { setTimeout (
      users.splice(i, 1),10000)  
      gracias.volume = 0.1575
      gracias.play()
    }
  })

}

function foodscore (){
  foods.forEach((fo, i) => {
  if (rappi.isTouching(fo)) {
    foods.splice(i, 1)
    score += 1
    comida.volume = 0.2175
      comida.play()
  }
})
}




function checkCollition() {
  // setInterval
  obstacles.forEach((obs, i) => {
    if (rappi.isTouching(obs)) {
      obstacles.splice(i, 1)
      hp -=1
      aguas.volume = 0.1575
      aguas.play()
    }
  })
  };

function gameOver() {
  if (hp <= 0) {
    clearInterval(interval)
    ctx.font = '90px Arial'
    ctx.fillStyle = 'white'
    ctx.fillText('Game Over', canvas.width / 2 - 300, canvas.height / 2 );
    game.pause()
    perdiste.volume = 0.4075
    perdiste.play()    
  }
}

function winner () {

  if (score > 5){
    game.pause()
    aguas.pause()
    comida.pause()
    gracias.pause()
    perdiste.pause()
    clearCanvas();
    credito.draw();
    ganaste.volume = 0.3975;
    ganaste.play();   
  }
}


function start() {
  game.volume = 0.0675
  game.play()
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
  winner ()
}


const board = new Board();
const rappi = new Rappi();
const healt = new Healt();
const boardscore = new Boardscore();
const credito = new Credito ();





function goFullScreen(element) {
  if (element.requestFullscreen) element.requestFullscreen()
  else if (element.mozRequestFullScreen) element.mozRequestFullScreen()
  else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen()
  else if (element.msRequestFullscreen) element.msRequestFullscreen()
}