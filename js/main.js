function noDisplay(id) {
    document.getElementById(id).style.display = 'none';
}

function yesDisplay(id) {
    document.getElementById(id).style.display = 'block';
}

// health system
let health = 10;

function lessOne() {
    health--;
    if (health === 0) {
        youLose();

    }
}

var counter;
var timerVar;
// timer
function timerFunction() {
    var countDown = document.getElementById('timerSection');
    counter = 15;
    countDown.innerHTML = counter;

    timerVar = setInterval(function () {
        counter--;
        countDown.innerHTML = counter;

        if (counter <= 0) {
            lessOne();
            changePic();
            counter = 16;
        }
    }, 1000);
}

// end timer

function youLose() {
    clearInterval(timerVar);
    noDisplay("gameSection");
    yesDisplay("gameOverSection");

    //set the score to 0
    score = 0;
}

// win
function youWin(){
    noDisplay("gameSection");
    yesDisplay("winSection");
    clearInterval(timerVar);
    var chosenWord= document.getElementById("chosenWord");
    chosenWord.innerHTML = "The word is "+ guessWord;
}

//// score system

var score = 0;
let highScore = 0;

var wrongKeyCounter = 0;

let scoreDOM = document.getElementById('score');
let highScoreDOM = document.getElementById('highScore');

scoreDOM.lastElementChild.innerHTML = score;
highScoreDOM.lastElementChild.innerHTML = highScore;

//start screen
window.onload = function () {
    noDisplay("gameSection");
    noDisplay("gameOverSection");
    noDisplay("winSection");

    //title flashing 
    function flashingTitle() {
        var shows = true;
        var titleH = document.getElementById('title');
        var counter = 0;

        setInterval(function () {

            if (shows === true) {
                titleH.style.display = 'none';
                shows = false;
            } else {
                titleH.style.display = 'inline';
                shows = true;
            }

            shows = false;

            if (counter < 5) {
                counter++;
            } else {
                shows = true;
                counter = 0;
            }

        }, 200);
    }
    flashingTitle();
}

// first play the game
function playGameBtn() {
    noDisplay("titleScreenSection");
    yesDisplay("gameSection");
    timerFunction();

}

// re-playing the game
function playAgainBtn() {

    // removing last word
    var lastWord = document.getElementById('wordSection');
    for (var u in guessWord) {
        lastWord.lastElementChild.remove();
    }

    //removing keys from DOM
    var keysFromDOM = document.getElementById('keyboardSection');
    for (var g = 0; g < wrongKeyCounter; g++) {
        keysFromDOM.lastElementChild.remove();
    }

    //set the health back to 10
    health = 10;
    changePic();

    //set the timer back
    timerFunction();

    wrongKeyCounter = 0;
    wordSelection();

    noDisplay("gameOverSection");
    noDisplay("winSection");
    yesDisplay("gameSection");


}

//// pictures changing

var pic = document.getElementById('changingImage');

pic.style.backgroundImage = "url('images/pic0.png')";

// changing the pictures
function changePic() {

    switch (health) {
        case 10:
            pic.style.backgroundImage = "url('images/pic0.png')";
            break;
        case 9:
            pic.style.backgroundImage = "url('images/pic1.png')";
            break;
        case 8:
            pic.style.backgroundImage = "url('images/pic2.png')";
            break;
        case 7:
            pic.style.backgroundImage = "url('images/pic3.png')";
            break;
        case 6:
            pic.style.backgroundImage = "url('images/pic4.png')";
            break;
        case 5:
            pic.style.backgroundImage = "url('images/pic5.png')";
            break;
        case 4:
            pic.style.backgroundImage = "url('images/pic6.png')";
            break;
        case 3:
            pic.style.backgroundImage = "url('images/pic7.png')";
            break;
        case 2:
            pic.style.backgroundImage = "url('images/pic8.png')";
            break;
        case 1:
            pic.style.backgroundImage = "url('images/pic9.png')";
            break;
        case 0:
            pic.style.backgroundImage = "url('images/pic10.png')";
            break;
    }

}

/// word section
var guessWord = "";

function wordSelection() {
    // use uppercase , create a array of words, for the computer to pick randomly 

    var wordsCollection = ["BANANA", "COMPUTER", "PICTURE", "LUGGAGE", "PERFECT", "PRICE", "PLANE", "PLANTS", "SCREAMING", "UMBRELLA", "MUSIC", "HEART", "SUN", "DOG", "PHOTOGRAPH", "JUICE", "DINNER", "KITCHEN", "DESIGN", "BEACH", "ABILITY", "ABILITY", "ABLE", "ABOUT", "ABOVE", "ACCEPT", "ACCORDING", "ACCOUNT", "ACROSS", "ACT", "ACTION", "ACTIVITY", "ACTUALLY", "ADD", "ADDRESS", "ADMINISTRATION", "ADMIT", "ADULT", "AFFECT", "AFTER", "AGAIN", "AGAINST", "AGE", "AGENCY", "AGENT", "AGO", "AGREE", "AGREEMENT", "AHEAD", "AIR", "ALL", "ALLOW", "ALMOST", "ALONE", "ALONG", "ALREADY", "ALSO", "ALTHOUGH", "ALWAYS", "AMERICAN", "AMONG", "AMOUNT", "ANALYSIS", "AND", "ANIMAL", "ANOTHER", "ANSWER", "ANY", "ANYONE", "ANYTHING", "APPEAR", "APPLY", "APPROACH", "AREA", "ARGUE", "ARM", "AROUND", "ARRIVE", "ART", "ARTICLE", "ARTIST", "AS", "ASK", "ASSUME", "AT", "ATTACK", "ATTENTION", "ATTORNEY", ];

    guessWord = wordsCollection[Math.floor(Math.random() * wordsCollection.length)];



    var word = document.getElementById('wordSection');

    // creating elements on the DOM
    for (var index in guessWord) {
        word.appendChild(document.createElement('h1'));
        word.lastElementChild.setAttribute('class', 'letter');
        word.lastElementChild.textContent = "_";
    }

}

wordSelection();

var errors = false;

//// get input from keyboard 

document.onkeyup = function (event) {
    var userGuess = event.key.toUpperCase();


    // every guess , timer goes back to 15
    counter = 16;

    //
    function entrySystem() {
        errors = true;

        for (var j in guessWord) {
            if (userGuess === guessWord[j]) {
                document.getElementsByClassName('letter')[j].textContent = guessWord[j];
                errors = false;
            }
        }

        if (errors === true) {
            lessOne();
            errors = false;
        }


        changePic();

    }

    // validating keyboad entry
    var keyboard = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "_"];

    for (var t in keyboard) {
        if (userGuess === keyboard[t]) {
            entrySystem();
        }
    }

    //check the letters if they match
    // add the letters to an array and check against another array

    var newArray = [];
    var guessWordArray = [];

    for (var k in guessWord) {
        newArray.push(document.getElementsByClassName('letter')[k].textContent);
    }
    for (var l in guessWord) {
        guessWordArray.push(guessWord[l]);
    }

    var isEqual = 0;

    for (var h in newArray) {
        if (newArray[h] != guessWordArray[h]) {
            ;
        } else {
            isEqual++;
        }

    }

    // call win function
    if (isEqual === guessWordArray.length) {
        youWin();
        score += 100;
        scoreDOM.lastElementChild.innerHTML = score;
        highScore += 100;
        highScoreDOM.lastElementChild.innerHTML = highScore;
    }

    //// showing the keys on the screen
    //// keys
    var contains = false;
    var notContain = false;

    var keyboardDOM = document.getElementById('keyboardSection');

    function printKey() {
        keyboardDOM.appendChild(document.createElement('div'));
        keyboardDOM.lastElementChild.setAttribute('class', 'iKey');
        keyboardDOM.lastElementChild.textContent = userGuess;
    }


    for (var m in keyboard) {
        if (userGuess === keyboard[m]) {
            for (var u in guessWord) {
                if (userGuess === guessWord[u]) {
                    contains = true;
                } else {
                    notContain = true;
                }
            }
        }
    }

    if (notContain === true && contains === false) {
        printKey();
        wrongKeyCounter++;
    }

}