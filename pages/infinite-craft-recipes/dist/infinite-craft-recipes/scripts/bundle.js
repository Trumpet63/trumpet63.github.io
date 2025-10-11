(() => {
  // pages/infinite-craft-recipes/src/index.js
  var suggestions = [];
  var keyboardSelectedSuggestion = void 0;
  var originalInputText = void 0;
  function onGetRecipeInputKeyDown(event) {
    switch (event.code) {
      case "Enter": {
        if (keyboardSelectedSuggestion !== void 0) {
          let recipeInput = document.getElementById("get-recipe-input");
          recipeInput.value = suggestions[keyboardSelectedSuggestion];
          displayChangedKeyboardSelection(keyboardSelectedSuggestion, void 0);
        }
        getRecipe();
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        if (suggestions.length > 0) {
          let recipeInput = document.getElementById("get-recipe-input");
          if (keyboardSelectedSuggestion === void 0) {
            originalInputText = recipeInput.value;
            keyboardSelectedSuggestion = suggestions.length - 1;
            recipeInput.value = suggestions[keyboardSelectedSuggestion];
            displayChangedKeyboardSelection(void 0, keyboardSelectedSuggestion);
          } else {
            let previousSelection = keyboardSelectedSuggestion;
            keyboardSelectedSuggestion--;
            if (keyboardSelectedSuggestion < 0) {
              keyboardSelectedSuggestion = void 0;
            }
            displayChangedKeyboardSelection(previousSelection, keyboardSelectedSuggestion);
            if (keyboardSelectedSuggestion === void 0) {
              recipeInput.value = originalInputText;
            } else {
              recipeInput.value = suggestions[keyboardSelectedSuggestion];
            }
          }
        }
        break;
      }
      case "ArrowDown": {
        event.preventDefault();
        if (suggestions.length > 0) {
          let recipeInput = document.getElementById("get-recipe-input");
          if (keyboardSelectedSuggestion === void 0) {
            originalInputText = recipeInput.value;
            keyboardSelectedSuggestion = 0;
            recipeInput.value = suggestions[keyboardSelectedSuggestion];
            displayChangedKeyboardSelection(void 0, keyboardSelectedSuggestion);
          } else {
            let previousSelection = keyboardSelectedSuggestion;
            keyboardSelectedSuggestion++;
            if (keyboardSelectedSuggestion >= suggestions.length) {
              keyboardSelectedSuggestion = void 0;
            }
            displayChangedKeyboardSelection(previousSelection, keyboardSelectedSuggestion);
            if (keyboardSelectedSuggestion === void 0) {
              recipeInput.value = originalInputText;
            } else {
              recipeInput.value = suggestions[keyboardSelectedSuggestion];
            }
          }
        }
        break;
      }
      case "ArrowLeft": {
        if (suggestions.length > 0 && keyboardSelectedSuggestion !== void 0) {
          event.preventDefault();
          displayChangedKeyboardSelection(keyboardSelectedSuggestion, void 0);
          keyboardSelectedSuggestion = void 0;
          let recipeInput = document.getElementById("get-recipe-input");
          recipeInput.value = originalInputText;
          originalInputText = void 0;
        }
        break;
      }
      case "ArrowRight": {
        if (suggestions.length > 0 && keyboardSelectedSuggestion !== void 0) {
          event.preventDefault();
          displayChangedKeyboardSelection(keyboardSelectedSuggestion, void 0);
          keyboardSelectedSuggestion = void 0;
          let recipeInput = document.getElementById("get-recipe-input");
          recipeInput.value = originalInputText;
          originalInputText = void 0;
        }
        break;
      }
    }
  }
  window.onGetRecipeInputKeyDown = onGetRecipeInputKeyDown;
  function onGetRecipeInputInput() {
    keyboardSelectedSuggestion = void 0;
    suggestions = getSuggestions();
    let div = document.getElementById("get-recipe-suggestions");
    div.innerHTML = "";
    div.className = "";
    if (suggestions.length > 0) {
      div.classList.add("suggestions-visible");
      let list = document.createElement("ul");
      for (let i = 0; i < suggestions.length; i++) {
        let item = document.createElement("li");
        item.onclick = () => onItemClick(i);
        item.innerText = suggestions[i];
        list.appendChild(item);
      }
      div.appendChild(list);
    }
  }
  window.onGetRecipeInputInput = onGetRecipeInputInput;
  function onClickGetRecipeButton() {
    if (keyboardSelectedSuggestion !== void 0) {
      let recipeInput = document.getElementById("get-recipe-input");
      recipeInput.value = suggestions[keyboardSelectedSuggestion];
      displayChangedKeyboardSelection(keyboardSelectedSuggestion, void 0);
    }
    getRecipe();
  }
  window.onClickGetRecipeButton = onClickGetRecipeButton;
  function onItemClick(suggestionIndex) {
    let recipeInput = document.getElementById("get-recipe-input");
    recipeInput.value = suggestions[suggestionIndex];
    getRecipe();
  }
  function displayChangedKeyboardSelection(previous, current) {
    let suggestionElements = document.getElementById("get-recipe-suggestions").getElementsByTagName("li");
    if (previous !== void 0) {
      suggestionElements[previous].className = "";
    }
    if (current !== void 0) {
      suggestionElements[current].className = "suggestions-keyboard-selected";
    }
  }
  function getSuggestions() {
    let recipeInput = document.getElementById("get-recipe-input");
    let input = recipeInput.value.toString().toLowerCase();
    if (input.length < 1) {
      return [];
    }
    let maxSuggestions = 10;
    let suggestions2 = [];
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
    suggestions2 = suggestions2.concat(prefixSuggestions);
    let remainingSuggestions = maxSuggestions - suggestions2.length;
    if (remainingSuggestions > 0) {
      let substringSuggestions = [];
      for (let i = 0; i < allObjectNames.length; i++) {
        if (allObjectNames[i].toLowerCase().includes(input) && !prefixSuggestions.includes(allObjectNames[i])) {
          substringSuggestions.push(allObjectNames[i]);
          if (substringSuggestions.length >= remainingSuggestions) {
            break;
          }
        }
      }
      substringSuggestions.sort((a, b) => a.length - b.length);
      suggestions2 = suggestions2.concat(substringSuggestions);
    }
    return suggestions2;
  }
  function getRecipe() {
    let div = document.getElementById("get-recipe-suggestions");
    div.innerHTML = "";
    div.className = "";
    suggestions = getSuggestions();
    let recipeInput = document.getElementById("get-recipe-input");
    let input = recipeInput.value.toString();
    if (input.toLowerCase() === suggestions[0].toLowerCase()) {
      input = suggestions[0];
      recipeInput.value = input;
    }
    let recipe = recipes[input];
    let recipeDiv = document.getElementById("recipe-steps-div");
    recipeDiv.innerHTML = "";
    if (recipe === void 0) {
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
        let div2 = document.createElement("div");
        div2.classList.add("recipe-step-div");
        div2.appendChild(firstDiv);
        div2.innerHTML += " + ";
        div2.appendChild(secondDiv);
        div2.innerHTML += " = ";
        div2.appendChild(resultDiv);
        recipeDiv.appendChild(div2);
      }
    }
    keyboardSelectedSuggestion = void 0;
    originalInputText = void 0;
    suggestions = [];
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
})();
