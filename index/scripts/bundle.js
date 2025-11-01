(() => {
  // pages/index/src/index.ts
  var customCardTemplate = document.getElementById("custom-card");
  var CustomCard = class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      let clone = customCardTemplate.content.cloneNode(true);
      let container = clone.firstElementChild;
      let cardImg = container.querySelector(".cardImg");
      let imgSrc = this.getAttribute("img") || "";
      cardImg.src = imgSrc;
      let cardTitleContent = container.querySelector(".cardTitleContent");
      let project = this.getAttribute("project") || "";
      cardTitleContent.textContent = project;
      let href = this.getAttribute("href") || "";
      cardTitleContent.href = href;
      let imageAnchor = cardImg.parentNode;
      imageAnchor.href = href;
      let cardDescription = container.querySelector(".cardDescription");
      let description = this.getAttribute("description") || "";
      cardDescription.textContent = description;
      this.appendChild(clone);
    }
  };
  customElements.define("custom-card", CustomCard);
})();
