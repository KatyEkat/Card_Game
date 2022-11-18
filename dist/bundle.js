/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./style.scss":
/*!********************!*\
  !*** ./style.scss ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./style.scss");

var btnStart = document.querySelector('.btn-start');
var fieldControls = document.querySelectorAll('.field-control');
var formFields = document.querySelectorAll('.form__field');
var gameLevel = 0;
var gameSection = document.querySelector('.game-section-container');
var gameTable = document.createElement('div');
var restartBtn = document.querySelector('.restart-btn');
var container = document.querySelector('.container');
var cardField = document.querySelector('.game-section-container');
var cards = [];
var winScreen = document.querySelector('.result-screen-win-container');
var lostScreen = document.querySelector('.result-screen-lost-container');
var _loop_1 = function (i) {
    fieldControls[i].addEventListener('click', function () {
        console.log("".concat(fieldControls[i].name, ": ").concat(fieldControls[i].value));
        localStorage.setItem('level', fieldControls[i].value);
        gameLevel = localStorage.level;
    });
};
// сохранение уровня сложности в глоб сост
for (var i = 0; i < fieldControls.length; i++) {
    _loop_1(i);
}
formFields.forEach(function (field) {
    field.addEventListener('click', function () {
        formFields.forEach(function (item) { return item.classList.remove('active'); });
        field.classList.add('active');
    });
});
btnStart.addEventListener('click', function () { return startGame(gameLevel); });
// Запуск игры и выбор сложности принимает изначальную сложность игры
var startGame = function (gameLevel) {
    var firstCard = null;
    var secondCard = null;
    var clickable = true;
    container.classList.toggle('cards-field');
    cardField.classList.toggle('cards-field');
    var cardsIcons = createIconsArray(gameLevel);
    var duplicatedCardsIcons = duplicateArray(cardsIcons);
    shuffle(duplicatedCardsIcons);
    duplicatedCardsIcons.forEach(function (icon) {
        return gameTable.append(createGameCard('notFlippedCard', icon));
    });
    gameSection.append(gameTable, restartBtn);
    function getElapsedTimeString(totalSeconds) {
        function prettyTimeString(num) {
            return (num < 10 ? '0' : '') + num;
        }
        var minutes = Math.floor(totalSeconds / 60);
        totalSeconds = totalSeconds % 60;
        var seconds = Math.floor(totalSeconds);
        minutes = prettyTimeString(minutes);
        seconds = prettyTimeString(seconds);
        var currentTimeString = minutes + ':' + seconds;
        return currentTimeString;
    }
    var elapsedSeconds = -5;
    function setTimer(elapsedSeconds) {
        // setTimeout(function () {
        //   // $('.timer').text(getElapsedTimeString(elapsedSeconds));
        //   document.querySelector('.timer').innerHTML =
        //     getElapsedTimeString(elapsedSeconds);
        // }, 5000);
        setTimeout(function () {
            var timer = document.querySelector('.timer');
            timer.innerHTML = getElapsedTimeString(elapsedSeconds);
        }, 5000);
    }
    setInterval(function () {
        setTimer(elapsedSeconds++);
    }, 1000);
    cards = document.querySelectorAll('.game-card');
    var karty = document.querySelectorAll('.game-card');
    karty.forEach(function (karta) { return karta.classList.add('flip'); });
    karty.forEach(function (karta) {
        return setTimeout(function () {
            karta.classList.remove('flip');
        }, 5000);
    });
    cards.forEach(function (card, index) {
        return card.addEventListener('click', function () {
            if (clickable === true && !card.classList.contains('successfully')) {
                card.classList.add('flip');
                if (firstCard === null) {
                    firstCard = index;
                }
                else {
                    if (index !== firstCard) {
                        secondCard = index;
                        clickable = false;
                    }
                }
                if (firstCard !== null &&
                    secondCard !== null &&
                    firstCard !== secondCard) {
                    if (cards[firstCard].firstElementChild.className ===
                        cards[secondCard].firstElementChild.className) {
                        setTimeout(function () {
                            cards[firstCard].classList.add('successfully');
                            cards[secondCard].classList.add('successfully');
                            firstCard = null;
                            secondCard = null;
                            clickable = true;
                        }, 500);
                        if (Array.from(cards).every(function (card) {
                            return card.className.includes('flip');
                        })) {
                            gameSection.remove(gameTable);
                            winScreen.style.display = 'inherit';
                            setTimeout(function () {
                                document
                                    .querySelectorAll('.timer')[0]
                                    .classList.remove('timer');
                            }, 500);
                        }
                    }
                    else {
                        if (!Array.from(cards).every(function (card) {
                            return card.className.includes('flip');
                        })) {
                            gameSection.remove(gameTable);
                            lostScreen.style.display = 'inherit';
                            setTimeout(function () {
                                document
                                    .querySelectorAll('.timer')[1]
                                    .classList.remove('timer');
                            }, 500);
                        }
                    }
                }
            }
        });
    });
};
// Карточки для игры
var duplicateArray = function (array) {
    return array.reduce(function (res, current) { return res.concat([current, current]); }, []);
};
var createIconsArray = function (initialCount) {
    var cardsIcons = [
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
var shuffle = function (array) {
    var _a;
    var currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [
            array[randomIndex],
            array[currentIndex],
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
};
//Создание карт
var createGameCard = function (defaultIcon, flippedCardIcon) {
    var card = document.createElement('div');
    card.classList.add('game-card');
    var notFlippedCardI = document.createElement('i');
    var flippedCardI = document.createElement('i');
    notFlippedCardI.classList.add("not-flipped-card");
    flippedCardI.innerHTML = "".concat(flippedCardIcon.value);
    flippedCardI.classList.add("flipped-card", "".concat(flippedCardIcon.suit), "".concat(flippedCardIcon.value));
    card.append(flippedCardI, notFlippedCardI);
    return card;
};
gameSection.append(gameTable, restartBtn);
document.querySelectorAll('.restart-btn').forEach(function (button) {
    button.addEventListener('click', function () { return window.location.reload(); });
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map