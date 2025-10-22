var exports;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bevel_mode.ts":
/*!***************************!*\
  !*** ./src/bevel_mode.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BevelMode": () => (/* binding */ BevelMode)
/* harmony export */ });
var BevelMode;
(function (BevelMode) {
    BevelMode["NONE"] = "None";
    BevelMode["STRAIGHT"] = "Straight";
    BevelMode["CIRCULAR"] = "Circular";
})(BevelMode || (BevelMode = {}));


/***/ }),

/***/ "./src/color.ts":
/*!**********************!*\
  !*** ./src/color.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Color": () => (/* binding */ Color)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.ts");

class Color {
    constructor(r, g, b, a) {
        this.red = r;
        this.green = g;
        this.blue = b;
        this.alpha = a;
    }
    toString() {
        if (this.alpha === undefined) {
            return Color.getRGB(this.red, this.green, this.blue);
        }
        else {
            return Color.getRGBA(this.red, this.green, this.blue, this.alpha);
        }
    }
    darken(ratio) {
        return Color.lerpColor(this, new Color(0, 0, 0), ratio);
    }
    lighten(ratio) {
        return Color.lerpColor(this, new Color(255, 255, 255), ratio);
    }
    static getRGB(r, g, b) {
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    static getRGBA(r, g, b, a) {
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    }
    static lerpColor(lowerColor, upperColor, ratio) {
        return new Color((0,_util__WEBPACK_IMPORTED_MODULE_0__.lerp)(lowerColor.red, upperColor.red, ratio), (0,_util__WEBPACK_IMPORTED_MODULE_0__.lerp)(lowerColor.green, upperColor.green, ratio), (0,_util__WEBPACK_IMPORTED_MODULE_0__.lerp)(lowerColor.blue, upperColor.blue, ratio));
    }
    static fromHex(colorHex) {
        let red = Number("0x" + colorHex.slice(1, 3));
        let green = Number("0x" + colorHex.slice(3, 5));
        let blue = Number("0x" + colorHex.slice(5, 7));
        return new Color(red, green, blue);
    }
    clone() {
        return new Color(this.red, this.green, this.blue, this.alpha);
    }
    valueOf() {
        if (this.alpha === undefined) {
            return this.red.toString() + " " + this.green.toString() + " " + this.blue.toString();
        }
        else {
            return this.red.toString() + " " + this.green.toString() + " " + this.blue.toString() + " " + this.alpha.toString();
        }
    }
    toHex() {
        let redString = this.red.toString(16);
        if (redString.length < 2) {
            redString = "0" + redString;
        }
        let greenString = this.green.toString(16);
        if (greenString.length < 2) {
            greenString = "0" + greenString;
        }
        let blueString = this.blue.toString(16);
        if (blueString.length < 2) {
            blueString = "0" + blueString;
        }
        return "#" + redString + greenString + blueString;
    }
    changeLightness(lightnessRatio) {
        if (lightnessRatio === 0) {
            return this;
        }
        else if (lightnessRatio > 0) {
            return this.lighten(lightnessRatio);
        }
        else {
            return this.darken(-lightnessRatio);
        }
    }
}


/***/ }),

/***/ "./src/control_point.ts":
/*!******************************!*\
  !*** ./src/control_point.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ControlPoint": () => (/* binding */ ControlPoint),
/* harmony export */   "generateStandardControlPoints": () => (/* binding */ generateStandardControlPoints)
/* harmony export */ });
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ "./src/global.ts");
/* harmony import */ var _point_2d__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./point_2d */ "./src/point_2d.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/util.ts");



let HANDLE_SPACING_OUT = 0.06;
let HANDLE_SPACING_BETWEEN = 0.12;
class ControlPoint {
    constructor() {
        this.offsetRatio = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D(0, 0);
    }
}
function generateStandardControlPoints() {
    let controlPoints = [];
    controlPoints.push(generateTip());
    controlPoints.push(generateRightArmTop());
    controlPoints.push(generateRightArmBottom());
    controlPoints.push(generateRightArmpit());
    controlPoints.push(generateBaseRight());
    controlPoints.push(generateBaseLeft());
    controlPoints.push(generateLeftArmpit());
    controlPoints.push(generateLeftArmBottom());
    controlPoints.push(generateLeftArmTop());
    return controlPoints;
}
function generateTip() {
    let tip = new ControlPoint();
    tip.handle = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D(_global__WEBPACK_IMPORTED_MODULE_0__.ARROW_CANVAS_CENTER.x, _global__WEBPACK_IMPORTED_MODULE_0__.ARROW_CANVAS_CENTER.y - _global__WEBPACK_IMPORTED_MODULE_0__.SIZE / 2 - HANDLE_SPACING_OUT * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE);
    tip.update = function (controlPointUpdate) {
        this.sizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.sizeRatio, this.sizeRatio);
        this.thicknessRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.thicknessRatio, this.thicknessRatio);
        this.bevelSizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.bevelSizeRatio, this.bevelSizeRatio);
        let offsetXRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.offsetXRatio, this.offsetRatio.x);
        let offsetYRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.offsetYRatio, this.offsetRatio.y);
        let size = this.sizeRatio * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        let thickness = this.thicknessRatio * size;
        let bevelSize = this.bevelSizeRatio * size;
        this.offsetRatio.x = offsetXRatio;
        this.offsetRatio.y = offsetYRatio;
        let topLeft = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D((_global__WEBPACK_IMPORTED_MODULE_0__.SIZE - size) / 2, (_global__WEBPACK_IMPORTED_MODULE_0__.SIZE - size) / 2);
        topLeft.x += this.offsetRatio.x * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        topLeft.y += this.offsetRatio.y * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        tip.center = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D(topLeft.x + size / 2, topLeft.y);
    };
    return tip;
}
function generateRightArmTop() {
    let rightArmTop = new ControlPoint();
    rightArmTop.handle = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D(_global__WEBPACK_IMPORTED_MODULE_0__.ARROW_CANVAS_CENTER.x + _global__WEBPACK_IMPORTED_MODULE_0__.SIZE / 2 + HANDLE_SPACING_OUT * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE, _global__WEBPACK_IMPORTED_MODULE_0__.ARROW_CANVAS_CENTER.y);
    rightArmTop.update = function (controlPointUpdate) {
        this.sizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.sizeRatio, this.sizeRatio);
        this.thicknessRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.thicknessRatio, this.thicknessRatio);
        this.bevelSizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.bevelSizeRatio, this.bevelSizeRatio);
        let offsetXRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.offsetXRatio, this.offsetRatio.x);
        let offsetYRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.offsetYRatio, this.offsetRatio.y);
        let size = this.sizeRatio * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        let thickness = this.thicknessRatio * size;
        let bevelSize = this.bevelSizeRatio * size;
        this.offsetRatio.x = offsetXRatio;
        this.offsetRatio.y = offsetYRatio;
        let topLeft = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D((_global__WEBPACK_IMPORTED_MODULE_0__.SIZE - size) / 2, (_global__WEBPACK_IMPORTED_MODULE_0__.SIZE - size) / 2);
        topLeft.x += this.offsetRatio.x * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        topLeft.y += this.offsetRatio.y * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        let rightArmTopCenter = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D(topLeft.x + size, topLeft.y + size / 2);
        // rightArmTop.bevel1 = new Point2D(rightArmTopCenter.x - bevelSize * Math.SQRT1_2, rightArmTopCenter.y - bevelSize * Math.SQRT1_2)
        rightArmTop.center = rightArmTopCenter;
        // rightArmTop.bevel2 = new Point2D(rightArmTopCenter.x - bevelSize * Math.SQRT1_2, rightArmTopCenter.y + bevelSize * Math.SQRT1_2)
    };
    return rightArmTop;
}
function generateRightArmBottom() {
    let rightArmBottom = new ControlPoint();
    rightArmBottom.handle = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D(_global__WEBPACK_IMPORTED_MODULE_0__.ARROW_CANVAS_CENTER.x + _global__WEBPACK_IMPORTED_MODULE_0__.SIZE / 2 + HANDLE_SPACING_OUT * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE, _global__WEBPACK_IMPORTED_MODULE_0__.ARROW_CANVAS_CENTER.y + HANDLE_SPACING_BETWEEN * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE);
    rightArmBottom.update = function (controlPointUpdate) {
        this.sizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.sizeRatio, this.sizeRatio);
        this.thicknessRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.thicknessRatio, this.thicknessRatio);
        this.bevelSizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.bevelSizeRatio, this.bevelSizeRatio);
        let offsetXRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.offsetXRatio, this.offsetRatio.x);
        let offsetYRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.offsetYRatio, this.offsetRatio.y);
        let size = this.sizeRatio * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        let thickness = this.thicknessRatio * size;
        let bevelSize = this.bevelSizeRatio * size;
        this.offsetRatio.x = offsetXRatio;
        this.offsetRatio.y = offsetYRatio;
        let topLeft = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D((_global__WEBPACK_IMPORTED_MODULE_0__.SIZE - size) / 2, (_global__WEBPACK_IMPORTED_MODULE_0__.SIZE - size) / 2);
        topLeft.x += this.offsetRatio.x * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        topLeft.y += this.offsetRatio.y * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        let rightArmBottomCenter = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D(topLeft.x + size - thickness * Math.SQRT1_2, topLeft.y + size / 2 + thickness * Math.SQRT1_2);
        // rightArmBottom.bevel1 = new Point2D(rightArmBottomCenter.x + bevelSize * Math.SQRT1_2, rightArmBottomCenter.y - bevelSize * Math.SQRT1_2)
        rightArmBottom.center = rightArmBottomCenter;
        // rightArmBottom.bevel2 = new Point2D(rightArmBottomCenter.x - bevelSize * Math.SQRT1_2, rightArmBottomCenter.y - bevelSize * Math.SQRT1_2)
    };
    return rightArmBottom;
}
function generateRightArmpit() {
    let rightArmpit = new ControlPoint();
    rightArmpit.handle = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D(_global__WEBPACK_IMPORTED_MODULE_0__.ARROW_CANVAS_CENTER.x + _global__WEBPACK_IMPORTED_MODULE_0__.SIZE / 2 + HANDLE_SPACING_OUT * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE, _global__WEBPACK_IMPORTED_MODULE_0__.ARROW_CANVAS_CENTER.y + 2 * HANDLE_SPACING_BETWEEN * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE);
    rightArmpit.update = function (controlPointUpdate) {
        this.sizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.sizeRatio, this.sizeRatio);
        this.thicknessRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.thicknessRatio, this.thicknessRatio);
        this.bevelSizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.bevelSizeRatio, this.bevelSizeRatio);
        let offsetXRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.offsetXRatio, this.offsetRatio.x);
        let offsetYRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.offsetYRatio, this.offsetRatio.y);
        let size = this.sizeRatio * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        let thickness = this.thicknessRatio * size;
        let bevelSize = this.bevelSizeRatio * size;
        this.offsetRatio.x = offsetXRatio;
        this.offsetRatio.y = offsetYRatio;
        let topLeft = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D((_global__WEBPACK_IMPORTED_MODULE_0__.SIZE - size) / 2, (_global__WEBPACK_IMPORTED_MODULE_0__.SIZE - size) / 2);
        topLeft.x += this.offsetRatio.x * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        topLeft.y += this.offsetRatio.y * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        let rightArmpitCenter = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D(topLeft.x + size / 2 + thickness / 2, topLeft.y + thickness * Math.SQRT2 + thickness / 2);
        // rightArmpit.bevel1 = new Point2D(rightArmpitCenter.x + bevelSize * Math.SQRT1_2, rightArmpitCenter.y + bevelSize * Math.SQRT1_2)
        rightArmpit.center = rightArmpitCenter;
        // rightArmpit.bevel2 = new Point2D(rightArmpitCenter.x, rightArmpitCenter.y + bevelSize)
    };
    return rightArmpit;
}
function generateBaseRight() {
    let baseRight = new ControlPoint();
    baseRight.handle = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D(_global__WEBPACK_IMPORTED_MODULE_0__.ARROW_CANVAS_CENTER.x + HANDLE_SPACING_BETWEEN / 2 * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE, _global__WEBPACK_IMPORTED_MODULE_0__.ARROW_CANVAS_CENTER.y + _global__WEBPACK_IMPORTED_MODULE_0__.SIZE / 2 + HANDLE_SPACING_OUT * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE);
    baseRight.update = function (controlPointUpdate) {
        this.sizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.sizeRatio, this.sizeRatio);
        this.thicknessRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.thicknessRatio, this.thicknessRatio);
        this.bevelSizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.bevelSizeRatio, this.bevelSizeRatio);
        let offsetXRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.offsetXRatio, this.offsetRatio.x);
        let offsetYRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.offsetYRatio, this.offsetRatio.y);
        let size = this.sizeRatio * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        let thickness = this.thicknessRatio * size;
        let bevelSize = this.bevelSizeRatio * size;
        this.offsetRatio.x = offsetXRatio;
        this.offsetRatio.y = offsetYRatio;
        let topLeft = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D((_global__WEBPACK_IMPORTED_MODULE_0__.SIZE - size) / 2, (_global__WEBPACK_IMPORTED_MODULE_0__.SIZE - size) / 2);
        topLeft.x += this.offsetRatio.x * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        topLeft.y += this.offsetRatio.y * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        let baseRightCenter = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D(topLeft.x + size / 2 + thickness / 2, topLeft.y + size);
        // baseRight.bevel1 = new Point2D(baseRightCenter.x, baseRightCenter.y - bevelSize)
        baseRight.center = baseRightCenter;
        // baseRight.bevel2 = new Point2D(baseRightCenter.x - bevelSize, baseRightCenter.y)
    };
    return baseRight;
}
function generateBaseLeft() {
    let baseLeft = new ControlPoint();
    baseLeft.handle = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D(_global__WEBPACK_IMPORTED_MODULE_0__.ARROW_CANVAS_CENTER.x - HANDLE_SPACING_BETWEEN / 2 * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE, _global__WEBPACK_IMPORTED_MODULE_0__.ARROW_CANVAS_CENTER.y + _global__WEBPACK_IMPORTED_MODULE_0__.SIZE / 2 + HANDLE_SPACING_OUT * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE);
    baseLeft.update = function (controlPointUpdate) {
        this.sizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.sizeRatio, this.sizeRatio);
        this.thicknessRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.thicknessRatio, this.thicknessRatio);
        this.bevelSizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.bevelSizeRatio, this.bevelSizeRatio);
        let offsetXRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.offsetXRatio, this.offsetRatio.x);
        let offsetYRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.offsetYRatio, this.offsetRatio.y);
        let size = this.sizeRatio * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        let thickness = this.thicknessRatio * size;
        let bevelSize = this.bevelSizeRatio * size;
        this.offsetRatio.x = offsetXRatio;
        this.offsetRatio.y = offsetYRatio;
        let topLeft = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D((_global__WEBPACK_IMPORTED_MODULE_0__.SIZE - size) / 2, (_global__WEBPACK_IMPORTED_MODULE_0__.SIZE - size) / 2);
        topLeft.x += this.offsetRatio.x * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        topLeft.y += this.offsetRatio.y * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        let baseLeftCenter = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D(topLeft.x + size / 2 - thickness / 2, topLeft.y + size);
        // baseLeft.bevel1 = new Point2D(baseLeftCenter.x + bevelSize, baseLeftCenter.y)
        baseLeft.center = baseLeftCenter;
        // baseLeft.bevel2 = new Point2D(baseLeftCenter.x, baseLeftCenter.y - bevelSize)
    };
    return baseLeft;
}
function generateLeftArmpit() {
    let leftArmpit = new ControlPoint();
    leftArmpit.handle = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D(_global__WEBPACK_IMPORTED_MODULE_0__.ARROW_CANVAS_CENTER.x - _global__WEBPACK_IMPORTED_MODULE_0__.SIZE / 2 - HANDLE_SPACING_OUT * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE, _global__WEBPACK_IMPORTED_MODULE_0__.ARROW_CANVAS_CENTER.y + 2 * HANDLE_SPACING_BETWEEN * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE);
    leftArmpit.update = function (controlPointUpdate) {
        this.sizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.sizeRatio, this.sizeRatio);
        this.thicknessRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.thicknessRatio, this.thicknessRatio);
        this.bevelSizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.bevelSizeRatio, this.bevelSizeRatio);
        let offsetXRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.offsetXRatio, this.offsetRatio.x);
        let offsetYRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.offsetYRatio, this.offsetRatio.y);
        let size = this.sizeRatio * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        let thickness = this.thicknessRatio * size;
        let bevelSize = this.bevelSizeRatio * size;
        this.offsetRatio.x = offsetXRatio;
        this.offsetRatio.y = offsetYRatio;
        let topLeft = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D((_global__WEBPACK_IMPORTED_MODULE_0__.SIZE - size) / 2, (_global__WEBPACK_IMPORTED_MODULE_0__.SIZE - size) / 2);
        topLeft.x += this.offsetRatio.x * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        topLeft.y += this.offsetRatio.y * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        let leftArmpitCenter = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D(topLeft.x + size / 2 - thickness / 2, topLeft.y + thickness * Math.SQRT2 + thickness / 2);
        // leftArmpit.bevel1 = new Point2D(leftArmpitCenter.x, leftArmpitCenter.y + bevelSize)
        leftArmpit.center = leftArmpitCenter;
        // leftArmpit.bevel2 = new Point2D(leftArmpitCenter.x - bevelSize * Math.SQRT1_2, leftArmpitCenter.y + bevelSize * Math.SQRT1_2)
    };
    return leftArmpit;
}
function generateLeftArmBottom() {
    let leftArmBottom = new ControlPoint();
    leftArmBottom.handle = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D(_global__WEBPACK_IMPORTED_MODULE_0__.ARROW_CANVAS_CENTER.x - _global__WEBPACK_IMPORTED_MODULE_0__.SIZE / 2 - HANDLE_SPACING_OUT * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE, _global__WEBPACK_IMPORTED_MODULE_0__.ARROW_CANVAS_CENTER.y + HANDLE_SPACING_BETWEEN * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE);
    leftArmBottom.update = function (controlPointUpdate) {
        this.sizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.sizeRatio, this.sizeRatio);
        this.thicknessRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.thicknessRatio, this.thicknessRatio);
        this.bevelSizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.bevelSizeRatio, this.bevelSizeRatio);
        let offsetXRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.offsetXRatio, this.offsetRatio.x);
        let offsetYRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.offsetYRatio, this.offsetRatio.y);
        let size = this.sizeRatio * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        let thickness = this.thicknessRatio * size;
        let bevelSize = this.bevelSizeRatio * size;
        this.offsetRatio.x = offsetXRatio;
        this.offsetRatio.y = offsetYRatio;
        let topLeft = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D((_global__WEBPACK_IMPORTED_MODULE_0__.SIZE - size) / 2, (_global__WEBPACK_IMPORTED_MODULE_0__.SIZE - size) / 2);
        topLeft.x += this.offsetRatio.x * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        topLeft.y += this.offsetRatio.y * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        let leftArmBottomCenter = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D(topLeft.x + thickness * Math.SQRT1_2, topLeft.y + size / 2 + thickness * Math.SQRT1_2);
        // leftArmBottom.bevel1 = new Point2D(leftArmBottomCenter.x + bevelSize * Math.SQRT1_2, leftArmBottomCenter.y - bevelSize * Math.SQRT1_2)
        leftArmBottom.center = leftArmBottomCenter;
        // leftArmBottom.bevel2 = new Point2D(leftArmBottomCenter.x - bevelSize * Math.SQRT1_2, leftArmBottomCenter.y - bevelSize * Math.SQRT1_2)
    };
    return leftArmBottom;
}
function generateLeftArmTop() {
    let leftArmTop = new ControlPoint();
    leftArmTop.handle = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D(_global__WEBPACK_IMPORTED_MODULE_0__.ARROW_CANVAS_CENTER.x - _global__WEBPACK_IMPORTED_MODULE_0__.SIZE / 2 - HANDLE_SPACING_OUT * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE, _global__WEBPACK_IMPORTED_MODULE_0__.ARROW_CANVAS_CENTER.y);
    leftArmTop.update = function (controlPointUpdate) {
        this.sizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.sizeRatio, this.sizeRatio);
        this.thicknessRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.thicknessRatio, this.thicknessRatio);
        this.bevelSizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.bevelSizeRatio, this.bevelSizeRatio);
        let offsetXRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.offsetXRatio, this.offsetRatio.x);
        let offsetYRatio = (0,_util__WEBPACK_IMPORTED_MODULE_2__.defaultIfUndefined)(controlPointUpdate.offsetYRatio, this.offsetRatio.y);
        let size = this.sizeRatio * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        let thickness = this.thicknessRatio * size;
        let bevelSize = this.bevelSizeRatio * size;
        this.offsetRatio.x = offsetXRatio;
        this.offsetRatio.y = offsetYRatio;
        let topLeft = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D((_global__WEBPACK_IMPORTED_MODULE_0__.SIZE - size) / 2, (_global__WEBPACK_IMPORTED_MODULE_0__.SIZE - size) / 2);
        topLeft.x += this.offsetRatio.x * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        topLeft.y += this.offsetRatio.y * _global__WEBPACK_IMPORTED_MODULE_0__.SIZE;
        let leftArmTopCenter = new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D(topLeft.x, topLeft.y + size / 2);
        // leftArmTop.bevel1 = new Point2D(leftArmTopCenter.x + bevelSize * Math.SQRT1_2, leftArmTopCenter.y + bevelSize * Math.SQRT1_2)
        leftArmTop.center = leftArmTopCenter;
        // leftArmTop.bevel2 = new Point2D(leftArmTopCenter.x + bevelSize * Math.SQRT1_2, leftArmTopCenter.y - bevelSize * Math.SQRT1_2)
    };
    return leftArmTop;
}


/***/ }),

/***/ "./src/control_point_handle.ts":
/*!*************************************!*\
  !*** ./src/control_point_handle.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ControlPointHandle": () => (/* binding */ ControlPointHandle),
/* harmony export */   "HANDLE_RADIUS": () => (/* binding */ HANDLE_RADIUS)
/* harmony export */ });
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color */ "./src/color.ts");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global */ "./src/global.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/util.ts");



let HANDLE_RADIUS = 0.02 * _global__WEBPACK_IMPORTED_MODULE_1__.SIZE;
let HANDLE_RADIUS_HOVERED = 0.03 * _global__WEBPACK_IMPORTED_MODULE_1__.SIZE;
class ControlPointHandle {
    constructor(x, y, layers, controlPoints) {
        this.x = x;
        this.y = y;
        this.layers = layers;
        this.controlPoints = controlPoints;
    }
    update() {
        this.isVisible = this.isSelected
            || (0,_util__WEBPACK_IMPORTED_MODULE_2__.pointIsWithinRectangle)(_global__WEBPACK_IMPORTED_MODULE_1__.MOUSE, _global__WEBPACK_IMPORTED_MODULE_1__.WIDTH / 2, 0.08 * _global__WEBPACK_IMPORTED_MODULE_1__.HEIGHT, _global__WEBPACK_IMPORTED_MODULE_1__.WIDTH / 2, 0.92 * _global__WEBPACK_IMPORTED_MODULE_1__.HEIGHT);
        // || (SIDEBAR_WIDTH < MOUSE.x && MOUSE.x < WIDTH
        //     && 0 < MOUSE.y && MOUSE.y < HEIGHT);
        if (!this.isVisible) {
            return;
        }
        this.isHovered = (0,_util__WEBPACK_IMPORTED_MODULE_2__.distance)(_global__WEBPACK_IMPORTED_MODULE_1__.MOUSE.x, _global__WEBPACK_IMPORTED_MODULE_1__.MOUSE.y, this.x, this.y) < HANDLE_RADIUS;
    }
    draw(ctx) {
        if (!this.isVisible) {
            return;
        }
        let radius = this.isHovered ? HANDLE_RADIUS_HOVERED : HANDLE_RADIUS;
        this.drawHandle(ctx, radius);
    }
    drawHandle(ctx, radius) {
        ctx.save();
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        if (this.isSelected) {
            ctx.fillStyle = _color__WEBPACK_IMPORTED_MODULE_0__.Color.getRGB(100, 100, 255);
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius * 0.7, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();
    }
}


/***/ }),

/***/ "./src/fill_layer.ts":
/*!***************************!*\
  !*** ./src/fill_layer.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FillLayer": () => (/* binding */ FillLayer)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.ts");
/* harmony import */ var _control_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./control_point */ "./src/control_point.ts");
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layer */ "./src/layer.ts");
/* harmony import */ var _layer_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layer_common */ "./src/layer_common.ts");
/* harmony import */ var _bevel_mode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bevel_mode */ "./src/bevel_mode.ts");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./global */ "./src/global.ts");






class FillLayer {
    constructor(name, isVisible, isSelected, sizeRatio, thicknessRatio, bevelSizeRatio, offsetRatio, baseColor, lightnessRatio) {
        this.type = _layer__WEBPACK_IMPORTED_MODULE_2__.LayerType.FILL;
        this.bevelMode = _bevel_mode__WEBPACK_IMPORTED_MODULE_4__.BevelMode.CIRCULAR;
        this.logCounter = 0;
        this.id = (0,_global__WEBPACK_IMPORTED_MODULE_5__.getNextLayerId)();
        this.name = name;
        this.isVisible = isVisible;
        this.isSelected = isSelected;
        this.sizeRatio = sizeRatio;
        this.thicknessRatio = thicknessRatio;
        this.bevelSizeRatio = bevelSizeRatio;
        this.offsetRatio = offsetRatio;
        this.baseColor = baseColor;
        this.lightnessRatio = lightnessRatio;
        this.color = this.baseColor.changeLightness(this.lightnessRatio);
        this.controlPoints = (0,_control_point__WEBPACK_IMPORTED_MODULE_1__.generateStandardControlPoints)();
        this.needsToBeRendered = false;
        let canvas = document.createElement("canvas");
        canvas.width = _global__WEBPACK_IMPORTED_MODULE_5__.SIZE;
        canvas.height = _global__WEBPACK_IMPORTED_MODULE_5__.SIZE;
        let ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.context = ctx;
        let previewCanvas = document.createElement("canvas");
        previewCanvas.width = _global__WEBPACK_IMPORTED_MODULE_5__.PREVIEW_SIZE;
        previewCanvas.height = _global__WEBPACK_IMPORTED_MODULE_5__.PREVIEW_SIZE;
        let previewContext = previewCanvas.getContext("2d");
        this.previewCanvas = previewCanvas;
        this.previewContext = previewContext;
        this.update({
            thicknessRatio: this.thicknessRatio,
            bevelSizeRatio: this.bevelSizeRatio,
            sizeRatio: this.sizeRatio,
            offsetXRatio: this.offsetRatio.x,
            offsetYRatio: this.offsetRatio.y,
        });
    }
    update(fillUpdate) {
        let thicknessRatio = (0,_util__WEBPACK_IMPORTED_MODULE_0__.defaultIfUndefined)(fillUpdate.thicknessRatio, this.thicknessRatio);
        let bevelSizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_0__.defaultIfUndefined)(fillUpdate.bevelSizeRatio, this.bevelSizeRatio);
        let sizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_0__.defaultIfUndefined)(fillUpdate.sizeRatio, this.sizeRatio);
        let offsetXRatio = (0,_util__WEBPACK_IMPORTED_MODULE_0__.defaultIfUndefined)(fillUpdate.offsetXRatio, this.offsetRatio.x);
        let offsetYRatio = (0,_util__WEBPACK_IMPORTED_MODULE_0__.defaultIfUndefined)(fillUpdate.offsetYRatio, this.offsetRatio.y);
        let baseColor = (0,_util__WEBPACK_IMPORTED_MODULE_0__.defaultIfUndefined)(fillUpdate.baseColor, this.baseColor);
        let lightnessRatio = (0,_util__WEBPACK_IMPORTED_MODULE_0__.defaultIfUndefined)(fillUpdate.lightnessRatio, this.lightnessRatio);
        this.thicknessRatio = thicknessRatio;
        this.bevelSizeRatio = bevelSizeRatio;
        this.sizeRatio = sizeRatio;
        this.offsetRatio.x = offsetXRatio;
        this.offsetRatio.y = offsetYRatio;
        this.baseColor = baseColor;
        this.lightnessRatio = lightnessRatio;
        this.color = this.baseColor.changeLightness(this.lightnessRatio);
        let controlPointUpdate = {};
        controlPointUpdate.thicknessRatio = fillUpdate.thicknessRatio;
        controlPointUpdate.bevelSizeRatio = fillUpdate.bevelSizeRatio;
        controlPointUpdate.sizeRatio = fillUpdate.sizeRatio;
        controlPointUpdate.offsetXRatio = fillUpdate.offsetXRatio;
        controlPointUpdate.offsetYRatio = fillUpdate.offsetYRatio;
        for (let i = 0; i < this.controlPoints.length; i++) {
            this.controlPoints[i].update(controlPointUpdate);
        }
        this.needsToBeRendered = true;
    }
    draw(destinationCtx, topLeftX, topLeftY) {
        if (this.needsToBeRendered) {
            this.render();
        }
        if (!this.isVisible) {
            return;
        }
        destinationCtx.drawImage(this.canvas, topLeftX, topLeftY);
    }
    drawResized(destinationCtx, destinationX, destinationSize, rotationDegrees) {
        if (this.needsToBeRendered) {
            this.render();
        }
        if (!this.isVisible) {
            return;
        }
        let centerX = destinationX + destinationSize / 2;
        let centerY = destinationSize / 2;
        destinationCtx.save();
        destinationCtx.translate(centerX, centerY);
        destinationCtx.rotate(rotationDegrees / 180 * Math.PI);
        destinationCtx.translate(-centerX, -centerY);
        destinationCtx.drawImage(this.canvas, destinationX, 0, destinationSize, destinationSize);
        destinationCtx.restore();
    }
    render() {
        this.renderMain();
        (0,_layer_common__WEBPACK_IMPORTED_MODULE_3__.renderPreview)(this.previewContext, this.canvas);
        this.needsToBeRendered = false;
    }
    renderMain() {
        let ctx = this.context;
        ctx.clearRect(0, 0, _global__WEBPACK_IMPORTED_MODULE_5__.SIZE, _global__WEBPACK_IMPORTED_MODULE_5__.SIZE);
        ctx.save();
        (0,_layer_common__WEBPACK_IMPORTED_MODULE_3__.calculateBevelPoints)(this.controlPoints);
        switch (this.bevelMode) {
            case _bevel_mode__WEBPACK_IMPORTED_MODULE_4__.BevelMode.NONE:
                (0,_layer_common__WEBPACK_IMPORTED_MODULE_3__.performNonePath)(ctx, this.controlPoints);
                break;
            case _bevel_mode__WEBPACK_IMPORTED_MODULE_4__.BevelMode.STRAIGHT:
                (0,_layer_common__WEBPACK_IMPORTED_MODULE_3__.performStraightPath)(ctx, this.controlPoints);
                break;
            case _bevel_mode__WEBPACK_IMPORTED_MODULE_4__.BevelMode.CIRCULAR:
                (0,_layer_common__WEBPACK_IMPORTED_MODULE_3__.performCircularPath)(ctx, this.controlPoints);
                break;
        }
        ctx.fillStyle = this.color.toString();
        ctx.fill();
        ctx.restore();
    }
}


/***/ }),

/***/ "./src/global.ts":
/*!***********************!*\
  !*** ./src/global.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ARROW_CANVAS_CENTER": () => (/* binding */ ARROW_CANVAS_CENTER),
/* harmony export */   "CHECKERBOARD_SIZE": () => (/* binding */ CHECKERBOARD_SIZE),
/* harmony export */   "HEIGHT": () => (/* binding */ HEIGHT),
/* harmony export */   "MOUSE": () => (/* binding */ MOUSE),
/* harmony export */   "PREVIEW_CHECKERBOARD_SIZE": () => (/* binding */ PREVIEW_CHECKERBOARD_SIZE),
/* harmony export */   "PREVIEW_SIZE": () => (/* binding */ PREVIEW_SIZE),
/* harmony export */   "SIDEBAR_WIDTH": () => (/* binding */ SIDEBAR_WIDTH),
/* harmony export */   "SIZE": () => (/* binding */ SIZE),
/* harmony export */   "WIDTH": () => (/* binding */ WIDTH),
/* harmony export */   "getNextLayerId": () => (/* binding */ getNextLayerId),
/* harmony export */   "initLayerIdCounter": () => (/* binding */ initLayerIdCounter),
/* harmony export */   "updateMousePosition": () => (/* binding */ updateMousePosition)
/* harmony export */ });
/* harmony import */ var _point_2d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point_2d */ "./src/point_2d.ts");

let WIDTH = 1689;
let HEIGHT = 950;
let SIZE = Math.floor(0.35 * WIDTH);
let ARROW_CANVAS_CENTER = new _point_2d__WEBPACK_IMPORTED_MODULE_0__.Point2D(WIDTH * 0.75, (HEIGHT * 1.08) * 0.50);
let CHECKERBOARD_SIZE = Math.ceil(0.04 * SIZE);
let PREVIEW_SIZE = Math.floor(0.0485 * WIDTH);
let PREVIEW_CHECKERBOARD_SIZE = Math.ceil(0.04 * PREVIEW_SIZE);
let MOUSE = new _point_2d__WEBPACK_IMPORTED_MODULE_0__.Point2D(-1, -1);
let SIDEBAR_WIDTH = 780;
let LAYER_ID_COUNTER = 0;
function getNextLayerId() {
    LAYER_ID_COUNTER++;
    return LAYER_ID_COUNTER;
}
function initLayerIdCounter(value) {
    LAYER_ID_COUNTER = value;
}
function updateMousePosition(e) {
    MOUSE.x = e.clientX;
    MOUSE.y = e.clientY;
}


/***/ }),

/***/ "./src/layer.ts":
/*!**********************!*\
  !*** ./src/layer.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LayerType": () => (/* binding */ LayerType)
/* harmony export */ });
var LayerType;
(function (LayerType) {
    LayerType["LINE"] = "Line";
    LayerType["FILL"] = "Fill";
})(LayerType || (LayerType = {}));


/***/ }),

/***/ "./src/layer_common.ts":
/*!*****************************!*\
  !*** ./src/layer_common.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "calculateBevelPoints": () => (/* binding */ calculateBevelPoints),
/* harmony export */   "performCircularPath": () => (/* binding */ performCircularPath),
/* harmony export */   "performNonePath": () => (/* binding */ performNonePath),
/* harmony export */   "performStraightPath": () => (/* binding */ performStraightPath),
/* harmony export */   "renderPreview": () => (/* binding */ renderPreview)
/* harmony export */ });
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ "./src/global.ts");
/* harmony import */ var _ui_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui_util */ "./src/ui_util.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./src/util.ts");



// Define bevel points as linear interpolations between control points
// The only trick to letting the user define a ratio is to limit the distance
// to that of the nearest adjacent point
function calculateBevelPoints(controlPoints) {
    for (let i = 0; i < controlPoints.length; i++) {
        let current = controlPoints[i];
        let nextIndex = (i + 1) % controlPoints.length;
        let next = controlPoints[nextIndex];
        let previousIndex = i - 1 === -1 ? controlPoints.length - 1 : i - 1;
        let previous = controlPoints[previousIndex];
        let distanceToPrevious = (0,_util__WEBPACK_IMPORTED_MODULE_2__.distance)(current.center.x, current.center.y, previous.center.x, previous.center.y);
        let distanceToNext = (0,_util__WEBPACK_IMPORTED_MODULE_2__.distance)(current.center.x, current.center.y, next.center.x, next.center.y);
        let smallerDistance = Math.min(distanceToPrevious, distanceToNext);
        // let bevelRatio: number = 0.5;
        let bevelRatio = controlPoints[i].bevelSizeRatio;
        let distanceToGo = smallerDistance * bevelRatio;
        current.bevel1 = (0,_util__WEBPACK_IMPORTED_MODULE_2__.lerpPoint)(current.center, previous.center, distanceToGo / distanceToPrevious);
        current.bevel2 = (0,_util__WEBPACK_IMPORTED_MODULE_2__.lerpPoint)(current.center, next.center, distanceToGo / distanceToNext);
    }
}
function performNonePath(ctx, controlPoints) {
    ctx.beginPath();
    for (let i = 0; i < controlPoints.length; i++) {
        let cp = controlPoints[i];
        if (i === 0) {
            ctx.moveTo(cp.center.x, cp.center.y);
        }
        else {
            ctx.lineTo(cp.center.x, cp.center.y);
        }
    }
    ctx.closePath();
}
function performStraightPath(ctx, controlPoints) {
    ctx.beginPath();
    for (let i = 0; i < controlPoints.length; i++) {
        let cp = controlPoints[i];
        if (i === 0) {
            ctx.moveTo(cp.bevel1.x, cp.bevel1.y);
            ctx.lineTo(cp.center.x, cp.center.y);
            ctx.lineTo(cp.bevel2.x, cp.bevel2.y);
        }
        else {
            ctx.lineTo(cp.bevel1.x, cp.bevel1.y);
            ctx.lineTo(cp.center.x, cp.center.y);
            ctx.lineTo(cp.bevel2.x, cp.bevel2.y);
        }
    }
    ctx.closePath();
}
function performCircularPath(ctx, controlPoints) {
    ctx.beginPath();
    for (let i = 0; i < controlPoints.length; i++) {
        let cp = controlPoints[i];
        if (i === 0) {
            ctx.moveTo(cp.bevel1.x, cp.bevel1.y);
            let radius = 0.5 * (0,_util__WEBPACK_IMPORTED_MODULE_2__.distance)(cp.bevel1.x, cp.bevel1.y, cp.bevel2.x, cp.bevel2.y);
            ctx.arcTo(cp.center.x, cp.center.y, cp.bevel2.x, cp.bevel2.y, radius);
            ctx.lineTo(cp.bevel2.x, cp.bevel2.y);
        }
        else {
            ctx.lineTo(cp.bevel1.x, cp.bevel1.y);
            let radius = 0.5 * (0,_util__WEBPACK_IMPORTED_MODULE_2__.distance)(cp.bevel1.x, cp.bevel1.y, cp.bevel2.x, cp.bevel2.y);
            ctx.arcTo(cp.center.x, cp.center.y, cp.bevel2.x, cp.bevel2.y, radius);
            ctx.lineTo(cp.bevel2.x, cp.bevel2.y);
        }
    }
    ctx.closePath();
}
function renderPreview(previewContext, sourceCanvas) {
    let ctx = previewContext;
    ctx.clearRect(0, 0, _global__WEBPACK_IMPORTED_MODULE_0__.PREVIEW_SIZE, _global__WEBPACK_IMPORTED_MODULE_0__.PREVIEW_SIZE);
    (0,_ui_util__WEBPACK_IMPORTED_MODULE_1__.fillWithTransparencyCheckerboard)(ctx, 0, 0, _global__WEBPACK_IMPORTED_MODULE_0__.PREVIEW_SIZE, _global__WEBPACK_IMPORTED_MODULE_0__.PREVIEW_SIZE, _global__WEBPACK_IMPORTED_MODULE_0__.PREVIEW_CHECKERBOARD_SIZE);
    ctx.drawImage(sourceCanvas, 0, 0, _global__WEBPACK_IMPORTED_MODULE_0__.PREVIEW_SIZE, _global__WEBPACK_IMPORTED_MODULE_0__.PREVIEW_SIZE);
}


/***/ }),

/***/ "./src/line_layer.ts":
/*!***************************!*\
  !*** ./src/line_layer.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LineLayer": () => (/* binding */ LineLayer)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.ts");
/* harmony import */ var _control_point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./control_point */ "./src/control_point.ts");
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layer */ "./src/layer.ts");
/* harmony import */ var _layer_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layer_common */ "./src/layer_common.ts");
/* harmony import */ var _bevel_mode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bevel_mode */ "./src/bevel_mode.ts");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./global */ "./src/global.ts");






class LineLayer {
    constructor(name, isVisible, isSelected, sizeRatio, thicknessRatio, lineWidthRatio, bevelSizeRatio, offsetRatio, baseColor, lightnessRatio) {
        this.type = _layer__WEBPACK_IMPORTED_MODULE_2__.LayerType.LINE;
        this.bevelMode = _bevel_mode__WEBPACK_IMPORTED_MODULE_4__.BevelMode.CIRCULAR;
        this.logCounter = 0;
        this.id = (0,_global__WEBPACK_IMPORTED_MODULE_5__.getNextLayerId)();
        this.name = name;
        this.isVisible = isVisible;
        this.isSelected = isSelected;
        this.sizeRatio = sizeRatio;
        this.thicknessRatio = thicknessRatio;
        this.lineWidthRatio = lineWidthRatio;
        this.bevelSizeRatio = bevelSizeRatio;
        this.offsetRatio = offsetRatio;
        this.baseColor = baseColor;
        this.lightnessRatio = lightnessRatio;
        this.color = this.baseColor.changeLightness(this.lightnessRatio);
        this.controlPoints = (0,_control_point__WEBPACK_IMPORTED_MODULE_1__.generateStandardControlPoints)();
        this.needsToBeRendered = false;
        let canvas = document.createElement("canvas");
        canvas.width = _global__WEBPACK_IMPORTED_MODULE_5__.SIZE;
        canvas.height = _global__WEBPACK_IMPORTED_MODULE_5__.SIZE;
        let ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.context = ctx;
        let previewCanvas = document.createElement("canvas");
        previewCanvas.width = _global__WEBPACK_IMPORTED_MODULE_5__.PREVIEW_SIZE;
        previewCanvas.height = _global__WEBPACK_IMPORTED_MODULE_5__.PREVIEW_SIZE;
        let previewContext = previewCanvas.getContext("2d");
        this.previewCanvas = previewCanvas;
        this.previewContext = previewContext;
        this.update({
            thicknessRatio: this.thicknessRatio,
            lineWidthRatio: this.lineWidthRatio,
            bevelSizeRatio: this.bevelSizeRatio,
            sizeRatio: this.sizeRatio,
            offsetXRatio: this.offsetRatio.x,
            offsetYRatio: this.offsetRatio.y,
        });
    }
    update(lineUpdate) {
        let thicknessRatio = (0,_util__WEBPACK_IMPORTED_MODULE_0__.defaultIfUndefined)(lineUpdate.thicknessRatio, this.thicknessRatio);
        let lineWidthRatio = (0,_util__WEBPACK_IMPORTED_MODULE_0__.defaultIfUndefined)(lineUpdate.lineWidthRatio, this.lineWidthRatio);
        let bevelSizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_0__.defaultIfUndefined)(lineUpdate.bevelSizeRatio, this.bevelSizeRatio);
        let sizeRatio = (0,_util__WEBPACK_IMPORTED_MODULE_0__.defaultIfUndefined)(lineUpdate.sizeRatio, this.sizeRatio);
        let offsetXRatio = (0,_util__WEBPACK_IMPORTED_MODULE_0__.defaultIfUndefined)(lineUpdate.offsetXRatio, this.offsetRatio.x);
        let offsetYRatio = (0,_util__WEBPACK_IMPORTED_MODULE_0__.defaultIfUndefined)(lineUpdate.offsetYRatio, this.offsetRatio.y);
        let baseColor = (0,_util__WEBPACK_IMPORTED_MODULE_0__.defaultIfUndefined)(lineUpdate.baseColor, this.baseColor);
        let lightnessRatio = (0,_util__WEBPACK_IMPORTED_MODULE_0__.defaultIfUndefined)(lineUpdate.lightnessRatio, this.lightnessRatio);
        this.thicknessRatio = thicknessRatio;
        this.lineWidthRatio = lineWidthRatio;
        this.bevelSizeRatio = bevelSizeRatio;
        this.sizeRatio = sizeRatio;
        this.offsetRatio.x = offsetXRatio;
        this.offsetRatio.y = offsetYRatio;
        this.baseColor = baseColor;
        this.lightnessRatio = lightnessRatio;
        this.color = this.baseColor.changeLightness(this.lightnessRatio);
        let controlPointUpdate = {};
        controlPointUpdate.thicknessRatio = lineUpdate.thicknessRatio;
        controlPointUpdate.bevelSizeRatio = lineUpdate.bevelSizeRatio;
        controlPointUpdate.sizeRatio = lineUpdate.sizeRatio;
        controlPointUpdate.offsetXRatio = lineUpdate.offsetXRatio;
        controlPointUpdate.offsetYRatio = lineUpdate.offsetYRatio;
        for (let i = 0; i < this.controlPoints.length; i++) {
            this.controlPoints[i].update(controlPointUpdate);
        }
        this.needsToBeRendered = true;
    }
    draw(destinationCtx, topLeftX, topLeftY) {
        if (this.needsToBeRendered) {
            this.render();
        }
        if (!this.isVisible) {
            return;
        }
        destinationCtx.drawImage(this.canvas, topLeftX, topLeftY);
    }
    drawResized(destinationCtx, destinationX, destinationSize, rotationDegrees) {
        if (this.needsToBeRendered) {
            this.render();
        }
        if (!this.isVisible) {
            return;
        }
        let centerX = destinationX + destinationSize / 2;
        let centerY = destinationSize / 2;
        destinationCtx.save();
        destinationCtx.translate(centerX, centerY);
        destinationCtx.rotate(rotationDegrees / 180 * Math.PI);
        destinationCtx.translate(-centerX, -centerY);
        destinationCtx.drawImage(this.canvas, destinationX, 0, destinationSize, destinationSize);
        destinationCtx.restore();
    }
    render() {
        this.renderMain();
        (0,_layer_common__WEBPACK_IMPORTED_MODULE_3__.renderPreview)(this.previewContext, this.canvas);
        this.needsToBeRendered = false;
    }
    renderMain() {
        let ctx = this.context;
        ctx.clearRect(0, 0, _global__WEBPACK_IMPORTED_MODULE_5__.SIZE, _global__WEBPACK_IMPORTED_MODULE_5__.SIZE);
        if (this.lineWidthRatio === 0) {
            return;
        }
        ctx.save();
        (0,_layer_common__WEBPACK_IMPORTED_MODULE_3__.calculateBevelPoints)(this.controlPoints);
        switch (this.bevelMode) {
            case _bevel_mode__WEBPACK_IMPORTED_MODULE_4__.BevelMode.NONE:
                (0,_layer_common__WEBPACK_IMPORTED_MODULE_3__.performNonePath)(ctx, this.controlPoints);
                break;
            case _bevel_mode__WEBPACK_IMPORTED_MODULE_4__.BevelMode.STRAIGHT:
                (0,_layer_common__WEBPACK_IMPORTED_MODULE_3__.performStraightPath)(ctx, this.controlPoints);
                break;
            case _bevel_mode__WEBPACK_IMPORTED_MODULE_4__.BevelMode.CIRCULAR:
                (0,_layer_common__WEBPACK_IMPORTED_MODULE_3__.performCircularPath)(ctx, this.controlPoints);
                break;
        }
        ctx.strokeStyle = this.color.toString();
        let size = _global__WEBPACK_IMPORTED_MODULE_5__.SIZE * this.sizeRatio;
        ctx.lineWidth = this.lineWidthRatio * size;
        ctx.stroke();
        ctx.restore();
        // ctx.save();
        // ctx.fillStyle = "blue";
        // for (let i = 0; i < this.controlPoints.length; i++) {
        //     let cp: ControlPoint = this.controlPoints[i];
        //     circle(ctx, cp.bevel1.x, cp.bevel1.y, 4);
        //     ctx.fill();
        //     circle(ctx, cp.center.x, cp.center.y, 4);
        //     ctx.fill();
        //     circle(ctx, cp.bevel2.x, cp.bevel2.y, 4);
        //     ctx.fill();
        // }
        // ctx.restore();
    }
}


/***/ }),

/***/ "./src/point_2d.ts":
/*!*************************!*\
  !*** ./src/point_2d.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Point2D": () => (/* binding */ Point2D)
/* harmony export */ });
class Point2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


/***/ }),

/***/ "./src/serialization.ts":
/*!******************************!*\
  !*** ./src/serialization.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deserializeConfig": () => (/* binding */ deserializeConfig),
/* harmony export */   "serializeConfig": () => (/* binding */ serializeConfig)
/* harmony export */ });
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color */ "./src/color.ts");
/* harmony import */ var _fill_layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fill_layer */ "./src/fill_layer.ts");
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layer */ "./src/layer.ts");
/* harmony import */ var _line_layer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./line_layer */ "./src/line_layer.ts");




function serializeConfig(config) {
    let serializedBeatFractionColors = [];
    for (let i = 0; i < config.beatFractionColors.length; i++) {
        let color = config.beatFractionColors[i];
        serializedBeatFractionColors.push({
            red: color.red,
            green: color.green,
            blue: color.blue,
            alpha: color.alpha,
        });
    }
    let serializedLayers = [];
    for (let i = 0; i < config.layers.length; i++) {
        if (config.layers[i].type === _layer__WEBPACK_IMPORTED_MODULE_2__.LayerType.FILL) {
            let tempLayer = config.layers[i];
            let controlPoints = getSerializedControlPoints(tempLayer);
            let fillLayer = {
                name: tempLayer.name,
                type: tempLayer.type,
                isVisible: tempLayer.isVisible,
                isSelected: tempLayer.isSelected,
                sizeRatio: tempLayer.sizeRatio,
                thicknessRatio: tempLayer.thicknessRatio,
                bevelSizeRatio: tempLayer.bevelSizeRatio,
                offsetRatio: tempLayer.offsetRatio,
                lightnessRatio: tempLayer.lightnessRatio,
                controlPoints: controlPoints,
            };
            serializedLayers.push(fillLayer);
        }
        else if (config.layers[i].type === _layer__WEBPACK_IMPORTED_MODULE_2__.LayerType.LINE) {
            let tempLayer = config.layers[i];
            let controlPoints = getSerializedControlPoints(tempLayer);
            let lineLayer = {
                name: tempLayer.name,
                type: tempLayer.type,
                isVisible: tempLayer.isVisible,
                isSelected: tempLayer.isSelected,
                sizeRatio: tempLayer.sizeRatio,
                thicknessRatio: tempLayer.thicknessRatio,
                lineWidthRatio: tempLayer.lineWidthRatio,
                bevelSizeRatio: tempLayer.bevelSizeRatio,
                offsetRatio: tempLayer.offsetRatio,
                lightnessRatio: tempLayer.lightnessRatio,
                controlPoints: controlPoints,
            };
            serializedLayers.push(lineLayer);
        }
        else {
            throw Error("The program can't serialize a layer with type: " + config.layers[i].type);
        }
    }
    let serializedConfig = {
        beatFractionColors: serializedBeatFractionColors,
        layers: serializedLayers
    };
    return JSON.stringify(serializedConfig);
}
function deserializeConfig(config) {
    let beatFractionColors = [];
    for (let i = 0; i < config.beatFractionColors.length; i++) {
        let tempColor = config.beatFractionColors[i];
        beatFractionColors.push(new _color__WEBPACK_IMPORTED_MODULE_0__.Color(tempColor.red, tempColor.green, tempColor.blue, tempColor.alpha));
    }
    let layers = [];
    for (let i = 0; i < config.layers.length; i++) {
        if (config.layers[i].type === _layer__WEBPACK_IMPORTED_MODULE_2__.LayerType.FILL) {
            let tempLayer = config.layers[i];
            let fillLayer = new _fill_layer__WEBPACK_IMPORTED_MODULE_1__.FillLayer(tempLayer.name, tempLayer.isVisible, tempLayer.isSelected, tempLayer.sizeRatio, tempLayer.thicknessRatio, tempLayer.bevelSizeRatio, tempLayer.offsetRatio, beatFractionColors[0], tempLayer.lightnessRatio);
            setControlPoints(fillLayer, tempLayer.controlPoints);
            layers.push(fillLayer);
        }
        else if (config.layers[i].type === _layer__WEBPACK_IMPORTED_MODULE_2__.LayerType.LINE) {
            let tempLayer = config.layers[i];
            let lineLayer = new _line_layer__WEBPACK_IMPORTED_MODULE_3__.LineLayer(tempLayer.name, tempLayer.isVisible, tempLayer.isSelected, tempLayer.sizeRatio, tempLayer.thicknessRatio, tempLayer.lineWidthRatio, tempLayer.bevelSizeRatio, tempLayer.offsetRatio, beatFractionColors[0], tempLayer.lightnessRatio);
            setControlPoints(lineLayer, tempLayer.controlPoints);
            layers.push(lineLayer);
        }
        else {
            throw Error("The program can't deserialize a layer with type: " + config.layers[i].type);
        }
    }
    return { beatFractionColors: beatFractionColors, layers: layers };
}
function setControlPoints(layer, serializedControlPoints) {
    for (let i = 0; i < serializedControlPoints.length; i++) {
        let cp = serializedControlPoints[i];
        layer.controlPoints[i].update({
            sizeRatio: cp.sizeRatio,
            thicknessRatio: cp.thicknessRatio,
            bevelSizeRatio: cp.bevelSizeRatio,
            offsetXRatio: cp.offsetRatio.x,
            offsetYRatio: cp.offsetRatio.y,
        });
    }
}
function getSerializedControlPoints(layer) {
    let controlPoints = [];
    for (let i = 0; i < layer.controlPoints.length; i++) {
        let cp = layer.controlPoints[i];
        controlPoints.push({
            sizeRatio: cp.sizeRatio,
            thicknessRatio: cp.thicknessRatio,
            bevelSizeRatio: cp.bevelSizeRatio,
            offsetRatio: cp.offsetRatio,
        });
    }
    return controlPoints;
}


/***/ }),

/***/ "./src/spritesheet.ts":
/*!****************************!*\
  !*** ./src/spritesheet.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Spritesheet": () => (/* binding */ Spritesheet)
/* harmony export */ });
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layer */ "./src/layer.ts");

class Spritesheet {
    static init(layers, beatFractionColors) {
        this.layers = layers;
        this.beatFractionColors = beatFractionColors;
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.setHeight(128);
        this.zoomRatio = 1.0;
        this.scrollXRatio = 0;
        this.rotationDegrees = 0;
        this.needsToBeRendered = true;
    }
    static render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.beatFractionColors.length; i++) {
            for (let j = 0; j < this.layers.length; j++) {
                if (i === this.beatFractionColors.length - 1
                    && this.layers[j].type !== _layer__WEBPACK_IMPORTED_MODULE_0__.LayerType.LINE) {
                    continue;
                }
                this.layers[j].update({ baseColor: this.beatFractionColors[i] });
                this.layers[j].drawResized(this.ctx, i * this.height, this.height, this.rotationDegrees);
            }
        }
        this.needsToBeRendered = false;
    }
    static draw(destinationCtx, x, y, width, height) {
        if (this.needsToBeRendered) {
            this.render();
        }
        destinationCtx.save();
        destinationCtx.imageSmoothingEnabled = false;
        destinationCtx.drawImage(this.canvas, x, y, width, height);
        destinationCtx.restore();
    }
    static renderSpritesToSeparateCanvases() {
        let canvases = [];
        for (let i = 0; i < this.beatFractionColors.length; i++) {
            let canvas = document.createElement("canvas");
            canvas.width = this.height;
            canvas.height = this.height;
            let ctx = canvas.getContext("2d");
            for (let j = 0; j < this.layers.length; j++) {
                if (i === this.beatFractionColors.length - 1
                    && this.layers[j].type !== _layer__WEBPACK_IMPORTED_MODULE_0__.LayerType.LINE) {
                    continue;
                }
                this.layers[j].update({ baseColor: this.beatFractionColors[i] });
                this.layers[j].drawResized(ctx, 0, this.height, this.rotationDegrees);
            }
            canvases.push(canvas);
        }
        return canvases;
    }
    static setHeight(newHeight) {
        this.height = newHeight;
        this.width = this.height * this.beatFractionColors.length;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.needsToBeRendered = true;
    }
}


/***/ }),

/***/ "./src/ui_util.ts":
/*!************************!*\
  !*** ./src/ui_util.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createBaseColorPicker": () => (/* binding */ createBaseColorPicker),
/* harmony export */   "createControlPanelButton": () => (/* binding */ createControlPanelButton),
/* harmony export */   "createLabeledRange": () => (/* binding */ createLabeledRange),
/* harmony export */   "createLabeledRangeWithoutWarning": () => (/* binding */ createLabeledRangeWithoutWarning),
/* harmony export */   "createLayerDisplay": () => (/* binding */ createLayerDisplay),
/* harmony export */   "createTopControlsButton": () => (/* binding */ createTopControlsButton),
/* harmony export */   "fillAroundRectangle": () => (/* binding */ fillAroundRectangle),
/* harmony export */   "fillWithTransparencyCheckerboard": () => (/* binding */ fillWithTransparencyCheckerboard)
/* harmony export */ });
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color */ "./src/color.ts");

function createLabeledRange(inputId, labelText, min, max, step, value, warning) {
    let div = document.createElement("div");
    div.classList.add("sliderDiv");
    document.body.appendChild(div);
    let labelDiv = document.createElement("div");
    labelDiv.classList.add("sliderLabelDiv");
    let label = document.createElement("label");
    label.htmlFor = inputId;
    label.innerText = labelText;
    labelDiv.appendChild(label);
    div.appendChild(labelDiv);
    let span = document.createElement("span");
    span.classList.add("sliderWarningSpan");
    if (warning) {
        let image = document.createElement("img");
        image.src = "notejive-noteskin-editor/assets/triangle-exclamation-solid-small-light.png";
        span.appendChild(image);
    }
    div.appendChild(span);
    let rangeDiv = document.createElement("div");
    rangeDiv.classList.add("sliderRangeDiv");
    let range = document.createElement("input");
    range.id = inputId;
    range.type = "range";
    range.min = min.toString();
    range.max = max.toString();
    range.step = step.toString();
    range.value = value.toString();
    rangeDiv.appendChild(range);
    div.appendChild(rangeDiv);
    let inputDiv = document.createElement("div");
    inputDiv.classList.add("sliderInputDiv");
    let input = document.createElement("input");
    input.value = value.toString();
    range.addEventListener("input", () => {
        input.value = range.value;
    });
    input.oninput = () => {
        if (stringInputIsFloat(input.value)) {
            range.value = input.value;
            range.dispatchEvent(new Event("input"));
        }
    };
    inputDiv.appendChild(input);
    div.appendChild(inputDiv);
    return div;
}
function createBaseColorPicker(inputId, labelText, value) {
    let div = document.createElement("div");
    div.id = "baseColorDiv";
    document.body.appendChild(div);
    let labelDiv = document.createElement("div");
    labelDiv.id = "baseColorLabelDiv";
    let label = document.createElement("label");
    label.htmlFor = inputId;
    label.innerText = labelText;
    labelDiv.appendChild(label);
    div.appendChild(labelDiv);
    let colorPickerDiv = document.createElement("div");
    colorPickerDiv.id = "baseColorPickerDiv";
    let colorPicker = document.createElement("input");
    colorPicker.id = inputId;
    colorPicker.type = "color";
    colorPicker.value = value.toString();
    colorPickerDiv.appendChild(colorPicker);
    div.appendChild(colorPickerDiv);
    let inputDiv = document.createElement("div");
    inputDiv.id = "baseColorInputDiv";
    let input = document.createElement("input");
    input.value = value.toString();
    colorPicker.addEventListener("input", () => {
        input.value = colorPicker.value;
    });
    input.oninput = () => {
        if (input.value.length === 7) {
            colorPicker.value = input.value;
            colorPicker.dispatchEvent(new Event("input"));
        }
    };
    inputDiv.appendChild(input);
    div.appendChild(inputDiv);
    return div;
}
// parseFloat and Number() are too permissive, because the second a valid
// number is input, it will ping back and replaces the input
let floatPattern = /^-?\d*\.?\d+$/;
function stringInputIsFloat(input) {
    return floatPattern.exec(input) !== null;
}
let visibilityEyeOnPath = "notejive-noteskin-editor/assets/eye-solid-light-small.png";
let visibilityEyeOffPath = "notejive-noteskin-editor/assets/eye-solid-light-small-dark.png";
function createLayerDisplay(layer) {
    let div = document.createElement("div");
    div.classList.add("layer");
    let selectedDiv = document.createElement("div");
    selectedDiv.classList.add("selectedButton");
    let selectedCheckbox = document.createElement("input");
    selectedCheckbox.type = "checkbox";
    selectedCheckbox.checked = layer.isSelected;
    selectedCheckbox.addEventListener("input", () => {
        layer.isSelected = selectedCheckbox.checked;
    });
    selectedDiv.appendChild(selectedCheckbox);
    div.appendChild(selectedDiv);
    let visibleDiv = document.createElement("div");
    visibleDiv.classList.add("visibilityButton");
    let image = document.createElement("img");
    if (layer.isVisible) {
        image.src = visibilityEyeOnPath;
        visibleDiv.appendChild(image);
    }
    else {
        image.src = visibilityEyeOffPath;
        visibleDiv.appendChild(image);
    }
    image.onclick = () => {
        layer.isVisible = !layer.isVisible;
        if (layer.isVisible) {
            image.src = visibilityEyeOnPath;
        }
        else {
            image.src = visibilityEyeOffPath;
        }
    };
    div.appendChild(visibleDiv);
    let previewDiv = document.createElement("div");
    previewDiv.classList.add("layerPreview");
    previewDiv.appendChild(layer.previewCanvas);
    div.appendChild(previewDiv);
    let labelDiv = document.createElement("div");
    labelDiv.classList.add("layerLabelDiv");
    let labelInput = document.createElement("input");
    labelInput.value = layer.name;
    labelInput.addEventListener("input", () => {
        layer.name = labelInput.value;
    });
    labelDiv.appendChild(labelInput);
    div.appendChild(labelDiv);
    return div;
}
function fillWithTransparencyCheckerboard(ctx, x, y, width, height, boxSize) {
    let numColumns = Math.ceil(width / boxSize);
    let numRows = Math.ceil(height / boxSize);
    let color1 = "white";
    let color2 = _color__WEBPACK_IMPORTED_MODULE_0__.Color.getRGB(185, 185, 185);
    ctx.save();
    ctx.fillStyle = color1;
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = color2;
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
            if ((i + j) % 2 == 0) {
                let boxX = x + j * boxSize;
                let boxY = y + i * boxSize;
                ctx.fillRect(boxX, boxY, boxSize, boxSize);
            }
        }
    }
    ctx.restore();
}
function fillAroundRectangle(ctx, x, y, rectWidth, rectHeight, canvasWidth, canvasHeight, color) {
    ctx.save();
    ctx.fillStyle = color.toString();
    ctx.fillRect(0, 0, canvasWidth, y);
    ctx.fillRect(0, 0, x, canvasHeight);
    ctx.fillRect(0, y + rectHeight, canvasWidth, canvasHeight - rectHeight - y);
    ctx.fillRect(x + rectWidth, 0, canvasWidth - rectWidth - x, canvasHeight);
    ctx.restore();
}
function createControlPanelButton(imageSource) {
    let div = document.createElement("div");
    div.classList.add("controlPanelButton");
    let button = document.createElement("input");
    button.type = "image";
    button.src = imageSource;
    div.appendChild(button);
    return div;
}
function createTopControlsButton(buttonLabel) {
    let div = document.createElement("div");
    div.classList.add("topControlsButton");
    let button = document.createElement("button");
    button.innerText = buttonLabel;
    div.appendChild(button);
    return div;
}
function createLabeledRangeWithoutWarning(inputId, labelText, min, max, step, value) {
    let div = document.createElement("div");
    div.classList.add("sliderDiv");
    document.body.appendChild(div);
    let labelDiv = document.createElement("div");
    labelDiv.classList.add("sliderLabelDiv");
    let label = document.createElement("label");
    label.htmlFor = inputId;
    label.innerText = labelText;
    labelDiv.appendChild(label);
    div.appendChild(labelDiv);
    let rangeDiv = document.createElement("div");
    rangeDiv.classList.add("sliderRangeDiv");
    let range = document.createElement("input");
    range.id = inputId;
    range.type = "range";
    range.min = min.toString();
    range.max = max.toString();
    range.step = step.toString();
    range.value = value.toString();
    rangeDiv.appendChild(range);
    div.appendChild(rangeDiv);
    let inputDiv = document.createElement("div");
    inputDiv.classList.add("sliderInputDiv");
    let input = document.createElement("input");
    input.value = value.toString();
    range.addEventListener("input", () => {
        input.value = range.value;
    });
    input.oninput = () => {
        if (stringInputIsFloat(input.value)) {
            range.value = input.value;
            range.dispatchEvent(new Event("input"));
        }
    };
    inputDiv.appendChild(input);
    div.appendChild(inputDiv);
    return div;
}


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HSLToRGB": () => (/* binding */ HSLToRGB),
/* harmony export */   "circle": () => (/* binding */ circle),
/* harmony export */   "defaultIfUndefined": () => (/* binding */ defaultIfUndefined),
/* harmony export */   "distance": () => (/* binding */ distance),
/* harmony export */   "downloadCanvasAsPng": () => (/* binding */ downloadCanvasAsPng),
/* harmony export */   "downloadStringAsJson": () => (/* binding */ downloadStringAsJson),
/* harmony export */   "enumKeys": () => (/* binding */ enumKeys),
/* harmony export */   "getInputValueById": () => (/* binding */ getInputValueById),
/* harmony export */   "interpolateColors": () => (/* binding */ interpolateColors),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "lerpPoint": () => (/* binding */ lerpPoint),
/* harmony export */   "mapLinear": () => (/* binding */ mapLinear),
/* harmony export */   "multiColorGradient": () => (/* binding */ multiColorGradient),
/* harmony export */   "pointIsWithinRectangle": () => (/* binding */ pointIsWithinRectangle)
/* harmony export */ });
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color */ "./src/color.ts");
/* harmony import */ var _point_2d__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./point_2d */ "./src/point_2d.ts");


// I think this is wrong because we assume fromEnd is greater than fromStart
function mapLinear(fromStart, value, fromEnd, toStart, toEnd) {
    if (toStart === toEnd) {
        return toStart;
    }
    let ratio = (value - fromStart) / (fromEnd - fromStart);
    let toValue = toStart + ratio * (toEnd - toStart);
    return toValue;
}
function interpolateColors(start, end, ratio) {
    return new _color__WEBPACK_IMPORTED_MODULE_0__.Color(ratio * (end.red - start.red) + start.red, ratio * (end.green - start.green) + start.green, ratio * (end.blue - start.blue) + start.blue);
}
function multiColorGradient(colorStops, ratio) {
    if (ratio <= 0) {
        return colorStops[0].color;
    }
    else if (ratio >= 1) {
        return colorStops[colorStops.length - 1].color;
    }
    let i = 0;
    while (colorStops[i].stopValue < ratio) {
        i++;
    }
    let lowerColorStop = colorStops[i - 1];
    let upperColorStop = colorStops[i];
    let newRatio = mapLinear(lowerColorStop.stopValue, ratio, upperColorStop.stopValue, 0, 1);
    return interpolateColors(lowerColorStop.color, upperColorStop.color, newRatio);
}
// hue is 0 - 360 degrees, saturation is 0 to 1, lightness is 0 to 1
// created based on wikipedia: https://en.wikipedia.org/wiki/HSL_and_HSV
function HSLToRGB(h, s, l) {
    let c = (1 - Math.abs(2 * l - 1)) * s; // c is chroma
    let h_prime = h / 60;
    let x = c * (1 - Math.abs(h_prime % 2 - 1));
    let tempColor;
    if (0 <= h_prime && h_prime < 1) {
        tempColor = new _color__WEBPACK_IMPORTED_MODULE_0__.Color(c, x, 0);
    }
    else if (1 <= h_prime && h_prime < 2) {
        tempColor = new _color__WEBPACK_IMPORTED_MODULE_0__.Color(x, c, 0);
    }
    else if (2 <= h_prime && h_prime < 3) {
        tempColor = new _color__WEBPACK_IMPORTED_MODULE_0__.Color(0, c, x);
    }
    else if (3 <= h_prime && h_prime < 4) {
        tempColor = new _color__WEBPACK_IMPORTED_MODULE_0__.Color(0, x, c);
    }
    else if (4 <= h_prime && h_prime < 5) {
        tempColor = new _color__WEBPACK_IMPORTED_MODULE_0__.Color(x, 0, c);
    }
    else if (5 <= h_prime && h_prime <= 6) {
        tempColor = new _color__WEBPACK_IMPORTED_MODULE_0__.Color(c, 0, x);
    }
    let m = l - c / 2;
    return new _color__WEBPACK_IMPORTED_MODULE_0__.Color(255 * (tempColor.red + m), 255 * (tempColor.green + m), 255 * (tempColor.blue + m));
}
function enumKeys(e) {
    return Object.keys(e);
}
function getInputValueById(id) {
    return document.getElementById(id).valueAsNumber;
}
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
    // return Math.hypot(y2 - y1, x2 - x1);
}
function defaultIfUndefined(value, defaultValue) {
    if (value === undefined) {
        return defaultValue;
    }
    return value;
}
function lerp(startValue, endValue, ratio) {
    if (ratio <= 0) {
        return startValue;
    }
    else if (ratio > 0 && ratio < 1) {
        return startValue + (endValue - startValue) * ratio;
    }
    else {
        return endValue;
    }
}
function lerpPoint(start, end, ratio) {
    return new _point_2d__WEBPACK_IMPORTED_MODULE_1__.Point2D(lerp(start.x, end.x, ratio), lerp(start.y, end.y, ratio));
}
function pointIsWithinRectangle(point, topLeftX, topLeftY, width, height) {
    return topLeftX < point.x && point.x < topLeftX + width
        && topLeftY < point.y && point.y < topLeftY + height;
}
function circle(ctx, centerX, centerY, radius) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.closePath();
}
function downloadCanvasAsPng(canvas, filename) {
    let dataURL = canvas.toDataURL("image/png");
    let downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
function downloadStringAsJson(contents, filename) {
    let blob = new Blob([contents], { type: "text/plain" });
    let downloadLink = document.createElement("a");
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color */ "./src/color.ts");
/* harmony import */ var _control_point_handle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./control_point_handle */ "./src/control_point_handle.ts");
/* harmony import */ var _fill_layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fill_layer */ "./src/fill_layer.ts");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global */ "./src/global.ts");
/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layer */ "./src/layer.ts");
/* harmony import */ var _line_layer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./line_layer */ "./src/line_layer.ts");
/* harmony import */ var _point_2d__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./point_2d */ "./src/point_2d.ts");
/* harmony import */ var _serialization__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./serialization */ "./src/serialization.ts");
/* harmony import */ var _spritesheet__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./spritesheet */ "./src/spritesheet.ts");
/* harmony import */ var _ui_util__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ui_util */ "./src/ui_util.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./util */ "./src/util.ts");











let canvas = document.getElementById("mainCanvas");
canvas.width = _global__WEBPACK_IMPORTED_MODULE_3__.WIDTH;
canvas.height = _global__WEBPACK_IMPORTED_MODULE_3__.HEIGHT;
let ctx = canvas.getContext("2d");
let topControlsDiv = document.getElementById("topControlsDiv");
let sidebarDiv = document.getElementById("sidebarDiv");
let baseColorDivContainer;
let headingDiv;
let optionsDiv;
let layersControlPanel;
let layersDisplay;
let defaultThicknessRatio = 0.25;
let defaultLineWidthRatio = 0.025;
let defaultBevelSizeRatio = 0.05;
let defaultSizeRatio = 1.0;
let defaultOffsetRatio = new _point_2d__WEBPACK_IMPORTED_MODULE_6__.Point2D(0, 0);
let defaultLineLightnessRatio = -1;
let defaultFillLightnessRatio = 0;
let createLinePath = "notejive-noteskin-editor/assets/square-full-regular.png";
let createLineDarkPath = "notejive-noteskin-editor/assets/square-full-regular-dark.png";
let createFillPath = "notejive-noteskin-editor/assets/square-full-solid.png";
let createFillDarkPath = "notejive-noteskin-editor/assets/square-full-solid-dark.png";
let deletePath = "notejive-noteskin-editor/assets/rectangle-xmark-solid.png";
let deleteDarkPath = "notejive-noteskin-editor/assets/rectangle-xmark-solid-dark.png";
let duplicatePath = "notejive-noteskin-editor/assets/clone-solid.png";
let duplicateDarkPath = "notejive-noteskin-editor/assets/clone-solid-dark.png";
let moveUpPath = "notejive-noteskin-editor/assets/up-long-solid.png";
let moveUpDarkPath = "notejive-noteskin-editor/assets/up-long-solid-dark.png";
let moveDownPath = "notejive-noteskin-editor/assets/down-long-solid.png";
let moveDownDarkPath = "notejive-noteskin-editor/assets/down-long-solid-dark.png";
let beatFractionNames = ["4th", "8th", "12th", "16th", "20th", "24th", "32nd", "48th", "64th", "96th", "128th", "192nd", "receptor"];
let currentBeatFractionIndex = 0;
let beatFractionColors = [
    new _color__WEBPACK_IMPORTED_MODULE_0__.Color(254, 0, 16),
    new _color__WEBPACK_IMPORTED_MODULE_0__.Color(0, 12, 254),
    new _color__WEBPACK_IMPORTED_MODULE_0__.Color(115, 0, 0),
    new _color__WEBPACK_IMPORTED_MODULE_0__.Color(252, 240, 1),
    new _color__WEBPACK_IMPORTED_MODULE_0__.Color(148, 148, 148),
    new _color__WEBPACK_IMPORTED_MODULE_0__.Color(252, 66, 215),
    new _color__WEBPACK_IMPORTED_MODULE_0__.Color(252, 64, 1),
    new _color__WEBPACK_IMPORTED_MODULE_0__.Color(188, 0, 194),
    new _color__WEBPACK_IMPORTED_MODULE_0__.Color(1, 252, 14),
    new _color__WEBPACK_IMPORTED_MODULE_0__.Color(229, 229, 229),
    new _color__WEBPACK_IMPORTED_MODULE_0__.Color(1, 231, 252),
    new _color__WEBPACK_IMPORTED_MODULE_0__.Color(33, 127, 1),
    new _color__WEBPACK_IMPORTED_MODULE_0__.Color(100, 100, 100), // receptor
];
let canvasBackgroundColor = new _color__WEBPACK_IMPORTED_MODULE_0__.Color(75, 75, 75);
let topControlsSelectedClass = "topControlsSelected";
var Page;
(function (Page) {
    Page[Page["BEAT_FRACTION"] = 0] = "BEAT_FRACTION";
    Page[Page["IMPORT_EXPORT"] = 1] = "IMPORT_EXPORT";
    Page[Page["RECEPTOR"] = 2] = "RECEPTOR";
})(Page || (Page = {}));
let currentPage = Page.BEAT_FRACTION;
for (let i = 0; i < beatFractionNames.length - 1; i++) {
    let topControlButtonDiv = (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.createTopControlsButton)(beatFractionNames[i]);
    if (i === 0) {
        topControlButtonDiv.classList.add(topControlsSelectedClass);
    }
    let topControlButton = topControlButtonDiv.querySelector("button");
    topControlButton.onclick = () => {
        deselectTopControls();
        topControlButtonDiv.classList.add(topControlsSelectedClass);
        if (currentPage !== Page.BEAT_FRACTION) {
            createUIForArrowEditing();
            updateBaseColorDisplay();
            updateHeadingText();
            updateOptionsDiv();
            updateLayersControlPanel();
            updateLayersDisplay();
        }
        updateCurrentBeatFraction(i);
        currentPage = Page.BEAT_FRACTION;
    };
    topControlsDiv.appendChild(topControlButtonDiv);
}
let receptorButtonDiv = document.createElement("div");
receptorButtonDiv.id = "receptorButtonDiv";
receptorButtonDiv.classList.add("topControlsButton");
let receptorButton = document.createElement("button");
receptorButton.innerText = "Receptor";
receptorButton.onclick = () => {
    deselectTopControls();
    receptorButtonDiv.classList.add(topControlsSelectedClass);
    createReceptorUI();
    updateCurrentBeatFraction(beatFractionColors.length - 1);
    currentPage = Page.RECEPTOR;
};
receptorButtonDiv.appendChild(receptorButton);
topControlsDiv.appendChild(receptorButtonDiv);
let importExportButtonDiv = document.createElement("div");
importExportButtonDiv.id = "importExportButtonDiv";
importExportButtonDiv.classList.add("topControlsButton");
let importExportButton = document.createElement("button");
importExportButton.innerText = "Import/Export";
importExportButton.onclick = () => {
    deselectTopControls();
    importExportButtonDiv.classList.add(topControlsSelectedClass);
    createImportExportUI();
    currentPage = Page.IMPORT_EXPORT;
};
importExportButtonDiv.appendChild(importExportButton);
topControlsDiv.appendChild(importExportButtonDiv);
let lineLayer = getDefaultLineLayer();
let fillLayer = getDefaultFillLayer();
let layers = [fillLayer, lineLayer];
let lineLayers = [lineLayer];
let fillLayers = [fillLayer];
_spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.init(layers, beatFractionColors);
let controlPointHandles = [];
updateControlPointHandles();
createUIForArrowEditing();
updateBaseColorDisplay();
updateHeadingText();
updateOptionsDiv();
updateLayersControlPanel();
updateLayersDisplay();
window.addEventListener("mousemove", _global__WEBPACK_IMPORTED_MODULE_3__.updateMousePosition);
window.addEventListener("click", handleClick);
window.requestAnimationFrame(draw);
function deselectTopControls() {
    let buttonDivs = topControlsDiv.querySelectorAll("div");
    for (let i = 0; i < buttonDivs.length; i++) {
        buttonDivs[i].classList.remove(topControlsSelectedClass);
    }
}
function createUIForArrowEditing() {
    sidebarDiv.innerHTML = "";
    baseColorDivContainer = document.createElement("div");
    baseColorDivContainer.id = "baseColorDivContainer";
    sidebarDiv.appendChild(baseColorDivContainer);
    headingDiv = document.createElement("div");
    headingDiv.id = "headingDiv";
    sidebarDiv.appendChild(headingDiv);
    optionsDiv = document.createElement("div");
    optionsDiv.id = "optionsDiv";
    sidebarDiv.appendChild(optionsDiv);
    let layersDiv = document.createElement("div");
    layersDiv.id = "layersDiv";
    layersControlPanel = document.createElement("div");
    layersControlPanel.id = "layersControlPanel";
    layersDiv.appendChild(layersControlPanel);
    layersDisplay = document.createElement("div");
    layersDisplay.id = "layersDisplay";
    layersDiv.appendChild(layersDisplay);
    sidebarDiv.appendChild(layersDiv);
}
function updateBaseColorDisplay() {
    baseColorDivContainer.innerHTML = "";
    let colorPickerDiv = (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.createBaseColorPicker)("colorPicker", "Base Color", beatFractionColors[currentBeatFractionIndex].toHex());
    let colorPicker = colorPickerDiv.querySelector("input[type=color]");
    colorPicker.addEventListener("input", () => {
        let inputColor = _color__WEBPACK_IMPORTED_MODULE_0__.Color.fromHex(colorPicker.value);
        beatFractionColors[currentBeatFractionIndex] = inputColor;
        updateLayerBaseColors(inputColor);
    });
    baseColorDivContainer.appendChild(colorPickerDiv);
}
function updateCurrentBeatFraction(i) {
    currentBeatFractionIndex = i;
    updateBaseColorDisplay();
    updateLayerBaseColors(beatFractionColors[currentBeatFractionIndex]);
}
function updateLayerBaseColors(baseColor) {
    for (let i = 0; i < layers.length; i++) {
        layers[i].update({ baseColor: baseColor });
    }
    _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.needsToBeRendered = true;
}
function updateHeadingText() {
    let selectedHandles = getSelectedHandles();
    let headingText;
    if (selectedHandles.length > 0) {
        let layerIds = [];
        for (let i = 0; i < selectedHandles.length; i++) {
            for (let j = 0; j < selectedHandles[i].layers.length; j++) {
                let layer = selectedHandles[i].layers[j];
                if (!layerIds.includes(layer.id)) {
                    layerIds.push(layer.id);
                }
            }
        }
        let layersString = layerIds.length == 1 ? " layer" : " layers";
        let controlPointsString = selectedHandles.length == 1 ? " control point" : " control points";
        headingText = "Editing " + selectedHandles.length + controlPointsString + " in " + layerIds.length + layersString;
    }
    else {
        let selectedCount = 0;
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].isSelected) {
                selectedCount++;
            }
        }
        let layersString = selectedCount == 1 ? " layer" : " layers";
        headingText = "Editing " + selectedCount + layersString;
    }
    headingDiv.innerText = headingText;
}
function updateOptionsDiv() {
    let selectedHandles = getSelectedHandles();
    let thicknessRatio = undefined;
    let thicknessRatioWarning = false;
    let lineWidthRatio = undefined;
    let lineWidthRatioWarning = false;
    let bevelSizeRatio = undefined;
    let bevelSizeRatioWarning = false;
    let sizeRatio = undefined;
    let sizeRatioWarning = false;
    let lightnessRatio = undefined;
    let lightnessRatioWarning = false;
    let offsetXRatio = undefined;
    let offsetXRatioWarning = false;
    let offsetYRatio = undefined;
    let offsetYRatioWarning = false;
    if (selectedHandles.length > 0) {
        for (let i = 0; i < selectedHandles.length; i++) {
            for (let j = 0; j < selectedHandles[i].controlPoints.length; j++) {
                let controlPoint = selectedHandles[i].controlPoints[j];
                if (thicknessRatio === undefined) {
                    thicknessRatio = controlPoint.thicknessRatio;
                }
                else if (controlPoint.thicknessRatio !== thicknessRatio) {
                    thicknessRatio = defaultThicknessRatio;
                    thicknessRatioWarning = true;
                }
                if (bevelSizeRatio === undefined) {
                    bevelSizeRatio = controlPoint.bevelSizeRatio;
                }
                else if (controlPoint.bevelSizeRatio !== bevelSizeRatio) {
                    bevelSizeRatio = defaultBevelSizeRatio;
                    bevelSizeRatioWarning = true;
                }
                if (sizeRatio === undefined) {
                    sizeRatio = controlPoint.sizeRatio;
                }
                else if (controlPoint.sizeRatio !== sizeRatio) {
                    sizeRatio = defaultSizeRatio;
                    sizeRatioWarning = true;
                }
                if (offsetXRatio === undefined) {
                    offsetXRatio = controlPoint.offsetRatio.x;
                }
                else if (controlPoint.offsetRatio.x !== offsetXRatio) {
                    offsetXRatio = defaultOffsetRatio.x;
                    offsetXRatioWarning = true;
                }
                if (offsetYRatio === undefined) {
                    offsetYRatio = controlPoint.offsetRatio.y;
                }
                else if (controlPoint.offsetRatio.y !== offsetYRatio) {
                    offsetYRatio = defaultOffsetRatio.y;
                    offsetYRatioWarning = true;
                }
            }
        }
    }
    else {
        let selectedLayers = [];
        for (let i = layers.length - 1; i >= 0; i--) {
            if (layers[i].isSelected) {
                selectedLayers.push(layers[i]);
            }
        }
        // thicknessRatio
        for (let i = 0; i < selectedLayers.length; i++) {
            let layer = selectedLayers[i];
            if (thicknessRatio === undefined) {
                thicknessRatio = layer.thicknessRatio;
            }
            else if (layer.thicknessRatio !== thicknessRatio) {
                thicknessRatio = defaultThicknessRatio;
                thicknessRatioWarning = true;
                break;
            }
            for (let j = 0; j < layer.controlPoints.length; j++) {
                let controlPoint = layer.controlPoints[j];
                if (thicknessRatio === undefined) {
                    thicknessRatio = controlPoint.thicknessRatio;
                }
                else if (controlPoint.thicknessRatio !== thicknessRatio) {
                    thicknessRatio = defaultThicknessRatio;
                    thicknessRatioWarning = true;
                    break;
                }
            }
            if (thicknessRatioWarning) {
                break;
            }
        }
        // lineWidthRatio
        for (let i = 0; i < selectedLayers.length; i++) {
            if (selectedLayers[i].type !== _layer__WEBPACK_IMPORTED_MODULE_4__.LayerType.LINE) {
                continue;
            }
            let layer = selectedLayers[i];
            if (lineWidthRatio === undefined) {
                lineWidthRatio = layer.lineWidthRatio;
            }
            else if (layer.lineWidthRatio !== lineWidthRatio) {
                lineWidthRatio = defaultLineWidthRatio;
                lineWidthRatioWarning = true;
                break;
            }
        }
        // bevelSizeRatio
        for (let i = 0; i < selectedLayers.length; i++) {
            let layer = selectedLayers[i];
            if (bevelSizeRatio === undefined) {
                bevelSizeRatio = layer.bevelSizeRatio;
            }
            else if (layer.bevelSizeRatio !== bevelSizeRatio) {
                bevelSizeRatio = defaultBevelSizeRatio;
                bevelSizeRatioWarning = true;
                break;
            }
            for (let j = 0; j < layer.controlPoints.length; j++) {
                let controlPoint = layer.controlPoints[j];
                if (bevelSizeRatio === undefined) {
                    bevelSizeRatio = controlPoint.bevelSizeRatio;
                }
                else if (controlPoint.bevelSizeRatio !== bevelSizeRatio) {
                    bevelSizeRatio = defaultBevelSizeRatio;
                    bevelSizeRatioWarning = true;
                    break;
                }
            }
            if (bevelSizeRatioWarning) {
                break;
            }
        }
        // lightnessRatio
        for (let i = 0; i < selectedLayers.length; i++) {
            let layer = selectedLayers[i];
            if (lightnessRatio === undefined) {
                lightnessRatio = layer.lightnessRatio;
            }
            else if (layer.lightnessRatio !== lightnessRatio) {
                lightnessRatio = defaultFillLightnessRatio;
                lightnessRatioWarning = true;
                break;
            }
        }
        // sizeRatio
        for (let i = 0; i < selectedLayers.length; i++) {
            let layer = selectedLayers[i];
            if (sizeRatio === undefined) {
                sizeRatio = layer.sizeRatio;
            }
            else if (layer.sizeRatio !== sizeRatio) {
                sizeRatio = defaultSizeRatio;
                sizeRatioWarning = true;
                break;
            }
            for (let j = 0; j < layer.controlPoints.length; j++) {
                let controlPoint = layer.controlPoints[j];
                if (sizeRatio === undefined) {
                    sizeRatio = controlPoint.sizeRatio;
                }
                else if (controlPoint.sizeRatio !== sizeRatio) {
                    sizeRatio = defaultSizeRatio;
                    sizeRatioWarning = true;
                    break;
                }
            }
            if (sizeRatioWarning) {
                break;
            }
        }
        // offsetX
        for (let i = 0; i < selectedLayers.length; i++) {
            let layer = selectedLayers[i];
            if (offsetXRatio === undefined) {
                offsetXRatio = layer.offsetRatio.x;
            }
            else if (layer.offsetRatio.x !== offsetXRatio) {
                offsetXRatio = defaultOffsetRatio.x;
                offsetXRatioWarning = true;
                break;
            }
            for (let j = 0; j < layer.controlPoints.length; j++) {
                let controlPoint = layer.controlPoints[j];
                if (offsetXRatio === undefined) {
                    offsetXRatio = controlPoint.offsetRatio.x;
                }
                else if (controlPoint.offsetRatio.x !== offsetXRatio) {
                    offsetXRatio = defaultOffsetRatio.x;
                    offsetXRatioWarning = true;
                    break;
                }
            }
            if (offsetXRatioWarning) {
                break;
            }
        }
        // offsetY
        for (let i = 0; i < selectedLayers.length; i++) {
            let layer = selectedLayers[i];
            if (offsetYRatio === undefined) {
                offsetYRatio = layer.offsetRatio.y;
            }
            else if (layer.offsetRatio.y !== offsetYRatio) {
                offsetYRatio = defaultOffsetRatio.y;
                offsetYRatioWarning = true;
                break;
            }
            for (let j = 0; j < layer.controlPoints.length; j++) {
                let controlPoint = layer.controlPoints[j];
                if (offsetYRatio === undefined) {
                    offsetYRatio = controlPoint.offsetRatio.y;
                }
                else if (controlPoint.offsetRatio.y !== offsetYRatio) {
                    offsetYRatio = defaultOffsetRatio.y;
                    offsetYRatioWarning = true;
                    break;
                }
            }
            if (offsetYRatioWarning) {
                break;
            }
        }
    }
    optionsDiv.innerHTML = "";
    if (thicknessRatio !== undefined) {
        // Overall max thickness ratio = Math.SQRT2 - 1
        // Which happens when the bottoms of the arms would meet the base
        let thicknessSliderDiv = (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.createLabeledRange)("thicknessSilder", "Thickness", 0, Math.SQRT2 - 1, 0.001, thicknessRatio, thicknessRatioWarning);
        let thicknessSlider = thicknessSliderDiv.querySelector("input[type=range]");
        if (selectedHandles.length > 0) {
            thicknessSlider.addEventListener("input", () => {
                updateControlPoints(selectedHandles, { thicknessRatio: thicknessSlider.valueAsNumber });
                let sliderWarningSpan = thicknessSliderDiv.querySelector(".sliderWarningSpan");
                if (sliderWarningSpan.innerHTML !== "") {
                    sliderWarningSpan.innerHTML = "";
                }
            });
        }
        else {
            thicknessSlider.addEventListener("input", () => {
                updateSelectedLayers({ thicknessRatio: thicknessSlider.valueAsNumber });
                let sliderWarningSpan = thicknessSliderDiv.querySelector(".sliderWarningSpan");
                if (sliderWarningSpan.innerHTML !== "") {
                    sliderWarningSpan.innerHTML = "";
                }
            });
        }
        optionsDiv.appendChild(thicknessSliderDiv);
    }
    if (lineWidthRatio !== undefined) {
        let lineWidthSliderDiv = (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.createLabeledRange)("lineWidthSlider", "Line Width", 0, 0.2, 0.001, lineWidthRatio, lineWidthRatioWarning);
        let lineWidthSlider = lineWidthSliderDiv.querySelector("input[type=range]");
        lineWidthSlider.addEventListener("input", () => {
            updateSelectedLines({ lineWidthRatio: lineWidthSlider.valueAsNumber });
            let sliderWarningSpan = lineWidthSliderDiv.querySelector(".sliderWarningSpan");
            if (sliderWarningSpan.innerHTML !== "") {
                sliderWarningSpan.innerHTML = "";
            }
        });
        optionsDiv.appendChild(lineWidthSliderDiv);
    }
    if (bevelSizeRatio !== undefined) {
        let bevelSizeSliderDiv = (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.createLabeledRange)("bevelSizeSlider", "Bevel Size", 0, 1.0, 0.001, bevelSizeRatio, bevelSizeRatioWarning);
        let bevelSizeSlider = bevelSizeSliderDiv.querySelector("input[type=range]");
        if (selectedHandles.length > 0) {
            bevelSizeSlider.addEventListener("input", () => {
                updateControlPoints(selectedHandles, { bevelSizeRatio: bevelSizeSlider.valueAsNumber });
                let sliderWarningSpan = bevelSizeSliderDiv.querySelector(".sliderWarningSpan");
                if (sliderWarningSpan.innerHTML !== "") {
                    sliderWarningSpan.innerHTML = "";
                }
            });
        }
        else {
            bevelSizeSlider.addEventListener("input", () => {
                updateSelectedLayers({ bevelSizeRatio: bevelSizeSlider.valueAsNumber });
                let sliderWarningSpan = bevelSizeSliderDiv.querySelector(".sliderWarningSpan");
                if (sliderWarningSpan.innerHTML !== "") {
                    sliderWarningSpan.innerHTML = "";
                }
            });
        }
        optionsDiv.appendChild(bevelSizeSliderDiv);
    }
    if (sizeRatio !== undefined) {
        let sizeSliderDiv = (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.createLabeledRange)("sizeSlider", "Size", 0.1, 1.5, 0.001, sizeRatio, sizeRatioWarning);
        let sizeSlider = sizeSliderDiv.querySelector("input[type=range]");
        if (selectedHandles.length > 0) {
            sizeSlider.addEventListener("input", () => {
                updateControlPoints(selectedHandles, { sizeRatio: sizeSlider.valueAsNumber });
                let sliderWarningSpan = sizeSliderDiv.querySelector(".sliderWarningSpan");
                if (sliderWarningSpan.innerHTML !== "") {
                    sliderWarningSpan.innerHTML = "";
                }
            });
        }
        else {
            sizeSlider.addEventListener("input", () => {
                updateSelectedLayers({ sizeRatio: sizeSlider.valueAsNumber });
                let sliderWarningSpan = sizeSliderDiv.querySelector(".sliderWarningSpan");
                if (sliderWarningSpan.innerHTML !== "") {
                    sliderWarningSpan.innerHTML = "";
                }
            });
        }
        optionsDiv.appendChild(sizeSliderDiv);
    }
    if (lightnessRatio !== undefined) {
        let lightnessSliderDiv = (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.createLabeledRange)("lightnessSlider", "Color Lightness", -1, 1, 0.001, lightnessRatio, lightnessRatioWarning);
        let lightnessSlider = lightnessSliderDiv.querySelector("input[type=range]");
        lightnessSlider.addEventListener("input", () => {
            updateSelectedLayers({ lightnessRatio: lightnessSlider.valueAsNumber });
            let sliderWarningSpan = lightnessSliderDiv.querySelector(".sliderWarningSpan");
            if (sliderWarningSpan.innerHTML !== "") {
                sliderWarningSpan.innerHTML = "";
            }
        });
        optionsDiv.appendChild(lightnessSliderDiv);
    }
    if (offsetXRatio !== undefined) {
        let offsetXSliderDiv = (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.createLabeledRange)("offsetXSlider", "X Offset", -1, 1, 0.001, offsetXRatio, offsetXRatioWarning);
        let offsetXSlider = offsetXSliderDiv.querySelector("input[type=range]");
        if (selectedHandles.length > 0) {
            offsetXSlider.addEventListener("input", () => {
                updateControlPoints(selectedHandles, { offsetXRatio: offsetXSlider.valueAsNumber });
                let sliderWarningSpan = offsetXSliderDiv.querySelector(".sliderWarningSpan");
                if (sliderWarningSpan.innerHTML !== "") {
                    sliderWarningSpan.innerHTML = "";
                }
            });
        }
        else {
            offsetXSlider.addEventListener("input", () => {
                updateSelectedLayers({ offsetXRatio: offsetXSlider.valueAsNumber });
                let sliderWarningSpan = offsetXSliderDiv.querySelector(".sliderWarningSpan");
                if (sliderWarningSpan.innerHTML !== "") {
                    sliderWarningSpan.innerHTML = "";
                }
            });
        }
        optionsDiv.appendChild(offsetXSliderDiv);
    }
    if (offsetYRatio !== undefined) {
        let offsetYSliderDiv = (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.createLabeledRange)("offsetYSlider", "Y Offset", -1, 1, 0.001, offsetYRatio, offsetYRatioWarning);
        let offsetYSlider = offsetYSliderDiv.querySelector("input[type=range]");
        if (selectedHandles.length > 0) {
            offsetYSlider.addEventListener("input", () => {
                updateControlPoints(selectedHandles, { offsetYRatio: offsetYSlider.valueAsNumber });
                let sliderWarningSpan = offsetYSliderDiv.querySelector(".sliderWarningSpan");
                if (sliderWarningSpan.innerHTML !== "") {
                    sliderWarningSpan.innerHTML = "";
                }
            });
        }
        else {
            offsetYSlider.addEventListener("input", () => {
                updateSelectedLayers({ offsetYRatio: offsetYSlider.valueAsNumber });
                let sliderWarningSpan = offsetYSliderDiv.querySelector(".sliderWarningSpan");
                if (sliderWarningSpan.innerHTML !== "") {
                    sliderWarningSpan.innerHTML = "";
                }
            });
        }
        optionsDiv.appendChild(offsetYSliderDiv);
    }
}
function updateSelectedFills(layerUpdate) {
    for (let i = 0; i < fillLayers.length; i++) {
        if (fillLayers[i].isSelected) {
            fillLayers[i].update(layerUpdate);
        }
    }
    _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.needsToBeRendered = true;
}
function updateSelectedLines(layerUpdate) {
    for (let i = 0; i < lineLayers.length; i++) {
        if (lineLayers[i].isSelected) {
            lineLayers[i].update(layerUpdate);
        }
    }
    _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.needsToBeRendered = true;
}
function updateSelectedLayers(layerUpdate) {
    for (let i = 0; i < layers.length; i++) {
        if (layers[i].isSelected) {
            layers[i].update(layerUpdate);
        }
    }
    _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.needsToBeRendered = true;
}
function updateControlPoints(selectedHandles, controlPointUpdate) {
    for (let i = 0; i < selectedHandles.length; i++) {
        for (let j = 0; j < selectedHandles[i].controlPoints.length; j++) {
            let controlPoint = selectedHandles[i].controlPoints[j];
            controlPoint.update(controlPointUpdate);
            let layer = selectedHandles[i].layers[j];
            layer.needsToBeRendered = true;
        }
    }
    _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.needsToBeRendered = true;
}
function updateLayersControlPanel() {
    layersControlPanel.innerHTML = "";
    let createLineDiv = (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.createControlPanelButton)(createLinePath);
    let createLineButton = createLineDiv.querySelector("input[type=image]");
    createLineButton.onclick = createLineLayer;
    layersControlPanel.appendChild(createLineDiv);
    let createFillDiv = (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.createControlPanelButton)(createFillPath);
    let createFillButton = createFillDiv.querySelector("input[type=image]");
    createFillButton.onclick = createFillLayer;
    layersControlPanel.appendChild(createFillDiv);
    let deleteDiv = (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.createControlPanelButton)(deletePath);
    let deleteButton = deleteDiv.querySelector("input[type=image]");
    deleteButton.onclick = deleteSelectedLayers;
    layersControlPanel.appendChild(deleteDiv);
    let duplicateDiv = (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.createControlPanelButton)(duplicatePath);
    let duplicateButton = duplicateDiv.querySelector("input[type=image]");
    duplicateButton.onclick = duplicateSelectedLayers;
    layersControlPanel.appendChild(duplicateDiv);
    let moveUpDiv = (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.createControlPanelButton)(moveUpPath);
    let moveUpButton = moveUpDiv.querySelector("input[type=image]");
    moveUpButton.onclick = moveSelectedLayersUp;
    layersControlPanel.appendChild(moveUpDiv);
    let moveDownDiv = (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.createControlPanelButton)(moveDownPath);
    let moveDownButton = moveDownDiv.querySelector("input[type=image]");
    moveDownButton.onclick = moveSelectedLayersDown;
    layersControlPanel.appendChild(moveDownDiv);
}
function createLineLayer() {
    if (layers.length > 99) {
        return;
    }
    layers.push(getDefaultLineLayer());
    updateLayersDisplay();
    onLayerSelectionChanged();
}
function createFillLayer() {
    if (layers.length > 99) {
        return;
    }
    layers.push(getDefaultFillLayer());
    updateLayersDisplay();
    onLayerSelectionChanged();
}
function getDefaultLineLayer() {
    return new _line_layer__WEBPACK_IMPORTED_MODULE_5__.LineLayer("Line", true, true, defaultSizeRatio, defaultThicknessRatio, defaultLineWidthRatio, defaultBevelSizeRatio, defaultOffsetRatio, beatFractionColors[currentBeatFractionIndex], defaultLineLightnessRatio);
}
function getDefaultFillLayer() {
    return new _fill_layer__WEBPACK_IMPORTED_MODULE_2__.FillLayer("Fill", true, true, defaultSizeRatio, defaultThicknessRatio, defaultBevelSizeRatio, defaultOffsetRatio, beatFractionColors[currentBeatFractionIndex], defaultFillLightnessRatio);
}
function deleteSelectedLayers() {
    for (let i = 0; i < layers.length; i++) {
        if (layers[i].isSelected) {
            layers.splice(i, 1);
            i--;
        }
    }
    updateLayersDisplay();
    onLayerSelectionChanged();
}
function duplicateSelectedLayers() {
    if (layers.length > 99) {
        return;
    }
    let initialNumLayers = layers.length;
    for (let i = 0; i < initialNumLayers; i++) {
        if (layers[i].isSelected) {
            layers.push(cloneLayer(layers[i]));
        }
    }
    updateLayersDisplay();
    onLayerSelectionChanged();
}
function cloneLayer(layer) {
    let layerCopy;
    if (layer.type === _layer__WEBPACK_IMPORTED_MODULE_4__.LayerType.FILL) {
        let fillLayer = layer;
        layerCopy = new _fill_layer__WEBPACK_IMPORTED_MODULE_2__.FillLayer(fillLayer.name + " Copy", fillLayer.isVisible, fillLayer.isSelected, fillLayer.sizeRatio, fillLayer.thicknessRatio, fillLayer.bevelSizeRatio, fillLayer.offsetRatio, fillLayer.baseColor, fillLayer.lightnessRatio);
        for (let i = 0; i < layerCopy.controlPoints.length; i++) {
            let cp = layerCopy.controlPoints[i];
            cp.bevel1 = fillLayer.controlPoints[i].bevel1;
            cp.center = fillLayer.controlPoints[i].center;
            cp.bevel2 = fillLayer.controlPoints[i].bevel2;
        }
    }
    else if (layer.type === _layer__WEBPACK_IMPORTED_MODULE_4__.LayerType.LINE) {
        let lineLayer = layer;
        layerCopy = new _line_layer__WEBPACK_IMPORTED_MODULE_5__.LineLayer(lineLayer.name + " Copy", lineLayer.isVisible, lineLayer.isSelected, lineLayer.sizeRatio, lineLayer.thicknessRatio, lineLayer.lineWidthRatio, lineLayer.bevelSizeRatio, lineLayer.offsetRatio, lineLayer.baseColor, lineLayer.lightnessRatio);
        for (let i = 0; i < layerCopy.controlPoints.length; i++) {
            let cp = layerCopy.controlPoints[i];
            cp.bevel1 = lineLayer.controlPoints[i].bevel1;
            cp.center = lineLayer.controlPoints[i].center;
            cp.bevel2 = lineLayer.controlPoints[i].bevel2;
        }
    }
    return layerCopy;
}
function moveSelectedLayersUp() {
    for (let i = layers.length - 2; i >= 0; i--) {
        if (layers[i].isSelected && !layers[i + 1].isSelected) {
            let temp = layers[i + 1];
            layers[i + 1] = layers[i];
            layers[i] = temp;
        }
    }
    updateLayersDisplay();
}
function moveSelectedLayersDown() {
    for (let i = 1; i < layers.length; i++) {
        if (layers[i].isSelected && !layers[i - 1].isSelected) {
            let temp = layers[i - 1];
            layers[i - 1] = layers[i];
            layers[i] = temp;
        }
    }
    updateLayersDisplay();
}
function updateLayersDisplay() {
    layersDisplay.innerHTML = "";
    for (let i = layers.length - 1; i >= 0; i--) {
        let layerDiv = (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.createLayerDisplay)(layers[i]);
        let selectedCheckbox = layerDiv.querySelector("input[type=checkbox]");
        selectedCheckbox.addEventListener("input", onLayerSelectionChanged);
        layersDisplay.appendChild(layerDiv);
    }
}
function onLayerSelectionChanged() {
    updateControlPointHandles();
    updateHeadingText();
    updateOptionsDiv();
}
function onControlPointSelectionChanged() {
    updateHeadingText();
    updateOptionsDiv();
}
function updateControlPointHandles() {
    controlPointHandles = [];
    for (let i = 0; i < layers.length; i++) {
        let layer = layers[i];
        if (!layer.isSelected) {
            continue;
        }
        for (let j = 0; j < layer.controlPoints.length; j++) {
            let controlPoint = layer.controlPoints[j];
            let foundHandle = false;
            for (let k = 0; k < controlPointHandles.length; k++) {
                let handle = controlPointHandles[k];
                if (handle.x === controlPoint.handle.x && handle.y === controlPoint.handle.y) {
                    handle.layers.push(layer);
                    handle.controlPoints.push(controlPoint);
                    foundHandle = true;
                    break;
                }
            }
            if (!foundHandle) {
                let controlPointHandle = new _control_point_handle__WEBPACK_IMPORTED_MODULE_1__.ControlPointHandle(controlPoint.handle.x, controlPoint.handle.y, [layer], [controlPoint]);
                controlPointHandles.push(controlPointHandle);
            }
        }
    }
}
function handleClick(e) {
    let clickedHandle = undefined;
    for (let i = 0; i < controlPointHandles.length; i++) {
        let handle = controlPointHandles[i];
        if ((0,_util__WEBPACK_IMPORTED_MODULE_10__.distance)(e.clientX, e.clientY, handle.x, handle.y) < _control_point_handle__WEBPACK_IMPORTED_MODULE_1__.HANDLE_RADIUS) {
            clickedHandle = handle;
            break;
        }
    }
    if (clickedHandle !== undefined) {
        clickedHandle.isSelected = !clickedHandle.isSelected;
        onControlPointSelectionChanged();
    }
}
function getSelectedHandles() {
    let selectedHandles = [];
    for (let i = 0; i < controlPointHandles.length; i++) {
        if (controlPointHandles[i].isSelected) {
            selectedHandles.push(controlPointHandles[i]);
        }
    }
    return selectedHandles;
}
function createReceptorUI() {
    sidebarDiv.innerHTML = "";
    baseColorDivContainer = document.createElement("div");
    baseColorDivContainer.id = "baseColorDivContainer";
    sidebarDiv.appendChild(baseColorDivContainer);
}
function createImportExportUI() {
    sidebarDiv.innerHTML = "";
    optionsDiv = document.createElement("div");
    optionsDiv.id = "optionsDiv";
    sidebarDiv.appendChild(optionsDiv);
    let zoomSliderDiv = (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.createLabeledRangeWithoutWarning)("zoomSlider", "Zoom", 0.1, 1.4, 0.001, _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.zoomRatio);
    let zoomSlider = zoomSliderDiv.querySelector("input[type=range]");
    zoomSlider.addEventListener("input", () => {
        _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.zoomRatio = zoomSlider.valueAsNumber;
    });
    optionsDiv.appendChild(zoomSliderDiv);
    let scrollXSliderDiv = (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.createLabeledRangeWithoutWarning)("scrollXSlider", "Scroll X", 0, _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.beatFractionColors.length - 1, 0.001, _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.scrollXRatio);
    let scrollXSlider = scrollXSliderDiv.querySelector("input[type=range]");
    scrollXSlider.addEventListener("input", () => {
        _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.scrollXRatio = scrollXSlider.valueAsNumber;
    });
    optionsDiv.appendChild(scrollXSliderDiv);
    let rotationSliderDiv = (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.createLabeledRangeWithoutWarning)("rotationSlider", "Rotation", 0, 360, 5, _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.rotationDegrees);
    let rotationSlider = rotationSliderDiv.querySelector("input[type=range]");
    rotationSlider.addEventListener("input", () => {
        _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.rotationDegrees = rotationSlider.valueAsNumber;
        _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.needsToBeRendered = true;
    });
    optionsDiv.appendChild(rotationSliderDiv);
    let resolutionSliderDiv = (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.createLabeledRangeWithoutWarning)("resolutionSlider", "Resolution", 1, 512, 1, _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.height);
    let resolutionSlider = resolutionSliderDiv.querySelector("input[type=range]");
    resolutionSlider.addEventListener("input", () => {
        _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.setHeight(resolutionSlider.valueAsNumber);
    });
    optionsDiv.appendChild(resolutionSliderDiv);
    let saveAsSpritesheetButtonDiv = document.createElement("div");
    saveAsSpritesheetButtonDiv.classList.add("buttonOnImportExportUI");
    let saveAsSpritesheetButton = document.createElement("button");
    saveAsSpritesheetButton.innerText = "Save As Spritesheet";
    saveAsSpritesheetButton.onclick = () => {
        (0,_util__WEBPACK_IMPORTED_MODULE_10__.downloadCanvasAsPng)(_spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.canvas, "noteskin_spritesheet.png");
    };
    saveAsSpritesheetButtonDiv.appendChild(saveAsSpritesheetButton);
    optionsDiv.appendChild(saveAsSpritesheetButtonDiv);
    let saveAsIndividualFilesButtonDiv = document.createElement("div");
    saveAsIndividualFilesButtonDiv.classList.add("buttonOnImportExportUI");
    let saveAsIndividualFilesButton = document.createElement("button");
    saveAsIndividualFilesButton.innerText = "Save As Individual Files";
    saveAsIndividualFilesButton.onclick = () => {
        let canvases = _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.renderSpritesToSeparateCanvases();
        for (let i = 0; i < canvases.length; i++) {
            let filename = "noteskin_" + beatFractionNames[i] + ".png";
            (0,_util__WEBPACK_IMPORTED_MODULE_10__.downloadCanvasAsPng)(canvases[i], filename);
        }
    };
    saveAsIndividualFilesButtonDiv.appendChild(saveAsIndividualFilesButton);
    optionsDiv.appendChild(saveAsIndividualFilesButtonDiv);
    let configAsTextDiv = document.createElement("div");
    configAsTextDiv.classList.add("textareaOnImportExportUI");
    let configAsText = document.createElement("textarea");
    let serializedConfig = (0,_serialization__WEBPACK_IMPORTED_MODULE_7__.serializeConfig)({ beatFractionColors: beatFractionColors, layers: layers });
    configAsText.value = serializedConfig;
    configAsTextDiv.appendChild(configAsText);
    optionsDiv.appendChild(configAsTextDiv);
    let saveAsJsonFileButtonDiv = document.createElement("div");
    saveAsJsonFileButtonDiv.classList.add("buttonOnImportExportUI");
    let saveAsJsonFileButton = document.createElement("button");
    saveAsJsonFileButton.innerText = "Save Config To File";
    saveAsJsonFileButton.onclick = () => {
        (0,_util__WEBPACK_IMPORTED_MODULE_10__.downloadStringAsJson)(serializedConfig, "noteskin_config.json");
    };
    saveAsJsonFileButtonDiv.appendChild(saveAsJsonFileButton);
    optionsDiv.appendChild(saveAsJsonFileButtonDiv);
    let importJsonFileButtonDiv = document.createElement("div");
    importJsonFileButtonDiv.classList.add("buttonOnImportExportUI");
    let importJsonFileButton = document.createElement("button");
    importJsonFileButton.innerText = "Import Config From Text";
    importJsonFileButton.onclick = () => {
        let serializedConfig = JSON.parse(configAsText.value);
        let config = (0,_serialization__WEBPACK_IMPORTED_MODULE_7__.deserializeConfig)(serializedConfig);
        beatFractionColors = config.beatFractionColors;
        layers = config.layers;
        _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.beatFractionColors = beatFractionColors;
        _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.layers = layers;
        _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.needsToBeRendered = true;
        updateControlPointHandles();
    };
    importJsonFileButtonDiv.appendChild(importJsonFileButton);
    optionsDiv.appendChild(importJsonFileButtonDiv);
}
function draw(currentTimeMillis) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (currentPage === Page.BEAT_FRACTION) {
        let topLeftX = _global__WEBPACK_IMPORTED_MODULE_3__.ARROW_CANVAS_CENTER.x - _global__WEBPACK_IMPORTED_MODULE_3__.SIZE / 2;
        let topLeftY = _global__WEBPACK_IMPORTED_MODULE_3__.ARROW_CANVAS_CENTER.y - _global__WEBPACK_IMPORTED_MODULE_3__.SIZE / 2;
        ctx.save();
        (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.fillWithTransparencyCheckerboard)(ctx, topLeftX, topLeftY, _global__WEBPACK_IMPORTED_MODULE_3__.SIZE, _global__WEBPACK_IMPORTED_MODULE_3__.SIZE, _global__WEBPACK_IMPORTED_MODULE_3__.CHECKERBOARD_SIZE);
        (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.fillAroundRectangle)(ctx, topLeftX, topLeftY, _global__WEBPACK_IMPORTED_MODULE_3__.SIZE, _global__WEBPACK_IMPORTED_MODULE_3__.SIZE, _global__WEBPACK_IMPORTED_MODULE_3__.WIDTH, _global__WEBPACK_IMPORTED_MODULE_3__.HEIGHT, canvasBackgroundColor);
        ctx.restore();
        for (let i = 0; i < layers.length; i++) {
            layers[i].draw(ctx, topLeftX, topLeftY);
        }
        for (let i = 0; i < controlPointHandles.length; i++) {
            controlPointHandles[i].update();
        }
        for (let i = 0; i < controlPointHandles.length; i++) {
            controlPointHandles[i].draw(ctx);
        }
    }
    else if (currentPage === Page.RECEPTOR) {
        let topLeftX = _global__WEBPACK_IMPORTED_MODULE_3__.ARROW_CANVAS_CENTER.x - _global__WEBPACK_IMPORTED_MODULE_3__.SIZE / 2;
        let topLeftY = _global__WEBPACK_IMPORTED_MODULE_3__.ARROW_CANVAS_CENTER.y - _global__WEBPACK_IMPORTED_MODULE_3__.SIZE / 2;
        ctx.save();
        (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.fillWithTransparencyCheckerboard)(ctx, topLeftX, topLeftY, _global__WEBPACK_IMPORTED_MODULE_3__.SIZE, _global__WEBPACK_IMPORTED_MODULE_3__.SIZE, _global__WEBPACK_IMPORTED_MODULE_3__.CHECKERBOARD_SIZE);
        (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.fillAroundRectangle)(ctx, topLeftX, topLeftY, _global__WEBPACK_IMPORTED_MODULE_3__.SIZE, _global__WEBPACK_IMPORTED_MODULE_3__.SIZE, _global__WEBPACK_IMPORTED_MODULE_3__.WIDTH, _global__WEBPACK_IMPORTED_MODULE_3__.HEIGHT, canvasBackgroundColor);
        ctx.restore();
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].type === _layer__WEBPACK_IMPORTED_MODULE_4__.LayerType.LINE) {
                layers[i].draw(ctx, topLeftX, topLeftY);
            }
        }
    }
    else if (currentPage === Page.IMPORT_EXPORT) {
        let size = _global__WEBPACK_IMPORTED_MODULE_3__.SIZE * _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.zoomRatio;
        let topLeftY = _global__WEBPACK_IMPORTED_MODULE_3__.ARROW_CANVAS_CENTER.y - size / 2;
        let offsetX = _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.scrollXRatio * size;
        let topLeftX = _global__WEBPACK_IMPORTED_MODULE_3__.ARROW_CANVAS_CENTER.x - size / 2 - offsetX;
        let width = size * _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.beatFractionColors.length;
        ctx.save();
        (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.fillWithTransparencyCheckerboard)(ctx, topLeftX, topLeftY, width, size, _global__WEBPACK_IMPORTED_MODULE_3__.CHECKERBOARD_SIZE);
        (0,_ui_util__WEBPACK_IMPORTED_MODULE_9__.fillAroundRectangle)(ctx, topLeftX, topLeftY, width, size, _global__WEBPACK_IMPORTED_MODULE_3__.WIDTH, _global__WEBPACK_IMPORTED_MODULE_3__.HEIGHT, canvasBackgroundColor);
        ctx.restore();
        _spritesheet__WEBPACK_IMPORTED_MODULE_8__.Spritesheet.draw(ctx, topLeftX, topLeftY, width, size);
    }
    window.requestAnimationFrame(draw);
}

})();

exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxjQUFjO0lBQ3JELElBQUksT0FBTyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTVDLElBQUksU0FBZ0IsQ0FBQztJQUNyQixJQUFJLENBQUMsSUFBSSxPQUFPLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRTtRQUM3QixTQUFTLEdBQUcsSUFBSSx5Q0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDbEM7U0FDSSxJQUFJLENBQUMsSUFBSSxPQUFPLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRTtRQUNsQyxTQUFTLEdBQUcsSUFBSSx5Q0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDbEM7U0FDSSxJQUFJLENBQUMsSUFBSSxPQUFPLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRTtRQUNsQyxTQUFTLEdBQUcsSUFBSSx5Q0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDbEM7U0FDSSxJQUFJLENBQUMsSUFBSSxPQUFPLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRTtRQUNsQyxTQUFTLEdBQUcsSUFBSSx5Q0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDbEM7U0FDSSxJQUFJLENBQUMsSUFBSSxPQUFPLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRTtRQUNsQyxTQUFTLEdBQUcsSUFBSSx5Q0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDbEM7U0FDSSxJQUFJ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cUIsQ0FBQyxJQUFJLENBQUM7QUFDdEMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2V4cG9ydHMvLi9zcmMvYmV2ZWxfbW9kZS50cyIsIndlYnBhY2s6Ly9leHBvcnRzLy4vc3JjL2NvbG9yLnRzIiwid2VicGFjazovL2V4cG9ydHMvLi9zcmMvY29udHJvbF9wb2ludC50cyIsIndlYnBhY2s6Ly9leHBvcnRzLy4vc3JjL2NvbnRyb2xfcG9pbnRfaGFuZGxlLnRzIiwid2VicGFjazovL2V4cG9ydHMvLi9zcmMvZmlsbF9sYXllci50cyIsIndlYnBhY2s6Ly9leHBvcnRzLy4vc3JjL2dsb2JhbC50cyIsIndlYnBhY2s6Ly9leHBvcnRzLy4vc3JjL2xheWVyLnRzIiwid2VicGFjazovL2V4cG9ydHMvLi9zcmMvbGF5ZXJfY29tbW9uLnRzIiwid2VicGFjazovL2V4cG9ydHMvLi9zcmMvbGluZV9sYXllci50cyIsIndlYnBhY2s6Ly9leHBvcnRzLy4vc3JjL3BvaW50XzJkLnRzIiwid2VicGFjazovL2V4cG9ydHMvLi9zcmMvc2VyaWFsaXphdGlvbi50cyIsIndlYnBhY2s6Ly9leHBvcnRzLy4vc3JjL3Nwcml0ZXNoZWV0LnRzIiwid2VicGFjazovL2V4cG9ydHMvLi9zcmMvdWlfdXRpbC50cyIsIndlYnBhY2s6Ly9leHBvcnRzLy4vc3JjL3V0aWwudHMiLCJ3ZWJwYWNrOi8vZXhwb3J0cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9leHBvcnRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9leHBvcnRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXhwb3J0cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2V4cG9ydHMvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gQmV2ZWxNb2RlIHtcclxuICAgIE5PTkUgPSBcIk5vbmVcIixcclxuICAgIFNUUkFJR0hUID0gXCJTdHJhaWdodFwiLFxyXG4gICAgQ0lSQ1VMQVIgPSBcIkNpcmN1bGFyXCIsXHJcbn1cclxuIiwiaW1wb3J0IHsgbGVycCB9IGZyb20gXCIuL3V0aWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb2xvciB7XHJcbiAgICBwdWJsaWMgcmVkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZ3JlZW46IG51bWJlcjtcclxuICAgIHB1YmxpYyBibHVlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgYWxwaGE6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgYT86IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucmVkID0gcjtcclxuICAgICAgICB0aGlzLmdyZWVuID0gZztcclxuICAgICAgICB0aGlzLmJsdWUgPSBiO1xyXG4gICAgICAgIHRoaXMuYWxwaGEgPSBhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b1N0cmluZygpIHtcclxuICAgICAgICBpZiAodGhpcy5hbHBoYSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBDb2xvci5nZXRSR0IodGhpcy5yZWQsIHRoaXMuZ3JlZW4sIHRoaXMuYmx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIENvbG9yLmdldFJHQkEodGhpcy5yZWQsIHRoaXMuZ3JlZW4sIHRoaXMuYmx1ZSwgdGhpcy5hbHBoYSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkYXJrZW4ocmF0aW86IG51bWJlcik6IENvbG9yIHtcclxuICAgICAgICByZXR1cm4gQ29sb3IubGVycENvbG9yKHRoaXMsIG5ldyBDb2xvcigwLCAwLCAwKSwgcmF0aW8pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsaWdodGVuKHJhdGlvOiBudW1iZXIpOiBDb2xvciB7XHJcbiAgICAgICAgcmV0dXJuIENvbG9yLmxlcnBDb2xvcih0aGlzLCBuZXcgQ29sb3IoMjU1LCAyNTUsIDI1NSksIHJhdGlvKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFJHQihyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIFwicmdiKFwiICsgciArIFwiLFwiICsgZyArIFwiLFwiICsgYiArIFwiKVwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UkdCQShyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyLCBhOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gXCJyZ2JhKFwiICsgciArIFwiLFwiICsgZyArIFwiLFwiICsgYiArIFwiLFwiICsgYSArIFwiKVwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbGVycENvbG9yKGxvd2VyQ29sb3I6IENvbG9yLCB1cHBlckNvbG9yOiBDb2xvciwgcmF0aW86IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IoXHJcbiAgICAgICAgICAgIGxlcnAobG93ZXJDb2xvci5yZWQsIHVwcGVyQ29sb3IucmVkLCByYXRpbyksXHJcbiAgICAgICAgICAgIGxlcnAobG93ZXJDb2xvci5ncmVlbiwgdXBwZXJDb2xvci5ncmVlbiwgcmF0aW8pLFxyXG4gICAgICAgICAgICBsZXJwKGxvd2VyQ29sb3IuYmx1ZSwgdXBwZXJDb2xvci5ibHVlLCByYXRpbylcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbUhleChjb2xvckhleDogc3RyaW5nKTogQ29sb3Ige1xyXG4gICAgICAgIGxldCByZWQ6IG51bWJlciA9IE51bWJlcihcIjB4XCIgKyBjb2xvckhleC5zbGljZSgxLCAzKSk7XHJcbiAgICAgICAgbGV0IGdyZWVuOiBudW1iZXIgPSBOdW1iZXIoXCIweFwiICsgY29sb3JIZXguc2xpY2UoMywgNSkpO1xyXG4gICAgICAgIGxldCBibHVlOiBudW1iZXIgPSBOdW1iZXIoXCIweFwiICsgY29sb3JIZXguc2xpY2UoNSwgNykpO1xyXG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IocmVkLCBncmVlbiwgYmx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb25lKCk6IENvbG9yIHtcclxuICAgICAgICByZXR1cm4gbmV3IENvbG9yKHRoaXMucmVkLCB0aGlzLmdyZWVuLCB0aGlzLmJsdWUsIHRoaXMuYWxwaGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWx1ZU9mKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWxwaGEgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWQudG9TdHJpbmcoKSArIFwiIFwiICsgdGhpcy5ncmVlbi50b1N0cmluZygpICsgXCIgXCIgKyAgdGhpcy5ibHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVkLnRvU3RyaW5nKCkgKyBcIiBcIiArIHRoaXMuZ3JlZW4udG9TdHJpbmcoKSArIFwiIFwiICsgIHRoaXMuYmx1ZS50b1N0cmluZygpICsgXCIgXCIgKyB0aGlzLmFscGhhLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b0hleCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCByZWRTdHJpbmc6IHN0cmluZyA9IHRoaXMucmVkLnRvU3RyaW5nKDE2KTtcclxuICAgICAgICBpZiAocmVkU3RyaW5nLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgcmVkU3RyaW5nID0gXCIwXCIgKyByZWRTdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBncmVlblN0cmluZzogc3RyaW5nID0gdGhpcy5ncmVlbi50b1N0cmluZygxNik7XHJcbiAgICAgICAgaWYgKGdyZWVuU3RyaW5nLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgZ3JlZW5TdHJpbmcgPSBcIjBcIiArIGdyZWVuU3RyaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYmx1ZVN0cmluZzogc3RyaW5nID0gdGhpcy5ibHVlLnRvU3RyaW5nKDE2KTtcclxuICAgICAgICBpZiAoYmx1ZVN0cmluZy5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgIGJsdWVTdHJpbmcgPSBcIjBcIiArIGJsdWVTdHJpbmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIiNcIiArIHJlZFN0cmluZyArIGdyZWVuU3RyaW5nICsgYmx1ZVN0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hhbmdlTGlnaHRuZXNzKGxpZ2h0bmVzc1JhdGlvOiBudW1iZXIpOiBDb2xvciB7XHJcbiAgICAgICAgaWYgKGxpZ2h0bmVzc1JhdGlvID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGlnaHRuZXNzUmF0aW8gPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpZ2h0ZW4obGlnaHRuZXNzUmF0aW8pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhcmtlbigtbGlnaHRuZXNzUmF0aW8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBCZXZlbE1vZGUgfSBmcm9tIFwiLi9iZXZlbF9tb2RlXCI7XHJcbmltcG9ydCB7IEFSUk9XX0NBTlZBU19DRU5URVIsIFNJWkUgfSBmcm9tIFwiLi9nbG9iYWxcIjtcclxuaW1wb3J0IHsgUG9pbnQyRCB9IGZyb20gXCIuL3BvaW50XzJkXCI7XHJcbmltcG9ydCB7IGRlZmF1bHRJZlVuZGVmaW5lZCB9IGZyb20gXCIuL3V0aWxcIjtcclxuXHJcbmxldCBIQU5ETEVfU1BBQ0lOR19PVVQ6IG51bWJlciA9IDAuMDY7XHJcbmxldCBIQU5ETEVfU1BBQ0lOR19CRVRXRUVOOiBudW1iZXIgPSAwLjEyO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRyb2xQb2ludCB7XHJcbiAgICBwdWJsaWMgYmV2ZWwxOiBQb2ludDJEO1xyXG4gICAgcHVibGljIGNlbnRlcjogUG9pbnQyRDtcclxuICAgIHB1YmxpYyBiZXZlbDI6IFBvaW50MkQ7XHJcbiAgICBwdWJsaWMgb2Zmc2V0UmF0aW86IFBvaW50MkQ7XHJcbiAgICBwdWJsaWMgc2l6ZVJhdGlvOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgdGhpY2tuZXNzUmF0aW86IG51bWJlcjtcclxuICAgIHB1YmxpYyBiZXZlbFNpemVSYXRpbzogbnVtYmVyO1xyXG4gICAgcHVibGljIGhhbmRsZTogUG9pbnQyRDtcclxuICAgIHB1YmxpYyB1cGRhdGU6IChjb250cm9sUG9pbnRVcGRhdGU6IENvbnRyb2xQb2ludFVwZGF0ZSkgPT4gdm9pZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm9mZnNldFJhdGlvID0gbmV3IFBvaW50MkQoMCwgMCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29udHJvbFBvaW50VXBkYXRlIHtcclxuICAgIHNpemVSYXRpbz86IG51bWJlcixcclxuICAgIHRoaWNrbmVzc1JhdGlvPzogbnVtYmVyLFxyXG4gICAgYmV2ZWxTaXplUmF0aW8/OiBudW1iZXIsXHJcbiAgICBvZmZzZXRYUmF0aW8/OiBudW1iZXIsXHJcbiAgICBvZmZzZXRZUmF0aW8/OiBudW1iZXIsXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVN0YW5kYXJkQ29udHJvbFBvaW50cygpOiBDb250cm9sUG9pbnRbXSB7XHJcbiAgICBsZXQgY29udHJvbFBvaW50czogQ29udHJvbFBvaW50W10gPSBbXTtcclxuICAgIGNvbnRyb2xQb2ludHMucHVzaChnZW5lcmF0ZVRpcCgpKTtcclxuICAgIGNvbnRyb2xQb2ludHMucHVzaChnZW5lcmF0ZVJpZ2h0QXJtVG9wKCkpO1xyXG4gICAgY29udHJvbFBvaW50cy5wdXNoKGdlbmVyYXRlUmlnaHRBcm1Cb3R0b20oKSk7XHJcbiAgICBjb250cm9sUG9pbnRzLnB1c2goZ2VuZXJhdGVSaWdodEFybXBpdCgpKTtcclxuICAgIGNvbnRyb2xQb2ludHMucHVzaChnZW5lcmF0ZUJhc2VSaWdodCgpKTtcclxuICAgIGNvbnRyb2xQb2ludHMucHVzaChnZW5lcmF0ZUJhc2VMZWZ0KCkpO1xyXG4gICAgY29udHJvbFBvaW50cy5wdXNoKGdlbmVyYXRlTGVmdEFybXBpdCgpKTtcclxuICAgIGNvbnRyb2xQb2ludHMucHVzaChnZW5lcmF0ZUxlZnRBcm1Cb3R0b20oKSk7XHJcbiAgICBjb250cm9sUG9pbnRzLnB1c2goZ2VuZXJhdGVMZWZ0QXJtVG9wKCkpO1xyXG4gICAgcmV0dXJuIGNvbnRyb2xQb2ludHM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlVGlwKCk6IENvbnRyb2xQb2ludCB7XHJcbiAgICBsZXQgdGlwID0gbmV3IENvbnRyb2xQb2ludCgpO1xyXG4gICAgdGlwLmhhbmRsZSA9IG5ldyBQb2ludDJEKEFSUk9XX0NBTlZBU19DRU5URVIueCwgQVJST1dfQ0FOVkFTX0NFTlRFUi55IC0gU0laRSAvIDIgLSBIQU5ETEVfU1BBQ0lOR19PVVQgKiBTSVpFKTtcclxuICAgIHRpcC51cGRhdGUgPSBmdW5jdGlvbihjb250cm9sUG9pbnRVcGRhdGU6IENvbnRyb2xQb2ludFVwZGF0ZSkge1xyXG4gICAgICAgIHRoaXMuc2l6ZVJhdGlvID0gZGVmYXVsdElmVW5kZWZpbmVkKGNvbnRyb2xQb2ludFVwZGF0ZS5zaXplUmF0aW8sIHRoaXMuc2l6ZVJhdGlvKTtcclxuICAgICAgICB0aGlzLnRoaWNrbmVzc1JhdGlvID0gZGVmYXVsdElmVW5kZWZpbmVkKGNvbnRyb2xQb2ludFVwZGF0ZS50aGlja25lc3NSYXRpbywgdGhpcy50aGlja25lc3NSYXRpbyk7XHJcbiAgICAgICAgdGhpcy5iZXZlbFNpemVSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChjb250cm9sUG9pbnRVcGRhdGUuYmV2ZWxTaXplUmF0aW8sIHRoaXMuYmV2ZWxTaXplUmF0aW8pO1xyXG4gICAgICAgIGxldCBvZmZzZXRYUmF0aW8gPSBkZWZhdWx0SWZVbmRlZmluZWQoY29udHJvbFBvaW50VXBkYXRlLm9mZnNldFhSYXRpbywgdGhpcy5vZmZzZXRSYXRpby54KTtcclxuICAgICAgICBsZXQgb2Zmc2V0WVJhdGlvID0gZGVmYXVsdElmVW5kZWZpbmVkKGNvbnRyb2xQb2ludFVwZGF0ZS5vZmZzZXRZUmF0aW8sIHRoaXMub2Zmc2V0UmF0aW8ueSk7XHJcblxyXG4gICAgICAgIGxldCBzaXplOiBudW1iZXIgPSB0aGlzLnNpemVSYXRpbyAqIFNJWkU7XHJcbiAgICAgICAgbGV0IHRoaWNrbmVzcyA9IHRoaXMudGhpY2tuZXNzUmF0aW8gKiBzaXplO1xyXG4gICAgICAgIGxldCBiZXZlbFNpemU6IG51bWJlciA9IHRoaXMuYmV2ZWxTaXplUmF0aW8gKiBzaXplO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0UmF0aW8ueCA9IG9mZnNldFhSYXRpbztcclxuICAgICAgICB0aGlzLm9mZnNldFJhdGlvLnkgPSBvZmZzZXRZUmF0aW87XHJcblxyXG4gICAgICAgIGxldCB0b3BMZWZ0ID0gbmV3IFBvaW50MkQoKFNJWkUgLSBzaXplKSAvIDIsIChTSVpFIC0gc2l6ZSkgLyAyKTtcclxuICAgICAgICB0b3BMZWZ0LnggKz0gdGhpcy5vZmZzZXRSYXRpby54ICogU0laRTtcclxuICAgICAgICB0b3BMZWZ0LnkgKz0gdGhpcy5vZmZzZXRSYXRpby55ICogU0laRTtcclxuICAgIFxyXG4gICAgICAgIHRpcC5jZW50ZXIgPSBuZXcgUG9pbnQyRCh0b3BMZWZ0LnggKyBzaXplIC8gMiwgdG9wTGVmdC55KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aXA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlUmlnaHRBcm1Ub3AoKTogQ29udHJvbFBvaW50IHtcclxuICAgIGxldCByaWdodEFybVRvcCA9IG5ldyBDb250cm9sUG9pbnQoKTtcclxuICAgIHJpZ2h0QXJtVG9wLmhhbmRsZSA9IG5ldyBQb2ludDJEKEFSUk9XX0NBTlZBU19DRU5URVIueCArIFNJWkUgLyAyICsgSEFORExFX1NQQUNJTkdfT1VUICogU0laRSwgQVJST1dfQ0FOVkFTX0NFTlRFUi55KTtcclxuICAgIHJpZ2h0QXJtVG9wLnVwZGF0ZSA9IGZ1bmN0aW9uKGNvbnRyb2xQb2ludFVwZGF0ZTogQ29udHJvbFBvaW50VXBkYXRlKSB7XHJcbiAgICAgICAgdGhpcy5zaXplUmF0aW8gPSBkZWZhdWx0SWZVbmRlZmluZWQoY29udHJvbFBvaW50VXBkYXRlLnNpemVSYXRpbywgdGhpcy5zaXplUmF0aW8pO1xyXG4gICAgICAgIHRoaXMudGhpY2tuZXNzUmF0aW8gPSBkZWZhdWx0SWZVbmRlZmluZWQoY29udHJvbFBvaW50VXBkYXRlLnRoaWNrbmVzc1JhdGlvLCB0aGlzLnRoaWNrbmVzc1JhdGlvKTtcclxuICAgICAgICB0aGlzLmJldmVsU2l6ZVJhdGlvID0gZGVmYXVsdElmVW5kZWZpbmVkKGNvbnRyb2xQb2ludFVwZGF0ZS5iZXZlbFNpemVSYXRpbywgdGhpcy5iZXZlbFNpemVSYXRpbyk7XHJcbiAgICAgICAgbGV0IG9mZnNldFhSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChjb250cm9sUG9pbnRVcGRhdGUub2Zmc2V0WFJhdGlvLCB0aGlzLm9mZnNldFJhdGlvLngpO1xyXG4gICAgICAgIGxldCBvZmZzZXRZUmF0aW8gPSBkZWZhdWx0SWZVbmRlZmluZWQoY29udHJvbFBvaW50VXBkYXRlLm9mZnNldFlSYXRpbywgdGhpcy5vZmZzZXRSYXRpby55KTtcclxuXHJcbiAgICAgICAgbGV0IHNpemU6IG51bWJlciA9IHRoaXMuc2l6ZVJhdGlvICogU0laRTtcclxuICAgICAgICBsZXQgdGhpY2tuZXNzID0gdGhpcy50aGlja25lc3NSYXRpbyAqIHNpemU7XHJcbiAgICAgICAgbGV0IGJldmVsU2l6ZTogbnVtYmVyID0gdGhpcy5iZXZlbFNpemVSYXRpbyAqIHNpemU7XHJcbiAgICAgICAgdGhpcy5vZmZzZXRSYXRpby54ID0gb2Zmc2V0WFJhdGlvO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0UmF0aW8ueSA9IG9mZnNldFlSYXRpbztcclxuXHJcbiAgICAgICAgbGV0IHRvcExlZnQgPSBuZXcgUG9pbnQyRCgoU0laRSAtIHNpemUpIC8gMiwgKFNJWkUgLSBzaXplKSAvIDIpO1xyXG4gICAgICAgIHRvcExlZnQueCArPSB0aGlzLm9mZnNldFJhdGlvLnggKiBTSVpFO1xyXG4gICAgICAgIHRvcExlZnQueSArPSB0aGlzLm9mZnNldFJhdGlvLnkgKiBTSVpFO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCByaWdodEFybVRvcENlbnRlciA9IG5ldyBQb2ludDJEKHRvcExlZnQueCArIHNpemUsIHRvcExlZnQueSArIHNpemUgLyAyKTtcclxuXHJcbiAgICAgICAgLy8gcmlnaHRBcm1Ub3AuYmV2ZWwxID0gbmV3IFBvaW50MkQocmlnaHRBcm1Ub3BDZW50ZXIueCAtIGJldmVsU2l6ZSAqIE1hdGguU1FSVDFfMiwgcmlnaHRBcm1Ub3BDZW50ZXIueSAtIGJldmVsU2l6ZSAqIE1hdGguU1FSVDFfMilcclxuICAgICAgICByaWdodEFybVRvcC5jZW50ZXIgPSByaWdodEFybVRvcENlbnRlclxyXG4gICAgICAgIC8vIHJpZ2h0QXJtVG9wLmJldmVsMiA9IG5ldyBQb2ludDJEKHJpZ2h0QXJtVG9wQ2VudGVyLnggLSBiZXZlbFNpemUgKiBNYXRoLlNRUlQxXzIsIHJpZ2h0QXJtVG9wQ2VudGVyLnkgKyBiZXZlbFNpemUgKiBNYXRoLlNRUlQxXzIpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmlnaHRBcm1Ub3A7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlUmlnaHRBcm1Cb3R0b20oKTogQ29udHJvbFBvaW50IHtcclxuICAgIGxldCByaWdodEFybUJvdHRvbSA9IG5ldyBDb250cm9sUG9pbnQoKTtcclxuICAgIHJpZ2h0QXJtQm90dG9tLmhhbmRsZSA9IG5ldyBQb2ludDJEKFxyXG4gICAgICAgIEFSUk9XX0NBTlZBU19DRU5URVIueCArIFNJWkUgLyAyICsgSEFORExFX1NQQUNJTkdfT1VUICogU0laRSxcclxuICAgICAgICBBUlJPV19DQU5WQVNfQ0VOVEVSLnkgKyBIQU5ETEVfU1BBQ0lOR19CRVRXRUVOICogU0laRSxcclxuICAgICk7XHJcbiAgICByaWdodEFybUJvdHRvbS51cGRhdGUgPSBmdW5jdGlvbihjb250cm9sUG9pbnRVcGRhdGU6IENvbnRyb2xQb2ludFVwZGF0ZSkge1xyXG4gICAgICAgIHRoaXMuc2l6ZVJhdGlvID0gZGVmYXVsdElmVW5kZWZpbmVkKGNvbnRyb2xQb2ludFVwZGF0ZS5zaXplUmF0aW8sIHRoaXMuc2l6ZVJhdGlvKTtcclxuICAgICAgICB0aGlzLnRoaWNrbmVzc1JhdGlvID0gZGVmYXVsdElmVW5kZWZpbmVkKGNvbnRyb2xQb2ludFVwZGF0ZS50aGlja25lc3NSYXRpbywgdGhpcy50aGlja25lc3NSYXRpbyk7XHJcbiAgICAgICAgdGhpcy5iZXZlbFNpemVSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChjb250cm9sUG9pbnRVcGRhdGUuYmV2ZWxTaXplUmF0aW8sIHRoaXMuYmV2ZWxTaXplUmF0aW8pO1xyXG4gICAgICAgIGxldCBvZmZzZXRYUmF0aW8gPSBkZWZhdWx0SWZVbmRlZmluZWQoY29udHJvbFBvaW50VXBkYXRlLm9mZnNldFhSYXRpbywgdGhpcy5vZmZzZXRSYXRpby54KTtcclxuICAgICAgICBsZXQgb2Zmc2V0WVJhdGlvID0gZGVmYXVsdElmVW5kZWZpbmVkKGNvbnRyb2xQb2ludFVwZGF0ZS5vZmZzZXRZUmF0aW8sIHRoaXMub2Zmc2V0UmF0aW8ueSk7XHJcblxyXG4gICAgICAgIGxldCBzaXplOiBudW1iZXIgPSB0aGlzLnNpemVSYXRpbyAqIFNJWkU7XHJcbiAgICAgICAgbGV0IHRoaWNrbmVzcyA9IHRoaXMudGhpY2tuZXNzUmF0aW8gKiBzaXplO1xyXG4gICAgICAgIGxldCBiZXZlbFNpemU6IG51bWJlciA9IHRoaXMuYmV2ZWxTaXplUmF0aW8gKiBzaXplO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0UmF0aW8ueCA9IG9mZnNldFhSYXRpbztcclxuICAgICAgICB0aGlzLm9mZnNldFJhdGlvLnkgPSBvZmZzZXRZUmF0aW87XHJcblxyXG4gICAgICAgIGxldCB0b3BMZWZ0ID0gbmV3IFBvaW50MkQoKFNJWkUgLSBzaXplKSAvIDIsIChTSVpFIC0gc2l6ZSkgLyAyKTtcclxuICAgICAgICB0b3BMZWZ0LnggKz0gdGhpcy5vZmZzZXRSYXRpby54ICogU0laRTtcclxuICAgICAgICB0b3BMZWZ0LnkgKz0gdGhpcy5vZmZzZXRSYXRpby55ICogU0laRTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcmlnaHRBcm1Cb3R0b21DZW50ZXIgPSBuZXcgUG9pbnQyRCh0b3BMZWZ0LnggKyBzaXplIC0gdGhpY2tuZXNzICogTWF0aC5TUVJUMV8yLCB0b3BMZWZ0LnkgKyBzaXplIC8gMiArIHRoaWNrbmVzcyAqIE1hdGguU1FSVDFfMik7XHJcblxyXG4gICAgICAgIC8vIHJpZ2h0QXJtQm90dG9tLmJldmVsMSA9IG5ldyBQb2ludDJEKHJpZ2h0QXJtQm90dG9tQ2VudGVyLnggKyBiZXZlbFNpemUgKiBNYXRoLlNRUlQxXzIsIHJpZ2h0QXJtQm90dG9tQ2VudGVyLnkgLSBiZXZlbFNpemUgKiBNYXRoLlNRUlQxXzIpXHJcbiAgICAgICAgcmlnaHRBcm1Cb3R0b20uY2VudGVyID0gcmlnaHRBcm1Cb3R0b21DZW50ZXJcclxuICAgICAgICAvLyByaWdodEFybUJvdHRvbS5iZXZlbDIgPSBuZXcgUG9pbnQyRChyaWdodEFybUJvdHRvbUNlbnRlci54IC0gYmV2ZWxTaXplICogTWF0aC5TUVJUMV8yLCByaWdodEFybUJvdHRvbUNlbnRlci55IC0gYmV2ZWxTaXplICogTWF0aC5TUVJUMV8yKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJpZ2h0QXJtQm90dG9tO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZVJpZ2h0QXJtcGl0KCk6IENvbnRyb2xQb2ludCB7XHJcbiAgICBsZXQgcmlnaHRBcm1waXQgPSBuZXcgQ29udHJvbFBvaW50KCk7XHJcbiAgICByaWdodEFybXBpdC5oYW5kbGUgPSBuZXcgUG9pbnQyRChcclxuICAgICAgICBBUlJPV19DQU5WQVNfQ0VOVEVSLnggKyBTSVpFIC8gMiArIEhBTkRMRV9TUEFDSU5HX09VVCAqIFNJWkUsXHJcbiAgICAgICAgQVJST1dfQ0FOVkFTX0NFTlRFUi55ICsgMiAqIEhBTkRMRV9TUEFDSU5HX0JFVFdFRU4gKiBTSVpFLFxyXG4gICAgKTtcclxuICAgIHJpZ2h0QXJtcGl0LnVwZGF0ZSA9IGZ1bmN0aW9uKGNvbnRyb2xQb2ludFVwZGF0ZTogQ29udHJvbFBvaW50VXBkYXRlKSB7XHJcbiAgICAgICAgdGhpcy5zaXplUmF0aW8gPSBkZWZhdWx0SWZVbmRlZmluZWQoY29udHJvbFBvaW50VXBkYXRlLnNpemVSYXRpbywgdGhpcy5zaXplUmF0aW8pO1xyXG4gICAgICAgIHRoaXMudGhpY2tuZXNzUmF0aW8gPSBkZWZhdWx0SWZVbmRlZmluZWQoY29udHJvbFBvaW50VXBkYXRlLnRoaWNrbmVzc1JhdGlvLCB0aGlzLnRoaWNrbmVzc1JhdGlvKTtcclxuICAgICAgICB0aGlzLmJldmVsU2l6ZVJhdGlvID0gZGVmYXVsdElmVW5kZWZpbmVkKGNvbnRyb2xQb2ludFVwZGF0ZS5iZXZlbFNpemVSYXRpbywgdGhpcy5iZXZlbFNpemVSYXRpbyk7XHJcbiAgICAgICAgbGV0IG9mZnNldFhSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChjb250cm9sUG9pbnRVcGRhdGUub2Zmc2V0WFJhdGlvLCB0aGlzLm9mZnNldFJhdGlvLngpO1xyXG4gICAgICAgIGxldCBvZmZzZXRZUmF0aW8gPSBkZWZhdWx0SWZVbmRlZmluZWQoY29udHJvbFBvaW50VXBkYXRlLm9mZnNldFlSYXRpbywgdGhpcy5vZmZzZXRSYXRpby55KTtcclxuXHJcbiAgICAgICAgbGV0IHNpemU6IG51bWJlciA9IHRoaXMuc2l6ZVJhdGlvICogU0laRTtcclxuICAgICAgICBsZXQgdGhpY2tuZXNzID0gdGhpcy50aGlja25lc3NSYXRpbyAqIHNpemU7XHJcbiAgICAgICAgbGV0IGJldmVsU2l6ZTogbnVtYmVyID0gdGhpcy5iZXZlbFNpemVSYXRpbyAqIHNpemU7XHJcbiAgICAgICAgdGhpcy5vZmZzZXRSYXRpby54ID0gb2Zmc2V0WFJhdGlvO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0UmF0aW8ueSA9IG9mZnNldFlSYXRpbztcclxuXHJcbiAgICAgICAgbGV0IHRvcExlZnQgPSBuZXcgUG9pbnQyRCgoU0laRSAtIHNpemUpIC8gMiwgKFNJWkUgLSBzaXplKSAvIDIpO1xyXG4gICAgICAgIHRvcExlZnQueCArPSB0aGlzLm9mZnNldFJhdGlvLnggKiBTSVpFO1xyXG4gICAgICAgIHRvcExlZnQueSArPSB0aGlzLm9mZnNldFJhdGlvLnkgKiBTSVpFO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCByaWdodEFybXBpdENlbnRlciA9IG5ldyBQb2ludDJEKHRvcExlZnQueCArIHNpemUgLyAyICsgdGhpY2tuZXNzIC8gMiwgdG9wTGVmdC55ICsgdGhpY2tuZXNzICogTWF0aC5TUVJUMiArIHRoaWNrbmVzcyAvIDIpO1xyXG5cclxuICAgICAgICAvLyByaWdodEFybXBpdC5iZXZlbDEgPSBuZXcgUG9pbnQyRChyaWdodEFybXBpdENlbnRlci54ICsgYmV2ZWxTaXplICogTWF0aC5TUVJUMV8yLCByaWdodEFybXBpdENlbnRlci55ICsgYmV2ZWxTaXplICogTWF0aC5TUVJUMV8yKVxyXG4gICAgICAgIHJpZ2h0QXJtcGl0LmNlbnRlciA9IHJpZ2h0QXJtcGl0Q2VudGVyXHJcbiAgICAgICAgLy8gcmlnaHRBcm1waXQuYmV2ZWwyID0gbmV3IFBvaW50MkQocmlnaHRBcm1waXRDZW50ZXIueCwgcmlnaHRBcm1waXRDZW50ZXIueSArIGJldmVsU2l6ZSlcclxuICAgIH1cclxuICAgIHJldHVybiByaWdodEFybXBpdDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVCYXNlUmlnaHQoKSB7XHJcbiAgICBsZXQgYmFzZVJpZ2h0ID0gbmV3IENvbnRyb2xQb2ludCgpO1xyXG4gICAgYmFzZVJpZ2h0LmhhbmRsZSA9IG5ldyBQb2ludDJEKFxyXG4gICAgICAgIEFSUk9XX0NBTlZBU19DRU5URVIueCArIEhBTkRMRV9TUEFDSU5HX0JFVFdFRU4gLyAyICogU0laRSxcclxuICAgICAgICBBUlJPV19DQU5WQVNfQ0VOVEVSLnkgKyBTSVpFIC8gMiArSEFORExFX1NQQUNJTkdfT1VUICogU0laRSxcclxuICAgICk7XHJcbiAgICBiYXNlUmlnaHQudXBkYXRlID0gZnVuY3Rpb24oY29udHJvbFBvaW50VXBkYXRlOiBDb250cm9sUG9pbnRVcGRhdGUpIHtcclxuICAgICAgICB0aGlzLnNpemVSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChjb250cm9sUG9pbnRVcGRhdGUuc2l6ZVJhdGlvLCB0aGlzLnNpemVSYXRpbyk7XHJcbiAgICAgICAgdGhpcy50aGlja25lc3NSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChjb250cm9sUG9pbnRVcGRhdGUudGhpY2tuZXNzUmF0aW8sIHRoaXMudGhpY2tuZXNzUmF0aW8pO1xyXG4gICAgICAgIHRoaXMuYmV2ZWxTaXplUmF0aW8gPSBkZWZhdWx0SWZVbmRlZmluZWQoY29udHJvbFBvaW50VXBkYXRlLmJldmVsU2l6ZVJhdGlvLCB0aGlzLmJldmVsU2l6ZVJhdGlvKTtcclxuICAgICAgICBsZXQgb2Zmc2V0WFJhdGlvID0gZGVmYXVsdElmVW5kZWZpbmVkKGNvbnRyb2xQb2ludFVwZGF0ZS5vZmZzZXRYUmF0aW8sIHRoaXMub2Zmc2V0UmF0aW8ueCk7XHJcbiAgICAgICAgbGV0IG9mZnNldFlSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChjb250cm9sUG9pbnRVcGRhdGUub2Zmc2V0WVJhdGlvLCB0aGlzLm9mZnNldFJhdGlvLnkpO1xyXG5cclxuICAgICAgICBsZXQgc2l6ZTogbnVtYmVyID0gdGhpcy5zaXplUmF0aW8gKiBTSVpFO1xyXG4gICAgICAgIGxldCB0aGlja25lc3MgPSB0aGlzLnRoaWNrbmVzc1JhdGlvICogc2l6ZTtcclxuICAgICAgICBsZXQgYmV2ZWxTaXplOiBudW1iZXIgPSB0aGlzLmJldmVsU2l6ZVJhdGlvICogc2l6ZTtcclxuICAgICAgICB0aGlzLm9mZnNldFJhdGlvLnggPSBvZmZzZXRYUmF0aW87XHJcbiAgICAgICAgdGhpcy5vZmZzZXRSYXRpby55ID0gb2Zmc2V0WVJhdGlvO1xyXG5cclxuICAgICAgICBsZXQgdG9wTGVmdCA9IG5ldyBQb2ludDJEKChTSVpFIC0gc2l6ZSkgLyAyLCAoU0laRSAtIHNpemUpIC8gMik7XHJcbiAgICAgICAgdG9wTGVmdC54ICs9IHRoaXMub2Zmc2V0UmF0aW8ueCAqIFNJWkU7XHJcbiAgICAgICAgdG9wTGVmdC55ICs9IHRoaXMub2Zmc2V0UmF0aW8ueSAqIFNJWkU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGJhc2VSaWdodENlbnRlciA9IG5ldyBQb2ludDJEKHRvcExlZnQueCArIHNpemUgLyAyICsgdGhpY2tuZXNzIC8gMiwgdG9wTGVmdC55ICsgc2l6ZSk7XHJcblxyXG4gICAgICAgIC8vIGJhc2VSaWdodC5iZXZlbDEgPSBuZXcgUG9pbnQyRChiYXNlUmlnaHRDZW50ZXIueCwgYmFzZVJpZ2h0Q2VudGVyLnkgLSBiZXZlbFNpemUpXHJcbiAgICAgICAgYmFzZVJpZ2h0LmNlbnRlciA9IGJhc2VSaWdodENlbnRlclxyXG4gICAgICAgIC8vIGJhc2VSaWdodC5iZXZlbDIgPSBuZXcgUG9pbnQyRChiYXNlUmlnaHRDZW50ZXIueCAtIGJldmVsU2l6ZSwgYmFzZVJpZ2h0Q2VudGVyLnkpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYmFzZVJpZ2h0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZW5lcmF0ZUJhc2VMZWZ0KCk6IENvbnRyb2xQb2ludCB7XHJcbiAgICBsZXQgYmFzZUxlZnQgPSBuZXcgQ29udHJvbFBvaW50KCk7XHJcbiAgICBiYXNlTGVmdC5oYW5kbGUgPSBuZXcgUG9pbnQyRChcclxuICAgICAgICBBUlJPV19DQU5WQVNfQ0VOVEVSLnggLSBIQU5ETEVfU1BBQ0lOR19CRVRXRUVOIC8gMiAqIFNJWkUsXHJcbiAgICAgICAgQVJST1dfQ0FOVkFTX0NFTlRFUi55ICsgU0laRSAvIDIgK0hBTkRMRV9TUEFDSU5HX09VVCAqIFNJWkUsXHJcbiAgICApO1xyXG4gICAgYmFzZUxlZnQudXBkYXRlID0gZnVuY3Rpb24oY29udHJvbFBvaW50VXBkYXRlOiBDb250cm9sUG9pbnRVcGRhdGUpIHtcclxuICAgICAgICB0aGlzLnNpemVSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChjb250cm9sUG9pbnRVcGRhdGUuc2l6ZVJhdGlvLCB0aGlzLnNpemVSYXRpbyk7XHJcbiAgICAgICAgdGhpcy50aGlja25lc3NSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChjb250cm9sUG9pbnRVcGRhdGUudGhpY2tuZXNzUmF0aW8sIHRoaXMudGhpY2tuZXNzUmF0aW8pO1xyXG4gICAgICAgIHRoaXMuYmV2ZWxTaXplUmF0aW8gPSBkZWZhdWx0SWZVbmRlZmluZWQoY29udHJvbFBvaW50VXBkYXRlLmJldmVsU2l6ZVJhdGlvLCB0aGlzLmJldmVsU2l6ZVJhdGlvKTtcclxuICAgICAgICBsZXQgb2Zmc2V0WFJhdGlvID0gZGVmYXVsdElmVW5kZWZpbmVkKGNvbnRyb2xQb2ludFVwZGF0ZS5vZmZzZXRYUmF0aW8sIHRoaXMub2Zmc2V0UmF0aW8ueCk7XHJcbiAgICAgICAgbGV0IG9mZnNldFlSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChjb250cm9sUG9pbnRVcGRhdGUub2Zmc2V0WVJhdGlvLCB0aGlzLm9mZnNldFJhdGlvLnkpO1xyXG5cclxuICAgICAgICBsZXQgc2l6ZTogbnVtYmVyID0gdGhpcy5zaXplUmF0aW8gKiBTSVpFO1xyXG4gICAgICAgIGxldCB0aGlja25lc3MgPSB0aGlzLnRoaWNrbmVzc1JhdGlvICogc2l6ZTtcclxuICAgICAgICBsZXQgYmV2ZWxTaXplOiBudW1iZXIgPSB0aGlzLmJldmVsU2l6ZVJhdGlvICogc2l6ZTtcclxuICAgICAgICB0aGlzLm9mZnNldFJhdGlvLnggPSBvZmZzZXRYUmF0aW87XHJcbiAgICAgICAgdGhpcy5vZmZzZXRSYXRpby55ID0gb2Zmc2V0WVJhdGlvO1xyXG5cclxuICAgICAgICBsZXQgdG9wTGVmdCA9IG5ldyBQb2ludDJEKChTSVpFIC0gc2l6ZSkgLyAyLCAoU0laRSAtIHNpemUpIC8gMik7XHJcbiAgICAgICAgdG9wTGVmdC54ICs9IHRoaXMub2Zmc2V0UmF0aW8ueCAqIFNJWkU7XHJcbiAgICAgICAgdG9wTGVmdC55ICs9IHRoaXMub2Zmc2V0UmF0aW8ueSAqIFNJWkU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGJhc2VMZWZ0Q2VudGVyID0gbmV3IFBvaW50MkQodG9wTGVmdC54ICsgc2l6ZSAvIDIgLSB0aGlja25lc3MgLyAyLCB0b3BMZWZ0LnkgKyBzaXplKTtcclxuXHJcbiAgICAgICAgLy8gYmFzZUxlZnQuYmV2ZWwxID0gbmV3IFBvaW50MkQoYmFzZUxlZnRDZW50ZXIueCArIGJldmVsU2l6ZSwgYmFzZUxlZnRDZW50ZXIueSlcclxuICAgICAgICBiYXNlTGVmdC5jZW50ZXIgPSBiYXNlTGVmdENlbnRlclxyXG4gICAgICAgIC8vIGJhc2VMZWZ0LmJldmVsMiA9IG5ldyBQb2ludDJEKGJhc2VMZWZ0Q2VudGVyLngsIGJhc2VMZWZ0Q2VudGVyLnkgLSBiZXZlbFNpemUpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYmFzZUxlZnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlTGVmdEFybXBpdCgpOiBDb250cm9sUG9pbnQge1xyXG4gICAgbGV0IGxlZnRBcm1waXQgPSBuZXcgQ29udHJvbFBvaW50KCk7XHJcbiAgICBsZWZ0QXJtcGl0LmhhbmRsZSA9IG5ldyBQb2ludDJEKFxyXG4gICAgICAgIEFSUk9XX0NBTlZBU19DRU5URVIueCAtIFNJWkUgLyAyIC0gSEFORExFX1NQQUNJTkdfT1VUICogU0laRSxcclxuICAgICAgICBBUlJPV19DQU5WQVNfQ0VOVEVSLnkgKyAyICogSEFORExFX1NQQUNJTkdfQkVUV0VFTiAqIFNJWkUsXHJcbiAgICApO1xyXG4gICAgbGVmdEFybXBpdC51cGRhdGUgPSBmdW5jdGlvbihjb250cm9sUG9pbnRVcGRhdGU6IENvbnRyb2xQb2ludFVwZGF0ZSkge1xyXG4gICAgICAgIHRoaXMuc2l6ZVJhdGlvID0gZGVmYXVsdElmVW5kZWZpbmVkKGNvbnRyb2xQb2ludFVwZGF0ZS5zaXplUmF0aW8sIHRoaXMuc2l6ZVJhdGlvKTtcclxuICAgICAgICB0aGlzLnRoaWNrbmVzc1JhdGlvID0gZGVmYXVsdElmVW5kZWZpbmVkKGNvbnRyb2xQb2ludFVwZGF0ZS50aGlja25lc3NSYXRpbywgdGhpcy50aGlja25lc3NSYXRpbyk7XHJcbiAgICAgICAgdGhpcy5iZXZlbFNpemVSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChjb250cm9sUG9pbnRVcGRhdGUuYmV2ZWxTaXplUmF0aW8sIHRoaXMuYmV2ZWxTaXplUmF0aW8pO1xyXG4gICAgICAgIGxldCBvZmZzZXRYUmF0aW8gPSBkZWZhdWx0SWZVbmRlZmluZWQoY29udHJvbFBvaW50VXBkYXRlLm9mZnNldFhSYXRpbywgdGhpcy5vZmZzZXRSYXRpby54KTtcclxuICAgICAgICBsZXQgb2Zmc2V0WVJhdGlvID0gZGVmYXVsdElmVW5kZWZpbmVkKGNvbnRyb2xQb2ludFVwZGF0ZS5vZmZzZXRZUmF0aW8sIHRoaXMub2Zmc2V0UmF0aW8ueSk7XHJcblxyXG4gICAgICAgIGxldCBzaXplOiBudW1iZXIgPSB0aGlzLnNpemVSYXRpbyAqIFNJWkU7XHJcbiAgICAgICAgbGV0IHRoaWNrbmVzcyA9IHRoaXMudGhpY2tuZXNzUmF0aW8gKiBzaXplO1xyXG4gICAgICAgIGxldCBiZXZlbFNpemU6IG51bWJlciA9IHRoaXMuYmV2ZWxTaXplUmF0aW8gKiBzaXplO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0UmF0aW8ueCA9IG9mZnNldFhSYXRpbztcclxuICAgICAgICB0aGlzLm9mZnNldFJhdGlvLnkgPSBvZmZzZXRZUmF0aW87XHJcblxyXG4gICAgICAgIGxldCB0b3BMZWZ0ID0gbmV3IFBvaW50MkQoKFNJWkUgLSBzaXplKSAvIDIsIChTSVpFIC0gc2l6ZSkgLyAyKTtcclxuICAgICAgICB0b3BMZWZ0LnggKz0gdGhpcy5vZmZzZXRSYXRpby54ICogU0laRTtcclxuICAgICAgICB0b3BMZWZ0LnkgKz0gdGhpcy5vZmZzZXRSYXRpby55ICogU0laRTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbGVmdEFybXBpdENlbnRlciA9IG5ldyBQb2ludDJEKHRvcExlZnQueCArIHNpemUgLyAyIC0gdGhpY2tuZXNzIC8gMiwgdG9wTGVmdC55ICsgdGhpY2tuZXNzICogTWF0aC5TUVJUMiArIHRoaWNrbmVzcyAvIDIpO1xyXG5cclxuICAgICAgICAvLyBsZWZ0QXJtcGl0LmJldmVsMSA9IG5ldyBQb2ludDJEKGxlZnRBcm1waXRDZW50ZXIueCwgbGVmdEFybXBpdENlbnRlci55ICsgYmV2ZWxTaXplKVxyXG4gICAgICAgIGxlZnRBcm1waXQuY2VudGVyID0gbGVmdEFybXBpdENlbnRlclxyXG4gICAgICAgIC8vIGxlZnRBcm1waXQuYmV2ZWwyID0gbmV3IFBvaW50MkQobGVmdEFybXBpdENlbnRlci54IC0gYmV2ZWxTaXplICogTWF0aC5TUVJUMV8yLCBsZWZ0QXJtcGl0Q2VudGVyLnkgKyBiZXZlbFNpemUgKiBNYXRoLlNRUlQxXzIpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGVmdEFybXBpdDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVMZWZ0QXJtQm90dG9tKCk6IENvbnRyb2xQb2ludCB7XHJcbiAgICBsZXQgbGVmdEFybUJvdHRvbSA9IG5ldyBDb250cm9sUG9pbnQoKTtcclxuICAgIGxlZnRBcm1Cb3R0b20uaGFuZGxlID0gbmV3IFBvaW50MkQoXHJcbiAgICAgICAgQVJST1dfQ0FOVkFTX0NFTlRFUi54IC0gU0laRSAvIDIgLSBIQU5ETEVfU1BBQ0lOR19PVVQgKiBTSVpFLFxyXG4gICAgICAgIEFSUk9XX0NBTlZBU19DRU5URVIueSArIEhBTkRMRV9TUEFDSU5HX0JFVFdFRU4gKiBTSVpFLFxyXG4gICAgKTtcclxuICAgIGxlZnRBcm1Cb3R0b20udXBkYXRlID0gZnVuY3Rpb24oY29udHJvbFBvaW50VXBkYXRlOiBDb250cm9sUG9pbnRVcGRhdGUpIHtcclxuICAgICAgICB0aGlzLnNpemVSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChjb250cm9sUG9pbnRVcGRhdGUuc2l6ZVJhdGlvLCB0aGlzLnNpemVSYXRpbyk7XHJcbiAgICAgICAgdGhpcy50aGlja25lc3NSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChjb250cm9sUG9pbnRVcGRhdGUudGhpY2tuZXNzUmF0aW8sIHRoaXMudGhpY2tuZXNzUmF0aW8pO1xyXG4gICAgICAgIHRoaXMuYmV2ZWxTaXplUmF0aW8gPSBkZWZhdWx0SWZVbmRlZmluZWQoY29udHJvbFBvaW50VXBkYXRlLmJldmVsU2l6ZVJhdGlvLCB0aGlzLmJldmVsU2l6ZVJhdGlvKTtcclxuICAgICAgICBsZXQgb2Zmc2V0WFJhdGlvID0gZGVmYXVsdElmVW5kZWZpbmVkKGNvbnRyb2xQb2ludFVwZGF0ZS5vZmZzZXRYUmF0aW8sIHRoaXMub2Zmc2V0UmF0aW8ueCk7XHJcbiAgICAgICAgbGV0IG9mZnNldFlSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChjb250cm9sUG9pbnRVcGRhdGUub2Zmc2V0WVJhdGlvLCB0aGlzLm9mZnNldFJhdGlvLnkpO1xyXG5cclxuICAgICAgICBsZXQgc2l6ZTogbnVtYmVyID0gdGhpcy5zaXplUmF0aW8gKiBTSVpFO1xyXG4gICAgICAgIGxldCB0aGlja25lc3MgPSB0aGlzLnRoaWNrbmVzc1JhdGlvICogc2l6ZTtcclxuICAgICAgICBsZXQgYmV2ZWxTaXplOiBudW1iZXIgPSB0aGlzLmJldmVsU2l6ZVJhdGlvICogc2l6ZTtcclxuICAgICAgICB0aGlzLm9mZnNldFJhdGlvLnggPSBvZmZzZXRYUmF0aW87XHJcbiAgICAgICAgdGhpcy5vZmZzZXRSYXRpby55ID0gb2Zmc2V0WVJhdGlvO1xyXG5cclxuICAgICAgICBsZXQgdG9wTGVmdCA9IG5ldyBQb2ludDJEKChTSVpFIC0gc2l6ZSkgLyAyLCAoU0laRSAtIHNpemUpIC8gMik7XHJcbiAgICAgICAgdG9wTGVmdC54ICs9IHRoaXMub2Zmc2V0UmF0aW8ueCAqIFNJWkU7XHJcbiAgICAgICAgdG9wTGVmdC55ICs9IHRoaXMub2Zmc2V0UmF0aW8ueSAqIFNJWkU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGxlZnRBcm1Cb3R0b21DZW50ZXIgPSBuZXcgUG9pbnQyRCh0b3BMZWZ0LnggKyB0aGlja25lc3MgKiBNYXRoLlNRUlQxXzIsIHRvcExlZnQueSArIHNpemUgLyAyICsgdGhpY2tuZXNzICogTWF0aC5TUVJUMV8yKTtcclxuXHJcbiAgICAgICAgLy8gbGVmdEFybUJvdHRvbS5iZXZlbDEgPSBuZXcgUG9pbnQyRChsZWZ0QXJtQm90dG9tQ2VudGVyLnggKyBiZXZlbFNpemUgKiBNYXRoLlNRUlQxXzIsIGxlZnRBcm1Cb3R0b21DZW50ZXIueSAtIGJldmVsU2l6ZSAqIE1hdGguU1FSVDFfMilcclxuICAgICAgICBsZWZ0QXJtQm90dG9tLmNlbnRlciA9IGxlZnRBcm1Cb3R0b21DZW50ZXJcclxuICAgICAgICAvLyBsZWZ0QXJtQm90dG9tLmJldmVsMiA9IG5ldyBQb2ludDJEKGxlZnRBcm1Cb3R0b21DZW50ZXIueCAtIGJldmVsU2l6ZSAqIE1hdGguU1FSVDFfMiwgbGVmdEFybUJvdHRvbUNlbnRlci55IC0gYmV2ZWxTaXplICogTWF0aC5TUVJUMV8yKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxlZnRBcm1Cb3R0b207XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlTGVmdEFybVRvcCgpOiBDb250cm9sUG9pbnQge1xyXG4gICAgbGV0IGxlZnRBcm1Ub3AgPSBuZXcgQ29udHJvbFBvaW50KCk7XHJcbiAgICBsZWZ0QXJtVG9wLmhhbmRsZSA9IG5ldyBQb2ludDJEKEFSUk9XX0NBTlZBU19DRU5URVIueCAtIFNJWkUgLyAyIC0gSEFORExFX1NQQUNJTkdfT1VUICogU0laRSwgQVJST1dfQ0FOVkFTX0NFTlRFUi55KTtcclxuICAgIGxlZnRBcm1Ub3AudXBkYXRlID0gZnVuY3Rpb24oY29udHJvbFBvaW50VXBkYXRlOiBDb250cm9sUG9pbnRVcGRhdGUpIHtcclxuICAgICAgICB0aGlzLnNpemVSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChjb250cm9sUG9pbnRVcGRhdGUuc2l6ZVJhdGlvLCB0aGlzLnNpemVSYXRpbyk7XHJcbiAgICAgICAgdGhpcy50aGlja25lc3NSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChjb250cm9sUG9pbnRVcGRhdGUudGhpY2tuZXNzUmF0aW8sIHRoaXMudGhpY2tuZXNzUmF0aW8pO1xyXG4gICAgICAgIHRoaXMuYmV2ZWxTaXplUmF0aW8gPSBkZWZhdWx0SWZVbmRlZmluZWQoY29udHJvbFBvaW50VXBkYXRlLmJldmVsU2l6ZVJhdGlvLCB0aGlzLmJldmVsU2l6ZVJhdGlvKTtcclxuICAgICAgICBsZXQgb2Zmc2V0WFJhdGlvID0gZGVmYXVsdElmVW5kZWZpbmVkKGNvbnRyb2xQb2ludFVwZGF0ZS5vZmZzZXRYUmF0aW8sIHRoaXMub2Zmc2V0UmF0aW8ueCk7XHJcbiAgICAgICAgbGV0IG9mZnNldFlSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChjb250cm9sUG9pbnRVcGRhdGUub2Zmc2V0WVJhdGlvLCB0aGlzLm9mZnNldFJhdGlvLnkpO1xyXG5cclxuICAgICAgICBsZXQgc2l6ZTogbnVtYmVyID0gdGhpcy5zaXplUmF0aW8gKiBTSVpFO1xyXG4gICAgICAgIGxldCB0aGlja25lc3MgPSB0aGlzLnRoaWNrbmVzc1JhdGlvICogc2l6ZTtcclxuICAgICAgICBsZXQgYmV2ZWxTaXplOiBudW1iZXIgPSB0aGlzLmJldmVsU2l6ZVJhdGlvICogc2l6ZTtcclxuICAgICAgICB0aGlzLm9mZnNldFJhdGlvLnggPSBvZmZzZXRYUmF0aW87XHJcbiAgICAgICAgdGhpcy5vZmZzZXRSYXRpby55ID0gb2Zmc2V0WVJhdGlvO1xyXG5cclxuICAgICAgICBsZXQgdG9wTGVmdCA9IG5ldyBQb2ludDJEKChTSVpFIC0gc2l6ZSkgLyAyLCAoU0laRSAtIHNpemUpIC8gMik7XHJcbiAgICAgICAgdG9wTGVmdC54ICs9IHRoaXMub2Zmc2V0UmF0aW8ueCAqIFNJWkU7XHJcbiAgICAgICAgdG9wTGVmdC55ICs9IHRoaXMub2Zmc2V0UmF0aW8ueSAqIFNJWkU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGxlZnRBcm1Ub3BDZW50ZXIgPSBuZXcgUG9pbnQyRCh0b3BMZWZ0LngsIHRvcExlZnQueSArIHNpemUgLyAyKTtcclxuXHJcbiAgICAgICAgLy8gbGVmdEFybVRvcC5iZXZlbDEgPSBuZXcgUG9pbnQyRChsZWZ0QXJtVG9wQ2VudGVyLnggKyBiZXZlbFNpemUgKiBNYXRoLlNRUlQxXzIsIGxlZnRBcm1Ub3BDZW50ZXIueSArIGJldmVsU2l6ZSAqIE1hdGguU1FSVDFfMilcclxuICAgICAgICBsZWZ0QXJtVG9wLmNlbnRlciA9IGxlZnRBcm1Ub3BDZW50ZXJcclxuICAgICAgICAvLyBsZWZ0QXJtVG9wLmJldmVsMiA9IG5ldyBQb2ludDJEKGxlZnRBcm1Ub3BDZW50ZXIueCArIGJldmVsU2l6ZSAqIE1hdGguU1FSVDFfMiwgbGVmdEFybVRvcENlbnRlci55IC0gYmV2ZWxTaXplICogTWF0aC5TUVJUMV8yKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxlZnRBcm1Ub3A7XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiLi9jb2xvclwiO1xyXG5pbXBvcnQgeyBDb250cm9sUG9pbnQgfSBmcm9tIFwiLi9jb250cm9sX3BvaW50XCI7XHJcbmltcG9ydCB7IEhFSUdIVCwgTU9VU0UsIFNJREVCQVJfV0lEVEgsIFNJWkUsIFdJRFRIIH0gZnJvbSBcIi4vZ2xvYmFsXCI7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSBcIi4vbGF5ZXJcIjtcclxuaW1wb3J0IHsgZGlzdGFuY2UsIHBvaW50SXNXaXRoaW5SZWN0YW5nbGUgfSBmcm9tIFwiLi91dGlsXCI7XHJcblxyXG5leHBvcnQgbGV0IEhBTkRMRV9SQURJVVM6IG51bWJlciA9IDAuMDIgKiBTSVpFO1xyXG5sZXQgSEFORExFX1JBRElVU19IT1ZFUkVEOiBudW1iZXIgPSAwLjAzICogU0laRTtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb250cm9sUG9pbnRIYW5kbGUge1xyXG4gICAgcHVibGljIHg6IG51bWJlcjtcclxuICAgIHB1YmxpYyB5OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbGF5ZXJzOiBMYXllcltdO1xyXG4gICAgcHVibGljIGNvbnRyb2xQb2ludHM6IENvbnRyb2xQb2ludFtdO1xyXG4gICAgcHVibGljIGlzU2VsZWN0ZWQ6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgaXNWaXNpYmxlOiBib29sZWFuO1xyXG4gICAgcHVibGljIGlzSG92ZXJlZDogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgeDogbnVtYmVyLFxyXG4gICAgICAgIHk6IG51bWJlcixcclxuICAgICAgICBsYXllcnM6IExheWVyW10sXHJcbiAgICAgICAgY29udHJvbFBvaW50czogQ29udHJvbFBvaW50W10sXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgdGhpcy5sYXllcnMgPSBsYXllcnM7XHJcbiAgICAgICAgdGhpcy5jb250cm9sUG9pbnRzID0gY29udHJvbFBvaW50cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gdGhpcy5pc1NlbGVjdGVkXHJcbiAgICAgICAgICAgIHx8IHBvaW50SXNXaXRoaW5SZWN0YW5nbGUoXHJcbiAgICAgICAgICAgICAgICBNT1VTRSxcclxuICAgICAgICAgICAgICAgIFdJRFRIIC8gMiwgMC4wOCAqIEhFSUdIVCwgV0lEVEggLyAyLCAwLjkyICogSEVJR0hULFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAvLyB8fCAoU0lERUJBUl9XSURUSCA8IE1PVVNFLnggJiYgTU9VU0UueCA8IFdJRFRIXHJcbiAgICAgICAgICAgIC8vICAgICAmJiAwIDwgTU9VU0UueSAmJiBNT1VTRS55IDwgSEVJR0hUKTtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaXNIb3ZlcmVkID0gZGlzdGFuY2UoTU9VU0UueCwgTU9VU0UueSwgdGhpcy54LCB0aGlzLnkpIDwgSEFORExFX1JBRElVUztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1Zpc2libGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJhZGl1cyA9IHRoaXMuaXNIb3ZlcmVkID8gSEFORExFX1JBRElVU19IT1ZFUkVEIDogSEFORExFX1JBRElVU1xyXG4gICAgICAgIHRoaXMuZHJhd0hhbmRsZShjdHgsIHJhZGl1cyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3SGFuZGxlKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCByYWRpdXM6IG51bWJlcikge1xyXG4gICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwid2hpdGVcIjtcclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgcmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XHJcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgIGN0eC5maWxsKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gQ29sb3IuZ2V0UkdCKDEwMCwgMTAwLCAyNTUpO1xyXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGN0eC5hcmModGhpcy54LCB0aGlzLnksIHJhZGl1cyAqIDAuNywgMCwgMiAqIE1hdGguUEkpO1xyXG4gICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IGRlZmF1bHRJZlVuZGVmaW5lZCB9IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHsgUG9pbnQyRCB9IGZyb20gXCIuL3BvaW50XzJkXCI7XHJcbmltcG9ydCB7IENvbnRyb2xQb2ludCwgQ29udHJvbFBvaW50VXBkYXRlLCBnZW5lcmF0ZVN0YW5kYXJkQ29udHJvbFBvaW50cyB9IGZyb20gXCIuL2NvbnRyb2xfcG9pbnRcIjtcclxuaW1wb3J0IHsgTGF5ZXJUeXBlIH0gZnJvbSBcIi4vbGF5ZXJcIjtcclxuaW1wb3J0IHsgY2FsY3VsYXRlQmV2ZWxQb2ludHMsIHBlcmZvcm1DaXJjdWxhclBhdGgsIHBlcmZvcm1Ob25lUGF0aCwgcGVyZm9ybVN0cmFpZ2h0UGF0aCwgcmVuZGVyUHJldmlldyB9IGZyb20gXCIuL2xheWVyX2NvbW1vblwiO1xyXG5pbXBvcnQgeyBCZXZlbE1vZGUgfSBmcm9tIFwiLi9iZXZlbF9tb2RlXCI7XHJcbmltcG9ydCB7IGdldE5leHRMYXllcklkLCBQUkVWSUVXX1NJWkUsIFNJWkUgfSBmcm9tIFwiLi9nbG9iYWxcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiLi9jb2xvclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGaWxsVXBkYXRlIHtcclxuICAgIHRoaWNrbmVzc1JhdGlvPzogbnVtYmVyLFxyXG4gICAgYmV2ZWxTaXplUmF0aW8/OiBudW1iZXIsXHJcbiAgICBzaXplUmF0aW8/OiBudW1iZXIsXHJcbiAgICBvZmZzZXRYUmF0aW8/OiBudW1iZXIsXHJcbiAgICBvZmZzZXRZUmF0aW8/OiBudW1iZXIsXHJcbiAgICBiYXNlQ29sb3I/OiBDb2xvcixcclxuICAgIGxpZ2h0bmVzc1JhdGlvPzogbnVtYmVyLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRmlsbExheWVyIHtcclxuICAgIHB1YmxpYyBpZDogbnVtYmVyO1xyXG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyB0eXBlOiBMYXllclR5cGUgPSBMYXllclR5cGUuRklMTDtcclxuICAgIHB1YmxpYyBpc1Zpc2libGU6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgaXNTZWxlY3RlZDogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgcHVibGljIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICAgIHB1YmxpYyBwcmV2aWV3Q2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIHB1YmxpYyBwcmV2aWV3Q29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgcHVibGljIGJldmVsTW9kZTogQmV2ZWxNb2RlID0gQmV2ZWxNb2RlLkNJUkNVTEFSO1xyXG4gICAgcHVibGljIHNpemVSYXRpbzogbnVtYmVyO1xyXG4gICAgcHVibGljIHRoaWNrbmVzc1JhdGlvOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgYmV2ZWxTaXplUmF0aW86IG51bWJlcjtcclxuICAgIHB1YmxpYyBvZmZzZXRSYXRpbzogUG9pbnQyRDtcclxuICAgIHB1YmxpYyBiYXNlQ29sb3I6IENvbG9yO1xyXG4gICAgcHVibGljIGxpZ2h0bmVzc1JhdGlvOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgY29sb3I6IENvbG9yO1xyXG4gICAgcHVibGljIGNvbnRyb2xQb2ludHM6IENvbnRyb2xQb2ludFtdO1xyXG4gICAgcHVibGljIG5lZWRzVG9CZVJlbmRlcmVkOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBsb2dDb3VudGVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgICAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgaXNWaXNpYmxlOiBib29sZWFuLFxyXG4gICAgICAgIGlzU2VsZWN0ZWQ6IGJvb2xlYW4sXHJcbiAgICAgICAgc2l6ZVJhdGlvOiBudW1iZXIsXHJcbiAgICAgICAgdGhpY2tuZXNzUmF0aW86IG51bWJlcixcclxuICAgICAgICBiZXZlbFNpemVSYXRpbzogbnVtYmVyLFxyXG4gICAgICAgIG9mZnNldFJhdGlvOiBQb2ludDJELFxyXG4gICAgICAgIGJhc2VDb2xvcjogQ29sb3IsXHJcbiAgICAgICAgbGlnaHRuZXNzUmF0aW86IG51bWJlcixcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBnZXROZXh0TGF5ZXJJZCgpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBpc1Zpc2libGU7XHJcbiAgICAgICAgdGhpcy5pc1NlbGVjdGVkID0gaXNTZWxlY3RlZDtcclxuICAgICAgICB0aGlzLnNpemVSYXRpbyA9IHNpemVSYXRpbztcclxuICAgICAgICB0aGlzLnRoaWNrbmVzc1JhdGlvID0gdGhpY2tuZXNzUmF0aW87XHJcbiAgICAgICAgdGhpcy5iZXZlbFNpemVSYXRpbyA9IGJldmVsU2l6ZVJhdGlvO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0UmF0aW8gPSBvZmZzZXRSYXRpbztcclxuICAgICAgICB0aGlzLmJhc2VDb2xvciA9IGJhc2VDb2xvcjtcclxuICAgICAgICB0aGlzLmxpZ2h0bmVzc1JhdGlvID0gbGlnaHRuZXNzUmF0aW87XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IHRoaXMuYmFzZUNvbG9yLmNoYW5nZUxpZ2h0bmVzcyh0aGlzLmxpZ2h0bmVzc1JhdGlvKTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xQb2ludHMgPSBnZW5lcmF0ZVN0YW5kYXJkQ29udHJvbFBvaW50cygpO1xyXG4gICAgICAgIHRoaXMubmVlZHNUb0JlUmVuZGVyZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgbGV0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IFNJWkU7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IFNJWkU7XHJcbiAgICAgICAgbGV0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBjdHg7XHJcblxyXG4gICAgICAgIGxldCBwcmV2aWV3Q2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgICAgICAgcHJldmlld0NhbnZhcy53aWR0aCA9IFBSRVZJRVdfU0laRTtcclxuICAgICAgICBwcmV2aWV3Q2FudmFzLmhlaWdodCA9IFBSRVZJRVdfU0laRTtcclxuICAgICAgICBsZXQgcHJldmlld0NvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IHByZXZpZXdDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIHRoaXMucHJldmlld0NhbnZhcyA9IHByZXZpZXdDYW52YXM7XHJcbiAgICAgICAgdGhpcy5wcmV2aWV3Q29udGV4dCA9IHByZXZpZXdDb250ZXh0O1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgIHRoaWNrbmVzc1JhdGlvOiB0aGlzLnRoaWNrbmVzc1JhdGlvLFxyXG4gICAgICAgICAgICBiZXZlbFNpemVSYXRpbzogdGhpcy5iZXZlbFNpemVSYXRpbyxcclxuICAgICAgICAgICAgc2l6ZVJhdGlvOiB0aGlzLnNpemVSYXRpbyxcclxuICAgICAgICAgICAgb2Zmc2V0WFJhdGlvOiB0aGlzLm9mZnNldFJhdGlvLngsXHJcbiAgICAgICAgICAgIG9mZnNldFlSYXRpbzogdGhpcy5vZmZzZXRSYXRpby55LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZmlsbFVwZGF0ZTogRmlsbFVwZGF0ZSkge1xyXG4gICAgICAgIGxldCB0aGlja25lc3NSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChmaWxsVXBkYXRlLnRoaWNrbmVzc1JhdGlvLCB0aGlzLnRoaWNrbmVzc1JhdGlvKTtcclxuICAgICAgICBsZXQgYmV2ZWxTaXplUmF0aW8gPSBkZWZhdWx0SWZVbmRlZmluZWQoZmlsbFVwZGF0ZS5iZXZlbFNpemVSYXRpbywgdGhpcy5iZXZlbFNpemVSYXRpbyk7XHJcbiAgICAgICAgbGV0IHNpemVSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChmaWxsVXBkYXRlLnNpemVSYXRpbywgdGhpcy5zaXplUmF0aW8pO1xyXG4gICAgICAgIGxldCBvZmZzZXRYUmF0aW8gPSBkZWZhdWx0SWZVbmRlZmluZWQoZmlsbFVwZGF0ZS5vZmZzZXRYUmF0aW8sIHRoaXMub2Zmc2V0UmF0aW8ueCk7XHJcbiAgICAgICAgbGV0IG9mZnNldFlSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChmaWxsVXBkYXRlLm9mZnNldFlSYXRpbywgdGhpcy5vZmZzZXRSYXRpby55KTtcclxuICAgICAgICBsZXQgYmFzZUNvbG9yID0gZGVmYXVsdElmVW5kZWZpbmVkKGZpbGxVcGRhdGUuYmFzZUNvbG9yLCB0aGlzLmJhc2VDb2xvcik7XHJcbiAgICAgICAgbGV0IGxpZ2h0bmVzc1JhdGlvID0gZGVmYXVsdElmVW5kZWZpbmVkKGZpbGxVcGRhdGUubGlnaHRuZXNzUmF0aW8sIHRoaXMubGlnaHRuZXNzUmF0aW8pO1xyXG5cclxuICAgICAgICB0aGlzLnRoaWNrbmVzc1JhdGlvID0gdGhpY2tuZXNzUmF0aW87XHJcbiAgICAgICAgdGhpcy5iZXZlbFNpemVSYXRpbyA9IGJldmVsU2l6ZVJhdGlvO1xyXG4gICAgICAgIHRoaXMuc2l6ZVJhdGlvID0gc2l6ZVJhdGlvO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0UmF0aW8ueCA9IG9mZnNldFhSYXRpbztcclxuICAgICAgICB0aGlzLm9mZnNldFJhdGlvLnkgPSBvZmZzZXRZUmF0aW87XHJcbiAgICAgICAgdGhpcy5iYXNlQ29sb3IgPSBiYXNlQ29sb3I7XHJcbiAgICAgICAgdGhpcy5saWdodG5lc3NSYXRpbyA9IGxpZ2h0bmVzc1JhdGlvO1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLmJhc2VDb2xvci5jaGFuZ2VMaWdodG5lc3ModGhpcy5saWdodG5lc3NSYXRpbyk7XHJcblxyXG4gICAgICAgIGxldCBjb250cm9sUG9pbnRVcGRhdGU6IENvbnRyb2xQb2ludFVwZGF0ZSA9IHt9O1xyXG4gICAgICAgIGNvbnRyb2xQb2ludFVwZGF0ZS50aGlja25lc3NSYXRpbyA9IGZpbGxVcGRhdGUudGhpY2tuZXNzUmF0aW87XHJcbiAgICAgICAgY29udHJvbFBvaW50VXBkYXRlLmJldmVsU2l6ZVJhdGlvID0gZmlsbFVwZGF0ZS5iZXZlbFNpemVSYXRpbztcclxuICAgICAgICBjb250cm9sUG9pbnRVcGRhdGUuc2l6ZVJhdGlvID0gZmlsbFVwZGF0ZS5zaXplUmF0aW87XHJcbiAgICAgICAgY29udHJvbFBvaW50VXBkYXRlLm9mZnNldFhSYXRpbyA9IGZpbGxVcGRhdGUub2Zmc2V0WFJhdGlvO1xyXG4gICAgICAgIGNvbnRyb2xQb2ludFVwZGF0ZS5vZmZzZXRZUmF0aW8gPSBmaWxsVXBkYXRlLm9mZnNldFlSYXRpbztcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udHJvbFBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xQb2ludHNbaV0udXBkYXRlKGNvbnRyb2xQb2ludFVwZGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5lZWRzVG9CZVJlbmRlcmVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhkZXN0aW5hdGlvbkN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB0b3BMZWZ0WDogbnVtYmVyLCB0b3BMZWZ0WTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmVlZHNUb0JlUmVuZGVyZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmlzaWJsZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlc3RpbmF0aW9uQ3R4LmRyYXdJbWFnZSh0aGlzLmNhbnZhcywgdG9wTGVmdFgsIHRvcExlZnRZKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhd1Jlc2l6ZWQoXHJcbiAgICAgICAgZGVzdGluYXRpb25DdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcclxuICAgICAgICBkZXN0aW5hdGlvblg6IG51bWJlcixcclxuICAgICAgICBkZXN0aW5hdGlvblNpemU6IG51bWJlcixcclxuICAgICAgICByb3RhdGlvbkRlZ3JlZXM6IG51bWJlcixcclxuICAgICkge1xyXG4gICAgICAgIGlmICh0aGlzLm5lZWRzVG9CZVJlbmRlcmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5pc1Zpc2libGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNlbnRlclg6IG51bWJlciA9IGRlc3RpbmF0aW9uWCArIGRlc3RpbmF0aW9uU2l6ZSAvIDI7XHJcbiAgICAgICAgbGV0IGNlbnRlclk6IG51bWJlciA9IGRlc3RpbmF0aW9uU2l6ZSAvIDI7XHJcblxyXG4gICAgICAgIGRlc3RpbmF0aW9uQ3R4LnNhdmUoKTtcclxuICAgICAgICBkZXN0aW5hdGlvbkN0eC50cmFuc2xhdGUoY2VudGVyWCwgY2VudGVyWSk7XHJcbiAgICAgICAgZGVzdGluYXRpb25DdHgucm90YXRlKHJvdGF0aW9uRGVncmVlcyAvIDE4MCAqIE1hdGguUEkpO1xyXG4gICAgICAgIGRlc3RpbmF0aW9uQ3R4LnRyYW5zbGF0ZSgtY2VudGVyWCwgLWNlbnRlclkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGRlc3RpbmF0aW9uQ3R4LmRyYXdJbWFnZSh0aGlzLmNhbnZhcywgZGVzdGluYXRpb25YLCAwLCBkZXN0aW5hdGlvblNpemUsIGRlc3RpbmF0aW9uU2l6ZSk7XHJcbiAgICAgICAgZGVzdGluYXRpb25DdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJNYWluKCk7XHJcbiAgICAgICAgcmVuZGVyUHJldmlldyh0aGlzLnByZXZpZXdDb250ZXh0LCB0aGlzLmNhbnZhcyk7XHJcbiAgICAgICAgdGhpcy5uZWVkc1RvQmVSZW5kZXJlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyTWFpbigpIHtcclxuICAgICAgICBsZXQgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSB0aGlzLmNvbnRleHQ7XHJcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBTSVpFLCBTSVpFKTtcclxuXHJcbiAgICAgICAgY3R4LnNhdmUoKTtcclxuXHJcbiAgICAgICAgY2FsY3VsYXRlQmV2ZWxQb2ludHModGhpcy5jb250cm9sUG9pbnRzKTtcclxuICAgICAgICBzd2l0Y2godGhpcy5iZXZlbE1vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBCZXZlbE1vZGUuTk9ORTpcclxuICAgICAgICAgICAgICAgIHBlcmZvcm1Ob25lUGF0aChjdHgsIHRoaXMuY29udHJvbFBvaW50cyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBCZXZlbE1vZGUuU1RSQUlHSFQ6XHJcbiAgICAgICAgICAgICAgICBwZXJmb3JtU3RyYWlnaHRQYXRoKGN0eCwgdGhpcy5jb250cm9sUG9pbnRzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJldmVsTW9kZS5DSVJDVUxBUjpcclxuICAgICAgICAgICAgICAgIHBlcmZvcm1DaXJjdWxhclBhdGgoY3R4LCB0aGlzLmNvbnRyb2xQb2ludHMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvci50b1N0cmluZygpO1xyXG4gICAgICAgIGN0eC5maWxsKCk7XHJcblxyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgUG9pbnQyRCB9IGZyb20gXCIuL3BvaW50XzJkXCI7XHJcblxyXG5leHBvcnQgbGV0IFdJRFRIOiBudW1iZXIgPSAxNjg5O1xyXG5leHBvcnQgbGV0IEhFSUdIVDogbnVtYmVyID0gOTUwO1xyXG5leHBvcnQgbGV0IFNJWkU6IG51bWJlciA9IE1hdGguZmxvb3IoMC4zNSAqIFdJRFRIKTtcclxuZXhwb3J0IGxldCBBUlJPV19DQU5WQVNfQ0VOVEVSOiBQb2ludDJEID0gbmV3IFBvaW50MkQoV0lEVEggKiAwLjc1LCAoSEVJR0hUICogMS4wOCkgKiAwLjUwKTtcclxuZXhwb3J0IGxldCBDSEVDS0VSQk9BUkRfU0laRSA9IE1hdGguY2VpbCgwLjA0ICogU0laRSk7XHJcbmV4cG9ydCBsZXQgUFJFVklFV19TSVpFOiBudW1iZXIgPSBNYXRoLmZsb29yKDAuMDQ4NSAqIFdJRFRIKTtcclxuZXhwb3J0IGxldCBQUkVWSUVXX0NIRUNLRVJCT0FSRF9TSVpFOiBudW1iZXIgPSBNYXRoLmNlaWwoMC4wNCAqIFBSRVZJRVdfU0laRSk7XHJcbmV4cG9ydCBsZXQgTU9VU0U6IFBvaW50MkQgPSBuZXcgUG9pbnQyRCgtMSwgLTEpO1xyXG5leHBvcnQgbGV0IFNJREVCQVJfV0lEVEg6IG51bWJlciA9IDc4MDtcclxuXHJcbmxldCBMQVlFUl9JRF9DT1VOVEVSOiBudW1iZXIgPSAwO1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV4dExheWVySWQoKTogbnVtYmVyIHtcclxuICAgIExBWUVSX0lEX0NPVU5URVIrKztcclxuICAgIHJldHVybiBMQVlFUl9JRF9DT1VOVEVSO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0TGF5ZXJJZENvdW50ZXIodmFsdWU6IG51bWJlcikge1xyXG4gICAgTEFZRVJfSURfQ09VTlRFUiA9IHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlTW91c2VQb3NpdGlvbihlOiBNb3VzZUV2ZW50KSB7XHJcbiAgICBNT1VTRS54ID0gZS5jbGllbnRYO1xyXG4gICAgTU9VU0UueSA9IGUuY2xpZW50WTtcclxufVxyXG4iLCJpbXBvcnQgeyBGaWxsTGF5ZXIsIEZpbGxVcGRhdGUgfSBmcm9tIFwiLi9maWxsX2xheWVyXCI7XHJcbmltcG9ydCB7IExpbmVMYXllciwgTGluZVVwZGF0ZSB9IGZyb20gXCIuL2xpbmVfbGF5ZXJcIjtcclxuXHJcbmV4cG9ydCB0eXBlIExheWVyID0gRmlsbExheWVyIHwgTGluZUxheWVyO1xyXG5cclxuZXhwb3J0IHR5cGUgTGF5ZXJVcGRhdGUgPSBGaWxsVXBkYXRlIHwgTGluZVVwZGF0ZTtcclxuXHJcbmV4cG9ydCBlbnVtIExheWVyVHlwZSB7XHJcbiAgICBMSU5FID0gXCJMaW5lXCIsXHJcbiAgICBGSUxMID0gXCJGaWxsXCIsXHJcbn1cclxuIiwiaW1wb3J0IHsgQ29udHJvbFBvaW50IH0gZnJvbSBcIi4vY29udHJvbF9wb2ludFwiO1xyXG5pbXBvcnQgeyBQUkVWSUVXX0NIRUNLRVJCT0FSRF9TSVpFLCBQUkVWSUVXX1NJWkUgfSBmcm9tIFwiLi9nbG9iYWxcIjtcclxuaW1wb3J0IHsgZmlsbFdpdGhUcmFuc3BhcmVuY3lDaGVja2VyYm9hcmQgfSBmcm9tIFwiLi91aV91dGlsXCI7XHJcbmltcG9ydCB7IGRpc3RhbmNlLCBsZXJwUG9pbnQgfSBmcm9tIFwiLi91dGlsXCI7XHJcblxyXG4vLyBEZWZpbmUgYmV2ZWwgcG9pbnRzIGFzIGxpbmVhciBpbnRlcnBvbGF0aW9ucyBiZXR3ZWVuIGNvbnRyb2wgcG9pbnRzXHJcbi8vIFRoZSBvbmx5IHRyaWNrIHRvIGxldHRpbmcgdGhlIHVzZXIgZGVmaW5lIGEgcmF0aW8gaXMgdG8gbGltaXQgdGhlIGRpc3RhbmNlXHJcbi8vIHRvIHRoYXQgb2YgdGhlIG5lYXJlc3QgYWRqYWNlbnQgcG9pbnRcclxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZUJldmVsUG9pbnRzKGNvbnRyb2xQb2ludHM6IENvbnRyb2xQb2ludFtdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRyb2xQb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgY3VycmVudDogQ29udHJvbFBvaW50ID0gY29udHJvbFBvaW50c1tpXTtcclxuICAgICAgICBsZXQgbmV4dEluZGV4OiBudW1iZXIgPSAoaSsxKSAlIGNvbnRyb2xQb2ludHMubGVuZ3RoO1xyXG4gICAgICAgIGxldCBuZXh0OiBDb250cm9sUG9pbnQgPSBjb250cm9sUG9pbnRzW25leHRJbmRleF07XHJcbiAgICAgICAgbGV0IHByZXZpb3VzSW5kZXg6IG51bWJlciA9IGktMSA9PT0gLTEgPyBjb250cm9sUG9pbnRzLmxlbmd0aCAtIDEgOiBpLTE7XHJcbiAgICAgICAgbGV0IHByZXZpb3VzOiBDb250cm9sUG9pbnQgPSBjb250cm9sUG9pbnRzW3ByZXZpb3VzSW5kZXhdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBkaXN0YW5jZVRvUHJldmlvdXM6IG51bWJlciA9IGRpc3RhbmNlKFxyXG4gICAgICAgICAgICBjdXJyZW50LmNlbnRlci54LCBjdXJyZW50LmNlbnRlci55LFxyXG4gICAgICAgICAgICBwcmV2aW91cy5jZW50ZXIueCwgcHJldmlvdXMuY2VudGVyLnksXHJcbiAgICAgICAgKTtcclxuICAgICAgICBsZXQgZGlzdGFuY2VUb05leHQ6IG51bWJlciA9IGRpc3RhbmNlKFxyXG4gICAgICAgICAgICBjdXJyZW50LmNlbnRlci54LCBjdXJyZW50LmNlbnRlci55LFxyXG4gICAgICAgICAgICBuZXh0LmNlbnRlci54LCBuZXh0LmNlbnRlci55LFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbGV0IHNtYWxsZXJEaXN0YW5jZTogbnVtYmVyID0gTWF0aC5taW4oZGlzdGFuY2VUb1ByZXZpb3VzLCBkaXN0YW5jZVRvTmV4dCk7XHJcbiAgICAgICAgLy8gbGV0IGJldmVsUmF0aW86IG51bWJlciA9IDAuNTtcclxuICAgICAgICBsZXQgYmV2ZWxSYXRpbzogbnVtYmVyID0gY29udHJvbFBvaW50c1tpXS5iZXZlbFNpemVSYXRpbztcclxuICAgICAgICBsZXQgZGlzdGFuY2VUb0dvOiBudW1iZXIgPSBzbWFsbGVyRGlzdGFuY2UgKiBiZXZlbFJhdGlvO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGN1cnJlbnQuYmV2ZWwxID0gbGVycFBvaW50KGN1cnJlbnQuY2VudGVyLCBwcmV2aW91cy5jZW50ZXIsIGRpc3RhbmNlVG9HbyAvIGRpc3RhbmNlVG9QcmV2aW91cyk7XHJcbiAgICAgICAgY3VycmVudC5iZXZlbDIgPSBsZXJwUG9pbnQoY3VycmVudC5jZW50ZXIsIG5leHQuY2VudGVyLCBkaXN0YW5jZVRvR28gLyBkaXN0YW5jZVRvTmV4dCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwZXJmb3JtTm9uZVBhdGgoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGNvbnRyb2xQb2ludHM6IENvbnRyb2xQb2ludFtdKSB7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRyb2xQb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgY3A6IENvbnRyb2xQb2ludCA9IGNvbnRyb2xQb2ludHNbaV07XHJcbiAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgICAgY3R4Lm1vdmVUbyhjcC5jZW50ZXIueCwgY3AuY2VudGVyLnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY3R4LmxpbmVUbyhjcC5jZW50ZXIueCwgY3AuY2VudGVyLnkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGN0eC5jbG9zZVBhdGgoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBlcmZvcm1TdHJhaWdodFBhdGgoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGNvbnRyb2xQb2ludHM6IENvbnRyb2xQb2ludFtdKSB7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRyb2xQb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgY3A6IENvbnRyb2xQb2ludCA9IGNvbnRyb2xQb2ludHNbaV07XHJcbiAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgICAgY3R4Lm1vdmVUbyhjcC5iZXZlbDEueCwgY3AuYmV2ZWwxLnkpO1xyXG4gICAgICAgICAgICBjdHgubGluZVRvKGNwLmNlbnRlci54LCBjcC5jZW50ZXIueSk7XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3AuYmV2ZWwyLngsIGNwLmJldmVsMi55KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3AuYmV2ZWwxLngsIGNwLmJldmVsMS55KTtcclxuICAgICAgICAgICAgY3R4LmxpbmVUbyhjcC5jZW50ZXIueCwgY3AuY2VudGVyLnkpO1xyXG4gICAgICAgICAgICBjdHgubGluZVRvKGNwLmJldmVsMi54LCBjcC5iZXZlbDIueSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY3R4LmNsb3NlUGF0aCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGVyZm9ybUNpcmN1bGFyUGF0aChjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgY29udHJvbFBvaW50czogQ29udHJvbFBvaW50W10pIHtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udHJvbFBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBjcDogQ29udHJvbFBvaW50ID0gY29udHJvbFBvaW50c1tpXTtcclxuICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgICBjdHgubW92ZVRvKGNwLmJldmVsMS54LCBjcC5iZXZlbDEueSk7XHJcbiAgICAgICAgICAgIGxldCByYWRpdXMgPSAwLjUgKiBkaXN0YW5jZShjcC5iZXZlbDEueCwgY3AuYmV2ZWwxLnksIGNwLmJldmVsMi54LCBjcC5iZXZlbDIueSk7XHJcbiAgICAgICAgICAgIGN0eC5hcmNUbyhjcC5jZW50ZXIueCwgY3AuY2VudGVyLnksIGNwLmJldmVsMi54LCBjcC5iZXZlbDIueSwgcmFkaXVzKTtcclxuICAgICAgICAgICAgY3R4LmxpbmVUbyhjcC5iZXZlbDIueCwgY3AuYmV2ZWwyLnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY3R4LmxpbmVUbyhjcC5iZXZlbDEueCwgY3AuYmV2ZWwxLnkpO1xyXG4gICAgICAgICAgICBsZXQgcmFkaXVzID0gMC41ICogZGlzdGFuY2UoY3AuYmV2ZWwxLngsIGNwLmJldmVsMS55LCBjcC5iZXZlbDIueCwgY3AuYmV2ZWwyLnkpO1xyXG4gICAgICAgICAgICBjdHguYXJjVG8oY3AuY2VudGVyLngsIGNwLmNlbnRlci55LCBjcC5iZXZlbDIueCwgY3AuYmV2ZWwyLnksIHJhZGl1cyk7XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8oY3AuYmV2ZWwyLngsIGNwLmJldmVsMi55KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjdHguY2xvc2VQYXRoKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJQcmV2aWV3KHByZXZpZXdDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHNvdXJjZUNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgIGxldCBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IHByZXZpZXdDb250ZXh0O1xyXG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBQUkVWSUVXX1NJWkUsIFBSRVZJRVdfU0laRSk7XHJcbiAgICBmaWxsV2l0aFRyYW5zcGFyZW5jeUNoZWNrZXJib2FyZChjdHgsIDAsIDAsIFBSRVZJRVdfU0laRSwgUFJFVklFV19TSVpFLCBQUkVWSUVXX0NIRUNLRVJCT0FSRF9TSVpFKTtcclxuICAgIGN0eC5kcmF3SW1hZ2Uoc291cmNlQ2FudmFzLCAwLCAwLCBQUkVWSUVXX1NJWkUsIFBSRVZJRVdfU0laRSk7XHJcbn1cclxuIiwiaW1wb3J0IHsgY2lyY2xlLCBkZWZhdWx0SWZVbmRlZmluZWR9IGZyb20gXCIuL3V0aWxcIjtcclxuaW1wb3J0IHsgUG9pbnQyRCB9IGZyb20gXCIuL3BvaW50XzJkXCI7XHJcbmltcG9ydCB7IENvbnRyb2xQb2ludCwgQ29udHJvbFBvaW50VXBkYXRlLCBnZW5lcmF0ZVN0YW5kYXJkQ29udHJvbFBvaW50cyB9IGZyb20gXCIuL2NvbnRyb2xfcG9pbnRcIjtcclxuaW1wb3J0IHsgTGF5ZXJUeXBlIH0gZnJvbSBcIi4vbGF5ZXJcIjtcclxuaW1wb3J0IHsgY2FsY3VsYXRlQmV2ZWxQb2ludHMsIHBlcmZvcm1DaXJjdWxhclBhdGgsIHBlcmZvcm1Ob25lUGF0aCwgcGVyZm9ybVN0cmFpZ2h0UGF0aCwgcmVuZGVyUHJldmlldyB9IGZyb20gXCIuL2xheWVyX2NvbW1vblwiO1xyXG5pbXBvcnQgeyBCZXZlbE1vZGUgfSBmcm9tIFwiLi9iZXZlbF9tb2RlXCI7XHJcbmltcG9ydCB7IGdldE5leHRMYXllcklkLCBQUkVWSUVXX1NJWkUsIFNJWkUgfSBmcm9tIFwiLi9nbG9iYWxcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiLi9jb2xvclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMaW5lVXBkYXRlIHtcclxuICAgIHRoaWNrbmVzc1JhdGlvPzogbnVtYmVyLFxyXG4gICAgbGluZVdpZHRoUmF0aW8/OiBudW1iZXIsXHJcbiAgICBiZXZlbFNpemVSYXRpbz86IG51bWJlcixcclxuICAgIHNpemVSYXRpbz86IG51bWJlcixcclxuICAgIG9mZnNldFhSYXRpbz86IG51bWJlcixcclxuICAgIG9mZnNldFlSYXRpbz86IG51bWJlcixcclxuICAgIGJhc2VDb2xvcj86IENvbG9yLFxyXG4gICAgbGlnaHRuZXNzUmF0aW8/OiBudW1iZXIsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5lTGF5ZXIge1xyXG4gICAgcHVibGljIGlkOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHR5cGU6IExheWVyVHlwZSA9IExheWVyVHlwZS5MSU5FO1xyXG4gICAgcHVibGljIGlzVmlzaWJsZTogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBpc1NlbGVjdGVkOiBib29sZWFuO1xyXG4gICAgcHVibGljIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBwdWJsaWMgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgcHVibGljIHByZXZpZXdDYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgcHVibGljIHByZXZpZXdDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBwdWJsaWMgYmV2ZWxNb2RlOiBCZXZlbE1vZGUgPSBCZXZlbE1vZGUuQ0lSQ1VMQVI7XHJcbiAgICBwdWJsaWMgc2l6ZVJhdGlvOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgdGhpY2tuZXNzUmF0aW86IG51bWJlcjtcclxuICAgIHB1YmxpYyBsaW5lV2lkdGhSYXRpbzogbnVtYmVyO1xyXG4gICAgcHVibGljIGJldmVsU2l6ZVJhdGlvOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgb2Zmc2V0UmF0aW86IFBvaW50MkQ7XHJcbiAgICBwdWJsaWMgYmFzZUNvbG9yOiBDb2xvcjtcclxuICAgIHB1YmxpYyBsaWdodG5lc3NSYXRpbzogbnVtYmVyO1xyXG4gICAgcHVibGljIGNvbG9yOiBDb2xvcjtcclxuICAgIHB1YmxpYyBjb250cm9sUG9pbnRzOiBDb250cm9sUG9pbnRbXTtcclxuICAgIHB1YmxpYyBuZWVkc1RvQmVSZW5kZXJlZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgbG9nQ291bnRlcjogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgbmFtZTogc3RyaW5nLFxyXG4gICAgICAgIGlzVmlzaWJsZTogYm9vbGVhbixcclxuICAgICAgICBpc1NlbGVjdGVkOiBib29sZWFuLFxyXG4gICAgICAgIHNpemVSYXRpbzogbnVtYmVyLFxyXG4gICAgICAgIHRoaWNrbmVzc1JhdGlvOiBudW1iZXIsXHJcbiAgICAgICAgbGluZVdpZHRoUmF0aW86IG51bWJlcixcclxuICAgICAgICBiZXZlbFNpemVSYXRpbzogbnVtYmVyLFxyXG4gICAgICAgIG9mZnNldFJhdGlvOiBQb2ludDJELFxyXG4gICAgICAgIGJhc2VDb2xvcjogQ29sb3IsXHJcbiAgICAgICAgbGlnaHRuZXNzUmF0aW86IG51bWJlcixcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBnZXROZXh0TGF5ZXJJZCgpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBpc1Zpc2libGU7XHJcbiAgICAgICAgdGhpcy5pc1NlbGVjdGVkID0gaXNTZWxlY3RlZDtcclxuICAgICAgICB0aGlzLnNpemVSYXRpbyA9IHNpemVSYXRpbztcclxuICAgICAgICB0aGlzLnRoaWNrbmVzc1JhdGlvID0gdGhpY2tuZXNzUmF0aW87XHJcbiAgICAgICAgdGhpcy5saW5lV2lkdGhSYXRpbyA9IGxpbmVXaWR0aFJhdGlvO1xyXG4gICAgICAgIHRoaXMuYmV2ZWxTaXplUmF0aW8gPSBiZXZlbFNpemVSYXRpbztcclxuICAgICAgICB0aGlzLm9mZnNldFJhdGlvID0gb2Zmc2V0UmF0aW87XHJcbiAgICAgICAgdGhpcy5iYXNlQ29sb3IgPSBiYXNlQ29sb3I7XHJcbiAgICAgICAgdGhpcy5saWdodG5lc3NSYXRpbyA9IGxpZ2h0bmVzc1JhdGlvO1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLmJhc2VDb2xvci5jaGFuZ2VMaWdodG5lc3ModGhpcy5saWdodG5lc3NSYXRpbyk7XHJcbiAgICAgICAgdGhpcy5jb250cm9sUG9pbnRzID0gZ2VuZXJhdGVTdGFuZGFyZENvbnRyb2xQb2ludHMoKTtcclxuICAgICAgICB0aGlzLm5lZWRzVG9CZVJlbmRlcmVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICBjYW52YXMud2lkdGggPSBTSVpFO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBTSVpFO1xyXG4gICAgICAgIGxldCBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY3R4O1xyXG5cclxuICAgICAgICBsZXQgcHJldmlld0NhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgICAgIHByZXZpZXdDYW52YXMud2lkdGggPSBQUkVWSUVXX1NJWkU7XHJcbiAgICAgICAgcHJldmlld0NhbnZhcy5oZWlnaHQgPSBQUkVWSUVXX1NJWkU7XHJcbiAgICAgICAgbGV0IHByZXZpZXdDb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBwcmV2aWV3Q2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB0aGlzLnByZXZpZXdDYW52YXMgPSBwcmV2aWV3Q2FudmFzO1xyXG4gICAgICAgIHRoaXMucHJldmlld0NvbnRleHQgPSBwcmV2aWV3Q29udGV4dDtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGUoe1xyXG4gICAgICAgICAgICB0aGlja25lc3NSYXRpbzogdGhpcy50aGlja25lc3NSYXRpbyxcclxuICAgICAgICAgICAgbGluZVdpZHRoUmF0aW86IHRoaXMubGluZVdpZHRoUmF0aW8sXHJcbiAgICAgICAgICAgIGJldmVsU2l6ZVJhdGlvOiB0aGlzLmJldmVsU2l6ZVJhdGlvLFxyXG4gICAgICAgICAgICBzaXplUmF0aW86IHRoaXMuc2l6ZVJhdGlvLFxyXG4gICAgICAgICAgICBvZmZzZXRYUmF0aW86IHRoaXMub2Zmc2V0UmF0aW8ueCxcclxuICAgICAgICAgICAgb2Zmc2V0WVJhdGlvOiB0aGlzLm9mZnNldFJhdGlvLnksXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShsaW5lVXBkYXRlOiBMaW5lVXBkYXRlKSB7XHJcbiAgICAgICAgbGV0IHRoaWNrbmVzc1JhdGlvID0gZGVmYXVsdElmVW5kZWZpbmVkKGxpbmVVcGRhdGUudGhpY2tuZXNzUmF0aW8sIHRoaXMudGhpY2tuZXNzUmF0aW8pO1xyXG4gICAgICAgIGxldCBsaW5lV2lkdGhSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChsaW5lVXBkYXRlLmxpbmVXaWR0aFJhdGlvLCB0aGlzLmxpbmVXaWR0aFJhdGlvKTtcclxuICAgICAgICBsZXQgYmV2ZWxTaXplUmF0aW8gPSBkZWZhdWx0SWZVbmRlZmluZWQobGluZVVwZGF0ZS5iZXZlbFNpemVSYXRpbywgdGhpcy5iZXZlbFNpemVSYXRpbyk7XHJcbiAgICAgICAgbGV0IHNpemVSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChsaW5lVXBkYXRlLnNpemVSYXRpbywgdGhpcy5zaXplUmF0aW8pO1xyXG4gICAgICAgIGxldCBvZmZzZXRYUmF0aW8gPSBkZWZhdWx0SWZVbmRlZmluZWQobGluZVVwZGF0ZS5vZmZzZXRYUmF0aW8sIHRoaXMub2Zmc2V0UmF0aW8ueCk7XHJcbiAgICAgICAgbGV0IG9mZnNldFlSYXRpbyA9IGRlZmF1bHRJZlVuZGVmaW5lZChsaW5lVXBkYXRlLm9mZnNldFlSYXRpbywgdGhpcy5vZmZzZXRSYXRpby55KTtcclxuICAgICAgICBsZXQgYmFzZUNvbG9yID0gZGVmYXVsdElmVW5kZWZpbmVkKGxpbmVVcGRhdGUuYmFzZUNvbG9yLCB0aGlzLmJhc2VDb2xvcik7XHJcbiAgICAgICAgbGV0IGxpZ2h0bmVzc1JhdGlvID0gZGVmYXVsdElmVW5kZWZpbmVkKGxpbmVVcGRhdGUubGlnaHRuZXNzUmF0aW8sIHRoaXMubGlnaHRuZXNzUmF0aW8pO1xyXG5cclxuICAgICAgICB0aGlzLnRoaWNrbmVzc1JhdGlvID0gdGhpY2tuZXNzUmF0aW87XHJcbiAgICAgICAgdGhpcy5saW5lV2lkdGhSYXRpbyA9IGxpbmVXaWR0aFJhdGlvO1xyXG4gICAgICAgIHRoaXMuYmV2ZWxTaXplUmF0aW8gPSBiZXZlbFNpemVSYXRpbztcclxuICAgICAgICB0aGlzLnNpemVSYXRpbyA9IHNpemVSYXRpbztcclxuICAgICAgICB0aGlzLm9mZnNldFJhdGlvLnggPSBvZmZzZXRYUmF0aW87XHJcbiAgICAgICAgdGhpcy5vZmZzZXRSYXRpby55ID0gb2Zmc2V0WVJhdGlvO1xyXG4gICAgICAgIHRoaXMuYmFzZUNvbG9yID0gYmFzZUNvbG9yO1xyXG4gICAgICAgIHRoaXMubGlnaHRuZXNzUmF0aW8gPSBsaWdodG5lc3NSYXRpbztcclxuICAgICAgICB0aGlzLmNvbG9yID0gdGhpcy5iYXNlQ29sb3IuY2hhbmdlTGlnaHRuZXNzKHRoaXMubGlnaHRuZXNzUmF0aW8pO1xyXG5cclxuICAgICAgICBsZXQgY29udHJvbFBvaW50VXBkYXRlOiBDb250cm9sUG9pbnRVcGRhdGUgPSB7fTtcclxuICAgICAgICBjb250cm9sUG9pbnRVcGRhdGUudGhpY2tuZXNzUmF0aW8gPSBsaW5lVXBkYXRlLnRoaWNrbmVzc1JhdGlvO1xyXG4gICAgICAgIGNvbnRyb2xQb2ludFVwZGF0ZS5iZXZlbFNpemVSYXRpbyA9IGxpbmVVcGRhdGUuYmV2ZWxTaXplUmF0aW87XHJcbiAgICAgICAgY29udHJvbFBvaW50VXBkYXRlLnNpemVSYXRpbyA9IGxpbmVVcGRhdGUuc2l6ZVJhdGlvO1xyXG4gICAgICAgIGNvbnRyb2xQb2ludFVwZGF0ZS5vZmZzZXRYUmF0aW8gPSBsaW5lVXBkYXRlLm9mZnNldFhSYXRpbztcclxuICAgICAgICBjb250cm9sUG9pbnRVcGRhdGUub2Zmc2V0WVJhdGlvID0gbGluZVVwZGF0ZS5vZmZzZXRZUmF0aW87XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbnRyb2xQb2ludHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5jb250cm9sUG9pbnRzW2ldLnVwZGF0ZShjb250cm9sUG9pbnRVcGRhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5uZWVkc1RvQmVSZW5kZXJlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoZGVzdGluYXRpb25DdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgdG9wTGVmdFg6IG51bWJlciwgdG9wTGVmdFk6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLm5lZWRzVG9CZVJlbmRlcmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5pc1Zpc2libGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZXN0aW5hdGlvbkN0eC5kcmF3SW1hZ2UodGhpcy5jYW52YXMsIHRvcExlZnRYLCB0b3BMZWZ0WSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXdSZXNpemVkKFxyXG4gICAgICAgIGRlc3RpbmF0aW9uQ3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXHJcbiAgICAgICAgZGVzdGluYXRpb25YOiBudW1iZXIsXHJcbiAgICAgICAgZGVzdGluYXRpb25TaXplOiBudW1iZXIsXHJcbiAgICAgICAgcm90YXRpb25EZWdyZWVzOiBudW1iZXIsXHJcbiAgICApIHtcclxuICAgICAgICBpZiAodGhpcy5uZWVkc1RvQmVSZW5kZXJlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjZW50ZXJYOiBudW1iZXIgPSBkZXN0aW5hdGlvblggKyBkZXN0aW5hdGlvblNpemUgLyAyO1xyXG4gICAgICAgIGxldCBjZW50ZXJZOiBudW1iZXIgPSBkZXN0aW5hdGlvblNpemUgLyAyO1xyXG5cclxuICAgICAgICBkZXN0aW5hdGlvbkN0eC5zYXZlKCk7XHJcbiAgICAgICAgZGVzdGluYXRpb25DdHgudHJhbnNsYXRlKGNlbnRlclgsIGNlbnRlclkpO1xyXG4gICAgICAgIGRlc3RpbmF0aW9uQ3R4LnJvdGF0ZShyb3RhdGlvbkRlZ3JlZXMgLyAxODAgKiBNYXRoLlBJKTtcclxuICAgICAgICBkZXN0aW5hdGlvbkN0eC50cmFuc2xhdGUoLWNlbnRlclgsIC1jZW50ZXJZKTtcclxuICAgICAgICBcclxuICAgICAgICBkZXN0aW5hdGlvbkN0eC5kcmF3SW1hZ2UodGhpcy5jYW52YXMsIGRlc3RpbmF0aW9uWCwgMCwgZGVzdGluYXRpb25TaXplLCBkZXN0aW5hdGlvblNpemUpO1xyXG4gICAgICAgIGRlc3RpbmF0aW9uQ3R4LnJlc3RvcmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyTWFpbigpO1xyXG4gICAgICAgIHJlbmRlclByZXZpZXcodGhpcy5wcmV2aWV3Q29udGV4dCwgdGhpcy5jYW52YXMpO1xyXG4gICAgICAgIHRoaXMubmVlZHNUb0JlUmVuZGVyZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbmRlck1haW4oKSB7XHJcbiAgICAgICAgbGV0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gdGhpcy5jb250ZXh0O1xyXG4gICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgU0laRSwgU0laRSk7XHJcbiAgICAgICAgaWYgKHRoaXMubGluZVdpZHRoUmF0aW8gPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3R4LnNhdmUoKTtcclxuXHJcbiAgICAgICAgY2FsY3VsYXRlQmV2ZWxQb2ludHModGhpcy5jb250cm9sUG9pbnRzKTtcclxuICAgICAgICBzd2l0Y2godGhpcy5iZXZlbE1vZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBCZXZlbE1vZGUuTk9ORTpcclxuICAgICAgICAgICAgICAgIHBlcmZvcm1Ob25lUGF0aChjdHgsIHRoaXMuY29udHJvbFBvaW50cyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBCZXZlbE1vZGUuU1RSQUlHSFQ6XHJcbiAgICAgICAgICAgICAgICBwZXJmb3JtU3RyYWlnaHRQYXRoKGN0eCwgdGhpcy5jb250cm9sUG9pbnRzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJldmVsTW9kZS5DSVJDVUxBUjpcclxuICAgICAgICAgICAgICAgIHBlcmZvcm1DaXJjdWxhclBhdGgoY3R4LCB0aGlzLmNvbnRyb2xQb2ludHMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmNvbG9yLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgbGV0IHNpemU6IG51bWJlciA9IFNJWkUgKiB0aGlzLnNpemVSYXRpbztcclxuICAgICAgICBjdHgubGluZVdpZHRoID0gdGhpcy5saW5lV2lkdGhSYXRpbyAqIHNpemU7XHJcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG5cclxuICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG5cclxuICAgICAgICAvLyBjdHguc2F2ZSgpO1xyXG4gICAgICAgIC8vIGN0eC5maWxsU3R5bGUgPSBcImJsdWVcIjtcclxuICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29udHJvbFBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vICAgICBsZXQgY3A6IENvbnRyb2xQb2ludCA9IHRoaXMuY29udHJvbFBvaW50c1tpXTtcclxuXHJcbiAgICAgICAgLy8gICAgIGNpcmNsZShjdHgsIGNwLmJldmVsMS54LCBjcC5iZXZlbDEueSwgNCk7XHJcbiAgICAgICAgLy8gICAgIGN0eC5maWxsKCk7XHJcbiAgICAgICAgLy8gICAgIGNpcmNsZShjdHgsIGNwLmNlbnRlci54LCBjcC5jZW50ZXIueSwgNCk7XHJcbiAgICAgICAgLy8gICAgIGN0eC5maWxsKCk7XHJcbiAgICAgICAgLy8gICAgIGNpcmNsZShjdHgsIGNwLmJldmVsMi54LCBjcC5iZXZlbDIueSwgNCk7XHJcbiAgICAgICAgLy8gICAgIGN0eC5maWxsKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGN0eC5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFBvaW50MkQge1xyXG4gICAgcHVibGljIHg6IG51bWJlcjtcclxuICAgIHB1YmxpYyB5OiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbG9yIH0gZnJvbSBcIi4vY29sb3JcIjtcclxuaW1wb3J0IHsgRmlsbExheWVyIH0gZnJvbSBcIi4vZmlsbF9sYXllclwiO1xyXG5pbXBvcnQgeyBMYXllciwgTGF5ZXJUeXBlIH0gZnJvbSBcIi4vbGF5ZXJcIjtcclxuaW1wb3J0IHsgTGluZUxheWVyIH0gZnJvbSBcIi4vbGluZV9sYXllclwiO1xyXG5pbXBvcnQgeyBQb2ludDJEIH0gZnJvbSBcIi4vcG9pbnRfMmRcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlnIHtcclxuICAgIGxheWVyczogTGF5ZXJbXTtcclxuICAgIGJlYXRGcmFjdGlvbkNvbG9yczogQ29sb3JbXTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgU2VyaWFsaXplZExheWVyID0gU2VyaWFsaXplZExpbmVMYXllciB8IFNlcmlhbGl6ZWRGaWxsTGF5ZXI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNlcmlhbGl6ZWRDb25maWcge1xyXG4gICAgbGF5ZXJzOiBTZXJpYWxpemVkTGF5ZXJbXTtcclxuICAgIGJlYXRGcmFjdGlvbkNvbG9yczogU2VyaWFsaXplZENvbG9yW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2VyaWFsaXplZENvbG9yIHtcclxuICAgIHJlZDogbnVtYmVyO1xyXG4gICAgZ3JlZW46IG51bWJlcjtcclxuICAgIGJsdWU6IG51bWJlcjtcclxuICAgIGFscGhhOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2VyaWFsaXplZExpbmVMYXllciB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB0eXBlOiBMYXllclR5cGU7XHJcbiAgICBpc1Zpc2libGU6IGJvb2xlYW47XHJcbiAgICBpc1NlbGVjdGVkOiBib29sZWFuO1xyXG4gICAgc2l6ZVJhdGlvOiBudW1iZXI7XHJcbiAgICB0aGlja25lc3NSYXRpbzogbnVtYmVyO1xyXG4gICAgbGluZVdpZHRoUmF0aW86IG51bWJlcjtcclxuICAgIGJldmVsU2l6ZVJhdGlvOiBudW1iZXI7XHJcbiAgICBvZmZzZXRSYXRpbzogUG9pbnQyRDtcclxuICAgIGxpZ2h0bmVzc1JhdGlvOiBudW1iZXI7XHJcbiAgICBjb250cm9sUG9pbnRzOiBTZXJpYWxpemVkQ29udHJvbFBvaW50W107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2VyaWFsaXplZEZpbGxMYXllciB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB0eXBlOiBMYXllclR5cGU7XHJcbiAgICBpc1Zpc2libGU6IGJvb2xlYW47XHJcbiAgICBpc1NlbGVjdGVkOiBib29sZWFuO1xyXG4gICAgc2l6ZVJhdGlvOiBudW1iZXI7XHJcbiAgICB0aGlja25lc3NSYXRpbzogbnVtYmVyO1xyXG4gICAgYmV2ZWxTaXplUmF0aW86IG51bWJlcjtcclxuICAgIG9mZnNldFJhdGlvOiBQb2ludDJEO1xyXG4gICAgbGlnaHRuZXNzUmF0aW86IG51bWJlcjtcclxuICAgIGNvbnRyb2xQb2ludHM6IFNlcmlhbGl6ZWRDb250cm9sUG9pbnRbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTZXJpYWxpemVkQ29udHJvbFBvaW50IHtcclxuICAgIG9mZnNldFJhdGlvOiBQb2ludDJEO1xyXG4gICAgc2l6ZVJhdGlvOiBudW1iZXI7XHJcbiAgICB0aGlja25lc3NSYXRpbzogbnVtYmVyO1xyXG4gICAgYmV2ZWxTaXplUmF0aW86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZUNvbmZpZyhjb25maWc6IENvbmZpZyk6IHN0cmluZyB7XHJcbiAgICBsZXQgc2VyaWFsaXplZEJlYXRGcmFjdGlvbkNvbG9yczogU2VyaWFsaXplZENvbG9yW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZmlnLmJlYXRGcmFjdGlvbkNvbG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBjb2xvcjogQ29sb3IgPSBjb25maWcuYmVhdEZyYWN0aW9uQ29sb3JzW2ldO1xyXG4gICAgICAgIHNlcmlhbGl6ZWRCZWF0RnJhY3Rpb25Db2xvcnMucHVzaCh7XHJcbiAgICAgICAgICAgIHJlZDogY29sb3IucmVkLFxyXG4gICAgICAgICAgICBncmVlbjogY29sb3IuZ3JlZW4sXHJcbiAgICAgICAgICAgIGJsdWU6IGNvbG9yLmJsdWUsXHJcbiAgICAgICAgICAgIGFscGhhOiBjb2xvci5hbHBoYSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc2VyaWFsaXplZExheWVyczogU2VyaWFsaXplZExheWVyW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZmlnLmxheWVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChjb25maWcubGF5ZXJzW2ldLnR5cGUgPT09IExheWVyVHlwZS5GSUxMKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wTGF5ZXIgPSA8RmlsbExheWVyPiBjb25maWcubGF5ZXJzW2ldO1xyXG4gICAgICAgICAgICBsZXQgY29udHJvbFBvaW50czogU2VyaWFsaXplZENvbnRyb2xQb2ludFtdID0gZ2V0U2VyaWFsaXplZENvbnRyb2xQb2ludHModGVtcExheWVyKTtcclxuICAgICAgICAgICAgbGV0IGZpbGxMYXllcjogU2VyaWFsaXplZEZpbGxMYXllciA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IHRlbXBMYXllci5uYW1lLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogdGVtcExheWVyLnR5cGUsXHJcbiAgICAgICAgICAgICAgICBpc1Zpc2libGU6IHRlbXBMYXllci5pc1Zpc2libGUsXHJcbiAgICAgICAgICAgICAgICBpc1NlbGVjdGVkOiB0ZW1wTGF5ZXIuaXNTZWxlY3RlZCxcclxuICAgICAgICAgICAgICAgIHNpemVSYXRpbzogdGVtcExheWVyLnNpemVSYXRpbyxcclxuICAgICAgICAgICAgICAgIHRoaWNrbmVzc1JhdGlvOiB0ZW1wTGF5ZXIudGhpY2tuZXNzUmF0aW8sXHJcbiAgICAgICAgICAgICAgICBiZXZlbFNpemVSYXRpbzogdGVtcExheWVyLmJldmVsU2l6ZVJhdGlvLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0UmF0aW86IHRlbXBMYXllci5vZmZzZXRSYXRpbyxcclxuICAgICAgICAgICAgICAgIGxpZ2h0bmVzc1JhdGlvOiB0ZW1wTGF5ZXIubGlnaHRuZXNzUmF0aW8sXHJcbiAgICAgICAgICAgICAgICBjb250cm9sUG9pbnRzOiBjb250cm9sUG9pbnRzLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZXJpYWxpemVkTGF5ZXJzLnB1c2goZmlsbExheWVyKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5sYXllcnNbaV0udHlwZSA9PT0gTGF5ZXJUeXBlLkxJTkUpIHtcclxuICAgICAgICAgICAgbGV0IHRlbXBMYXllciA9IDxMaW5lTGF5ZXI+IGNvbmZpZy5sYXllcnNbaV07XHJcbiAgICAgICAgICAgIGxldCBjb250cm9sUG9pbnRzOiBTZXJpYWxpemVkQ29udHJvbFBvaW50W10gPSBnZXRTZXJpYWxpemVkQ29udHJvbFBvaW50cyh0ZW1wTGF5ZXIpO1xyXG4gICAgICAgICAgICBsZXQgbGluZUxheWVyOiBTZXJpYWxpemVkTGluZUxheWVyID0ge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogdGVtcExheWVyLm5hbWUsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiB0ZW1wTGF5ZXIudHlwZSxcclxuICAgICAgICAgICAgICAgIGlzVmlzaWJsZTogdGVtcExheWVyLmlzVmlzaWJsZSxcclxuICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ6IHRlbXBMYXllci5pc1NlbGVjdGVkLFxyXG4gICAgICAgICAgICAgICAgc2l6ZVJhdGlvOiB0ZW1wTGF5ZXIuc2l6ZVJhdGlvLFxyXG4gICAgICAgICAgICAgICAgdGhpY2tuZXNzUmF0aW86IHRlbXBMYXllci50aGlja25lc3NSYXRpbyxcclxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aFJhdGlvOiB0ZW1wTGF5ZXIubGluZVdpZHRoUmF0aW8sXHJcbiAgICAgICAgICAgICAgICBiZXZlbFNpemVSYXRpbzogdGVtcExheWVyLmJldmVsU2l6ZVJhdGlvLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0UmF0aW86IHRlbXBMYXllci5vZmZzZXRSYXRpbyxcclxuICAgICAgICAgICAgICAgIGxpZ2h0bmVzc1JhdGlvOiB0ZW1wTGF5ZXIubGlnaHRuZXNzUmF0aW8sXHJcbiAgICAgICAgICAgICAgICBjb250cm9sUG9pbnRzOiBjb250cm9sUG9pbnRzLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZXJpYWxpemVkTGF5ZXJzLnB1c2gobGluZUxheWVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIlRoZSBwcm9ncmFtIGNhbid0IHNlcmlhbGl6ZSBhIGxheWVyIHdpdGggdHlwZTogXCIgKyBjb25maWcubGF5ZXJzW2ldLnR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgc2VyaWFsaXplZENvbmZpZzogU2VyaWFsaXplZENvbmZpZyA9IHtcclxuICAgICAgICBiZWF0RnJhY3Rpb25Db2xvcnM6IHNlcmlhbGl6ZWRCZWF0RnJhY3Rpb25Db2xvcnMsXHJcbiAgICAgICAgbGF5ZXJzOiBzZXJpYWxpemVkTGF5ZXJzXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShzZXJpYWxpemVkQ29uZmlnKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlc2VyaWFsaXplQ29uZmlnKGNvbmZpZzogU2VyaWFsaXplZENvbmZpZykge1xyXG4gICAgbGV0IGJlYXRGcmFjdGlvbkNvbG9yczogQ29sb3JbXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25maWcuYmVhdEZyYWN0aW9uQ29sb3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IHRlbXBDb2xvcjogU2VyaWFsaXplZENvbG9yID0gY29uZmlnLmJlYXRGcmFjdGlvbkNvbG9yc1tpXTtcclxuICAgICAgICBiZWF0RnJhY3Rpb25Db2xvcnMucHVzaChuZXcgQ29sb3IodGVtcENvbG9yLnJlZCwgdGVtcENvbG9yLmdyZWVuLCB0ZW1wQ29sb3IuYmx1ZSwgdGVtcENvbG9yLmFscGhhKSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGxldCBsYXllcnM6IExheWVyW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZmlnLmxheWVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChjb25maWcubGF5ZXJzW2ldLnR5cGUgPT09IExheWVyVHlwZS5GSUxMKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wTGF5ZXIgPSA8U2VyaWFsaXplZEZpbGxMYXllcj4gY29uZmlnLmxheWVyc1tpXTtcclxuICAgICAgICAgICAgbGV0IGZpbGxMYXllciA9IG5ldyBGaWxsTGF5ZXIoXHJcbiAgICAgICAgICAgICAgICB0ZW1wTGF5ZXIubmFtZSxcclxuICAgICAgICAgICAgICAgIHRlbXBMYXllci5pc1Zpc2libGUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wTGF5ZXIuaXNTZWxlY3RlZCxcclxuICAgICAgICAgICAgICAgIHRlbXBMYXllci5zaXplUmF0aW8sXHJcbiAgICAgICAgICAgICAgICB0ZW1wTGF5ZXIudGhpY2tuZXNzUmF0aW8sXHJcbiAgICAgICAgICAgICAgICB0ZW1wTGF5ZXIuYmV2ZWxTaXplUmF0aW8sXHJcbiAgICAgICAgICAgICAgICB0ZW1wTGF5ZXIub2Zmc2V0UmF0aW8sXHJcbiAgICAgICAgICAgICAgICBiZWF0RnJhY3Rpb25Db2xvcnNbMF0sXHJcbiAgICAgICAgICAgICAgICB0ZW1wTGF5ZXIubGlnaHRuZXNzUmF0aW8sXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHNldENvbnRyb2xQb2ludHMoZmlsbExheWVyLCB0ZW1wTGF5ZXIuY29udHJvbFBvaW50cyk7XHJcbiAgICAgICAgICAgIGxheWVycy5wdXNoKGZpbGxMYXllcik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjb25maWcubGF5ZXJzW2ldLnR5cGUgPT09IExheWVyVHlwZS5MSU5FKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wTGF5ZXIgPSA8U2VyaWFsaXplZExpbmVMYXllcj4gY29uZmlnLmxheWVyc1tpXTtcclxuICAgICAgICAgICAgbGV0IGxpbmVMYXllciA9IG5ldyBMaW5lTGF5ZXIoXHJcbiAgICAgICAgICAgICAgICB0ZW1wTGF5ZXIubmFtZSxcclxuICAgICAgICAgICAgICAgIHRlbXBMYXllci5pc1Zpc2libGUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wTGF5ZXIuaXNTZWxlY3RlZCxcclxuICAgICAgICAgICAgICAgIHRlbXBMYXllci5zaXplUmF0aW8sXHJcbiAgICAgICAgICAgICAgICB0ZW1wTGF5ZXIudGhpY2tuZXNzUmF0aW8sXHJcbiAgICAgICAgICAgICAgICB0ZW1wTGF5ZXIubGluZVdpZHRoUmF0aW8sXHJcbiAgICAgICAgICAgICAgICB0ZW1wTGF5ZXIuYmV2ZWxTaXplUmF0aW8sXHJcbiAgICAgICAgICAgICAgICB0ZW1wTGF5ZXIub2Zmc2V0UmF0aW8sXHJcbiAgICAgICAgICAgICAgICBiZWF0RnJhY3Rpb25Db2xvcnNbMF0sXHJcbiAgICAgICAgICAgICAgICB0ZW1wTGF5ZXIubGlnaHRuZXNzUmF0aW8sXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHNldENvbnRyb2xQb2ludHMobGluZUxheWVyLCB0ZW1wTGF5ZXIuY29udHJvbFBvaW50cyk7XHJcbiAgICAgICAgICAgIGxheWVycy5wdXNoKGxpbmVMYXllcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJUaGUgcHJvZ3JhbSBjYW4ndCBkZXNlcmlhbGl6ZSBhIGxheWVyIHdpdGggdHlwZTogXCIgKyBjb25maWcubGF5ZXJzW2ldLnR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge2JlYXRGcmFjdGlvbkNvbG9yczogYmVhdEZyYWN0aW9uQ29sb3JzLCBsYXllcnM6IGxheWVyc307XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldENvbnRyb2xQb2ludHMobGF5ZXI6IExheWVyLCBzZXJpYWxpemVkQ29udHJvbFBvaW50czogU2VyaWFsaXplZENvbnRyb2xQb2ludFtdKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlcmlhbGl6ZWRDb250cm9sUG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGNwID0gc2VyaWFsaXplZENvbnRyb2xQb2ludHNbaV07XHJcbiAgICAgICAgbGF5ZXIuY29udHJvbFBvaW50c1tpXS51cGRhdGUoe1xyXG4gICAgICAgICAgICBzaXplUmF0aW86IGNwLnNpemVSYXRpbyxcclxuICAgICAgICAgICAgdGhpY2tuZXNzUmF0aW86IGNwLnRoaWNrbmVzc1JhdGlvLFxyXG4gICAgICAgICAgICBiZXZlbFNpemVSYXRpbzogY3AuYmV2ZWxTaXplUmF0aW8sXHJcbiAgICAgICAgICAgIG9mZnNldFhSYXRpbzogY3Aub2Zmc2V0UmF0aW8ueCxcclxuICAgICAgICAgICAgb2Zmc2V0WVJhdGlvOiBjcC5vZmZzZXRSYXRpby55LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRTZXJpYWxpemVkQ29udHJvbFBvaW50cyhsYXllcjogTGF5ZXIpOiBTZXJpYWxpemVkQ29udHJvbFBvaW50W10ge1xyXG4gICAgbGV0IGNvbnRyb2xQb2ludHM6IFNlcmlhbGl6ZWRDb250cm9sUG9pbnRbXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllci5jb250cm9sUG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGNwID0gbGF5ZXIuY29udHJvbFBvaW50c1tpXTtcclxuICAgICAgICBjb250cm9sUG9pbnRzLnB1c2goe1xyXG4gICAgICAgICAgICBzaXplUmF0aW86IGNwLnNpemVSYXRpbyxcclxuICAgICAgICAgICAgdGhpY2tuZXNzUmF0aW86IGNwLnRoaWNrbmVzc1JhdGlvLFxyXG4gICAgICAgICAgICBiZXZlbFNpemVSYXRpbzogY3AuYmV2ZWxTaXplUmF0aW8sXHJcbiAgICAgICAgICAgIG9mZnNldFJhdGlvOiBjcC5vZmZzZXRSYXRpbyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb250cm9sUG9pbnRzO1xyXG59XHJcbiIsImltcG9ydCB7IENvbG9yIH0gZnJvbSBcIi4vY29sb3JcIjtcclxuaW1wb3J0IHsgTGF5ZXIsIExheWVyVHlwZSB9IGZyb20gXCIuL2xheWVyXCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU3ByaXRlc2hlZXQge1xyXG4gICAgcHVibGljIHN0YXRpYyBsYXllcnM6IExheWVyW107XHJcbiAgICBwdWJsaWMgc3RhdGljIGJlYXRGcmFjdGlvbkNvbG9yczogQ29sb3JbXTtcclxuICAgIHB1YmxpYyBzdGF0aWMgd2lkdGg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgaGVpZ2h0OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHpvb21SYXRpbzogbnVtYmVyO1xyXG4gICAgcHVibGljIHN0YXRpYyBzY3JvbGxYUmF0aW86IG51bWJlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgcm90YXRpb25EZWdyZWVzOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBwdWJsaWMgc3RhdGljIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgcHVibGljIHN0YXRpYyBuZWVkc1RvQmVSZW5kZXJlZDogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXQoXHJcbiAgICAgICAgbGF5ZXJzOiBMYXllcltdLFxyXG4gICAgICAgIGJlYXRGcmFjdGlvbkNvbG9yczogQ29sb3JbXSxcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMubGF5ZXJzID0gbGF5ZXJzO1xyXG4gICAgICAgIHRoaXMuYmVhdEZyYWN0aW9uQ29sb3JzID0gYmVhdEZyYWN0aW9uQ29sb3JzO1xyXG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB0aGlzLnNldEhlaWdodCgxMjgpO1xyXG4gICAgICAgIHRoaXMuem9vbVJhdGlvID0gMS4wO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsWFJhdGlvID0gMDtcclxuICAgICAgICB0aGlzLnJvdGF0aW9uRGVncmVlcyA9IDA7XHJcbiAgICAgICAgdGhpcy5uZWVkc1RvQmVSZW5kZXJlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmVhdEZyYWN0aW9uQ29sb3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sYXllcnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID09PSB0aGlzLmJlYXRGcmFjdGlvbkNvbG9ycy5sZW5ndGggLSAxXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5sYXllcnNbal0udHlwZSAhPT0gTGF5ZXJUeXBlLkxJTkUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXJzW2pdLnVwZGF0ZSh7YmFzZUNvbG9yOiB0aGlzLmJlYXRGcmFjdGlvbkNvbG9yc1tpXX0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllcnNbal0uZHJhd1Jlc2l6ZWQodGhpcy5jdHgsIGkgKiB0aGlzLmhlaWdodCwgdGhpcy5oZWlnaHQsIHRoaXMucm90YXRpb25EZWdyZWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5lZWRzVG9CZVJlbmRlcmVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBkcmF3KFxyXG4gICAgICAgIGRlc3RpbmF0aW9uQ3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXHJcbiAgICAgICAgeDogbnVtYmVyLFxyXG4gICAgICAgIHk6IG51bWJlcixcclxuICAgICAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgICAgIGhlaWdodDogbnVtYmVyLFxyXG4gICAgKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubmVlZHNUb0JlUmVuZGVyZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVzdGluYXRpb25DdHguc2F2ZSgpO1xyXG4gICAgICAgIGRlc3RpbmF0aW9uQ3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGRlc3RpbmF0aW9uQ3R4LmRyYXdJbWFnZSh0aGlzLmNhbnZhcywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgZGVzdGluYXRpb25DdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVuZGVyU3ByaXRlc1RvU2VwYXJhdGVDYW52YXNlcygpIHtcclxuICAgICAgICBsZXQgY2FudmFzZXM6IEhUTUxDYW52YXNFbGVtZW50W10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmVhdEZyYWN0aW9uQ29sb3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gdGhpcy5oZWlnaHQ7XHJcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuICAgICAgICAgICAgbGV0IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmxheWVycy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IHRoaXMuYmVhdEZyYWN0aW9uQ29sb3JzLmxlbmd0aCAtIDFcclxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmxheWVyc1tqXS50eXBlICE9PSBMYXllclR5cGUuTElORSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllcnNbal0udXBkYXRlKHtiYXNlQ29sb3I6IHRoaXMuYmVhdEZyYWN0aW9uQ29sb3JzW2ldfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyc1tqXS5kcmF3UmVzaXplZChjdHgsIDAsIHRoaXMuaGVpZ2h0LCB0aGlzLnJvdGF0aW9uRGVncmVlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FudmFzZXMucHVzaChjYW52YXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2FudmFzZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXRIZWlnaHQobmV3SGVpZ2h0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IG5ld0hlaWdodDtcclxuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5oZWlnaHQgKiB0aGlzLmJlYXRGcmFjdGlvbkNvbG9ycy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLndpZHRoO1xyXG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMubmVlZHNUb0JlUmVuZGVyZWQgPSB0cnVlO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbG9yIH0gZnJvbSBcIi4vY29sb3JcIjtcclxuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tIFwiLi9sYXllclwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxhYmVsZWRSYW5nZShcclxuICAgIGlucHV0SWQ6IHN0cmluZyxcclxuICAgIGxhYmVsVGV4dDogc3RyaW5nLFxyXG4gICAgbWluOiBudW1iZXIsXHJcbiAgICBtYXg6IG51bWJlcixcclxuICAgIHN0ZXA6IG51bWJlcixcclxuICAgIHZhbHVlOiBudW1iZXIsXHJcbiAgICB3YXJuaW5nOiBib29sZWFuLFxyXG4pOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICBsZXQgZGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChcInNsaWRlckRpdlwiKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgICBsZXQgbGFiZWxEaXY6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGxhYmVsRGl2LmNsYXNzTGlzdC5hZGQoXCJzbGlkZXJMYWJlbERpdlwiKTtcclxuICAgIGxldCBsYWJlbDogSFRNTExhYmVsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcclxuICAgIGxhYmVsLmh0bWxGb3IgPSBpbnB1dElkO1xyXG4gICAgbGFiZWwuaW5uZXJUZXh0ID0gbGFiZWxUZXh0O1xyXG4gICAgbGFiZWxEaXYuYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGxhYmVsRGl2KTtcclxuICAgIFxyXG4gICAgbGV0IHNwYW46IEhUTUxTcGFuRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgc3Bhbi5jbGFzc0xpc3QuYWRkKFwic2xpZGVyV2FybmluZ1NwYW5cIik7XHJcbiAgICBpZiAod2FybmluZykge1xyXG4gICAgICAgIGxldCBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgICAgaW1hZ2Uuc3JjID0gXCIuLi9hc3NldHMvdHJpYW5nbGUtZXhjbGFtYXRpb24tc29saWQtc21hbGwtbGlnaHQucG5nXCJcclxuICAgICAgICBzcGFuLmFwcGVuZENoaWxkKGltYWdlKTtcclxuICAgIH1cclxuICAgIGRpdi5hcHBlbmRDaGlsZChzcGFuKTtcclxuXHJcbiAgICBsZXQgcmFuZ2VEaXY6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHJhbmdlRGl2LmNsYXNzTGlzdC5hZGQoXCJzbGlkZXJSYW5nZURpdlwiKTtcclxuICAgIGxldCByYW5nZTogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIHJhbmdlLmlkID0gaW5wdXRJZDtcclxuICAgIHJhbmdlLnR5cGUgPSBcInJhbmdlXCI7XHJcbiAgICByYW5nZS5taW4gPSBtaW4udG9TdHJpbmcoKTtcclxuICAgIHJhbmdlLm1heCA9IG1heC50b1N0cmluZygpO1xyXG4gICAgcmFuZ2Uuc3RlcCA9IHN0ZXAudG9TdHJpbmcoKTtcclxuICAgIHJhbmdlLnZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgIHJhbmdlRGl2LmFwcGVuZENoaWxkKHJhbmdlKTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChyYW5nZURpdik7XHJcblxyXG4gICAgbGV0IGlucHV0RGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBpbnB1dERpdi5jbGFzc0xpc3QuYWRkKFwic2xpZGVySW5wdXREaXZcIik7XHJcbiAgICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBpbnB1dC52YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICByYW5nZS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgIGlucHV0LnZhbHVlID0gcmFuZ2UudmFsdWU7XHJcbiAgICB9KTtcclxuICAgIGlucHV0Lm9uaW5wdXQgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHN0cmluZ0lucHV0SXNGbG9hdChpbnB1dC52YWx1ZSkpIHtcclxuICAgICAgICAgICAgcmFuZ2UudmFsdWUgPSBpbnB1dC52YWx1ZTtcclxuICAgICAgICAgICAgcmFuZ2UuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJpbnB1dFwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaW5wdXREaXYuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGlucHV0RGl2KTtcclxuXHJcbiAgICByZXR1cm4gZGl2O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQmFzZUNvbG9yUGlja2VyKFxyXG4gICAgaW5wdXRJZDogc3RyaW5nLFxyXG4gICAgbGFiZWxUZXh0OiBzdHJpbmcsXHJcbiAgICB2YWx1ZTogc3RyaW5nLFxyXG4pOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICBsZXQgZGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaWQgPSBcImJhc2VDb2xvckRpdlwiO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICAgIGxldCBsYWJlbERpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgbGFiZWxEaXYuaWQgPSBcImJhc2VDb2xvckxhYmVsRGl2XCI7XHJcbiAgICBsZXQgbGFiZWw6IEhUTUxMYWJlbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XHJcbiAgICBsYWJlbC5odG1sRm9yID0gaW5wdXRJZDtcclxuICAgIGxhYmVsLmlubmVyVGV4dCA9IGxhYmVsVGV4dDtcclxuICAgIGxhYmVsRGl2LmFwcGVuZENoaWxkKGxhYmVsKTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChsYWJlbERpdik7XHJcbiAgICBcclxuICAgIGxldCBjb2xvclBpY2tlckRpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY29sb3JQaWNrZXJEaXYuaWQgPSBcImJhc2VDb2xvclBpY2tlckRpdlwiO1xyXG4gICAgbGV0IGNvbG9yUGlja2VyOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgY29sb3JQaWNrZXIuaWQgPSBpbnB1dElkO1xyXG4gICAgY29sb3JQaWNrZXIudHlwZSA9IFwiY29sb3JcIjtcclxuICAgIGNvbG9yUGlja2VyLnZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgIGNvbG9yUGlja2VyRGl2LmFwcGVuZENoaWxkKGNvbG9yUGlja2VyKTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChjb2xvclBpY2tlckRpdik7XHJcblxyXG4gICAgbGV0IGlucHV0RGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBpbnB1dERpdi5pZCA9IFwiYmFzZUNvbG9ySW5wdXREaXZcIjtcclxuICAgIGxldCBpbnB1dDogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGlucHV0LnZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgIGNvbG9yUGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgaW5wdXQudmFsdWUgPSBjb2xvclBpY2tlci52YWx1ZTtcclxuICAgIH0pO1xyXG4gICAgaW5wdXQub25pbnB1dCA9ICgpID0+IHtcclxuICAgICAgICBpZiAoaW5wdXQudmFsdWUubGVuZ3RoID09PSA3KSB7XHJcbiAgICAgICAgICAgIGNvbG9yUGlja2VyLnZhbHVlID0gaW5wdXQudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbG9yUGlja2VyLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiaW5wdXRcIikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlucHV0RGl2LmFwcGVuZENoaWxkKGlucHV0KTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChpbnB1dERpdik7XHJcblxyXG4gICAgcmV0dXJuIGRpdjtcclxufVxyXG5cclxuLy8gcGFyc2VGbG9hdCBhbmQgTnVtYmVyKCkgYXJlIHRvbyBwZXJtaXNzaXZlLCBiZWNhdXNlIHRoZSBzZWNvbmQgYSB2YWxpZFxyXG4vLyBudW1iZXIgaXMgaW5wdXQsIGl0IHdpbGwgcGluZyBiYWNrIGFuZCByZXBsYWNlcyB0aGUgaW5wdXRcclxubGV0IGZsb2F0UGF0dGVybjogUmVnRXhwID0gL14tP1xcZCpcXC4/XFxkKyQvO1xyXG5mdW5jdGlvbiBzdHJpbmdJbnB1dElzRmxvYXQoaW5wdXQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIGZsb2F0UGF0dGVybi5leGVjKGlucHV0KSAhPT0gbnVsbDtcclxufVxyXG5cclxubGV0IHZpc2liaWxpdHlFeWVPblBhdGg6IHN0cmluZyA9IFwiLi4vYXNzZXRzL2V5ZS1zb2xpZC1saWdodC1zbWFsbC5wbmdcIjtcclxubGV0IHZpc2liaWxpdHlFeWVPZmZQYXRoOiBzdHJpbmcgPSBcIi4uL2Fzc2V0cy9leWUtc29saWQtbGlnaHQtc21hbGwtZGFyay5wbmdcIlxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxheWVyRGlzcGxheShsYXllcjogTGF5ZXIpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICBsZXQgZGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChcImxheWVyXCIpO1xyXG5cclxuICAgIGxldCBzZWxlY3RlZERpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgc2VsZWN0ZWREaXYuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkQnV0dG9uXCIpO1xyXG4gICAgbGV0IHNlbGVjdGVkQ2hlY2tib3g6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBzZWxlY3RlZENoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XHJcbiAgICBzZWxlY3RlZENoZWNrYm94LmNoZWNrZWQgPSBsYXllci5pc1NlbGVjdGVkO1xyXG4gICAgc2VsZWN0ZWRDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgIGxheWVyLmlzU2VsZWN0ZWQgPSBzZWxlY3RlZENoZWNrYm94LmNoZWNrZWQ7XHJcbiAgICB9KTtcclxuICAgIHNlbGVjdGVkRGl2LmFwcGVuZENoaWxkKHNlbGVjdGVkQ2hlY2tib3gpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKHNlbGVjdGVkRGl2KTtcclxuXHJcbiAgICBsZXQgdmlzaWJsZURpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdmlzaWJsZURpdi5jbGFzc0xpc3QuYWRkKFwidmlzaWJpbGl0eUJ1dHRvblwiKTtcclxuICAgIGxldCBpbWFnZSA9IDxIVE1MSW1hZ2VFbGVtZW50PiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgaWYgKGxheWVyLmlzVmlzaWJsZSkge1xyXG4gICAgICAgIGltYWdlLnNyYyA9IHZpc2liaWxpdHlFeWVPblBhdGg7XHJcbiAgICAgICAgdmlzaWJsZURpdi5hcHBlbmRDaGlsZChpbWFnZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGltYWdlLnNyYyA9IHZpc2liaWxpdHlFeWVPZmZQYXRoO1xyXG4gICAgICAgIHZpc2libGVEaXYuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG4gICAgfVxyXG4gICAgaW1hZ2Uub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICBsYXllci5pc1Zpc2libGUgPSAhbGF5ZXIuaXNWaXNpYmxlO1xyXG4gICAgICAgIGlmIChsYXllci5pc1Zpc2libGUpIHtcclxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gdmlzaWJpbGl0eUV5ZU9uUGF0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbWFnZS5zcmMgPSB2aXNpYmlsaXR5RXllT2ZmUGF0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQodmlzaWJsZURpdik7XHJcblxyXG4gICAgbGV0IHByZXZpZXdEaXY6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHByZXZpZXdEaXYuY2xhc3NMaXN0LmFkZChcImxheWVyUHJldmlld1wiKTtcclxuICAgIHByZXZpZXdEaXYuYXBwZW5kQ2hpbGQobGF5ZXIucHJldmlld0NhbnZhcyk7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQocHJldmlld0Rpdik7XHJcblxyXG4gICAgbGV0IGxhYmVsRGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBsYWJlbERpdi5jbGFzc0xpc3QuYWRkKFwibGF5ZXJMYWJlbERpdlwiKTtcclxuICAgIGxldCBsYWJlbElucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgbGFiZWxJbnB1dC52YWx1ZSA9IGxheWVyLm5hbWU7XHJcbiAgICBsYWJlbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgbGF5ZXIubmFtZSA9IGxhYmVsSW5wdXQudmFsdWU7XHJcbiAgICB9KTtcclxuICAgIGxhYmVsRGl2LmFwcGVuZENoaWxkKGxhYmVsSW5wdXQpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGxhYmVsRGl2KTtcclxuXHJcbiAgICByZXR1cm4gZGl2O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmlsbFdpdGhUcmFuc3BhcmVuY3lDaGVja2VyYm9hcmQoXHJcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcclxuICAgIHg6IG51bWJlcixcclxuICAgIHk6IG51bWJlcixcclxuICAgIHdpZHRoOiBudW1iZXIsXHJcbiAgICBoZWlnaHQ6IG51bWJlcixcclxuICAgIGJveFNpemU6IG51bWJlcixcclxuKSB7XHJcbiAgICBsZXQgbnVtQ29sdW1uczogbnVtYmVyID0gTWF0aC5jZWlsKHdpZHRoIC8gYm94U2l6ZSk7XHJcbiAgICBsZXQgbnVtUm93czogbnVtYmVyID0gTWF0aC5jZWlsKGhlaWdodCAvIGJveFNpemUpO1xyXG4gICAgbGV0IGNvbG9yMTogc3RyaW5nID0gXCJ3aGl0ZVwiO1xyXG4gICAgbGV0IGNvbG9yMjogc3RyaW5nID0gQ29sb3IuZ2V0UkdCKDE4NSwgMTg1LCAxODUpO1xyXG4gICAgY3R4LnNhdmUoKTtcclxuICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjE7XHJcbiAgICBjdHguZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICBjdHguZmlsbFN0eWxlID0gY29sb3IyO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1Sb3dzOyBpICsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW1Db2x1bW5zOyBqICsrKSB7XHJcbiAgICAgICAgICAgIGlmICgoaSArIGopICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYm94WCA9IHggKyBqICogYm94U2l6ZTtcclxuICAgICAgICAgICAgICAgIGxldCBib3hZID0geSArIGkgKiBib3hTaXplO1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KGJveFgsIGJveFksIGJveFNpemUsIGJveFNpemUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjdHgucmVzdG9yZSgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmlsbEFyb3VuZFJlY3RhbmdsZShcclxuICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxyXG4gICAgeDogbnVtYmVyLFxyXG4gICAgeTogbnVtYmVyLFxyXG4gICAgcmVjdFdpZHRoOiBudW1iZXIsXHJcbiAgICByZWN0SGVpZ2h0OiBudW1iZXIsXHJcbiAgICBjYW52YXNXaWR0aDogbnVtYmVyLFxyXG4gICAgY2FudmFzSGVpZ2h0OiBudW1iZXIsXHJcbiAgICBjb2xvcjogQ29sb3IsXHJcbikge1xyXG4gICAgY3R4LnNhdmUoKTtcclxuICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvci50b1N0cmluZygpO1xyXG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhc1dpZHRoLCB5KTtcclxuICAgIGN0eC5maWxsUmVjdCgwLCAwLCB4LCBjYW52YXNIZWlnaHQpO1xyXG4gICAgY3R4LmZpbGxSZWN0KDAsIHkgKyByZWN0SGVpZ2h0LCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0IC0gcmVjdEhlaWdodCAtIHkpO1xyXG4gICAgY3R4LmZpbGxSZWN0KHggKyByZWN0V2lkdGgsIDAsIGNhbnZhc1dpZHRoIC0gcmVjdFdpZHRoIC0geCwgY2FudmFzSGVpZ2h0KTtcclxuICAgIGN0eC5yZXN0b3JlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb250cm9sUGFuZWxCdXR0b24oaW1hZ2VTb3VyY2U6IHN0cmluZykge1xyXG4gICAgbGV0IGRpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJjb250cm9sUGFuZWxCdXR0b25cIik7XHJcbiAgICBsZXQgYnV0dG9uOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgYnV0dG9uLnR5cGUgPSBcImltYWdlXCI7XHJcbiAgICBidXR0b24uc3JjID0gaW1hZ2VTb3VyY2U7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICAgIHJldHVybiBkaXY7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUb3BDb250cm9sc0J1dHRvbihidXR0b25MYWJlbDogc3RyaW5nKSB7XHJcbiAgICBsZXQgZGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChcInRvcENvbnRyb2xzQnV0dG9uXCIpO1xyXG4gICAgbGV0IGJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgYnV0dG9uLmlubmVyVGV4dCA9IGJ1dHRvbkxhYmVsO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICByZXR1cm4gZGl2O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGFiZWxlZFJhbmdlV2l0aG91dFdhcm5pbmcoXHJcbiAgICBpbnB1dElkOiBzdHJpbmcsXHJcbiAgICBsYWJlbFRleHQ6IHN0cmluZyxcclxuICAgIG1pbjogbnVtYmVyLFxyXG4gICAgbWF4OiBudW1iZXIsXHJcbiAgICBzdGVwOiBudW1iZXIsXHJcbiAgICB2YWx1ZTogbnVtYmVyLFxyXG4pOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICBsZXQgZGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChcInNsaWRlckRpdlwiKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgICBsZXQgbGFiZWxEaXY6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGxhYmVsRGl2LmNsYXNzTGlzdC5hZGQoXCJzbGlkZXJMYWJlbERpdlwiKTtcclxuICAgIGxldCBsYWJlbDogSFRNTExhYmVsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcclxuICAgIGxhYmVsLmh0bWxGb3IgPSBpbnB1dElkO1xyXG4gICAgbGFiZWwuaW5uZXJUZXh0ID0gbGFiZWxUZXh0O1xyXG4gICAgbGFiZWxEaXYuYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGxhYmVsRGl2KTtcclxuXHJcbiAgICBsZXQgcmFuZ2VEaXY6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHJhbmdlRGl2LmNsYXNzTGlzdC5hZGQoXCJzbGlkZXJSYW5nZURpdlwiKTtcclxuICAgIGxldCByYW5nZTogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIHJhbmdlLmlkID0gaW5wdXRJZDtcclxuICAgIHJhbmdlLnR5cGUgPSBcInJhbmdlXCI7XHJcbiAgICByYW5nZS5taW4gPSBtaW4udG9TdHJpbmcoKTtcclxuICAgIHJhbmdlLm1heCA9IG1heC50b1N0cmluZygpO1xyXG4gICAgcmFuZ2Uuc3RlcCA9IHN0ZXAudG9TdHJpbmcoKTtcclxuICAgIHJhbmdlLnZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgIHJhbmdlRGl2LmFwcGVuZENoaWxkKHJhbmdlKTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChyYW5nZURpdik7XHJcblxyXG4gICAgbGV0IGlucHV0RGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBpbnB1dERpdi5jbGFzc0xpc3QuYWRkKFwic2xpZGVySW5wdXREaXZcIik7XHJcbiAgICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICBpbnB1dC52YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICByYW5nZS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgIGlucHV0LnZhbHVlID0gcmFuZ2UudmFsdWU7XHJcbiAgICB9KTtcclxuICAgIGlucHV0Lm9uaW5wdXQgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHN0cmluZ0lucHV0SXNGbG9hdChpbnB1dC52YWx1ZSkpIHtcclxuICAgICAgICAgICAgcmFuZ2UudmFsdWUgPSBpbnB1dC52YWx1ZTtcclxuICAgICAgICAgICAgcmFuZ2UuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJpbnB1dFwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaW5wdXREaXYuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGlucHV0RGl2KTtcclxuXHJcbiAgICByZXR1cm4gZGl2O1xyXG59XHJcbiIsImltcG9ydCB7IENvbG9yIH0gZnJvbSBcIi4vY29sb3JcIjtcclxuaW1wb3J0IHsgUG9pbnQyRCB9IGZyb20gXCIuL3BvaW50XzJkXCI7XHJcblxyXG4vLyBJIHRoaW5rIHRoaXMgaXMgd3JvbmcgYmVjYXVzZSB3ZSBhc3N1bWUgZnJvbUVuZCBpcyBncmVhdGVyIHRoYW4gZnJvbVN0YXJ0XHJcbmV4cG9ydCBmdW5jdGlvbiBtYXBMaW5lYXIoZnJvbVN0YXJ0OiBudW1iZXIsIHZhbHVlOiBudW1iZXIsIGZyb21FbmQ6IG51bWJlciwgdG9TdGFydDogbnVtYmVyLCB0b0VuZDogbnVtYmVyKSB7XHJcbiAgICBpZiAodG9TdGFydCA9PT0gdG9FbmQpIHtcclxuICAgICAgICByZXR1cm4gdG9TdGFydDtcclxuICAgIH1cclxuICAgIGxldCByYXRpbyA9ICh2YWx1ZSAtIGZyb21TdGFydCkgLyAoZnJvbUVuZCAtIGZyb21TdGFydCk7XHJcbiAgICBsZXQgdG9WYWx1ZSA9IHRvU3RhcnQgKyByYXRpbyAqICh0b0VuZCAtIHRvU3RhcnQpO1xyXG4gICAgcmV0dXJuIHRvVmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnRlcnBvbGF0ZUNvbG9ycyhzdGFydDogQ29sb3IsIGVuZDogQ29sb3IsIHJhdGlvOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBuZXcgQ29sb3IoXHJcbiAgICAgICAgcmF0aW8gKiAoZW5kLnJlZCAtIHN0YXJ0LnJlZCkgKyBzdGFydC5yZWQsXHJcbiAgICAgICAgcmF0aW8gKiAoZW5kLmdyZWVuIC0gc3RhcnQuZ3JlZW4pICsgc3RhcnQuZ3JlZW4sXHJcbiAgICAgICAgcmF0aW8gKiAoZW5kLmJsdWUgLSBzdGFydC5ibHVlKSArIHN0YXJ0LmJsdWUsXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbXVsdGlDb2xvckdyYWRpZW50KGNvbG9yU3RvcHM6IHtjb2xvcjogQ29sb3IsIHN0b3BWYWx1ZTogbnVtYmVyfVtdLCByYXRpbzogbnVtYmVyKTogQ29sb3Ige1xyXG4gICAgaWYgKHJhdGlvIDw9IDApIHtcclxuICAgICAgICByZXR1cm4gY29sb3JTdG9wc1swXS5jb2xvcjtcclxuICAgIH0gZWxzZSBpZiAocmF0aW8gPj0gMSkge1xyXG4gICAgICAgIHJldHVybiBjb2xvclN0b3BzW2NvbG9yU3RvcHMubGVuZ3RoIC0gMV0uY29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgd2hpbGUgKGNvbG9yU3RvcHNbaV0uc3RvcFZhbHVlIDwgcmF0aW8pIHtcclxuICAgICAgICBpKys7XHJcbiAgICB9XHJcbiAgICBsZXQgbG93ZXJDb2xvclN0b3AgPSBjb2xvclN0b3BzW2ktMV07XHJcbiAgICBsZXQgdXBwZXJDb2xvclN0b3AgPSBjb2xvclN0b3BzW2ldO1xyXG4gICAgbGV0IG5ld1JhdGlvID0gbWFwTGluZWFyKGxvd2VyQ29sb3JTdG9wLnN0b3BWYWx1ZSwgcmF0aW8sIHVwcGVyQ29sb3JTdG9wLnN0b3BWYWx1ZSwgMCwgMSk7XHJcbiAgICByZXR1cm4gaW50ZXJwb2xhdGVDb2xvcnMobG93ZXJDb2xvclN0b3AuY29sb3IsIHVwcGVyQ29sb3JTdG9wLmNvbG9yLCBuZXdSYXRpbyk7XHJcbn1cclxuXHJcbi8vIGh1ZSBpcyAwIC0gMzYwIGRlZ3JlZXMsIHNhdHVyYXRpb24gaXMgMCB0byAxLCBsaWdodG5lc3MgaXMgMCB0byAxXHJcbi8vIGNyZWF0ZWQgYmFzZWQgb24gd2lraXBlZGlhOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9IU0xfYW5kX0hTVlxyXG5leHBvcnQgZnVuY3Rpb24gSFNMVG9SR0IoaDogbnVtYmVyLCBzOiBudW1iZXIsIGw6IG51bWJlcik6IENvbG9yIHtcclxuICAgIGxldCBjID0gKDEgLSBNYXRoLmFicygyICogbCAtIDEpKSAqIHM7IC8vIGMgaXMgY2hyb21hXHJcbiAgICBsZXQgaF9wcmltZSA9IGggLyA2MDtcclxuICAgIGxldCB4ID0gYyAqICgxIC0gTWF0aC5hYnMoaF9wcmltZSAlIDIgLSAxKSk7XHJcblxyXG4gICAgbGV0IHRlbXBDb2xvcjogQ29sb3I7XHJcbiAgICBpZiAoMCA8PSBoX3ByaW1lICYmIGhfcHJpbWUgPCAxKSB7XHJcbiAgICAgICAgdGVtcENvbG9yID0gbmV3IENvbG9yKGMsIHgsIDApO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoMSA8PSBoX3ByaW1lICYmIGhfcHJpbWUgPCAyKSB7XHJcbiAgICAgICAgdGVtcENvbG9yID0gbmV3IENvbG9yKHgsIGMsIDApO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoMiA8PSBoX3ByaW1lICYmIGhfcHJpbWUgPCAzKSB7XHJcbiAgICAgICAgdGVtcENvbG9yID0gbmV3IENvbG9yKDAsIGMsIHgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoMyA8PSBoX3ByaW1lICYmIGhfcHJpbWUgPCA0KSB7XHJcbiAgICAgICAgdGVtcENvbG9yID0gbmV3IENvbG9yKDAsIHgsIGMpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoNCA8PSBoX3ByaW1lICYmIGhfcHJpbWUgPCA1KSB7XHJcbiAgICAgICAgdGVtcENvbG9yID0gbmV3IENvbG9yKHgsIDAsIGMpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoNSA8PSBoX3ByaW1lICYmIGhfcHJpbWUgPD0gNikge1xyXG4gICAgICAgIHRlbXBDb2xvciA9IG5ldyBDb2xvcihjLCAwLCB4KTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbSA9IGwgLSBjIC8gMjtcclxuICAgIHJldHVybiBuZXcgQ29sb3IoXHJcbiAgICAgICAgMjU1ICogKHRlbXBDb2xvci5yZWQgKyBtKSxcclxuICAgICAgICAyNTUgKiAodGVtcENvbG9yLmdyZWVuICsgbSksXHJcbiAgICAgICAgMjU1ICogKHRlbXBDb2xvci5ibHVlICsgbSksXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW51bUtleXM8RT4oZTogRSk6IChrZXlvZiBFKVtdIHtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhlKSBhcyAoa2V5b2YgRSlbXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldElucHV0VmFsdWVCeUlkKGlkOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuICg8SFRNTElucHV0RWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpKS52YWx1ZUFzTnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGlzdGFuY2UoeDE6IG51bWJlciwgeTE6IG51bWJlciwgeDI6IG51bWJlciwgeTI6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh5MiAtIHkxLCAyKSArIE1hdGgucG93KHgyIC0geDEsIDIpKTtcclxuICAgIC8vIHJldHVybiBNYXRoLmh5cG90KHkyIC0geTEsIHgyIC0geDEpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdElmVW5kZWZpbmVkKHZhbHVlOiBhbnksIGRlZmF1bHRWYWx1ZTogYW55KSB7XHJcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsZXJwKHN0YXJ0VmFsdWU6IG51bWJlciwgZW5kVmFsdWU6IG51bWJlciwgcmF0aW86IG51bWJlcikge1xyXG4gICAgaWYgKHJhdGlvIDw9IDApIHtcclxuICAgICAgICByZXR1cm4gc3RhcnRWYWx1ZTtcclxuICAgIH0gZWxzZSBpZiAocmF0aW8gPiAwICYmIHJhdGlvIDwgMSkge1xyXG4gICAgICAgIHJldHVybiBzdGFydFZhbHVlICsgKGVuZFZhbHVlIC0gc3RhcnRWYWx1ZSkgKiByYXRpbztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGVuZFZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbGVycFBvaW50KHN0YXJ0OiBQb2ludDJELCBlbmQ6IFBvaW50MkQsIHJhdGlvOiBudW1iZXIpOiBQb2ludDJEIHtcclxuICAgIHJldHVybiBuZXcgUG9pbnQyRChcclxuICAgICAgICBsZXJwKHN0YXJ0LngsIGVuZC54LCByYXRpbyksXHJcbiAgICAgICAgbGVycChzdGFydC55LCBlbmQueSwgcmF0aW8pLFxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBvaW50SXNXaXRoaW5SZWN0YW5nbGUocG9pbnQ6IFBvaW50MkQsXHJcbiAgICB0b3BMZWZ0WDogbnVtYmVyLCB0b3BMZWZ0WTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlclxyXG4pOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0b3BMZWZ0WCA8IHBvaW50LnggJiYgcG9pbnQueCA8IHRvcExlZnRYICsgd2lkdGhcclxuICAgICAgICAmJiB0b3BMZWZ0WSA8IHBvaW50LnkgJiYgcG9pbnQueSA8IHRvcExlZnRZICsgaGVpZ2h0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2lyY2xlKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgcmFkaXVzOiBudW1iZXIpIHtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5hcmMoY2VudGVyWCwgY2VudGVyWSwgcmFkaXVzLCAwLCAyICogTWF0aC5QSSk7XHJcbiAgICBjdHguY2xvc2VQYXRoKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZENhbnZhc0FzUG5nKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIGZpbGVuYW1lOiBzdHJpbmcpIHtcclxuICAgIGxldCBkYXRhVVJMID0gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcclxuICAgIFxyXG4gICAgbGV0IGRvd25sb2FkTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgZG93bmxvYWRMaW5rLmhyZWYgPSBkYXRhVVJMO1xyXG4gICAgZG93bmxvYWRMaW5rLmRvd25sb2FkID0gZmlsZW5hbWU7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb3dubG9hZExpbmspO1xyXG4gICAgZG93bmxvYWRMaW5rLmNsaWNrKCk7XHJcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGRvd25sb2FkTGluayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZFN0cmluZ0FzSnNvbihjb250ZW50czogc3RyaW5nLCBmaWxlbmFtZTogc3RyaW5nKSB7XHJcbiAgICBsZXQgYmxvYiA9IG5ldyBCbG9iKFtjb250ZW50c10sIHt0eXBlOiBcInRleHQvcGxhaW5cIn0pO1xyXG5cclxuICAgIGxldCBkb3dubG9hZExpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuICAgIGRvd25sb2FkTGluay5ocmVmID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgICBkb3dubG9hZExpbmsuZG93bmxvYWQgPSBmaWxlbmFtZTtcclxuICAgIFxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb3dubG9hZExpbmspO1xyXG4gICAgZG93bmxvYWRMaW5rLmNsaWNrKCk7XHJcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGRvd25sb2FkTGluayk7XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBDb2xvciB9IGZyb20gXCIuL2NvbG9yXCI7XHJcbmltcG9ydCB7IENvbnRyb2xQb2ludCwgQ29udHJvbFBvaW50VXBkYXRlIH0gZnJvbSBcIi4vY29udHJvbF9wb2ludFwiO1xyXG5pbXBvcnQgeyBDb250cm9sUG9pbnRIYW5kbGUsIEhBTkRMRV9SQURJVVMgfSBmcm9tIFwiLi9jb250cm9sX3BvaW50X2hhbmRsZVwiO1xyXG5pbXBvcnQgeyBGaWxsTGF5ZXIsIEZpbGxVcGRhdGUgfSBmcm9tIFwiLi9maWxsX2xheWVyXCI7XHJcbmltcG9ydCB7IEFSUk9XX0NBTlZBU19DRU5URVIsIENIRUNLRVJCT0FSRF9TSVpFLCBIRUlHSFQsIFNJWkUsIHVwZGF0ZU1vdXNlUG9zaXRpb24sIFdJRFRIIH0gZnJvbSBcIi4vZ2xvYmFsXCI7XHJcbmltcG9ydCB7IExheWVyLCBMYXllclR5cGUsIExheWVyVXBkYXRlIH0gZnJvbSBcIi4vbGF5ZXJcIjtcclxuaW1wb3J0IHsgTGluZUxheWVyLCBMaW5lVXBkYXRlIH0gZnJvbSBcIi4vbGluZV9sYXllclwiO1xyXG5pbXBvcnQgeyBQb2ludDJEIH0gZnJvbSBcIi4vcG9pbnRfMmRcIjtcclxuaW1wb3J0IHsgQ29uZmlnLCBkZXNlcmlhbGl6ZUNvbmZpZywgc2VyaWFsaXplQ29uZmlnLCBTZXJpYWxpemVkQ29uZmlnIH0gZnJvbSBcIi4vc2VyaWFsaXphdGlvblwiO1xyXG5pbXBvcnQgeyBTcHJpdGVzaGVldCB9IGZyb20gXCIuL3Nwcml0ZXNoZWV0XCI7XHJcbmltcG9ydCB7IGNyZWF0ZUNvbnRyb2xQYW5lbEJ1dHRvbiwgY3JlYXRlQmFzZUNvbG9yUGlja2VyLCBjcmVhdGVMYWJlbGVkUmFuZ2UsIGNyZWF0ZUxheWVyRGlzcGxheSwgY3JlYXRlVG9wQ29udHJvbHNCdXR0b24sIGZpbGxXaXRoVHJhbnNwYXJlbmN5Q2hlY2tlcmJvYXJkLCBjcmVhdGVMYWJlbGVkUmFuZ2VXaXRob3V0V2FybmluZywgZmlsbEFyb3VuZFJlY3RhbmdsZSB9IGZyb20gXCIuL3VpX3V0aWxcIjtcclxuaW1wb3J0IHsgZGlzdGFuY2UsIGRvd25sb2FkQ2FudmFzQXNQbmcsIGRvd25sb2FkU3RyaW5nQXNKc29uIH0gZnJvbSBcIi4vdXRpbFwiO1xyXG5cclxubGV0IGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluQ2FudmFzXCIpO1xyXG5jYW52YXMud2lkdGggPSBXSURUSDtcclxuY2FudmFzLmhlaWdodCA9IEhFSUdIVDtcclxubGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG5sZXQgdG9wQ29udHJvbHNEaXYgPSA8SFRNTERpdkVsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9wQ29udHJvbHNEaXZcIik7XHJcbmxldCBzaWRlYmFyRGl2ID0gPEhUTUxEaXZFbGVtZW50PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZGViYXJEaXZcIik7XHJcblxyXG5sZXQgYmFzZUNvbG9yRGl2Q29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcclxubGV0IGhlYWRpbmdEaXY6IEhUTUxEaXZFbGVtZW50O1xyXG5sZXQgb3B0aW9uc0RpdjogSFRNTERpdkVsZW1lbnQ7XHJcbmxldCBsYXllcnNDb250cm9sUGFuZWw6IEhUTUxEaXZFbGVtZW50O1xyXG5sZXQgbGF5ZXJzRGlzcGxheTogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG5sZXQgZGVmYXVsdFRoaWNrbmVzc1JhdGlvID0gMC4yNTtcclxubGV0IGRlZmF1bHRMaW5lV2lkdGhSYXRpbzogbnVtYmVyID0gMC4wMjU7XHJcbmxldCBkZWZhdWx0QmV2ZWxTaXplUmF0aW86IG51bWJlciA9IDAuMDU7XHJcbmxldCBkZWZhdWx0U2l6ZVJhdGlvOiBudW1iZXIgPSAxLjA7XHJcbmxldCBkZWZhdWx0T2Zmc2V0UmF0aW86IFBvaW50MkQgPSBuZXcgUG9pbnQyRCgwLCAwKTtcclxubGV0IGRlZmF1bHRMaW5lTGlnaHRuZXNzUmF0aW86IG51bWJlciA9IC0xO1xyXG5sZXQgZGVmYXVsdEZpbGxMaWdodG5lc3NSYXRpbzogbnVtYmVyID0gMDtcclxuXHJcbmxldCBjcmVhdGVMaW5lUGF0aCA9IFwiLi4vYXNzZXRzL3NxdWFyZS1mdWxsLXJlZ3VsYXIucG5nXCI7XHJcbmxldCBjcmVhdGVMaW5lRGFya1BhdGggPSBcIi4uL2Fzc2V0cy9zcXVhcmUtZnVsbC1yZWd1bGFyLWRhcmsucG5nXCI7XHJcbmxldCBjcmVhdGVGaWxsUGF0aCA9IFwiLi4vYXNzZXRzL3NxdWFyZS1mdWxsLXNvbGlkLnBuZ1wiO1xyXG5sZXQgY3JlYXRlRmlsbERhcmtQYXRoID0gXCIuLi9hc3NldHMvc3F1YXJlLWZ1bGwtc29saWQtZGFyay5wbmdcIjtcclxubGV0IGRlbGV0ZVBhdGggPSBcIi4uL2Fzc2V0cy9yZWN0YW5nbGUteG1hcmstc29saWQucG5nXCI7XHJcbmxldCBkZWxldGVEYXJrUGF0aCA9IFwiLi4vYXNzZXRzL3JlY3RhbmdsZS14bWFyay1zb2xpZC1kYXJrLnBuZ1wiO1xyXG5sZXQgZHVwbGljYXRlUGF0aCA9IFwiLi4vYXNzZXRzL2Nsb25lLXNvbGlkLnBuZ1wiO1xyXG5sZXQgZHVwbGljYXRlRGFya1BhdGggPSBcIi4uL2Fzc2V0cy9jbG9uZS1zb2xpZC1kYXJrLnBuZ1wiO1xyXG5sZXQgbW92ZVVwUGF0aCA9IFwiLi4vYXNzZXRzL3VwLWxvbmctc29saWQucG5nXCI7XHJcbmxldCBtb3ZlVXBEYXJrUGF0aCA9IFwiLi4vYXNzZXRzL3VwLWxvbmctc29saWQtZGFyay5wbmdcIjtcclxubGV0IG1vdmVEb3duUGF0aCA9IFwiLi4vYXNzZXRzL2Rvd24tbG9uZy1zb2xpZC5wbmdcIjtcclxubGV0IG1vdmVEb3duRGFya1BhdGggPSBcIi4uL2Fzc2V0cy9kb3duLWxvbmctc29saWQtZGFyay5wbmdcIjtcclxuXHJcbmxldCBiZWF0RnJhY3Rpb25OYW1lczogc3RyaW5nW10gPSBbXCI0dGhcIiwgXCI4dGhcIiwgXCIxMnRoXCIsIFwiMTZ0aFwiLCBcIjIwdGhcIiwgXCIyNHRoXCIsIFwiMzJuZFwiLCBcIjQ4dGhcIiwgXCI2NHRoXCIsIFwiOTZ0aFwiLCBcIjEyOHRoXCIsIFwiMTkybmRcIiwgXCJyZWNlcHRvclwiXTtcclxubGV0IGN1cnJlbnRCZWF0RnJhY3Rpb25JbmRleDogbnVtYmVyID0gMDtcclxubGV0IGJlYXRGcmFjdGlvbkNvbG9yczogQ29sb3JbXSA9IFtcclxuICAgIG5ldyBDb2xvcigyNTQsIDAsIDE2KSwgLy8gNHRoLCByZWRcclxuICAgIG5ldyBDb2xvcigwLCAxMiwgMjU0KSwgLy8gOHRoLCBibHVlXHJcbiAgICBuZXcgQ29sb3IoMTE1LCAwLCAwKSwgLy8gMTJ0aCwgbWFyb29uXHJcbiAgICBuZXcgQ29sb3IoMjUyLCAyNDAsIDEpLCAvLyAxNnRoLCB5ZWxsb3dcclxuICAgIG5ldyBDb2xvcigxNDgsIDE0OCwgMTQ4KSwgLy8gMjB0aCwgZ3JleVxyXG4gICAgbmV3IENvbG9yKDI1MiwgNjYsIDIxNSksIC8vIDI0dGgsIHBpbmtcclxuICAgIG5ldyBDb2xvcigyNTIsIDY0LCAxKSwgLy8gMzJuZCwgb3JhbmdlXHJcbiAgICBuZXcgQ29sb3IoMTg4LCAwLCAxOTQpLCAvLyA0OHRoLCBwdXJwbGVcclxuICAgIG5ldyBDb2xvcigxLCAyNTIsIDE0KSwgLy8gNjR0aCwgZ3JlZW5cclxuICAgIG5ldyBDb2xvcigyMjksIDIyOSwgMjI5KSwgLy8gOTZ0aCwgd2hpdGVcclxuICAgIG5ldyBDb2xvcigxLCAyMzEsIDI1MiksIC8vIDEyOHRoLCBjeWFuXHJcbiAgICBuZXcgQ29sb3IoMzMsIDEyNywgMSksIC8vIDE5Mm5kLCBvbGl2ZVxyXG4gICAgbmV3IENvbG9yKDEwMCwgMTAwLCAxMDApLCAvLyByZWNlcHRvclxyXG5dO1xyXG5cclxubGV0IGNhbnZhc0JhY2tncm91bmRDb2xvcjogQ29sb3IgPSBuZXcgQ29sb3IoNzUsIDc1LCA3NSk7XHJcblxyXG5sZXQgdG9wQ29udHJvbHNTZWxlY3RlZENsYXNzOiBzdHJpbmcgPSBcInRvcENvbnRyb2xzU2VsZWN0ZWRcIjtcclxuXHJcbmVudW0gUGFnZSB7XHJcbiAgICBCRUFUX0ZSQUNUSU9OLFxyXG4gICAgSU1QT1JUX0VYUE9SVCxcclxuICAgIFJFQ0VQVE9SLFxyXG59XHJcblxyXG5sZXQgY3VycmVudFBhZ2U6IFBhZ2UgPSBQYWdlLkJFQVRfRlJBQ1RJT047XHJcblxyXG5mb3IgKGxldCBpID0gMDsgaSA8IGJlYXRGcmFjdGlvbk5hbWVzLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgbGV0IHRvcENvbnRyb2xCdXR0b25EaXY6IEhUTUxEaXZFbGVtZW50ID0gY3JlYXRlVG9wQ29udHJvbHNCdXR0b24oYmVhdEZyYWN0aW9uTmFtZXNbaV0pO1xyXG4gICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICB0b3BDb250cm9sQnV0dG9uRGl2LmNsYXNzTGlzdC5hZGQodG9wQ29udHJvbHNTZWxlY3RlZENsYXNzKTtcclxuICAgIH1cclxuICAgIGxldCB0b3BDb250cm9sQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudCA9IHRvcENvbnRyb2xCdXR0b25EaXYucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKTtcclxuICAgIHRvcENvbnRyb2xCdXR0b24ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICBkZXNlbGVjdFRvcENvbnRyb2xzKCk7XHJcbiAgICAgICAgdG9wQ29udHJvbEJ1dHRvbkRpdi5jbGFzc0xpc3QuYWRkKHRvcENvbnRyb2xzU2VsZWN0ZWRDbGFzcyk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRQYWdlICE9PSBQYWdlLkJFQVRfRlJBQ1RJT04pIHtcclxuICAgICAgICAgICAgY3JlYXRlVUlGb3JBcnJvd0VkaXRpbmcoKTtcclxuICAgICAgICAgICAgdXBkYXRlQmFzZUNvbG9yRGlzcGxheSgpO1xyXG4gICAgICAgICAgICB1cGRhdGVIZWFkaW5nVGV4dCgpO1xyXG4gICAgICAgICAgICB1cGRhdGVPcHRpb25zRGl2KCk7XHJcbiAgICAgICAgICAgIHVwZGF0ZUxheWVyc0NvbnRyb2xQYW5lbCgpO1xyXG4gICAgICAgICAgICB1cGRhdGVMYXllcnNEaXNwbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVwZGF0ZUN1cnJlbnRCZWF0RnJhY3Rpb24oaSk7XHJcbiAgICAgICAgY3VycmVudFBhZ2UgPSBQYWdlLkJFQVRfRlJBQ1RJT047XHJcbiAgICB9XHJcbiAgICB0b3BDb250cm9sc0Rpdi5hcHBlbmRDaGlsZCh0b3BDb250cm9sQnV0dG9uRGl2KTtcclxufVxyXG5cclxubGV0IHJlY2VwdG9yQnV0dG9uRGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbnJlY2VwdG9yQnV0dG9uRGl2LmlkID0gXCJyZWNlcHRvckJ1dHRvbkRpdlwiO1xyXG5yZWNlcHRvckJ1dHRvbkRpdi5jbGFzc0xpc3QuYWRkKFwidG9wQ29udHJvbHNCdXR0b25cIik7XHJcbmxldCByZWNlcHRvckJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG5yZWNlcHRvckJ1dHRvbi5pbm5lclRleHQgPSBcIlJlY2VwdG9yXCI7XHJcbnJlY2VwdG9yQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICBkZXNlbGVjdFRvcENvbnRyb2xzKCk7XHJcbiAgICByZWNlcHRvckJ1dHRvbkRpdi5jbGFzc0xpc3QuYWRkKHRvcENvbnRyb2xzU2VsZWN0ZWRDbGFzcyk7XHJcbiAgICBjcmVhdGVSZWNlcHRvclVJKCk7XHJcbiAgICB1cGRhdGVDdXJyZW50QmVhdEZyYWN0aW9uKGJlYXRGcmFjdGlvbkNvbG9ycy5sZW5ndGggLSAxKTtcclxuICAgIGN1cnJlbnRQYWdlID0gUGFnZS5SRUNFUFRPUjtcclxufTtcclxucmVjZXB0b3JCdXR0b25EaXYuYXBwZW5kQ2hpbGQocmVjZXB0b3JCdXR0b24pO1xyXG50b3BDb250cm9sc0Rpdi5hcHBlbmRDaGlsZChyZWNlcHRvckJ1dHRvbkRpdik7XHJcblxyXG5sZXQgaW1wb3J0RXhwb3J0QnV0dG9uRGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbmltcG9ydEV4cG9ydEJ1dHRvbkRpdi5pZCA9IFwiaW1wb3J0RXhwb3J0QnV0dG9uRGl2XCI7XHJcbmltcG9ydEV4cG9ydEJ1dHRvbkRpdi5jbGFzc0xpc3QuYWRkKFwidG9wQ29udHJvbHNCdXR0b25cIik7XHJcbmxldCBpbXBvcnRFeHBvcnRCdXR0b246IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuaW1wb3J0RXhwb3J0QnV0dG9uLmlubmVyVGV4dCA9IFwiSW1wb3J0L0V4cG9ydFwiO1xyXG5pbXBvcnRFeHBvcnRCdXR0b24ub25jbGljayA9ICgpID0+IHtcclxuICAgIGRlc2VsZWN0VG9wQ29udHJvbHMoKTtcclxuICAgIGltcG9ydEV4cG9ydEJ1dHRvbkRpdi5jbGFzc0xpc3QuYWRkKHRvcENvbnRyb2xzU2VsZWN0ZWRDbGFzcyk7XHJcbiAgICBjcmVhdGVJbXBvcnRFeHBvcnRVSSgpO1xyXG4gICAgY3VycmVudFBhZ2UgPSBQYWdlLklNUE9SVF9FWFBPUlQ7XHJcbn07XHJcbmltcG9ydEV4cG9ydEJ1dHRvbkRpdi5hcHBlbmRDaGlsZChpbXBvcnRFeHBvcnRCdXR0b24pO1xyXG50b3BDb250cm9sc0Rpdi5hcHBlbmRDaGlsZChpbXBvcnRFeHBvcnRCdXR0b25EaXYpO1xyXG5cclxubGV0IGxpbmVMYXllcjogTGluZUxheWVyID0gZ2V0RGVmYXVsdExpbmVMYXllcigpO1xyXG5sZXQgZmlsbExheWVyOiBGaWxsTGF5ZXIgPSBnZXREZWZhdWx0RmlsbExheWVyKCk7XHJcbmxldCBsYXllcnM6IExheWVyW10gPSBbZmlsbExheWVyLCBsaW5lTGF5ZXJdO1xyXG5sZXQgbGluZUxheWVyczogTGluZUxheWVyW10gPSBbbGluZUxheWVyXTtcclxubGV0IGZpbGxMYXllcnM6IEZpbGxMYXllcltdID0gW2ZpbGxMYXllcl07XHJcblxyXG5TcHJpdGVzaGVldC5pbml0KGxheWVycywgYmVhdEZyYWN0aW9uQ29sb3JzKTtcclxuXHJcbmxldCBjb250cm9sUG9pbnRIYW5kbGVzOiBDb250cm9sUG9pbnRIYW5kbGVbXSA9IFtdO1xyXG51cGRhdGVDb250cm9sUG9pbnRIYW5kbGVzKCk7XHJcblxyXG5jcmVhdGVVSUZvckFycm93RWRpdGluZygpO1xyXG51cGRhdGVCYXNlQ29sb3JEaXNwbGF5KCk7XHJcbnVwZGF0ZUhlYWRpbmdUZXh0KCk7XHJcbnVwZGF0ZU9wdGlvbnNEaXYoKTtcclxudXBkYXRlTGF5ZXJzQ29udHJvbFBhbmVsKCk7XHJcbnVwZGF0ZUxheWVyc0Rpc3BsYXkoKTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHVwZGF0ZU1vdXNlUG9zaXRpb24pO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrKTtcclxuXHJcbndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XHJcblxyXG5mdW5jdGlvbiBkZXNlbGVjdFRvcENvbnRyb2xzKCkge1xyXG4gICAgbGV0IGJ1dHRvbkRpdnM6IE5vZGVMaXN0ID0gdG9wQ29udHJvbHNEaXYucXVlcnlTZWxlY3RvckFsbChcImRpdlwiKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnV0dG9uRGl2cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICg8SFRNTERpdkVsZW1lbnQ+IGJ1dHRvbkRpdnNbaV0pLmNsYXNzTGlzdC5yZW1vdmUodG9wQ29udHJvbHNTZWxlY3RlZENsYXNzKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlVUlGb3JBcnJvd0VkaXRpbmcoKSB7XHJcbiAgICBzaWRlYmFyRGl2LmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gICAgYmFzZUNvbG9yRGl2Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGJhc2VDb2xvckRpdkNvbnRhaW5lci5pZCA9IFwiYmFzZUNvbG9yRGl2Q29udGFpbmVyXCI7XHJcbiAgICBzaWRlYmFyRGl2LmFwcGVuZENoaWxkKGJhc2VDb2xvckRpdkNvbnRhaW5lcik7XHJcblxyXG4gICAgaGVhZGluZ0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBoZWFkaW5nRGl2LmlkID0gXCJoZWFkaW5nRGl2XCI7XHJcbiAgICBzaWRlYmFyRGl2LmFwcGVuZENoaWxkKGhlYWRpbmdEaXYpO1xyXG5cclxuICAgIG9wdGlvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgb3B0aW9uc0Rpdi5pZCA9IFwib3B0aW9uc0RpdlwiO1xyXG4gICAgc2lkZWJhckRpdi5hcHBlbmRDaGlsZChvcHRpb25zRGl2KTtcclxuXHJcbiAgICBsZXQgbGF5ZXJzRGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBsYXllcnNEaXYuaWQgPSBcImxheWVyc0RpdlwiO1xyXG5cclxuICAgIGxheWVyc0NvbnRyb2xQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBsYXllcnNDb250cm9sUGFuZWwuaWQgPSBcImxheWVyc0NvbnRyb2xQYW5lbFwiO1xyXG4gICAgbGF5ZXJzRGl2LmFwcGVuZENoaWxkKGxheWVyc0NvbnRyb2xQYW5lbCk7XHJcblxyXG4gICAgbGF5ZXJzRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBsYXllcnNEaXNwbGF5LmlkID0gXCJsYXllcnNEaXNwbGF5XCI7XHJcbiAgICBsYXllcnNEaXYuYXBwZW5kQ2hpbGQobGF5ZXJzRGlzcGxheSk7XHJcblxyXG4gICAgc2lkZWJhckRpdi5hcHBlbmRDaGlsZChsYXllcnNEaXYpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVCYXNlQ29sb3JEaXNwbGF5KCkge1xyXG4gICAgYmFzZUNvbG9yRGl2Q29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBsZXQgY29sb3JQaWNrZXJEaXY6IEhUTUxEaXZFbGVtZW50ID0gY3JlYXRlQmFzZUNvbG9yUGlja2VyKFxyXG4gICAgICAgIFwiY29sb3JQaWNrZXJcIixcclxuICAgICAgICBcIkJhc2UgQ29sb3JcIixcclxuICAgICAgICBiZWF0RnJhY3Rpb25Db2xvcnNbY3VycmVudEJlYXRGcmFjdGlvbkluZGV4XS50b0hleCgpLFxyXG4gICAgKTtcclxuICAgIGxldCBjb2xvclBpY2tlcjogSFRNTElucHV0RWxlbWVudCA9IGNvbG9yUGlja2VyRGl2LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPWNvbG9yXVwiKTtcclxuICAgIGNvbG9yUGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGlucHV0Q29sb3I6IENvbG9yID0gQ29sb3IuZnJvbUhleChjb2xvclBpY2tlci52YWx1ZSk7XHJcbiAgICAgICAgYmVhdEZyYWN0aW9uQ29sb3JzW2N1cnJlbnRCZWF0RnJhY3Rpb25JbmRleF0gPSBpbnB1dENvbG9yO1xyXG4gICAgICAgIHVwZGF0ZUxheWVyQmFzZUNvbG9ycyhpbnB1dENvbG9yKTtcclxuICAgIH0pO1xyXG4gICAgYmFzZUNvbG9yRGl2Q29udGFpbmVyLmFwcGVuZENoaWxkKGNvbG9yUGlja2VyRGl2KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlQ3VycmVudEJlYXRGcmFjdGlvbihpOiBudW1iZXIpIHtcclxuICAgIGN1cnJlbnRCZWF0RnJhY3Rpb25JbmRleCA9IGk7XHJcbiAgICB1cGRhdGVCYXNlQ29sb3JEaXNwbGF5KCk7XHJcbiAgICB1cGRhdGVMYXllckJhc2VDb2xvcnMoYmVhdEZyYWN0aW9uQ29sb3JzW2N1cnJlbnRCZWF0RnJhY3Rpb25JbmRleF0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMYXllckJhc2VDb2xvcnMoYmFzZUNvbG9yOiBDb2xvcikge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsYXllcnNbaV0udXBkYXRlKHtiYXNlQ29sb3I6IGJhc2VDb2xvcn0pO1xyXG4gICAgfVxyXG4gICAgU3ByaXRlc2hlZXQubmVlZHNUb0JlUmVuZGVyZWQgPSB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVIZWFkaW5nVGV4dCgpIHtcclxuICAgIGxldCBzZWxlY3RlZEhhbmRsZXM6IENvbnRyb2xQb2ludEhhbmRsZVtdID0gZ2V0U2VsZWN0ZWRIYW5kbGVzKCk7XHJcblxyXG4gICAgbGV0IGhlYWRpbmdUZXh0OiBzdHJpbmc7XHJcbiAgICBpZiAoc2VsZWN0ZWRIYW5kbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBsZXQgbGF5ZXJJZHM6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3RlZEhhbmRsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzZWxlY3RlZEhhbmRsZXNbaV0ubGF5ZXJzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGF5ZXI6IExheWVyID0gc2VsZWN0ZWRIYW5kbGVzW2ldLmxheWVyc1tqXTtcclxuICAgICAgICAgICAgICAgIGlmICghbGF5ZXJJZHMuaW5jbHVkZXMobGF5ZXIuaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJJZHMucHVzaChsYXllci5pZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBsYXllcnNTdHJpbmc6IHN0cmluZyA9IGxheWVySWRzLmxlbmd0aCA9PSAxID8gXCIgbGF5ZXJcIiA6IFwiIGxheWVyc1wiO1xyXG4gICAgICAgIGxldCBjb250cm9sUG9pbnRzU3RyaW5nOiBzdHJpbmcgPSBzZWxlY3RlZEhhbmRsZXMubGVuZ3RoID09IDEgPyBcIiBjb250cm9sIHBvaW50XCIgOiBcIiBjb250cm9sIHBvaW50c1wiO1xyXG4gICAgICAgIGhlYWRpbmdUZXh0ID0gXCJFZGl0aW5nIFwiICsgc2VsZWN0ZWRIYW5kbGVzLmxlbmd0aCArIGNvbnRyb2xQb2ludHNTdHJpbmcgKyBcIiBpbiBcIiArIGxheWVySWRzLmxlbmd0aCArIGxheWVyc1N0cmluZztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkQ291bnQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGxheWVyc1tpXS5pc1NlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENvdW50Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxheWVyc1N0cmluZzogc3RyaW5nID0gc2VsZWN0ZWRDb3VudCA9PSAxID8gXCIgbGF5ZXJcIiA6IFwiIGxheWVyc1wiO1xyXG4gICAgICAgIGhlYWRpbmdUZXh0ID0gXCJFZGl0aW5nIFwiICsgc2VsZWN0ZWRDb3VudCArIGxheWVyc1N0cmluZztcclxuICAgIH1cclxuXHJcbiAgICBoZWFkaW5nRGl2LmlubmVyVGV4dCA9IGhlYWRpbmdUZXh0O1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVPcHRpb25zRGl2KCkge1xyXG4gICAgbGV0IHNlbGVjdGVkSGFuZGxlczogQ29udHJvbFBvaW50SGFuZGxlW10gPSBnZXRTZWxlY3RlZEhhbmRsZXMoKTtcclxuXHJcbiAgICBsZXQgdGhpY2tuZXNzUmF0aW86IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICAgIGxldCB0aGlja25lc3NSYXRpb1dhcm5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGxldCBsaW5lV2lkdGhSYXRpbzogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gICAgbGV0IGxpbmVXaWR0aFJhdGlvV2FybmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgbGV0IGJldmVsU2l6ZVJhdGlvOiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgICBsZXQgYmV2ZWxTaXplUmF0aW9XYXJuaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBsZXQgc2l6ZVJhdGlvOiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgICBsZXQgc2l6ZVJhdGlvV2FybmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgbGV0IGxpZ2h0bmVzc1JhdGlvOiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgICBsZXQgbGlnaHRuZXNzUmF0aW9XYXJuaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBsZXQgb2Zmc2V0WFJhdGlvOiBudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgICBsZXQgb2Zmc2V0WFJhdGlvV2FybmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgbGV0IG9mZnNldFlSYXRpbzogbnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gICAgbGV0IG9mZnNldFlSYXRpb1dhcm5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBpZiAoc2VsZWN0ZWRIYW5kbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkSGFuZGxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNlbGVjdGVkSGFuZGxlc1tpXS5jb250cm9sUG9pbnRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udHJvbFBvaW50OiBDb250cm9sUG9pbnQgPSBzZWxlY3RlZEhhbmRsZXNbaV0uY29udHJvbFBvaW50c1tqXTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlja25lc3NSYXRpbyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpY2tuZXNzUmF0aW8gPSBjb250cm9sUG9pbnQudGhpY2tuZXNzUmF0aW87XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRyb2xQb2ludC50aGlja25lc3NSYXRpbyAhPT0gdGhpY2tuZXNzUmF0aW8pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlja25lc3NSYXRpbyA9IGRlZmF1bHRUaGlja25lc3NSYXRpbztcclxuICAgICAgICAgICAgICAgICAgICB0aGlja25lc3NSYXRpb1dhcm5pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChiZXZlbFNpemVSYXRpbyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmV2ZWxTaXplUmF0aW8gPSBjb250cm9sUG9pbnQuYmV2ZWxTaXplUmF0aW87XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRyb2xQb2ludC5iZXZlbFNpemVSYXRpbyAhPT0gYmV2ZWxTaXplUmF0aW8pIHtcclxuICAgICAgICAgICAgICAgICAgICBiZXZlbFNpemVSYXRpbyA9IGRlZmF1bHRCZXZlbFNpemVSYXRpbztcclxuICAgICAgICAgICAgICAgICAgICBiZXZlbFNpemVSYXRpb1dhcm5pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzaXplUmF0aW8gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpemVSYXRpbyA9IGNvbnRyb2xQb2ludC5zaXplUmF0aW87XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRyb2xQb2ludC5zaXplUmF0aW8gIT09IHNpemVSYXRpbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpemVSYXRpbyA9IGRlZmF1bHRTaXplUmF0aW87XHJcbiAgICAgICAgICAgICAgICAgICAgc2l6ZVJhdGlvV2FybmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG9mZnNldFhSYXRpbyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WFJhdGlvID0gY29udHJvbFBvaW50Lm9mZnNldFJhdGlvLng7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRyb2xQb2ludC5vZmZzZXRSYXRpby54ICE9PSBvZmZzZXRYUmF0aW8pIHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRYUmF0aW8gPSBkZWZhdWx0T2Zmc2V0UmF0aW8ueDtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRYUmF0aW9XYXJuaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0WVJhdGlvID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZUmF0aW8gPSBjb250cm9sUG9pbnQub2Zmc2V0UmF0aW8ueTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udHJvbFBvaW50Lm9mZnNldFJhdGlvLnkgIT09IG9mZnNldFlSYXRpbykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFlSYXRpbyA9IGRlZmF1bHRPZmZzZXRSYXRpby55O1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFlSYXRpb1dhcm5pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgc2VsZWN0ZWRMYXllcnM6IExheWVyW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gbGF5ZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGlmIChsYXllcnNbaV0uaXNTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRMYXllcnMucHVzaChsYXllcnNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB0aGlja25lc3NSYXRpb1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRMYXllcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGxheWVyID0gPEZpbGxMYXllciB8IExpbmVMYXllcj4gc2VsZWN0ZWRMYXllcnNbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpY2tuZXNzUmF0aW8gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpY2tuZXNzUmF0aW8gPSBsYXllci50aGlja25lc3NSYXRpbztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsYXllci50aGlja25lc3NSYXRpbyAhPT0gdGhpY2tuZXNzUmF0aW8pIHtcclxuICAgICAgICAgICAgICAgIHRoaWNrbmVzc1JhdGlvID0gZGVmYXVsdFRoaWNrbmVzc1JhdGlvO1xyXG4gICAgICAgICAgICAgICAgdGhpY2tuZXNzUmF0aW9XYXJuaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxheWVyLmNvbnRyb2xQb2ludHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb250cm9sUG9pbnQ6IENvbnRyb2xQb2ludCA9IGxheWVyLmNvbnRyb2xQb2ludHNbal07XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpY2tuZXNzUmF0aW8gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaWNrbmVzc1JhdGlvID0gY29udHJvbFBvaW50LnRoaWNrbmVzc1JhdGlvO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb250cm9sUG9pbnQudGhpY2tuZXNzUmF0aW8gIT09IHRoaWNrbmVzc1JhdGlvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpY2tuZXNzUmF0aW8gPSBkZWZhdWx0VGhpY2tuZXNzUmF0aW87XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpY2tuZXNzUmF0aW9XYXJuaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpY2tuZXNzUmF0aW9XYXJuaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbGluZVdpZHRoUmF0aW9cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkTGF5ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZExheWVyc1tpXS50eXBlICE9PSBMYXllclR5cGUuTElORSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGxheWVyID0gPExpbmVMYXllcj4gc2VsZWN0ZWRMYXllcnNbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAobGluZVdpZHRoUmF0aW8gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoUmF0aW8gPSBsYXllci5saW5lV2lkdGhSYXRpbztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsYXllci5saW5lV2lkdGhSYXRpbyAhPT0gbGluZVdpZHRoUmF0aW8pIHtcclxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aFJhdGlvID0gZGVmYXVsdExpbmVXaWR0aFJhdGlvO1xyXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoUmF0aW9XYXJuaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBiZXZlbFNpemVSYXRpb1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRMYXllcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGxheWVyID0gPEZpbGxMYXllciB8IExpbmVMYXllcj4gc2VsZWN0ZWRMYXllcnNbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAoYmV2ZWxTaXplUmF0aW8gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgYmV2ZWxTaXplUmF0aW8gPSBsYXllci5iZXZlbFNpemVSYXRpbztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsYXllci5iZXZlbFNpemVSYXRpbyAhPT0gYmV2ZWxTaXplUmF0aW8pIHtcclxuICAgICAgICAgICAgICAgIGJldmVsU2l6ZVJhdGlvID0gZGVmYXVsdEJldmVsU2l6ZVJhdGlvO1xyXG4gICAgICAgICAgICAgICAgYmV2ZWxTaXplUmF0aW9XYXJuaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxheWVyLmNvbnRyb2xQb2ludHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb250cm9sUG9pbnQ6IENvbnRyb2xQb2ludCA9IGxheWVyLmNvbnRyb2xQb2ludHNbal07XHJcbiAgICAgICAgICAgICAgICBpZiAoYmV2ZWxTaXplUmF0aW8gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJldmVsU2l6ZVJhdGlvID0gY29udHJvbFBvaW50LmJldmVsU2l6ZVJhdGlvO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb250cm9sUG9pbnQuYmV2ZWxTaXplUmF0aW8gIT09IGJldmVsU2l6ZVJhdGlvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmV2ZWxTaXplUmF0aW8gPSBkZWZhdWx0QmV2ZWxTaXplUmF0aW87XHJcbiAgICAgICAgICAgICAgICAgICAgYmV2ZWxTaXplUmF0aW9XYXJuaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYmV2ZWxTaXplUmF0aW9XYXJuaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbGlnaHRuZXNzUmF0aW9cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkTGF5ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXllciA9IDxMaW5lTGF5ZXI+IHNlbGVjdGVkTGF5ZXJzW2ldO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxpZ2h0bmVzc1JhdGlvID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGxpZ2h0bmVzc1JhdGlvID0gbGF5ZXIubGlnaHRuZXNzUmF0aW87XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGF5ZXIubGlnaHRuZXNzUmF0aW8gIT09IGxpZ2h0bmVzc1JhdGlvKSB7XHJcbiAgICAgICAgICAgICAgICBsaWdodG5lc3NSYXRpbyA9IGRlZmF1bHRGaWxsTGlnaHRuZXNzUmF0aW87XHJcbiAgICAgICAgICAgICAgICBsaWdodG5lc3NSYXRpb1dhcm5pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNpemVSYXRpb1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWRMYXllcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGxheWVyID0gPEZpbGxMYXllciB8IExpbmVMYXllcj4gc2VsZWN0ZWRMYXllcnNbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAoc2l6ZVJhdGlvID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHNpemVSYXRpbyA9IGxheWVyLnNpemVSYXRpbztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsYXllci5zaXplUmF0aW8gIT09IHNpemVSYXRpbykge1xyXG4gICAgICAgICAgICAgICAgc2l6ZVJhdGlvID0gZGVmYXVsdFNpemVSYXRpbztcclxuICAgICAgICAgICAgICAgIHNpemVSYXRpb1dhcm5pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGF5ZXIuY29udHJvbFBvaW50cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRyb2xQb2ludDogQ29udHJvbFBvaW50ID0gbGF5ZXIuY29udHJvbFBvaW50c1tqXTtcclxuICAgICAgICAgICAgICAgIGlmIChzaXplUmF0aW8gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpemVSYXRpbyA9IGNvbnRyb2xQb2ludC5zaXplUmF0aW87XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRyb2xQb2ludC5zaXplUmF0aW8gIT09IHNpemVSYXRpbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpemVSYXRpbyA9IGRlZmF1bHRTaXplUmF0aW87XHJcbiAgICAgICAgICAgICAgICAgICAgc2l6ZVJhdGlvV2FybmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNpemVSYXRpb1dhcm5pbmcpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBvZmZzZXRYXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3RlZExheWVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbGF5ZXIgPSA8RmlsbExheWVyIHwgTGluZUxheWVyPiBzZWxlY3RlZExheWVyc1tpXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvZmZzZXRYUmF0aW8gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0WFJhdGlvID0gbGF5ZXIub2Zmc2V0UmF0aW8ueDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsYXllci5vZmZzZXRSYXRpby54ICE9PSBvZmZzZXRYUmF0aW8pIHtcclxuICAgICAgICAgICAgICAgIG9mZnNldFhSYXRpbyA9IGRlZmF1bHRPZmZzZXRSYXRpby54O1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0WFJhdGlvV2FybmluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsYXllci5jb250cm9sUG9pbnRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udHJvbFBvaW50OiBDb250cm9sUG9pbnQgPSBsYXllci5jb250cm9sUG9pbnRzW2pdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9mZnNldFhSYXRpbyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WFJhdGlvID0gY29udHJvbFBvaW50Lm9mZnNldFJhdGlvLng7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRyb2xQb2ludC5vZmZzZXRSYXRpby54ICE9PSBvZmZzZXRYUmF0aW8pIHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRYUmF0aW8gPSBkZWZhdWx0T2Zmc2V0UmF0aW8ueDtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRYUmF0aW9XYXJuaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob2Zmc2V0WFJhdGlvV2FybmluZykge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG9mZnNldFlcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkTGF5ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXllciA9IDxGaWxsTGF5ZXIgfCBMaW5lTGF5ZXI+IHNlbGVjdGVkTGF5ZXJzW2ldO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9mZnNldFlSYXRpbyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXRZUmF0aW8gPSBsYXllci5vZmZzZXRSYXRpby55O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxheWVyLm9mZnNldFJhdGlvLnkgIT09IG9mZnNldFlSYXRpbykge1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0WVJhdGlvID0gZGVmYXVsdE9mZnNldFJhdGlvLnk7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXRZUmF0aW9XYXJuaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxheWVyLmNvbnRyb2xQb2ludHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb250cm9sUG9pbnQ6IENvbnRyb2xQb2ludCA9IGxheWVyLmNvbnRyb2xQb2ludHNbal07XHJcbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0WVJhdGlvID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZUmF0aW8gPSBjb250cm9sUG9pbnQub2Zmc2V0UmF0aW8ueTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udHJvbFBvaW50Lm9mZnNldFJhdGlvLnkgIT09IG9mZnNldFlSYXRpbykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFlSYXRpbyA9IGRlZmF1bHRPZmZzZXRSYXRpby55O1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFlSYXRpb1dhcm5pbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvZmZzZXRZUmF0aW9XYXJuaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvcHRpb25zRGl2LmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gICAgaWYgKHRoaWNrbmVzc1JhdGlvICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAvLyBPdmVyYWxsIG1heCB0aGlja25lc3MgcmF0aW8gPSBNYXRoLlNRUlQyIC0gMVxyXG4gICAgICAgIC8vIFdoaWNoIGhhcHBlbnMgd2hlbiB0aGUgYm90dG9tcyBvZiB0aGUgYXJtcyB3b3VsZCBtZWV0IHRoZSBiYXNlXHJcbiAgICAgICAgbGV0IHRoaWNrbmVzc1NsaWRlckRpdjogSFRNTERpdkVsZW1lbnQgPSBjcmVhdGVMYWJlbGVkUmFuZ2UoXHJcbiAgICAgICAgICAgIFwidGhpY2tuZXNzU2lsZGVyXCIsXHJcbiAgICAgICAgICAgIFwiVGhpY2tuZXNzXCIsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIE1hdGguU1FSVDIgLSAxLFxyXG4gICAgICAgICAgICAwLjAwMSxcclxuICAgICAgICAgICAgdGhpY2tuZXNzUmF0aW8sXHJcbiAgICAgICAgICAgIHRoaWNrbmVzc1JhdGlvV2FybmluZyxcclxuICAgICAgICApO1xyXG4gICAgICAgIGxldCB0aGlja25lc3NTbGlkZXI6IEhUTUxJbnB1dEVsZW1lbnQgPSB0aGlja25lc3NTbGlkZXJEaXYucXVlcnlTZWxlY3RvcihcImlucHV0W3R5cGU9cmFuZ2VdXCIpO1xyXG4gICAgICAgIGlmIChzZWxlY3RlZEhhbmRsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlja25lc3NTbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZUNvbnRyb2xQb2ludHMoc2VsZWN0ZWRIYW5kbGVzLCB7dGhpY2tuZXNzUmF0aW86IHRoaWNrbmVzc1NsaWRlci52YWx1ZUFzTnVtYmVyfSlcclxuICAgICAgICAgICAgICAgIGxldCBzbGlkZXJXYXJuaW5nU3BhbiA9IHRoaWNrbmVzc1NsaWRlckRpdi5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlcldhcm5pbmdTcGFuXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlcldhcm5pbmdTcGFuLmlubmVySFRNTCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlcldhcm5pbmdTcGFuLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaWNrbmVzc1NsaWRlci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlU2VsZWN0ZWRMYXllcnMoe3RoaWNrbmVzc1JhdGlvOiB0aGlja25lc3NTbGlkZXIudmFsdWVBc051bWJlcn0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNsaWRlcldhcm5pbmdTcGFuID0gdGhpY2tuZXNzU2xpZGVyRGl2LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyV2FybmluZ1NwYW5cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGVyV2FybmluZ1NwYW4uaW5uZXJIVE1MICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyV2FybmluZ1NwYW4uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9wdGlvbnNEaXYuYXBwZW5kQ2hpbGQodGhpY2tuZXNzU2xpZGVyRGl2KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGluZVdpZHRoUmF0aW8gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCBsaW5lV2lkdGhTbGlkZXJEaXY6IEhUTUxEaXZFbGVtZW50ID0gY3JlYXRlTGFiZWxlZFJhbmdlKFxyXG4gICAgICAgICAgICBcImxpbmVXaWR0aFNsaWRlclwiLFxyXG4gICAgICAgICAgICBcIkxpbmUgV2lkdGhcIixcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgMC4yLFxyXG4gICAgICAgICAgICAwLjAwMSxcclxuICAgICAgICAgICAgbGluZVdpZHRoUmF0aW8sXHJcbiAgICAgICAgICAgIGxpbmVXaWR0aFJhdGlvV2FybmluZyxcclxuICAgICAgICApO1xyXG4gICAgICAgIGxldCBsaW5lV2lkdGhTbGlkZXI6IEhUTUxJbnB1dEVsZW1lbnQgPSBsaW5lV2lkdGhTbGlkZXJEaXYucXVlcnlTZWxlY3RvcihcImlucHV0W3R5cGU9cmFuZ2VdXCIpO1xyXG4gICAgICAgIGxpbmVXaWR0aFNsaWRlci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB1cGRhdGVTZWxlY3RlZExpbmVzKHtsaW5lV2lkdGhSYXRpbzogbGluZVdpZHRoU2xpZGVyLnZhbHVlQXNOdW1iZXJ9KTtcclxuICAgICAgICAgICAgbGV0IHNsaWRlcldhcm5pbmdTcGFuID0gbGluZVdpZHRoU2xpZGVyRGl2LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyV2FybmluZ1NwYW5cIik7XHJcbiAgICAgICAgICAgIGlmIChzbGlkZXJXYXJuaW5nU3Bhbi5pbm5lckhUTUwgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlcldhcm5pbmdTcGFuLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBvcHRpb25zRGl2LmFwcGVuZENoaWxkKGxpbmVXaWR0aFNsaWRlckRpdik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGJldmVsU2l6ZVJhdGlvICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBsZXQgYmV2ZWxTaXplU2xpZGVyRGl2OiBIVE1MRGl2RWxlbWVudCA9IGNyZWF0ZUxhYmVsZWRSYW5nZShcclxuICAgICAgICAgICAgXCJiZXZlbFNpemVTbGlkZXJcIixcclxuICAgICAgICAgICAgXCJCZXZlbCBTaXplXCIsXHJcbiAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgIDEuMCxcclxuICAgICAgICAgICAgMC4wMDEsXHJcbiAgICAgICAgICAgIGJldmVsU2l6ZVJhdGlvLFxyXG4gICAgICAgICAgICBiZXZlbFNpemVSYXRpb1dhcm5pbmcsXHJcbiAgICAgICAgKTtcclxuICAgICAgICBsZXQgYmV2ZWxTaXplU2xpZGVyOiBIVE1MSW5wdXRFbGVtZW50ID0gYmV2ZWxTaXplU2xpZGVyRGl2LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPXJhbmdlXVwiKTtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRIYW5kbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgYmV2ZWxTaXplU2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVDb250cm9sUG9pbnRzKHNlbGVjdGVkSGFuZGxlcywge2JldmVsU2l6ZVJhdGlvOiBiZXZlbFNpemVTbGlkZXIudmFsdWVBc051bWJlcn0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNsaWRlcldhcm5pbmdTcGFuID0gYmV2ZWxTaXplU2xpZGVyRGl2LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyV2FybmluZ1NwYW5cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGVyV2FybmluZ1NwYW4uaW5uZXJIVE1MICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyV2FybmluZ1NwYW4uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYmV2ZWxTaXplU2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVTZWxlY3RlZExheWVycyh7YmV2ZWxTaXplUmF0aW86IGJldmVsU2l6ZVNsaWRlci52YWx1ZUFzTnVtYmVyfSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xpZGVyV2FybmluZ1NwYW4gPSBiZXZlbFNpemVTbGlkZXJEaXYucXVlcnlTZWxlY3RvcihcIi5zbGlkZXJXYXJuaW5nU3BhblwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChzbGlkZXJXYXJuaW5nU3Bhbi5pbm5lckhUTUwgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJXYXJuaW5nU3Bhbi5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgb3B0aW9uc0Rpdi5hcHBlbmRDaGlsZChiZXZlbFNpemVTbGlkZXJEaXYpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzaXplUmF0aW8gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCBzaXplU2xpZGVyRGl2OiBIVE1MRGl2RWxlbWVudCA9IGNyZWF0ZUxhYmVsZWRSYW5nZShcclxuICAgICAgICAgICAgXCJzaXplU2xpZGVyXCIsXHJcbiAgICAgICAgICAgIFwiU2l6ZVwiLFxyXG4gICAgICAgICAgICAwLjEsXHJcbiAgICAgICAgICAgIDEuNSxcclxuICAgICAgICAgICAgMC4wMDEsXHJcbiAgICAgICAgICAgIHNpemVSYXRpbyxcclxuICAgICAgICAgICAgc2l6ZVJhdGlvV2FybmluZyxcclxuICAgICAgICApO1xyXG4gICAgICAgIGxldCBzaXplU2xpZGVyOiBIVE1MSW5wdXRFbGVtZW50ID0gc2l6ZVNsaWRlckRpdi5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbdHlwZT1yYW5nZV1cIik7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkSGFuZGxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHNpemVTbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZUNvbnRyb2xQb2ludHMoc2VsZWN0ZWRIYW5kbGVzLCB7c2l6ZVJhdGlvOiBzaXplU2xpZGVyLnZhbHVlQXNOdW1iZXJ9KTtcclxuICAgICAgICAgICAgICAgIGxldCBzbGlkZXJXYXJuaW5nU3BhbiA9IHNpemVTbGlkZXJEaXYucXVlcnlTZWxlY3RvcihcIi5zbGlkZXJXYXJuaW5nU3BhblwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChzbGlkZXJXYXJuaW5nU3Bhbi5pbm5lckhUTUwgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJXYXJuaW5nU3Bhbi5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzaXplU2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVTZWxlY3RlZExheWVycyh7c2l6ZVJhdGlvOiBzaXplU2xpZGVyLnZhbHVlQXNOdW1iZXJ9KTtcclxuICAgICAgICAgICAgICAgIGxldCBzbGlkZXJXYXJuaW5nU3BhbiA9IHNpemVTbGlkZXJEaXYucXVlcnlTZWxlY3RvcihcIi5zbGlkZXJXYXJuaW5nU3BhblwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChzbGlkZXJXYXJuaW5nU3Bhbi5pbm5lckhUTUwgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJXYXJuaW5nU3Bhbi5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgb3B0aW9uc0Rpdi5hcHBlbmRDaGlsZChzaXplU2xpZGVyRGl2KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGlnaHRuZXNzUmF0aW8gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCBsaWdodG5lc3NTbGlkZXJEaXY6IEhUTUxEaXZFbGVtZW50ID0gY3JlYXRlTGFiZWxlZFJhbmdlKFxyXG4gICAgICAgICAgICBcImxpZ2h0bmVzc1NsaWRlclwiLFxyXG4gICAgICAgICAgICBcIkNvbG9yIExpZ2h0bmVzc1wiLFxyXG4gICAgICAgICAgICAtMSxcclxuICAgICAgICAgICAgMSxcclxuICAgICAgICAgICAgMC4wMDEsXHJcbiAgICAgICAgICAgIGxpZ2h0bmVzc1JhdGlvLFxyXG4gICAgICAgICAgICBsaWdodG5lc3NSYXRpb1dhcm5pbmcsXHJcbiAgICAgICAgKTtcclxuICAgICAgICBsZXQgbGlnaHRuZXNzU2xpZGVyOiBIVE1MSW5wdXRFbGVtZW50ID0gbGlnaHRuZXNzU2xpZGVyRGl2LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPXJhbmdlXVwiKTtcclxuICAgICAgICBsaWdodG5lc3NTbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcclxuICAgICAgICAgICAgdXBkYXRlU2VsZWN0ZWRMYXllcnMoe2xpZ2h0bmVzc1JhdGlvOiBsaWdodG5lc3NTbGlkZXIudmFsdWVBc051bWJlcn0pO1xyXG4gICAgICAgICAgICBsZXQgc2xpZGVyV2FybmluZ1NwYW4gPSBsaWdodG5lc3NTbGlkZXJEaXYucXVlcnlTZWxlY3RvcihcIi5zbGlkZXJXYXJuaW5nU3BhblwiKTtcclxuICAgICAgICAgICAgaWYgKHNsaWRlcldhcm5pbmdTcGFuLmlubmVySFRNTCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVyV2FybmluZ1NwYW4uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG9wdGlvbnNEaXYuYXBwZW5kQ2hpbGQobGlnaHRuZXNzU2xpZGVyRGl2KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob2Zmc2V0WFJhdGlvICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBsZXQgb2Zmc2V0WFNsaWRlckRpdjogSFRNTERpdkVsZW1lbnQgPSBjcmVhdGVMYWJlbGVkUmFuZ2UoXHJcbiAgICAgICAgICAgIFwib2Zmc2V0WFNsaWRlclwiLFxyXG4gICAgICAgICAgICBcIlggT2Zmc2V0XCIsXHJcbiAgICAgICAgICAgIC0xLFxyXG4gICAgICAgICAgICAxLFxyXG4gICAgICAgICAgICAwLjAwMSxcclxuICAgICAgICAgICAgb2Zmc2V0WFJhdGlvLFxyXG4gICAgICAgICAgICBvZmZzZXRYUmF0aW9XYXJuaW5nLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbGV0IG9mZnNldFhTbGlkZXI6IEhUTUxJbnB1dEVsZW1lbnQgPSBvZmZzZXRYU2xpZGVyRGl2LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPXJhbmdlXVwiKTtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRIYW5kbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgb2Zmc2V0WFNsaWRlci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlQ29udHJvbFBvaW50cyhzZWxlY3RlZEhhbmRsZXMsIHtvZmZzZXRYUmF0aW86IG9mZnNldFhTbGlkZXIudmFsdWVBc051bWJlcn0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNsaWRlcldhcm5pbmdTcGFuID0gb2Zmc2V0WFNsaWRlckRpdi5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlcldhcm5pbmdTcGFuXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlcldhcm5pbmdTcGFuLmlubmVySFRNTCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlcldhcm5pbmdTcGFuLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9mZnNldFhTbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVNlbGVjdGVkTGF5ZXJzKHtvZmZzZXRYUmF0aW86IG9mZnNldFhTbGlkZXIudmFsdWVBc051bWJlcn0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNsaWRlcldhcm5pbmdTcGFuID0gb2Zmc2V0WFNsaWRlckRpdi5xdWVyeVNlbGVjdG9yKFwiLnNsaWRlcldhcm5pbmdTcGFuXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlcldhcm5pbmdTcGFuLmlubmVySFRNTCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlcldhcm5pbmdTcGFuLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvcHRpb25zRGl2LmFwcGVuZENoaWxkKG9mZnNldFhTbGlkZXJEaXYpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvZmZzZXRZUmF0aW8gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCBvZmZzZXRZU2xpZGVyRGl2OiBIVE1MRGl2RWxlbWVudCA9IGNyZWF0ZUxhYmVsZWRSYW5nZShcclxuICAgICAgICAgICAgXCJvZmZzZXRZU2xpZGVyXCIsXHJcbiAgICAgICAgICAgIFwiWSBPZmZzZXRcIixcclxuICAgICAgICAgICAgLTEsXHJcbiAgICAgICAgICAgIDEsXHJcbiAgICAgICAgICAgIDAuMDAxLFxyXG4gICAgICAgICAgICBvZmZzZXRZUmF0aW8sXHJcbiAgICAgICAgICAgIG9mZnNldFlSYXRpb1dhcm5pbmcsXHJcbiAgICAgICAgKTtcclxuICAgICAgICBsZXQgb2Zmc2V0WVNsaWRlcjogSFRNTElucHV0RWxlbWVudCA9IG9mZnNldFlTbGlkZXJEaXYucXVlcnlTZWxlY3RvcihcImlucHV0W3R5cGU9cmFuZ2VdXCIpO1xyXG4gICAgICAgIGlmIChzZWxlY3RlZEhhbmRsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBvZmZzZXRZU2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVDb250cm9sUG9pbnRzKHNlbGVjdGVkSGFuZGxlcywge29mZnNldFlSYXRpbzogb2Zmc2V0WVNsaWRlci52YWx1ZUFzTnVtYmVyfSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xpZGVyV2FybmluZ1NwYW4gPSBvZmZzZXRZU2xpZGVyRGl2LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyV2FybmluZ1NwYW5cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGVyV2FybmluZ1NwYW4uaW5uZXJIVE1MICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyV2FybmluZ1NwYW4uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2Zmc2V0WVNsaWRlci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlU2VsZWN0ZWRMYXllcnMoe29mZnNldFlSYXRpbzogb2Zmc2V0WVNsaWRlci52YWx1ZUFzTnVtYmVyfSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2xpZGVyV2FybmluZ1NwYW4gPSBvZmZzZXRZU2xpZGVyRGl2LnF1ZXJ5U2VsZWN0b3IoXCIuc2xpZGVyV2FybmluZ1NwYW5cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGVyV2FybmluZ1NwYW4uaW5uZXJIVE1MICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyV2FybmluZ1NwYW4uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9wdGlvbnNEaXYuYXBwZW5kQ2hpbGQob2Zmc2V0WVNsaWRlckRpdik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGVkRmlsbHMobGF5ZXJVcGRhdGU6IEZpbGxVcGRhdGUpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsbExheWVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChmaWxsTGF5ZXJzW2ldLmlzU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgZmlsbExheWVyc1tpXS51cGRhdGUobGF5ZXJVcGRhdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFNwcml0ZXNoZWV0Lm5lZWRzVG9CZVJlbmRlcmVkID0gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlU2VsZWN0ZWRMaW5lcyhsYXllclVwZGF0ZTogTGluZVVwZGF0ZSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lTGF5ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxpbmVMYXllcnNbaV0uaXNTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICBsaW5lTGF5ZXJzW2ldLnVwZGF0ZShsYXllclVwZGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgU3ByaXRlc2hlZXQubmVlZHNUb0JlUmVuZGVyZWQgPSB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTZWxlY3RlZExheWVycyhsYXllclVwZGF0ZTogTGF5ZXJVcGRhdGUpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxheWVyc1tpXS5pc1NlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIGxheWVyc1tpXS51cGRhdGUobGF5ZXJVcGRhdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFNwcml0ZXNoZWV0Lm5lZWRzVG9CZVJlbmRlcmVkID0gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlQ29udHJvbFBvaW50cyhzZWxlY3RlZEhhbmRsZXM6IENvbnRyb2xQb2ludEhhbmRsZVtdLCBjb250cm9sUG9pbnRVcGRhdGU6IENvbnRyb2xQb2ludFVwZGF0ZSkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3RlZEhhbmRsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNlbGVjdGVkSGFuZGxlc1tpXS5jb250cm9sUG9pbnRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBjb250cm9sUG9pbnQ6IENvbnRyb2xQb2ludCA9IHNlbGVjdGVkSGFuZGxlc1tpXS5jb250cm9sUG9pbnRzW2pdO1xyXG4gICAgICAgICAgICBjb250cm9sUG9pbnQudXBkYXRlKGNvbnRyb2xQb2ludFVwZGF0ZSk7XHJcbiAgICAgICAgICAgIGxldCBsYXllcjogTGF5ZXIgPSBzZWxlY3RlZEhhbmRsZXNbaV0ubGF5ZXJzW2pdO1xyXG4gICAgICAgICAgICBsYXllci5uZWVkc1RvQmVSZW5kZXJlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgU3ByaXRlc2hlZXQubmVlZHNUb0JlUmVuZGVyZWQgPSB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMYXllcnNDb250cm9sUGFuZWwoKSB7XHJcbiAgICBsYXllcnNDb250cm9sUGFuZWwuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICBsZXQgY3JlYXRlTGluZURpdjogSFRNTERpdkVsZW1lbnQgPSBjcmVhdGVDb250cm9sUGFuZWxCdXR0b24oY3JlYXRlTGluZVBhdGgpO1xyXG4gICAgbGV0IGNyZWF0ZUxpbmVCdXR0b246IEhUTUxJbnB1dEVsZW1lbnQgPSBjcmVhdGVMaW5lRGl2LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPWltYWdlXVwiKTtcclxuICAgIGNyZWF0ZUxpbmVCdXR0b24ub25jbGljayA9IGNyZWF0ZUxpbmVMYXllcjtcclxuICAgIGxheWVyc0NvbnRyb2xQYW5lbC5hcHBlbmRDaGlsZChjcmVhdGVMaW5lRGl2KTtcclxuXHJcbiAgICBsZXQgY3JlYXRlRmlsbERpdjogSFRNTERpdkVsZW1lbnQgPSBjcmVhdGVDb250cm9sUGFuZWxCdXR0b24oY3JlYXRlRmlsbFBhdGgpO1xyXG4gICAgbGV0IGNyZWF0ZUZpbGxCdXR0b246IEhUTUxJbnB1dEVsZW1lbnQgPSBjcmVhdGVGaWxsRGl2LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPWltYWdlXVwiKTtcclxuICAgIGNyZWF0ZUZpbGxCdXR0b24ub25jbGljayA9IGNyZWF0ZUZpbGxMYXllcjtcclxuICAgIGxheWVyc0NvbnRyb2xQYW5lbC5hcHBlbmRDaGlsZChjcmVhdGVGaWxsRGl2KTtcclxuICAgIFxyXG4gICAgbGV0IGRlbGV0ZURpdjogSFRNTERpdkVsZW1lbnQgPSBjcmVhdGVDb250cm9sUGFuZWxCdXR0b24oZGVsZXRlUGF0aCk7XHJcbiAgICBsZXQgZGVsZXRlQnV0dG9uOiBIVE1MSW5wdXRFbGVtZW50ID0gZGVsZXRlRGl2LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPWltYWdlXVwiKTtcclxuICAgIGRlbGV0ZUJ1dHRvbi5vbmNsaWNrID0gZGVsZXRlU2VsZWN0ZWRMYXllcnM7XHJcbiAgICBsYXllcnNDb250cm9sUGFuZWwuYXBwZW5kQ2hpbGQoZGVsZXRlRGl2KTtcclxuICAgIFxyXG4gICAgbGV0IGR1cGxpY2F0ZURpdjogSFRNTERpdkVsZW1lbnQgPSBjcmVhdGVDb250cm9sUGFuZWxCdXR0b24oZHVwbGljYXRlUGF0aCk7XHJcbiAgICBsZXQgZHVwbGljYXRlQnV0dG9uOiBIVE1MSW5wdXRFbGVtZW50ID0gZHVwbGljYXRlRGl2LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPWltYWdlXVwiKTtcclxuICAgIGR1cGxpY2F0ZUJ1dHRvbi5vbmNsaWNrID0gZHVwbGljYXRlU2VsZWN0ZWRMYXllcnM7XHJcbiAgICBsYXllcnNDb250cm9sUGFuZWwuYXBwZW5kQ2hpbGQoZHVwbGljYXRlRGl2KTtcclxuICAgIFxyXG4gICAgbGV0IG1vdmVVcERpdjogSFRNTERpdkVsZW1lbnQgPSBjcmVhdGVDb250cm9sUGFuZWxCdXR0b24obW92ZVVwUGF0aCk7XHJcbiAgICBsZXQgbW92ZVVwQnV0dG9uOiBIVE1MSW5wdXRFbGVtZW50ID0gbW92ZVVwRGl2LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPWltYWdlXVwiKTtcclxuICAgIG1vdmVVcEJ1dHRvbi5vbmNsaWNrID0gbW92ZVNlbGVjdGVkTGF5ZXJzVXA7XHJcbiAgICBsYXllcnNDb250cm9sUGFuZWwuYXBwZW5kQ2hpbGQobW92ZVVwRGl2KTtcclxuICAgIFxyXG4gICAgbGV0IG1vdmVEb3duRGl2OiBIVE1MRGl2RWxlbWVudCA9IGNyZWF0ZUNvbnRyb2xQYW5lbEJ1dHRvbihtb3ZlRG93blBhdGgpO1xyXG4gICAgbGV0IG1vdmVEb3duQnV0dG9uOiBIVE1MSW5wdXRFbGVtZW50ID0gbW92ZURvd25EaXYucXVlcnlTZWxlY3RvcihcImlucHV0W3R5cGU9aW1hZ2VdXCIpO1xyXG4gICAgbW92ZURvd25CdXR0b24ub25jbGljayA9IG1vdmVTZWxlY3RlZExheWVyc0Rvd247XHJcbiAgICBsYXllcnNDb250cm9sUGFuZWwuYXBwZW5kQ2hpbGQobW92ZURvd25EaXYpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMaW5lTGF5ZXIoKSB7XHJcbiAgICBpZiAobGF5ZXJzLmxlbmd0aCA+IDk5KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgbGF5ZXJzLnB1c2goZ2V0RGVmYXVsdExpbmVMYXllcigpKTtcclxuICAgIHVwZGF0ZUxheWVyc0Rpc3BsYXkoKTtcclxuICAgIG9uTGF5ZXJTZWxlY3Rpb25DaGFuZ2VkKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUZpbGxMYXllcigpIHtcclxuICAgIGlmIChsYXllcnMubGVuZ3RoID4gOTkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsYXllcnMucHVzaChnZXREZWZhdWx0RmlsbExheWVyKCkpO1xyXG4gICAgdXBkYXRlTGF5ZXJzRGlzcGxheSgpO1xyXG4gICAgb25MYXllclNlbGVjdGlvbkNoYW5nZWQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdExpbmVMYXllcigpIHtcclxuICAgIHJldHVybiBuZXcgTGluZUxheWVyKFxyXG4gICAgICAgIFwiTGluZVwiLFxyXG4gICAgICAgIHRydWUsXHJcbiAgICAgICAgdHJ1ZSxcclxuICAgICAgICBkZWZhdWx0U2l6ZVJhdGlvLFxyXG4gICAgICAgIGRlZmF1bHRUaGlja25lc3NSYXRpbyxcclxuICAgICAgICBkZWZhdWx0TGluZVdpZHRoUmF0aW8sXHJcbiAgICAgICAgZGVmYXVsdEJldmVsU2l6ZVJhdGlvLFxyXG4gICAgICAgIGRlZmF1bHRPZmZzZXRSYXRpbyxcclxuICAgICAgICBiZWF0RnJhY3Rpb25Db2xvcnNbY3VycmVudEJlYXRGcmFjdGlvbkluZGV4XSxcclxuICAgICAgICBkZWZhdWx0TGluZUxpZ2h0bmVzc1JhdGlvLFxyXG4gICAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGVmYXVsdEZpbGxMYXllcigpIHtcclxuICAgIHJldHVybiBuZXcgRmlsbExheWVyKFxyXG4gICAgICAgIFwiRmlsbFwiLFxyXG4gICAgICAgIHRydWUsXHJcbiAgICAgICAgdHJ1ZSxcclxuICAgICAgICBkZWZhdWx0U2l6ZVJhdGlvLFxyXG4gICAgICAgIGRlZmF1bHRUaGlja25lc3NSYXRpbyxcclxuICAgICAgICBkZWZhdWx0QmV2ZWxTaXplUmF0aW8sXHJcbiAgICAgICAgZGVmYXVsdE9mZnNldFJhdGlvLFxyXG4gICAgICAgIGJlYXRGcmFjdGlvbkNvbG9yc1tjdXJyZW50QmVhdEZyYWN0aW9uSW5kZXhdLFxyXG4gICAgICAgIGRlZmF1bHRGaWxsTGlnaHRuZXNzUmF0aW8sXHJcbiAgICApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVTZWxlY3RlZExheWVycygpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxheWVyc1tpXS5pc1NlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIGxheWVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIGktLTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB1cGRhdGVMYXllcnNEaXNwbGF5KCk7XHJcbiAgICBvbkxheWVyU2VsZWN0aW9uQ2hhbmdlZCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkdXBsaWNhdGVTZWxlY3RlZExheWVycygpIHtcclxuICAgIGlmIChsYXllcnMubGVuZ3RoID4gOTkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgaW5pdGlhbE51bUxheWVyczogbnVtYmVyID0gbGF5ZXJzLmxlbmd0aDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5pdGlhbE51bUxheWVyczsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxheWVyc1tpXS5pc1NlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIGxheWVycy5wdXNoKGNsb25lTGF5ZXIobGF5ZXJzW2ldKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdXBkYXRlTGF5ZXJzRGlzcGxheSgpO1xyXG4gICAgb25MYXllclNlbGVjdGlvbkNoYW5nZWQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xvbmVMYXllcihsYXllcjogTGF5ZXIpOiBMYXllciB7XHJcbiAgICBsZXQgbGF5ZXJDb3B5OiBMYXllcjtcclxuICAgIGlmIChsYXllci50eXBlID09PSBMYXllclR5cGUuRklMTCkge1xyXG4gICAgICAgIGxldCBmaWxsTGF5ZXI6IEZpbGxMYXllciA9IDxGaWxsTGF5ZXI+IGxheWVyO1xyXG4gICAgICAgIGxheWVyQ29weSA9IG5ldyBGaWxsTGF5ZXIoXHJcbiAgICAgICAgICAgIGZpbGxMYXllci5uYW1lICsgXCIgQ29weVwiLFxyXG4gICAgICAgICAgICBmaWxsTGF5ZXIuaXNWaXNpYmxlLFxyXG4gICAgICAgICAgICBmaWxsTGF5ZXIuaXNTZWxlY3RlZCxcclxuICAgICAgICAgICAgZmlsbExheWVyLnNpemVSYXRpbyxcclxuICAgICAgICAgICAgZmlsbExheWVyLnRoaWNrbmVzc1JhdGlvLFxyXG4gICAgICAgICAgICBmaWxsTGF5ZXIuYmV2ZWxTaXplUmF0aW8sXHJcbiAgICAgICAgICAgIGZpbGxMYXllci5vZmZzZXRSYXRpbyxcclxuICAgICAgICAgICAgZmlsbExheWVyLmJhc2VDb2xvcixcclxuICAgICAgICAgICAgZmlsbExheWVyLmxpZ2h0bmVzc1JhdGlvLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllckNvcHkuY29udHJvbFBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY3A6IENvbnRyb2xQb2ludCA9IGxheWVyQ29weS5jb250cm9sUG9pbnRzW2ldO1xyXG4gICAgICAgICAgICBjcC5iZXZlbDEgPSBmaWxsTGF5ZXIuY29udHJvbFBvaW50c1tpXS5iZXZlbDE7XHJcbiAgICAgICAgICAgIGNwLmNlbnRlciA9IGZpbGxMYXllci5jb250cm9sUG9pbnRzW2ldLmNlbnRlcjtcclxuICAgICAgICAgICAgY3AuYmV2ZWwyID0gZmlsbExheWVyLmNvbnRyb2xQb2ludHNbaV0uYmV2ZWwyO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZihsYXllci50eXBlID09PSBMYXllclR5cGUuTElORSkge1xyXG4gICAgICAgIGxldCBsaW5lTGF5ZXI6IExpbmVMYXllciA9IDxMaW5lTGF5ZXI+IGxheWVyO1xyXG4gICAgICAgIGxheWVyQ29weSA9IG5ldyBMaW5lTGF5ZXIoXHJcbiAgICAgICAgICAgIGxpbmVMYXllci5uYW1lICsgXCIgQ29weVwiLFxyXG4gICAgICAgICAgICBsaW5lTGF5ZXIuaXNWaXNpYmxlLFxyXG4gICAgICAgICAgICBsaW5lTGF5ZXIuaXNTZWxlY3RlZCxcclxuICAgICAgICAgICAgbGluZUxheWVyLnNpemVSYXRpbyxcclxuICAgICAgICAgICAgbGluZUxheWVyLnRoaWNrbmVzc1JhdGlvLFxyXG4gICAgICAgICAgICBsaW5lTGF5ZXIubGluZVdpZHRoUmF0aW8sXHJcbiAgICAgICAgICAgIGxpbmVMYXllci5iZXZlbFNpemVSYXRpbyxcclxuICAgICAgICAgICAgbGluZUxheWVyLm9mZnNldFJhdGlvLFxyXG4gICAgICAgICAgICBsaW5lTGF5ZXIuYmFzZUNvbG9yLFxyXG4gICAgICAgICAgICBsaW5lTGF5ZXIubGlnaHRuZXNzUmF0aW8sXHJcbiAgICAgICAgKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVyQ29weS5jb250cm9sUG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjcDogQ29udHJvbFBvaW50ID0gbGF5ZXJDb3B5LmNvbnRyb2xQb2ludHNbaV07XHJcbiAgICAgICAgICAgIGNwLmJldmVsMSA9IGxpbmVMYXllci5jb250cm9sUG9pbnRzW2ldLmJldmVsMTtcclxuICAgICAgICAgICAgY3AuY2VudGVyID0gbGluZUxheWVyLmNvbnRyb2xQb2ludHNbaV0uY2VudGVyO1xyXG4gICAgICAgICAgICBjcC5iZXZlbDIgPSBsaW5lTGF5ZXIuY29udHJvbFBvaW50c1tpXS5iZXZlbDI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGxheWVyQ29weTtcclxufVxyXG5cclxuZnVuY3Rpb24gbW92ZVNlbGVjdGVkTGF5ZXJzVXAoKSB7XHJcbiAgICBmb3IgKGxldCBpID0gbGF5ZXJzLmxlbmd0aCAtIDI7IGkgPj0gMCA7IGktLSkge1xyXG4gICAgICAgIGlmIChsYXllcnNbaV0uaXNTZWxlY3RlZCAmJiAhbGF5ZXJzW2krMV0uaXNTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICBsZXQgdGVtcDogTGF5ZXIgPSBsYXllcnNbaSsxXTtcclxuICAgICAgICAgICAgbGF5ZXJzW2krMV0gPSBsYXllcnNbaV07XHJcbiAgICAgICAgICAgIGxheWVyc1tpXSA9IHRlbXA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdXBkYXRlTGF5ZXJzRGlzcGxheSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtb3ZlU2VsZWN0ZWRMYXllcnNEb3duKCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBsYXllcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAobGF5ZXJzW2ldLmlzU2VsZWN0ZWQgJiYgIWxheWVyc1tpLTFdLmlzU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgbGV0IHRlbXA6IExheWVyID0gbGF5ZXJzW2ktMV07XHJcbiAgICAgICAgICAgIGxheWVyc1tpLTFdID0gbGF5ZXJzW2ldO1xyXG4gICAgICAgICAgICBsYXllcnNbaV0gPSB0ZW1wO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHVwZGF0ZUxheWVyc0Rpc3BsYXkoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTGF5ZXJzRGlzcGxheSgpIHtcclxuICAgIGxheWVyc0Rpc3BsYXkuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIGZvciAobGV0IGkgPSBsYXllcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICBsZXQgbGF5ZXJEaXYgPSBjcmVhdGVMYXllckRpc3BsYXkobGF5ZXJzW2ldKTtcclxuICAgICAgICBsZXQgc2VsZWN0ZWRDaGVja2JveDogSFRNTElucHV0RWxlbWVudCA9IGxheWVyRGl2LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFt0eXBlPWNoZWNrYm94XVwiKTtcclxuICAgICAgICBzZWxlY3RlZENoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBvbkxheWVyU2VsZWN0aW9uQ2hhbmdlZCk7XHJcbiAgICAgICAgbGF5ZXJzRGlzcGxheS5hcHBlbmRDaGlsZChsYXllckRpdik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uTGF5ZXJTZWxlY3Rpb25DaGFuZ2VkKCkge1xyXG4gICAgdXBkYXRlQ29udHJvbFBvaW50SGFuZGxlcygpO1xyXG4gICAgdXBkYXRlSGVhZGluZ1RleHQoKTtcclxuICAgIHVwZGF0ZU9wdGlvbnNEaXYoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb25Db250cm9sUG9pbnRTZWxlY3Rpb25DaGFuZ2VkKCkge1xyXG4gICAgdXBkYXRlSGVhZGluZ1RleHQoKTtcclxuICAgIHVwZGF0ZU9wdGlvbnNEaXYoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlQ29udHJvbFBvaW50SGFuZGxlcygpIHtcclxuICAgIGNvbnRyb2xQb2ludEhhbmRsZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGxheWVyOiBMYXllciA9IGxheWVyc1tpXTtcclxuICAgICAgICBpZiAoIWxheWVyLmlzU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGF5ZXIuY29udHJvbFBvaW50cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBsZXQgY29udHJvbFBvaW50OiBDb250cm9sUG9pbnQgPSBsYXllci5jb250cm9sUG9pbnRzW2pdO1xyXG4gICAgICAgICAgICBsZXQgZm91bmRIYW5kbGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBjb250cm9sUG9pbnRIYW5kbGVzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGFuZGxlOiBDb250cm9sUG9pbnRIYW5kbGUgPSBjb250cm9sUG9pbnRIYW5kbGVzW2tdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGhhbmRsZS54ID09PSBjb250cm9sUG9pbnQuaGFuZGxlLnggJiYgaGFuZGxlLnkgPT09IGNvbnRyb2xQb2ludC5oYW5kbGUueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZS5sYXllcnMucHVzaChsYXllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlLmNvbnRyb2xQb2ludHMucHVzaChjb250cm9sUG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kSGFuZGxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWZvdW5kSGFuZGxlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udHJvbFBvaW50SGFuZGxlOiBDb250cm9sUG9pbnRIYW5kbGUgPSBuZXcgQ29udHJvbFBvaW50SGFuZGxlKFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xQb2ludC5oYW5kbGUueCxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sUG9pbnQuaGFuZGxlLnksXHJcbiAgICAgICAgICAgICAgICAgICAgW2xheWVyXSxcclxuICAgICAgICAgICAgICAgICAgICBbY29udHJvbFBvaW50XSxcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sUG9pbnRIYW5kbGVzLnB1c2goY29udHJvbFBvaW50SGFuZGxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlQ2xpY2soZTogTW91c2VFdmVudCkge1xyXG4gICAgbGV0IGNsaWNrZWRIYW5kbGU6IENvbnRyb2xQb2ludEhhbmRsZSA9IHVuZGVmaW5lZDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udHJvbFBvaW50SGFuZGxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBoYW5kbGU6IENvbnRyb2xQb2ludEhhbmRsZSA9IGNvbnRyb2xQb2ludEhhbmRsZXNbaV07XHJcbiAgICAgICAgaWYgKGRpc3RhbmNlKGUuY2xpZW50WCwgZS5jbGllbnRZLCBoYW5kbGUueCwgaGFuZGxlLnkpIDwgSEFORExFX1JBRElVUykge1xyXG4gICAgICAgICAgICBjbGlja2VkSGFuZGxlID0gaGFuZGxlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoY2xpY2tlZEhhbmRsZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY2xpY2tlZEhhbmRsZS5pc1NlbGVjdGVkID0gIWNsaWNrZWRIYW5kbGUuaXNTZWxlY3RlZDtcclxuICAgICAgICBvbkNvbnRyb2xQb2ludFNlbGVjdGlvbkNoYW5nZWQoKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U2VsZWN0ZWRIYW5kbGVzKCkge1xyXG4gICAgbGV0IHNlbGVjdGVkSGFuZGxlczogQ29udHJvbFBvaW50SGFuZGxlW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udHJvbFBvaW50SGFuZGxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChjb250cm9sUG9pbnRIYW5kbGVzW2ldLmlzU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRIYW5kbGVzLnB1c2goY29udHJvbFBvaW50SGFuZGxlc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNlbGVjdGVkSGFuZGxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUmVjZXB0b3JVSSgpIHtcclxuICAgIHNpZGViYXJEaXYuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICBiYXNlQ29sb3JEaXZDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgYmFzZUNvbG9yRGl2Q29udGFpbmVyLmlkID0gXCJiYXNlQ29sb3JEaXZDb250YWluZXJcIjtcclxuICAgIHNpZGViYXJEaXYuYXBwZW5kQ2hpbGQoYmFzZUNvbG9yRGl2Q29udGFpbmVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlSW1wb3J0RXhwb3J0VUkoKSB7XHJcbiAgICBzaWRlYmFyRGl2LmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gICAgb3B0aW9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBvcHRpb25zRGl2LmlkID0gXCJvcHRpb25zRGl2XCI7XHJcbiAgICBzaWRlYmFyRGl2LmFwcGVuZENoaWxkKG9wdGlvbnNEaXYpO1xyXG5cclxuICAgIGxldCB6b29tU2xpZGVyRGl2OiBIVE1MRGl2RWxlbWVudCA9IGNyZWF0ZUxhYmVsZWRSYW5nZVdpdGhvdXRXYXJuaW5nKFxyXG4gICAgICAgIFwiem9vbVNsaWRlclwiLFxyXG4gICAgICAgIFwiWm9vbVwiLFxyXG4gICAgICAgIDAuMSxcclxuICAgICAgICAxLjQsXHJcbiAgICAgICAgMC4wMDEsXHJcbiAgICAgICAgU3ByaXRlc2hlZXQuem9vbVJhdGlvLFxyXG4gICAgKTtcclxuICAgIGxldCB6b29tU2xpZGVyOiBIVE1MSW5wdXRFbGVtZW50ID0gem9vbVNsaWRlckRpdi5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbdHlwZT1yYW5nZV1cIik7XHJcbiAgICB6b29tU2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XHJcbiAgICAgICAgU3ByaXRlc2hlZXQuem9vbVJhdGlvID0gem9vbVNsaWRlci52YWx1ZUFzTnVtYmVyO1xyXG4gICAgfSk7XHJcbiAgICBvcHRpb25zRGl2LmFwcGVuZENoaWxkKHpvb21TbGlkZXJEaXYpO1xyXG5cclxuICAgIGxldCBzY3JvbGxYU2xpZGVyRGl2OiBIVE1MRGl2RWxlbWVudCA9IGNyZWF0ZUxhYmVsZWRSYW5nZVdpdGhvdXRXYXJuaW5nKFxyXG4gICAgICAgIFwic2Nyb2xsWFNsaWRlclwiLFxyXG4gICAgICAgIFwiU2Nyb2xsIFhcIixcclxuICAgICAgICAwLFxyXG4gICAgICAgIFNwcml0ZXNoZWV0LmJlYXRGcmFjdGlvbkNvbG9ycy5sZW5ndGggLSAxLFxyXG4gICAgICAgIDAuMDAxLFxyXG4gICAgICAgIFNwcml0ZXNoZWV0LnNjcm9sbFhSYXRpbyxcclxuICAgICk7XHJcbiAgICBsZXQgc2Nyb2xsWFNsaWRlcjogSFRNTElucHV0RWxlbWVudCA9IHNjcm9sbFhTbGlkZXJEaXYucXVlcnlTZWxlY3RvcihcImlucHV0W3R5cGU9cmFuZ2VdXCIpO1xyXG4gICAgc2Nyb2xsWFNsaWRlci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgIFNwcml0ZXNoZWV0LnNjcm9sbFhSYXRpbyA9IHNjcm9sbFhTbGlkZXIudmFsdWVBc051bWJlcjtcclxuICAgIH0pO1xyXG4gICAgb3B0aW9uc0Rpdi5hcHBlbmRDaGlsZChzY3JvbGxYU2xpZGVyRGl2KTtcclxuXHJcbiAgICBsZXQgcm90YXRpb25TbGlkZXJEaXY6IEhUTUxEaXZFbGVtZW50ID0gY3JlYXRlTGFiZWxlZFJhbmdlV2l0aG91dFdhcm5pbmcoXHJcbiAgICAgICAgXCJyb3RhdGlvblNsaWRlclwiLFxyXG4gICAgICAgIFwiUm90YXRpb25cIixcclxuICAgICAgICAwLFxyXG4gICAgICAgIDM2MCxcclxuICAgICAgICA1LFxyXG4gICAgICAgIFNwcml0ZXNoZWV0LnJvdGF0aW9uRGVncmVlcyxcclxuICAgICk7XHJcbiAgICBsZXQgcm90YXRpb25TbGlkZXI6IEhUTUxJbnB1dEVsZW1lbnQgPSByb3RhdGlvblNsaWRlckRpdi5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbdHlwZT1yYW5nZV1cIik7XHJcbiAgICByb3RhdGlvblNsaWRlci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgIFNwcml0ZXNoZWV0LnJvdGF0aW9uRGVncmVlcyA9IHJvdGF0aW9uU2xpZGVyLnZhbHVlQXNOdW1iZXI7XHJcbiAgICAgICAgU3ByaXRlc2hlZXQubmVlZHNUb0JlUmVuZGVyZWQgPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICBvcHRpb25zRGl2LmFwcGVuZENoaWxkKHJvdGF0aW9uU2xpZGVyRGl2KTtcclxuXHJcbiAgICBsZXQgcmVzb2x1dGlvblNsaWRlckRpdjogSFRNTERpdkVsZW1lbnQgPSBjcmVhdGVMYWJlbGVkUmFuZ2VXaXRob3V0V2FybmluZyhcclxuICAgICAgICBcInJlc29sdXRpb25TbGlkZXJcIixcclxuICAgICAgICBcIlJlc29sdXRpb25cIixcclxuICAgICAgICAxLFxyXG4gICAgICAgIDUxMixcclxuICAgICAgICAxLFxyXG4gICAgICAgIFNwcml0ZXNoZWV0LmhlaWdodCxcclxuICAgICk7XHJcbiAgICBsZXQgcmVzb2x1dGlvblNsaWRlcjogSFRNTElucHV0RWxlbWVudCA9IHJlc29sdXRpb25TbGlkZXJEaXYucXVlcnlTZWxlY3RvcihcImlucHV0W3R5cGU9cmFuZ2VdXCIpO1xyXG4gICAgcmVzb2x1dGlvblNsaWRlci5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgICAgIFNwcml0ZXNoZWV0LnNldEhlaWdodChyZXNvbHV0aW9uU2xpZGVyLnZhbHVlQXNOdW1iZXIpO1xyXG4gICAgfSk7XHJcbiAgICBvcHRpb25zRGl2LmFwcGVuZENoaWxkKHJlc29sdXRpb25TbGlkZXJEaXYpO1xyXG5cclxuICAgIGxldCBzYXZlQXNTcHJpdGVzaGVldEJ1dHRvbkRpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgc2F2ZUFzU3ByaXRlc2hlZXRCdXR0b25EaXYuY2xhc3NMaXN0LmFkZChcImJ1dHRvbk9uSW1wb3J0RXhwb3J0VUlcIik7XHJcbiAgICBsZXQgc2F2ZUFzU3ByaXRlc2hlZXRCdXR0b246IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHNhdmVBc1Nwcml0ZXNoZWV0QnV0dG9uLmlubmVyVGV4dCA9IFwiU2F2ZSBBcyBTcHJpdGVzaGVldFwiO1xyXG4gICAgc2F2ZUFzU3ByaXRlc2hlZXRCdXR0b24ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICBkb3dubG9hZENhbnZhc0FzUG5nKFNwcml0ZXNoZWV0LmNhbnZhcywgXCJub3Rlc2tpbl9zcHJpdGVzaGVldC5wbmdcIik7XHJcbiAgICB9O1xyXG4gICAgc2F2ZUFzU3ByaXRlc2hlZXRCdXR0b25EaXYuYXBwZW5kQ2hpbGQoc2F2ZUFzU3ByaXRlc2hlZXRCdXR0b24pO1xyXG4gICAgb3B0aW9uc0Rpdi5hcHBlbmRDaGlsZChzYXZlQXNTcHJpdGVzaGVldEJ1dHRvbkRpdik7XHJcblxyXG4gICAgbGV0IHNhdmVBc0luZGl2aWR1YWxGaWxlc0J1dHRvbkRpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgc2F2ZUFzSW5kaXZpZHVhbEZpbGVzQnV0dG9uRGl2LmNsYXNzTGlzdC5hZGQoXCJidXR0b25PbkltcG9ydEV4cG9ydFVJXCIpO1xyXG4gICAgbGV0IHNhdmVBc0luZGl2aWR1YWxGaWxlc0J1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgc2F2ZUFzSW5kaXZpZHVhbEZpbGVzQnV0dG9uLmlubmVyVGV4dCA9IFwiU2F2ZSBBcyBJbmRpdmlkdWFsIEZpbGVzXCI7XHJcbiAgICBzYXZlQXNJbmRpdmlkdWFsRmlsZXNCdXR0b24ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICBsZXQgY2FudmFzZXM6IEhUTUxDYW52YXNFbGVtZW50W10gPSBTcHJpdGVzaGVldC5yZW5kZXJTcHJpdGVzVG9TZXBhcmF0ZUNhbnZhc2VzKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW52YXNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZmlsZW5hbWU6IHN0cmluZyA9IFwibm90ZXNraW5fXCIgKyBiZWF0RnJhY3Rpb25OYW1lc1tpXSArIFwiLnBuZ1wiO1xyXG4gICAgICAgICAgICBkb3dubG9hZENhbnZhc0FzUG5nKGNhbnZhc2VzW2ldLCBmaWxlbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHNhdmVBc0luZGl2aWR1YWxGaWxlc0J1dHRvbkRpdi5hcHBlbmRDaGlsZChzYXZlQXNJbmRpdmlkdWFsRmlsZXNCdXR0b24pO1xyXG4gICAgb3B0aW9uc0Rpdi5hcHBlbmRDaGlsZChzYXZlQXNJbmRpdmlkdWFsRmlsZXNCdXR0b25EaXYpO1xyXG5cclxuICAgIGxldCBjb25maWdBc1RleHREaXY6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbmZpZ0FzVGV4dERpdi5jbGFzc0xpc3QuYWRkKFwidGV4dGFyZWFPbkltcG9ydEV4cG9ydFVJXCIpO1xyXG4gICAgbGV0IGNvbmZpZ0FzVGV4dDogSFRNTFRleHRBcmVhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcclxuICAgIGxldCBzZXJpYWxpemVkQ29uZmlnOiBzdHJpbmcgPSBzZXJpYWxpemVDb25maWcoe2JlYXRGcmFjdGlvbkNvbG9yczogYmVhdEZyYWN0aW9uQ29sb3JzLCBsYXllcnM6IGxheWVyc30pO1xyXG4gICAgY29uZmlnQXNUZXh0LnZhbHVlID0gc2VyaWFsaXplZENvbmZpZztcclxuICAgIGNvbmZpZ0FzVGV4dERpdi5hcHBlbmRDaGlsZChjb25maWdBc1RleHQpO1xyXG4gICAgb3B0aW9uc0Rpdi5hcHBlbmRDaGlsZChjb25maWdBc1RleHREaXYpO1xyXG5cclxuICAgIGxldCBzYXZlQXNKc29uRmlsZUJ1dHRvbkRpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgc2F2ZUFzSnNvbkZpbGVCdXR0b25EaXYuY2xhc3NMaXN0LmFkZChcImJ1dHRvbk9uSW1wb3J0RXhwb3J0VUlcIik7XHJcbiAgICBsZXQgc2F2ZUFzSnNvbkZpbGVCdXR0b246IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHNhdmVBc0pzb25GaWxlQnV0dG9uLmlubmVyVGV4dCA9IFwiU2F2ZSBDb25maWcgVG8gRmlsZVwiO1xyXG4gICAgc2F2ZUFzSnNvbkZpbGVCdXR0b24ub25jbGljayA9ICgpID0+IHtcclxuICAgICAgICBkb3dubG9hZFN0cmluZ0FzSnNvbihzZXJpYWxpemVkQ29uZmlnLCBcIm5vdGVza2luX2NvbmZpZy5qc29uXCIpO1xyXG4gICAgfTtcclxuICAgIHNhdmVBc0pzb25GaWxlQnV0dG9uRGl2LmFwcGVuZENoaWxkKHNhdmVBc0pzb25GaWxlQnV0dG9uKTtcclxuICAgIG9wdGlvbnNEaXYuYXBwZW5kQ2hpbGQoc2F2ZUFzSnNvbkZpbGVCdXR0b25EaXYpO1xyXG5cclxuICAgIGxldCBpbXBvcnRKc29uRmlsZUJ1dHRvbkRpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgaW1wb3J0SnNvbkZpbGVCdXR0b25EaXYuY2xhc3NMaXN0LmFkZChcImJ1dHRvbk9uSW1wb3J0RXhwb3J0VUlcIik7XHJcbiAgICBsZXQgaW1wb3J0SnNvbkZpbGVCdXR0b246IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGltcG9ydEpzb25GaWxlQnV0dG9uLmlubmVyVGV4dCA9IFwiSW1wb3J0IENvbmZpZyBGcm9tIFRleHRcIjtcclxuICAgIGltcG9ydEpzb25GaWxlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHNlcmlhbGl6ZWRDb25maWcgPSA8U2VyaWFsaXplZENvbmZpZz4gSlNPTi5wYXJzZShjb25maWdBc1RleHQudmFsdWUpO1xyXG4gICAgICAgIGxldCBjb25maWc6IENvbmZpZyA9IGRlc2VyaWFsaXplQ29uZmlnKHNlcmlhbGl6ZWRDb25maWcpO1xyXG4gICAgICAgIGJlYXRGcmFjdGlvbkNvbG9ycyA9IGNvbmZpZy5iZWF0RnJhY3Rpb25Db2xvcnM7XHJcbiAgICAgICAgbGF5ZXJzID0gY29uZmlnLmxheWVycztcclxuICAgICAgICBTcHJpdGVzaGVldC5iZWF0RnJhY3Rpb25Db2xvcnMgPSBiZWF0RnJhY3Rpb25Db2xvcnM7XHJcbiAgICAgICAgU3ByaXRlc2hlZXQubGF5ZXJzID0gbGF5ZXJzO1xyXG4gICAgICAgIFNwcml0ZXNoZWV0Lm5lZWRzVG9CZVJlbmRlcmVkID0gdHJ1ZTtcclxuICAgICAgICB1cGRhdGVDb250cm9sUG9pbnRIYW5kbGVzKCk7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0SnNvbkZpbGVCdXR0b25EaXYuYXBwZW5kQ2hpbGQoaW1wb3J0SnNvbkZpbGVCdXR0b24pO1xyXG4gICAgb3B0aW9uc0Rpdi5hcHBlbmRDaGlsZChpbXBvcnRKc29uRmlsZUJ1dHRvbkRpdik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXcoY3VycmVudFRpbWVNaWxsaXM6IERPTUhpZ2hSZXNUaW1lU3RhbXApIHtcclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICBpZiAoY3VycmVudFBhZ2UgPT09IFBhZ2UuQkVBVF9GUkFDVElPTikge1xyXG4gICAgICAgIGxldCB0b3BMZWZ0WCA9IEFSUk9XX0NBTlZBU19DRU5URVIueCAtIFNJWkUgLyAyO1xyXG4gICAgICAgIGxldCB0b3BMZWZ0WSA9IEFSUk9XX0NBTlZBU19DRU5URVIueSAtIFNJWkUgLyAyO1xyXG4gICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgZmlsbFdpdGhUcmFuc3BhcmVuY3lDaGVja2VyYm9hcmQoY3R4LCB0b3BMZWZ0WCwgdG9wTGVmdFksIFNJWkUsIFNJWkUsIENIRUNLRVJCT0FSRF9TSVpFKTtcclxuICAgICAgICBmaWxsQXJvdW5kUmVjdGFuZ2xlKFxyXG4gICAgICAgICAgICBjdHgsXHJcbiAgICAgICAgICAgIHRvcExlZnRYLCB0b3BMZWZ0WSwgU0laRSwgU0laRSxcclxuICAgICAgICAgICAgV0lEVEgsIEhFSUdIVCxcclxuICAgICAgICAgICAgY2FudmFzQmFja2dyb3VuZENvbG9yLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsYXllcnNbaV0uZHJhdyhjdHgsIHRvcExlZnRYLCB0b3BMZWZ0WSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udHJvbFBvaW50SGFuZGxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb250cm9sUG9pbnRIYW5kbGVzW2ldLnVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRyb2xQb2ludEhhbmRsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29udHJvbFBvaW50SGFuZGxlc1tpXS5kcmF3KGN0eCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChjdXJyZW50UGFnZSA9PT0gUGFnZS5SRUNFUFRPUikge1xyXG4gICAgICAgIGxldCB0b3BMZWZ0WCA9IEFSUk9XX0NBTlZBU19DRU5URVIueCAtIFNJWkUgLyAyO1xyXG4gICAgICAgIGxldCB0b3BMZWZ0WSA9IEFSUk9XX0NBTlZBU19DRU5URVIueSAtIFNJWkUgLyAyO1xyXG4gICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgZmlsbFdpdGhUcmFuc3BhcmVuY3lDaGVja2VyYm9hcmQoY3R4LCB0b3BMZWZ0WCwgdG9wTGVmdFksIFNJWkUsIFNJWkUsIENIRUNLRVJCT0FSRF9TSVpFKTtcclxuICAgICAgICBmaWxsQXJvdW5kUmVjdGFuZ2xlKFxyXG4gICAgICAgICAgICBjdHgsXHJcbiAgICAgICAgICAgIHRvcExlZnRYLCB0b3BMZWZ0WSwgU0laRSwgU0laRSxcclxuICAgICAgICAgICAgV0lEVEgsIEhFSUdIVCxcclxuICAgICAgICAgICAgY2FudmFzQmFja2dyb3VuZENvbG9yLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobGF5ZXJzW2ldLnR5cGUgPT09IExheWVyVHlwZS5MSU5FKSB7XHJcbiAgICAgICAgICAgICAgICBsYXllcnNbaV0uZHJhdyhjdHgsIHRvcExlZnRYLCB0b3BMZWZ0WSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRQYWdlID09PSBQYWdlLklNUE9SVF9FWFBPUlQpIHtcclxuICAgICAgICBsZXQgc2l6ZTogbnVtYmVyID0gU0laRSAqIFNwcml0ZXNoZWV0Lnpvb21SYXRpbztcclxuICAgICAgICBsZXQgdG9wTGVmdFk6IG51bWJlciA9IEFSUk9XX0NBTlZBU19DRU5URVIueSAtIHNpemUgLyAyO1xyXG4gICAgICAgIGxldCBvZmZzZXRYOiBudW1iZXIgPSBTcHJpdGVzaGVldC5zY3JvbGxYUmF0aW8gKiBzaXplO1xyXG4gICAgICAgIGxldCB0b3BMZWZ0WDogbnVtYmVyID0gQVJST1dfQ0FOVkFTX0NFTlRFUi54IC0gc2l6ZSAvIDIgLSBvZmZzZXRYO1xyXG4gICAgICAgIGxldCB3aWR0aDogbnVtYmVyID0gc2l6ZSAqIFNwcml0ZXNoZWV0LmJlYXRGcmFjdGlvbkNvbG9ycy5sZW5ndGg7XHJcbiAgICAgICAgY3R4LnNhdmUoKTtcclxuICAgICAgICBmaWxsV2l0aFRyYW5zcGFyZW5jeUNoZWNrZXJib2FyZChjdHgsIHRvcExlZnRYLCB0b3BMZWZ0WSwgd2lkdGgsIHNpemUsIENIRUNLRVJCT0FSRF9TSVpFKTtcclxuICAgICAgICBmaWxsQXJvdW5kUmVjdGFuZ2xlKFxyXG4gICAgICAgICAgICBjdHgsXHJcbiAgICAgICAgICAgIHRvcExlZnRYLCB0b3BMZWZ0WSwgd2lkdGgsIHNpemUsXHJcbiAgICAgICAgICAgIFdJRFRILCBIRUlHSFQsXHJcbiAgICAgICAgICAgIGNhbnZhc0JhY2tncm91bmRDb2xvcixcclxuICAgICAgICApO1xyXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7IFxyXG4gICAgICAgIFNwcml0ZXNoZWV0LmRyYXcoY3R4LCB0b3BMZWZ0WCwgdG9wTGVmdFksIHdpZHRoLCBzaXplKTtcclxuICAgIH0gXHJcbiAgICBcclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdylcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=