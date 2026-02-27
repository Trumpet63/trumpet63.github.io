(() => {
  // pages/interactive-springs-2d/src/index.ts
  var width = 720;
  var height = 720;
  var canvas = document.getElementById("mainCanvas");
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");
  var fpsContainer = document.getElementById("fpsContainer");
  var Mass = class {
    constructor(x, y, vx, vy) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.linkedMasses = [];
    }
  };
  var masses = [];
  var linkIndices = [];
  var massRadius = 25;
  var numMasses = 6;
  var circleRadius = 140;
  var angleStepRad = 2 * Math.PI / numMasses;
  var angle = 0;
  for (let i = 0; i < numMasses; i++) {
    let x = width / 2 + circleRadius * Math.sin(angle);
    let y = height / 2 + circleRadius * Math.cos(angle);
    masses.push(new Mass(x, y, 0, 0));
    angle += angleStepRad;
    if (i > 0) {
      linkIndices.push([i - 1, i]);
    }
  }
  linkIndices.push([numMasses - 1, 0]);
  masses.push(new Mass(width / 2, height / 2, 0, 0));
  for (let i = 0; i < numMasses; i++) {
    linkIndices.push([i, numMasses]);
  }
  masses[0].vx = 150;
  masses[0].vy = 150;
  masses[3].vx = -150;
  masses[3].vy = -150;
  var idealLength;
  {
    let diff = { x: 0, y: 0 };
    subtractInPlace(diff, masses[0], masses[1]);
    idealLength = magnitude(diff) - 2 * massRadius;
  }
  var links = [];
  for (let i = 0; i < linkIndices.length; i++) {
    links.push({ a: masses[linkIndices[i][0]], b: masses[linkIndices[i][1]] });
  }
  for (let i = 0; i < linkIndices.length; i++) {
    masses[linkIndices[i][0]].linkedMasses.push(masses[linkIndices[i][1]]);
    masses[linkIndices[i][1]].linkedMasses.push(masses[linkIndices[i][0]]);
  }
  var dt = 6944e-9;
  var k = 64;
  var m = 1;
  var springHeight = 16;
  var springCanvas = document.createElement("canvas");
  springCanvas.width = idealLength;
  springCanvas.height = springHeight;
  var sCtx = springCanvas.getContext("2d");
  var initialX = 0;
  var xStep = 0.1;
  var scalar = (springHeight - 1) / 2;
  sCtx.fillStyle = "gray";
  for (let x = 0; x < idealLength; x += xStep) {
    let y = scalar + scalar * Math.sin(0.4 * (x - initialX));
    sCtx.fillRect(x, y, 1, 1);
  }
  function scaleInPlace(dest, vector, scalar2) {
    dest.x = scalar2 * vector.x;
    dest.y = scalar2 * vector.y;
  }
  function subtractInPlace(dest, v1, v2) {
    dest.x = v1.x - v2.x;
    dest.y = v1.y - v2.y;
  }
  function magnitude(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }
  function normalizeInPlace(v) {
    let scalar2 = 1 / Math.sqrt(v.x * v.x + v.y * v.y);
    v.x *= scalar2;
    v.y *= scalar2;
  }
  var heldMassIndex;
  canvas.addEventListener("mousemove", (event) => {
    if (heldMassIndex !== void 0) {
      let heldMass = masses[heldMassIndex];
      heldMass.x = event.offsetX;
      heldMass.y = event.offsetY;
    }
  });
  canvas.addEventListener("mousedown", (event) => {
    let massRadiusSq = massRadius * massRadius;
    for (let i = 0; i < masses.length; i++) {
      let distanceSq = Math.pow(masses[i].x - event.offsetX, 2) + Math.pow(masses[i].y - event.offsetY, 2);
      if (distanceSq < massRadiusSq) {
        heldMassIndex = i;
        break;
      }
    }
    if (heldMassIndex !== void 0) {
      let heldMass = masses[heldMassIndex];
      heldMass.vx = 0;
      heldMass.vy = 0;
      heldMass.x = event.offsetX;
      heldMass.y = event.offsetY;
    }
  });
  window.addEventListener("mouseup", () => {
    heldMassIndex = void 0;
  });
  var previousTimeMillis;
  var simulationTimeSeconds = 0;
  var animationStartTimeMillis;
  window.requestAnimationFrame(draw);
  function draw(currentTimeMillis) {
    if (animationStartTimeMillis === void 0) {
      animationStartTimeMillis = currentTimeMillis;
    }
    let animationTimeSeconds = (currentTimeMillis - animationStartTimeMillis) / 1e3;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    let numIterations = 0;
    if (animationTimeSeconds !== void 0) {
      if (animationTimeSeconds - simulationTimeSeconds > 1) {
        simulationTimeSeconds = animationTimeSeconds;
      }
      while (simulationTimeSeconds < animationTimeSeconds) {
        for (let i = 0; i < masses.length; i++) {
          let mass = masses[i];
          mass.tempForceX = 0;
          mass.tempForceY = 0;
        }
        let massDiameter = 2 * massRadius;
        let smallValue = 1e-3;
        for (let i = 0; i < links.length; i++) {
          let link = links[i];
          let diff = { x: 0, y: 0 };
          subtractInPlace(diff, link.a, link.b);
          let diffMag = magnitude(diff);
          let springLength = diffMag - massDiameter;
          if (springLength < smallValue) {
            springLength = smallValue;
          }
          let f = idealLength - springLength;
          let scalar2 = 1 / diffMag;
          scaleInPlace(diff, diff, scalar2);
          link.a.tempForceX += diff.x * f;
          link.a.tempForceY += -diff.y * f;
          link.b.tempForceX -= diff.x * f;
          link.b.tempForceY -= -diff.y * f;
        }
        for (let i = 0; i < masses.length; i++) {
          if (i === heldMassIndex) {
            continue;
          }
          let mass = masses[i];
          let ax = (k * mass.tempForceX - 0.5 * mass.vx) / m;
          mass.vx += dt * ax;
          mass.x += dt * mass.vx;
          let ay = (k * mass.tempForceY - 0.5 * mass.vy) / m;
          mass.vy += dt * ay;
          mass.y -= dt * mass.vy;
        }
        simulationTimeSeconds += dt;
        numIterations++;
      }
    }
    for (let i = 0; i < masses.length; i++) {
      let mass = masses[i];
      let massLeftX = mass.x - massRadius;
      if (massLeftX < 0) {
        mass.x -= massLeftX;
        mass.vx = 0;
      }
      let massRightX = mass.x + massRadius;
      if (massRightX > width) {
        mass.x -= massRightX - width;
        mass.vx = 0;
      }
      let massTopY = mass.y - massRadius;
      if (massTopY < 0) {
        mass.y -= massTopY;
        mass.vy = 0;
      }
      let massBottomY = mass.y + massRadius;
      if (massBottomY > height) {
        mass.y -= massBottomY - height;
        mass.vy = 0;
      }
    }
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    for (let i = 0; i < links.length; i++) {
      let link = links[i];
      let diff = { x: 0, y: 0 };
      subtractInPlace(diff, link.b, link.a);
      let mag = magnitude(diff) - 2 * massRadius;
      normalizeInPlace(diff);
      let angle2 = Math.atan2(diff.y, diff.x);
      scaleInPlace(diff, diff, massRadius);
      diff.x += link.a.x;
      diff.y += link.a.y;
      ctx.translate(diff.x, diff.y);
      ctx.rotate(angle2);
      ctx.drawImage(
        springCanvas,
        0,
        -springHeight / 2,
        mag,
        springHeight
      );
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    for (let i = 0; i < masses.length; i++) {
      let mass = masses[i];
      ctx.beginPath();
      ctx.arc(mass.x, mass.y, massRadius, 0, 2 * Math.PI);
      ctx.stroke();
    }
    if (previousTimeMillis !== void 0) {
      let fps = 1e3 / (currentTimeMillis - previousTimeMillis);
      fpsContainer.innerText = "FPS: " + Math.round(fps * 100) / 100;
    }
    previousTimeMillis = currentTimeMillis;
    window.requestAnimationFrame(draw);
  }
})();
