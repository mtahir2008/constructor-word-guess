var Letter = require("./letter.js")

function Word(random) {
    this.letterArr = [];
    this.compare = "";
    for (var i = 0; i < random.length; i++) {
        this.letterArr.push(new Letter(random[i]))
    }
    this.createWordString = function () {
        var wordString = "";
        for (var i = 0; i < this.letterArr.length; i++) {
            wordString += this.letterArr[i].returnChar() + " ";
        }
        return wordString
    }
    this.guessCheck = function (userInput) {
        for (var i = 0; i < this.letterArr.length; i++) {
            this.letterArr[i].guessCheck(userInput)
        }
    }
}
module.exports = Word;