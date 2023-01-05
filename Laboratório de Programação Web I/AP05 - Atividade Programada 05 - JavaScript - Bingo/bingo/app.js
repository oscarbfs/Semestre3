// 75 numeros sorteados ramdomicamente
var numbersGenerated = [];
function randomNumber() {
    var number = 0;
    do {
        number = getRandomInteger(1,75);
    } while (numbersGenerated.includes(number));
    numbersGenerated.push(number);
    return number;
}

// A cartela deve conter 5 números aleatórios para cada
// letra: B (1-15), I (16-30), N (31-45), G (46-60) e O
// (61-75).

function generateCard() {
    return {
        "b": generateColumn(1,15),
        "i": generateColumn(16,30),
        "n": generateColumn(31,45),
        "g": generateColumn(46,60),
        "o": generateColumn(61,75),
    };
}

function isCardAllFilled(card) {
    var isAllFilled = true;
    for (const property in card) {
        card[property].forEach(element => {
            if (element.ruflled == false) {
                isAllFilled = false;
            }
        });
    }
    return isAllFilled;
}

function printCard(card) {
    for (const property in card) {
        var mapped = card[property].map( (item) => {
            sorteado = item.ruflled ? '✅' : '❌';
            return `(${item.number} sorteado: ${sorteado})`;
        });
        console.log(`${property}: ${mapped}`);
    }
}

function generateColumn(min, max) {
    numbers = [];
    do {
        number = getRandomInteger(min,max);
        if (!numbers.includes(number)) {
            numbers.push({'number' : number, 'ruflled': false});
        }
    } while (numbers.length < 5);
    return numbers;
}

function fillWithNumber(card, number) {
    for (const property in card) {
        card[property].forEach(element => {
            if (element.number == number) {
                element.ruflled = true;
            }
        });
    }
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}


function playSolo() {
    log('Começando o jogo');
    card = generateCard();
    continueTheGame = true;
    while (continueTheGame) {
        newRandomNumber = randomNumber();
        log(`Numero sorteado foi: ${newRandomNumber}`)
        fillWithNumber(card, newRandomNumber);
        printCard(card);
        log(isCardAllFilled(card));
        prompt('Aperte enter para continuar');
        continueTheGame = !isCardAllFilled(card);
    }
    log('BINGOOOO');
}

function playWithIA() {
    log('Começando o jogo');
    cardUser = generateCard();
    cardComputer = generateCard();
    cardWinner = "";
    continueTheGame = true;
    while (continueTheGame) {
        newRandomNumber = randomNumber();
        log(`Numero sorteado foi: ${newRandomNumber}`)
        fillWithNumber(cardUser, newRandomNumber);
        fillWithNumber(cardComputer, newRandomNumber);
        log('Sua Cartela');
        printCard(cardUser);
        log('Cartela do Computador');
        printCard(cardComputer);
        prompt('Aperte enter para continuar');
        continueTheGame = !isCardAllFilled(cardUser) && !isCardAllFilled(cardComputer);
    }
    if(isCardAllFilled(cardUser) && isCardAllFilled(cardComputer)) {
        cardWinner = 'Deu Empate!';
    } else {
        isCardAllFilled(cardUser) ? cardWinner = "Voce ganhou!!!!" : null;
        isCardAllFilled(cardComputer) ? cardWinner = "Computador ganhou!!!!" : null;
    }
    log('BINGOOOO. ' + cardWinner);
}

function log(string) {
    console.log(string);
}

