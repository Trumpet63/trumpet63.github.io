let customCardTemplate = <HTMLTemplateElement> document.getElementById("custom-card");
class CustomCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let clone = <DocumentFragment> customCardTemplate.content.cloneNode(true);
        let container = clone.firstElementChild!;
        
        let cardImg = <HTMLImageElement> container.querySelector(".cardImg");
        let imgSrc = this.getAttribute('img') || '';
        cardImg.src = imgSrc;

        let cardTitleContent = <HTMLAnchorElement> container.querySelector(".cardTitleContent")!;
        let project = this.getAttribute('project') || '';
        cardTitleContent.textContent = project;

        let href = this.getAttribute('href') || '';
        cardTitleContent.href = href;
        let imageAnchor = <HTMLAnchorElement> cardImg.parentNode;
        imageAnchor.href = href;

        let cardDescription = container.querySelector(".cardDescription")!;
        let description = this.getAttribute('description') || '';
        cardDescription.textContent = description;

        this.appendChild(clone);
    }
}
customElements.define("custom-card", CustomCard);
