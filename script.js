const btnStart = document.querySelector(".btn__start");
const fieldControls = document.querySelectorAll(".field__control");
let game_level = [];
const gameSection = document.querySelector(".game-section_container");
const gameTable = document.createElement("div"); // тут будет стол с игрой

const restartBtn = document.querySelector(".restart_btn");
const hidden = document.querySelector(".hide");
const container = document.querySelector(".container").classList;
const cardField = document.querySelector(".game-section_container").classList;

let cards = [];

const winScreen = document.querySelector(".result_screen_win_container");
const lostScreen = document.querySelector(".result_screen_lost_container");

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

  duplicatedCardsIcons.forEach((icon) =>
    gameTable.append(createGameCard("notFlippedCard", icon))
  );

  gameSection.append(gameTable, restartBtn);

  cards.forEach((card, index) => card.addEventListener("click", () => {}));

  function get_elapsed_time_string(total_seconds) {
    function pretty_time_string(num) {
      return (num < 10 ? "0" : "") + num;
    }

    let minutes = Math.floor(total_seconds / 60);
    total_seconds = total_seconds % 60;

    let seconds = Math.floor(total_seconds);

    minutes = pretty_time_string(minutes);
    seconds = pretty_time_string(seconds);

    const currentTimeString = minutes + ":" + seconds;
    return currentTimeString;
  }

  let elapsed_seconds = -5;
  
  function setTimer(value){
    setTimeout(function(){
      $(".timer").text(get_elapsed_time_string(elapsed_seconds));
    },5000);
  }
  setInterval(function(){
    setTimer(elapsed_seconds++)
  },1000);

  cards = document.querySelectorAll(".game-card");

  const karty = document.querySelectorAll(".game-card");
  karty.forEach((karta, index) => karta.classList.add("flip"));
  karty.forEach((karta, index) =>
    setTimeout(() => {
      karta.classList.remove("flip");
	  
    }, 5000)
  );

  cards.forEach((card, index) =>
    card.addEventListener("click", () => {
      if (clickable === true && !card.classList.contains("successfully")) 
	  {
        card.classList.add("flip");
        if (firstCard == null) 
		{
          firstCard = index;
        } 
		else 
		{
          if (index != firstCard) 
		  {
            secondCard = index;
            clickable = false;
	      }
	    }
        if ( firstCard != null && secondCard != null && firstCard != secondCard ) 
	    {
          if (cards[firstCard].firstElementChild.className === cards[secondCard].firstElementChild.className) 
	   	  {
			  setTimeout(() => {
                cards[firstCard].classList.add("successfully");
                cards[secondCard].classList.add("successfully");
	   	    
                firstCard = null;
                secondCard = null;
                clickable = true;
                }, 500);

			  if (Array.from(cards).every((card) => card.className.includes("flip"))) {
				gameSection.remove(gameTable);
				winScreen.style.display = "inherit";
				setTimeout(500);
				document.querySelectorAll('.timer')[0].classList.remove("timer");
			  }
          } 
		  else 
	      {
		    if (!Array.from(cards).every((card) => card.className.includes("flip"))) {
			  gameSection.remove(gameTable);
			  lostScreen.style.display = "inherit";
			  setTimeout(500);
			  document.querySelectorAll('.timer')[1].classList.remove("timer");
		    }
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
    {
      value: "6",
      suit: "peaks",
    },
    {
      value: "7",
      suit: "peaks",
    },
    {
      value: "8",
      suit: "peaks",
    },
    {
      value: "9",
      suit: "peaks",
    },
    {
      value: "10",
      suit: "peaks",
    },
    {
      value: "Q",
      suit: "peaks",
    },
    {
      value: "K",
      suit: "peaks",
    },
    {
      value: "J",
      suit: "peaks",
    },
    {
      value: "A",
      suit: "peaks",
    },
    {
      value: "6",
      suit: "tambourine",
    },
    {
      value: "7",
      suit: "tambourine",
    },
    {
      value: "8",
      suit: "tambourine",
    },
    {
      value: "9",
      suit: "tambourine",
    },
    {
      value: "10",
      suit: "tambourine",
    },
    {
      value: "Q",
      suit: "tambourine",
    },
    {
      value: "K",
      suit: "tambourine",
    },
    {
      value: "J",
      suit: "tambourine",
    },
    {
      value: "A",
      suit: "tambourine",
    },
    {
      value: "6",
      suit: "cross",
    },
    {
      value: "7",
      suit: "cross",
    },
    {
      value: "8",
      suit: "cross",
    },
    {
      value: "9",
      suit: "cross",
    },
    {
      value: "10",
      suit: "cross",
    },
    {
      value: "Q",
      suit: "cross",
    },
    {
      value: "K",
      suit: "cross",
    },
    {
      value: "J",
      suit: "cross",
    },
    {
      value: "A",
      suit: "cross",
    },
    {
      value: "6",
      suit: "hearts",
    },
    {
      value: "7",
      suit: "hearts",
    },
    {
      value: "8",
      suit: "hearts",
    },
    {
      value: "9",
      suit: "hearts",
    },
    {
      value: "10",
      suit: "hearts",
    },
    {
      value: "Q",
      suit: "hearts",
    },
    {
      value: "K",
      suit: "hearts",
    },
    {
      value: "J",
      suit: "hearts",
    },
    {
      value: "A",
      suit: "hearts",
    },
  ];

  switch (initialCount) {
    case "6":
      shuffle(cardsIcons);
      return cardsIcons.slice(0, 3);

    case "12":
      shuffle(cardsIcons);
      return cardsIcons.slice(0, 6);

    case "18":
      shuffle(cardsIcons);
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

  notFlippedCardI.classList.add(`notFlippedCard`);
  flippedCardI.innerHTML = `${flippedCardIcon.value}`;
  flippedCardI.classList.add(
    `flippedCard`,
    `${flippedCardIcon.suit}`,
    `${flippedCardIcon.value}`
  );

  card.append(flippedCardI, notFlippedCardI);

  return card;
};

gameSection.append(gameTable, restartBtn);

document.querySelectorAll(".restart_btn").forEach((button) => {
  button.addEventListener("click", () => window.location.reload());
});
