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
      let project = this.getAttribute("project");
      let href = this.getAttribute("href");
      let description = this.getAttribute("description");
      let imgSrc = this.getAttribute("img");
      let videoSrc = this.getAttribute("vid");
      let cardImg = container.querySelector(".cardImg");
      cardImg.src = imgSrc;
      let cardVideo = container.querySelector(".cardVideo");
      if (videoSrc !== null) {
        let onMouseEnter2 = function() {
          mediaContainer.classList.add("img-hidden");
          mediaContainer.classList.remove("vid-hidden");
          cardVideo.play();
        }, onMouseLeave2 = function() {
          mediaContainer.classList.remove("img-hidden");
          mediaContainer.classList.add("vid-hidden");
          cardVideo.pause();
          cardVideo.currentTime = 0;
        };
        var onMouseEnter = onMouseEnter2, onMouseLeave = onMouseLeave2;
        cardVideo.width = 160;
        cardVideo.height = 160;
        cardVideo.src = videoSrc;
        let mediaContainer = container.querySelector(".mediaContainer");
        mediaContainer.classList.add("vid-hidden");
        mediaContainer.addEventListener("mouseenter", onMouseEnter2);
        mediaContainer.addEventListener("mouseleave", onMouseLeave2);
      } else {
        cardVideo.style.display = "none";
      }
      let cardAnchor = container.querySelector(".cardAnchor");
      cardAnchor.href = href;
      let cardTitleContent = container.querySelector(".cardTitleContent");
      cardTitleContent.textContent = project;
      cardTitleContent.href = href;
      let cardDescription = container.querySelector(".cardDescription");
      cardDescription.textContent = description;
      this.appendChild(clone);
    }
  };
  customElements.define("custom-card", CustomCard);
})();
