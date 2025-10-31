(() => {
  // src/index.ts
  var height = 720;
  var width = 1080;
  var canvas = document.createElement("canvas");
  canvas.height = height;
  canvas.width = width;
  document.body.appendChild(canvas);
  var ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  var foregroundCanvas = document.createElement("canvas");
  foregroundCanvas.height = height;
  foregroundCanvas.width = width;
  var fctx = foregroundCanvas.getContext("2d");
  fctx.imageSmoothingEnabled = false;
  var maskCanvas = document.createElement("canvas");
  maskCanvas.height = height;
  maskCanvas.width = width;
  var maskCtx = maskCanvas.getContext("2d");
  maskCtx.imageSmoothingEnabled = true;
  var mapCsvInfilePath = "creative-destruction/assets/actual_map_v2.csv";
  var mapCsvLoaded = false;
  var mapData = [];
  fetch(mapCsvInfilePath).then((response) => response.text()).then((text) => {
    let lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if (line === "") {
        continue;
      }
      let lineParts = lines[i].split(",");
      let lineData = [];
      for (let j = 0; j < lineParts.length; j++) {
        let cell = lineParts[j];
        if (cell === "") {
          continue;
        }
        lineData.push(cell);
      }
      mapData.push(lineData);
    }
    mapCsvLoaded = true;
  });
  var mapImageWidth = 2560;
  var mapImageHeight = 2304;
  var mapImageInfilePath = "creative-destruction/assets/actual_map_v2.png";
  var mapImageLoaded = false;
  var mapCanvas = document.createElement("canvas");
  mapCanvas.width = mapImageWidth;
  mapCanvas.height = mapImageHeight;
  var mctx = mapCanvas.getContext("2d");
  var mapImage = new Image(mapImageWidth, mapImageHeight);
  mapImage.onload = () => {
    mctx.drawImage(mapImage, 0, 0);
    mapImageLoaded = true;
  };
  mapImage.src = mapImageInfilePath;
  var tileImageSize = 16;
  var tileDisplaySize = 64;
  var playerImageWidth = 16;
  var playerImageHeight = 32;
  var playerImageInfilePath = "creative-destruction/assets/player.png";
  var playerImageLoaded = false;
  var playerCanvas = document.createElement("canvas");
  playerCanvas.width = playerImageWidth;
  playerCanvas.height = playerImageHeight;
  var cctx = playerCanvas.getContext("2d");
  var playerImage = new Image(playerImageWidth, playerImageHeight);
  playerImage.onload = () => {
    cctx.drawImage(playerImage, 0, 0);
    playerImageLoaded = true;
  };
  playerImage.src = playerImageInfilePath;
  var playerDisplayWidth = 32;
  var playerDisplayHeight = 64;
  var playerHitboxTopLeftX = width / 2 - playerDisplayWidth / 2 + 6;
  var playerHitboxTopLeftY = height / 2 + 32 + 4;
  var playerHitboxWidth = playerDisplayWidth - 12;
  var playerHitboxHeight = playerDisplayHeight / 2 - 8;
  var playerHitboxWidthTile = playerHitboxWidth / tileDisplaySize;
  var playerHitboxHeightTile = playerHitboxHeight / tileDisplaySize;
  var diamondImageSize = 48;
  var diamondCanvasWidth = 7 * diamondImageSize;
  var diamondCanvasHeight = diamondImageSize;
  var diamondInfilePaths = [
    "creative-destruction/assets/element_green_diamond_glossy.png",
    "creative-destruction/assets/element_blue_diamond_glossy.png",
    "creative-destruction/assets/element_yellow_diamond_glossy.png",
    "creative-destruction/assets/element_red_diamond_glossy.png",
    "creative-destruction/assets/element_purple_diamond_glossy.png",
    "creative-destruction/assets/element_grey_diamond_glossy.png",
    "creative-destruction/assets/element_grey_polygon_glossy_corrupted.png"
  ];
  var diamondImagesLoaded = false;
  var numDiamondImagesLoaded = 0;
  var diamondCanvas = document.createElement("canvas");
  diamondCanvas.width = diamondCanvasWidth;
  diamondCanvas.height = diamondCanvasHeight;
  var dctx = diamondCanvas.getContext("2d");
  dctx.imageSmoothingEnabled = false;
  for (let i = 0; i < diamondInfilePaths.length; i++) {
    let dImage = new Image(diamondImageSize, diamondImageSize);
    dImage.onload = () => {
      dctx.drawImage(
        dImage,
        i * diamondImageSize,
        0
      );
      numDiamondImagesLoaded++;
      if (numDiamondImagesLoaded === diamondInfilePaths.length) {
        diamondImagesLoaded = true;
      }
    };
    dImage.src = diamondInfilePaths[i];
  }
  var textUIPanelImageWidth = 756;
  var textUIPanelImageHeight = 72;
  var textPanelLoaded = false;
  var textPanelCanvas = document.createElement("canvas");
  textPanelCanvas.width = textUIPanelImageWidth;
  textPanelCanvas.height = textUIPanelImageHeight;
  var pctx = textPanelCanvas.getContext("2d");
  pctx.imageSmoothingEnabled = false;
  var pImage = new Image(textUIPanelImageWidth, textUIPanelImageHeight);
  pImage.onload = () => {
    pctx.drawImage(pImage, 0, 0);
    textPanelLoaded = true;
  };
  pImage.src = "creative-destruction/assets/text_ui_panel_v3.png";
  var treeTopLeftX = 6528;
  var treeTopLeftY = 3776;
  var treeImageWidth = 448;
  var treeImageHeight = 640;
  var treeLoaded = false;
  var treeCanvas = document.createElement("canvas");
  treeCanvas.width = treeImageWidth * 4;
  treeCanvas.height = treeImageHeight * 4;
  var tctx = treeCanvas.getContext("2d");
  tctx.imageSmoothingEnabled = false;
  var tImage = new Image(treeImageWidth, treeImageHeight);
  tImage.onload = () => {
    tctx.drawImage(
      tImage,
      0,
      0,
      treeImageWidth * 4,
      treeImageHeight * 4
    );
    treeLoaded = true;
  };
  tImage.src = "creative-destruction/assets/tree.png";
  var treeCenterX = 7232 + 32;
  var treeCenterY = 6528 + 32;
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mouseup", handleMouseUp);
  var inputState = {
    moveUp: false,
    moveDown: false,
    moveLeft: false,
    moveRight: false,
    mouseLeft: false,
    mouseRight: false
  };
  var texts = [
    ["Oh, it's you. My son."],
    ["It's my fault that you had to come here. I'm so sorry."],
    ["Things are... so much worse than I ever imagined.", "Please be careful on your way to me. And don't destroy more than you must."],
    ["You might be just in time.", "I don't think I'm going to make it, but..."],
    ["He's still holding on.", "Maybe this all won't have been a waste."],
    ["Please.", "Come to me."],
    ["Please save him."],
    ["Thank you... There's so much I wanted to say but...", "I guess now I will... leave this world... and you..."],
    ["Farewell."],
    ["Noooooooooo!!!"]
  ];
  var textIndex = 0;
  var fullUILines = [];
  var uiStringStartTimeMillis;
  var uiStringProgressIntervalMillis = 80;
  var displayTopLeftX = 2100;
  var displayTopLeftY = 5808;
  var previousDisplayTopLeftX = 0;
  var previousDisplayTopLeftY = 0;
  var mouseX = 0;
  var mouseY = 0;
  var previousTimeMillis;
  var CRYSTAL_BLUE = "rgb(208, 228, 255)";
  var playerMoveSpeed = 400;
  var cards = [];
  var cardsChanged = false;
  var cardDeleteButtons = [];
  var hasProgressed = false;
  var timeSinceGameLoadMillis = 0;
  var deckViewButton = { x: 970, y: 610, w: 100, h: 100, hover: false, down: false, clicked: false };
  var deckViewOpen = false;
  var interactableCells = [];
  var playerPositionChanged = false;
  var markedCells = /* @__PURE__ */ new Set();
  var conqueredChallengeTiles = /* @__PURE__ */ new Set();
  var inChallenge = false;
  var challengState = 0;
  var challengeDeck;
  var challengeHand;
  var challengeCardButtons = [];
  var playHandButton;
  var challengeQuitButton;
  var cleanUpChallengeButtons = false;
  var challengeHandChanged = false;
  var challengeStartTimeMillis;
  var currentChalllengeRow;
  var currentChalllengeColumn;
  var challengeScore;
  var uncommittedUsedCells = [];
  var usedCells = /* @__PURE__ */ new Set();
  var globalIntensityModifier = 1;
  var globalPeriodModifier = 1;
  var globalPainModifier = 1;
  var gameOverState = 0;
  var gameOverTime;
  var gridAlpha = 1;
  window.requestAnimationFrame(draw);
  function draw(currentTimeMillis) {
    let deltaMillis;
    if (previousTimeMillis !== void 0) {
      deltaMillis = currentTimeMillis - previousTimeMillis;
    }
    ctx.save();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    if (mapImageLoaded && mapCsvLoaded && playerImageLoaded && diamondImagesLoaded && textPanelLoaded && treeLoaded) {
      if (uiStringStartTimeMillis === void 0) {
        setCurrentUIText(0, currentTimeMillis);
      }
      timeSinceGameLoadMillis += deltaMillis;
      if (!hasProgressed && timeSinceGameLoadMillis > 45e3) {
        alert("Try holding down right click");
        hasProgressed = true;
      }
      let collidedRow;
      let collidedColumn;
      let foundCollision = false;
      if (!inChallenge) {
        let moveVector = getMoveVector(deltaMillis);
        displayTopLeftX += moveVector.x;
        displayTopLeftY += moveVector.y;
        let collision = collidesWithSolidTiles(displayTopLeftX, previousDisplayTopLeftY);
        if (collision !== void 0) {
          collidedRow = collision.i;
          collidedColumn = collision.j;
          foundCollision = true;
          displayTopLeftX = previousDisplayTopLeftX;
        }
        collision = collidesWithSolidTiles(previousDisplayTopLeftX, displayTopLeftY);
        if (collision !== void 0) {
          collidedRow = collision.i;
          collidedColumn = collision.j;
          foundCollision = true;
          displayTopLeftY = previousDisplayTopLeftY;
        }
      }
      if (displayTopLeftX === previousDisplayTopLeftX && displayTopLeftY === previousDisplayTopLeftY) {
        playerPositionChanged = false;
      } else {
        playerPositionChanged = true;
      }
      let topmostRow = Math.max(0, Math.floor(displayTopLeftY / tileDisplaySize));
      let bottommostRow = Math.ceil((displayTopLeftY + height) / tileDisplaySize);
      let leftmostColumn = Math.max(0, Math.floor(displayTopLeftX / tileDisplaySize));
      let rightmostColumn = Math.ceil((displayTopLeftX + width) / tileDisplaySize);
      ctx.textBaseline = "top";
      ctx.textAlign = "left";
      if (!inputState.mouseRight) {
        interactableCells = [];
      }
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "white";
      ctx.font = "12px Arial";
      let initializeInteractableCells = interactableCells.length === 0 || playerPositionChanged;
      if (initializeInteractableCells) {
        interactableCells = [];
      }
      let interactableCellNumber = 0;
      for (let i = topmostRow; i <= bottommostRow; i++) {
        for (let j = leftmostColumn; j <= rightmostColumn; j++) {
          let topLeftX = Math.floor((j - leftmostColumn) * tileDisplaySize - displayTopLeftX % tileDisplaySize);
          let topLeftY = Math.floor((i - topmostRow) * tileDisplaySize - displayTopLeftY % tileDisplaySize);
          let cellData = mapData[i][j];
          let cellId = i + "," + j;
          let hasDiamonds = cellData.length === 7 && cellData !== "0000000";
          if (usedCells.has(cellId)) {
            continue;
          }
          ctx.lineWidth = 1;
          if (!hasDiamonds) {
            ctx.strokeStyle = "rgba(255, 255, 255, " + gridAlpha + ")";
            strokeRectAnim(ctx, topLeftX, topLeftY, tileDisplaySize, tileDisplaySize, currentTimeMillis);
          } else {
            let cellDiamonds = [];
            for (let k = 0; k < cellData.length; k++) {
              let char = cellData.charAt(k);
              if (char !== "0") {
                cellDiamonds.push([k, parseInt(char)]);
              }
            }
            let interactableCell;
            if (initializeInteractableCells) {
              interactableCell = { x: topLeftX, y: topLeftY, w: tileDisplaySize, h: tileDisplaySize, clicked: false, down: false, hover: false };
              interactableCells.push(interactableCell);
            } else {
              interactableCell = interactableCells[interactableCellNumber];
            }
            interactableCellNumber++;
            ctx.fillStyle = "white";
            if (interactableCell.down) {
              drawCellDiamondCounts(ctx, cellDiamonds, topLeftX + 2, topLeftY + 2);
            } else {
              drawCellDiamondCounts(ctx, cellDiamonds, topLeftX, topLeftY);
            }
            let cellIsMarked = markedCells.has(cellId);
            if (interactableCell.clicked) {
              ctx.fillStyle = "rgba(208, 228, 255, 0.2)";
              fillRectAnim(ctx, interactableCell.x, interactableCell.y, interactableCell.w, interactableCell.h, currentTimeMillis);
              ctx.strokeStyle = CRYSTAL_BLUE;
              ctx.lineWidth = 3;
              strokeRectAnim(ctx, interactableCell.x, interactableCell.y, interactableCell.w, interactableCell.h, currentTimeMillis);
              if (!cellIsMarked) {
                markedCells.add(cellId);
                cards.push({ row: i, column: j, diamonds: cellDiamonds });
                cellIsMarked = true;
                cardsChanged = true;
              } else {
                markedCells.delete(cellId);
                for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
                  if (cards[cardIndex].row === i && cards[cardIndex].column === j) {
                    cards.splice(cardIndex, 1);
                    cardsChanged = true;
                    break;
                  }
                }
                cellIsMarked = false;
              }
              cards.push();
              interactableCell.clicked = false;
            } else if (interactableCell.down) {
              ctx.fillStyle = "rgba(208, 228, 255, 0.2)";
              fillRectAnim(ctx, interactableCell.x + 2, interactableCell.y + 2, interactableCell.w, interactableCell.h, currentTimeMillis);
              ctx.strokeStyle = CRYSTAL_BLUE;
              ctx.lineWidth = 3;
              strokeRectAnim(ctx, interactableCell.x + 2, interactableCell.y + 2, interactableCell.w, interactableCell.h, currentTimeMillis);
            } else if (interactableCell.hover) {
              ctx.fillStyle = "rgba(208, 228, 255, 0.2)";
              fillRectAnim(ctx, interactableCell.x, interactableCell.y, interactableCell.w, interactableCell.h, currentTimeMillis);
              ctx.strokeStyle = CRYSTAL_BLUE;
              ctx.lineWidth = 3;
              strokeRectAnim(ctx, interactableCell.x, interactableCell.y, interactableCell.w, interactableCell.h, currentTimeMillis);
            } else {
              ctx.strokeStyle = "white";
              strokeRectAnim(ctx, interactableCell.x, interactableCell.y, interactableCell.w, interactableCell.h, currentTimeMillis);
            }
            if (cellIsMarked) {
              ctx.strokeStyle = CRYSTAL_BLUE;
              ctx.lineWidth = 1;
              if (interactableCell.down) {
                strokeRectAnim(ctx, interactableCell.x + 6, interactableCell.y + 6, interactableCell.w - 8, interactableCell.h - 8, currentTimeMillis);
                strokeRectAnim(ctx, interactableCell.x + 10, interactableCell.y + 10, interactableCell.w - 16, interactableCell.h - 16, currentTimeMillis);
              } else {
                strokeRectAnim(ctx, interactableCell.x + 4, interactableCell.y + 4, interactableCell.w - 8, interactableCell.h - 8, currentTimeMillis);
                strokeRectAnim(ctx, interactableCell.x + 8, interactableCell.y + 8, interactableCell.w - 16, interactableCell.h - 16, currentTimeMillis);
              }
            }
          }
        }
      }
      fctx.globalCompositeOperation = "source-over";
      for (let i = topmostRow; i <= bottommostRow; i++) {
        for (let j = leftmostColumn; j <= rightmostColumn; j++) {
          let cellId = i + "," + j;
          let x2 = Math.floor((j - leftmostColumn) * tileDisplaySize - displayTopLeftX % tileDisplaySize);
          let y2 = Math.floor((i - topmostRow) * tileDisplaySize - displayTopLeftY % tileDisplaySize);
          if (usedCells.has(cellId)) {
            fctx.fillStyle = "black";
            fctx.fillRect(x2, y2, tileDisplaySize, tileDisplaySize);
            continue;
          }
          fctx.drawImage(
            mapCanvas,
            j * tileImageSize,
            i * tileImageSize,
            tileImageSize,
            tileImageSize,
            Math.floor((j - leftmostColumn) * tileDisplaySize - displayTopLeftX % tileDisplaySize),
            Math.floor((i - topmostRow) * tileDisplaySize - displayTopLeftY % tileDisplaySize),
            tileDisplaySize,
            tileDisplaySize
          );
        }
      }
      if (inputState.mouseRight) {
        maskCtx.clearRect(0, 0, width, height);
        let radius = 100;
        let gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, radius);
        gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(0.7, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
        maskCtx.fillStyle = gradient;
        maskCtx.fillRect(0, 0, width, height);
        fctx.globalCompositeOperation = "destination-in";
        fctx.drawImage(maskCanvas, 0, 0);
      }
      ctx.drawImage(foregroundCanvas, 0, 0);
      for (let i = topmostRow; i <= bottommostRow; i++) {
        for (let j = leftmostColumn; j <= rightmostColumn; j++) {
          let cellData = mapData[i][j];
          if (!cellData.startsWith("C")) {
            continue;
          }
          let cellId = i + "," + j;
          if (conqueredChallengeTiles.has(cellId)) {
            continue;
          }
          let topLeftX = Math.floor((j - leftmostColumn) * tileDisplaySize - displayTopLeftX % tileDisplaySize);
          let topLeftY = Math.floor((i - topmostRow) * tileDisplaySize - displayTopLeftY % tileDisplaySize);
          cellData = cellData.substring(1);
          let parts = cellData.split("|");
          let cellDiamonds = [];
          for (let k = 0; k < parts.length; k++) {
            if (parts[k].charAt(0) !== "0") {
              cellDiamonds.push([k, parseInt(parts[k])]);
            }
          }
          ctx.fillStyle = "rgb(69, 73, 88)";
          ctx.fillRect(topLeftX, topLeftY, tileDisplaySize, tileDisplaySize);
          ctx.fillStyle = "white";
          ctx.font = "12px Arial";
          drawCellDiamondCounts(ctx, cellDiamonds, topLeftX - 8, topLeftY);
        }
      }
      if (foundCollision) {
        let cellData = mapData[collidedRow][collidedColumn];
        if (cellData.startsWith("C") && !inChallenge) {
          inChallenge = true;
          currentChalllengeRow = collidedRow;
          currentChalllengeColumn = collidedColumn;
          challengState = 0;
        }
      }
      ctx.drawImage(
        playerCanvas,
        0,
        0,
        playerImageWidth,
        playerImageHeight,
        Math.floor(width / 2 - playerDisplayWidth / 2),
        Math.floor(height / 2 - playerDisplayHeight / 2 + 32),
        playerDisplayWidth,
        playerDisplayHeight
      );
      ctx.drawImage(
        treeCanvas,
        Math.floor(treeTopLeftX - displayTopLeftX),
        Math.floor(treeTopLeftY - displayTopLeftY)
      );
      let textUITopLeftX = width / 2 - textUIPanelImageWidth / 2;
      let textUITopLeftY = 8;
      ctx.drawImage(textPanelCanvas, textUITopLeftX, textUITopLeftY);
      if (fullUILines.length !== 0) {
        let textLineHeight = 22;
        let textTopLeftY = textUITopLeftY + textUIPanelImageHeight / 2 - textLineHeight * fullUILines.length / 2;
        let totalTextCharacters = 0;
        for (let i = 0; i < fullUILines.length; i++) {
          totalTextCharacters += fullUILines[i].length;
        }
        let uiStringProgress = Math.min(
          totalTextCharacters,
          Math.floor(fullUILines.length * (currentTimeMillis - uiStringStartTimeMillis) / uiStringProgressIntervalMillis)
        );
        ctx.font = "16px Trebuchet MS";
        let y2 = textTopLeftY + 3;
        let x2 = textUITopLeftX + 14;
        let numCharactersPrinted = 0;
        for (let i = 0; i < fullUILines.length; i++) {
          let line = fullUILines[i];
          let s = line.substring(0, uiStringProgress - numCharactersPrinted);
          let purpleRatio = Math.min(1.1, textIndex * textIndex / 36);
          let topGreen = 225 - 120 * purpleRatio;
          let bottomGreen = 211 - 160 * purpleRatio;
          let topOther = 225 - 30 * purpleRatio;
          let bottomOther = 211 - 60 * purpleRatio;
          let textGradient = ctx.createLinearGradient(x2, y2, x2, y2 + 20);
          textGradient.addColorStop(0, "rgb(" + topOther + "," + topGreen + "," + topOther + ")");
          textGradient.addColorStop(0.4, "rgb(" + topOther + "," + topGreen + "," + topOther + ")");
          textGradient.addColorStop(0.41, "rgb(" + bottomOther + ", " + bottomGreen + "," + bottomOther + ")");
          textGradient.addColorStop(1, "rgb(" + bottomOther + ", " + bottomGreen + "," + bottomOther + ")");
          ctx.fillStyle = "black";
          ctx.fillText(s, x2 + 1, y2 + 1);
          ctx.fillStyle = textGradient;
          ctx.fillText(s, x2, y2);
          y2 += textLineHeight;
          numCharactersPrinted += s.length;
        }
      }
      if (inChallenge) {
        let timeLimitMillis = 1e4;
        let maxHandSize = 5;
        if (challengState === 0) {
          uncommittedUsedCells = [];
          challengeStartTimeMillis = currentTimeMillis;
          let challengeData = mapData[currentChalllengeRow][currentChalllengeColumn];
          challengeData = challengeData.substring(1);
          let parts = challengeData.split("|");
          challengeScore = [];
          for (let type = 0; type < parts.length; type++) {
            if (parts[type] === "0") {
              continue;
            }
            let number = parseInt(parts[type]);
            challengeScore.push([type, 0, number]);
          }
          challengeDeck = [];
          for (let i = 0; i < cards.length; i++) {
            let c = cards[i];
            challengeDeck.push({ row: c.row, column: c.column, diamonds: c.diamonds });
          }
          shuffleArray(challengeDeck);
          challengeHand = [];
          for (let i = 0; i < maxHandSize; i++) {
            challengeHand.push(null);
          }
          challengState++;
          challengeHandChanged = true;
        }
        let challengeMenuTopLeftX = 30;
        let challengeMenuTopLeftY = 80 + 30;
        let challengeMenuWidth = 340;
        let challengeMenuHeight = 358;
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(challengeMenuTopLeftX, challengeMenuTopLeftY, challengeMenuWidth, challengeMenuHeight);
        let x2 = challengeMenuTopLeftX + 8;
        let y2 = challengeMenuTopLeftY + 8;
        let challengeMenuSpacing = 12;
        let challengeMenuInnerWidth = challengeMenuWidth - 16;
        let offsetX = 0;
        let offsetY = 0;
        ctx.fillStyle = "white";
        ctx.font = "22px Arial";
        drawChallengeScore(ctx, challengeScore, x2 + 76, y2 + 52);
        let challengeWon = true;
        for (let i = 0; i < challengeScore.length; i++) {
          if (challengeScore[i][1] < challengeScore[i][2]) {
            challengeWon = false;
            break;
          }
        }
        if (challengeWon) {
          hasProgressed = true;
          inChallenge = false;
          challengState = 0;
          conqueredChallengeTiles.add(currentChalllengeRow + "," + currentChalllengeColumn);
          for (let i = 0; i < uncommittedUsedCells.length; i++) {
            let cell = uncommittedUsedCells[i];
            usedCells.add(cell);
            markedCells.delete(cell);
            for (let j = 0; j < cards.length; j++) {
              let cardId = cards[j].row + "," + cards[j].column;
              if (cell === cardId) {
                cards.splice(j, 1);
                break;
              }
            }
          }
          uncommittedUsedCells = [];
          cleanUpChallengeButtons = true;
          textIndex++;
          setCurrentUIText(textIndex, currentTimeMillis);
          if (textIndex === 7) {
            gameOverTime = currentTimeMillis;
            if (!usedCells.has("102,114")) {
              gameOverState = 1;
            } else {
              gameOverState = 5;
              textIndex = texts.length - 1;
              setCurrentUIText(textIndex, currentTimeMillis);
            }
          }
        }
        y2 += 150 + challengeMenuSpacing;
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(x2 + 8, y2 + 14, challengeMenuInnerWidth - 16, 24);
        let timerFillRatio = (timeLimitMillis - (currentTimeMillis - challengeStartTimeMillis)) / timeLimitMillis;
        if (timerFillRatio <= 0) {
          uncommittedUsedCells = [];
          challengState = 0;
          inChallenge = false;
          cleanUpChallengeButtons = true;
          timerFillRatio = 0;
        }
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.strokeRect(x2 + 8, y2 + 14, challengeMenuInnerWidth - 16, 24);
        ctx.fillStyle = CRYSTAL_BLUE;
        ctx.fillRect(x2 + 8, y2 + 14, (challengeMenuInnerWidth - 16) * timerFillRatio, 24);
        y2 += 50 + challengeMenuSpacing;
        if (playHandButton === void 0) {
          playHandButton = { x: x2, y: y2, w: challengeMenuInnerWidth, h: 50, clicked: false, down: false, hover: false };
        }
        if (playHandButton.down) {
          offsetX = 2;
          offsetY = 2;
        } else {
          offsetX = 0;
          offsetY = 0;
        }
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(playHandButton.x + offsetX, playHandButton.y + offsetY, playHandButton.w, playHandButton.h);
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText("Play Hand", x2 + challengeMenuInnerWidth / 2 + offsetX, y2 + 15 + offsetY);
        if (playHandButton.clicked) {
          ctx.strokeStyle = "white";
          ctx.lineWidth = 2;
          ctx.strokeRect(playHandButton.x + offsetX, playHandButton.y + offsetY, playHandButton.w, playHandButton.h);
          let scoredHandResult = scoreHand(challengeHand);
          for (let i = 0; i < challengeScore.length; i++) {
            let type = challengeScore[i][0];
            challengeScore[i][1] += scoredHandResult[type];
          }
          for (let i = 0; i < challengeHand.length; i++) {
            let card = challengeHand[i];
            if (card === null) {
              continue;
            }
            uncommittedUsedCells.push(card.row + "," + card.column);
            challengeHand[i] = null;
          }
          challengeHandChanged = true;
          playHandButton.clicked = false;
        } else if (playHandButton.down || playHandButton.hover) {
          ctx.strokeStyle = "white";
          ctx.lineWidth = 2;
          ctx.strokeRect(playHandButton.x + offsetX, playHandButton.y + offsetY, playHandButton.w, playHandButton.h);
        }
        y2 += playHandButton.h + challengeMenuSpacing;
        if (challengeQuitButton === void 0) {
          challengeQuitButton = { x: x2, y: y2, w: challengeMenuInnerWidth, h: 50, clicked: false, down: false, hover: false };
        }
        if (challengeQuitButton.down) {
          offsetX = 2;
          offsetY = 2;
        } else {
          offsetX = 0;
          offsetY = 0;
        }
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(challengeQuitButton.x + offsetX, challengeQuitButton.y + offsetY, challengeQuitButton.w, challengeQuitButton.h);
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText("Quit Challenge", x2 + challengeMenuInnerWidth / 2 + offsetX, y2 + 15 + offsetY);
        if (challengeQuitButton.clicked) {
          ctx.strokeStyle = "white";
          ctx.lineWidth = 2;
          ctx.strokeRect(challengeQuitButton.x + offsetX, challengeQuitButton.y + offsetY, challengeQuitButton.w, challengeQuitButton.h);
          uncommittedUsedCells = [];
          challengState = 0;
          inChallenge = false;
          cleanUpChallengeButtons = true;
          challengeQuitButton.clicked = false;
        } else if (challengeQuitButton.down || challengeQuitButton.hover) {
          ctx.strokeStyle = "white";
          ctx.lineWidth = 2;
          ctx.strokeRect(challengeQuitButton.x + offsetX, challengeQuitButton.y + offsetY, challengeQuitButton.w, challengeQuitButton.h);
        }
        let handTopLeftX = 30;
        let handTopLeftY = 480;
        let maxHandWidth = 910;
        let handHeight = 240;
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(handTopLeftX, handTopLeftY, maxHandWidth, handHeight);
        let cardWidth = 128 + 8;
        let cardHeight = handHeight - 16;
        let maxSeparation = 200;
        let separation = maxSeparation;
        let handWidth = maxSeparation * (maxHandSize - 1) + cardWidth;
        if (handWidth > maxHandWidth - 16) {
          separation = Math.floor((maxHandWidth - 16 - cardWidth) / (maxHandSize - 1));
          handWidth = separation * (maxHandSize - 1) + cardWidth;
        }
        let handStartX = handTopLeftX + maxHandWidth / 2 - handWidth / 2;
        let cardArtSize = 112;
        if (challengeHandChanged) {
          challengeHandChanged = false;
          challengeCardButtons = [];
        }
        for (let i = 0; i < maxHandSize; i++) {
          let x3 = handStartX + i * separation;
          let y3 = handTopLeftY + 8;
          let cardButton;
          if (i < challengeCardButtons.length) {
            cardButton = challengeCardButtons[i];
          } else {
            cardButton = { x: x3, y: y3, w: cardWidth, h: cardHeight, clicked: false, down: false, hover: false, dragged: false, initialDown: void 0 };
            challengeCardButtons.push(cardButton);
          }
          if (cardButton.down) {
            x3 += 2;
            y3 += 2;
          }
          let card = challengeHand[i];
          if (card !== null) {
            if (cardButton.dragged) {
              x3 = mouseX + cardButton.initialDown.relX;
              y3 = mouseY + cardButton.initialDown.relY;
              cardButton.x = x3;
              cardButton.y = y3;
              if (!inputState.mouseLeft) {
                let hoveredSlotIndex;
                for (let j = 0; j < challengeCardButtons.length; j++) {
                  if (i === j) {
                    continue;
                  }
                  if (challengeCardButtons[j].hover) {
                    hoveredSlotIndex = j;
                    break;
                  }
                }
                if (hoveredSlotIndex !== void 0) {
                  let tempCard = challengeHand[hoveredSlotIndex];
                  challengeHand[hoveredSlotIndex] = challengeHand[i];
                  challengeHand[i] = tempCard;
                }
                cardButton.dragged = false;
                cardButton.initialDown = void 0;
                challengeHandChanged = true;
              }
            }
            if (cardButton.clicked && !cardButton.dragged) {
              ctx.fillStyle = "rgba(30, 30, 30, 0.7)";
              ctx.fillRect(x3, y3, cardWidth, cardHeight);
              ctx.strokeStyle = "white";
              ctx.lineWidth = 3;
              ctx.strokeRect(x3, y3, cardWidth, cardHeight);
              cardButton.clicked = false;
              cardButton.initialDown = void 0;
            } else if (cardButton.down) {
              if (cardButton.initialDown === void 0) {
                cardButton.initialDown = {
                  x: mouseX,
                  y: mouseY,
                  relX: x3 - mouseX,
                  relY: y3 - mouseY
                };
              } else if (!cardButton.dragged) {
                let dragDistance = Math.sqrt(
                  Math.pow(cardButton.initialDown.x - mouseX, 2) + Math.pow(cardButton.initialDown.y - mouseY, 2)
                );
                if (dragDistance >= 10) {
                  cardButton.dragged = true;
                }
              }
              ctx.fillStyle = "rgba(30, 30, 30, 0.7)";
              ctx.fillRect(x3, y3, cardWidth, cardHeight);
              ctx.strokeStyle = "white";
              ctx.lineWidth = 3;
              ctx.strokeRect(x3, y3, cardWidth, cardHeight);
            } else if (cardButton.hover) {
              ctx.fillStyle = "rgba(30, 30, 30, 0.7)";
              ctx.fillRect(x3, y3, cardWidth, cardHeight);
              ctx.strokeStyle = "white";
              ctx.lineWidth = 3;
              ctx.strokeRect(x3, y3, cardWidth, cardHeight);
            } else {
              ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
              ctx.fillRect(x3, y3, cardWidth, cardHeight);
            }
            x3 += 12;
            y3 += 12;
            ctx.drawImage(
              mapCanvas,
              card.column * tileImageSize,
              card.row * tileImageSize,
              tileImageSize,
              tileImageSize,
              Math.floor(x3),
              Math.floor(y3),
              cardArtSize,
              cardArtSize
            );
            y3 += cardArtSize + 8;
            ctx.font = "14px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "left";
            drawCellDiamondCounts(ctx, card.diamonds, x3 + 14, y3 + 8);
          } else {
            if (cardButton.clicked) {
              ctx.fillStyle = "rgba(30, 30, 30, 0.4)";
              ctx.fillRect(x3, y3, cardWidth, cardHeight);
              ctx.strokeStyle = "white";
              ctx.lineWidth = 3;
              ctx.strokeRect(x3, y3, cardWidth, cardHeight);
              cardButton.clicked = false;
              if (challengeDeck.length > 0) {
                challengeHand[i] = challengeDeck.shift();
                challengeHandChanged = true;
              }
            } else if (cardButton.down) {
              ctx.fillStyle = "rgba(30, 30, 30, 0.4)";
              ctx.fillRect(x3, y3, cardWidth, cardHeight);
              ctx.strokeStyle = "white";
              ctx.lineWidth = 3;
              ctx.strokeRect(x3, y3, cardWidth, cardHeight);
            } else if (cardButton.hover) {
              ctx.fillStyle = "rgba(30, 30, 30, 0.4)";
              ctx.fillRect(x3, y3, cardWidth, cardHeight);
              ctx.strokeStyle = "white";
              ctx.lineWidth = 3;
              ctx.strokeRect(x3, y3, cardWidth, cardHeight);
            } else {
              ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
              ctx.fillRect(x3, y3, cardWidth, cardHeight);
              ctx.lineWidth = 1;
              ctx.strokeStyle = "white";
              ctx.strokeRect(x3, y3, cardWidth, cardHeight);
            }
            x3 += 12;
            y3 += 12;
            ctx.lineWidth = 1;
            ctx.strokeStyle = "white";
            ctx.strokeRect(x3, y3, cardArtSize, cardArtSize);
            if (challengeDeck.length > 0) {
              y3 += cardArtSize + 40;
              x3 += cardArtSize / 2;
              let lineHeight2 = 26;
              ctx.fillStyle = "white";
              ctx.font = "20px Arial";
              ctx.textAlign = "center";
              ctx.fillText("Draw", x3, y3 - lineHeight2 / 2);
              ctx.fillText("Card", x3, y3 + lineHeight2 / 2);
            }
          }
        }
      }
      if (cleanUpChallengeButtons) {
        challengeCardButtons = [];
        playHandButton = void 0;
        challengeQuitButton = void 0;
        cleanUpChallengeButtons = false;
      }
      if (deckViewButton.clicked) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(deckViewButton.x, deckViewButton.y, deckViewButton.w, deckViewButton.h);
        ctx.strokeStyle = "rgba(235, 235, 235, 0.8)";
        ctx.lineWidth = 2;
        ctx.strokeRect(deckViewButton.x, deckViewButton.y, deckViewButton.w, deckViewButton.h);
        deckViewOpen = !deckViewOpen;
        deckViewButton.clicked = false;
      } else if (deckViewButton.down) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(deckViewButton.x + 2, deckViewButton.y + 2, deckViewButton.w, deckViewButton.h);
        ctx.strokeStyle = "rgba(235, 235, 235, 0.8)";
        ctx.lineWidth = 2;
        ctx.strokeRect(deckViewButton.x + 2, deckViewButton.y + 2, deckViewButton.w, deckViewButton.h);
      } else if (deckViewButton.hover) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(deckViewButton.x, deckViewButton.y, deckViewButton.w, deckViewButton.h);
        ctx.strokeStyle = "rgba(235, 235, 235, 0.8)";
        ctx.lineWidth = 2;
        ctx.strokeRect(deckViewButton.x, deckViewButton.y, deckViewButton.w, deckViewButton.h);
      } else {
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(deckViewButton.x, deckViewButton.y, deckViewButton.w, deckViewButton.h);
      }
      ctx.fillStyle = "white";
      ctx.font = "22px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let x = deckViewButton.x + deckViewButton.w / 2;
      let y = deckViewButton.y + deckViewButton.h / 2;
      if (deckViewButton.down) {
        x += 2;
        y += 2;
      }
      let lineHeight = 26;
      ctx.fillText("View", x, y - lineHeight / 2);
      ctx.fillText("Deck", x, y + lineHeight / 2);
      if (deckViewOpen) {
        let topLeftX = 30;
        let topLeftY = 110;
        let deckViewWidth = 910;
        let deckViewHeight = 580;
        ctx.fillStyle = "rgba(40, 40, 40, 0.9)";
        ctx.fillRect(topLeftX, topLeftY, deckViewWidth, deckViewHeight);
        let numColumns = 5;
        let columnWidth = 5 + 64 + 5 + 52 + 5 + 15 + 5 + 10;
        let rowHeight = 5 + 64 + 5 + 10;
        let initializeCardDeleteButtons = cardDeleteButtons.length === 0 || cardsChanged;
        if (initializeCardDeleteButtons) {
          cardDeleteButtons = [];
        }
        cardsChanged = false;
        let deletedCard;
        for (let cardNumber = 0; cardNumber < cards.length; cardNumber++) {
          let card = cards[cardNumber];
          let row = Math.floor(cardNumber / numColumns);
          let column = cardNumber % numColumns;
          let x2 = topLeftX + 10 + column * columnWidth;
          let y2 = topLeftY + 10 + row * rowHeight;
          ctx.fillStyle = "rgba(40, 40, 40, 0.8)";
          ctx.fillRect(x2, y2, columnWidth - 10, rowHeight - 10);
          x2 += 5;
          y2 += 5;
          ctx.drawImage(
            mapCanvas,
            card.column * tileImageSize,
            card.row * tileImageSize,
            tileImageSize,
            tileImageSize,
            Math.floor(x2),
            Math.floor(y2),
            tileDisplaySize,
            tileDisplaySize
          );
          x2 += 52 + 5;
          ctx.fillStyle = "white";
          ctx.font = "12px Arial";
          ctx.textBaseline = "top";
          ctx.textAlign = "left";
          drawCellDiamondCounts(ctx, card.diamonds, x2, y2);
          x2 += 52 + 5;
          let cardDeleteButton;
          if (initializeCardDeleteButtons) {
            cardDeleteButton = { x: x2, y: y2, w: 15, h: 64, clicked: false, down: false, hover: false };
            cardDeleteButtons.push(cardDeleteButton);
          } else {
            cardDeleteButton = cardDeleteButtons[cardNumber];
          }
          ctx.fillStyle = "rgba(100, 0, 0, 0.2)";
          if (cardDeleteButton.clicked) {
            ctx.fillRect(cardDeleteButton.x, cardDeleteButton.y, cardDeleteButton.w, cardDeleteButton.h);
            ctx.strokeStyle = "rgba(235, 235, 235, 0.8)";
            ctx.lineWidth = 2;
            ctx.strokeRect(cardDeleteButton.x, cardDeleteButton.y, cardDeleteButton.w, cardDeleteButton.h);
            deletedCard = cardNumber;
            cardDeleteButton.clicked = false;
            ctx.strokeStyle = "rgb(100, 40, 40)";
            ctx.lineWidth = 3;
            drawX(ctx, cardDeleteButton.x + cardDeleteButton.w / 2, cardDeleteButton.y + cardDeleteButton.h / 2);
          } else if (cardDeleteButton.down) {
            ctx.fillRect(cardDeleteButton.x + 2, cardDeleteButton.y + 2, cardDeleteButton.w, cardDeleteButton.h);
            ctx.strokeStyle = "rgba(235, 235, 235, 0.8)";
            ctx.lineWidth = 2;
            ctx.strokeRect(cardDeleteButton.x + 2, cardDeleteButton.y + 2, cardDeleteButton.w, cardDeleteButton.h);
            ctx.strokeStyle = "rgb(100, 40, 40)";
            ctx.lineWidth = 3;
            drawX(ctx, cardDeleteButton.x + cardDeleteButton.w / 2 + 2, cardDeleteButton.y + cardDeleteButton.h / 2 + 2);
          } else if (cardDeleteButton.hover) {
            ctx.fillRect(cardDeleteButton.x, cardDeleteButton.y, cardDeleteButton.w, cardDeleteButton.h);
            ctx.strokeStyle = "rgba(235, 235, 235, 0.8)";
            ctx.lineWidth = 2;
            ctx.strokeRect(cardDeleteButton.x, cardDeleteButton.y, cardDeleteButton.w, cardDeleteButton.h);
            ctx.strokeStyle = "rgb(100, 40, 40)";
            ctx.lineWidth = 3;
            drawX(ctx, cardDeleteButton.x + cardDeleteButton.w / 2, cardDeleteButton.y + cardDeleteButton.h / 2);
          } else {
            ctx.fillRect(cardDeleteButton.x, cardDeleteButton.y, cardDeleteButton.w, cardDeleteButton.h);
            ctx.strokeStyle = "rgb(100, 40, 40)";
            ctx.lineWidth = 3;
            drawX(ctx, cardDeleteButton.x + cardDeleteButton.w / 2, cardDeleteButton.y + cardDeleteButton.h / 2);
          }
        }
        if (deletedCard !== void 0) {
          cardDeleteButtons = [];
          let cardToDelete = cards[deletedCard];
          let deletedCardId = cardToDelete.row + "," + cardToDelete.column;
          markedCells.delete(deletedCardId);
          cards.splice(deletedCard, 1);
          cardsChanged = true;
        }
      }
    }
    if (gameOverState > 0) {
      let gameOverTimeElapsedMillis = currentTimeMillis - gameOverTime;
      if (gameOverState === 1) {
        let completionRatio = Math.min(1, gameOverTimeElapsedMillis / 2e4);
        globalIntensityModifier = 1 - 1 * completionRatio;
        globalPeriodModifier = 1 - 0.2 * completionRatio;
        if (completionRatio === 1) {
          gameOverState = 2;
          gameOverTime = currentTimeMillis;
        }
      } else if (gameOverState === 2) {
        if (gameOverTimeElapsedMillis >= 3500) {
          uiStringProgressIntervalMillis = 60;
          textIndex = 8;
          setCurrentUIText(textIndex, currentTimeMillis);
          gameOverTime = currentTimeMillis;
          gameOverState = 3;
        }
      } else if (gameOverState === 3) {
        let completionRatio = Math.min(1, gameOverTimeElapsedMillis / 4e3);
        gridAlpha = 1 - completionRatio;
        if (completionRatio === 1) {
          gameOverTime = currentTimeMillis;
          gameOverState = 4;
        }
      } else if (gameOverState === 4) {
        let completionRatio = Math.min(1, gameOverTimeElapsedMillis / 8e3);
        ctx.fillStyle = "rgba(0, 0, 0, " + completionRatio + ")";
        ctx.fillRect(0, 0, width, height);
      } else if (gameOverState === 5) {
        let completionRatio = Math.min(1, gameOverTimeElapsedMillis / 2e4);
        globalIntensityModifier = 1 - 0.5 * completionRatio;
        globalPeriodModifier = 1 + 1 * completionRatio;
        globalPainModifier = 1 + 10 * completionRatio;
        ctx.fillStyle = "rgba(183, 96, 166, " + completionRatio + ")";
        ctx.fillRect(0, 0, width, height);
        if (completionRatio === 1) {
          window.close();
        }
      }
    }
    if (previousTimeMillis !== void 0) {
      let fps = 1e3 / deltaMillis;
      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.textBaseline = "top";
      ctx.textAlign = "left";
    }
    ctx.restore();
    previousTimeMillis = currentTimeMillis;
    previousDisplayTopLeftX = displayTopLeftX;
    previousDisplayTopLeftY = displayTopLeftY;
    window.requestAnimationFrame(draw);
  }
  function handleKeyDown(e) {
    if (e.repeat) {
      return;
    }
    if (e.code === "KeyW" || e.code === "ArrowUp") {
      inputState.moveUp = true;
    } else if (e.code === "KeyS" || e.code === "ArrowDown") {
      inputState.moveDown = true;
    } else if (e.code === "KeyA" || e.code === "ArrowLeft") {
      inputState.moveLeft = true;
    } else if (e.code === "KeyD" || e.code === "ArrowRight") {
      inputState.moveRight = true;
    }
  }
  function handleKeyUp(e) {
    if (e.repeat) {
      return;
    }
    if (e.code === "KeyW" || e.code === "ArrowUp") {
      inputState.moveUp = false;
    } else if (e.code === "KeyS" || e.code === "ArrowDown") {
      inputState.moveDown = false;
    } else if (e.code === "KeyA" || e.code === "ArrowLeft") {
      inputState.moveLeft = false;
    } else if (e.code === "KeyD" || e.code === "ArrowRight") {
      inputState.moveRight = false;
    }
  }
  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    let interactables = [...cardDeleteButtons, deckViewButton, ...challengeCardButtons, challengeQuitButton, playHandButton, ...interactableCells];
    let firstHovered = true;
    for (let i = 0; i < interactables.length; i++) {
      let interactable = interactables[i];
      if (interactable === void 0) {
        continue;
      }
      if (mouseOver(interactable) && firstHovered && (interactable.dragged === void 0 || interactable.dragged === false)) {
        interactable.hover = true;
        firstHovered = false;
      } else {
        interactable.hover = false;
        interactable.down = false;
      }
    }
  }
  function handleMouseDown(e) {
    if (e.button === 0) {
      inputState.mouseLeft = true;
      let interactables = [...cardDeleteButtons, deckViewButton, ...challengeCardButtons, challengeQuitButton, playHandButton, ...interactableCells];
      let firstHovered = true;
      for (let i = 0; i < interactables.length; i++) {
        let interactable = interactables[i];
        if (interactable === void 0) {
          continue;
        }
        if (mouseOver(interactable) && firstHovered && (interactable.dragged === void 0 || interactable.dragged === false)) {
          interactable.down = true;
          firstHovered = false;
        } else {
          interactable.down = false;
        }
      }
    } else if (e.button === 2) {
      inputState.mouseRight = true;
    }
  }
  function handleMouseUp(e) {
    if (e.button === 0) {
      inputState.mouseLeft = false;
      let interactables = [...cardDeleteButtons, deckViewButton, ...challengeCardButtons, challengeQuitButton, playHandButton, ...interactableCells];
      for (let i = 0; i < interactables.length; i++) {
        let interactable = interactables[i];
        if (interactable === void 0) {
          continue;
        }
        if (mouseOver(interactable) && interactables[i].down && (interactable.dragged === void 0 || interactable.dragged === false)) {
          interactable.clicked = true;
          interactable.down = false;
          break;
        }
      }
    } else if (e.button === 2) {
      inputState.mouseRight = false;
    }
  }
  function getMoveVector(deltaMillis) {
    let moveVector = { x: 0, y: 0 };
    if (inputState.moveUp) {
      moveVector.y -= 1;
    }
    if (inputState.moveDown) {
      moveVector.y += 1;
    }
    if (inputState.moveLeft) {
      moveVector.x -= 1;
    }
    if (inputState.moveRight) {
      moveVector.x += 1;
    }
    let magnitude = Math.sqrt(moveVector.x * moveVector.x + moveVector.y * moveVector.y);
    if (magnitude > 0) {
      moveVector.x /= magnitude;
      moveVector.y /= magnitude;
    }
    let deltaSpeed = deltaMillis / 1e3 * playerMoveSpeed;
    moveVector.x *= deltaSpeed;
    moveVector.y *= deltaSpeed;
    return moveVector;
  }
  function strokeRectAnim(ctx2, topLeftX, topLeftY, w, h, currentTimeMillis) {
    let points = doEffect(topLeftX, topLeftY, w, h, currentTimeMillis);
    ctx2.beginPath();
    ctx2.moveTo(points[0].x, points[0].y);
    ctx2.lineTo(points[1].x, points[1].y);
    ctx2.lineTo(points[2].x, points[2].y);
    ctx2.lineTo(points[3].x, points[3].y);
    ctx2.closePath();
    ctx2.stroke();
  }
  function fillRectAnim(ctx2, topLeftX, topLeftY, w, h, currentTimeMillis) {
    let points = doEffect(topLeftX, topLeftY, w, h, currentTimeMillis);
    ctx2.beginPath();
    ctx2.moveTo(points[0].x, points[0].y);
    ctx2.lineTo(points[1].x, points[1].y);
    ctx2.lineTo(points[2].x, points[2].y);
    ctx2.lineTo(points[3].x, points[3].y);
    ctx2.closePath();
    ctx2.fill();
  }
  function doEffect(topLeftX, topLeftY, w, h, currentTimeMillis) {
    let centerX = treeCenterX - displayTopLeftX;
    let centerY = treeCenterY - displayTopLeftY;
    let points = [
      { x: topLeftX, y: topLeftY },
      { x: topLeftX + w, y: topLeftY },
      { x: topLeftX + w, y: topLeftY + h },
      { x: topLeftX, y: topLeftY + h }
    ];
    for (let i = 0; i < points.length; i++) {
      let x = points[i].x;
      let y = points[i].y;
      let d = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      let intensity = calculateIntensity(d) * globalIntensityModifier;
      let radians = (10 * d + currentTimeMillis) / 1e3 * globalPeriodModifier;
      let shift = intensity * Math.cos(radians);
      x += shift * (x - centerX) / d;
      y += shift * (y - centerY) / d;
      let derivative = -Math.sin(radians);
      let factor = intensity * derivative * derivative * globalPainModifier;
      x += Math.random() * factor;
      y += Math.random() * factor;
      points[i].x = x;
      points[i].y = y;
    }
    return points;
  }
  function calculateIntensity(distance) {
    if (distance > 1920) {
      return 2.5 - distance / 3840;
    } else if (640 < distance && distance < 1920) {
      return 20 - 18 * (distance - 640) / 1280;
    } else if (distance < 640) {
      return 32 - 12 * distance / 640;
    }
  }
  function drawX(ctx2, centerX, centerY) {
    ctx2.moveTo(centerX + 4, centerY - 4);
    ctx2.lineTo(centerX - 4, centerY + 4);
    ctx2.stroke();
    ctx2.moveTo(centerX - 4, centerY - 4);
    ctx2.lineTo(centerX + 4, centerY + 4);
    ctx2.stroke();
  }
  function drawCellDiamondCounts(ctx2, cellDiamonds, topLeftX, topLeftY) {
    let diamondSlotHeight = 20;
    let diamondSlotTotalHeight = diamondSlotHeight * cellDiamonds.length;
    let diamondSlotWidth = 30;
    let diamondDisplayTopLeftX = topLeftX + tileDisplaySize / 2 - diamondSlotWidth / 2;
    let diamondDisplayTopLeftY = topLeftY + tileDisplaySize / 2 - diamondSlotTotalHeight / 2;
    for (let k = 0; k < cellDiamonds.length; k++) {
      let x = diamondDisplayTopLeftX;
      let y = diamondDisplayTopLeftY + k * diamondSlotHeight;
      let diamondTypeIndex = cellDiamonds[k][0];
      let numDiamonds = cellDiamonds[k][1];
      y += 2;
      drawDiamond(ctx2, diamondTypeIndex, x, y);
      x += 20;
      y += 2;
      ctx2.fillText("x" + numDiamonds, x, y);
    }
  }
  function drawChallengeScore(ctx2, cellDiamonds, topLeftX, topLeftY) {
    let diamondSlotHeight = 38;
    let diamondSlotTotalHeight = diamondSlotHeight * cellDiamonds.length;
    let diamondSlotWidth = 40;
    let diamondDisplayTopLeftX = topLeftX + tileDisplaySize / 2 - diamondSlotWidth / 2;
    let diamondDisplayTopLeftY = topLeftY + tileDisplaySize / 2 - diamondSlotTotalHeight / 2;
    for (let k = 0; k < cellDiamonds.length; k++) {
      let x = diamondDisplayTopLeftX;
      let y = diamondDisplayTopLeftY + k * diamondSlotHeight;
      let diamondTypeIndex = cellDiamonds[k][0];
      let numDiamonds = cellDiamonds[k][1];
      let requiredDiamonds = cellDiamonds[k][2];
      y += 2;
      drawDiamond(ctx2, diamondTypeIndex, x, y, 32);
      x += 44;
      y += 7;
      ctx2.fillText(numDiamonds + " / " + requiredDiamonds, x, y);
    }
  }
  function drawDiamond(ctx2, diamondTypeIndex, dx, dy, destinationSize = 16) {
    let sy = 0;
    let sx = diamondTypeIndex * diamondImageSize;
    ctx2.drawImage(
      diamondCanvas,
      sx,
      sy,
      diamondImageSize,
      diamondImageSize,
      dx,
      dy,
      destinationSize,
      destinationSize
    );
  }
  function setCurrentUIText(textIndex2, currentTimeMillis) {
    fullUILines = texts[textIndex2];
    uiStringStartTimeMillis = currentTimeMillis;
  }
  function mouseOver(rect) {
    return mouseX >= rect.x && mouseY >= rect.y && mouseX <= rect.x + rect.w && mouseY <= rect.y + rect.h;
  }
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  function scoreHand(hand) {
    let score = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < hand.length; i++) {
      let card = hand[i];
      if (card === null) {
        continue;
      }
      for (let j = 0; j < card.diamonds.length; j++) {
        let type = card.diamonds[j][0];
        let number = card.diamonds[j][1];
        score[type] += number;
      }
    }
    return score;
  }
  function collidesWithSolidTiles(topLeftX, topLeftY) {
    let playerHitboxTopLeftXTile = (playerHitboxTopLeftX + topLeftX) / tileDisplaySize;
    let playerHitboxTopLeftYTile = (playerHitboxTopLeftY + topLeftY) / tileDisplaySize;
    let leftColumn = Math.floor(playerHitboxTopLeftXTile);
    let rightColumn = Math.floor(playerHitboxTopLeftXTile + playerHitboxWidthTile);
    let topRow = Math.floor(playerHitboxTopLeftYTile);
    let bottomRow = Math.floor(playerHitboxTopLeftYTile + playerHitboxHeightTile);
    for (let i = topRow; i <= bottomRow; i++) {
      for (let j = leftColumn; j <= rightColumn; j++) {
        let cellId = i + "," + j;
        if (mapData[i][j] === "-" || mapData[i][j].startsWith("C") && !conqueredChallengeTiles.has(cellId) || usedCells.has(cellId)) {
          return { i, j };
        }
      }
    }
    return void 0;
  }
})();
//# sourceMappingURL=bundle.js.map
