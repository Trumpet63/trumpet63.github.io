(() => {
  // pages/infinite-craft-explorer/src/index.js
  var numObjects = Object.keys(objects).length;
  var scalingFactor = 4.75966;
  var maxScalingFactor = 10;
  var canvas = document.getElementById("the-canvas");
  var ctx = canvas.getContext("2d");
  var canvasWidth;
  var canvasHeight;
  var worldWidth;
  var worldHeight;
  var thingXMins = [];
  var thingYMins = [];
  var thingWidth = 100;
  var thingHeight = 20;
  for (let i = 0; i <= numObjects; i++) {
    thingXMins.push(i * thingWidth);
    thingYMins.push(i * thingHeight);
  }
  var worldTopLeftX = -thingWidth;
  var worldTopLeftY = -thingHeight;
  var viewChanged = true;
  onResize();
  window.addEventListener("resize", onResize);
  var mouseDown = false;
  var previousMouseX = void 0;
  var previousMouseY = void 0;
  var rawScrollValue = 1315.8;
  document.addEventListener("wheel", onWheel);
  document.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
  window.requestAnimationFrame(draw);
  function onWheel(e) {
    let newRawScrollValue = rawScrollValue + e.deltaY;
    if (newRawScrollValue < 0) {
      newRawScrollValue = 0;
    } else if (newRawScrollValue > 9500) {
      newRawScrollValue = 9500;
    }
    if (newRawScrollValue === rawScrollValue) {
      return;
    }
    rawScrollValue = newRawScrollValue;
    scalingFactor = maxScalingFactor * Math.pow(0.95, rawScrollValue * 0.011);
    viewChanged = true;
  }
  function onMouseDown(e) {
    console.log("mousedown");
    previousMouseX = e.clientX;
    previousMouseY = e.clientY;
    mouseDown = true;
  }
  function onMouseMove(e) {
    if (mouseDown) {
      let deltaX = previousMouseX - e.clientX;
      let deltaY = previousMouseY - e.clientY;
      worldTopLeftX += deltaX / scalingFactor;
      worldTopLeftY += deltaY / scalingFactor;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
      viewChanged = true;
    }
  }
  function onMouseUp(e) {
    console.log("mouseup");
    mouseDown = false;
  }
  function onResize() {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    worldWidth = canvasWidth / scalingFactor;
    worldHeight = canvasHeight / scalingFactor;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    viewChanged = true;
  }
  function draw() {
    if (viewChanged) {
      updateView();
      viewChanged = false;
    }
    window.requestAnimationFrame(draw);
  }
  function updateView() {
    worldWidth = canvasWidth / scalingFactor;
    worldHeight = canvasHeight / scalingFactor;
    ctx.lineWidth = 0.5 * scalingFactor;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    fontSize = 12 * scalingFactor;
    ctx.font = "500 normal " + fontSize + "px Roboto, sans-serif";
    let worldRightX = worldTopLeftX + worldWidth;
    let worldBottomY = worldTopLeftY + worldHeight;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    let thingXStartIndex = void 0;
    let thingXEndIndex = void 0;
    for (let i = 0; i < thingXMins.length; i++) {
      if (thingXStartIndex === void 0 && thingXMins[i] > worldTopLeftX) {
        thingXStartIndex = Math.max(0, i - 1);
        i = thingXStartIndex;
      } else if (thingXEndIndex === void 0 && thingXMins[i] > worldRightX) {
        thingXEndIndex = i - 1;
      }
    }
    if (thingXStartIndex !== void 0 && thingXEndIndex === void 0) {
      thingXEndIndex = thingXMins.length - 1;
    }
    let thingYStartIndex = void 0;
    let thingYEndIndex = void 0;
    for (let i = 0; i < thingYMins.length; i++) {
      if (thingYStartIndex === void 0 && thingYMins[i] > worldTopLeftY) {
        thingYStartIndex = Math.max(0, i - 1);
        i = thingYStartIndex;
      } else if (thingYEndIndex === void 0 && thingYMins[i] > worldBottomY) {
        thingYEndIndex = i - 1;
      }
    }
    if (thingYStartIndex !== void 0 && thingYEndIndex === void 0) {
      thingYEndIndex = thingYMins.length - 1;
    }
    if (thingXStartIndex !== void 0 && thingYStartIndex !== void 0) {
      for (let i = thingXStartIndex; i <= thingXEndIndex; i++) {
        let x2 = (thingXMins[i] - worldTopLeftX) * scalingFactor;
        ctx.beginPath();
        ctx.moveTo(x2, 0);
        ctx.lineTo(x2, canvasHeight - 1);
        ctx.stroke();
      }
      for (let i = thingYStartIndex; i <= thingYEndIndex; i++) {
        let y2 = (thingYMins[i] - worldTopLeftY) * scalingFactor;
        ctx.beginPath();
        ctx.moveTo(0, y2);
        ctx.lineTo(canvasWidth - 1, y2);
        ctx.stroke();
      }
      if (thingXEndIndex === numObjects) {
        thingXEndIndex = numObjects - 1;
      }
      if (thingYEndIndex === numObjects) {
        thingYEndIndex = numObjects - 1;
      }
      for (let i = thingXStartIndex; i <= thingXEndIndex; i++) {
        let x2 = (thingXMins[i] - worldTopLeftX + thingWidth / 2) * scalingFactor;
        for (let j = thingYStartIndex; j <= thingYEndIndex; j++) {
          let y2 = (thingYMins[j] - worldTopLeftY + thingHeight / 2) * scalingFactor;
          let ii = Math.min(i, j) + 1;
          let jj = Math.max(i, j) + 1;
          text = getGridContents(ii, jj);
          if (text !== void 0) {
            ctx.fillText(text, x2, y2);
          }
        }
      }
      ctx.fillStyle = "rgb(235, 235, 235)";
      let thingCanvasWidth = thingWidth * scalingFactor - 2 * ctx.lineWidth;
      let thingCanvasHeight = thingHeight * scalingFactor - 2 * ctx.lineWidth;
      for (let i = thingXStartIndex; i <= thingXEndIndex; i++) {
        let x2 = (thingXMins[i] - worldTopLeftX) * scalingFactor + ctx.lineWidth;
        ctx.fillRect(x2, 0, thingCanvasWidth, thingCanvasHeight);
      }
      for (let i = thingYStartIndex; i <= thingYEndIndex; i++) {
        let y2 = (thingYMins[i] - worldTopLeftY) * scalingFactor + ctx.lineWidth;
        ctx.fillRect(0, y2, thingCanvasWidth, thingCanvasHeight);
      }
      ctx.fillStyle = "black";
      ctx.textBaseline = "middle";
      let y = thingHeight / 2 * scalingFactor;
      console.log("thingXIndices", thingXStartIndex, thingXEndIndex);
      for (let i = thingXStartIndex; i <= thingXEndIndex; i++) {
        text = getGridContents(0, i + 1);
        console.log("getGridContents", i + 1, 0);
        if (text !== void 0) {
          let x2 = (thingXMins[i] - worldTopLeftX + thingWidth / 2) * scalingFactor;
          ctx.fillText(text, x2, y);
        }
      }
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      let x = (thingWidth - thingHeight / 2) * scalingFactor;
      for (let i = thingYStartIndex; i <= thingYEndIndex; i++) {
        text = getGridContents(i + 1, 0);
        if (text !== void 0) {
          let y2 = (thingYMins[i] - worldTopLeftY + thingHeight / 2) * scalingFactor;
          ctx.fillText(text, x, y2);
        }
      }
    }
  }
  function getGridContents(i, j) {
    let key = ((numObjects + 1) * i + j).toString();
    let text2 = grid[key];
    if (text2 === void 0) {
      return void 0;
    }
    let object = objects[text2];
    if (object === void 0) {
      return void 0;
    }
    return object.emoji + " " + text2;
  }
})();
