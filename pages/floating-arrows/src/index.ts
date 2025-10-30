import { Color, distance, HSLToRGB, mapLinear } from "./util";
import FFT from "./fft.js";
import { FadeEffect } from "./fade_effect";
import { SongState } from "./song_state";
import UI from "./ui_context";
import Song from "./song";
import { Arrow } from "./arrow";

let frameTimes: number[] = []
let maxFrameTimes: number = 20;
let desiredArrowsOnScreen: number;

let logCounter = 0;
let sampleNeighboorhood = 256;
let fft = new FFT(2 * sampleNeighboorhood);

Song.initialize();

window.ui = UI;
UI.initialize();

let ctx: CanvasRenderingContext2D = UI.canvas.getContext("2d");
let copyCtx: CanvasRenderingContext2D = UI.copyCanvas.getContext("2d");

let arrows: Arrow[] = [];
export let MIN_ARROW_SIZE: number = 15;
export let MAX_ARROW_SIZE: number = 80;
let baseDirection: number = 5 / 4 * Math.PI;
let lastAnimationUpdateMillis: number;

export function addRandomArrows() {
    for (let i = 0; i < 100; i++) {
        addRandomArrow(offscreenRandomPosition);
    }
}

function spawnInitialArrows() {
    // arrows.push(
    //     new Arrow(
    //         400,
    //         400,
    //         70,
    //         Math.PI * 2 * Math.random(),
    //         mapLinear(minSize, 50, maxSize, 0.2, 1),
    //         0,
    //         0,
    //         0,
    //         getCurrentTimeSeconds(),
    //     )
    // );
    // arrows.push(mouseArrow);

    for (let i = 0; i < desiredArrowsOnScreen * 0.75; i++) {
        addRandomArrow(initialRandomPosition);
    }
}

function spawnArrowOffscreen() {
    addRandomArrow(offscreenRandomPosition);
}

function addRandomArrow(positionRandomizer: () => {x: number, y: number}) {
    let size: number = mapLinear(0, Math.random(), 1, MIN_ARROW_SIZE, MAX_ARROW_SIZE);
    let direction: number = mapLinear(0, Math.random(), 1, baseDirection - 0.2, baseDirection + 0.2);
    let magnitude: number = mapLinear(0, Math.random(), 1, 1 + size / 2.1, 2 + size / 2.1);
    let spawnPosition = positionRandomizer();
    arrows.push(
        new Arrow(
            spawnPosition.x,
            spawnPosition.y,
            size,
            Math.PI * 2 * Math.random(),
            mapLinear(MIN_ARROW_SIZE, size, MAX_ARROW_SIZE, 0.1, 1),
            magnitude * Math.cos(direction),
            magnitude * Math.sin(direction),
            mapLinear(0, Math.random(), 1, -0.25, 0.25),
        )
    );
}

function initialRandomPosition(): {x: number, y: number} {
    let x = mapLinear(0, Math.random(), 1, 0, UI.width + 200);
    let y = mapLinear(0, Math.random(), 1, 0, UI.height + 200);
    return {x: x, y: y};
}

function offscreenRandomPosition(): {x: number, y: number} {
    let x: number;
    let y: number;
    let rightSideLength = UI.height + 100;
    let bottomSideLength = UI.width + 200;
    let rightSideSpawnProbability = rightSideLength / (rightSideLength + bottomSideLength);
    if (Math.random() < rightSideSpawnProbability) {
        // spawn on the right
        x = mapLinear(0, Math.random(), 1, UI.width + 100, UI.width + 200);
        y = mapLinear(0, Math.random(), 1, 0, rightSideLength);
    } else {
        // spawn on the bottom
        x = mapLinear(0, Math.random(), 1, 0, UI.width + 200);
        y = mapLinear(0, Math.random(), 1, UI.height + 100, bottomSideLength);
    }
    return {x: x, y: y};
}

let amplitudeAllowance = 80;
export let BASE_ARROW_SIZE = 100;
let baseArrow: Arrow = new Arrow(
    amplitudeAllowance + BASE_ARROW_SIZE / 2,
    amplitudeAllowance + BASE_ARROW_SIZE / 2,
    BASE_ARROW_SIZE,
    0,
    1,
    0,
    0,
    0,
);

let arrowCanvas: HTMLCanvasElement = document.createElement("canvas");
arrowCanvas.width = BASE_ARROW_SIZE + 2 * amplitudeAllowance;
arrowCanvas.height = BASE_ARROW_SIZE + 2 * amplitudeAllowance;
let arrowCtx: CanvasRenderingContext2D = arrowCanvas.getContext("2d");

let pastArrowStates: {timeMillis: number, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D}[] = [];
let numArrowStates = 144;
pastArrowStates.push({
    timeMillis: undefined,
    canvas: arrowCanvas,
    ctx: arrowCtx,
});
for (let i = 1; i < numArrowStates; i++) {
    let canvas = document.createElement("canvas");
    canvas.width = arrowCanvas.width;
    canvas.height = arrowCanvas.height;
    let ctx = canvas.getContext("2d");
    pastArrowStates.push({
        timeMillis: undefined,
        canvas: canvas,
        ctx: ctx,
    });
}

// export let mouseArrow = new Arrow(
//     0,
//     0,
//     70,
//     Math.PI * 2 * Math.random(),
//     mapLinear(minSize, 50, maxSize, 0.2, 1),
//     0,
//     0,
//     0,
// )

function draw(currentTimeMillis: number) {
    UI.resizeCanvasToMatchViewport();
    desiredArrowsOnScreen = 150 * (UI.width * UI.height) / (800 * 800);

    ctx.clearRect(0, 0, UI.width, UI.height);

    frameTimes.unshift(currentTimeMillis);
    
    while (frameTimes.length > maxFrameTimes) {
        frameTimes.splice(frameTimes.length - 1);
    }

    if (Song.songState === SongState.PAUSED) {
        lastAnimationUpdateMillis = currentTimeMillis;
    }

    if (lastAnimationUpdateMillis === undefined) {
        lastAnimationUpdateMillis = currentTimeMillis;
        spawnInitialArrows();
    }

    switch (UI.fadeEffect) {
        case FadeEffect.ON:
            drawCopyImage(UI.shrinkRatio, UI.fadeOpacity);
            break;
    }

    let samplesPerSecond = Song.audioContext.sampleRate;
    let sampleWindow: Float32Array | number[];
    if (Song.songState === SongState.READY || Song.songState === SongState.NONE) {
        sampleWindow = generateSilence(2 *sampleNeighboorhood);
    } else {
        let audioTimeSeconds = getAudioTimeSeconds();
        let currentSample = Math.round(audioTimeSeconds * samplesPerSecond);
        let maxSample = Song.samples.length - 1;
        let low = Math.max(0, currentSample - sampleNeighboorhood + 1);
        let high = Math.min(currentSample + sampleNeighboorhood, maxSample);
        sampleWindow = Song.samples.slice(low, high + 1);
        if (sampleWindow.length !== 2 * sampleNeighboorhood) {
            sampleWindow = generateSilence(2 *sampleNeighboorhood);
        }
    }

    // let sampleOutput = generateFakeSample(2 *sampleNeighboorhood);
    // let sampleWindow = sampleOutput.samples;
    // let sampleFrequency = sampleOutput.frequency;
    // let samplePhase = sampleOutput.phase;
    
    let lineColor = getColor(sampleWindow, samplesPerSecond);
    let maxAmplitude = getMaxAmplitude(sampleWindow); // maybe one day use a different measure of the "total energy of the wave" or whatever
    let lineWidth = mapLinear(0, maxAmplitude, 1, UI.minLineWidth, UI.maxLineWidth);
    
    while (arrows.length < desiredArrowsOnScreen) {
        spawnArrowOffscreen();
    }

    let collisionCounter = 0;
    for (let i = 0; i < arrows.length; i++) {
        let arrow: Arrow = arrows[i];
        let deltaTimeSeconds = (currentTimeMillis - lastAnimationUpdateMillis) / 1000;
        let repelX: number = 0;
        let repelY: number = 0;
        for (let j = 0; j < arrows.length; j++) {
            if (j === i) {
                continue;
            }
            let arrow2: Arrow = arrows[j];
            let sizeDifference = Math.abs(arrow.size - arrow2.size);
            let maxSizeDifference = 20;
            if (sizeDifference > maxSizeDifference) {
                continue;
            }
            let minDist = arrow.radius + arrow2.radius + 60;
            let dx = arrow.centerX - arrow2.centerX;
            if (Math.abs(dx) > minDist) {
                continue;
            }
            let dy = arrow.centerY - arrow2.centerY;
            if (Math.abs(dy) > minDist) {
                continue;
            }
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < minDist) {
                collisionCounter++;
                let magnitude = Math.min(600 / dist * mapLinear(0, sizeDifference, maxSizeDifference, 1, 0), 200);
                if (dist > 0) {
                    repelX += magnitude * dx / dist;
                }
                if (dist > 0) {
                    repelY += magnitude * dy / dist;
                }
            }
        }

        // Draw a line to indicate the repel force
        // ctx.save();
        // ctx.strokeStyle = "white";
        // ctx.beginPath();
        // ctx.moveTo(arrow.centerX, arrow.centerY);
        // ctx.lineTo(arrow.centerX + repelX, arrow.centerY + repelY);
        // ctx.stroke();
        // ctx.restore();

        arrow.centerX += deltaTimeSeconds * (arrow.velocityX + repelX);
        arrow.centerY += deltaTimeSeconds * (arrow.velocityY + repelY);
        arrow.rotation += deltaTimeSeconds * arrow.angularVelocity;
    }

    for (let i = 0; i < arrows.length; i++) {
        let arrow: Arrow = arrows[i];
        if (!arrow.isInsideRectangle(
            {
                topLeftX: 0,
                topLeftY: 0,
                width: UI.canvas.width,
                height: UI.canvas.height,
            })
        ) {
            arrows.splice(i, 1);
            i--;
        }
    }
    
    // update the past arrow state buffer, and also draw the current state
    // note that index 0 is meant to be the current state, and i+1 further in the past
    for (let i = pastArrowStates.length - 2; i >= 0; i--) {
        if (pastArrowStates[i].timeMillis === undefined) {
            continue;
        }
        pastArrowStates[i+1].ctx.clearRect(0, 0, arrowCanvas.width, arrowCanvas.height);
        pastArrowStates[i+1].ctx.drawImage(pastArrowStates[i].canvas, 0, 0);
        pastArrowStates[i+1].timeMillis = pastArrowStates[i].timeMillis;
    }
    arrowCtx.clearRect(0, 0, arrowCanvas.width, arrowCanvas.height);
    baseArrow.draw(arrowCtx, sampleWindow, lineColor.getStyle(), lineWidth);
    pastArrowStates[0].timeMillis = currentTimeMillis;

    for (let i = 0; i < arrows.length; i++) {
        let arrow: Arrow = arrows[i];
        let arrowTimeMillis = arrow.getArrowTimeMillis(currentTimeMillis);
        let j;
        for (j = 0; j < pastArrowStates.length; j++) {
            if (pastArrowStates[j].timeMillis === undefined) {
                j--;
                break;
            }
            if (pastArrowStates[j].timeMillis < arrowTimeMillis) {
                // Find which of the two nearest past arrow states are the closest to the arrow's time
                // pastArrowStates[j-1].timeMillis >= arrowTimeMillis > pastArrowStates[j].timeMillis
                let distance1 = pastArrowStates[j-1].timeMillis - arrowTimeMillis;
                let distance2 = arrowTimeMillis - pastArrowStates[j].timeMillis;
                if (distance1 < distance2) {
                    j--;
                }
                break;
            }
        }
        if (j >= pastArrowStates.length) {
            j--;
        }
        arrow.drawFromBase(ctx, pastArrowStates[j].canvas);
    }

    copyCanvasContents();

    drawFPS();

    ctx.save();
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textBaseline = "bottom";
    ctx.fillText(arrows.length.toString(), UI.width / 2 - 160, UI.height);
    ctx.fillText(collisionCounter.toString(), UI.width / 2 + 120, UI.height);
    ctx.restore();


    lastAnimationUpdateMillis = currentTimeMillis;
    window.requestAnimationFrame(draw);
}

function getAudioTimeSeconds(): number {
    return Song.audioContext.currentTime - Song.playStartTime;
}

function copyCanvasContents() {
    copyCtx.clearRect(0, 0, UI.copyCanvas.width, UI.copyCanvas.height);
    copyCtx.drawImage(
        UI.canvas,
        0,
        0,
        UI.copyCanvas.width,
        UI.copyCanvas.height,
        0,
        0,
        UI.copyCanvas.width,
        UI.copyCanvas.height);
}

function drawFPS() {
    if (frameTimes.length > 1) {
        ctx.save();
        let elapsedTimeMillis = frameTimes[0] - frameTimes[1];
        let fps: number = 1000 / elapsedTimeMillis;
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textBaseline = "bottom";
        let fpsCounter = "FPS: " + Math.round(fps).toString();
        ctx.fillText(fpsCounter, UI.width - 130, UI.height);
        ctx.restore();
    }
}

function drawSampleCounter(currentSample: number) {
    let audioTimeString: string = currentSample.toString();
    ctx.save();
    ctx.font = "30px Arial";
    ctx.fillStyle = "white"
    ctx.textBaseline = "bottom"
    ctx.textAlign = "center";
    ctx.fillText(audioTimeString, UI.width / 2, UI.height);
    ctx.restore();
}

function drawCopyImage(shrinkRatio: number, alpha: number) {
    ctx.save();
        ctx.globalAlpha = alpha;
        let xShrink = UI.copyCanvas.width * shrinkRatio;
        let yShrink = UI.copyCanvas.height * shrinkRatio;
        ctx.drawImage(
            UI.copyCanvas,
            0,
            0,
            UI.copyCanvas.width,
            UI.copyCanvas.height,
            xShrink / 2,
            yShrink / 2,
            UI.copyCanvas.width - xShrink,
            UI.copyCanvas.height - yShrink,
        );
        ctx.restore();
}

function getMaxAmplitude(audioSamples: Float32Array | number[]) {
    let maxAmplitude = 0;
    for (let i = 0; i < audioSamples.length; i++) {
        let sample = audioSamples[i];
        let amplitude = Math.abs(sample);
        if (amplitude > maxAmplitude) {
            maxAmplitude = amplitude;
        }
    }
    if (maxAmplitude === 0) {
        maxAmplitude = 1;
    }
    return maxAmplitude;
}

function getFrequency(audioSamples: Float32Array | number[], samplesPerSecond: number) {
    let fftOutput: number[] = [];
    fft.realTransform(fftOutput, audioSamples);
    let maxAbsValue = 0;
    let maxBinIndex;
    // We start at i == 1 to ignore frequency 0
    for (let i = 1; i < fftOutput.length; i++) {
        let absValue = Math.abs(fftOutput[i]);
        if (absValue > maxAbsValue) {
            maxAbsValue = absValue;
            maxBinIndex = i;
        }
    }
    return maxBinIndex * samplesPerSecond / fftOutput.length;
}

function getColor(sampleWindow: Float32Array | number[], samplesPerSecond: number): Color {
    let frequency = getFrequency(sampleWindow, samplesPerSecond);
    if (isNaN(frequency)) {
        frequency = 0;
    }
    let octave = frequency === 0 ? 0 : Math.log2(frequency);
    let octaveRatio = mapLinear(7, octave, 13, 0, 1);
    if (octaveRatio < 0) {
        octaveRatio = 0;
    } else if (octaveRatio > 1) {
        octaveRatio = 1;
    }
    let hue = mapLinear(0, octaveRatio, 1, 0, 360);
    hue = (hue * UI.hueMultipler + UI.hueOffset) % 360;
    return HSLToRGB(hue, 1, .5);
}

function generateSilence(numSamples: number) {
    let samples: number[] = [];
    for (let i = 0; i < numSamples; i++) {
        samples.push(0);
    }
    return samples;
}

let callCounter = 0;
function generateFakeSample(numSamples: number) {
    let samples: number[] = [];
    // let frequency = 4100 + 3900 * Math.cos(callCounter / 400);
    // let phase = Math.PI + Math.PI * Math.cos(callCounter / 150);
    let frequency = 1000;
    let phase = 0;
    let samplesPerSecond = Song.audioContext.sampleRate;
    for (let i = 0; i < numSamples; i++) {
        let sample = Math.sin(i / samplesPerSecond * 2 * Math.PI * frequency + phase) / 2;
        samples.push(sample);
    }
    callCounter += 1;
    return {samples: samples, frequency: frequency, phase: phase};
}

function drawFlatWaveform(audioSamples: Float32Array | number[], lineColor: string, lineWidth: number) {
    let distanceOut: number = UI.height * UI.flatAmplitudeMultipler / 2;
    let middle: number = UI.height / 2;
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    for (let i = 0; i < audioSamples.length; i++) {
        let sample = audioSamples[i];
        let x = mapLinear(0, i, audioSamples.length - 1, 0, UI.width);
        let y = mapLinear(-1, sample, 1, middle - distanceOut, middle + distanceOut);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        }
        else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
    ctx.restore();
}

function drawCircularWaveform(audioSamples: Float32Array | number[], lineColor: string, lineWidth: number) {
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    for (let i = 0; i < audioSamples.length; i++) {
        let sample = audioSamples[i];
        let angle = mapLinear(0, i, audioSamples.length - 1, 3 / 2 * Math.PI, 7 / 2 * Math.PI);
        let radius = mapLinear(-1, sample, 1, UI.minCircleRadius, UI.maxCircleRadius);
        let x = UI.circleCenterX + radius * Math.cos(angle);
        let y = UI.circleCenterY - radius * Math.sin(angle);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        }
        else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
    ctx.restore();
}



window.requestAnimationFrame(draw);
