/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase;
    }

    // a method to add the randomly chosen phrase to the display in the form of blank placeholder boxes
    addPhraseToDisplay() {
        // create a variable to hold the unordered list of letters
        const phraseDiv = document.querySelector('#phrase');
        const phraseUL = phraseDiv.firstElementChild;

        // for the given phrase, a list item should be created for each character in 
        // the phrase and passed into the unordered list

        // using a for loop method, iterate through the phrase's characters and add a list item to the 'phrase' div's ul in the document 
        for (let i = 0; i < this.phrase.length; i++) {
            let char = this.phrase[i];
            // check if the current character is a space
            if (char === ' ') {
                // create new li
                let currLI = document.createElement('li');
                // give li a class name of 'space'
                currLI.className = 'space';
                phraseUL.appendChild(currLI)
            // otherwise, create a list item with the text content of the letter and a class name of 'hide letter [letter]'
            } else {
                // variable to hold the new list item
                let currLI = document.createElement('li');
                // add character's value to the list item's text content
                currLI.textContent = char;
                // create class name for the current li
                currLI.className = `hide letter ${char.toLowerCase()}`;
                phraseUL.appendChild(currLI)
            }
            // for each character whether it is a space or a letter, append the li to the ul
            ;
        }
        
    }
    
    // checks to see if letter that is selected by the player matches a letter in the phrase
    checkLetter(event) {   
        // if the letter of a phrase character equals the text content of the click
        if (phrase.includes(event.target.textContent)) {
            return true;
        } else {
            return false;
        }
    }
    // reveals the letter on the board that matches the player's selection
    showMatchedLetter(event) {
        const clickedKeyLetter = event.target.textContent;
        // select the corresponding list item in the dom
        const hiddenLetterBoxes = document.querySelectorAll(`.${clickedKeyLetter}`);
        // change the className to 'show'
        hiddenLetterBoxes.forEach(letterbox => letterbox.className = `show letter ${clickedKeyLetter}`)
    }

    showKeyedLetter(event) {
        const keyedLetter = event.key;
        // select the corresponding list item in the dom
        const hiddenLetterBoxes = document.querySelectorAll(`.${keyedLetter}`);
        // change the className to 'show'
        hiddenLetterBoxes.forEach(letterbox => letterbox.className = `show letter ${keyedLetter}`)
    }
}