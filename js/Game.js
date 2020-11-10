/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

    // a method that creates the array of phrase objects
    createPhrases() {
        
        const phraseStrings = [
            "He scooooooooores",
            "Gooooooooal",
            "Nothing but net",
            "It   is   going   going   gone",
            'Put me down for a five'
        ]
        
        // iterate through the strings to create a new phrase Object for each string
        const phraseObjects = phraseStrings.map(phraseString => new Phrase(phraseString))
            
        
        return phraseObjects;
    }
    // a method to remove all phrase UL list items from a previous game
    removeOldPhraseBoxes() {
    //  select the list items of the previous phrase UL
        const oldPhraseBoxes = document.querySelectorAll('li.letter, li.space');
        for (let i = 0; i < oldPhraseBoxes.length; i++) {
            oldPhraseBoxes[i].remove();
        }
    }

    // a method to clear the keyboard
    resetKeyboard() {
        const pressedKeys = document.querySelectorAll('button.chosen, button.wrong');
        for (let i = 0; i < pressedKeys.length; i++) {
            pressedKeys[i].className = 'key';
            pressedKeys[i].disabled = false;
        }
    }

    // a method to reset the hearts to be full
    resetHearts() {
        this.missed = 0;
        const emptyHearts = document.querySelectorAll('li.lost');
        emptyHearts.forEach(emptyHeart => {
            emptyHeart.className = 'tries';
            emptyHeart.firstElementChild.src = 'images/liveHeart.png';
        });
        
    }
    
    // a method to reset the game to its' initial state; it removes the old phrase boxes, resets the keyboard
    // and resets the hearts
    resetGame() {
        this.removeOldPhraseBoxes();
        this.resetKeyboard();
        this.resetHearts();
    }
    
    // a method to start a new game
    startGame() {
        // create variable to hold the overlay
        const overlay = document.querySelector('#overlay');
        // hide the overlay
        overlay.style.display = 'none';
        // sets activePhrase to a call to the getRandomPhrase method
        this.activePhrase = this.getRandomPhrase();
        // call addPhraseToDisplay method with the activePhrase passed in as an arg in order to add phrase to the board
        this.activePhrase.addPhraseToDisplay();
    }
    
    // method that randomly retrieves a phrase from the phrases array and returns it 
    getRandomPhrase() {
        /* 
        - Generate a random integer between 1 and 5
        - below GetRandomInt function is adapted from example on:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
         */
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
            
          }

        // return a random phrase object using the getRandomInt function
        return this.phrases[getRandomInt(5)];
    }

    // a method to handle a players interaction with the keys
    handleInteraction(e) {
        // convert the active phrase to all lowercase letters and hold in variable
        let phraseLowerCase = this.activePhrase.phrase.toLowerCase();
        // if user guessed a letter by clicking an on-screen button
        if (e.type === 'click') {
        
            // disable the target button
            e.target.disabled = true;
                        
            // if phrase include the clicked letter
            if (phraseLowerCase.includes(e.target.textContent)) {
                e.target.className = 'chosen';
                // call showMatchedLetter() method
                this.activePhrase.showMatchedLetter(e);
                // if player has won game
                if (this.checkForWin()) {
                    // call gameOver method
                    this.gameOver();
                }
                
            } else {
                e.target.className = 'wrong';
                // call removeLife method
                this.removeLife();
            }
        }

        // if the user typed their guess on the keyboard...
        if (e.type === 'keydown') {

            const allButtons = Array.from(document.querySelectorAll('.key'));
            const keyedButton = allButtons.find(button => {
                return button.textContent === `${e.key}`;
                })

            // if the phrase includes the keyboard key that was typed by the user
            if (phraseLowerCase.includes(e.key)) {
                // select the on-screen button that matches the typed key
                keyedButton.className = 'chosen';
                // call showMatchedLetter() method
                this.activePhrase.showKeyedLetter(e);
                // if player has won game
                if (this.checkForWin()) {
                    // call gameOver method
                    this.gameOver();
                }
                
            } else {
                keyedButton.className = 'wrong';
                // call removeLife method
                this.removeLife();
            }
        }
    }

    // this method removes a life from the scoreboard
    removeLife() {
        // declare a variable to hold the last heart
        const hearts = document.getElementById('scoreboard');
        // select the children of hearts ol 
        const heartChildren = hearts.firstElementChild.children;
        // loop through the hearts from the end of the list and break the loop once the first live heart is found and changed
        for (let i = heartChildren.length-1; i >= 0; i--) {
            // if the heart has an image reference of 'images/lifeHeart.png'
            if (heartChildren[i].className === 'tries') {
                // change the image to 'lostHeart.png'
                heartChildren[i].firstElementChild.src = 'images/lostHeart.png';
                heartChildren[i].className = 'lost';
                // increment the Game's missed property
                this.missed++;
                // if missed  > 4
                if (this.missed > 4) {
                    // call gameOver() method 
                    this.gameOver();
                }
                // break
                break;
            // end if
            }
        // end for
        }    
    }
    // checks to see if player has revealed all the letters in the active phrase
    checkForWin() {
        
        // split the phrase into an array of letters
        const phraseCharacters = this.activePhrase.phrase.toLowerCase().split('');
        // select the qwerty keyboard children
        const keyrows = document.querySelectorAll('.keyrow');
        const keyrow1 = Array.from(keyrows[0].children);
        const keyrow2 = Array.from(keyrows[1].children);
        const keyrow3 = Array.from(keyrows[2].children);
        // concatenate them all together
        const allKeys = keyrow1
                    .concat(keyrow2)
                    .concat(keyrow3);

        // filter key if phraseCharacters includes key's textContent 
        const filteredKeys = allKeys.filter(key => phraseCharacters.includes(key.textContent));
        // check if every key has a className of 'chosen' and return boolean if so
        // use the .every iteration method
        const allChosenCheck = filteredKeys.every(key => key.className === 'chosen');
        return allChosenCheck;
    }

    // this method displays the game over screen depending on the result of the checkforwin method
    gameOver() {
         // create variable to hold the overlay
         const overlay = document.querySelector('#overlay');
         // show the overlay
         overlay.style.display = 'flex';
        //  if they win
        if (this.checkForWin()) {
            // change h1 textcontent to equal 'You Win!'
            overlay.children[1].textContent = 'You win!';
        // end if
        } else {
            // change h1 textcontent to a game over message
            overlay.children[1].textContent = 'Game Over! Please try again!';
        // end else
        }
    }

    
}