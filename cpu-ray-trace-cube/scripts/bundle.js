(() => {
  // src/index.ts
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
  var x1 = [0, yOne, 0];
  var x2 = [1, yOne, 0];
  var x3 = [0, 0, 0];
  var x4 = [1, 0, 0];
  var camera = [0.5, yOne / 2, -1];
  var yFloor = 0;
  var cubeCenter = [0.5, yFloor, 1.5];
  var cubeUOriginal = [1, 0, 0];
  var cubeVOriginal = [0, 1, 0];
  var cubeWOriginal = [0, 0, 1];
  var cubeU = [1, 0, 0];
  var cubeV = [0, 1, 0];
  var cubeW = [0, 0, 1];
  var cubeH = 0.2;
  var cubeRotationAxis = [0, 1, 0];
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
  function matrixMultiplyInPlace(dest, m, v) {
    dest[0] = m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2];
    dest[1] = m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2];
    dest[2] = m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2];
  }
  var rotateTemp1 = [0, 0, 0];
  var rotateTemp2 = [0, 0, 0];
  function rotateAboutPoint(dest, v, rotationMatrix, centerOfRotation) {
    subtractInPlace(rotateTemp1, v, centerOfRotation);
    matrixMultiplyInPlace(rotateTemp2, rotationMatrix, rotateTemp1);
    addInPlace(dest, rotateTemp2, centerOfRotation);
  }
  var transformedDirection = [0, 0, 0];
  var transformedOriginTemp = [0, 0, 0];
  var transformedOrigin = [0, 0, 0];
  var localIntersection = [0, 0, 0];
  var epsilon = 1e-3;
  var rayCubeIntersectResponse = { t: 0, sign: 0, axis: 0, u: 0, v: 0 };
  function rayCubeIntersect(origin, direction) {
    subtractInPlace(transformedOriginTemp, origin, cubeCenter);
    transformedOrigin[0] = cubeU[0] * transformedOriginTemp[0] + cubeU[1] * transformedOriginTemp[1] + cubeU[2] * transformedOriginTemp[2];
    transformedOrigin[1] = cubeV[0] * transformedOriginTemp[0] + cubeV[1] * transformedOriginTemp[1] + cubeV[2] * transformedOriginTemp[2];
    transformedOrigin[2] = cubeW[0] * transformedOriginTemp[0] + cubeW[1] * transformedOriginTemp[1] + cubeW[2] * transformedOriginTemp[2];
    transformedDirection[0] = cubeU[0] * direction[0] + cubeU[1] * direction[1] + cubeU[2] * direction[2];
    transformedDirection[1] = cubeV[0] * direction[0] + cubeV[1] * direction[1] + cubeV[2] * direction[2];
    transformedDirection[2] = cubeW[0] * direction[0] + cubeW[1] * direction[1] + cubeW[2] * direction[2];
    let tNear = -Infinity;
    let tFar = Infinity;
    let hitSign = 0;
    let hitAxis = -1;
    for (let i = 0; i < 3; i++) {
      if (Math.abs(transformedDirection[i]) < epsilon && (transformedOrigin[i] < -cubeH || transformedOrigin[i] > cubeH)) {
        return false;
      }
      if (transformedDirection[i] === 0) {
        continue;
      }
      let temp = 1 / transformedDirection[i];
      let t0 = (-cubeH - transformedOrigin[i]) * temp;
      let t1 = (cubeH - transformedOrigin[i]) * temp;
      let sign;
      if (t0 > t1) {
        temp = t0;
        t0 = t1;
        t1 = temp;
        sign = -1;
      } else {
        sign = 1;
      }
      if (t0 > tNear) {
        tNear = t0;
        hitAxis = i;
        hitSign = sign;
      }
      if (t1 < tFar) {
        tFar = t1;
      }
      if (tNear > tFar || tFar < 0) {
        return false;
      }
    }
    let tIntersect;
    if (tNear > 0) {
      tIntersect = tNear;
    } else {
      tIntersect = tFar;
    }
    scaleInPlace(localIntersection, transformedDirection, tIntersect);
    addInPlace(localIntersection, localIntersection, transformedOrigin);
    let u;
    let v;
    if (hitAxis === 0) {
      u = (localIntersection[2] + cubeH) / (2 * cubeH);
      v = (localIntersection[1] + cubeH) / (2 * cubeH);
    } else if (hitAxis === 1) {
      u = (localIntersection[0] + cubeH) / (2 * cubeH);
      v = (localIntersection[2] + cubeH) / (2 * cubeH);
    } else if (hitAxis === 2) {
      u = (localIntersection[0] + cubeH) / (2 * cubeH);
      v = (localIntersection[1] + cubeH) / (2 * cubeH);
    }
    rayCubeIntersectResponse.t = tIntersect;
    rayCubeIntersectResponse.sign = hitSign;
    rayCubeIntersectResponse.axis = hitAxis;
    rayCubeIntersectResponse.u = u;
    rayCubeIntersectResponse.v = v;
    return true;
  }
  function roundToNPlaces(x, numPlaces) {
    let scale = Math.pow(10, numPlaces);
    return Math.round(x * scale) / scale;
  }
  var numPixels = width * height;
  var rayDirections = [];
  var rayPixels = [];
  var hIncrement = 1 / width;
  var vIncrement = 1 / height;
  var horizontal = hIncrement / 2;
  for (let i = 0; i < width; i++) {
    let vertical = vIncrement / 2;
    for (let j = 0; j < height; j++) {
      rayDirections.push([
        (1 - vertical) * ((1 - horizontal) * x1[0] + horizontal * x2[0]) + vertical * ((1 - horizontal) * x3[0] + horizontal * x4[0]) - camera[0],
        (1 - vertical) * ((1 - horizontal) * x1[1] + horizontal * x2[1]) + vertical * ((1 - horizontal) * x3[1] + horizontal * x4[1]) - camera[1],
        (1 - vertical) * ((1 - horizontal) * x1[2]) + vertical * ((1 - horizontal) * x3[2] + horizontal * x4[2]) - camera[2]
      ]);
      rayPixels.push([i, j]);
      vertical += vIncrement;
    }
    horizontal += hIncrement;
  }
  var floorIntersection = [0, 0, 0];
  var floorDirection = [0, 1, 0];
  function loadImage(imageSource) {
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.onload = () => {
        let canvas2 = document.createElement("canvas");
        canvas2.width = image.width;
        canvas2.height = image.height;
        let ctx2 = canvas2.getContext("2d");
        ctx2.drawImage(image, 0, 0);
        resolve(ctx2.getImageData(0, 0, image.width, image.height));
      };
      image.onerror = reject;
      image.src = imageSource;
    });
  }
  var sandImageData;
  var diamondBlockImageData;
  loadImage("cpu-ray-trace-cube/assets/sand.png").then((imageData2) => {
    sandImageData = imageData2;
  }).then(() => loadImage("cpu-ray-trace-cube/assets/diamond_block.png")).then((imageData2) => {
    diamondBlockImageData = imageData2;
  }).then(() => window.requestAnimationFrame(draw));
  function draw(currentTimeMillis) {
    let fps = 1e3 / (currentTimeMillis - previousTimeMillis);
    if (!isNaN(fps)) {
      fpsCounter.innerText = "FPS: " + roundToNPlaces(fps, 2);
    }
    for (let i = 0; i < width * height; i++) {
      imageData.data[4 * i] = 135;
      imageData.data[4 * i + 1] = 206;
      imageData.data[4 * i + 2] = 235;
      imageData.data[4 * i + 3] = 255;
    }
    let cubeRotationAmount = currentTimeMillis / 2e3;
    let cubeRotationMatrix = computeRotationMatrix(cubeRotationAxis, cubeRotationAmount);
    rotateAboutPoint(cubeU, cubeUOriginal, cubeRotationMatrix, [0, 0, 0]);
    rotateAboutPoint(cubeV, cubeVOriginal, cubeRotationMatrix, [0, 0, 0]);
    rotateAboutPoint(cubeW, cubeWOriginal, cubeRotationMatrix, [0, 0, 0]);
    cubeCenter[1] = 0.5 + 0.25 * Math.cos(currentTimeMillis / 1e3);
    let prevTime = performance.now();
    let tempTime = 0;
    for (let k = 0; k < rayDirections.length; k++) {
      let d = rayDirections[k];
      let t = -camera[1] / d[1];
      if (Math.abs(t) === Infinity || t < 0) {
        continue;
      }
      let i = rayPixels[k][0];
      let j = rayPixels[k][1];
      floorIntersection[0] = camera[0] + t * d[0];
      floorIntersection[2] = camera[2] + t * d[2];
      let u = Math.floor((floorIntersection[0] + 1e3) * 30 % 16);
      let v = Math.floor((floorIntersection[2] + 1e3) * 30 % 16);
      let uvPixelOffset = 4 * (v * 16 + u);
      let outPixelOffset = 4 * (j * width + i);
      let r = sandImageData.data[uvPixelOffset];
      let g = sandImageData.data[uvPixelOffset + 1];
      let b = sandImageData.data[uvPixelOffset + 2];
      let a = sandImageData.data[uvPixelOffset + 3];
      if (2.5 > floorIntersection[2] && floorIntersection[2] > 0.5 && rayCubeIntersect(floorIntersection, floorDirection)) {
        r = Math.round(r * 0.5);
        g = Math.round(g * 0.5);
        b = Math.round(b * 0.5);
      }
      imageData.data[outPixelOffset] = r;
      imageData.data[outPixelOffset + 1] = g;
      imageData.data[outPixelOffset + 2] = b;
      imageData.data[outPixelOffset + 3] = a;
    }
    for (let k = 0; k < rayDirections.length; k++) {
      let d = rayDirections[k];
      if (!rayCubeIntersect(camera, d)) {
        continue;
      }
      let i = rayPixels[k][0];
      let j = rayPixels[k][1];
      let pixelOffset = 4 * (j * width + i);
      let t = rayCubeIntersectResponse.t;
      let u = Math.min(Math.floor(16 * rayCubeIntersectResponse.u), 15);
      let v = Math.min(Math.floor(16 * rayCubeIntersectResponse.v), 15);
      let uvPixelOffset = 4 * (v * 16 + u);
      imageData.data[pixelOffset] = diamondBlockImageData.data[uvPixelOffset];
      imageData.data[pixelOffset + 1] = diamondBlockImageData.data[uvPixelOffset + 1];
      imageData.data[pixelOffset + 2] = diamondBlockImageData.data[uvPixelOffset + 2];
      imageData.data[pixelOffset + 3] = diamondBlockImageData.data[uvPixelOffset + 3];
    }
    ctx.putImageData(imageData, 0, 0);
    previousTimeMillis = currentTimeMillis;
    window.requestAnimationFrame(draw);
  }
})();
//# sourceMappingURL=bundle.js.map
