const images = "./images/tile0";
const faces = [
  `${images}00.png`,
  `${images}01.png`,
  `${images}02.png`,
  `${images}03.png`,
  `${images}04.png`,
  `${images}05.png`,
  `${images}06.png`,
  `${images}07.png`,
  `${images}08.png`,
  `${images}09.png`,
  `${images}10.png`,
  `${images}11.png`,
  `${images}12.png`,
  `${images}13.png`,
  `${images}14.png`,
  `${images}15.png`
]
const btnSetting = document.getElementById("btnSetting");
const btnStart = document.getElementById("start");
const btnPause = document.getElementById("pause");
const header = document.getElementById("headerSection");
const scoreBoard = document.getElementById("scoreboardSection");
const playSheet = document.querySelector('.playSheet');
const scoreDisplay = document.querySelector(".ScoreDisplay span");
const timerDisplay = document.querySelector(".TimerDisplay span");
const moveDisplay = document.querySelector(".movesDisplay span");
const resultDisplay = document.querySelector(".resultPage");
let startTime = 0;
let pauseMoment = 0;
let timerInterval;
let rowNumbers = 4;
let colNumbers = 4;
let isClickedallowed = false;
let isGameStarted = false;
let score = 0;
let move = 0;
const sheetPositions = [];
let clickCounter = 0;
let firstPic = null;
let secendPic = null;
function dealTheCards(sheetRow,sheetCol){
    clearTheGame();
    setAllPlaySheetPos(sheetRow,sheetCol);
    var faceNumber = 0;
    let totalCards = sheetRow*sheetCol;
    for(let i = 0 ; i<=totalCards - 1; i++){
        const img =document.createElement("img");
        img.src = faces[faceNumber];
        if(i%2 != 0 && i!=0){
            faceNumber++;
        }
        const back = document.createElement("div");
        back.classList.add("back");
        back.appendChild(img);
        const front = document.createElement("div");
        front.innerHTML = "navid";
        front.classList.add("front");
        const card = document.createElement("div");
        card.classList.add("card");
        card.appendChild(front);
        card.appendChild(back);
        playSheet.appendChild(card);

        let randpos = Math.floor(Math.random() * sheetPositions.length);
        card.style.gridRowStart = sheetPositions[randpos].y;
        card.style.gridColumnStart = sheetPositions[randpos].x;
        console.log(typeof(sheetCol));
        switch(sheetCol){
            case "4":
                card.style.width = "100px";
                console.log(sheetCol);
                break;
            case "6":
                card.style.width = "70px";
                console.log(sheetCol);
                break;
            case "8":
                card.style.width = "55px";
                console.log(sheetCol);
                break;
            // default:
            //     card.style.width = "75px";
            //     console.log(sheetCol);
            //     break;

        }
        sheetPositions.splice(randpos, 1);
    }

    document.querySelectorAll('.card').forEach(item => {
        item.addEventListener('click', event => {
            rotateThePics(item);
        })
      })
}
function clearTheGame(){
    while(playSheet.firstChild){
        playSheet.removeChild(playSheet.lastChild);
        scoreBoard.style.display = "grid";
    }
    resultDisplay.style.display = "none";
    score = 0;
    move = 0;
    moveDisplay.innerHTML = move;
    scoreDisplay.innerHTML = score;
    timerDisplay.innerHTML = "00:00";
    
    isClickedallowed = false;
    isGameStarted= false;
    clearInterval(timerInterval);
    btnPause.innerHTML = "pause";
    btnStart.innerHTML = "start";
}
function setAllPlaySheetPos(sheetRow , sheetCol){
    playSheet.style.gridTemplateColumns = `repeat(${sheetCol},1fr)`;
    for(let i = 1 ; i<=sheetCol; i++){
        for(let j = 1 ; j<= sheetRow ; j++){
                sheetPositions.push({x:i ,y:j});
        }
    }



}

function rotateThePics(el){
    if(!el.classList.contains('show') && isClickedallowed){
        if(clickCounter<=1 && firstPic==null){
            el.classList.toggle('show');
            firstPic = el;
            clickCounter++;
        }else if(clickCounter<=1 && secendPic==null){
            el.classList.toggle('show');
            secendPic = el;
            clickCounter++;
            isClickedallowed =false;
            move++;
            moveDisplay.innerHTML = move;
        }
        
        if(firstPic!= null && secendPic!= null && firstPic.querySelector('img').src==secendPic.querySelector('img').src){
            score++;
            console.log(score*2 );
            console.log((rowNumbers * colNumbers)-1);
            console.log(score*2 >= (rowNumbers * colNumbers)-1);
            console.log(typeof(rowNumbers * colNumbers));
            console.log(typeof(score*2));
            
            if(score*2 >= (rowNumbers * colNumbers)-1){
                console.log("im in");
                clearInterval(timerInterval);
                resultDisplay.style.display = "block";
            }
            setTimeout(() => {
                firstPic = null;
                secendPic = null;
                clickCounter = 0;
                isClickedallowed = true;
                scoreDisplay.innerHTML = score;
            }, 1000);
        }else if(firstPic!= null && secendPic!= null && firstPic.querySelector('img').src!=secendPic.querySelector('img').src){
            setTimeout(() => {
                firstPic.classList.toggle('show');
                secendPic.classList.toggle('show');
                firstPic = null;
                secendPic = null;
                clickCounter = 0;
                isClickedallowed = true;
            }, 1000);
                
        }    
    }
}

function showElapsedTime(){
    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - startTime;
    let seceonds = Math.floor(elapsedTime / 1000) % 60;
    let minutes = Math.floor(elapsedTime / 1000 / 60);
    timerDisplay.innerHTML = minutes.toString().padStart(2,'0') + ":" + seceonds.toString().padStart(2,'0');
}


document.addEventListener('DOMContentLoaded', function() {
    dealTheCards(rowNumbers,colNumbers);
 }, false);


  document.querySelectorAll('.difficultlyBtn').forEach(item => {
    item.addEventListener('click', event =>{
        if(item.innerHTML.charAt(0) >= item.innerHTML.charAt(2)){
            colNumbers = item.innerHTML.charAt(0);
            rowNumbers = item.innerHTML.charAt(2);
        }else{
            colNumbers = item.innerHTML.charAt(2);
            rowNumbers = item.innerHTML.charAt(0);
        }
        console.log(colNumbers);
        console.log(rowNumbers);
        dealTheCards(rowNumbers,colNumbers);
    })
  })

btnSetting.addEventListener("click",function(){
    scoreBoard.style.display ="none";
});

btnPause.addEventListener("click",function(){
    if(btnPause.innerHTML == "pause" && isGameStarted){
        isClickedallowed = false;
        btnPause.innerHTML = "unpause";
        pauseMoment = new Date().getTime();
        clearInterval(timerInterval);
    }else if (btnPause.innerHTML == "unpause" && isGameStarted){
        startTime = startTime + (new Date().getTime() - pauseMoment);
        timerInterval = setInterval(showElapsedTime, 1000);
        isClickedallowed = true;
        btnPause.innerHTML = "pause";

    }
});

btnStart.addEventListener("click",function(){
    if(btnStart.innerHTML == "start"){
        startTime = new Date().getTime();
        timerInterval = setInterval(showElapsedTime, 1000);
        isClickedallowed = true;
        isGameStarted = true;
        btnStart.innerHTML = "restart";
    }else if(btnStart.innerHTML == "restart"){
        btnStart.innerHTML = "start";
        clearTheGame();
        dealTheCards(rowNumbers,colNumbers);
    }
})

