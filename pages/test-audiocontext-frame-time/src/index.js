let promptDiv = document.getElementById("promptDiv");
promptDiv.addEventListener("click", onClick);
let canvas;
let ctx;
let audioContext;
async function onClick() {
    promptDiv.remove();

    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // FireFox starts the context suspended
    let waitStartTime;
    if (audioContext.state === "suspended") {
        console.log("resuming");
        waitStartTime = performance.now();
        await audioContext.resume();
        console.log("Waited " + (performance.now() - waitStartTime) + " ms");
    }
    console.log(audioContext.state);
    
    waitStartTime = performance.now();
    let audioStartTime = audioContext.currentTime;
    // wait until the audio context wakes up, and don't block the main thread
    await new Promise(resolve => {
        function checkTime() {
            if (audioContext.currentTime > audioStartTime) {
                resolve();
            } else {
                requestAnimationFrame(checkTime);
            }
        }
        checkTime();
    });
    console.log("Waited " + (performance.now() - waitStartTime) + " ms");

    canvas = document.createElement("canvas");
    canvas.id = "mainCanvas";
    onResize();
    document.body.appendChild(canvas);

    ctx = canvas.getContext("2d");

    window.addEventListener("resize", onResize);
    window.requestAnimationFrame(draw);
}

function onResize() {
    let w = document.documentElement.clientWidth;
    let h = document.documentElement.clientHeight;
    canvas.width = w;
    canvas.height = h;
}

let previousAudioTimeMillis = null;
let buffer = [];
let bufferMaxSize = 700;

function draw() {
    let currentAudioTimeMillis = audioContext.currentTime * 1000;

    if (previousAudioTimeMillis === null) {
        previousAudioTimeMillis = currentAudioTimeMillis;

        window.requestAnimationFrame(draw);
        return;
    }
    
    ctx.fillStyle = "rgb(50, 50, 50)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let audioDeltaMillis = currentAudioTimeMillis - previousAudioTimeMillis;
    buffer.push(audioDeltaMillis);

    if (buffer.length > bufferMaxSize) {
        buffer.shift();
    }

    // get y bounds
    let minDelta = buffer[0];
    let maxDelta = buffer[0];
    for (let i = 1; i < buffer.length; i++) {
        if (buffer[i] > maxDelta) {
            maxDelta = buffer[i];
        }
        if (buffer[i] < minDelta) {
            minDelta = buffer[i];
        }
    }
    let originalMinDelta = minDelta;
    let originalMaxDelta = maxDelta;
    if (minDelta < 0) {
        minDelta *= 1.1;
    } else {
        minDelta *= 0.9;
    }
    if (maxDelta > 0) {
        maxDelta *= 1.1;
    } else {
        maxDelta *= 0.9;
    }

    // draw points
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(20, 255, 20)";
    ctx.beginPath();
    for (let i = 0; i < buffer.length; i++) {
        let x = mapLinear(0, i, bufferMaxSize - 1, 0, canvas.width);
        let y = mapLinear(minDelta, buffer[i], maxDelta, canvas.height, 0);

        if (i == 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    let fontSize = Math.max(10, canvas.height / 40);
    ctx.font = fontSize + "px Arial";
    let y = mapLinear(minDelta, originalMinDelta, maxDelta, canvas.height, 0);
    ctx.fillText(roundToNPlaces(originalMinDelta, 3) + " ms", canvas.width - 10, y);
    y = mapLinear(minDelta, originalMaxDelta, maxDelta, canvas.height, 0);
    ctx.fillText(roundToNPlaces(originalMaxDelta, 3) + " ms", canvas.width - 10, y);

    previousAudioTimeMillis = currentAudioTimeMillis;
    
    window.requestAnimationFrame(draw);
}

function mapLinear(fromStart, fromValue, fromEnd, toStart, toEnd) {
    fromValue = clampValueToRange(fromValue, Math.min(fromStart, fromEnd), Math.max(fromStart, fromEnd));
    let toValue = Math.abs(fromValue - fromStart) * Math.abs(toEnd - toStart) / Math.abs(fromEnd - fromStart);
    if (toEnd > toStart) {
        toValue = toValue + toStart;
    } else {
        toValue = -toValue + toStart;
    }
    return toValue;
}

function clampValueToRange(value, lowerBound, upperBound) {
    if (value < lowerBound) {
        return lowerBound;
    }
    if (value > upperBound) {
        return upperBound;
    }
    return value;
}

function roundToNPlaces(x, numPlaces) {
    let scale = Math.pow(10, numPlaces);
    return Math.round(x * scale) / scale;
}
