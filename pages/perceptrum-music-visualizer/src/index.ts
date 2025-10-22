import { Color, distance, HSLToRGB, mapLinear } from "./util";
import FFT from './fft.js';
import { DrawingMode } from "./drawing_mode";
import { FadeEffect } from "./fade_effect";
import { SongState } from "./song_state";
import UI from "./ui_context";
import Song from "./song";

let frameTimes: number[] = []
let maxFrameTimes: number = 20;

let logCounter = 0;
let sampleNeighboorhood = 256;
let fft = new FFT(2 * sampleNeighboorhood);

Song.initialize();

window.ui = UI;
UI.initialize();

let ctx: CanvasRenderingContext2D = UI.canvas.getContext("2d");
let copyCanvas: HTMLCanvasElement = document.createElement("canvas");
copyCanvas.width = UI.width;
copyCanvas.height = UI.height;
let copyCtx: CanvasRenderingContext2D = copyCanvas.getContext("2d");

function draw() {
    ctx.clearRect(0, 0, UI.width, UI.height);

    let currentTimeMillis = performance.now()
    frameTimes.unshift(currentTimeMillis);
    
    while (frameTimes.length > maxFrameTimes) {
        frameTimes.splice(frameTimes.length - 1)
    }
    
    // drawFPS();

    if (UI.drawingPath) {
        drawPath();
        drawCircleOnLastStop();
        drawCircleOnMousePosition();
        drawEscapeInstructions();
    } else if (Song.songState === SongState.PLAYING || Song.songState === SongState.PAUSED) {
        switch (UI.fadeEffect) {
            case FadeEffect.ON:
                drawCopyImage(UI.shrinkRatio, UI.fadeOpacity);
                break;
        }

        let audioTimeSeconds = Song.audioContext.currentTime - Song.playStartTime;
        let samplesPerSecond = Song.audioContext.sampleRate;
        let currentSample = Math.round(audioTimeSeconds * samplesPerSecond);
        let maxSample = Song.samples.length - 1;

        // drawSampleCounter(currentSample);
        
        let low = Math.max(0, currentSample - sampleNeighboorhood + 1);
        let high = Math.min(currentSample + sampleNeighboorhood, maxSample);
        // let sampleOutput = generateFakeSample(2 *sampleNeighboorhood);
        // let sampleWindow = sampleOutput.samples;
        // let sampleFrequency = sampleOutput.frequency;
        // let samplePhase = sampleOutput.phase;
        let sampleWindow = Song.samples.slice(low, high + 1);
        
        if (sampleWindow.length === 2 * sampleNeighboorhood) {
            let lineColor = getColor(sampleWindow, samplesPerSecond);
            let maxAmplitude = getMaxAmplitude(sampleWindow); // maybe one day use a different measure of the "total energy of the wave" or whatever
            let lineWidth = mapLinear(0, maxAmplitude, 1, UI.minLineWidth, UI.maxLineWidth);
            switch (UI.drawingMode) {
                case DrawingMode.FLAT:
                    drawFlatWaveform(sampleWindow, lineColor.getStyle(), lineWidth);
                    break;
                case DrawingMode.CIRCLE:
                    drawCircularWaveform(sampleWindow, lineColor.getStyle(), lineWidth);
                    break;
                case DrawingMode.PATH:
                    if (UI.path === undefined || UI.path.length === 0) {
                        break;
                    }
                    drawWaveformOnPath(sampleWindow, lineColor.getStyle(), lineWidth);
                    break;
                default:
                    console.error("Invalid drawing mode '" + UI.drawingMode + "'");
            }
        }

        copyCanvasContents();
    }

    window.requestAnimationFrame(draw);
}

function copyCanvasContents() {
    copyCtx.clearRect(0, 0, copyCanvas.width, copyCanvas.height);
    copyCtx.drawImage(
        UI.canvas,
        0,
        0,
        copyCanvas.width,
        copyCanvas.height,
        0,
        0,
        copyCanvas.width,
        copyCanvas.height);
}

function drawEscapeInstructions() {
    ctx.save();
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("Press Escape To Stop Drawing A Path", 400, 80);
    ctx.restore();
}

function drawCircleOnMousePosition() {
    ctx.save();
    ctx.fillStyle = "rgb(210, 210, 210)";
    ctx.beginPath();
    ctx.arc(UI.mouseX, UI.mouseY, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}

function drawCircleOnLastStop() {
    if (UI.path.length > 0) {
        ctx.save();
        ctx.fillStyle = "white";
        let lastStop: { x: number; y: number; } = UI.path[UI.path.length - 1];
        ctx.beginPath();
        ctx.arc(lastStop.x, lastStop.y, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
}

function drawPath() {
    ctx.save();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    for (let i = 0; i < UI.path.length; i++) {
        let pathStop = UI.path[i];
        let x = pathStop.x;
        let y = pathStop.y;

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

function drawFPS() {
    if (frameTimes.length > 1) {
        ctx.save();
        let elapsedTimeMillis = frameTimes[0] - frameTimes[1];
        let fps: number = 1000 / elapsedTimeMillis;
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.textBaseline = "top";
        let fpsCounter = "FPS: " + Math.round(fps).toString();
        ctx.fillText(fpsCounter, 0, 0);
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
        let xShrink = copyCanvas.width * shrinkRatio;
        let yShrink = copyCanvas.height * shrinkRatio;
        ctx.drawImage(
            copyCanvas,
            0,
            0,
            copyCanvas.width,
            copyCanvas.height,
            xShrink / 2,
            yShrink / 2,
            copyCanvas.width - xShrink,
            copyCanvas.height - yShrink,
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

function drawWaveformOnPath(audioSamples: Float32Array | number[], lineColor: string, lineWidth: number) {
    let drawAmplitude = 80 * UI.pathAmplitudeMultiplier;
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    for (let i = 0; i < audioSamples.length; i++) {
        // Do I want the last sample to be exactly at the end of the path?
        // If so, length - 1 is fine, otherwise maybe do length - 2
        let iDistance = mapLinear(0, i, audioSamples.length - 1, 0, UI.pathLength);
        
        let j = 0;
        while (UI.pathDistances[j] <= iDistance) {
            j++;
        }
        if (j >= UI.pathDistances.length) {
            j = UI.pathDistances.length - 1;
        }

        let centerX = mapLinear(UI.pathDistances[j-1], iDistance, UI.pathDistances[j], UI.path[j-1].x, UI.path[j].x);
        let centerY = mapLinear(UI.pathDistances[j-1], iDistance, UI.pathDistances[j], UI.path[j-1].y, UI.path[j].y);
        
        // If we define dx = x2 - x1 and dy = y2 - y1, then the normals are (-dy, dx) and (dy, -dx).
        // https://stackoverflow.com/questions/1243614/how-do-i-calculate-the-normal-vector-of-a-line-segment
        let sample = audioSamples[i];
        let currentPathLength = distance(UI.path[j-1].x, UI.path[j-1].y, UI.path[j].x, UI.path[j].y);
        let dy = (UI.path[j-1].y - UI.path[j].y) / currentPathLength;
        let dx = (UI.path[j-1].x - UI.path[j].x) / currentPathLength;
        let x = centerX - drawAmplitude * sample * dy;
        let y = centerY + drawAmplitude * sample * dx;
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
