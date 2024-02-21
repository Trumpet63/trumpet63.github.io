function onGetRecipeInputKeyDown(event) {
    if (event.code === "Enter") {
        onGetRecipe();
    }
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
