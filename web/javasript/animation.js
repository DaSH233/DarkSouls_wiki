/**
 * Created by czy on 2017/5/16.
 */
var W;
var H;
var mp = 120;
var particles = [];
var canvas;
var ctx;
$(function () {
    draw();
})
function draw() {
    canvas = $('#canvas');
    ctx = canvas[0].getContext('2d');
    W = window.innerWidth;
    H = window.innerHeight;

    canvas[0].width = W;
    canvas[0].height = H;
    var now = new Date().getTime();
    var random_x, random_y;
    for(var i = 0; i < mp; i++)
    {
        random_x = (Math.random() - 0.1) * 1.1;
        random_y = Math.random() * 1.5;
        particles.push({
            startX: random_x * W,
            startY: random_y * H,
            x: random_x * W,
            y: random_y * H,
            startTime: now,
            killTime: now + Math.random() * 30000,
            speedX: (Math.random() - 0.5) * 1.1,
            speedY: (Math.random() + 0.5) * 2,
            sizeX : Math.random() + 1.5,
            sizeY : Math.random() + 1.5
        })
    }
    requestAnimationFrame(update);
}
function update()
{
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#c65a00";
    var time = new Date().getTime();
    for(var i = 0; i < mp; i++)
    {
        var p = particles[i];
        if(p.startTime < time){
            p.x += p.speedX;
            p.y -= p.speedY;
            p.speedX += (Math.random() - 0.5) * 0.2;
        }
        if(p.killTime < time){
            p.x = p.startX;
            p.y = p.startY;
            p.startTime = time;
            p.killTime = time + parseInt(Math.random() * 30000);
        }
        ctx.fillRect(p.x, p.y, p.sizeX, p.sizeY);
    }
    requestAnimationFrame(update);
}