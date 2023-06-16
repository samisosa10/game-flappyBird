let contexto = document.getElementById("gCanvas").getContext("2d")
contexto.canvas.width = 300
contexto.canvas.height =  700

let fps = 60
let gravedad = 1.5

let bird = {
    x: 100,
    y: 150,
    w: 50,
    h: 50
}

setInterval(loop, 1000 / fps)

function loop(){
    contexto.clearRect(0,0,300,700)
    contexto.fillStyle = "rgba(100,243,180,1)"
    contexto.fillRect(bird.x, bird.y, bird.w, bird.h)

    bird.y += gravedad

}

//controles 

function press(){
    bird.y -= 25

}

window.addEventListener("keydown", press)