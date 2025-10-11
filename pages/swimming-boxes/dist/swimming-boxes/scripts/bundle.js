let numBoxes = 500;
let boxes = [];

let box;
for (let i = 0; i < numBoxes; i++) {
    box = document.createElement("div");
    box.classList.add("box");
    boxes.push(
        {
            element: box,
            tOffset: -i * 0.777,
            x: 0,
            y: 0,
            scale: 0.2 + 0.002*i,
        }
    );
    document.body.appendChild(box);
}

let a, b, x, y, t, width, height, boxWidth, boxHeight, i;
let tFactor = 1 / 2000;
let abRatio = 5/4;
let delta = Math.PI / 2;
window.requestAnimationFrame(draw);
function draw(currentTimeMillis) {
    width = window.innerWidth;
    height = window.innerHeight;
    boxWidth = 0.05 * width;
    boxHeight = 0.05 * height;

    for (i = 0; i < numBoxes; i++) {
        box = boxes[i];
        t = currentTimeMillis * tFactor + box.tOffset;
        a = t;
        b = t * abRatio;
        x = (Math.cos(a + delta) + 1) / 2 * (width - boxWidth);
        y = (Math.sin(b) + 1) / 2 * (height - boxHeight);
        box.x = x;
        box.y = y;

        box.element.style.transform = "translate(" + box.x + "px," + box.y + "px) scale(" + box.scale + ")";
    }

    window.requestAnimationFrame(draw);
}
