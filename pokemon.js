
const images = [
    "img/pokemon.jpeg",
         "img/pokemon1.jpg",
         "img/pokemon2.png",
         "img/pokemon3.jpg",
         "img/pokemon4.jpg",
         "img/pokemon5.png",
         "img/pokemon6.jpg",
         "img/pokemon7.png"
     ];

     const gameBoard = document.getElementById('game-board');
     const scoreDisplay = document.getElementById('score');
     const timeDisplay = document.getElementById('time');

     let cards = [];
     let flippedCards = [];
     let score = 0;
     let time = 0;
     let timer;
     let gameStarted = false;

     function setupGame() {
         const doubledImages = [...images, ...images];
         const shuffledImages = doubledImages.sort(() => Math.random() - 0.5);

         shuffledImages.forEach(image => {
             const card = document.createElement('div');
             card.classList.add('card');
             card.dataset.image = image;

             const img = document.createElement('img');
             img.src = image;
             img.style.display = 'none'; 
             card.appendChild(img);

             card.addEventListener('click', () => flipCard(card));
             gameBoard.appendChild(card);
             cards.push(card);
         });
     }

     function flipCard(card) {
         if (!gameStarted) {
             startTimer();
             gameStarted = true;
         }

         if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
             card.classList.add('flipped');
             const img = card.querySelector('img');
             img.style.display = 'block';
             flippedCards.push(card);

             if (flippedCards.length === 2) {
                 checkMatch();
             }
         }
     }

     function checkMatch() {
         const [card1, card2] = flippedCards;
         if (card1.dataset.image === card2.dataset.image) {
             score += 10;
             flippedCards = [];
         } else {
             score = Math.max(0, score - 2);
             setTimeout(() => {
                 card1.classList.remove('flipped');
                 card2.classList.remove('flipped');
                 card1.querySelector('img').style.display = 'none';
                 card2.querySelector('img').style.display = 'none';
                 flippedCards = [];
             }, 1000);
         }
         updateScore();
     }

     function updateScore() {
         scoreDisplay.textContent = `Score ${score}`;
     }

     function startTimer() {
         time = 0;
         timer = setInterval(() => {
             time++;
             timeDisplay.textContent = `Time: ${time} second`;
         }, 1000);
     }

     function stopTimer() {
         clearInterval(timer);
     }

     function checkGameEnd() {
         const allFlipped = cards.every(card => card.classList.contains('flipped'));
         if (allFlipped) {
             stopTimer();

             document.getElementById('finalTime').textContent = time;
             document.getElementById('finalScore').textContent = score;

             const gameEndModal = new bootstrap.Modal(document.getElementById('gameEndModal'));
             gameEndModal.show();
         }
     }

     function restartGame() {
         location.reload(); 
     }

     setupGame();

   
     setInterval(checkGameEnd, 500);