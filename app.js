const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let particlesArray = [];
const numberOfParticles = 200;
ctx.lineCap = "round";

const mouse = {
  x: null,
  y: null
}

window.addEventListener("mousemove", event => {
  mouse.x = event.x;
  mouse.y = event.y;
})

const pumpkin = new Image();
pumpkin.src = "pumpkins.png";

class Particle {
    constructor() {
        this.radius = Math.random() * 200 + 20;
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + this.radius * 2;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 5 + 1;
        this.angle = Math.random() * 360;
        this.spin = Math.random() < 0.5 ? 1 : -1; 
        this.frameX = Math.floor(Math.random() * 3);
        this.frameY = Math.floor(Math.random() * 3);
        this.spriteSize = 768/3;
    }

    update() {
        this.angle += 5; //pumpkins rotate
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.radius > 1) this.radius -= 0.5;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI/360 * this.spin); //particles rotate in opposite directions if this.spin is 1 or -1
        ctx.drawImage(pumpkin, this.frameX * this.spriteSize, this.frameY * this.spriteSize, this.spriteSize, this.spriteSize, 0 - this.radius/2, 0 - this.radius/2, this.radius, this.radius);
        ctx.translate(-this.x, -this.y);
        ctx.restore();
    }
}

function init() {
    for(let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle);
    }
}

init();
console.log(particlesArray)
console.log("toto")

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }

    requestAnimationFrame(animate);
}

animate();
