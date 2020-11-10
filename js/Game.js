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
            'I am phrase One',
            'I am phrase Two',
            'I am phrase Three',
            'I am phrase Four',
            'I am phrase Five'
        ]
        
        // iterate through the strings to create a new phrase Object for each string
        const phraseObjects = phraseStrings.map(phraseString => {
                                    return new Phrase(phraseString);
                                })
            
        
        return phraseObjects;
    }

    startGame() {
        // hides the start screen overlay

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
            console.log(Math.ceil(Math.random() * Math.ceil(max)));
            return Math.ceil(Math.random() * Math.ceil(max));
            
          }

        // return a random phrase object using the getRandomInt function
        return this.phrases[getRandomInt(5)];
    }

    handleInteraction(e) {
        // disable the target button
        e.target.disabled = true;
        // if phrase doesn't include the guessed letter
        // convert the active phrase to all lowercase letters and hold in variable
        let phraseLowerCase = this.activePhrase.phrase.toLowerCase();

        if (phraseLowerCase.includes(e.target.textContent)) {
            e.target.className = 'chosen';
            // call showMatchedLetter() method
            console.log('call showMatchedLetter() method');
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

    // this method removes a life from the scoreboard
    removeLife() {
        // declare a variable to hold the last heart
        const hearts = document.getElementById('scoreboard');
        // select the children of hearts ol 
        const heartChildren = hearts.firstElementChild.children;
        // loop through the hearts from the end of the list and break the loop once the first live heart is found and changed
        for (let i = heartChildren.length-1; i >= 0; i--) {
            // if the heart has an image reference of 'images/lifeHeart.png'
            console.log(heartChildren[i].className)
            if (heartChildren[i].className === 'tries') {
                // change the image to 'lostHeart.png'
                heartChildren[i].firstElementChild.src = 'images/lostHeart.png';
                heartChildren[i].className = 'lost';
                // // increment the Game's missed property
                this.missed++;
                // if missed  > 4
                if (this.missed > 4) {
                    // call gameOver() method 
                    console.log('Call Game Over Method')
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
        // concatenate the three rows of buttons
        // select the qwerty keyboard children
        const keyrows = document.querySelectorAll('.keyrow')
        const keyrow1 = Array.from(keyrows[0].children);
        const keyrow2 = Array.from(keyrows[1].children);
        const keyrow3 = Array.from(keyrows[2].children);
        // concatenate them all together
        const allKeys = keyrow1
                    .concat(keyrow2)
                    .concat(keyrow3);

        // filter key if phraseCharacters includes key's textContent 
        const filteredKeys = allKeys.filter(key => {
             return phraseCharacters.includes(key.textContent);
        })
        // check if every key has a className of 'chosen' and return boolean if so
        // use the .every iteration method
        const allChosenCheck = filteredKeys.every(key =>{
            return key.className === 'chosen';
        })
        return allChosenCheck;
    }

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
            // change h1 textcontent to equal 'Wrong! Try again!'
            overlay.children[1].textContent = 'Wrong! Try again!';
        // end else
        }
    }

    
}