
function onGetRecipe() {
    console.log("Got here");
    let recipeInput = document.getElementById("get-recipe-input");
    let input = recipeInput.value;
    let recipe = recipes[input];
    if (recipe === undefined) {
        // TODO: Error message
        console.error("Couldn't find a recipe for " + input);
    } else {
        let recipeDiv = document.getElementById("recipe-steps-div");
        recipeDiv.innerHTML = "";
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
