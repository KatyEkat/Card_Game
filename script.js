const btnStart = document.querySelector('.btn__start');
const fieldControls = document.querySelectorAll('.field__control');
let game_level =[];

// сохранение уровня сложности в глоб сост
for (let i = 0; i < fieldControls.length; i++) {
    fieldControls[i].addEventListener('click', () => {
    console.log(`${fieldControls[i].name}: ${fieldControls[i].value}`);
    localStorage.setItem('level', fieldControls[i].value);
    game_level = localStorage.level;
})};

btnStart.addEventListener('click', () => startGame(game_level));
// Запуск игры и выбор сложности принимает изначальную сложность игры
const startGame = (game_level) => {
    let firstCard = null;
    let secondCard = null;
    let clickable = true;

    const gameSection = document.querySelector('.game-section_container');
    const gameTable = document.createElement('div'); // тут будет стол с игрой
    const cardsIcons = createIconsArray(game_level);
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
        case '6':
            return cardsIcons.slice(0, 3)
        
        case '12':
            return cardsIcons.slice(0, 6)
            
        case '18':
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