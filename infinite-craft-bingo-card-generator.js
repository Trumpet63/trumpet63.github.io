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

let maxCardSize = 6;
let cellIsMarked = [];
for (let i = 0; i < maxCardSize; i++) {
    let row = [];
    for (let j = 0; j < maxCardSize; j++) {
        row.push(false);
    }
    cellIsMarked.push(row);
}

generateNewCard();

function onDifficultyToggleChange() {
    generateNewCard();
}

function onRandomizeButtonClick() {
    generateNewCard();
}

function onSizeSelectChange() {
    displayCard();
}

function onFreeSpaceInput() {
    displayCard();
}

function onShowDifficultyInput() {
    displayCard();
}

function onShowEmojiInput() {
    displayCard();
}

function onClearMarkedCellsButtonClick() {
    cellIsMarked = [];
    for (let i = 0; i < maxCardSize; i++) {
        let row = [];
        for (let j = 0; j < maxCardSize; j++) {
            row.push(false);
        }
        cellIsMarked.push(row);
    }
    displayCard();
}

function onClickCell(cell, row, column) {
    cellIsMarked[row][column] = !cellIsMarked[row][column];
    cell.className = "";
    cell.classList.add("bingo-cell");
    if (cellIsMarked[row][column]) {
        cell.classList.add("marked-cell");
    }
}

function generateNewCard() {
    let selectedDifficulties = getToggledDifficulties();
    
    if (selectedDifficulties.length === 0) {
        return;
    }
    
    // Always generate the max needed objects so I don't have to
    // re-randomize when the user changes every option
    let neededObjects = maxCardSize * maxCardSize;

    // If we would have duplicates in the bingo card, add next highest
    // or next lowest difficulties repeatedly until that's not the case
    let possibleObjects = 0;
    for (let i = 0; i < selectedDifficulties.length; i++) {
        let difficulty = selectedDifficulties[i]
        possibleObjects += objectsByDifficulty[difficulty].length;
    }

    if (possibleObjects < neededObjects) {
        console.log("Just using the selected difficulties would cause duplicates, so I will add a few more difficulties to prevent that.");
        selectedDifficulties.sort();
        let maxDifficulty = selectedDifficulties[selectedDifficulties.length - 1]
        let direction;
        if (maxDifficulty < 3) {
            direction = 1;
        } else  {
            direction = -1
        }
    
        while (possibleObjects < neededObjects) {
            selectedDifficulties.sort();
            let i = selectedDifficulties.length - 1;
            let currentDifficulty = selectedDifficulties[selectedDifficulties.length - 1];
            while (currentDifficulty === selectedDifficulties[i]) {
                currentDifficulty += direction;
                i += direction;
            }
            selectedDifficulties.push(currentDifficulty);
            possibleObjects += objectsByDifficulty[currentDifficulty].length;
        }
    }

    // Add random objects until we have the required number
    currentBingoObjects = [];
    let randomizedObjects = [];
    for (let i = 0; i < neededObjects; i++) {
        let difficulty = selectedDifficulties[getRandomInt(selectedDifficulties.length)];
        let possibleObjects = objectsByDifficulty[difficulty];
        let object = possibleObjects[getRandomInt(possibleObjects.length)];

        let numAttempts = 1;
        while (randomizedObjects.includes(object) && numAttempts < 50) {
            difficulty = selectedDifficulties[getRandomInt(selectedDifficulties.length)];
            possibleObjects = objectsByDifficulty[difficulty];
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
    let cardSize = getCardSize();
    let hasFreeSpace = getFreeSpaceState();
    let showDifficulty = getShowDifficultyState();
    let showEmoji = getShowEmojiState();
    
    let div = document.getElementById("card");
    div.innerHTML = "";
    let freeSpaceIndex = getFreeSpaceIndex(cardSize);
    for (let i = 0; i < cardSize; i++) {
        let row = document.createElement("div");
        row.classList.add("bingo-row");
        for (let j = 0; j < cardSize; j++) {
            let cellIndex = i * cardSize + j;
            let cell = document.createElement("div");
            cell.classList.add("bingo-cell");
            cell.onclick = () => onClickCell(cell, i, j);

            if (hasFreeSpace && cellIndex === freeSpaceIndex) {
                cell.innerText = "Free Space";
            } else {
                if (hasFreeSpace && cellIndex > freeSpaceIndex) {
                    cellIndex--;
                }
                let object = currentBingoObjects[cellIndex];
                let cellHTML = "";
                if (showEmoji) {
                    cellHTML += object.emoji + " ";
                }
                cellHTML += object.text;
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
    let cardSize = getCardSize();
    let hasFreeSpace = getFreeSpaceState();
    let showDifficulty = getShowDifficultyState();
    let showEmoji = getShowEmojiState();

    let freeSpaceIndex = getFreeSpaceIndex(cardSize);
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
            let cellHTML = "";
            if (showEmoji) {
                cellHTML += object.emoji + " ";
            }
            cellHTML += object.text;
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

function getFreeSpaceIndex(cardSize) {
    return Math.floor((cardSize - 1) / 2) * cardSize + Math.floor((cardSize - 1) / 2);
};

function getToggledDifficulties() {
    let selectedOptions = document.getElementById("difficulty-toggle").selectedOptions;
    let difficulties = [];
    for (let i = 0; i < selectedOptions.length; i++) {
        difficulties.push(parseInt(selectedOptions[i].value));
    }
    return difficulties;
}

function getCardSize() {
    let cardSize = parseInt(
        document.getElementById("size")
            .selectedOptions[0]
            .value
            .charAt(0)
    );
    return cardSize;
}

function getFreeSpaceState() {
    let freeSpaceChecked = document.getElementById("free-space").checked;
    return freeSpaceChecked;
}

function getShowDifficultyState() {
    let showDifficultyChecked = document.getElementById("show-difficulty").checked;
    return showDifficultyChecked;
}

function getShowEmojiState() {
    let showEmojiChecked = document.getElementById("show-emoji").checked;
    return showEmojiChecked;
}

// max is exclusive
function getRandomInt(max) {
    let maxFloored = Math.floor(max);
    return Math.floor(Math.random() * maxFloored);
}
