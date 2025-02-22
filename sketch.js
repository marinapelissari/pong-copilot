let playerScore = 0;
let computerScore = 0;

class Ball {
    constructor(x, y, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > width - 25) {
            playerScore++;
            this.reset();
        } else if (this.x < 25) {
            computerScore++;
            this.reset();
        }

        if (this.y > height - 25 || this.y < 25) {
            this.speedY *= -1;
        }

        if (this.x - 25 < paddle.x + paddle.width && 
            this.x + 25 > paddle.x && 
            this.y - 25 < paddle.y + paddle.height && 
            this.y + 25 > paddle.y) {
            this.speedX *= -1;
            this.increaseSpeed();
        }

        if (this.x + 25 > computerPaddle.x && 
            this.x - 25 < computerPaddle.x + computerPaddle.width && 
            this.y + 25 > computerPaddle.y && 
            this.y - 25 < computerPaddle.y + computerPaddle.height) {
            this.speedX *= -1;
            this.increaseSpeed();
        }
    }

    increaseSpeed() {
        this.speedX *= 1.1;
        this.speedY *= 1.1;
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        this.speedX = (Math.random() > 0.5 ? 1 : -1) * 5;
        this.speedY = (Math.random() > 0.5 ? 1 : -1) * 3;
    }

    display() {
        fill(255);
        ellipse(this.x, this.y, 50, 50);
    }
}

class Paddle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    display() {
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }
}

let ball;
let paddle;
let computerPaddle;

function setup() {
    createCanvas(800, 600);
    ball = new Ball(width / 2, height / 2, 5, 3);
    paddle = new Paddle(50, height / 2 - 50, 10, 100);
    computerPaddle = new Paddle(width - 60, height / 2 - 50, 10, 100);
    background(255, 182, 193);
}

function draw() {
    background(255, 182, 193);
    ball.update();
    ball.display();
    paddle.y = mouseY - paddle.height / 2;
    
    if (paddle.y < 0) {
        paddle.y = 0;
    } else if (paddle.y + paddle.height > height) {
        paddle.y = height - paddle.height;
    }

    paddle.display();

    computerPaddle.y = ball.y - computerPaddle.height / 2;

    if (computerPaddle.y < 0) {
        computerPaddle.y = 0;
    } else if (computerPaddle.y + computerPaddle.height > height) {
        computerPaddle.y = height - computerPaddle.height;
    }

    computerPaddle.display();

    displayScores();
}

function displayScores() {
    fill(255);
    textSize(32);
    textAlign(CENTER, TOP);
    text(`Player: ${playerScore}`, width / 4, 10);
    text(`Computer: ${computerScore}`, (3 * width) / 4, 10);
}