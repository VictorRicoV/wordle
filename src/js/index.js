// El styles lo importamos aquí para que se encargue Vite de compilar todo
import '../scss/styles.scss';

const ALL_WORDS = ['casa', 'coche', 'parque', 'velero', 'playa', 'piscina', 'chocar'];
const NUMBER_OF_TRIES = 5;

const gameBoardElement = document.getElementById('game-board');
const userWordFormElement = document.getElementById('user-word-form');

let secretWord = '';
let currentRow = 0;

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
  let wordToCheck = secretWord;

  for (let i = 0; i < userWord.length; i++) {
    const letter = userWord[i];
    const letterContainer = gameBoardElement.children[currentRow].children[i];
    letterContainer.textContent = letter;

    if (letter === secretWord[i]) {
      letterContainer.classList.add('correct');
      wordToCheck = wordToCheck.replace(letter, '-');
    }
  }
  for (let i = 0; i < userWord.length; i++) {
    const letter = userWord[i];
    const letterContainer = gameBoardElement.children[currentRow].children[i];
    if (wordToCheck.includes(letter)) {
      letterContainer.classList.add('misplaced');
    } else {
      if (!letterContainer.classList.contains('correct')) {
        letterContainer.classList.add('incorrect');
      }
    }
  }

  currentRow++;
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
