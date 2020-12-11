//'use strict'

// Init Firebase
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// var firebaseConfig = {
//     apiKey: "AIzaSyCT3itfDP9B9e6otxiO_c0MBr7TTCUMl7s",
//     authDomain: "planning-poker-9c150.firebaseapp.com",
//     databaseURL: "https://planning-poker-9c150.firebaseio.com",
//     projectId: "planning-poker-9c150",
//     storageBucket: "planning-poker-9c150.appspot.com",
//     messagingSenderId: "32134586323",
//     appId: "1:32134586323:web:e8938af79aad18817b9926",
//     measurementId: "G-41B0X18KVK"
// };
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCT3itfDP9B9e6otxiO_c0MBr7TTCUMl7s",
    authDomain: "planning-poker-9c150.firebaseapp.com",
    databaseURL: "https://planning-poker-9c150.firebaseio.com",
    projectId: "planning-poker-9c150",
    storageBucket: "planning-poker-9c150.appspot.com",
    messagingSenderId: "32134586323",
    appId: "1:32134586323:web:e8938af79aad18817b9926",
    measurementId: "G-41B0X18KVK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();


//var messageRef = firebase.database();
// const roomDB = firebase.database().ref('rooms'); //refer to specific database

const myRoom = function (roomID, nameID, pinID, scoreID) {
    this.room = roomID;
    this.pin = pinID;
    this.name = nameID;
    this.score = scoreID;
}
let $myRoom = new myRoom();
//var dbCollection = firebase.database;
//var messageRef = firebase.database;

function displayDeck() {
    let deckBoxEl = document.getElementById('deckBox');
    let newRowEl;
    let newColEl;
    for (let i = 1; i <= 4; i++) {
        newRowEl = document.createElement('div');
        newRowEl.classList.add('row', 'mb-5', 'mt-5');
        newRowEl.setAttribute('href', `#cardRow${i}`)
        newRowEl.id = `cardRow${i}`;
        deckBoxEl.appendChild(newRowEl);

        for (let j = 1; j <= 4; j++) {
            newColEl = document.createElement('div');
            newColEl.classList.add('col-2', 'pt-2', 'pb-2', 'text-lg-center', 'cardBox', 'mx-auto', 'border', 'border-1', 'd-flex', 'align-items-center', 'justify-content-center', 'shadow')
            newColEl.innerHTML = `<span id="${i}${j}span" class="display-5  cardValue">  &#8734 </span>`;
            newColEl.id = i + '-' + j + '-box';
            newRowEl.appendChild(newColEl);
            console.log(i, j)
        }
        console.log(newRowEl);
    }
    let infEl = document.getElementById('41span');
    let cupEl = document.getElementById('4-2-box');
    let qEl = document.getElementById('4-3-box');
    let refreshEl = document.getElementById('4-4-box');
    infEl.classList.replace('display-5', 'display-1');
    cupEl.innerHTML = `<img class="imgSVG" src="bootstrap-icons-1.1.0/cup.svg" alt="">`;
    qEl.innerHTML = `<img class="imgSVG" src="bootstrap-icons-1.1.0/question-circle.svg" alt="">`;
    refreshEl.innerHTML = `<img class="imgSVG" src="bootstrap-icons-1.1.0/arrow-repeat.svg" alt="">`;
}

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
    displayDeck();
    const cardDeck = [];
    cardDeck.push(new Cards([0, 0.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89], 'Fibonacci'));
    cardDeck.push(new Cards([0, '1/2', 1, 2, 3, 5, 8, 13, 20, 40, 100, 150], 'Modified Fibonacci'));
    cardDeck.push(new Cards([0, 1, 2, 4, 8, 16, 32, 64, '', '', '', ''], 'Powers'));
    cardDeck.push(new Cards([0, 'xs', 's', 'm', 'L', 'XL', '2XL', '3XL', '', '', '', ''], 'TShirts'));
    cardDeck[0].updateCards();

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

function getInputValue(id) {
    return document.getElementById(id).value;
}

function submitForm(e, i) {
    e.preventDefault();
    //Get values from form
    let roomID = getInputValue('inputRoom');
    let pinID = getInputValue('inputPIN');
    let nameID = getInputValue('inputUser');
    let scoreID = 0;
    $myRoom = new myRoom(roomID, nameID, pinID, scoreID);
    console.log($myRoom);
    if (roomID !== '') saveData(roomID, nameID, pinID, scoreID, i);
}

const roomForm = () => {
    const formEl = document.querySelector('#inputForm');
    const createEl = document.querySelector('#createBtn');
    formEl.addEventListener('submit', e => {
        let i = 0; //join
        submitForm(e, i)
    });
    createEl.addEventListener('click', e => {
        let i = 1; //create
        submitForm(e, i)
    });
}

//Save to firebase
function saveData(room, name, pin, score, status) {
    const roomDB = firebase.database().ref('rooms/' + room + pin + '/' + name);  //refer to specific database
    roomDB.set({
        room: room,
        name: name,
        pin: pin,
        score: score,
        status: status
    });
    // var newRoom = roomDB.push();
    // newRoom.set({
    //     room: room,
    //     name: name,
    //     pin: pin,
    //     score: score,
    //     status: status
    // })
    readData(room, pin);
}

//Update firebase
function updateData(room, name, pin, score, status) {
    const roomDB = firebase.database().ref('rooms/' + room + pin + '/' + name);  //refer to specific database
    roomDB.update({
        //room: room,
        //name: name,
        //pin: pin,
        score: score
        //status: status
    });
    // var newRoom = roomDB.push();
    // newRoom.set({
    //     room: room,
    //     name: name,
    //     pin: pin,
    //     score: score,
    //     status: status
    // })
    readData(room, pin);
}

//update Score window
function updateScores(name, score, status) {
    let scoreEl = document.getElementById('scores');
    let imgPerson = '';
    if (status == 0) imgPerson = `<img class="imgSVGs" src="bootstrap-icons-1.1.0/person.svg" alt="admin">`;
    else imgPerson = `<img class="imgSVGs" src="bootstrap-icons-1.1.0/file-person.svg" alt="participant">`;
    let newtrEl = document.createElement("tr");
    newtrEl.innerHTML = `<th scope="row">${score}</th><td>${imgPerson}</td><td>${name}</td>`;
    scoreEl.appendChild(newtrEl);
}

//Read from Firebase
function readData(roomID, pinID) {
    let roomNr = document.getElementById('roomNr');
    let scoreEl = document.getElementById('scores');

    scoreEl.innerHTML = ``;
    roomNr.textContent = roomID;
    console.log(roomID);
    //let roomJoin = 
    firebase.database().ref('rooms/' + roomID + pinID).once('value', function (snapshot) {
        snapshot.forEach(
            function (ChildSnapshot) {
                let name = ChildSnapshot.val().name;
                let pin = ChildSnapshot.val().pin;
                let room = ChildSnapshot.val().room;
                let score = ChildSnapshot.val().score;
                let status = ChildSnapshot.val().status;
                console.log(name, room, pin, score, status);
                updateScores(name, score, status);
            }
        );
    });
}



const main = () => {
    displayCards();
    roomForm();
}

document.addEventListener('DOMContentLoaded', main);