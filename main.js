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

const playSheet = document.querySelector('.playSheet');
let rowNumbers = 3;
let isClickedallowed = true;
const sheetPositions = [];
let clickCounter = 0;
let firstPic = null;
let secendPic = null;
function dealTheCards(sheetRow){
    var faceNumber = 0;
    let totalCards = sheetRow*4;
    setAllPlaySheetPos(sheetRow);
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
        sheetPositions.splice(randpos, 1);
    }
}

function setAllPlaySheetPos(sheetRow){
    for(let i = 1 ; i<=4; i++){
        for(let j = 1 ; j<= sheetRow ; j++){
            sheetPositions.push({x:i ,y:j});
        }
    }
}

function rotateThePics(el){
    if(!el.classList.contains('show') && isClickedallowed){
        if(clickCounter<=1 && firstPic==null){
            el.classList.toggle('show');
            // el.removeEventListener('click',)
            console.log(el);
            firstPic = el;
            clickCounter++;
        }else if(clickCounter<=1 && secendPic==null){
            el.classList.toggle('show');
            // el.removeEventListener('click');
            console.log(el);
            secendPic = el;
            clickCounter++;
            isClickedallowed =false;
        }
        
        if(firstPic!= null && secendPic!= null && firstPic.querySelector('img').src==secendPic.querySelector('img').src){
            setTimeout(() => {
                firstPic = null;
                secendPic = null;
                clickCounter = 0;
                isClickedallowed = true;
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
dealTheCards(4);


document.querySelectorAll('.card').forEach(item => {
    item.addEventListener('click', event => {
        rotateThePics(item);
    })
  })