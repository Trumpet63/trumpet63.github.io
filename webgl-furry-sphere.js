(() => {
  // src/index.ts
  var cameraRotation;
  var width = 1e3;
  var height = 600;
  var canvas = document.getElementById("mainCanvas");
  canvas.width = width;
  canvas.height = height;
  var gl = canvas.getContext("webgl2");
  var vertexShaderSrc = `
    attribute vec3 aPosition;
    attribute vec3 aNormal;
    attribute vec2 aUV;

    uniform mat4 uProjection;
    uniform mat4 uView;
    uniform float uDisplacement;
    uniform float uDisplacementRatio;

    varying vec2 vUV;
    varying float vDisplacement;
    varying float vDisplacementRatio;

    void main() {
        vec3 displacedPosition = aPosition + uDisplacement * aNormal;
        gl_Position = uProjection * uView * vec4(displacedPosition, 1.0);
        vUV = aUV;
        vDisplacement = uDisplacement;
        vDisplacementRatio = uDisplacementRatio;
    }
`;
  var fragmentShaderSrc = `
    precision mediump float;

    varying vec2 vUV;
    varying float vDisplacement;
    varying float vDisplacementRatio;

    float hash(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)),
                dot(p, vec2(269.5, 183.3)));
        return fract(sin(p.x + p.y) * 43758.5453);
    }
    
    void main() {
        float density = 450.0;
        vec2 snappedUV = floor(vUV * density) / density;
        float strandHeight = hash(snappedUV);
        vec2 localUV = fract(vUV * density) * 2.0 - 1.0;
        float distanceFromLocalCenter = length(localUV);
        float thickness = 2.0;

        float taper = 1.0 - (vDisplacementRatio / strandHeight);
        if (taper <= 0.0) discard;

        float radius = thickness * taper;
        if (distanceFromLocalCenter > radius) {
            discard;
        }

        float lightness = vDisplacementRatio/1.8;
        gl_FragColor = vec4(0.1 + lightness, 0.2 + lightness, 0.4 + lightness*1.2, 1.0);
    }
`;
  var vertexShader = compileShader(vertexShaderSrc, gl.VERTEX_SHADER);
  var fragmentShader = compileShader(fragmentShaderSrc, gl.FRAGMENT_SHADER);
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);
  var radius = 1;
  var latSegments = 20;
  var longSegments = 20;
  var positions = [];
  var normals = [];
  var uvs = [];
  var indices = [];
  for (let y = 0; y <= latSegments; y++) {
    let v = y / latSegments;
    let theta = v * Math.PI;
    for (let x = 0; x <= longSegments; x++) {
      let u = x / longSegments;
      let phi = u * 2 * Math.PI;
      let sinTheta = Math.sin(theta);
      let cosTheta = Math.cos(theta);
      let sinPhi = Math.sin(phi);
      let cosPhi = Math.cos(phi);
      let px = radius * sinTheta * cosPhi;
      let py = radius * cosTheta;
      let pz = radius * sinTheta * sinPhi;
      let nx = sinTheta * cosPhi;
      let ny = cosTheta;
      let nz = sinTheta * sinPhi;
      positions.push(px, py, pz);
      normals.push(nx, ny, nz);
      uvs.push(u, 1 - v);
    }
  }
  for (let y = 0; y < latSegments; y++) {
    for (let x = 0; x < longSegments; x++) {
      let i0 = y * (longSegments + 1) + x;
      let i1 = i0 + 1;
      let i2 = i0 + longSegments + 1;
      let i3 = i2 + 1;
      indices.push(i0, i2, i1);
      indices.push(i1, i2, i3);
    }
  }
  var positionsArray = new Float32Array(positions);
  var indicesArray = new Uint16Array(indices);
  var normalsArray = new Float32Array(normals);
  var uvsArray = new Float32Array(uvs);
  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, positionsArray, gl.STATIC_DRAW);
  var aPosition = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
  var uvBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, uvsArray, gl.STATIC_DRAW);
  var aUV = gl.getAttribLocation(program, "aUV");
  gl.enableVertexAttribArray(aUV);
  gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, 0, 0);
  var normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, normalsArray, gl.STATIC_DRAW);
  var aNormal = gl.getAttribLocation(program, "aNormal");
  gl.enableVertexAttribArray(aNormal);
  gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 0, 0);
  var indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesArray, gl.STATIC_DRAW);
  var uProjection = gl.getUniformLocation(program, "uProjection");
  var projection = computeProjectionMatrix(Math.PI / 4, 0.1, 100);
  gl.uniformMatrix4fv(uProjection, false, projection);
  var uDisplacement = gl.getUniformLocation(program, "uDisplacement");
  var uDisplacementRatio = gl.getUniformLocation(program, "uDisplacementRatio");
  var uView = gl.getUniformLocation(program, "uView");
  gl.enable(gl.CULL_FACE);
  gl.cullFace(gl.FRONT);
  window.requestAnimationFrame(draw);
  function compileShader(src, type) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader));
    }
    return shader;
  }
  function computeProjectionMatrix(fov, near, far) {
    let f = 1 / Math.tan(fov / 2);
    let aspect = width / height;
    return new Float32Array([
      f / aspect,
      0,
      0,
      0,
      0,
      f,
      0,
      0,
      0,
      0,
      (far + near) / (near - far),
      -1,
      0,
      0,
      2 * far * near / (near - far),
      0
    ]);
  }
  function normalize(v) {
    let len = Math.hypot(v[0], v[1], v[2]);
    return [
      v[0] / len,
      v[1] / len,
      v[2] / len
    ];
  }
  function subtract(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  }
  function cross(a, b) {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0]
    ];
  }
  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  function lookAt(eye, center, up) {
    let z = normalize(subtract(eye, center));
    let x = normalize(cross(up, z));
    let y = cross(z, x);
    return [
      x[0],
      y[0],
      z[0],
      0,
      x[1],
      y[1],
      z[1],
      0,
      x[2],
      y[2],
      z[2],
      0,
      -dot(x, eye),
      -dot(y, eye),
      -dot(z, eye),
      1
    ];
  }
  var fpsCounter = document.getElementById("fpsCounter");
  var previousTimeMillis;
  function draw(currentTimeMillis) {
    let fps = 1e3 / (currentTimeMillis - previousTimeMillis);
    if (!isNaN(fps)) {
      fpsCounter.innerText = "FPS: " + roundToNPlaces(fps, 2);
    }
    let orbitRadius = 3;
    let positionCenter = [0, 0, 0];
    cameraRotation = 4e-4 * currentTimeMillis;
    let camX = positionCenter[0] + orbitRadius * Math.sin(cameraRotation);
    let camY = positionCenter[1] + orbitRadius * 0.5;
    let camZ = positionCenter[2] + orbitRadius * Math.cos(cameraRotation);
    let cameraPos = [camX, camY, camZ];
    let viewMatrix = lookAt(cameraPos, positionCenter, [0, 1, 0]);
    gl.uniformMatrix4fv(uView, false, viewMatrix);
    gl.clearColor(0.3, 0.3, 0.3, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    let numShells = 256;
    let maxDisplacement = 0.2;
    for (let i = 0; i < numShells; i++) {
      let displacementRatio = i / (numShells - 1);
      let displacement = displacementRatio * maxDisplacement;
      gl.uniform1f(uDisplacement, displacement);
      gl.uniform1f(uDisplacementRatio, displacementRatio);
      gl.drawElements(gl.TRIANGLES, indicesArray.length, gl.UNSIGNED_SHORT, 0);
    }
    previousTimeMillis = currentTimeMillis;
    window.requestAnimationFrame(draw);
  }
  function roundToNPlaces(x, numPlaces) {
    let scale = Math.pow(10, numPlaces);
    return Math.round(x * scale) / scale;
  }
})();
//# sourceMappingURL=bundle.js.map
