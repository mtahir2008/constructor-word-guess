var Word = require("./word.js");
var inquirer = require("inquirer")
// word array and globel variables 
var wordArray = ["class", "node", "code", "rock", "papper", "word", "game", "sports", "google", "dell", "apple", "play", "guess", "win"];
var randomWord = "";
var wordDisplay = "";
var finalWord;
var leftToGuess;
var guesses = 10;
// start new game 
function newGame() {
    console.log("Welcome to word guess game!")
    randomWord = "";
    var r = parseInt(Math.floor(Math.random() * (wordArray.length)))
    randomWord = wordArray[r]
    finalWord = new Word(randomWord)
    leftToGuess = finalWord.letterArr.length
};
// when game ends, ask user to play again if yes start new, and if no exit game
function gameOver() {
    {
        console.log("Game over.")
        inquirer.prompt([{
            type: "confirm",
            name: "playAgain",
            message: "Would you like to play again?"
        }]).then(function (response) {
            if (response.playAgain) {
                newGame()
                print()
                askToGuess();
            } else {
                console.log("Ok, come back when you feel like playing again!")
            }
        });
    };
};
function displayWord() {
 wordDisplay = finalWord.createWordString()
    console.log (wordDisplay);
    finalWord.compare = wordDisplay
};
// ask user to guess letters to play,
function askToGuess() {
    inquirer.prompt([{
        name: "ask",
        message: "Guess a letter"
    }]).then(function (response) {
        var input = response.ask
        if (guesses > 0) {
            if (input.length === 1) {
                finalWord.guessCheck(input)
             wordDisplay = finalWord.createWordString()
                // if user guess is incorrect 
                if (finalWord.compare === wordDisplay) {
                    console.log("Nope, there is no", input, "in the word")
                    guesses--
                    console.log("You have", guesses, "guesse(s) remaining.")
                    if (guesses === 0) {
                        gameOver()
                    } else {
                        print()
                        askToGuess()
                    };
                    // when user guess is correct 
                } else {
                    console.log("Good choce!")
                    leftToGuess--
                    print();
                    if (leftToGuess === 0) {

                        console.log("Great Job! Try the next word now:");
                        newGame()
                        print();
                        askToGuess();
                    } else {
                        askToGuess()
                    };
                };
                // if user guesses more than 1 letter 
            } else if (input.length === 0) {
                consoel.log("Please choose a letter.");
                askToGuess()
            } else {
                console.log("Only one letter at a time please.")
                askToGuess()
            }


        } else {
            gameOver()
        };
    });
};
// show ---- for user to play and guess words
function print() {
    console.log("\n")
    displayWord()
    console.log("\n")
};
newGame()
print()
askToGuess();