const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
let sec = document.getElementById("pin").innerHTML;


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  //updating score
  score +=1;
  //displaying score in score board
  document.getElementById("pintu").innerHTML = score;

  resetBoard();

  if (score==6) {
    setTimeout(() => geeks(), 1000);
  }
  
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });

})();

/*(function timer() {
    console.log(sec);
    if (sec < 10) {  
      document.getElementById("pin").style.color = "red"; 
  } 
  //if seconds becomes zero, 
  //then page alert time up 
  if (sec < 0) { 
      alert('time out!');
      setTimeout(() => { window.open("", "_self").document.write("<p>This is your score: ", score, "</p>"); }, 100  );
      document.getElementById("pin").innerHTML = 0; 
  } 
  //if seconds > 0 then seconds is decremented 
  else { 
      document.getElementById("pin").innerHTML = sec; 
      sec=sec-1; 
      setTimeout(timer, 1000); 
  } 
  
  })();*/
  function geeks(msg, gfg) { 
    var confirmBox = $("#container"); 
      
    /* Trace message to display */
    confirmBox.find(".message").text(msg); 
    document.getElementById("sco").innerHTML = "Your score: " + score;
    /* Calling function */
    confirmBox.find(".yes").unbind().click(function()  
    { 
       confirmBox.hide(); 
    }); 
    confirmBox.find(".yes").click(gfg); 
    confirmBox.show(); 
  } 

  function timer() {
    console.log(sec);
    if (sec < 10) {  
      document.getElementById("pin").style.color = "red"; 
  } 
  //if seconds becomes zero, 
  //then page alert time up 
  if (sec < 0) { 
      geeks();
      setTimeout(() => geeks(), 100);
      document.getElementById("pin").innerHTML = 0; 
  } 
  //if seconds > 0 then seconds is decremented 
  else { 
      document.getElementById("pin").innerHTML = sec; 
      sec=sec-1; 
      setTimeout(timer, 1000); 
  } 
}



cards.forEach(card => card.addEventListener('click', flipCard));
