let objectsByDifficulty = {};
for (let [text, data] of Object.entries(objects)) {
    let difficulty = data.difficulty;
    if (objectsByDifficulty[difficulty] === undefined) {
        objectsByDifficulty[difficulty] = [];
    }
    objectsByDifficulty[difficulty].push(text);
}

let availableDifficulties = Object.keys(objectsByDifficulty);
let currentBingoObjects = [];

// Create difficulty toggle element
let _div = document.getElementById("difficulty-toggle-div");
_div.innerHTML = "";
let numSeenDifficulties = 0;
let select = document.createElement("select");
select.multiple = "multiple";
select.id = "difficulty-toggle";
for (let i = 0; i < availableDifficulties.length; i++) {
    if (parseInt(availableDifficulties[i]) < 1) {
        continue;
    }
    let option = document.createElement("option");
    option.value = availableDifficulties[i];
    option.innerText = availableDifficulties[i];

    // Set the initially selected difficulties
    if (["6", "7", "8"].includes(availableDifficulties[i])) {
        option.selected = true;
    }

    select.appendChild(option);
    numSeenDifficulties++;
}
select.size = numSeenDifficulties;
select.onchange = onDifficultyToggleChange;
_div.appendChild(select);

generateNewCard();

function onDifficultyToggleChange() {
    console.log("difficulty toggle changed");
    generateNewCard();
}

function onRandomizeButtonClick() {
    generateNewCard();
}

function onSizeSelectChange() {
    generateNewCard();
}

function onFreeSpaceInput() {
    generateNewCard();
}

function onShowDifficultyInput() {
    displayCard();
}

function generateNewCard() {
    let selectedDifficulties = getToggledDifficulties();

    if (selectedDifficulties.length === 0) {
        return;
    }

    // TODO: get card size
    let cardSize = 5;

    // TODO: get free space state
    let hasFreeSpace = false;

    currentBingoObjects = [];

    let numObjects = cardSize * cardSize - (hasFreeSpace ? 1 : 0);
    let randomizedObjects = [];
    for (let i = 0; i < numObjects; i++) {
        let difficulty = selectedDifficulties[getRandomInt(selectedDifficulties.length)];
        let possibleObjects = objectsByDifficulty[difficulty];

        let object = possibleObjects[getRandomInt(possibleObjects.length)];
        let numAttempts = 1;
        while (randomizedObjects.includes(object) && numAttempts < 50) {
            object = possibleObjects[getRandomInt(possibleObjects.length)];
            numAttempts++;
        }

        randomizedObjects.push(object);
    }

    for (let i = 0; i < randomizedObjects.length; i++) {
        let object = objects[randomizedObjects[i]];
        currentBingoObjects.push({
            text: randomizedObjects[i],
            emoji: object.emoji,
            difficulty: object.difficulty,
        });
    }

    displayCard();
}

function displayCard() {
    // TODO: get card size
    let cardSize = 5;
    
    // TODO: get free space state
    let hasFreeSpace = false;

    // TODO: get show difficulty state
    let showDifficulty = true;
    
    let div = document.getElementById("card");
    div.innerHTML = "";
    let freeSpaceIndex = Math.floor(cardSize * cardSize / 2);
    for (let i = 0; i < cardSize; i++) {
        let row = document.createElement("div");
        row.classList.add("bingo-row");
        for (let j = 0; j < cardSize; j++) {
            let cellIndex = i * cardSize + j;
            let cell = document.createElement("div");
            cell.classList.add("bingo-cell");

            if (hasFreeSpace && cellIndex === freeSpaceIndex) {
                cell.innerText = "Free Space";
            } else {
                if (hasFreeSpace && cellIndex > freeSpaceIndex) {
                    cellIndex--;
                }
                let object = currentBingoObjects[cellIndex];
                let cellHTML = object.emoji + " " + object.text;
                if (showDifficulty) {
                    cellHTML += "<br>Difficulty " + object.difficulty;
                }
                cell.innerHTML = cellHTML;
            }

            row.appendChild(cell);
        }
        div.appendChild(row);
    }

    updateJsonOutput();
}

function updateJsonOutput() {
    // TODO: get card size
    let cardSize = 5;

    // TODO: get free space state
    let hasFreeSpace = false;

    // TODO: get show difficulty state
    let showDifficulty = true;

    let freeSpaceIndex = Math.floor(cardSize * cardSize / 2);

    let outputObjects = [];
    for (let i = 0; i < cardSize * cardSize; i++) {
        let cellIndex = i;
        if (hasFreeSpace && cellIndex === freeSpaceIndex) {
            outputObjects.push({"name": "Free Space"});
        } else {
            if (hasFreeSpace && cellIndex > freeSpaceIndex) {
                cellIndex--;
            }
            let object = currentBingoObjects[cellIndex];
            let cellHTML = object.emoji + " " + object.text;
            if (showDifficulty) {
                cellHTML += "\nDifficulty " + object.difficulty;
            }
            outputObjects.push({"name": cellHTML});
        }
    }

    let output = document.getElementById("json-output");
    output.innerHTML = "";
    output.innerText = JSON.stringify(outputObjects);
}

function getToggledDifficulties() {
    let selectedOptions = document.getElementById("difficulty-toggle").selectedOptions;
    let difficulties = [];
    for (let i = 0; i < selectedOptions.length; i++) {
        difficulties.push(parseInt(selectedOptions[i].value));
    }
    return difficulties;
}

function getCardSize() {
    document.getElementById("size");
}

function getFreeSpaceState() {
    document.getElementById("");
}

function getShowDifficultyState() {
    document.getElementById("");
}

// max is exclusive
function getRandomInt(max) {
    let maxFloored = Math.floor(max);
    return Math.floor(Math.random() * maxFloored);
}
