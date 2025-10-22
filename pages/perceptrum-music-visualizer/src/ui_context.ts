import Song from "./song";
import { DrawingMode } from "./drawing_mode";
import { FadeDirection } from "./fade_direction";
import { FadeEffect } from "./fade_effect";
import { distance, getInputValueById } from "./util";
import { SongState } from "./song_state";

export default abstract class UI {
    public static canvas: HTMLCanvasElement;
    public static mouseX: number;
    public static mouseY: number;
    public static width: number;
    public static height: number;
    public static volume: number;
    public static drawingMode: DrawingMode;
    public static flatAmplitudeMultipler: number;
    public static circleCenterX: number;
    public static circleCenterY: number;
    public static minCircleRadius: number;
    public static maxCircleRadius: number;
    public static pathAmplitudeMultiplier: number;
    public static hueOffset: number;
    public static hueMultipler: number;
    public static minLineWidth: number;
    public static maxLineWidth: number;
    public static fadeEffect: FadeEffect;
    public static fadeDirection: FadeDirection;
    public static fadeSpeed: number;
    public static shrinkRatio: number;
    public static fadeOpacity: number;

    public static drawingPath: boolean;
    public static path: {x: number, y: number}[];
    public static pathDistances: number[];
    public static pathLength: number;
    
    private static optionsMenuOpen: boolean;
    private static invalidInputClass = "invalidInput";

    public static initialize() {
        UI.drawingPath = false;
        UI.optionsMenuOpen = false;

        document.onkeydown = (e: KeyboardEvent) => {
            if (UI.drawingPath && e.key === "Escape") {
                UI.endDrawingPath();
            }
        }

        UI.canvas = (<HTMLCanvasElement> document.getElementById("mainCanvas"));
        UI.width = UI.canvas.width;
        UI.height = UI.canvas.height;

        UI.volume = getInputValueById("volumeInput");

        let drawingModeRadios = (<NodeListOf<HTMLInputElement>> document.getElementsByName("drawingModeRadio"));
        for (let i = 0; i < drawingModeRadios.length; i++) {
            let input = drawingModeRadios.item(i);
            if (input.checked) {
                UI.drawingMode = input.value as DrawingMode;
                UI.hideOrShowDrawingModeOptions(UI.drawingMode);
                break;
            }
        }

        UI.flatAmplitudeMultipler = getInputValueById("flatAmplitudeMultiplierInput");
        UI.circleCenterX = getInputValueById("circleCenterXInput");
        UI.circleCenterY = getInputValueById("circleCenterYInput");
        UI.minCircleRadius = getInputValueById("minRadiusInput");
        UI.maxCircleRadius = getInputValueById("maxRadiusInput");
        UI.pathAmplitudeMultiplier = getInputValueById("pathAmplitudeMultiplierInput");
        UI.hueOffset = getInputValueById("hueOffsetInput");
        UI.hueMultipler = getInputValueById("hueMultiplerInput");
        UI.minLineWidth = getInputValueById("minLineWidthInput");
        UI.maxLineWidth = getInputValueById("maxLineWidthInput");

        let fadeEffectRadios = (<NodeListOf<HTMLInputElement>> document.getElementsByName("fadeEffectRadio"));
        for (let i = 0; i < fadeEffectRadios.length; i++) {
            let input = fadeEffectRadios.item(i);
            if (input.checked) {
                UI.fadeEffect = input.value as FadeEffect;
                break;
            }
        }

        let fadeDirectionRadios = (<NodeListOf<HTMLInputElement>> document.getElementsByName("fadeDirectionRadio"));
        for (let i = 0; i < fadeDirectionRadios.length; i++) {
            let input = fadeDirectionRadios.item(i);
            if (input.checked) {
                UI.fadeDirection = input.value as FadeDirection;
                break;
            }
        }

        UI.fadeSpeed = getInputValueById("fadeSpeedInput");
        UI.shrinkRatio = UI.getShrinkRatio(UI.fadeSpeed, UI.fadeDirection);
        UI.fadeOpacity = getInputValueById("fadeOpacityInput");

        // Note: This was hacked in years after making the app originally
        let fileSelector = <HTMLInputElement>document.getElementById("fileSelector");
        fetch("perceptrum-music-visualizer/assets/final_flight.mp3")
            .then(response => response.blob())
            .then(blob => {
                let file = new File([blob], "demo.mp3", { type: blob.type });
                let dt = new DataTransfer();
                dt.items.add(file);
                fileSelector.files = dt.files;
                fileSelector.dispatchEvent(new Event('change', { bubbles: true }));
            });
    }

    public static onCanvasClick(e: MouseEvent) {
        if (UI.drawingPath) {
            let nextStop = {x: e.offsetX, y: e.offsetY};
            UI.path.push(nextStop);
        }
    };
    
    public static onCanvasMouseMove(e: MouseEvent) {
        UI.mouseX = e.offsetX;
        UI.mouseY = e.offsetY;
    }

    public static onFileSelect(e: Event) {
        let playPauseButton: HTMLButtonElement;
        switch (Song.songState) {
            case SongState.NONE:
            case SongState.READY:
                Song.songState = SongState.NONE;
                playPauseButton = (<HTMLButtonElement> document.getElementById("playPauseButton"));
                playPauseButton.disabled = true;
                break;
            case SongState.PAUSED:
                Song.songState = SongState.NONE;
                Song.audioControl.stop();
                Song.audioContext.resume();
                playPauseButton = (<HTMLButtonElement> document.getElementById("playPauseButton"));
                playPauseButton.disabled = true;
                break;
            case SongState.PLAYING:
                Song.songState = SongState.NONE;
                playPauseButton = (<HTMLButtonElement> document.getElementById("playPauseButton"));
                playPauseButton.disabled = true;
                document.getElementById("playPauseButton").innerText = "Play";
                Song.audioControl.stop();
                break;
        }

        let files: FileList = (<HTMLInputElement> e.target).files;
        if (files.length !== 1) {
            return;
        }
        let file: File = files[0];
        file.arrayBuffer()
            .then((arrayBuffer: ArrayBuffer) => Song.audioContext.decodeAudioData(arrayBuffer))
            .then((audioBuffer: AudioBuffer) => {
                Song.audioControl = Song.audioContext.createBufferSource();
                Song.audioControl.buffer = audioBuffer;
                Song.gainNode = Song.audioContext.createGain();
                Song.gainNode.gain.value = UI.volume;
                Song.audioControl.connect(Song.gainNode);
                Song.gainNode.connect(Song.audioContext.destination);

                Song.samples = audioBuffer.getChannelData(0);

                Song.songState = SongState.READY;
                let playPauseButton = (<HTMLButtonElement> document.getElementById("playPauseButton"));
                playPauseButton.disabled = false;
            });
    }

    public static onPlayPauseButtonClick() {
        switch (Song.songState) {
            case SongState.NONE:
                break;
            case SongState.READY:
                Song.audioControl.start();
                Song.songState = SongState.PLAYING;
                Song.playStartTime = Song.audioContext.currentTime;
                document.getElementById("playPauseButton").innerText = "Pause";
                break;
            case SongState.PLAYING:
                Song.audioContext.suspend();
                Song.songState = SongState.PAUSED;
                document.getElementById("playPauseButton").innerText = "Play";
                break;
            case SongState.PAUSED:
                Song.audioContext.resume();
                Song.songState = SongState.PLAYING;
                document.getElementById("playPauseButton").innerText = "Pause";
                break;
        }
    }

    public static onVolumeInput(input: HTMLInputElement) {
        let value = input.valueAsNumber;
        UI.volume = value;
        if (Song.songState !== SongState.NONE) {
            Song.gainNode.gain.value = UI.volume;
        }
    }

    public static onDrawingModeInput(input: HTMLInputElement) {
        UI.drawingMode = input.value as DrawingMode;
        UI.hideOrShowDrawingModeOptions(UI.drawingMode);
    }
    private static hideOrShowDrawingModeOptions(mode: DrawingMode) {
        switch(mode) {
            case DrawingMode.FLAT:
                document.getElementById("flatOptionsDivider").style.display = "";
                document.getElementById("circleOptionsDivider").style.display = "none";
                document.getElementById("pathOptionsDivider").style.display = "none";
                break;
            case DrawingMode.CIRCLE:
                document.getElementById("flatOptionsDivider").style.display = "none";
                document.getElementById("circleOptionsDivider").style.display = "";
                document.getElementById("pathOptionsDivider").style.display = "none";
                break;
            case DrawingMode.PATH:
                document.getElementById("flatOptionsDivider").style.display = "none";
                document.getElementById("circleOptionsDivider").style.display = "none";
                document.getElementById("pathOptionsDivider").style.display = "";
                break;
        }
    }

    public static onOptionsButtonClick() {
        UI.optionsMenuOpen = !UI.optionsMenuOpen;
        let optionsMenuDiv = document.getElementById("optionsMenuDiv");
        optionsMenuDiv.style.display = UI.optionsMenuOpen ? "" : "none";
        let optionsButton = document.getElementById("optionsButton");
        optionsButton.innerText = "Options " + (UI.optionsMenuOpen ? "▲" : "▼");
    }

    public static onFlatAmplitudeMultiplierInput(input: HTMLInputElement) {
        let value: number = input.valueAsNumber;
        UI.flatAmplitudeMultipler = value;
    }
    
    public static onCircleCenterXInput(input: HTMLInputElement) {
        let value: number = input.valueAsNumber;
        UI.circleCenterX = value;
    }

    public static onCircleCenterYInput(input: HTMLInputElement) {
        let value: number = input.valueAsNumber;
        UI.circleCenterY = value;
    }

    public static onMinRadiusInput(input: HTMLInputElement) {
        let value: number = input.valueAsNumber;
        UI.tryToSetMinCircleRadius(value);
    }
    private static tryToSetMinCircleRadius(value: number) {
        if (!isNaN(value) && value <= UI.maxCircleRadius) {
            UI.styleAsValid(document.getElementById("minRadiusInput"));
            let alsoTrySettingMaxRadius = UI.minCircleRadius !== value;
            UI.minCircleRadius = value;
            if (alsoTrySettingMaxRadius) {
                let max = getInputValueById("maxRadiusInput");
                UI.tryToSetMaxCircleRadius(max);
            }
        } else {
            UI.styleAsInvalid(document.getElementById("minRadiusInput"))
        }
    }

    public static onMaxRadiusInput(input: HTMLInputElement) {
        let value: number = input.valueAsNumber;
        UI.tryToSetMaxCircleRadius(value);
    }
    private static tryToSetMaxCircleRadius(value: number) {
        if (!isNaN(value) && value >= UI.minCircleRadius) {
            UI.styleAsValid(document.getElementById("maxRadiusInput"));
            let alsoTrySettingMinRadius = UI.maxCircleRadius !== value;
            UI.maxCircleRadius = value;
            if (alsoTrySettingMinRadius) {
                let min = getInputValueById("minRadiusInput");
                UI.tryToSetMinCircleRadius(min);
            }
        } else {
            UI.styleAsInvalid(document.getElementById("maxRadiusInput"));
        }
    }

    public static onDrawPathButtonClick() {
        document.getElementById("optionsButton").click();
        UI.startDrawingPath();
    }

    public static onPathAmplitudeMultiplierInput(input: HTMLInputElement) {
        let value: number = input.valueAsNumber;
        UI.pathAmplitudeMultiplier = value;
    }

    public static onHueOffsetInput(input: HTMLInputElement) {
        let value: number = input.valueAsNumber;
        UI.hueOffset = value;
    }

    public static onHueMultiplierInput(input: HTMLInputElement) {
        let value: number = input.valueAsNumber;
        if (!isNaN(value) && value >= 0) {
            UI.styleAsValid(input);
            UI.hueMultipler = value;
        } else {
            UI.styleAsInvalid(input);
        }
    }

    public static onMinLineWidthInput(input: HTMLInputElement) {
        let value = input.valueAsNumber;
        UI.tryToSetMinLineWidth(value);
    }
    private static tryToSetMinLineWidth(value: number) {
        if (!isNaN(value) && value >= 0 && value <= UI.maxLineWidth) {
            UI.styleAsValid(document.getElementById("minLineWidthInput"));
            let alsoTrySettingMaxLineWidth: boolean = value !== UI.minLineWidth;
            UI.minLineWidth = value;
            if (alsoTrySettingMaxLineWidth) {
                let max = getInputValueById("maxLineWidthInput");
                UI.tryToSetMaxLineWidth(max);
            }
        } else {
            UI.styleAsInvalid(document.getElementById("minLineWidthInput"));
        }
    }

    public static onMaxLineWidthInput(input: HTMLInputElement) {
        let value = input.valueAsNumber;
        UI.tryToSetMaxLineWidth(value);
    }
    private static tryToSetMaxLineWidth(value: number) {
        if (!isNaN(value) && value >= 0 && value >= UI.minLineWidth) {
            UI.styleAsValid(document.getElementById("maxLineWidthInput"));
            let alsoTrySettingMinLineWidth: boolean = value !== UI.maxLineWidth;
            UI.maxLineWidth = value;
            if (alsoTrySettingMinLineWidth) {
                let min = getInputValueById("minLineWidthInput");
                UI.tryToSetMinLineWidth(min);
            }
        } else {
            UI.styleAsInvalid(document.getElementById("maxLineWidthInput"));
        }
    }

    public static onFadeEffectInput(input: HTMLInputElement) {
        UI.fadeEffect = input.value as FadeEffect;
    }

    public static onFadeDirectionInput(input: HTMLInputElement) {
        UI.fadeDirection = input.value as FadeDirection;
        UI.shrinkRatio = UI.getShrinkRatio(UI.fadeSpeed, UI.fadeDirection);
    }

    public static onFadeSpeedInput(input: HTMLInputElement) {
        let value = input.valueAsNumber;
        UI.fadeSpeed = value;
        UI.shrinkRatio = UI.getShrinkRatio(UI.fadeSpeed, UI.fadeDirection);
    }

    private static getShrinkRatio(fadeSpeed: number, fadeDirection: FadeDirection) {
        switch (fadeDirection) {
            case FadeDirection.IN:
                return fadeSpeed;
            case FadeDirection.OUT:
                return -fadeSpeed;
            case FadeDirection.NONE:
                return 0;
        }
    }
    
    public static onFadeOpacityInput(input: HTMLInputElement) {
        let value = input.valueAsNumber;
        UI.fadeOpacity = value;
    }

    private static styleAsValid(input: HTMLElement) {
        if (input.classList.contains(UI.invalidInputClass)) {
            input.classList.remove(UI.invalidInputClass);
        }
    }

    private static styleAsInvalid(input: HTMLElement) {
        if (!input.classList.contains(UI.invalidInputClass)) {
            input.classList.add(UI.invalidInputClass);
        }
    }

    private static startDrawingPath() {
        UI.drawingPath = true;
        UI.path = [];
        UI.pathDistances = [];
    }
    
    private static endDrawingPath() {
        UI.drawingPath = false;
        UI.pathLength = 0;
        UI.pathDistances.push(0);
        for (let i = 1; i < UI.path.length; i++) {
            UI.pathLength += distance(UI.path[i-1].x, UI.path[i-1].y, UI.path[i].x, UI.path[i].y);
            UI.pathDistances.push(UI.pathLength);
        }
        
    }
}
