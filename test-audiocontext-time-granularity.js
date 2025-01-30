let promptDiv = document.getElementById("promptDiv");
promptDiv.addEventListener("click", onClick);
let canvas;
let ctx;
function onClick() {
    promptDiv.innerText = "Please Wait...";

    canvas = document.createElement("canvas");
    canvas.id = "mainCanvas";
    onResize();
    document.body.appendChild(canvas);

    ctx = canvas.getContext("2d");

    window.addEventListener("resize", onResize);

    performTest();
}

function onResize() {
    let w = document.documentElement.clientWidth;
    let h = document.documentElement.clientHeight;
    canvas.width = w;
    canvas.height = h;
}

let audioContext;
let buffer;
let samples = [];
let samplesMaxSize = 2000;
let startTime;
let previousSample;
let noChangeCount = 0;
let channel = new MessageChannel();

// FireFox has this issue where if you check if the audiocontext time changed
// in a tight loop, it won't ever update it - presumably because we're blocking
// the thread it uses to update it. So a message channel seems like the fastest
// running async thing - faster than setTimeout(0);
// In Chrome I'd prefer to just use a tight loop, but I don't wanna have both
// methods here.
channel.port1.onmessage = () => {
    let currentSample = audioContext.currentTime;
    if (currentSample !== previousSample) {
        samples.push(currentSample);
        previousSample = currentSample;
    } else {
        noChangeCount++;
    }

    if (samples.length < samplesMaxSize && performance.now() - startTime < 2000) {
        channel.port2.postMessage(null); // Schedule the next iteration
    } else {
        console.log("noChangeCount =", noChangeCount);
        calculateDeltas();
    }
};

async function performTest() {
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

    startTime = performance.now()
    previousSample = audioContext.currentTime
    channel.port2.postMessage(null); // Start sampling
}

function calculateDeltas() {
    buffer = []
    previousSample = samples[0];
    for (let i = 1; i < samples.length; i++) {
        buffer.push(1000 * (samples[i] - previousSample));
        previousSample = samples[i];
    }
    console.log("buffer length", buffer.length);

    promptDiv.remove();
    window.requestAnimationFrame(draw);
}

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
