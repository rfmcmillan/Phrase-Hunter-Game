/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

//  new instance of Game class
 const game = new Game();
 
// create event listener for when Start button is clicked
// create variable to hold the start button
const startButton = document.querySelector('#btn__reset');
// add event listener to the start button thatcalls the startGame() method
startButton.addEventListener('click', (e) => {
    game.resetGame();
    game.startGame();
})

// add click listeners to each keyboard button
// create variable to hold the div w/ id of 'qwerty'
const qwerty = document.querySelector('#qwerty').children;
// for loop that loops through the three rows of buttons

for (let i = 0; i < qwerty.length; i++) {
    // declare variable that holds the current row
    let currRow = qwerty[i].children;
    
    // nested for loop that loops through the buttons in each row
    for (let j = 0; j < currRow.length; j++) {
        // select button
        // add event listener to button that calls handleInteraction() on game object
        currRow[j].addEventListener('click', (e) => {
            game.handleInteraction(e);
        });
        
    }
// end for  

}
    