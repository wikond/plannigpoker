'use strict'
class Cards {
    constructor(value, name) {
        this.value = value;
        this.name = name;
    }
    showCard() {
        const el = document.createElement('div');
        const carDiv = document.querySelector('#cards');
        el.id = 'card' + this.value;
        el.classList.add('cardBox');
        el.textContent = this.name;
        carDiv.appendChild(el);
    }
    updateCards() {
        let cardsEl;
        cardsEl = document.querySelectorAll('.cardBox>span');
        this.value.forEach((el, i) => {
            cardsEl[i].textContent = el;
        });
    }
}

const displayCards = () => {
    const cardDeck = [];
    cardDeck.push(new Cards([0, 0.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89], 'Fibonacci'));
    cardDeck.push(new Cards([0, '1/2', 1, 2, 3, 5, 8, 13, 20, 40, 100, 150], 'Modified Fibonacci'));
    cardDeck.push(new Cards([0, 1, 2, 4, 8, 16, 32, 64, '', '', '', ''], 'Powers'));
    cardDeck.push(new Cards([0, 'xs', 's', 'm', 'L', 'XL', '2XL', '3XL', '', '', '', ''], 'TShirts'));

    let selectorEl = [];
    selectorEl = document.querySelectorAll('#deckSel>li>a');
    selectorEl.forEach((el, i) => {
        el.addEventListener('click', () => {
            const row3 = document.querySelector('#cardRow3');
            if (i > 1) {
                row3.classList.add('dispNone');
            }
            else {
                row3.classList.remove('dispNone');
            }
            cardDeck[i].updateCards();
        })
    })

}



const main = () => {
    displayCards();
}

document.addEventListener('DOMContentLoaded', main);