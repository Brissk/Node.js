const symbols = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSYUVWXYZ0123456789!#$%&()*+,-./:;<=>?@[\]^_{|}";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function lettersParol(parolLength) {
    let result = '';
    for (let i = 0; i < parolLength; i++) {
        let random = getRandomInt(0, 52);
        result += symbols[random];
    }
    return result;
}

function lettersNumbersParol(parolLength) {
    let result = '';
    for (let i = 0; i < parolLength; i++) {
        let random = getRandomInt(0, 62);
        result += symbols[random];
    }
    return result;
}

function lettersNumbersSymbolsParol(parolLength) {
    let result = '';
    for (let i = 0; i < parolLength; i++) {
        let random = getRandomInt(0, symbols.length);
        result += symbols[random];
    }
    return result;
}

console.log(lettersParol(8));
console.log(lettersNumbersParol(8));
console.log(lettersNumbersSymbolsParol(8));

module.exports = { lettersParol, lettersNumbersParol, lettersNumbersSymbolsParol }