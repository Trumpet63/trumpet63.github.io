let numObjects = Object.keys(objects).length;

let scalingFactor = 4.75966;
let maxScalingFactor = 10;
let canvas = document.getElementById("the-canvas");
let ctx = canvas.getContext("2d");
let canvasWidth;
let canvasHeight;
let worldWidth;
let worldHeight;

let thingXMins = [];
let thingYMins = [];
let thingWidth = 100;
let thingHeight = 20;
for (let i = 0; i <= numObjects; i++) {
    thingXMins.push(i * thingWidth);
    thingYMins.push(i * thingHeight);
}

let worldTopLeftX = -thingWidth;
let worldTopLeftY = -thingHeight;
let viewChanged = true;

onResize();

window.addEventListener("resize", onResize);

let mouseDown = false;
let previousMouseX = undefined;
let previousMouseY = undefined;
let rawScrollValue = 1315.8;
document.addEventListener("wheel", onWheel);
document.addEventListener("mousedown", onMouseDown);
document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mouseup", onMouseUp);

window.requestAnimationFrame(draw);

function onWheel(e) {
    let newRawScrollValue = rawScrollValue + e.deltaY;
    if (newRawScrollValue < 0) {
        newRawScrollValue = 0;
    } else if (newRawScrollValue > 9500) {
        newRawScrollValue = 9500;
    }

    if (newRawScrollValue === rawScrollValue) {
        return;
    }

    rawScrollValue = newRawScrollValue;

    // Use a formula so scrolling one tick in and then one tick out will
    // return you to the same scaling factor
    scalingFactor = maxScalingFactor * Math.pow(0.95, rawScrollValue * 0.011);

    viewChanged = true;
}

function onMouseDown(e) {
    console.log("mousedown");
    previousMouseX = e.clientX;
    previousMouseY = e.clientY;
    mouseDown = true;
}

function onMouseMove(e) {
    if (mouseDown) {
        let deltaX = previousMouseX - e.clientX;
        let deltaY = previousMouseY - e.clientY;
        worldTopLeftX += deltaX / scalingFactor;
        worldTopLeftY += deltaY / scalingFactor;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
        viewChanged = true;
    }
}

function onMouseUp(e) {
    console.log("mouseup");
    mouseDown = false;
}

function onResize() {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    worldWidth = canvasWidth / scalingFactor;
    worldHeight = canvasHeight / scalingFactor;

    // Since changing the canvas dimensions resets the style settings, this
    // IS actually necessary (though these are probably the default anyways)
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";

    viewChanged = true;
}

function draw() {
    if (viewChanged) {
        updateView();
        viewChanged = false;
    }
    window.requestAnimationFrame(draw);
}

function updateView() {
    worldWidth = canvasWidth / scalingFactor;
    worldHeight = canvasHeight / scalingFactor;
    ctx.lineWidth = 0.5 * scalingFactor;

    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    fontSize = 12 * scalingFactor;
    ctx.font = "500 normal " + fontSize + "px Roboto, sans-serif";

    let worldRightX = worldTopLeftX + worldWidth;
    let worldBottomY = worldTopLeftY + worldHeight;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);


    let thingXStartIndex = undefined;
    let thingXEndIndex = undefined;
    for (let i = 0; i < thingXMins.length; i++) {
        if (thingXStartIndex === undefined && thingXMins[i] > worldTopLeftX) {
            thingXStartIndex = Math.max(0, i - 1);
            i = thingXStartIndex;
        } else if (thingXEndIndex === undefined && thingXMins[i] > worldRightX) {
            thingXEndIndex = i - 1;
        }
    }

    if (thingXStartIndex !== undefined && thingXEndIndex === undefined) {
        thingXEndIndex = thingXMins.length - 1;
    }

    let thingYStartIndex = undefined;
    let thingYEndIndex = undefined;
    for (let i = 0; i < thingYMins.length; i++) {
        if (thingYStartIndex === undefined && thingYMins[i] > worldTopLeftY) {
            thingYStartIndex = Math.max(0, i - 1);
            i = thingYStartIndex;
        } else if (thingYEndIndex === undefined && thingYMins[i] > worldBottomY) {
            thingYEndIndex = i - 1;
        }
    }

    if (thingYStartIndex !== undefined && thingYEndIndex === undefined) {
        thingYEndIndex = thingYMins.length - 1;
    }

    if (thingXStartIndex !== undefined && thingYStartIndex !== undefined) {

        // Draw lines between cells
        for (let i = thingXStartIndex; i <= thingXEndIndex; i++) {
            let x = (thingXMins[i] - worldTopLeftX) * scalingFactor;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvasHeight - 1);
            ctx.stroke();
        }
        for (let i = thingYStartIndex; i <= thingYEndIndex; i++) {
            let y = (thingYMins[i] - worldTopLeftY) * scalingFactor;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvasWidth - 1, y);
            ctx.stroke();
        }

        // Don't try to fill in a cell after the last cell dividing line
        if (thingXEndIndex === numObjects) {
            thingXEndIndex = numObjects - 1;
        }
        if (thingYEndIndex === numObjects) {
            thingYEndIndex = numObjects - 1;
        }

        // Fill in the main cells
        for (let i = thingXStartIndex; i <= thingXEndIndex; i++) {
            let x = (thingXMins[i] - worldTopLeftX + thingWidth / 2) * scalingFactor;
            for (let j = thingYStartIndex; j <= thingYEndIndex; j++) {
                let y = (thingYMins[j] - worldTopLeftY + thingHeight / 2) * scalingFactor;

                let ii = Math.min(i, j) + 1;
                let jj = Math.max(i, j) + 1;
                text = getGridContents(ii, jj);
                if (text !== undefined) {
                    ctx.fillText(text, x, y);
                }
            }
        }

        // Fill the background of the frozen row and column
        ctx.fillStyle = "rgb(235, 235, 235)"
        let thingCanvasWidth = thingWidth * scalingFactor - 2 * ctx.lineWidth;
        let thingCanvasHeight = thingHeight * scalingFactor - 2 * ctx.lineWidth;
        for (let i = thingXStartIndex; i <= thingXEndIndex; i++) {
            let x = (thingXMins[i] - worldTopLeftX) * scalingFactor + ctx.lineWidth;
            ctx.fillRect(x, 0, thingCanvasWidth, thingCanvasHeight);
        }
        for (let i = thingYStartIndex; i <= thingYEndIndex; i++) {
            let y = (thingYMins[i] - worldTopLeftY) * scalingFactor + ctx.lineWidth;
            ctx.fillRect(0, y, thingCanvasWidth, thingCanvasHeight);
        }

        ctx.fillStyle = "black";
        
        // Draw the frozen top row
        ctx.textBaseline = "middle";
        let y = (thingHeight / 2) * scalingFactor;
        console.log("thingXIndices", thingXStartIndex, thingXEndIndex);
        for (let i = thingXStartIndex; i <= thingXEndIndex; i++) {
            text = getGridContents(0, i + 1);
            console.log("getGridContents", i + 1, 0);
            if (text !== undefined) {
                let x = (thingXMins[i] - worldTopLeftX + thingWidth / 2) * scalingFactor;
                ctx.fillText(text, x, y);
            }
        }
        
        // Draw the frozen left column
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        let x = (thingWidth - thingHeight / 2) * scalingFactor;
        for (let i = thingYStartIndex; i <= thingYEndIndex; i++) {
            text = getGridContents(i + 1, 0);
            if (text !== undefined) {
                let y = (thingYMins[i] - worldTopLeftY + thingHeight / 2) * scalingFactor;
                ctx.fillText(text, x, y);
            }
        }
    }
}

// Requires that i < j
function getGridContents(i, j) {
    let key = ((numObjects + 1) * i + j).toString();
    let text = grid[key];
    if (text === undefined) {
        return undefined;
    }
    let object = objects[text];
    if (object === undefined) {
        return undefined;
    }
    return object.emoji + " " + text;
}
