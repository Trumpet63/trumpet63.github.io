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

  // pages/floating-arrows/src/fft.js
  var require_fft = __commonJS({
    "pages/floating-arrows/src/fft.js"(exports, module) {
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

  // pages/floating-arrows/src/util.ts
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

  // pages/floating-arrows/src/index.ts
  var import_fft = __toESM(require_fft());

  // pages/floating-arrows/src/song.ts
  var Song = class _Song {
    static initialize() {
      _Song.audioContext = new AudioContext();
      _Song.songState = 0 /* NONE */;
    }
  };

  // pages/floating-arrows/src/id3/genres.ts
  var genres = [
    "Blues",
    "Classic Rock",
    "Country",
    "Dance",
    "Disco",
    "Funk",
    "Grunge",
    "Hip-Hop",
    "Jazz",
    "Metal",
    "New Age",
    "Oldies",
    "Other",
    "Pop",
    "R&B",
    "Rap",
    "Reggae",
    "Rock",
    "Techno",
    "Industrial",
    "Alternative",
    "Ska",
    "Death Metal",
    "Pranks",
    "Soundtrack",
    "Euro-Techno",
    "Ambient",
    "Trip-Hop",
    "Vocal",
    "Jazz+Funk",
    "Fusion",
    "Trance",
    "Classical",
    "Instrumental",
    "Acid",
    "House",
    "Game",
    "Sound Clip",
    "Gospel",
    "Noise",
    "AlternRock",
    "Bass",
    "Soul",
    "Punk",
    "Space",
    "Meditative",
    "Instrumental Pop",
    "Instrumental Rock",
    "Ethnic",
    "Gothic",
    "Darkwave",
    "Techno-Industrial",
    "Electronic",
    "Pop-Folk",
    "Eurodance",
    "Dream",
    "Southern Rock",
    "Comedy",
    "Cult",
    "Gangsta Rap",
    "Top 40",
    "Christian Rap",
    "Pop / Funk",
    "Jungle",
    "Native American",
    "Cabaret",
    "New Wave",
    "Psychedelic",
    "Rave",
    "Showtunes",
    "Trailer",
    "Lo-Fi",
    "Tribal",
    "Acid Punk",
    "Acid Jazz",
    "Polka",
    "Retro",
    "Musical",
    "Rock & Roll",
    "Hard Rock",
    "Folk",
    "Folk-Rock",
    "National Folk",
    "Swing",
    "Fast  Fusion",
    "Bebob",
    "Latin",
    "Revival",
    "Celtic",
    "Bluegrass",
    "Avantgarde",
    "Gothic Rock",
    "Progressive Rock",
    "Psychedelic Rock",
    "Symphonic Rock",
    "Slow Rock",
    "Big Band",
    "Chorus",
    "Easy Listening",
    "Acoustic",
    "Humour",
    "Speech",
    "Chanson",
    "Opera",
    "Chamber Music",
    "Sonata",
    "Symphony",
    "Booty Bass",
    "Primus",
    "Porn Groove",
    "Satire",
    "Slow Jam",
    "Club",
    "Tango",
    "Samba",
    "Folklore",
    "Ballad",
    "Power Ballad",
    "Rhythmic Soul",
    "Freestyle",
    "Duet",
    "Punk Rock",
    "Drum Solo",
    "A Cappella",
    "Euro-House",
    "Dance Hall",
    "Goa",
    "Drum & Bass",
    "Club-House",
    "Hardcore",
    "Terror",
    "Indie",
    "BritPop",
    "Negerpunk",
    "Polsk Punk",
    "Beat",
    "Christian Gangsta Rap",
    "Heavy Metal",
    "Black Metal",
    "Crossover",
    "Contemporary Christian",
    "Christian Rock",
    "Merengue",
    "Salsa",
    "Thrash Metal",
    "Anime",
    "JPop",
    "Synthpop",
    "Rock/Pop"
  ];
  var genres_default = genres;

  // pages/floating-arrows/src/id3/util.ts
  function getString(view, length, offset = 0, raw) {
    let len = length || view.byteLength - offset;
    const useBuffer = typeof Buffer !== "undefined";
    if (len < 0) {
      len += view.byteLength;
    }
    const data = [];
    const limit = offset + len;
    for (let i = offset; i < limit; i++) {
      const current = view.getUint8(i);
      if (current === 0) {
        break;
      }
      data.push(current);
    }
    if (useBuffer) {
      return Buffer.from(data).toString();
    }
    const str = data.map((chr) => String.fromCharCode(chr)).join("");
    if (raw) {
      return str;
    }
    return decodeURIComponent(escape(str));
  }
  function getStringUtf16(view, length, offset = 0, bom) {
    let littleEndian = false;
    let len = length || view.byteLength - offset;
    const str = [];
    const useBuffer = typeof Buffer !== "undefined";
    if (len < 0) {
      len += view.byteLength;
    }
    if (offset + 1 > view.byteLength) {
      return "";
    }
    if (bom) {
      const bomInt = view.getUint16(offset);
      if (bomInt === 65534) {
        littleEndian = true;
      }
      offset += 2;
      len -= 2;
    }
    const limit = offset + len;
    for (let i = offset; i < limit; i += 2) {
      let ch = view.getUint16(i, littleEndian);
      try {
        if (i < limit - 1 && ch === 0 && view.getUint16(i + 1, littleEndian) === 0) {
          break;
        }
      } catch (e) {
        break;
      }
      if (ch >= 0 && ch <= 55295 || ch >= 57344 && ch <= 65535) {
        str.push(ch);
      } else if (ch >= 65536 && ch <= 1114111) {
        ch -= 65536;
        str.push(((1047552 & ch) >> 10) + 55296);
        str.push((1023 & ch) + 56320);
      }
    }
    if (useBuffer) {
      const buf = Buffer.alloc(str.length * 2);
      for (let i = 0; i < str.length; i++) {
        const chr = str[i];
        if (littleEndian) {
          buf.writeUInt16LE(chr, i * 2);
        } else {
          buf.writeUInt16BE(chr, i * 2);
        }
      }
      return buf.toString();
    }
    return String.fromCharCode.apply(
      null,
      new Uint16Array(str)
    );
  }
  function getSynch(num) {
    let out = 0;
    let mask = 2130706432;
    while (mask) {
      out >>= 1;
      out |= num & mask;
      mask >>= 8;
    }
    return out;
  }
  function getUint32Synch(view, offset = 0) {
    return getSynch(view.getUint32(offset));
  }
  function getUint24(view, offset = 0, littleEndian) {
    if (littleEndian) {
      return view.getUint8(offset) + (view.getUint8(offset + 1) << 8) + (view.getUint8(offset + 2) << 16);
    }
    return view.getUint8(offset + 2) + (view.getUint8(offset + 1) << 8) + (view.getUint8(offset) << 16);
  }

  // pages/floating-arrows/src/id3/id3Frame.ts
  var types = /* @__PURE__ */ new Map([
    /*
     * Textual frames
     */
    ["TALB", "album"],
    ["TBPM", "bpm"],
    ["TCOM", "composer"],
    ["TCON", "genre"],
    ["TCOP", "copyright"],
    ["TDEN", "encoding-time"],
    ["TDLY", "playlist-delay"],
    ["TDOR", "original-release-time"],
    ["TDRC", "recording-time"],
    ["TDRL", "release-time"],
    ["TDTG", "tagging-time"],
    ["TENC", "encoder"],
    ["TEXT", "writer"],
    ["TFLT", "file-type"],
    ["TIPL", "involved-people"],
    ["TIT1", "content-group"],
    ["TIT2", "title"],
    ["TIT3", "subtitle"],
    ["TKEY", "initial-key"],
    ["TLAN", "language"],
    ["TLEN", "length"],
    ["TMCL", "credits"],
    ["TMED", "media-type"],
    ["TMOO", "mood"],
    ["TOAL", "original-album"],
    ["TOFN", "original-filename"],
    ["TOLY", "original-writer"],
    ["TOPE", "original-artist"],
    ["TOWN", "owner"],
    ["TPE1", "artist"],
    ["TPE2", "band"],
    ["TPE3", "conductor"],
    ["TPE4", "remixer"],
    ["TPOS", "set-part"],
    ["TPRO", "produced-notice"],
    ["TPUB", "publisher"],
    ["TRCK", "track"],
    ["TRSN", "radio-name"],
    ["TRSO", "radio-owner"],
    ["TSOA", "album-sort"],
    ["TSOP", "performer-sort"],
    ["TSOT", "title-sort"],
    ["TSRC", "isrc"],
    ["TSSE", "encoder-settings"],
    ["TSST", "set-subtitle"],
    ["TYER", "year"],
    /*
     * Textual frames (<=2.2)
     */
    ["TAL", "album"],
    ["TBP", "bpm"],
    ["TCM", "composer"],
    ["TCO", "genre"],
    ["TCR", "copyright"],
    ["TDY", "playlist-delay"],
    ["TEN", "encoder"],
    ["TFT", "file-type"],
    ["TKE", "initial-key"],
    ["TLA", "language"],
    ["TLE", "length"],
    ["TMT", "media-type"],
    ["TOA", "original-artist"],
    ["TOF", "original-filename"],
    ["TOL", "original-writer"],
    ["TOT", "original-album"],
    ["TP1", "artist"],
    ["TP2", "band"],
    ["TP3", "conductor"],
    ["TP4", "remixer"],
    ["TPA", "set-part"],
    ["TPB", "publisher"],
    ["TRC", "isrc"],
    ["TRK", "track"],
    ["TSS", "encoder-settings"],
    ["TT1", "content-group"],
    ["TT2", "title"],
    ["TT3", "subtitle"],
    ["TXT", "writer"],
    ["TYE", "year"],
    /*
     * URL frames
     */
    ["WCOM", "url-commercial"],
    ["WCOP", "url-legal"],
    ["WOAF", "url-file"],
    ["WOAR", "url-artist"],
    ["WOAS", "url-source"],
    ["WORS", "url-radio"],
    ["WPAY", "url-payment"],
    ["WPUB", "url-publisher"],
    /*
     * URL frames (<=2.2)
     */
    ["WAF", "url-file"],
    ["WAR", "url-artist"],
    ["WAS", "url-source"],
    ["WCM", "url-commercial"],
    ["WCP", "url-copyright"],
    ["WPB", "url-publisher"],
    /*
     * Comment frame
     */
    ["COMM", "comments"],
    /*
     * Image frame
     */
    ["APIC", "image"],
    ["PIC", "image"],
    /*
     * Private frames
     */
    ["PRIV", "private"]
  ]);
  var imageTypes = [
    "other",
    "file-icon",
    "icon",
    "cover-front",
    "cover-back",
    "leaflet",
    "media",
    "artist-lead",
    "artist",
    "conductor",
    "band",
    "composer",
    "writer",
    "location",
    "during-recording",
    "during-performance",
    "screen",
    "fish",
    "illustration",
    "logo-band",
    "logo-publisher"
  ];
  function parseLegacy(buffer) {
    const result = {
      id: null,
      tag: null,
      value: null
    };
    const dv = new DataView(buffer);
    const header = {
      id: getString(dv, 3),
      type: getString(dv, 1),
      size: getUint24(dv, 3)
    };
    const matchedType = types.get(header.id);
    if (!matchedType) {
      return null;
    }
    result.id = header.id;
    result.tag = matchedType;
    if (header.type === "T") {
      let val = getString(dv, -7, 7);
      if (header.id === "TCO" && !!parseInt(val)) {
        val = genres_default[parseInt(val)];
      }
      result.value = val;
    } else if (header.type === "W") {
      result.value = getString(dv, -7, 7);
    } else if (header.id === "COM") {
      let val = getString(dv, -10, 10);
      if (val.indexOf("\0") !== -1) {
        val = val.substr(val.indexOf("\0") + 1);
      }
      result.value = val;
    } else if (header.id === "PIC") {
      const image = {
        type: null,
        mime: "image/" + getString(dv, 3, 7).toLowerCase(),
        description: null,
        data: null
      };
      image.type = imageTypes[dv.getUint8(11)] || "other";
      const variableStart = 11;
      let variableLength = 0;
      for (let i = variableStart; ; i++) {
        if (dv.getUint8(i) === 0) {
          variableLength = i - variableStart;
          break;
        }
      }
      image.description = variableLength === 0 ? null : getString(dv, variableLength, variableStart);
      image.data = buffer.slice(variableStart + 1);
      result.value = image;
    }
    return result.tag ? result : null;
  }
  function parse(buffer, major, minor) {
    minor = minor || 0;
    major = major || 4;
    const result = { id: null, tag: null, value: null };
    const dv = new DataView(buffer);
    if (major < 3) {
      return parseLegacy(buffer);
    }
    const header = {
      id: getString(dv, 4),
      type: getString(dv, 1),
      size: getUint32Synch(dv, 4),
      flags: [dv.getUint8(8), dv.getUint8(9)]
    };
    if (header.flags[1] !== 0) {
      return null;
    }
    const matchedType = types.get(header.id);
    if (!matchedType) {
      return null;
    }
    result.tag = matchedType;
    result.id = header.id;
    if (header.type === "T") {
      const encoding = dv.getUint8(10);
      let val = null;
      if (encoding === 0 || encoding === 3) {
        val = getString(dv, -11, 11);
      } else if (encoding === 1) {
        val = getStringUtf16(dv, -11, 11, true);
      } else if (encoding === 2) {
        val = getStringUtf16(dv, -11, 11);
      }
      if (header.id === "TCON" && val !== null && !!parseInt(val)) {
        val = genres_default[parseInt(val)];
      }
      result.value = val;
    } else if (header.type === "W") {
      result.value = getString(dv, -10, 10);
    } else if (header.id === "PRIV") {
      const variableStart = 10;
      let variableLength = 0;
      for (let i = 0; ; i++) {
        if (dv.getUint8(i) === 0) {
          variableLength = i - variableStart;
          break;
        }
      }
      result.value = {
        identifier: variableLength === 0 ? null : getString(dv, variableLength, variableStart),
        data: buffer.slice(variableLength + variableStart + 1)
      };
    } else if (header.id === "COMM") {
      const encoding = dv.getUint8(10);
      let variableStart = 14;
      for (let i = variableStart; ; i++) {
        if (encoding === 1 || encoding === 2) {
          if (dv.getUint16(i) === 0) {
            variableStart = i + 2;
            break;
          }
          i++;
        } else {
          if (dv.getUint8(i) === 0) {
            variableStart = i + 1;
            break;
          }
        }
      }
      if (encoding === 0 || encoding === 3) {
        result.value = getString(dv, -1 * variableStart, variableStart);
      } else if (encoding === 1) {
        result.value = getStringUtf16(
          dv,
          -1 * variableStart,
          variableStart,
          true
        );
      } else if (encoding === 2) {
        result.value = getStringUtf16(dv, -1 * variableStart, variableStart);
      }
    } else if (header.id === "APIC") {
      const encoding = dv.getUint8(10);
      const image = {
        type: null,
        mime: null,
        description: null,
        data: null
      };
      let variableStart = 11;
      let variableLength = 0;
      for (let i = variableStart; ; i++) {
        if (dv.getUint8(i) === 0) {
          variableLength = i - variableStart;
          break;
        }
      }
      image.mime = getString(dv, variableLength, variableStart);
      image.type = imageTypes[dv.getUint8(variableStart + variableLength + 1)] || "other";
      variableStart += variableLength + 2;
      variableLength = 0;
      for (let i = variableStart; ; i++) {
        if (dv.getUint8(i) === 0) {
          variableLength = i - variableStart;
          break;
        }
      }
      if (variableLength !== 0) {
        if (encoding === 0 || encoding === 3) {
          image.description = getString(dv, variableLength, variableStart);
        } else if (encoding === 1) {
          image.description = getStringUtf16(
            dv,
            variableLength,
            variableStart,
            true
          );
        } else if (encoding === 2) {
          image.description = getStringUtf16(dv, variableLength, variableStart);
        }
      }
      image.data = buffer.slice(variableStart + 1);
      result.value = image;
    }
    return result.tag ? result : null;
  }

  // pages/floating-arrows/src/id3/id3Tag.ts
  async function parse2(handle) {
    let tag = null;
    const v1HeaderBuf = await handle.read(128, handle.size - 128);
    const v1Header = new DataView(v1HeaderBuf);
    if (v1HeaderBuf.byteLength === 128 && getString(v1Header, 3, void 0, true) === "TAG") {
      tag = {
        kind: "v1",
        title: getString(v1Header, 30, 3).trim() || null,
        album: getString(v1Header, 30, 63).trim() || null,
        artist: getString(v1Header, 30, 33).trim() || null,
        year: getString(v1Header, 4, 93).trim() || null,
        genre: null,
        comment: null,
        track: null
      };
      if (v1Header.getUint8(125) === 0) {
        tag.comment = getString(v1Header, 28, 97);
        tag.version = 1.1;
        tag.track = v1Header.getUint8(126);
      } else {
        tag.comment = getString(v1Header, 30, 97);
      }
      tag.genre = genres_default[v1Header.getUint8(127)] || null;
    }
    const v2PrefixBuf = await handle.read(14, 0);
    const v2Prefix = new DataView(v2PrefixBuf);
    if (v2PrefixBuf.byteLength === 14 && getString(v2Prefix, 3, void 0, true) === "ID3" && v2Prefix.getUint8(3) <= 4) {
      let headerSize = 10;
      let tagSize = 0;
      const version = [v2Prefix.getUint8(3), v2Prefix.getUint8(4)];
      const tagFlags = v2Prefix.getUint8(5);
      if ((tagFlags & 128) === 0) {
        tag = {
          kind: "v2",
          title: tag ? tag.title : null,
          album: tag ? tag.album : null,
          artist: tag ? tag.artist : null,
          year: tag ? tag.year : null,
          version,
          frames: [],
          images: []
        };
        if ((tagFlags & 64) !== 0) {
          headerSize += getUint32Synch(v2Prefix, 11);
        }
        tagSize += getUint32Synch(v2Prefix, 6);
        const v2TagBuf = await handle.read(tagSize, headerSize);
        const v2Tag = new DataView(v2TagBuf);
        let position = 0;
        while (position < v2TagBuf.byteLength) {
          let slice;
          let isFrame = true;
          for (let i = 0; i < 3; i++) {
            const frameBit = v2Tag.getUint8(position + i);
            if ((frameBit < 65 || frameBit > 90) && (frameBit < 48 || frameBit > 57)) {
              isFrame = false;
            }
          }
          if (!isFrame) {
            break;
          }
          if (version[0] < 3) {
            slice = v2TagBuf.slice(
              position,
              position + 6 + getUint24(v2Tag, position + 3)
            );
          } else if (version[0] === 3) {
            slice = v2TagBuf.slice(
              position,
              position + 10 + v2Tag.getUint32(position + 4)
            );
          } else {
            slice = v2TagBuf.slice(
              position,
              position + 10 + getUint32Synch(v2Tag, position + 4)
            );
          }
          const frame = await parse(slice, version[0], version[1]);
          if (frame && frame.tag) {
            const tagAsV2 = tag;
            tagAsV2.frames.push(frame);
            if (frame.tag === "image") {
              tagAsV2.images.push(frame.value);
            } else {
              tag[frame.tag] = frame.value;
            }
          }
          position += slice.byteLength;
        }
      }
    }
    return tag;
  }

  // pages/floating-arrows/src/id3/reader.ts
  var Reader = class {
    constructor() {
      /**
       * Size of the resource
       */
      this.size = 0;
    }
    /**
     * Closes the resource
     * @return {Promise<void>}
     */
    async close() {
      return;
    }
    /**
     * Reads a specified range into a Blob
     * @param {number} length Number of bytes to read
     * @param {number} position Position to begin from
     * @param {string=} type Type of data to return
     * @return {Promise<Blob>}
     */
    async readBlob(length, position = 0, type = "application/octet-stream") {
      const data = await this.read(length, position);
      return new Blob([data], { type });
    }
  };

  // pages/floating-arrows/src/id3/browserFileReader.ts
  var BrowserFileReader = class extends Reader {
    /**
     * @param {File} file File to read
     */
    constructor(file) {
      super();
      this._file = file;
    }
    /** @inheritdoc */
    async open() {
      this.size = this._file.size;
    }
    /** @inheritdoc */
    async read(length, position) {
      const slice = this._file.slice(position, position + length);
      return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => {
          resolve(fr.result);
        };
        fr.onerror = () => {
          reject(new Error("File read failed"));
        };
        fr.readAsArrayBuffer(slice);
      });
    }
  };

  // pages/floating-arrows/src/id3/id3.ts
  var SUPPORTS_FILE = typeof window !== "undefined" && "File" in window && "FileReader" in window && typeof ArrayBuffer !== "undefined";
  async function fromReader(reader) {
    await reader.open();
    const tags = await parse2(reader);
    await reader.close();
    return tags;
  }
  function fromFile(file) {
    if (!SUPPORTS_FILE) {
      throw new Error(
        "Browser does not have support for the File API and/or ArrayBuffers"
      );
    }
    return fromReader(new BrowserFileReader(file));
  }

  // pages/floating-arrows/src/ui_context.ts
  var UI = class _UI {
    static {
      this.invalidInputClass = "invalidInput";
    }
    static initialize() {
      _UI.optionsMenuOpen = false;
      _UI.canvas = document.getElementById("mainCanvas");
      _UI.canvas.width = _UI.canvas.parentElement.clientWidth;
      _UI.canvas.height = _UI.canvas.parentElement.clientHeight;
      _UI.width = _UI.canvas.width;
      _UI.height = _UI.canvas.height;
      _UI.copyCanvas = document.createElement("canvas");
      _UI.copyCanvas.width = _UI.width;
      _UI.copyCanvas.height = _UI.height;
      _UI.volume = getInputValueById("volumeInput");
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
      fetch("floating-arrows/assets/HoliznaCC0 - Space!.mp3").then((response) => response.blob()).then((blob) => {
        let file = new File([blob], "demo.mp3", { type: blob.type });
        let dt = new DataTransfer();
        dt.items.add(file);
        fileSelector.files = dt.files;
        fileSelector.dispatchEvent(new Event("change", { bubbles: true }));
      });
    }
    static resizeCanvasToMatchViewport() {
      if (_UI.canvas.width !== _UI.canvas.parentElement.clientWidth || _UI.canvas.height !== _UI.canvas.parentElement.clientHeight) {
        _UI.canvas.width = _UI.canvas.parentElement.clientWidth;
        _UI.canvas.height = _UI.canvas.parentElement.clientHeight;
        _UI.width = _UI.canvas.width;
        _UI.height = _UI.canvas.height;
        _UI.copyCanvas.width = _UI.width;
        _UI.copyCanvas.height = _UI.height;
      }
    }
    static onCanvasClick(e) {
    }
    static onCanvasMouseMove(e) {
      _UI.mouseX = e.offsetX;
      _UI.mouseY = e.offsetY;
    }
    static onFileSelect(e) {
      this.files = e.target.files;
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
      if (Song.audioControl !== void 0) {
        Song.audioControl.onended = void 0;
      }
      this.loadCurrentSong();
    }
    static async loadCurrentSong() {
      switch (Song.songState) {
        case 0 /* NONE */:
        case 1 /* READY */:
          Song.songState = 0 /* NONE */;
          this.disableSongControls();
          break;
        case 3 /* PAUSED */:
          Song.songState = 0 /* NONE */;
          Song.audioControl.stop();
          Song.audioContext.resume();
          this.disableSongControls();
          break;
        case 2 /* PLAYING */:
          Song.songState = 0 /* NONE */;
          this.disableSongControls();
          document.getElementById("playPauseButton").innerText = "Play";
          Song.audioControl.stop();
          break;
      }
      let songIndex = this.playlist[this.currentPlaylistIndex];
      await fromFile(this.files[songIndex]).then((tags) => {
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
      return this.files[songIndex].arrayBuffer().then((arrayBuffer) => {
        return Song.audioContext.decodeAudioData(arrayBuffer);
      }).then((audioBuffer) => {
        Song.audioControl = Song.audioContext.createBufferSource();
        Song.audioControl.buffer = audioBuffer;
        Song.gainNode = Song.audioContext.createGain();
        Song.gainNode.gain.value = _UI.volume;
        Song.audioControl.connect(Song.gainNode);
        Song.gainNode.connect(Song.audioContext.destination);
        Song.samples = audioBuffer.getChannelData(0);
        Song.audioControl.onended = this.onSongPlayedThrough.bind(this);
        Song.songState = 1 /* READY */;
        this.enableSongControls();
      });
    }
    static disableSongControls() {
      document.getElementById("playPauseButton").disabled = true;
      document.getElementById("playlistBackButton").disabled = true;
      document.getElementById("playlistForwardButton").disabled = true;
    }
    static enableSongControls() {
      document.getElementById("playPauseButton").disabled = false;
      document.getElementById("playlistBackButton").disabled = false;
      document.getElementById("playlistForwardButton").disabled = false;
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
    static onPlaylistBackButtonClick() {
      this.currentPlaylistIndex = (this.currentPlaylistIndex - 1) % this.files.length;
      Song.audioControl.onended = void 0;
      this.loadCurrentSong().then(() => this.playCurrentSong());
    }
    static onPlaylistForwardButtonClick() {
      this.currentPlaylistIndex = (this.currentPlaylistIndex + 1) % this.files.length;
      Song.audioControl.onended = void 0;
      this.loadCurrentSong().then(() => this.playCurrentSong());
    }
    static playCurrentSong() {
      Song.audioControl.start();
      Song.songState = 2 /* PLAYING */;
      Song.playStartTime = Song.audioContext.currentTime;
      document.getElementById("playPauseButton").innerText = "Pause";
    }
    static onSongPlayedThrough() {
      this.currentPlaylistIndex = (this.currentPlaylistIndex + 1) % this.files.length;
      this.loadCurrentSong().then(() => this.playCurrentSong());
    }
    static onOptionsButtonClick() {
      _UI.optionsMenuOpen = !_UI.optionsMenuOpen;
      let optionsMenuDiv = document.getElementById("optionsMenuDiv");
      optionsMenuDiv.style.display = _UI.optionsMenuOpen ? "" : "none";
      let optionsButton = document.getElementById("optionsButton");
      optionsButton.innerText = "Options " + (_UI.optionsMenuOpen ? "\u25B2" : "\u25BC");
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
  };

  // pages/floating-arrows/src/arrow.ts
  var Arrow = class {
    constructor(initialCenterX, initialCenterY, size, initialRotation, opacity, velocityX, velocityY, angularVelocity) {
      this.logCounter = 0;
      this.initialCenterX = initialCenterX;
      this.initialCenterY = initialCenterY;
      this.size = size;
      this.initialRotation = initialRotation;
      this.opacity = opacity;
      this.velocityX = velocityX;
      this.velocityY = velocityY;
      this.angularVelocity = angularVelocity;
      this.centerX = this.initialCenterX;
      this.centerY = this.initialCenterY;
      this.rotation = this.initialRotation;
      this.radius = this.size / 2 * Math.SQRT2;
    }
    drawFromBase(ctx2, baseCanvas) {
      ctx2.save();
      ctx2.translate(this.centerX, this.centerY);
      ctx2.rotate(this.rotation);
      ctx2.translate(-this.centerX, -this.centerY);
      ctx2.globalAlpha = this.opacity;
      let destinationSize = baseCanvas.width * (this.size / BASE_ARROW_SIZE);
      let topLeftX = this.centerX - destinationSize / 2;
      let topLeftY = this.centerY - destinationSize / 2;
      ctx2.drawImage(
        baseCanvas,
        0,
        0,
        baseCanvas.width,
        baseCanvas.height,
        topLeftX,
        topLeftY,
        destinationSize,
        destinationSize
      );
      ctx2.restore();
    }
    getArrowTimeMillis(currentTimeMillis) {
      let millisOffset = mapLinear(MIN_ARROW_SIZE, this.size, MAX_ARROW_SIZE, -800, 0);
      return currentTimeMillis + millisOffset;
    }
    draw(ctx2, audioSamples, lineColor, lineWidth) {
      let thickness = this.size * 0.2;
      let topLeftX = this.centerX - this.size / 2;
      let topLeftY = this.centerY - this.size / 2;
      let topX = topLeftX + this.size / 2;
      let topY = topLeftY;
      let rightWingTopX = topLeftX + this.size;
      let rightWingTopY = topLeftY + this.size / 2;
      let rightWingBottomX = topLeftX + this.size - thickness * Math.SQRT1_2;
      let rightWingBottomY = topLeftY + this.size / 2 + thickness * Math.SQRT1_2;
      let rightArmpitX = topLeftX + this.size / 2 + thickness / 2;
      let rightArmpitY = topLeftY + thickness * Math.SQRT2 + thickness / 2;
      let baseRightX = topLeftX + this.size / 2 + thickness / 2;
      let baseRightY = topLeftY + this.size;
      let baseLeftX = topLeftX + this.size / 2 - thickness / 2;
      let baseLeftY = topLeftY + this.size;
      let leftArmpitX = topLeftX + this.size / 2 - thickness / 2;
      let leftArmpitY = topLeftY + thickness * Math.SQRT2 + thickness / 2;
      let leftWingBottomX = topLeftX + thickness * Math.SQRT1_2;
      let leftWingBottomY = topLeftY + this.size / 2 + thickness * Math.SQRT1_2;
      let leftWingTopX = topLeftX;
      let leftWingTopY = topLeftY + this.size / 2;
      let path = [];
      path.push({ x: topX, y: topY });
      path.push({ x: rightWingTopX, y: rightWingTopY });
      path.push({ x: rightWingBottomX, y: rightWingBottomY });
      path.push({ x: rightArmpitX, y: rightArmpitY });
      path.push({ x: baseRightX, y: baseRightY });
      path.push({ x: baseLeftX, y: baseLeftY });
      path.push({ x: leftArmpitX, y: leftArmpitY });
      path.push({ x: leftWingBottomX, y: leftWingBottomY });
      path.push({ x: leftWingTopX, y: leftWingTopY });
      path.push({ x: topX, y: topY });
      let pathLength = 0;
      let pathDistances = [];
      pathDistances.push(0);
      for (let i = 1; i < path.length; i++) {
        pathLength += distance(path[i - 1].x, path[i - 1].y, path[i].x, path[i].y);
        pathDistances.push(pathLength);
      }
      ctx2.save();
      ctx2.translate(this.centerX, this.centerY);
      ctx2.rotate(this.rotation);
      ctx2.translate(-this.centerX, -this.centerY);
      ctx2.globalAlpha = this.opacity;
      this.drawWaveformOnPath(
        ctx2,
        audioSamples,
        lineColor,
        lineWidth,
        path,
        pathDistances,
        pathLength
      );
      ctx2.restore();
    }
    drawWaveformOnPath(ctx2, audioSamples, lineColor, lineWidth, path, pathDistances, pathLength) {
      let drawAmplitude = 80 * 0.2;
      ctx2.save();
      ctx2.lineWidth = lineWidth;
      ctx2.strokeStyle = lineColor;
      ctx2.beginPath();
      for (let i = 0; i < audioSamples.length; i++) {
        let iDistance = mapLinear(0, i, audioSamples.length - 1, 0, pathLength);
        let j = 0;
        while (pathDistances[j] <= iDistance) {
          j++;
        }
        if (j >= pathDistances.length) {
          j = pathDistances.length - 1;
        }
        let centerX = mapLinear(pathDistances[j - 1], iDistance, pathDistances[j], path[j - 1].x, path[j].x);
        let centerY = mapLinear(pathDistances[j - 1], iDistance, pathDistances[j], path[j - 1].y, path[j].y);
        let sample = audioSamples[i];
        let currentPathLength = distance(path[j - 1].x, path[j - 1].y, path[j].x, path[j].y);
        let dy = (path[j - 1].y - path[j].y) / currentPathLength;
        let dx = (path[j - 1].x - path[j].x) / currentPathLength;
        let x = centerX - drawAmplitude * sample * dy;
        let y = centerY + drawAmplitude * sample * dx;
        if (i === 0) {
          ctx2.moveTo(x, y);
        } else {
          ctx2.lineTo(x, y);
        }
      }
      ctx2.stroke();
      ctx2.restore();
    }
    isInsideRectangle(rect) {
      let margin = this.size / 2 * Math.SQRT2;
      return rect.topLeftX - margin < this.centerX && rect.topLeftY - margin < this.centerY;
    }
  };

  // pages/floating-arrows/src/index.ts
  var frameTimes = [];
  var maxFrameTimes = 20;
  var desiredArrowsOnScreen;
  var sampleNeighboorhood = 256;
  var fft = new import_fft.default(2 * sampleNeighboorhood);
  Song.initialize();
  window.ui = UI;
  UI.initialize();
  var ctx = UI.canvas.getContext("2d");
  var copyCtx = UI.copyCanvas.getContext("2d");
  var arrows = [];
  var MIN_ARROW_SIZE = 15;
  var MAX_ARROW_SIZE = 80;
  var baseDirection = 5 / 4 * Math.PI;
  var lastAnimationUpdateMillis;
  function addRandomArrows() {
    for (let i = 0; i < 100; i++) {
      addRandomArrow(offscreenRandomPosition);
    }
  }
  function spawnInitialArrows() {
    for (let i = 0; i < desiredArrowsOnScreen * 0.75; i++) {
      addRandomArrow(initialRandomPosition);
    }
  }
  function spawnArrowOffscreen() {
    addRandomArrow(offscreenRandomPosition);
  }
  function addRandomArrow(positionRandomizer) {
    let size = mapLinear(0, Math.random(), 1, MIN_ARROW_SIZE, MAX_ARROW_SIZE);
    let direction = mapLinear(0, Math.random(), 1, baseDirection - 0.2, baseDirection + 0.2);
    let magnitude = mapLinear(0, Math.random(), 1, 1 + size / 2.1, 2 + size / 2.1);
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
        mapLinear(0, Math.random(), 1, -0.25, 0.25)
      )
    );
  }
  function initialRandomPosition() {
    let x = mapLinear(0, Math.random(), 1, 0, UI.width + 200);
    let y = mapLinear(0, Math.random(), 1, 0, UI.height + 200);
    return { x, y };
  }
  function offscreenRandomPosition() {
    let x;
    let y;
    let rightSideLength = UI.height + 100;
    let bottomSideLength = UI.width + 200;
    let rightSideSpawnProbability = rightSideLength / (rightSideLength + bottomSideLength);
    if (Math.random() < rightSideSpawnProbability) {
      x = mapLinear(0, Math.random(), 1, UI.width + 100, UI.width + 200);
      y = mapLinear(0, Math.random(), 1, 0, rightSideLength);
    } else {
      x = mapLinear(0, Math.random(), 1, 0, UI.width + 200);
      y = mapLinear(0, Math.random(), 1, UI.height + 100, bottomSideLength);
    }
    return { x, y };
  }
  var amplitudeAllowance = 80;
  var BASE_ARROW_SIZE = 100;
  var baseArrow = new Arrow(
    amplitudeAllowance + BASE_ARROW_SIZE / 2,
    amplitudeAllowance + BASE_ARROW_SIZE / 2,
    BASE_ARROW_SIZE,
    0,
    1,
    0,
    0,
    0
  );
  var arrowCanvas = document.createElement("canvas");
  arrowCanvas.width = BASE_ARROW_SIZE + 2 * amplitudeAllowance;
  arrowCanvas.height = BASE_ARROW_SIZE + 2 * amplitudeAllowance;
  var arrowCtx = arrowCanvas.getContext("2d");
  var pastArrowStates = [];
  var numArrowStates = 144;
  pastArrowStates.push({
    timeMillis: void 0,
    canvas: arrowCanvas,
    ctx: arrowCtx
  });
  for (let i = 1; i < numArrowStates; i++) {
    let canvas = document.createElement("canvas");
    canvas.width = arrowCanvas.width;
    canvas.height = arrowCanvas.height;
    let ctx2 = canvas.getContext("2d");
    pastArrowStates.push({
      timeMillis: void 0,
      canvas,
      ctx: ctx2
    });
  }
  function draw(currentTimeMillis) {
    UI.resizeCanvasToMatchViewport();
    desiredArrowsOnScreen = 150 * (UI.width * UI.height) / (800 * 800);
    ctx.clearRect(0, 0, UI.width, UI.height);
    frameTimes.unshift(currentTimeMillis);
    while (frameTimes.length > maxFrameTimes) {
      frameTimes.splice(frameTimes.length - 1);
    }
    if (Song.songState === 3 /* PAUSED */) {
      lastAnimationUpdateMillis = currentTimeMillis;
    }
    if (lastAnimationUpdateMillis === void 0) {
      lastAnimationUpdateMillis = currentTimeMillis;
      spawnInitialArrows();
    }
    switch (UI.fadeEffect) {
      case "On" /* ON */:
        drawCopyImage(UI.shrinkRatio, UI.fadeOpacity);
        break;
    }
    let samplesPerSecond = Song.audioContext.sampleRate;
    let sampleWindow;
    if (Song.songState === 1 /* READY */ || Song.songState === 0 /* NONE */) {
      sampleWindow = generateSilence(2 * sampleNeighboorhood);
    } else {
      let audioTimeSeconds = getAudioTimeSeconds();
      let currentSample = Math.round(audioTimeSeconds * samplesPerSecond);
      let maxSample = Song.samples.length - 1;
      let low = Math.max(0, currentSample - sampleNeighboorhood + 1);
      let high = Math.min(currentSample + sampleNeighboorhood, maxSample);
      sampleWindow = Song.samples.slice(low, high + 1);
      if (sampleWindow.length !== 2 * sampleNeighboorhood) {
        sampleWindow = generateSilence(2 * sampleNeighboorhood);
      }
    }
    let lineColor = getColor(sampleWindow, samplesPerSecond);
    let maxAmplitude = getMaxAmplitude(sampleWindow);
    let lineWidth = mapLinear(0, maxAmplitude, 1, UI.minLineWidth, UI.maxLineWidth);
    while (arrows.length < desiredArrowsOnScreen) {
      spawnArrowOffscreen();
    }
    let collisionCounter = 0;
    for (let i = 0; i < arrows.length; i++) {
      let arrow = arrows[i];
      let deltaTimeSeconds = (currentTimeMillis - lastAnimationUpdateMillis) / 1e3;
      let repelX = 0;
      let repelY = 0;
      for (let j = 0; j < arrows.length; j++) {
        if (j === i) {
          continue;
        }
        let arrow2 = arrows[j];
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
      arrow.centerX += deltaTimeSeconds * (arrow.velocityX + repelX);
      arrow.centerY += deltaTimeSeconds * (arrow.velocityY + repelY);
      arrow.rotation += deltaTimeSeconds * arrow.angularVelocity;
    }
    for (let i = 0; i < arrows.length; i++) {
      let arrow = arrows[i];
      if (!arrow.isInsideRectangle(
        {
          topLeftX: 0,
          topLeftY: 0,
          width: UI.canvas.width,
          height: UI.canvas.height
        }
      )) {
        arrows.splice(i, 1);
        i--;
      }
    }
    for (let i = pastArrowStates.length - 2; i >= 0; i--) {
      if (pastArrowStates[i].timeMillis === void 0) {
        continue;
      }
      pastArrowStates[i + 1].ctx.clearRect(0, 0, arrowCanvas.width, arrowCanvas.height);
      pastArrowStates[i + 1].ctx.drawImage(pastArrowStates[i].canvas, 0, 0);
      pastArrowStates[i + 1].timeMillis = pastArrowStates[i].timeMillis;
    }
    arrowCtx.clearRect(0, 0, arrowCanvas.width, arrowCanvas.height);
    baseArrow.draw(arrowCtx, sampleWindow, lineColor.getStyle(), lineWidth);
    pastArrowStates[0].timeMillis = currentTimeMillis;
    for (let i = 0; i < arrows.length; i++) {
      let arrow = arrows[i];
      let arrowTimeMillis = arrow.getArrowTimeMillis(currentTimeMillis);
      let j;
      for (j = 0; j < pastArrowStates.length; j++) {
        if (pastArrowStates[j].timeMillis === void 0) {
          j--;
          break;
        }
        if (pastArrowStates[j].timeMillis < arrowTimeMillis) {
          let distance1 = pastArrowStates[j - 1].timeMillis - arrowTimeMillis;
          let distance22 = arrowTimeMillis - pastArrowStates[j].timeMillis;
          if (distance1 < distance22) {
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
  function getAudioTimeSeconds() {
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
      UI.copyCanvas.height
    );
  }
  function drawFPS() {
    if (frameTimes.length > 1) {
      ctx.save();
      let elapsedTimeMillis = frameTimes[0] - frameTimes[1];
      let fps = 1e3 / elapsedTimeMillis;
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textBaseline = "bottom";
      let fpsCounter = "FPS: " + Math.round(fps).toString();
      ctx.fillText(fpsCounter, UI.width - 130, UI.height);
      ctx.restore();
    }
  }
  function drawCopyImage(shrinkRatio, alpha) {
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
      UI.copyCanvas.height - yShrink
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
  function generateSilence(numSamples) {
    let samples = [];
    for (let i = 0; i < numSamples; i++) {
      samples.push(0);
    }
    return samples;
  }
  window.requestAnimationFrame(draw);
})();
