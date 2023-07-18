let canvas = document.getElementById("gameCanvas")
let context = canvas.getContext("2d")

let width = 300
let height = 530
let canvasWidth = 300
let canvasHeight = 530

let gameOver=false;

canvas.width = width
canvas.height = height

let gravity=1.5
let fps=60

// Assets
let birdImage= new Image()
birdImage.src="img/bird.png"

let background= new Image()
background.src="img/background.png"

let floor= new Image()
floor.src="img/suelo.png"

let northPipe= new Image()
northPipe.src="img/tuberiaNorte.png"

let southPipe= new Image()
southPipe.src="img/tuberiaSur.png"

let spot = new Audio()
spot.src = "audios/punto.mp3"


let bird={
  x: 50,
  y: 150,
  w: 50,
  h: 50,
}

let pipes = new Array()
pipes[0] = {
  x: canvas.width,
  y: 0,
}

setInterval(loop, 1000 / fps)
function loop() {
  // Clear
    context.clearRect(0, 0, 300, 700)
  // Background
    context.drawImage(background, 0, 0)
    context.drawImage(floor, 0, canvas.height - floor.height)
  // Bird
    context.drawImage(birdImage, bird.x, bird.y)
  // Pipes
    for (var i = 0; i < pipes.length; i++) {
    let constant = northPipe.height + 90
    context.drawImage(northPipe, pipes[i].x, pipes[i].y)
    context.drawImage(southPipe, pipes[i].x, pipes[i].y + constant)

    // Pipe behavior
    pipes[i].x--
    if (pipes[i].y + northPipe.height < 80) {
      pipes[i].y = 0
    }
    if (pipes[i].x == 150) {
      pipes.push({
        x: canvas.width,
        y: Math.floor(Math.random() * northPipe.height) - northPipe.height,
      })
    }

    if (
      (bird.x + birdImage.width >= pipes[i].x &&
        bird.x <= pipes[i].x + northPipe.width &&
        (bird.y <= pipes[i].y + northPipe.height ||
          bird.y + birdImage.height >= pipes[i].y + constant)) ||
      bird.y + birdImage.height >= canvas.height - floor.height
    ) {
      window.location.reload()
    }

    if (pipes[i].x == bird.x) {
      score++
      spot.play()
    }
  }

  bird.y += gravity
  context.fillstyle = "rgba(0,0,0,1)"
  context.font = "25px Arial"
  context.fillText("Score: " + score, 10, canvas.height - 30)
}


//CONTROLES

function press() {
  bird.y -= 25
}

//resize()
function resize() {
  canvasHeight = window.innerHeight
  canvasWidth = window.innerWidth

  canvas.width = width
  canvas.height = height

  canvas.style.height = `${canvasHeight}px`
}
function pause(){
  location.pause()
}

window.addEventListener("keydown", press)
window.addEventListener("resize", resize)