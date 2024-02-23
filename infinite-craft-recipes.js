function onGetRecipeInputKeyDown(event) {
    if (event.code === "Enter") {
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
    let recipeInput = document.getElementById("get-recipe-input");
    let input = recipeInput.value.toString().toLowerCase();
    if (input.length < 1) {
        return [];
    }
    let maxSuggestions = 10;
    let suggestions = [];

    // Find suggestions by prefix, case-insensitive
    let prefixSuggestions = [];
    let allObjectNames = Object.keys(objects);
    for (let i = 0; i < allObjectNames.length; i++) {
        if (allObjectNames[i].toLowerCase().startsWith(input)) {
            prefixSuggestions.push(allObjectNames[i]);
            if (prefixSuggestions.length >= maxSuggestions) {
                break;
            }
        }
    }
    prefixSuggestions.sort((a, b) => a.length - b.length);
    suggestions = suggestions.concat(prefixSuggestions);

    // Find more suggestions by substring, case-insensitive
    let remainingSuggestions = maxSuggestions - suggestions.length;
    if (remainingSuggestions > 0) {
        let substringSuggestions = [];
        for (let i = 0; i < allObjectNames.length; i++) {
            if (allObjectNames[i].toLowerCase().includes(input)
                && !prefixSuggestions.includes(allObjectNames[i])
            ) {
                substringSuggestions.push(allObjectNames[i]);
                if (substringSuggestions.length >= remainingSuggestions) {
                    break;
                }
            }
        }
        substringSuggestions.sort((a, b) => a.length - b.length);
        suggestions = suggestions.concat(substringSuggestions);
    }

    return suggestions;
}

function onGetRecipe() {
    // hide suggestions
    let div = document.getElementById("get-recipe-suggestions");
    div.innerHTML = "";
    div.className = "";

    // do auto-capitalization if the first suggestion is case-insensitively identical
    let suggestions = getSuggestions();
    let recipeInput = document.getElementById("get-recipe-input");
    let input = recipeInput.value.toString();
    if (input.toLowerCase() === suggestions[0].toLowerCase()) {
        input = suggestions[0];
        recipeInput.value = input;
    }

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
    div.innerHTML += " " + text + " ";
    return div;
}
