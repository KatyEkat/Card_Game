const btnStart = document.querySelector('.btn__start');
const easyLvl = document.getElementById('game_level_easy').value;
const normalLvl = document.getElementById('game_level_normal').value;
const hardLvl = document.getElementById('game_level_hard').value;

btnStart.addEventListener('click', () => startGame(difficult));
// Запуск игры и выбор сложности 
const startGame = (difficult) => {
    let firstCard = null;
    let secondCard = null;
    let clickable = true;

    const gameTable = document.createElement('div'); //Тут будет стол с игрой
    const cardsIcons = createIconsArray(difficult);
    const duplicatedCardsIcons = duplicateArray(cardsIcons);

    shuffle(duplicatedCardsIcons);

    console.log(duplicatedCardsIcons);

};

// Карточки для игры

const duplicateArray = (array) => 
    array.reduce((res, current) => res.concat([current, current]), []);

const createIconsArray = (initialCount) => {
    const cardsIcons = [
        '6♠️','6♣️', '6♥️', '6♦️',
        '7♠️','7♣️', '7♥️', '7♦️',
        '8♠️','8♣️', '8♥️', '8♦️',
        '9♠️','9♣️', '9♥️', '9♦️',
        '10♠️','10♣️', '10♥️', '10♦️',
        'Q♠️','Q♣️', 'Q♥️', 'Q♦️',
        'K♠️','K♣️', 'K♥️', 'K♦️',
        'J♠️','J♣️', 'J♥️', 'J♦️',
        'A♠️','A♣️', 'A♥️', 'A♦️'
    ];

    switch (initialCount) {
        case easyLvl:
            return cardsIcons.slice(0, 3)
        
        case normalLvl:
            return cardsIcons.slice(0, 6)
            
        case hardLvl:
            return cardsIcons.slice(0, 9)
                    
        default:
            break;
    }
}

// Перемешиваем карты

const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
};