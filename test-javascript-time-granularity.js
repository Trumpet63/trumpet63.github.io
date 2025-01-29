let canvas = document.getElementById("mainCanvas");
let ctx = canvas.getContext("2d");
onResize();

window.addEventListener("resize", onResize);
function onResize() {
    let w = document.documentElement.clientWidth;
    let h = document.documentElement.clientHeight;
    canvas.width = w;
    canvas.height = h;
}

let samples = [];
let samplesMaxSize = 2000;
let startTime = performance.now();
let previousSample = startTime;
let currentSample = startTime;
while (samples.length < samplesMaxSize && currentSample - startTime < 2000) {
    currentSample = performance.now();
    if (currentSample != previousSample) {
        samples.push(currentSample);
        previousSample = currentSample;
    }
}

let buffer = [];
previousSample = startTime;
for (let i = 0; i < samples.length; i++) {
    buffer.push(samples[i] - previousSample);
    previousSample = samples[i];
}

window.requestAnimationFrame(draw);
function draw() {
    ctx.fillStyle = "rgb(50, 50, 50)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
    minDelta *= 0.9;
    maxDelta *= 1.1;

    // draw points
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    for (let i = 0; i < buffer.length; i++) {
        let x = mapLinear(0, i, buffer.length - 1, 0, canvas.width);
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
    ctx.fillText(roundToNPlaces(originalMinDelta, 5) + " ms", canvas.width - 10, y);
    y = mapLinear(minDelta, originalMaxDelta, maxDelta, canvas.height, 0);
    ctx.fillText(roundToNPlaces(originalMaxDelta, 5) + " ms", canvas.width - 10, y);

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
