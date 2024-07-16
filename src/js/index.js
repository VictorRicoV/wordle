// El styles lo importamos aquí para que se encargue Vite de compilar todo
import '../scss/styles.scss';

const ALL_WORDS = [
  'casa',
  'coche',
  'parque',
  'velero',
  'playa',
  'piscina',
  'chocar'
];
const NUMBER_OF_TRIES = 5;

const gameBoardElement = document.getElementById('game-board');
const userWordFormElement = document.getElementById('user-word-form');

let secretWord = '';
let currentRowIndex = 0;

const chooseSecretWord = () => {
  const randomNumber = Math.floor(Math.random() * ALL_WORDS.length);
  secretWord = ALL_WORDS[randomNumber];
  console.log(secretWord);
};

const createGameBoard = () => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < NUMBER_OF_TRIES; i++) {
    const newRow = document.createElement('div');
    newRow.classList.add(`game-board__row`);

    for (let j = 0; j < secretWord.length; j++) {
      const newLetterContainer = document.createElement('span');
      newLetterContainer.classList.add('letter');
      newRow.append(newLetterContainer);
    }
    fragment.append(newRow);
  }
  gameBoardElement.append(fragment);
};

const getInputValue = userWord => {
  const rows = document.querySelectorAll('.game-board__row');
  const currentRow = rows[currentRowIndex];

  if (currentRow) {
    const letters = currentRow.querySelectorAll('.letter');
    for (let i = 0; i < userWord.length; i++) {
      letters[i].textContent = userWord[i];
      if (userWord[i] === secretWord[i]) {
        letters[i].classList.add('correct');
      } else if (secretWord.includes(userWord[i])) {
        letters[i].classList.add('misplaced');
      } else {
        letters[i].classList.add('incorrect');
      }
    }
    currentRowIndex++;
  }
};

userWordFormElement.addEventListener('submit', event => {
  event.preventDefault();
  const userWord = event.target.word.value;
  if (!userWord || userWord.length !== secretWord.length) return;
  getInputValue(userWord);
  event.target.reset();
});
chooseSecretWord();
createGameBoard();
