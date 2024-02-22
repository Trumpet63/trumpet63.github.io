function onGetRecipeInputKeyDown(event) {
    if (event.code === "Enter") {
        let div = document.getElementById("get-recipe-suggestions");
        div.innerHTML = "";
        div.className = "";

        let suggestions = getSuggestions();

        // do auto-capitalization if the first suggestion is case-insensitively identical
        let recipeInput = document.getElementById("get-recipe-input");
        let input = recipeInput.value.toString();
        if (input.toLowerCase() === suggestions[0].toLowerCase()) {
            recipeInput.value = suggestions[0];
        }

        onGetRecipe();
    }
}

function onGetRecipeInputInput() {
    let suggestions = getSuggestions();
    let div = document.getElementById("get-recipe-suggestions");
    div.innerHTML = "";
    div.className = "";
    if (suggestions.length > 0) {
        div.classList.add("suggestions-visible")
        let list = document.createElement("ul");
        for (let i = 0; i < suggestions.length; i++) {
            let item = document.createElement("li");
            item.innerText = suggestions[i];
            list.appendChild(item);
        }
        div.appendChild(list);
    }
}

function getSuggestions() {
    let suggestions = [];
    let recipeInput = document.getElementById("get-recipe-input");
    let input = recipeInput.value.toString().toLowerCase();
    if (input.length < 1) {
        return []
    }

    // Find suggestions by prefix, case-insensitive 
    let allObjectNames = Object.keys(objects);
    for (let i = 0; i < allObjectNames.length; i++) {
        if (allObjectNames[i].toLowerCase().startsWith(input)) {
            suggestions.push(allObjectNames[i]);
        }
    }
    suggestions.sort((a, b) => a.length - b.length);
    return suggestions.slice(0, 10);
}

function onGetRecipe() {
    let recipeInput = document.getElementById("get-recipe-input");
    let input = recipeInput.value;
    let recipe = recipes[input];
    let recipeDiv = document.getElementById("recipe-steps-div");
    recipeDiv.innerHTML = "";
    if (recipe === undefined) {
        recipeDiv.innerText = "No recipe found";
    } else {
        for (let i = 0; i < recipe.length; i++) {
            let step = recipe[i];
            let firstText = step[0];
            let firstEmoji = objects[firstText].emoji;
            let secondText = step[1];
            let secondEmoji = objects[secondText].emoji;
            let resultText = step[2];
            let resultEmoji = objects[resultText].emoji;

            let firstDiv = createObjectElement(firstText, firstEmoji);
            let secondDiv = createObjectElement(secondText, secondEmoji);
            let resultDiv = createObjectElement(resultText, resultEmoji);

            let div = document.createElement("div");
            div.classList.add("recipe-step-div");
            div.appendChild(firstDiv);
            div.innerHTML += " + ";
            div.appendChild(secondDiv);
            div.innerHTML += " = ";
            div.appendChild(resultDiv);

            recipeDiv.appendChild(div);
        }
    }
}

function createObjectElement(text, emoji) {
    let div = document.createElement("div");
    div.classList.add("object-div");
    let span = document.createElement("span");
    span.classList.add("object-span");
    span.innerText = emoji;
    div.appendChild(span);
    div.innerText += " " + text;
    return div;
}
