/** @type {HTMLCanvasElement} */
const ww = window.innerWidth;
const wh = window.innerHeight;
const canvas = document.getElementsByTagName("canvas")[0];
const c = canvas.getContext("2d");
var mouse = {x: ww/2, y: wh/2};
var pspeed = 10;
var pradius = 30;
var density = 300;
var minSpeed = 10;
canvas.width = ww;
canvas.height = wh;
const max = 8;
const min = 0;

const color = [
    "#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee"
]
function Atom(x, y){
    this.x = x;
    this.y = y;
    this.vx = ((Math.random() - 0.5) * minSpeed) * pspeed;
    this.vy = ((Math.random() - 0.5) * minSpeed) * pspeed;
    this.radius = Math.random() * pradius + 1;
    this.color = color[Math.floor(Math.random() * (max - min) + min)] || "#ff0000";

    this.draw = function(){
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        c.fill();
        c.closePath();
    }

    this.update = ()=>{
        this.x += this.vx;
        this.y += this.vy;
        this.draw();
    }
}

var parArray = [];
function particle(){
    for (let l = 0; l < density; l++) {
        parArray.push(new Atom(mouse.x, mouse.y));
    }
}
setTimeout(() => {
    mouse.x = ww/4;
    mouse.y = wh-10;
    particle();
    // particle();
    pspeed = 5;
    pradius = 10;
    density = 100;
    window.addEventListener("click", (e)=>{
        mouse.x = e.clientX;
        mouse.y = e.clientY
        particle();
    });
}, 3000);
function loop(){
    requestAnimationFrame(loop);
    c.clearRect(0, 0, ww, wh);
    parArray.forEach((a, i) => {
        a.update();
        if (a.x - a.radius < 0 || a.x + a.radius > a.ww || a.y - a.radius < 0 || a.y + a.radius > a.wh) {
            parArray.splice(i, 1)
        }
    });

}
loop();