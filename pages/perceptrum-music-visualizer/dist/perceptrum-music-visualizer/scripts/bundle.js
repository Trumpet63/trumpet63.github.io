(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // pages/perceptrum-music-visualizer/src/fft.js
  var require_fft = __commonJS({
    "pages/perceptrum-music-visualizer/src/fft.js"(exports, module) {
      "use strict";
      function FFT2(size) {
        this.size = size | 0;
        if (this.size <= 1 || (this.size & this.size - 1) !== 0)
          throw new Error("FFT size must be a power of two and bigger than 1");
        this._csize = size << 1;
        var table = new Array(this.size * 2);
        for (var i = 0; i < table.length; i += 2) {
          const angle = Math.PI * i / this.size;
          table[i] = Math.cos(angle);
          table[i + 1] = -Math.sin(angle);
        }
        this.table = table;
        var power = 0;
        for (var t = 1; this.size > t; t <<= 1)
          power++;
        this._width = power % 2 === 0 ? power - 1 : power;
        this._bitrev = new Array(1 << this._width);
        for (var j = 0; j < this._bitrev.length; j++) {
          this._bitrev[j] = 0;
          for (var shift = 0; shift < this._width; shift += 2) {
            var revShift = this._width - shift - 2;
            this._bitrev[j] |= (j >>> shift & 3) << revShift;
          }
        }
        this._out = null;
        this._data = null;
        this._inv = 0;
      }
      module.exports = FFT2;
      FFT2.prototype.fromComplexArray = function fromComplexArray(complex, storage) {
        var res = storage || new Array(complex.length >>> 1);
        for (var i = 0; i < complex.length; i += 2)
          res[i >>> 1] = complex[i];
        return res;
      };
      FFT2.prototype.createComplexArray = function createComplexArray() {
        const res = new Array(this._csize);
        for (var i = 0; i < res.length; i++)
          res[i] = 0;
        return res;
      };
      FFT2.prototype.toComplexArray = function toComplexArray(input, storage) {
        var res = storage || this.createComplexArray();
        for (var i = 0; i < res.length; i += 2) {
          res[i] = input[i >>> 1];
          res[i + 1] = 0;
        }
        return res;
      };
      FFT2.prototype.completeSpectrum = function completeSpectrum(spectrum) {
        var size = this._csize;
        var half = size >>> 1;
        for (var i = 2; i < half; i += 2) {
          spectrum[size - i] = spectrum[i];
          spectrum[size - i + 1] = -spectrum[i + 1];
        }
      };
      FFT2.prototype.transform = function transform(out, data) {
        if (out === data)
          throw new Error("Input and output buffers must be different");
        this._out = out;
        this._data = data;
        this._inv = 0;
        this._transform4();
        this._out = null;
        this._data = null;
      };
      FFT2.prototype.realTransform = function realTransform(out, data) {
        if (out === data)
          throw new Error("Input and output buffers must be different");
        this._out = out;
        this._data = data;
        this._inv = 0;
        this._realTransform4();
        this._out = null;
        this._data = null;
      };
      FFT2.prototype.inverseTransform = function inverseTransform(out, data) {
        if (out === data)
          throw new Error("Input and output buffers must be different");
        this._out = out;
        this._data = data;
        this._inv = 1;
        this._transform4();
        for (var i = 0; i < out.length; i++)
          out[i] /= this.size;
        this._out = null;
        this._data = null;
      };
      FFT2.prototype._transform4 = function _transform4() {
        var out = this._out;
        var size = this._csize;
        var width = this._width;
        var step = 1 << width;
        var len = size / step << 1;
        var outOff;
        var t;
        var bitrev = this._bitrev;
        if (len === 4) {
          for (outOff = 0, t = 0; outOff < size; outOff += len, t++) {
            const off = bitrev[t];
            this._singleTransform2(outOff, off, step);
          }
        } else {
          for (outOff = 0, t = 0; outOff < size; outOff += len, t++) {
            const off = bitrev[t];
            this._singleTransform4(outOff, off, step);
          }
        }
        var inv = this._inv ? -1 : 1;
        var table = this.table;
        for (step >>= 2; step >= 2; step >>= 2) {
          len = size / step << 1;
          var quarterLen = len >>> 2;
          for (outOff = 0; outOff < size; outOff += len) {
            var limit = outOff + quarterLen;
            for (var i = outOff, k = 0; i < limit; i += 2, k += step) {
              const A = i;
              const B = A + quarterLen;
              const C = B + quarterLen;
              const D = C + quarterLen;
              const Ar = out[A];
              const Ai = out[A + 1];
              const Br = out[B];
              const Bi = out[B + 1];
              const Cr = out[C];
              const Ci = out[C + 1];
              const Dr = out[D];
              const Di = out[D + 1];
              const MAr = Ar;
              const MAi = Ai;
              const tableBr = table[k];
              const tableBi = inv * table[k + 1];
              const MBr = Br * tableBr - Bi * tableBi;
              const MBi = Br * tableBi + Bi * tableBr;
              const tableCr = table[2 * k];
              const tableCi = inv * table[2 * k + 1];
              const MCr = Cr * tableCr - Ci * tableCi;
              const MCi = Cr * tableCi + Ci * tableCr;
              const tableDr = table[3 * k];
              const tableDi = inv * table[3 * k + 1];
              const MDr = Dr * tableDr - Di * tableDi;
              const MDi = Dr * tableDi + Di * tableDr;
              const T0r = MAr + MCr;
              const T0i = MAi + MCi;
              const T1r = MAr - MCr;
              const T1i = MAi - MCi;
              const T2r = MBr + MDr;
              const T2i = MBi + MDi;
              const T3r = inv * (MBr - MDr);
              const T3i = inv * (MBi - MDi);
              const FAr = T0r + T2r;
              const FAi = T0i + T2i;
              const FCr = T0r - T2r;
              const FCi = T0i - T2i;
              const FBr = T1r + T3i;
              const FBi = T1i - T3r;
              const FDr = T1r - T3i;
              const FDi = T1i + T3r;
              out[A] = FAr;
              out[A + 1] = FAi;
              out[B] = FBr;
              out[B + 1] = FBi;
              out[C] = FCr;
              out[C + 1] = FCi;
              out[D] = FDr;
              out[D + 1] = FDi;
            }
          }
        }
      };
      FFT2.prototype._singleTransform2 = function _singleTransform2(outOff, off, step) {
        const out = this._out;
        const data = this._data;
        const evenR = data[off];
        const evenI = data[off + 1];
        const oddR = data[off + step];
        const oddI = data[off + step + 1];
        const leftR = evenR + oddR;
        const leftI = evenI + oddI;
        const rightR = evenR - oddR;
        const rightI = evenI - oddI;
        out[outOff] = leftR;
        out[outOff + 1] = leftI;
        out[outOff + 2] = rightR;
        out[outOff + 3] = rightI;
      };
      FFT2.prototype._singleTransform4 = function _singleTransform4(outOff, off, step) {
        const out = this._out;
        const data = this._data;
        const inv = this._inv ? -1 : 1;
        const step2 = step * 2;
        const step3 = step * 3;
        const Ar = data[off];
        const Ai = data[off + 1];
        const Br = data[off + step];
        const Bi = data[off + step + 1];
        const Cr = data[off + step2];
        const Ci = data[off + step2 + 1];
        const Dr = data[off + step3];
        const Di = data[off + step3 + 1];
        const T0r = Ar + Cr;
        const T0i = Ai + Ci;
        const T1r = Ar - Cr;
        const T1i = Ai - Ci;
        const T2r = Br + Dr;
        const T2i = Bi + Di;
        const T3r = inv * (Br - Dr);
        const T3i = inv * (Bi - Di);
        const FAr = T0r + T2r;
        const FAi = T0i + T2i;
        const FBr = T1r + T3i;
        const FBi = T1i - T3r;
        const FCr = T0r - T2r;
        const FCi = T0i - T2i;
        const FDr = T1r - T3i;
        const FDi = T1i + T3r;
        out[outOff] = FAr;
        out[outOff + 1] = FAi;
        out[outOff + 2] = FBr;
        out[outOff + 3] = FBi;
        out[outOff + 4] = FCr;
        out[outOff + 5] = FCi;
        out[outOff + 6] = FDr;
        out[outOff + 7] = FDi;
      };
      FFT2.prototype._realTransform4 = function _realTransform4() {
        var out = this._out;
        var size = this._csize;
        var width = this._width;
        var step = 1 << width;
        var len = size / step << 1;
        var outOff;
        var t;
        var bitrev = this._bitrev;
        if (len === 4) {
          for (outOff = 0, t = 0; outOff < size; outOff += len, t++) {
            const off = bitrev[t];
            this._singleRealTransform2(outOff, off >>> 1, step >>> 1);
          }
        } else {
          for (outOff = 0, t = 0; outOff < size; outOff += len, t++) {
            const off = bitrev[t];
            this._singleRealTransform4(outOff, off >>> 1, step >>> 1);
          }
        }
        var inv = this._inv ? -1 : 1;
        var table = this.table;
        for (step >>= 2; step >= 2; step >>= 2) {
          len = size / step << 1;
          var halfLen = len >>> 1;
          var quarterLen = halfLen >>> 1;
          var hquarterLen = quarterLen >>> 1;
          for (outOff = 0; outOff < size; outOff += len) {
            for (var i = 0, k = 0; i <= hquarterLen; i += 2, k += step) {
              var A = outOff + i;
              var B = A + quarterLen;
              var C = B + quarterLen;
              var D = C + quarterLen;
              var Ar = out[A];
              var Ai = out[A + 1];
              var Br = out[B];
              var Bi = out[B + 1];
              var Cr = out[C];
              var Ci = out[C + 1];
              var Dr = out[D];
              var Di = out[D + 1];
              var MAr = Ar;
              var MAi = Ai;
              var tableBr = table[k];
              var tableBi = inv * table[k + 1];
              var MBr = Br * tableBr - Bi * tableBi;
              var MBi = Br * tableBi + Bi * tableBr;
              var tableCr = table[2 * k];
              var tableCi = inv * table[2 * k + 1];
              var MCr = Cr * tableCr - Ci * tableCi;
              var MCi = Cr * tableCi + Ci * tableCr;
              var tableDr = table[3 * k];
              var tableDi = inv * table[3 * k + 1];
              var MDr = Dr * tableDr - Di * tableDi;
              var MDi = Dr * tableDi + Di * tableDr;
              var T0r = MAr + MCr;
              var T0i = MAi + MCi;
              var T1r = MAr - MCr;
              var T1i = MAi - MCi;
              var T2r = MBr + MDr;
              var T2i = MBi + MDi;
              var T3r = inv * (MBr - MDr);
              var T3i = inv * (MBi - MDi);
              var FAr = T0r + T2r;
              var FAi = T0i + T2i;
              var FBr = T1r + T3i;
              var FBi = T1i - T3r;
              out[A] = FAr;
              out[A + 1] = FAi;
              out[B] = FBr;
              out[B + 1] = FBi;
              if (i === 0) {
                var FCr = T0r - T2r;
                var FCi = T0i - T2i;
                out[C] = FCr;
                out[C + 1] = FCi;
                continue;
              }
              if (i === hquarterLen)
                continue;
              var ST0r = T1r;
              var ST0i = -T1i;
              var ST1r = T0r;
              var ST1i = -T0i;
              var ST2r = -inv * T3i;
              var ST2i = -inv * T3r;
              var ST3r = -inv * T2i;
              var ST3i = -inv * T2r;
              var SFAr = ST0r + ST2r;
              var SFAi = ST0i + ST2i;
              var SFBr = ST1r + ST3i;
              var SFBi = ST1i - ST3r;
              var SA = outOff + quarterLen - i;
              var SB = outOff + halfLen - i;
              out[SA] = SFAr;
              out[SA + 1] = SFAi;
              out[SB] = SFBr;
              out[SB + 1] = SFBi;
            }
          }
        }
      };
      FFT2.prototype._singleRealTransform2 = function _singleRealTransform2(outOff, off, step) {
        const out = this._out;
        const data = this._data;
        const evenR = data[off];
        const oddR = data[off + step];
        const leftR = evenR + oddR;
        const rightR = evenR - oddR;
        out[outOff] = leftR;
        out[outOff + 1] = 0;
        out[outOff + 2] = rightR;
        out[outOff + 3] = 0;
      };
      FFT2.prototype._singleRealTransform4 = function _singleRealTransform4(outOff, off, step) {
        const out = this._out;
        const data = this._data;
        const inv = this._inv ? -1 : 1;
        const step2 = step * 2;
        const step3 = step * 3;
        const Ar = data[off];
        const Br = data[off + step];
        const Cr = data[off + step2];
        const Dr = data[off + step3];
        const T0r = Ar + Cr;
        const T1r = Ar - Cr;
        const T2r = Br + Dr;
        const T3r = inv * (Br - Dr);
        const FAr = T0r + T2r;
        const FBr = T1r;
        const FBi = -T3r;
        const FCr = T0r - T2r;
        const FDr = T1r;
        const FDi = T3r;
        out[outOff] = FAr;
        out[outOff + 1] = 0;
        out[outOff + 2] = FBr;
        out[outOff + 3] = FBi;
        out[outOff + 4] = FCr;
        out[outOff + 5] = 0;
        out[outOff + 6] = FDr;
        out[outOff + 7] = FDi;
      };
    }
  });

  // pages/perceptrum-music-visualizer/src/util.ts
  var Color = class {
    constructor(r, g, b) {
      this.red = r;
      this.green = g;
      this.blue = b;
    }
    getStyle() {
      return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
    }
  };
  function mapLinear(fromStart, value, fromEnd, toStart, toEnd) {
    if (toStart === toEnd) {
      return toStart;
    }
    let ratio = (value - fromStart) / (fromEnd - fromStart);
    let toValue = toStart + ratio * (toEnd - toStart);
    return toValue;
  }
  function HSLToRGB(h, s, l) {
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let h_prime = h / 60;
    let x = c * (1 - Math.abs(h_prime % 2 - 1));
    let tempColor;
    if (0 <= h_prime && h_prime < 1) {
      tempColor = new Color(c, x, 0);
    } else if (1 <= h_prime && h_prime < 2) {
      tempColor = new Color(x, c, 0);
    } else if (2 <= h_prime && h_prime < 3) {
      tempColor = new Color(0, c, x);
    } else if (3 <= h_prime && h_prime < 4) {
      tempColor = new Color(0, x, c);
    } else if (4 <= h_prime && h_prime < 5) {
      tempColor = new Color(x, 0, c);
    } else if (5 <= h_prime && h_prime <= 6) {
      tempColor = new Color(c, 0, x);
    }
    let m = l - c / 2;
    return new Color(
      255 * (tempColor.red + m),
      255 * (tempColor.green + m),
      255 * (tempColor.blue + m)
    );
  }
  function getInputValueById(id) {
    return document.getElementById(id).valueAsNumber;
  }
  function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
  }

  // pages/perceptrum-music-visualizer/src/index.ts
  var import_fft = __toESM(require_fft());

  // pages/perceptrum-music-visualizer/src/song.ts
  var Song = class _Song {
    static initialize() {
      _Song.audioContext = new AudioContext();
      _Song.songState = 0 /* NONE */;
    }
  };

  // pages/perceptrum-music-visualizer/src/ui_context.ts
  var UI = class _UI {
    static {
      this.invalidInputClass = "invalidInput";
    }
    static initialize() {
      _UI.drawingPath = false;
      _UI.optionsMenuOpen = false;
      document.onkeydown = (e) => {
        if (_UI.drawingPath && e.key === "Escape") {
          _UI.endDrawingPath();
        }
      };
      _UI.canvas = document.getElementById("mainCanvas");
      _UI.width = _UI.canvas.width;
      _UI.height = _UI.canvas.height;
      _UI.volume = getInputValueById("volumeInput");
      let drawingModeRadios = document.getElementsByName("drawingModeRadio");
      for (let i = 0; i < drawingModeRadios.length; i++) {
        let input = drawingModeRadios.item(i);
        if (input.checked) {
          _UI.drawingMode = input.value;
          _UI.hideOrShowDrawingModeOptions(_UI.drawingMode);
          break;
        }
      }
      _UI.flatAmplitudeMultipler = getInputValueById("flatAmplitudeMultiplierInput");
      _UI.circleCenterX = getInputValueById("circleCenterXInput");
      _UI.circleCenterY = getInputValueById("circleCenterYInput");
      _UI.minCircleRadius = getInputValueById("minRadiusInput");
      _UI.maxCircleRadius = getInputValueById("maxRadiusInput");
      _UI.pathAmplitudeMultiplier = getInputValueById("pathAmplitudeMultiplierInput");
      _UI.hueOffset = getInputValueById("hueOffsetInput");
      _UI.hueMultipler = getInputValueById("hueMultiplerInput");
      _UI.minLineWidth = getInputValueById("minLineWidthInput");
      _UI.maxLineWidth = getInputValueById("maxLineWidthInput");
      let fadeEffectRadios = document.getElementsByName("fadeEffectRadio");
      for (let i = 0; i < fadeEffectRadios.length; i++) {
        let input = fadeEffectRadios.item(i);
        if (input.checked) {
          _UI.fadeEffect = input.value;
          break;
        }
      }
      let fadeDirectionRadios = document.getElementsByName("fadeDirectionRadio");
      for (let i = 0; i < fadeDirectionRadios.length; i++) {
        let input = fadeDirectionRadios.item(i);
        if (input.checked) {
          _UI.fadeDirection = input.value;
          break;
        }
      }
      _UI.fadeSpeed = getInputValueById("fadeSpeedInput");
      _UI.shrinkRatio = _UI.getShrinkRatio(_UI.fadeSpeed, _UI.fadeDirection);
      _UI.fadeOpacity = getInputValueById("fadeOpacityInput");
      let fileSelector = document.getElementById("fileSelector");
      fetch("perceptrum-music-visualizer/assets/final_flight.mp3").then((response) => response.blob()).then((blob) => {
        let file = new File([blob], "demo.mp3", { type: blob.type });
        let dt = new DataTransfer();
        dt.items.add(file);
        fileSelector.files = dt.files;
        fileSelector.dispatchEvent(new Event("change", { bubbles: true }));
      });
    }
    static onCanvasClick(e) {
      if (_UI.drawingPath) {
        let nextStop = { x: e.offsetX, y: e.offsetY };
        _UI.path.push(nextStop);
      }
    }
    static onCanvasMouseMove(e) {
      _UI.mouseX = e.offsetX;
      _UI.mouseY = e.offsetY;
    }
    static onFileSelect(e) {
      let playPauseButton;
      switch (Song.songState) {
        case 0 /* NONE */:
        case 1 /* READY */:
          Song.songState = 0 /* NONE */;
          playPauseButton = document.getElementById("playPauseButton");
          playPauseButton.disabled = true;
          break;
        case 3 /* PAUSED */:
          Song.songState = 0 /* NONE */;
          Song.audioControl.stop();
          Song.audioContext.resume();
          playPauseButton = document.getElementById("playPauseButton");
          playPauseButton.disabled = true;
          break;
        case 2 /* PLAYING */:
          Song.songState = 0 /* NONE */;
          playPauseButton = document.getElementById("playPauseButton");
          playPauseButton.disabled = true;
          document.getElementById("playPauseButton").innerText = "Play";
          Song.audioControl.stop();
          break;
      }
      let files = e.target.files;
      if (files.length !== 1) {
        return;
      }
      let file = files[0];
      file.arrayBuffer().then((arrayBuffer) => Song.audioContext.decodeAudioData(arrayBuffer)).then((audioBuffer) => {
        Song.audioControl = Song.audioContext.createBufferSource();
        Song.audioControl.buffer = audioBuffer;
        Song.gainNode = Song.audioContext.createGain();
        Song.gainNode.gain.value = _UI.volume;
        Song.audioControl.connect(Song.gainNode);
        Song.gainNode.connect(Song.audioContext.destination);
        Song.samples = audioBuffer.getChannelData(0);
        Song.songState = 1 /* READY */;
        let playPauseButton2 = document.getElementById("playPauseButton");
        playPauseButton2.disabled = false;
      });
    }
    static onPlayPauseButtonClick() {
      switch (Song.songState) {
        case 0 /* NONE */:
          break;
        case 1 /* READY */:
          Song.audioControl.start();
          Song.songState = 2 /* PLAYING */;
          Song.playStartTime = Song.audioContext.currentTime;
          document.getElementById("playPauseButton").innerText = "Pause";
          break;
        case 2 /* PLAYING */:
          Song.audioContext.suspend();
          Song.songState = 3 /* PAUSED */;
          document.getElementById("playPauseButton").innerText = "Play";
          break;
        case 3 /* PAUSED */:
          Song.audioContext.resume();
          Song.songState = 2 /* PLAYING */;
          document.getElementById("playPauseButton").innerText = "Pause";
          break;
      }
    }
    static onVolumeInput(input) {
      let value = input.valueAsNumber;
      _UI.volume = value;
      if (Song.songState !== 0 /* NONE */) {
        Song.gainNode.gain.value = _UI.volume;
      }
    }
    static onDrawingModeInput(input) {
      _UI.drawingMode = input.value;
      _UI.hideOrShowDrawingModeOptions(_UI.drawingMode);
    }
    static hideOrShowDrawingModeOptions(mode) {
      switch (mode) {
        case "Flat" /* FLAT */:
          document.getElementById("flatOptionsDivider").style.display = "";
          document.getElementById("circleOptionsDivider").style.display = "none";
          document.getElementById("pathOptionsDivider").style.display = "none";
          break;
        case "Circle" /* CIRCLE */:
          document.getElementById("flatOptionsDivider").style.display = "none";
          document.getElementById("circleOptionsDivider").style.display = "";
          document.getElementById("pathOptionsDivider").style.display = "none";
          break;
        case "Path" /* PATH */:
          document.getElementById("flatOptionsDivider").style.display = "none";
          document.getElementById("circleOptionsDivider").style.display = "none";
          document.getElementById("pathOptionsDivider").style.display = "";
          break;
      }
    }
    static onOptionsButtonClick() {
      _UI.optionsMenuOpen = !_UI.optionsMenuOpen;
      let optionsMenuDiv = document.getElementById("optionsMenuDiv");
      optionsMenuDiv.style.display = _UI.optionsMenuOpen ? "" : "none";
      let optionsButton = document.getElementById("optionsButton");
      optionsButton.innerText = "Options " + (_UI.optionsMenuOpen ? "\u25B2" : "\u25BC");
    }
    static onFlatAmplitudeMultiplierInput(input) {
      let value = input.valueAsNumber;
      _UI.flatAmplitudeMultipler = value;
    }
    static onCircleCenterXInput(input) {
      let value = input.valueAsNumber;
      _UI.circleCenterX = value;
    }
    static onCircleCenterYInput(input) {
      let value = input.valueAsNumber;
      _UI.circleCenterY = value;
    }
    static onMinRadiusInput(input) {
      let value = input.valueAsNumber;
      _UI.tryToSetMinCircleRadius(value);
    }
    static tryToSetMinCircleRadius(value) {
      if (!isNaN(value) && value <= _UI.maxCircleRadius) {
        _UI.styleAsValid(document.getElementById("minRadiusInput"));
        let alsoTrySettingMaxRadius = _UI.minCircleRadius !== value;
        _UI.minCircleRadius = value;
        if (alsoTrySettingMaxRadius) {
          let max = getInputValueById("maxRadiusInput");
          _UI.tryToSetMaxCircleRadius(max);
        }
      } else {
        _UI.styleAsInvalid(document.getElementById("minRadiusInput"));
      }
    }
    static onMaxRadiusInput(input) {
      let value = input.valueAsNumber;
      _UI.tryToSetMaxCircleRadius(value);
    }
    static tryToSetMaxCircleRadius(value) {
      if (!isNaN(value) && value >= _UI.minCircleRadius) {
        _UI.styleAsValid(document.getElementById("maxRadiusInput"));
        let alsoTrySettingMinRadius = _UI.maxCircleRadius !== value;
        _UI.maxCircleRadius = value;
        if (alsoTrySettingMinRadius) {
          let min = getInputValueById("minRadiusInput");
          _UI.tryToSetMinCircleRadius(min);
        }
      } else {
        _UI.styleAsInvalid(document.getElementById("maxRadiusInput"));
      }
    }
    static onDrawPathButtonClick() {
      document.getElementById("optionsButton").click();
      _UI.startDrawingPath();
    }
    static onPathAmplitudeMultiplierInput(input) {
      let value = input.valueAsNumber;
      _UI.pathAmplitudeMultiplier = value;
    }
    static onHueOffsetInput(input) {
      let value = input.valueAsNumber;
      _UI.hueOffset = value;
    }
    static onHueMultiplierInput(input) {
      let value = input.valueAsNumber;
      if (!isNaN(value) && value >= 0) {
        _UI.styleAsValid(input);
        _UI.hueMultipler = value;
      } else {
        _UI.styleAsInvalid(input);
      }
    }
    static onMinLineWidthInput(input) {
      let value = input.valueAsNumber;
      _UI.tryToSetMinLineWidth(value);
    }
    static tryToSetMinLineWidth(value) {
      if (!isNaN(value) && value >= 0 && value <= _UI.maxLineWidth) {
        _UI.styleAsValid(document.getElementById("minLineWidthInput"));
        let alsoTrySettingMaxLineWidth = value !== _UI.minLineWidth;
        _UI.minLineWidth = value;
        if (alsoTrySettingMaxLineWidth) {
          let max = getInputValueById("maxLineWidthInput");
          _UI.tryToSetMaxLineWidth(max);
        }
      } else {
        _UI.styleAsInvalid(document.getElementById("minLineWidthInput"));
      }
    }
    static onMaxLineWidthInput(input) {
      let value = input.valueAsNumber;
      _UI.tryToSetMaxLineWidth(value);
    }
    static tryToSetMaxLineWidth(value) {
      if (!isNaN(value) && value >= 0 && value >= _UI.minLineWidth) {
        _UI.styleAsValid(document.getElementById("maxLineWidthInput"));
        let alsoTrySettingMinLineWidth = value !== _UI.maxLineWidth;
        _UI.maxLineWidth = value;
        if (alsoTrySettingMinLineWidth) {
          let min = getInputValueById("minLineWidthInput");
          _UI.tryToSetMinLineWidth(min);
        }
      } else {
        _UI.styleAsInvalid(document.getElementById("maxLineWidthInput"));
      }
    }
    static onFadeEffectInput(input) {
      _UI.fadeEffect = input.value;
    }
    static onFadeDirectionInput(input) {
      _UI.fadeDirection = input.value;
      _UI.shrinkRatio = _UI.getShrinkRatio(_UI.fadeSpeed, _UI.fadeDirection);
    }
    static onFadeSpeedInput(input) {
      let value = input.valueAsNumber;
      _UI.fadeSpeed = value;
      _UI.shrinkRatio = _UI.getShrinkRatio(_UI.fadeSpeed, _UI.fadeDirection);
    }
    static getShrinkRatio(fadeSpeed, fadeDirection) {
      switch (fadeDirection) {
        case "In" /* IN */:
          return fadeSpeed;
        case "Out" /* OUT */:
          return -fadeSpeed;
        case "None" /* NONE */:
          return 0;
      }
    }
    static onFadeOpacityInput(input) {
      let value = input.valueAsNumber;
      _UI.fadeOpacity = value;
    }
    static styleAsValid(input) {
      if (input.classList.contains(_UI.invalidInputClass)) {
        input.classList.remove(_UI.invalidInputClass);
      }
    }
    static styleAsInvalid(input) {
      if (!input.classList.contains(_UI.invalidInputClass)) {
        input.classList.add(_UI.invalidInputClass);
      }
    }
    static startDrawingPath() {
      _UI.drawingPath = true;
      _UI.path = [];
      _UI.pathDistances = [];
    }
    static endDrawingPath() {
      _UI.drawingPath = false;
      _UI.pathLength = 0;
      _UI.pathDistances.push(0);
      for (let i = 1; i < _UI.path.length; i++) {
        _UI.pathLength += distance(_UI.path[i - 1].x, _UI.path[i - 1].y, _UI.path[i].x, _UI.path[i].y);
        _UI.pathDistances.push(_UI.pathLength);
      }
    }
  };

  // pages/perceptrum-music-visualizer/src/index.ts
  var frameTimes = [];
  var maxFrameTimes = 20;
  var sampleNeighboorhood = 256;
  var fft = new import_fft.default(2 * sampleNeighboorhood);
  Song.initialize();
  window.ui = UI;
  UI.initialize();
  var ctx = UI.canvas.getContext("2d");
  var copyCanvas = document.createElement("canvas");
  copyCanvas.width = UI.width;
  copyCanvas.height = UI.height;
  var copyCtx = copyCanvas.getContext("2d");
  function draw() {
    ctx.clearRect(0, 0, UI.width, UI.height);
    let currentTimeMillis = performance.now();
    frameTimes.unshift(currentTimeMillis);
    while (frameTimes.length > maxFrameTimes) {
      frameTimes.splice(frameTimes.length - 1);
    }
    if (UI.drawingPath) {
      drawPath();
      drawCircleOnLastStop();
      drawCircleOnMousePosition();
      drawEscapeInstructions();
    } else if (Song.songState === 2 /* PLAYING */ || Song.songState === 3 /* PAUSED */) {
      switch (UI.fadeEffect) {
        case "On" /* ON */:
          drawCopyImage(UI.shrinkRatio, UI.fadeOpacity);
          break;
      }
      let audioTimeSeconds = Song.audioContext.currentTime - Song.playStartTime;
      let samplesPerSecond = Song.audioContext.sampleRate;
      let currentSample = Math.round(audioTimeSeconds * samplesPerSecond);
      let maxSample = Song.samples.length - 1;
      let low = Math.max(0, currentSample - sampleNeighboorhood + 1);
      let high = Math.min(currentSample + sampleNeighboorhood, maxSample);
      let sampleWindow = Song.samples.slice(low, high + 1);
      if (sampleWindow.length === 2 * sampleNeighboorhood) {
        let lineColor = getColor(sampleWindow, samplesPerSecond);
        let maxAmplitude = getMaxAmplitude(sampleWindow);
        let lineWidth = mapLinear(0, maxAmplitude, 1, UI.minLineWidth, UI.maxLineWidth);
        switch (UI.drawingMode) {
          case "Flat" /* FLAT */:
            drawFlatWaveform(sampleWindow, lineColor.getStyle(), lineWidth);
            break;
          case "Circle" /* CIRCLE */:
            drawCircularWaveform(sampleWindow, lineColor.getStyle(), lineWidth);
            break;
          case "Path" /* PATH */:
            if (UI.path === void 0 || UI.path.length === 0) {
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
      copyCanvas.height
    );
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
      let lastStop = UI.path[UI.path.length - 1];
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
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.restore();
  }
  function drawCopyImage(shrinkRatio, alpha) {
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
      copyCanvas.height - yShrink
    );
    ctx.restore();
  }
  function getMaxAmplitude(audioSamples) {
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
  function getFrequency(audioSamples, samplesPerSecond) {
    let fftOutput = [];
    fft.realTransform(fftOutput, audioSamples);
    let maxAbsValue = 0;
    let maxBinIndex;
    for (let i = 1; i < fftOutput.length; i++) {
      let absValue = Math.abs(fftOutput[i]);
      if (absValue > maxAbsValue) {
        maxAbsValue = absValue;
        maxBinIndex = i;
      }
    }
    return maxBinIndex * samplesPerSecond / fftOutput.length;
  }
  function getColor(sampleWindow, samplesPerSecond) {
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
    return HSLToRGB(hue, 1, 0.5);
  }
  function drawFlatWaveform(audioSamples, lineColor, lineWidth) {
    let distanceOut = UI.height * UI.flatAmplitudeMultipler / 2;
    let middle = UI.height / 2;
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
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.restore();
  }
  function drawCircularWaveform(audioSamples, lineColor, lineWidth) {
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
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.restore();
  }
  function drawWaveformOnPath(audioSamples, lineColor, lineWidth) {
    let drawAmplitude = 80 * UI.pathAmplitudeMultiplier;
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    for (let i = 0; i < audioSamples.length; i++) {
      let iDistance = mapLinear(0, i, audioSamples.length - 1, 0, UI.pathLength);
      let j = 0;
      while (UI.pathDistances[j] <= iDistance) {
        j++;
      }
      if (j >= UI.pathDistances.length) {
        j = UI.pathDistances.length - 1;
      }
      let centerX = mapLinear(UI.pathDistances[j - 1], iDistance, UI.pathDistances[j], UI.path[j - 1].x, UI.path[j].x);
      let centerY = mapLinear(UI.pathDistances[j - 1], iDistance, UI.pathDistances[j], UI.path[j - 1].y, UI.path[j].y);
      let sample = audioSamples[i];
      let currentPathLength = distance(UI.path[j - 1].x, UI.path[j - 1].y, UI.path[j].x, UI.path[j].y);
      let dy = (UI.path[j - 1].y - UI.path[j].y) / currentPathLength;
      let dx = (UI.path[j - 1].x - UI.path[j].x) / currentPathLength;
      let x = centerX - drawAmplitude * sample * dy;
      let y = centerY + drawAmplitude * sample * dx;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.restore();
  }
  window.requestAnimationFrame(draw);
})();
