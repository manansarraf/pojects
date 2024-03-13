//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;
       
//bird
let birdWidth  = 34;
let birdHeight = 24;
let birdX = boardWidth/8;              //initial position of bird from left 
let birdY = boardHeight/2;             //initial position of bird from top of board position

let bird = {
        x: birdX,
        y: birdY,
        width: birdWidth,
        height: birdHeight
}
//pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;
let topPipeImg;
let bottomPipeImg;

//game physics
let velocityX = -2   //Moving speed of pipe in -x direction

 //on load is a function which is executed when the page is fully loaded
window.addEventListener("load",function(){ 
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

// The fillRect() method in JavaScript is used to draw a filled rectangle on a canvas. It takes four parameters:
// x: The x-coordinate of the upper-left corner of the rectangle.
// y: The y-coordinate of the upper-left corner of the rectangle.
// width: The width of the rectangle.
// height: The height of the rectangle.

// drawBird();                            //call the drawBird() function

//load Images
birdImg = new Image();
birdImg.src = "./flappybird.png";
birdImg.onload = function(){
    context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);        //drawImage(image, dx, dy, dWidth, dHeight);
}

topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./bottompipe.png";

    requestAnimationFrame(update);
    setInterval(placePipes, 1500); //every 1.5 seconds
})
function drawBird(){                 //function drawBird() to draw bird
    context.fillStyle = "green";
    context.fillRect(bird.x,bird.y,bird.width,bird.height);
}

function update(){                   //updating the frames of canvas
requestAnimationFrame(update);
context.clearRect(0,0,board.width,board.height);

//bird
context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);

//pipes
for(i=0;i<pipeArray.length;i++){
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.clearRect(pipe.x - pipeWidth, pipe.y, pipeWidth, pipeHeight);
    context.drawImage(pipe.img,pipe.x,pipe.y,pipe.pipeWidth,pipe.pipeHeight);  
}
}

function placePipes(){

    //math.random return a value 0 and 1
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(topPipe);

    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);
}
