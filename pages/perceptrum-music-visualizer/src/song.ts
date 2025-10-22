import { SongState } from "./song_state";

export default abstract class Song {
    public static audioContext: AudioContext;
    public static audioControl: AudioBufferSourceNode;
    public static gainNode: GainNode;
    public static samples: Float32Array;
    public static songState: SongState;
    public static playStartTime: number;

    public static initialize() {
        Song.audioContext = new AudioContext();
        Song.songState = SongState.NONE;
    }
}
