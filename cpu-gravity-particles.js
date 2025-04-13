(() => {
  // src/index.ts
  var startTimeMillis;
  var startButton = document.getElementById("startButton");
  startButton.onclick = () => {
    startTimeMillis = previousTimeMillis;
  };
  var fpsCounter = document.getElementById("fpsCounter");
  var previousTimeMillis;
  var width = 1e3;
  var height = 600;
  var canvas = document.getElementById("mainCanvas");
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");
  var imageData = ctx.createImageData(width, height);
  var yOne = height / width;
  var originalX1 = [0, yOne, 0];
  var originalX2 = [1, yOne, 0];
  var originalX3 = [0, 0, 0];
  var originalX4 = [1, 0, 0];
  var originalCamera = [0.5, yOne / 2, -1];
  var angleDown = 0.7;
  var angleDownMatrix = computeRotationMatrix([1, 0, 0], angleDown);
  var yCenterOfRotation = 0.15;
  var centerOfRotation = [0.5, yCenterOfRotation, 1.5];
  var rotateTemp1 = [0, 0, 0];
  var rotateTemp2 = [0, 0, 0];
  rotateAboutPoint(originalCamera, originalCamera, angleDownMatrix, centerOfRotation);
  rotateAboutPoint(originalX1, originalX1, angleDownMatrix, centerOfRotation);
  rotateAboutPoint(originalX2, originalX2, angleDownMatrix, centerOfRotation);
  rotateAboutPoint(originalX3, originalX3, angleDownMatrix, centerOfRotation);
  rotateAboutPoint(originalX4, originalX4, angleDownMatrix, centerOfRotation);
  var x1 = [0, yOne, 0];
  var x2 = [1, yOne, 0];
  var x3 = [0, 0, 0];
  var x4 = [1, 0, 0];
  var camera = [0.5, yOne / 2, -1];
  var yCenterOffset = 0.4;
  var centerOfAttraction = [0.5, yCenterOfRotation + yCenterOffset, 1.5];
  function computeRotationMatrix(axis, rotationAmount) {
    return [
      [
        Math.cos(rotationAmount) + axis[0] * axis[0] * (1 - Math.cos(rotationAmount)),
        axis[0] * axis[1] * (1 - Math.cos(rotationAmount)) - axis[2] * Math.sin(rotationAmount),
        axis[1] * Math.sin(rotationAmount) + axis[0] * axis[2] * (1 - Math.cos(rotationAmount))
      ],
      [
        axis[2] * Math.sin(rotationAmount) + axis[0] * axis[1] * (1 - Math.cos(rotationAmount)),
        Math.cos(rotationAmount) + axis[1] * axis[1] * (1 - Math.cos(rotationAmount)),
        -axis[0] * Math.sin(rotationAmount) + axis[1] * axis[2] * (1 - Math.cos(rotationAmount))
      ],
      [
        -axis[1] * Math.sin(rotationAmount) + axis[0] * axis[2] * (1 - Math.cos(rotationAmount)),
        axis[0] * Math.sin(rotationAmount) + axis[1] * axis[2] * (1 - Math.cos(rotationAmount)),
        Math.cos(rotationAmount) + axis[2] * axis[2] * (1 - Math.cos(rotationAmount))
      ]
    ];
  }
  function scaleInPlace(dest, vector, scalar) {
    dest[0] = scalar * vector[0];
    dest[1] = scalar * vector[1];
    dest[2] = scalar * vector[2];
  }
  function addInPlace(dest, v1, v2) {
    dest[0] = v1[0] + v2[0];
    dest[1] = v1[1] + v2[1];
    dest[2] = v1[2] + v2[2];
  }
  function subtractInPlace(dest, v1, v2) {
    dest[0] = v1[0] - v2[0];
    dest[1] = v1[1] - v2[1];
    dest[2] = v1[2] - v2[2];
  }
  function dot(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
  }
  function crossProductInPlace(dest, v1, v2) {
    dest[0] = v1[1] * v2[2] - v1[2] * v2[1];
    dest[1] = v1[2] * v2[0] - v1[0] * v2[2];
    dest[2] = v1[0] * v2[1] - v1[1] * v2[0];
  }
  function normalizeInPlace(v) {
    let scalar = 1 / Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    v[0] *= scalar;
    v[1] *= scalar;
    v[2] *= scalar;
  }
  function vectorLength(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  }
  function matrixMultiplyInPlace(dest, m, v) {
    dest[0] = m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2];
    dest[1] = m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2];
    dest[2] = m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2];
  }
  function rotateAboutPoint(dest, v, rotationMatrix, centerOfRotation2) {
    subtractInPlace(rotateTemp1, v, centerOfRotation2);
    matrixMultiplyInPlace(rotateTemp2, rotationMatrix, rotateTemp1);
    addInPlace(dest, rotateTemp2, centerOfRotation2);
  }
  var intersectTemp = [0, 0, 0];
  function rayViewportIntersect(point, direction, n) {
    subtractInPlace(intersectTemp, point, x3);
    let divisor = dot(n, direction);
    if (divisor === 0) {
      return 0;
    } else {
      return -dot(n, intersectTemp) / dot(n, direction);
    }
  }
  function roundToNPlaces(x, numPlaces) {
    let scale = Math.pow(10, numPlaces);
    return Math.round(x * scale) / scale;
  }
  var pointPositions = [];
  var pointColors = [];
  var pointPerDim = 200;
  var multiplier = 1 / (pointPerDim - 1);
  for (let i = 0; i < pointPerDim; i++) {
    for (let j = 0; j < pointPerDim; j++) {
      pointPositions.push([
        multiplier * i,
        yCenterOfRotation,
        1 + multiplier * j
      ]);
      pointColors.push([
        255 * multiplier * i,
        255 * multiplier * j,
        255 * multiplier * (pointPerDim - i - 1)
      ]);
    }
  }
  var pointDirections = [];
  for (let i = 0; i < pointPositions.length; i++) {
    pointDirections.push([0, 0, 0]);
  }
  var pointIntersectionsT = [];
  for (let i = 0; i < pointPositions.length; i++) {
    pointIntersectionsT.push(0);
  }
  var pointIntersections = [];
  for (let i = 0; i < pointPositions.length; i++) {
    pointIntersections.push([0, 0, 0]);
  }
  var pointUVSubTemp = [];
  for (let i = 0; i < pointPositions.length; i++) {
    pointUVSubTemp.push([0, 0, 0]);
  }
  var pixelClosestParticle = [];
  for (let i = 0; i < width; i++) {
    let row = [];
    for (let j = 0; j < height; j++) {
      row.push(0);
    }
    pixelClosestParticle.push(row);
  }
  var pAttractionDirection = [];
  for (let i = 0; i < pointPositions.length; i++) {
    pAttractionDirection.push([0, 0, 0]);
  }
  var pAcceleration = [];
  for (let i = 0; i < pointPositions.length; i++) {
    pAcceleration.push([0, 0, 0]);
  }
  var pVelocity = [];
  for (let i = 0; i < pointPositions.length; i++) {
    pVelocity.push([0, 0, 0]);
  }
  var physicsTemp = [0, 0, 0];
  window.requestAnimationFrame(draw);
  function draw(currentTimeMillis) {
    let fps = 1e3 / (currentTimeMillis - previousTimeMillis);
    if (!isNaN(fps)) {
      fpsCounter.innerText = "FPS: " + roundToNPlaces(fps, 2);
    }
    let axis = [0, 1, 0];
    let rotationMatrix = computeRotationMatrix(axis, currentTimeMillis / 2e3);
    rotateAboutPoint(camera, originalCamera, rotationMatrix, centerOfRotation);
    rotateAboutPoint(x1, originalX1, rotationMatrix, centerOfRotation);
    rotateAboutPoint(x2, originalX2, rotationMatrix, centerOfRotation);
    rotateAboutPoint(x3, originalX3, rotationMatrix, centerOfRotation);
    rotateAboutPoint(x4, originalX4, rotationMatrix, centerOfRotation);
    let u = [0, 0, 0];
    subtractInPlace(u, x4, x3);
    let uLength = vectorLength(u);
    normalizeInPlace(u);
    let v = [0, 0, 0];
    subtractInPlace(v, x1, x3);
    let vLength = vectorLength(v);
    normalizeInPlace(v);
    let n = [0, 0, 1];
    crossProductInPlace(n, u, v);
    normalizeInPlace(n);
    for (let i = 0; i < width * height; i++) {
      imageData.data[4 * i] = 0;
      imageData.data[4 * i + 1] = 0;
      imageData.data[4 * i + 2] = 0;
      imageData.data[4 * i + 3] = 255;
    }
    if (startTimeMillis !== void 0) {
      let deltaTimeSeconds = (currentTimeMillis - startTimeMillis) / 1e3;
      for (let i = 0; i < pointPositions.length; i++) {
        subtractInPlace(pAttractionDirection[i], centerOfAttraction, pointPositions[i]);
      }
      for (let i = 0; i < pointPositions.length; i++) {
        let r = vectorLength(pAttractionDirection[i]);
        if (r < 0.05) {
          r = 0.05;
        }
        scaleInPlace(pAcceleration[i], pAttractionDirection[i], 1e-3 / (r * r * r));
      }
      for (let i = 0; i < pointPositions.length; i++) {
        scaleInPlace(physicsTemp, pAcceleration[i], deltaTimeSeconds);
        addInPlace(pVelocity[i], pVelocity[i], physicsTemp);
      }
      for (let i = 0; i < pointPositions.length; i++) {
        scaleInPlace(physicsTemp, pAcceleration[i], deltaTimeSeconds);
        addInPlace(pVelocity[i], pVelocity[i], physicsTemp);
      }
      for (let i = 0; i < pointPositions.length; i++) {
        scaleInPlace(physicsTemp, pVelocity[i], deltaTimeSeconds);
        addInPlace(pointPositions[i], pointPositions[i], physicsTemp);
      }
      startTimeMillis = currentTimeMillis;
    }
    let prevTime = performance.now();
    let tempTime = 0;
    for (let i = 0; i < pointPositions.length; i++) {
      subtractInPlace(pointDirections[i], camera, pointPositions[i]);
      normalizeInPlace(pointDirections[i]);
    }
    for (let i = 0; i < pointPositions.length; i++) {
      pointIntersectionsT[i] = rayViewportIntersect(pointPositions[i], pointDirections[i], n);
    }
    for (let i = 0; i < pointPositions.length; i++) {
      scaleInPlace(pointIntersections[i], pointDirections[i], pointIntersectionsT[i]);
      addInPlace(pointIntersections[i], pointIntersections[i], pointPositions[i]);
    }
    for (let i = 0; i < pointPositions.length; i++) {
      subtractInPlace(pointUVSubTemp[i], pointIntersections[i], x3);
    }
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        pixelClosestParticle[x][y] = 1e9;
      }
    }
    for (let i = 0; i < pointPositions.length; i++) {
      let du = dot(pointUVSubTemp[i], u);
      let dv = dot(pointUVSubTemp[i], v);
      if (!(0 <= du && du <= uLength && (0 <= dv && dv <= vLength))) {
        continue;
      }
      let x = Math.floor(mapLinear(0, du, uLength, 0, width));
      let y = Math.floor(mapLinear(0, dv, vLength, height, 0));
      if (pointIntersectionsT[i] < pixelClosestParticle[x][y]) {
        let r = pointColors[i][0];
        let g = pointColors[i][1];
        let b = pointColors[i][2];
        let pixelOffset = 4 * (y * width + x);
        imageData.data[pixelOffset] = r;
        imageData.data[pixelOffset + 1] = g;
        imageData.data[pixelOffset + 2] = b;
        imageData.data[pixelOffset + 3] = 255;
        pixelClosestParticle[x][y] = pointIntersectionsT[i];
      }
    }
    ctx.putImageData(imageData, 0, 0);
    previousTimeMillis = currentTimeMillis;
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
})();
//# sourceMappingURL=bundle.js.map
