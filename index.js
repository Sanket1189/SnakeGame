let inputDirection = {
    x: 0,
    y: 0
};


const foodsound = new Audio('music/food.mp3');
const gameoversound = new Audio('music/gameover.mp3');
const movesound = new Audio('music/move.mp3');
const musicsound = new Audio('music/music.mp3');
musicsound.play();
let flag;
let lastPaintTime = 0;
let speed = 15;
let score = 0;
let snakeArr = [{
    x: 13,
    y: 15
}];


let food = { x: 6, y: 6 };
// function work() {

//     music.play();
//}

function main(ctime) {


    window.requestAnimationFrame(main);
    // console.log(ctime);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();


}

// function isCollide(sarr) {
//     return false;
// }

function gameEngine() {

    function isCollide(sarr) {

        for (let i = 1; i < snakeArr.length; i++) {
            if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {

                return true;
            }

        }
        if (sarr[0].x >= 18 || sarr[0].x <= 0 || sarr[0].y >= 18 || sarr[0].y <= 0) {
            return true;
        }

    }


    //part 1 updating snake array and food
    if (isCollide(snakeArr)) {
        gameoversound.play();
        musicsound.pause();
        inputDirection = { x: 0, y: 0 };
        alert('Game Over');
        snakeArr = [{
            x: 13,
            y: 15
        }];
        if (flag === false) {
            musicsound.play();
        }
        score = 0;
        scoreBox.innerHTML = `Score : 0`;
    }

    // regenerating food and incrementing score
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodsound.play();
        score += 1;
        if (score > highscoreval) {
            highscoreval = score;
            localStorage.setItem("hscore", JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "HighScore : " + highscoreval;

        }
        scoreBox.innerHTML = `Score : ${score}`;
        snakeArr.unshift({ x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }


    // Moving the snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = { ...snakeArr[i] };

    }
    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;

    //part 2 display the snake
    let board = document.getElementsByClassName('board')[0];
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('s-head');

        } else {
            snakeElement.classList.add('s-snake');
        }
        board.appendChild(snakeElement);

    });

    // display the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('s-food');
    board.appendChild(foodElement);


}









// actual logic
let highscoreval;
let highscore = localStorage.getItem("hscore");
if (highscore === null) {
    let highscoreval = 0;
    localStorage.setItem("hscore", JSON.stringify(highscoreval))
} else {
    highscoreval = JSON.parse(highscore)
    highscoreBox.innerHTML = "HighScore : " + highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    inputDirection = { x: 0, y: 1 };
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDirection.x = 0;
            inputDirection.y = -1;


            break;
        case "ArrowDown":
            inputDirection.x = 0;
            inputDirection.y = 1;

            break;
        case "ArrowLeft":
            inputDirection.x = -1;
            inputDirection.y = 0;

            break;
        case "ArrowRight":
            inputDirection.x = 1;
            inputDirection.y = 0;

            break;
    }




});


let micro = document.getElementsByClassName('mic')[0];
micro.addEventListener('click', () => {
    flag = micro.classList.toggle('mic-2');
    bgmusicsound(flag);
});

function bgmusicsound(flagin) {
    if (flagin === false) {
        musicsound.play();
    } else {

        musicsound.pause();
    }
}