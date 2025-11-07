let customCardTemplate = <HTMLTemplateElement> document.getElementById("custom-card");
class CustomCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        let clone = <DocumentFragment> customCardTemplate.content.cloneNode(true);
        let container = clone.firstElementChild!;

        let project = <string> this.getAttribute("project");
        let href = <string> this.getAttribute("href");
        let description = <string> this.getAttribute("description");
        let imgSrc = <string> this.getAttribute("img");
        let videoSrc = this.getAttribute("vid");
        
        let cardImg = <HTMLImageElement> container.querySelector(".cardImg");
        cardImg.src = imgSrc;
        
        let cardVideo = <HTMLVideoElement> container.querySelector(".cardVideo");
        if (videoSrc !== null) {
            cardVideo.width = 160;
            cardVideo.height = 160;
            cardVideo.src = videoSrc;
            
            let mediaContainer = <HTMLDivElement> container.querySelector(".mediaContainer");
            mediaContainer.classList.add("vid-hidden");
            function onMouseEnter() {
                cardVideo.play().then(() => {
                    // Only show the video once it has successfully started playing
                    mediaContainer.classList.add("img-hidden");
                    mediaContainer.classList.remove("vid-hidden");
                }).catch(() => {
                    // Do nothing!
                    // Expected errors:
                    // NotAllowedError - the user hasn't interacted with the document yet
                });
            }
            function onMouseLeave() {
                mediaContainer.classList.remove("img-hidden");
                mediaContainer.classList.add("vid-hidden");
                cardVideo.pause();
                cardVideo.currentTime = 0;
            }
            mediaContainer.addEventListener("mouseenter", onMouseEnter);
            mediaContainer.addEventListener("mouseleave", onMouseLeave);
        } else {
            cardVideo.style.display = "none";
        }

        let cardAnchor = <HTMLAnchorElement> container.querySelector(".cardAnchor");
        cardAnchor.href = href;

        let cardTitleContent = <HTMLAnchorElement> container.querySelector(".cardTitleContent")!;
        cardTitleContent.textContent = project;
        cardTitleContent.href = href;

        let cardDescription = container.querySelector(".cardDescription")!;
        cardDescription.textContent = description;

        this.appendChild(clone);
    }
}
customElements.define("custom-card", CustomCard);
