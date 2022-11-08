let spaces = document.querySelectorAll(".grid .space");
let turnX = false;
const playerX = document.getElementById("playerX");
const playerO = document.getElementById("playerO");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const timerLine = document.getElementById("timerLine");

const timer_f = document.getElementById("timer-f");
const timer_e = document.getElementById("timer-e");

const settings = document.getElementById("settings");

let xPos = [];
let oPos = [];

let index, subIndex, posIndex, checkerO, checkerX, spaceIndex, clickTime, winIndex, drawIndex;

let canRun = false

let playing = true

let winPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

spaces.forEach(space => {
    space.addEventListener('click', (e) => {
        if(playing === true){
            clickTime = 100;
            if(canRun === false){
                canRun = true;
                timer();
            }
            if(e.target.classList == "space" && e.target.innerHTML.length == 0){
                if(turnX === false){
                    e.target.innerHTML = '<div class="mark-circle"><iconify-icon inline icon="ph:circle-bold"></iconify-icon></div>';
                    playerX.classList.add("turn");
                    playerO.classList.remove("turn");
                    oPos.push(e.target.getAttribute("data-index"))
                }
                else{
                    e.target.innerHTML = '<div class="mark-cross"><iconify-icon inline icon="akar-icons:cross"></iconify-icon></div>';
                    playerO.classList.add("turn");
                    playerX.classList.remove("turn");
                    xPos.push(e.target.getAttribute("data-index"))
                }
                e.target.setAttribute("data-marked", "true")
                turnX = !turnX;
                checkO();
                checkX();
                checkDraw();
                function checkO(){
                    index = 0;
                    subIndex = 0;
                    checkerO = 0;
                    checkerX = 0;
                    while(index < winPositions.length){
                        if(subIndex < 3){
                            posIndex = 0;
                            while(posIndex < oPos.length){
                                if(winPositions[index][subIndex] == oPos[posIndex]){
                                    checkerO++;
                                }
                                posIndex++
                                if(checkerO == 3){
                                    winIndex = 0;
                                    scoreO.innerHTML = parseInt(scoreO.innerHTML) + 1;
                                    playing = false;
                                    canRun = false;
                                    while(winIndex < 3){
                                        spaces[winPositions[index][winIndex]].classList.add("winner-o");
                                        winIndex++
                                    }
                                    setTimeout(() => {
                                        restartGame();
                                    }, 2000);
                                    checkerO = 0;
                                }
                            }
                            subIndex++
                        }
                        else{
                            subIndex = 0;
                            checkerO = 0;
                            index++;
                        }
                    }
                }
                function checkX(){
                    index = 0;
                    subIndex = 0;
                    checkerO = 0;
                    checkerX = 0;
                    while(index < winPositions.length){
                        if(subIndex < 3){
                            posIndex = 0;
                            while(posIndex < xPos.length){
                                if(winPositions[index][subIndex] == xPos[posIndex]){
                                    checkerX++;
                                }
                                posIndex++
                                if(checkerX == 3){
                                    winIndex = 0;
                                    scoreX.innerHTML = parseInt(scoreX.innerHTML) + 1;
                                    playing = false;
                                    canRun = false;
                                    while(winIndex < 3){
                                        spaces[winPositions[index][winIndex]].classList.add("winner-x");
                                        winIndex++
                                    }
                                    setTimeout(() => {
                                        restartGame();
                                    }, 2000);
                                    checkerX = 0;
                                }
                            }
                            subIndex++
                        }
                        else{
                            subIndex = 0;
                            checkerX = 0;
                            index++;
                        }
                    }
                }
                function checkDraw(){
                    drawIndex = 0;
                    if(xPos.length + oPos.length == 9 && playing === true){
                        while(drawIndex < spaces.length){
                            spaces[drawIndex].classList.add("draw");
                            drawIndex++
                        }
                        setTimeout(() => {
                            restartGame();
                        }, 2000);
                    }
                }
            }
        }
    })
})

function restartGame(){
    spaceIndex = 0;
    canRun = false;
    playing = true;
    while(spaceIndex < spaces.length){
        spaces[spaceIndex].innerHTML = "";
        spaces[spaceIndex].setAttribute("data-marked", "false");
        spaces[spaceIndex].classList.remove("winner-o");
        spaces[spaceIndex].classList.remove("winner-x");
        spaces[spaceIndex].classList.remove("draw");
        spaceIndex++;
        oPos = [];
        xPos = [];
    }
}

function timer(){
    if(clickTime > 0 && canRun === true){
        clickTime = clickTime - 1
        timerLine.style.background = `linear-gradient(to right, #09C6F9 0%, #0883FF ${clickTime}%, rgb(146, 146, 146, 0.2) ${clickTime}%)`;
        setTimeout(() => {
            timer();        
        }, 50);
    }
    else if(clickTime == 0){
        queueEnded();
    }
}

function queueEnded(){
    let emptySpaces = document.querySelectorAll(".grid [data-marked='false']")
    let randNum = Math.floor(Math.random() * emptySpaces.length);
    canRun = false
    emptySpaces[randNum].click();
}

settings.addEventListener("click", () => {
    document.body.classList.toggle("dark")
})