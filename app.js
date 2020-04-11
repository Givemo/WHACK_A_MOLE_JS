const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left');
let currentTime = timeLeft.textContent;
let lastHole;
let score = 0;
let timeUp = false;
let timerId;

  function randomTime(min, max) {
      return Math.round(Math.random() * (max - min) + min);
  }

  function randomHole(holes) {
      const num = Math.floor(Math.random() * holes.length);
      const hole = holes[num];
      if(hole === lastHole) {
          console.log('Thats the last one');
          return randomHole(holes);
      }
      lastHole = hole;
      return hole;
  }
  
  function peep() {
      const time = randomTime(200, 1000);
      const hole = randomHole(holes);
      hole.classList.add('up');
      setTimeout(() => {
      hole.classList.remove('up');
      if(!timeUp) peep();
    }, time);
  }

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 60000)
}

function bonk(e) {
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    if(currentTime === 0) {
        clearInterval(timerId)
        alert('GAME OVER! Your final score is' + ' ' + score);
        currentTime = 60;
    }
}

function startTimer() {
    timerId = setInterval(countDown, 1000);
    return timerId;
}
  











