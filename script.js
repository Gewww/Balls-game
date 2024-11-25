const start = document.getElementById("start");
let canvas, ctx, countOfBalls;
let balls = [];
let blinks = [];
let clicks = [];
let flag = true
function startHandle() {
    countOfBalls = +prompt("Count of balls:", 5);
    if (countOfBalls < 5 || countOfBalls > 150) {
        countOfBalls = 5;
    }

    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 200;

 
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    start.disabled = true;
    loop();
}

function generateRandomPastelColor() {
    const colorType = Math.floor(Math.random() * 3);  

    let r, g, b;

    if (colorType === 0) { 
        r = Math.floor(Math.random() * 50);  
        g = Math.floor(Math.random() * 50);  
        b = Math.floor(Math.random() * 128 + 127);  
    } else if (colorType === 1) { 
        r = Math.floor(Math.random() * 128 + 128);  
        g = Math.floor(Math.random() * 50);  
        b = Math.floor(Math.random() * 50);  
    } else { 
        r = Math.floor(Math.random() * 50);  
        g = Math.floor(Math.random() * 128 + 128); 
        b = Math.floor(Math.random() * 50);  
    }

    return `rgb(${r}, ${g}, ${b})`;
}

function createBall() {
    let r = 30;
    let x, y;

    
    do {
        x = getRandInt(r, canvas.width - r);
        y = getRandInt(r, canvas.height - r);
    } while (isOverlapping(x, y));

    
    let ball = new Ball(x, y, generateRandomPastelColor(), balls.length + 1, r);
    balls.push(ball);
}

function draw() {
    if (balls.length < countOfBalls) {
        createBall();
    }else if(flag) {
        intervalBlink()
        flag = false
    }

    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    balls.forEach(function (ball) {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.fillStyle = "white"
        ctx.font = "25px serif";
        ctx.textAlign = "center"
        ctx.fillText(ball.num, ball.x, ball.y+7.5)
    });
}

function randomBlink(){
    
    let index
  
    do{
        index = getRandInt(0, balls.length)
        console.log(index)
        
    }while(blinks.indexOf(index) >= 0)

    blinks.push(index)
    balls[index].blink()
}
function intervalBlink(){
    let count = 0 
    let id = setInterval(()=>{
        if(count >= 2){
            clearInterval(id)
            clickcheck()
        }
        count ++
        randomBlink()
    }, 1000)
}
function loop() {
    requestAnimationFrame(loop);
    draw();
    
}

function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function isOverlapping(x, y) {
    return balls.some(function (ball) {
        const dx = x - ball.x;
        const dy = y - ball.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < 2 * ball.r; 
    });
}
function clickcheck(){
    canvas.addEventListener("click",handleClickBall)
}
function handleClickBall(evt){
    const rect = canvas.getBoundingClientRect()
    const mouseX = evt.clientX - rect.left
    const mouseY = evt.clientY - rect.top
    balls.forEach(function(ball){
        const dx = mouseX - ball.x;
        const dy = mouseY - ball.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let bdx, bdy, distB
        if(dist < ball.r){
            for(let i = 0; i < blinks.length; i++) {
                bdx = mouseX - balls[blinks[i]].x;
                bdy = mouseY - balls[blinks[i]].y;
                distB = Math.sqrt(bdx*bdx + bdy*bdy)
                if(distB < ball.r){
                    console.log("URA")
                    clicks.push(blinks[i])
                }
            }
            
            nextLVL();
            
            
        }
       
    })

    console.log(blinks)
    console.log(clicks)
}
function nextLVL(){
    if (clicks.length === blinks.length && clicks.every((v, i) => v === blinks[i])) {
        console.log("checked");
        for(let i = 0; i < blinks.length; i++) {
            balls[blinks[i]].blink() 
        }
        countOfBalls += 3
        loop()
        intervalBlink()
        
        
    }
}
start.addEventListener("click", function () {
        
        startHandle();
        
        // setInterval(function(){
        //     location.reload()},10000 )
        
  
    

    
});




















