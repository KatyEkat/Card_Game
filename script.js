const btnStart = document.querySelector(".btn__start");
const fieldControls = document.querySelectorAll(".field__control");
let game_level = [];
const gameSection = document.querySelector(".game-section_container");
const gameTable = document.createElement("div"); // тут будет стол с игрой

const restartBtn = document.createElement("div");
const hidden = document.querySelector(".hide");
const container = document.querySelector(".container").classList;
const cardField = document.querySelector(".game-section_container").classList;

let cards = [];

// сохранение уровня сложности в глоб сост
for (let i = 0; i < fieldControls.length; i++) {
  fieldControls[i].addEventListener("click", () => {
    console.log(`${fieldControls[i].name}: ${fieldControls[i].value}`);
    localStorage.setItem("level", fieldControls[i].value);
    game_level = localStorage.level;
  });
}

btnStart.addEventListener("click", () => startGame(game_level));
// Запуск игры и выбор сложности принимает изначальную сложность игры
const startGame = (game_level) => {
  let firstCard = null;
  let secondCard = null;
  let clickable = true;

  container.toggle("cardsField");
  cardField.toggle("cardsField");

  const cardsIcons = createIconsArray(game_level);
  const duplicatedCardsIcons = duplicateArray(cardsIcons);

  shuffle(duplicatedCardsIcons);

  console.log(duplicatedCardsIcons);
  duplicatedCardsIcons.forEach((icon) =>
    gameTable.append(createGameCard("notFlippedCard", icon))
  ); //изменить notFlippedCard

  gameSection.append(gameTable, restartBtn);

  cards.forEach((card, index) => card.addEventListener("click", () => {}));

  function get_elapsed_time_string(total_seconds) {
    function pretty_time_string(num) {
      return (num < 10 ? "0" : "") + num;
    }

    let hours = Math.floor(total_seconds / 3600);
    total_seconds = total_seconds % 3600;

    let minutes = Math.floor(total_seconds / 60);
    total_seconds = total_seconds % 60;

    let seconds = Math.floor(total_seconds);

    minutes = pretty_time_string(minutes);
    seconds = pretty_time_string(seconds);

    let currentTimeString = minutes + ":" + seconds;
    return currentTimeString;
  }

  let elapsed_seconds = 0;
  setInterval(function () {
    elapsed_seconds = elapsed_seconds + 1;
    $(".timer").text(get_elapsed_time_string(elapsed_seconds));
  }, 1000);

  cards = document.querySelectorAll(".game-card");

  cards.forEach((card, index) =>
    card.addEventListener("click", () => {
      if (clickable === true && !card.classList.contains("successfully")) {
        card.classList.add("flip");

        if (firstCard === null) {
          firstCard = index;
        } else {
          if (index != firstCard) {
            secondCard = index;
            clickable = false;
          }
        }
        if (
          firstCard != null &&
          secondCard != null &&
          firstCard != secondCard
        ) {
          if (
            cards[firstCard].firstElementChild.className ===
            cards[secondCard].firstElementChild.className
          ) {
            setTimeout(() => {
              cards[firstCard].classList.add("successfully");
              cards[secondCard].classList.add("successfully");

              firstCard = null;
              secondCard = null;
              clickable = true;
            }, 500);
          } else {
            setTimeout(() => {
              cards[firstCard].classList.remove("flip");
              cards[secondCard].classList.remove("flip");

              firstCard = null;
              secondCard = null;
              clickable = true;
            }, 500);
          }
        }
      }
    })
  );
};

// Карточки для игры

const duplicateArray = (array) =>
  array.reduce((res, current) => res.concat([current, current]), []);

const createIconsArray = (initialCount) => {
  const cardsIcons = [
    "6♠️",
    "6♣️",
    "6♥️",
    "6♦️",
    "7♠️",
    "7♣️",
    "7♥️",
    "7♦️",
    "8♠️",
    "8♣️",
    "8♥️",
    "8♦️",
    "9♠️",
    "9♣️",
    "9♥️",
    "9♦️",
    "10♠️",
    "10♣️",
    "10♥️",
    "10♦️",
    "Q♠️",
    "Q♣️",
    "Q♥️",
    "Q♦️",
    "K♠️",
    "K♣️",
    "K♥️",
    "K♦️",
    "J♠️",
    "J♣️",
    "J♥️",
    "J♦️",
    "A♠️",
    "A♣️",
    "A♥️",
    "A♦️",
  ];

  switch (initialCount) {
    case "6":
      return cardsIcons.slice(0, 3);

    case "12":
      return cardsIcons.slice(0, 6);

    case "18":
      return cardsIcons.slice(0, 9);

    default:
      break;
  }
};

// Перемешиваем карты

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
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

const createGameCard = (defaultIcon, flippedCardIcon) => {
  const card = document.createElement("div");
  card.classList.add("game-card");

  const notFlippedCardI = document.createElement("i");
  const flippedCardI = document.createElement("i");

  notFlippedCardI.classList.add(
    `notFlippedCard`,
    `notFlippedCard-${defaultIcon}`
  );
  flippedCardI.classList.add(`flippedCard`, `flippedCard-${flippedCardIcon}`);

  card.append(flippedCardI, notFlippedCardI);

  return card;
};

// duplicatedCardsIcons.forEach(icon => gameTable.append(createGameCard ('game-card', icon)));

gameSection.append(gameTable, restartBtn);
