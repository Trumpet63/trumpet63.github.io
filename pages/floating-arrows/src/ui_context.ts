import Song from "./song";
import { FadeDirection } from "./fade_direction";
import { FadeEffect } from "./fade_effect";
import { getInputValueById } from "./util";
import { SongState } from "./song_state";
import { fromFile } from './id3/id3';
import { ID3Tag } from "./id3/id3Tag";

export default abstract class UI {
    public static canvas: HTMLCanvasElement;
    public static copyCanvas: HTMLCanvasElement;
    public static mouseX: number;
    public static mouseY: number;
    public static width: number;
    public static height: number;
    public static volume: number;
    public static hueOffset: number;
    public static hueMultipler: number;
    public static minLineWidth: number;
    public static maxLineWidth: number;
    public static fadeEffect: FadeEffect;
    public static fadeDirection: FadeDirection;
    public static fadeSpeed: number;
    public static shrinkRatio: number;
    public static fadeOpacity: number;

    public static files: FileList;
    public static playlist: number[];
    public static currentPlaylistIndex: number;
    
    private static optionsMenuOpen: boolean;
    private static invalidInputClass = "invalidInput";

    public static initialize() {
        UI.optionsMenuOpen = false;

        UI.canvas = (<HTMLCanvasElement> document.getElementById("mainCanvas"));
        UI.canvas.width = UI.canvas.parentElement.clientWidth;
        UI.canvas.height = UI.canvas.parentElement.clientHeight;
        UI.width = UI.canvas.width;
        UI.height = UI.canvas.height;

        UI.copyCanvas = document.createElement("canvas");
        UI.copyCanvas.width = UI.width;
        UI.copyCanvas.height = UI.height;

        UI.volume = getInputValueById("volumeInput");

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
        fetch("floating-arrows/assets/HoliznaCC0 - Space!.mp3")
            .then(response => response.blob())
            .then(blob => {
                let file = new File([blob], "demo.mp3", { type: blob.type });
                let dt = new DataTransfer();
                dt.items.add(file);
                fileSelector.files = dt.files;
                fileSelector.dispatchEvent(new Event('change', { bubbles: true }));
            });
    }

    public static resizeCanvasToMatchViewport() {
        if (UI.canvas.width !== UI.canvas.parentElement.clientWidth
            || UI.canvas.height !== UI.canvas.parentElement.clientHeight
        ) {
            UI.canvas.width = UI.canvas.parentElement.clientWidth;
            UI.canvas.height = UI.canvas.parentElement.clientHeight;
            UI.width = UI.canvas.width;
            UI.height = UI.canvas.height;
            UI.copyCanvas.width = UI.width;
            UI.copyCanvas.height = UI.height;
        }
    }

    public static onCanvasClick(e: MouseEvent) {
        // if (UI.drawingPath) {
        //     let nextStop = {x: e.offsetX, y: e.offsetY};
        //     UI.path.push(nextStop);
        // }
    };
    
    public static onCanvasMouseMove(e: MouseEvent) {
        UI.mouseX = e.offsetX;
        UI.mouseY = e.offsetY;
    }

    public static onFileSelect(e: Event) {
        this.files = (<HTMLInputElement> e.target).files;
        if (this.files.length === 0) {
            return;
        }
        
        this.playlist = [];
        for (let i = 0; i < this.files.length; i++) {
            this.playlist.push(i);
        }
        for (let i = this.playlist.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = this.playlist[i];
            this.playlist[i] = this.playlist[j];
            this.playlist[j] = temp;
        }
        this.currentPlaylistIndex = 0;
        if (Song.audioControl !== undefined) {
            Song.audioControl.onended = undefined;
        }
        this.loadCurrentSong();
    }

    private static async loadCurrentSong(): Promise<void> {
        switch (Song.songState) {
            case SongState.NONE:
            case SongState.READY:
                Song.songState = SongState.NONE;
                this.disableSongControls();
                break;
            case SongState.PAUSED:
                Song.songState = SongState.NONE;
                Song.audioControl.stop();
                Song.audioContext.resume();
                this.disableSongControls();
                break;
            case SongState.PLAYING:
                Song.songState = SongState.NONE;
                this.disableSongControls();
                document.getElementById("playPauseButton").innerText = "Play";
                Song.audioControl.stop();
                break;
        }
        let songIndex = this.playlist[this.currentPlaylistIndex];
        await fromFile(this.files[songIndex])
            .then((tags: ID3Tag | null) => {
                let songInfo = "";
                Song.title = "No Title";
                Song.artist = "No Artist";
                if (tags === null || tags.title === null) {
                    Song.title = this.files[songIndex].name;
                    songInfo = Song.title;
                } else {
                    Song.title = tags.title;
                    songInfo += Song.title;
                    if (tags.artist !== null) {
                        Song.artist = tags.artist;
                        songInfo += "<br>by " + Song.artist;
                    }
                }
                let songInfoDisplay = document.getElementById("currentSongInformation");
                songInfoDisplay.innerHTML = songInfo;
            });
        return this.files[songIndex].arrayBuffer()
            .then((arrayBuffer: ArrayBuffer) => {
                return Song.audioContext.decodeAudioData(arrayBuffer);
            })
            .then((audioBuffer: AudioBuffer) => {
                Song.audioControl = Song.audioContext.createBufferSource();
                Song.audioControl.buffer = audioBuffer;
                Song.gainNode = Song.audioContext.createGain();
                Song.gainNode.gain.value = UI.volume;
                Song.audioControl.connect(Song.gainNode);
                Song.gainNode.connect(Song.audioContext.destination);

                Song.samples = audioBuffer.getChannelData(0);

                Song.audioControl.onended = this.onSongPlayedThrough.bind(this);

                Song.songState = SongState.READY;
                this.enableSongControls();
            });
    }

    private static disableSongControls() {
        (<HTMLButtonElement> document.getElementById("playPauseButton")).disabled = true;
        (<HTMLButtonElement> document.getElementById("playlistBackButton")).disabled = true;
        (<HTMLButtonElement> document.getElementById("playlistForwardButton")).disabled = true;
    }

    private static enableSongControls() {
        (<HTMLButtonElement> document.getElementById("playPauseButton")).disabled = false;
        (<HTMLButtonElement> document.getElementById("playlistBackButton")).disabled = false;
        (<HTMLButtonElement> document.getElementById("playlistForwardButton")).disabled = false;
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

    public static onPlaylistBackButtonClick() {
        this.currentPlaylistIndex = (this.currentPlaylistIndex - 1) % this.files.length;
        Song.audioControl.onended = undefined;
        this.loadCurrentSong()
            .then(() => this.playCurrentSong());
    }

    public static onPlaylistForwardButtonClick() {
        this.currentPlaylistIndex = (this.currentPlaylistIndex + 1) % this.files.length;
        Song.audioControl.onended = undefined;
        this.loadCurrentSong()
            .then(() => this.playCurrentSong());
    }

    private static playCurrentSong() {
        Song.audioControl.start();
        Song.songState = SongState.PLAYING;
        Song.playStartTime = Song.audioContext.currentTime;
        document.getElementById("playPauseButton").innerText = "Pause";
    }

    private static onSongPlayedThrough() {
        this.currentPlaylistIndex = (this.currentPlaylistIndex + 1) % this.files.length;
        this.loadCurrentSong()
            .then(() => this.playCurrentSong());
    }

    public static onOptionsButtonClick() {
        UI.optionsMenuOpen = !UI.optionsMenuOpen;
        let optionsMenuDiv = document.getElementById("optionsMenuDiv");
        optionsMenuDiv.style.display = UI.optionsMenuOpen ? "" : "none";
        let optionsButton = document.getElementById("optionsButton");
        optionsButton.innerText = "Options " + (UI.optionsMenuOpen ? "▲" : "▼");
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
}
