const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

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
    this.width = 70;
    this.height = 70;
    this.img = new Image();
    this.img.src = images.rappi;
    };

  draw() {
    if (this.y > canvas.height - this.height ) { 
      this.y = canvas.height - this.height
    } else {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    if (this.y < !this.y + 136) {
       this.y = !this.y + 136 
      } else {
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        };
    };
  
  fly() {
    this.y -= 100;
  }
  moveRight() {
    this.x += 42
  }
  moveLeft() {
    this.x -= 42
  }
  moveUp() {
    this.y -= 42;
    
    if (this.y < !this.y + 136 ) { 
      this.width = this.width - 0;
      this.height = this.height - 0;
      this.x += 0;
    } else {
      this.width = this.width - 3;
      this.height = this.height - 3;
      this.x += 10;
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
      this.x -= 10;
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

class Obstacle {
  constructor(y) {
    this.x = canvas.width + 50;
    this.y = y;
    this.height = 70;
    this.width = 90;
    this.img = new Image();
    this.img.src = "./images/uberuber.png";
    

  }
    draw() {

        this.x = this.x - frames /300  
        if (this.y >= canvas.height - this.height) { 
          this.y = canvas.height - this.height - 12
        } else {
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
          if (this.y < !this.y + 210) {
             this.y = !this.y + 210 

            } else {
                ctx.drawImage(this.img, this.x, this.y , this.width, this.height);
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

const board = new Board();
const rappi = new Rappi();



class Users {
  constructor(x) {
    this.x = x;
    this.y = 147;
    this.height = 60;
    this.width = 30;
    this.img = new Image();
    this.img.src = "./images/man.png";
  }
    draw() { 
      this.x--;
      ctx.drawImage(this.img, this.x, this.y , this.width, this.height);         
   }};

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



window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    start()
    // startGame();
  }};

  // function startGame() {
  //   board.draw();
  //   Rappi.draw();

//     interval = setInterval(updateCanvas, 1000 / 60)
//   }
// };


function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
  frames++;
  clearCanvas();
  board.draw();
  rappi.draw();
  generateObstacles();
  drawObstacles();
  generateUsers ();
  drawUsers();
checkCollition();
}

function score (){
  score 
}

function checkCollition() {
  obstacles.forEach((obs) => {
    if (rappi.isTouching(obs)) {
      gameOver();
    }
    if (rappi.y <= 0 || rappi.y > canvas.height - rappi.height) {
      gameOver();
    }
  });
}

function gameOver() {
  ctx.font = '70px Courier';
  ctx.fillText('Game over', canvas.width / 2, canvas.height / 2);

  clearInterval(interval);
}
function start() {
  if (interval) return;
  interval = setInterval(update, 1000 / 60);
}

// function restart() {
//   interval = false;
//   rappi.x = 30;
//   rappi.y = 70;
//   start();
// }





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




