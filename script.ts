import './style.scss';

const btnStart = document.querySelector('.btn-start') as HTMLElement;
const fieldControls: any = document.querySelectorAll('.field-control');
const formFields = document.querySelectorAll('.form__field');
let gameLevel: Number = 0;
const gameSection = document.querySelector(
  '.game-section-container'
) as HTMLElement;
const gameTable = document.createElement('div') as HTMLElement;
const restartBtn = document.querySelector('.restart-btn') as HTMLElement;
const container = document.querySelector('.container') as HTMLElement;
const cardField = document.querySelector(
  '.game-section-container'
) as HTMLElement;

let cards: any = [];
const winScreen = document.querySelector(
  '.result-screen-win-container'
) as HTMLElement;
const lostScreen = document.querySelector(
  '.result-screen-lost-container'
) as HTMLElement;

// сохранение уровня сложности в глоб сост
// fieldControls.forEach((control) => {
//   control.addEventListener('click', () => {
//     const level = (control as HTMLInputElement).value;
//     localStorage.setItem('level', level);
//     gameLevel = Number(level);
//   });
// });
for (let i = 0; i < fieldControls.length; i++) {
  fieldControls[i].addEventListener('click', () => {
    console.log(`${fieldControls[i].name}: ${fieldControls[i].value}`);
    localStorage.setItem('level', fieldControls[i].value);
    gameLevel = localStorage.level;
  });
}
formFields.forEach((field) => {
  field.addEventListener('click', () => {
    formFields.forEach((item) => item.classList.remove('active'));
    field.classList.add('active');
  });
});

btnStart.addEventListener('click', () => startGame(gameLevel));

// Запуск игры и выбор сложности принимает изначальную сложность игры
const startGame = (gameLevel: Number) => {
  let firstCard: any = null;
  let secondCard: any = null;
  let clickable = true;

  container.classList.toggle('cards-field');
  cardField.classList.toggle('cards-field');

  const cardsIcons: any = createIconsArray(gameLevel);
  const duplicatedCardsIcons: any = duplicateArray(cardsIcons);

  shuffle(duplicatedCardsIcons);

  duplicatedCardsIcons.forEach((icon: any) =>
    gameTable.append(createGameCard('notFlippedCard', icon))
  );

  gameSection.append(gameTable, restartBtn);

  function getElapsedTimeString(totalSeconds: any) {
    function prettyTimeString(num: Number) {
      return (num < 10 ? '0' : '') + num;
    }

    let minutes: any = Math.floor(totalSeconds / 60);
    totalSeconds = totalSeconds % 60;

    let seconds: any = Math.floor(totalSeconds);

    minutes = prettyTimeString(minutes);
    seconds = prettyTimeString(seconds);

    const currentTimeString = minutes + ':' + seconds;
    return currentTimeString;
  }

  let elapsedSeconds = -5;

  function setTimer(elapsedSeconds: any) {
    // setTimeout(function () {
    //   // $('.timer').text(getElapsedTimeString(elapsedSeconds));
    //   document.querySelector('.timer').innerHTML =
    //     getElapsedTimeString(elapsedSeconds);
    // }, 5000);
    setTimeout(function () {
      const timer = document.querySelector('.timer') as HTMLElement;
      timer.innerHTML = getElapsedTimeString(elapsedSeconds);
    }, 5000);
  }
  setInterval(function () {
    setTimer(elapsedSeconds++);
  }, 1000);

  cards = document.querySelectorAll('.game-card');

  const karty = document.querySelectorAll('.game-card');
  karty.forEach((karta) => karta.classList.add('flip'));
  karty.forEach((karta) =>
    setTimeout(() => {
      karta.classList.remove('flip');
    }, 5000)
  );

  cards.forEach((card: any, index: string) =>
    card.addEventListener('click', () => {
      if (clickable === true && !card.classList.contains('successfully')) {
        card.classList.add('flip');
        if (firstCard === null) {
          firstCard = index;
        } else {
          if (index !== firstCard) {
            secondCard = index;
            clickable = false;
          }
        }
        if (
          firstCard !== null &&
          secondCard !== null &&
          firstCard !== secondCard
        ) {
          if (
            cards[firstCard].firstElementChild.className ===
            cards[secondCard].firstElementChild.className
          ) {
            setTimeout(() => {
              cards[firstCard].classList.add('successfully');
              cards[secondCard].classList.add('successfully');

              firstCard = null;
              secondCard = null;
              clickable = true;
            }, 500);

            if (
              Array.from(cards).every((card: any) =>
                card.className.includes('flip')
              )
            ) {
              gameSection.remove(gameTable);
              winScreen.style.display = 'inherit';
              setTimeout(() => {
                document
                  .querySelectorAll('.timer')[0]
                  .classList.remove('timer');
              }, 500);
            }
          } else {
            if (
              !Array.from(cards).every((card: any) =>
                card.className.includes('flip')
              )
            ) {
              gameSection.remove(gameTable);
              lostScreen.style.display = 'inherit';
              setTimeout(() => {
                document
                  .querySelectorAll('.timer')[1]
                  .classList.remove('timer');
              }, 500);
            }
          }
        }
      }
    })
  );
};

// Карточки для игры

const duplicateArray = (array: readonly []) =>
  array.reduce((res, current) => res.concat([current, current]), []);

const createIconsArray = (initialCount: any) => {
  const cardsIcons = [
    {
      value: '6',
      suit: 'peaks',
    },
    {
      value: '7',
      suit: 'peaks',
    },
    {
      value: '8',
      suit: 'peaks',
    },
    {
      value: '9',
      suit: 'peaks',
    },
    {
      value: '10',
      suit: 'peaks',
    },
    {
      value: 'Q',
      suit: 'peaks',
    },
    {
      value: 'K',
      suit: 'peaks',
    },
    {
      value: 'J',
      suit: 'peaks',
    },
    {
      value: 'A',
      suit: 'peaks',
    },
    {
      value: '6',
      suit: 'tambourine',
    },
    {
      value: '7',
      suit: 'tambourine',
    },
    {
      value: '8',
      suit: 'tambourine',
    },
    {
      value: '9',
      suit: 'tambourine',
    },
    {
      value: '10',
      suit: 'tambourine',
    },
    {
      value: 'Q',
      suit: 'tambourine',
    },
    {
      value: 'K',
      suit: 'tambourine',
    },
    {
      value: 'J',
      suit: 'tambourine',
    },
    {
      value: 'A',
      suit: 'tambourine',
    },
    {
      value: '6',
      suit: 'cross',
    },
    {
      value: '7',
      suit: 'cross',
    },
    {
      value: '8',
      suit: 'cross',
    },
    {
      value: '9',
      suit: 'cross',
    },
    {
      value: '10',
      suit: 'cross',
    },
    {
      value: 'Q',
      suit: 'cross',
    },
    {
      value: 'K',
      suit: 'cross',
    },
    {
      value: 'J',
      suit: 'cross',
    },
    {
      value: 'A',
      suit: 'cross',
    },
    {
      value: '6',
      suit: 'hearts',
    },
    {
      value: '7',
      suit: 'hearts',
    },
    {
      value: '8',
      suit: 'hearts',
    },
    {
      value: '9',
      suit: 'hearts',
    },
    {
      value: '10',
      suit: 'hearts',
    },
    {
      value: 'Q',
      suit: 'hearts',
    },
    {
      value: 'K',
      suit: 'hearts',
    },
    {
      value: 'J',
      suit: 'hearts',
    },
    {
      value: 'A',
      suit: 'hearts',
    },
  ];

  switch (initialCount) {
    case '6':
      shuffle(cardsIcons);
      return cardsIcons.slice(0, 3);

    case '12':
      shuffle(cardsIcons);
      return cardsIcons.slice(0, 6);

    case '18':
      shuffle(cardsIcons);
      return cardsIcons.slice(0, 9);

    default:
      break;
  }
};

// Перемешиваем карты

const shuffle = (array: Object[]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

//Создание карт

const createGameCard = (defaultIcon: any, flippedCardIcon: any) => {
  const card = document.createElement('div');
  card.classList.add('game-card');

  const notFlippedCardI = document.createElement('i');
  const flippedCardI = document.createElement('i');

  notFlippedCardI.classList.add(`not-flipped-card`);
  flippedCardI.innerHTML = `${flippedCardIcon.value}`;
  flippedCardI.classList.add(
    `flipped-card`,
    `${flippedCardIcon.suit}`,
    `${flippedCardIcon.value}`
  );

  card.append(flippedCardI, notFlippedCardI);

  return card;
};

gameSection.append(gameTable, restartBtn);

document.querySelectorAll('.restart-btn').forEach((button) => {
  button.addEventListener('click', () => window.location.reload());
});
