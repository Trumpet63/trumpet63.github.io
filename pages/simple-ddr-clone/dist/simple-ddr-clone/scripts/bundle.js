(() => {
  // src/index.ts
  var Config = class {
  };
  var KeyConfig = class {
  };
  var keyBindingTable = [
    [void 0, "bindingButtonLane0" /* LANE0 */, 0 /* LANE0 */],
    [void 0, "bindingButtonLane1" /* LANE1 */, 1 /* LANE1 */],
    [void 0, "bindingButtonLane2" /* LANE2 */, 2 /* LANE2 */],
    [void 0, "bindingButtonLane3" /* LANE3 */, 3 /* LANE3 */],
    [void 0, "bindingButtonQuit" /* QUIT */, 4 /* QUIT */],
    [void 0, "bindingButtonRestart" /* RESTART */, 5 /* RESTART */]
  ];
  var keyNotBoundText = "Not Bound";
  function localStorageIsAvailable() {
    let storage;
    try {
      storage = window["localStorage"];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return e instanceof DOMException && e.name === "QuotaExceededError" && // acknowledge QuotaExceededError only if there's something already stored
      storage && storage.length !== 0;
    }
  }
  var configStorageKey = "config";
  var canStoreConfig = localStorageIsAvailable();
  var config;
  var doneLoadingConfig = false;
  if (canStoreConfig) {
    let configToLoad = window.localStorage.getItem(configStorageKey);
    if (configToLoad !== null) {
      config = JSON.parse(configToLoad);
      updateUIBasedOnConfig();
      writeKeyBindsToTable();
      console.log("Config loaded from local storage");
    }
  } else {
    console.warn("Failed to access local storage. Saving player settings is disabled.");
  }
  function updateUIBasedOnConfig() {
    let difficultyRadioEasy = document.getElementById("difficultyRadioEasy");
    let difficultyRadioHard = document.getElementById("difficultyRadioHard");
    difficultyRadioEasy.checked = config.difficulty === 0 /* EASY */;
    difficultyRadioHard.checked = config.difficulty === 1 /* HARD */;
    let volumeRangeInput2 = document.getElementById("volumeRangeInput");
    let volumeManualInput2 = document.getElementById("volumeManualInput");
    volumeRangeInput2.value = config.volume.toString();
    volumeManualInput2.value = config.volume.toString();
    let scrollRadioDown = document.getElementById("scrollRadioDown");
    let scrollRadioUp = document.getElementById("scrollRadioUp");
    scrollRadioDown.checked = config.scrollDirection === 0 /* DOWN */;
    scrollRadioUp.checked = config.scrollDirection === 1 /* UP */;
    let keepSquareInput2 = document.getElementById("keepSquareInput");
    keepSquareInput2.checked = config.keepSquare;
    let noteWidthRangeInput2 = document.getElementById("noteWidthRangeInput");
    let noteWidthManualInput2 = document.getElementById("noteWidthManualInput");
    noteWidthRangeInput2.value = config.noteWidth.toString();
    noteWidthManualInput2.value = config.noteWidth.toString();
    let noteHeightRangeInput2 = document.getElementById("noteHeightRangeInput");
    let noteHeightManualInput2 = document.getElementById("noteHeightManualInput");
    noteHeightRangeInput2.value = config.noteHeight.toString();
    noteHeightManualInput2.value = config.noteHeight.toString();
    let laneGapRangeInput2 = document.getElementById("laneGapRangeInput");
    let laneGapManualInput2 = document.getElementById("laneGapManualInput");
    laneGapRangeInput2.value = config.laneGap.toString();
    laneGapManualInput2.value = config.laneGap.toString();
    let receptorPositionRangeInput2 = document.getElementById("receptorPositionRangeInput");
    let receptorPositionManualInput2 = document.getElementById("receptorPositionManualInput");
    receptorPositionRangeInput2.value = config.receptorPosition.toString();
    receptorPositionManualInput2.value = config.receptorPosition.toString();
    let scrollSpeedRangeInput2 = document.getElementById("scrollSpeedRangeInput");
    let scrollSpeedManualInput2 = document.getElementById("scrollSpeedManualInput");
    scrollSpeedRangeInput2.value = config.scrollSpeed.toString();
    scrollSpeedManualInput2.value = config.scrollSpeed.toString();
    let audioOffsetInput2 = document.getElementById("audioOffsetInput");
    audioOffsetInput2.value = config.audioOffsetMillis.toString();
    let videoOffsetInput2 = document.getElementById("videoOffsetInput");
    videoOffsetInput2.value = config.videoOffsetMillis.toString();
    let disableJudgementTextInput2 = document.getElementById("disableJudgementTextInput");
    disableJudgementTextInput2.checked = config.disableJudgementText;
    let bindingButtonLane0 = document.getElementById("bindingButtonLane0" /* LANE0 */);
    bindingButtonLane0.innerText = config.keyConfig.lane0 === void 0 ? keyNotBoundText : removeKeyFromCode(config.keyConfig.lane0);
    let bindingButtonLane1 = document.getElementById("bindingButtonLane1" /* LANE1 */);
    bindingButtonLane1.innerText = config.keyConfig.lane1 === void 0 ? keyNotBoundText : removeKeyFromCode(config.keyConfig.lane1);
    let bindingButtonLane2 = document.getElementById("bindingButtonLane2" /* LANE2 */);
    bindingButtonLane2.innerText = config.keyConfig.lane2 === void 0 ? keyNotBoundText : removeKeyFromCode(config.keyConfig.lane2);
    let bindingButtonLane3 = document.getElementById("bindingButtonLane3" /* LANE3 */);
    bindingButtonLane3.innerText = config.keyConfig.lane3 === void 0 ? keyNotBoundText : removeKeyFromCode(config.keyConfig.lane3);
    let bindingButtonQuit = document.getElementById("bindingButtonQuit" /* QUIT */);
    bindingButtonQuit.innerText = config.keyConfig.quit === void 0 ? keyNotBoundText : removeKeyFromCode(config.keyConfig.quit);
    let bindingButtonRestart = document.getElementById("bindingButtonRestart" /* RESTART */);
    bindingButtonRestart.innerText = config.keyConfig.restart === void 0 ? keyNotBoundText : removeKeyFromCode(config.keyConfig.restart);
  }
  if (config === void 0) {
    setConfigToDefault();
    writeKeyBindsToTable();
    console.log("Config set to default");
    doneLoadingConfig = true;
  }
  function setConfigToDefault() {
    config = new Config();
    config.difficulty = 0 /* EASY */;
    config.volume = 20;
    config.scrollDirection = 0 /* DOWN */;
    config.keepSquare = true;
    config.noteWidth = 50;
    config.noteHeight = 50;
    config.laneGap = 20;
    config.receptorPosition = 20;
    config.scrollSpeed = 200;
    config.audioOffsetMillis = 0;
    config.videoOffsetMillis = 0;
    let keyConfig = new KeyConfig();
    keyConfig.lane0 = "KeyS";
    keyConfig.lane1 = "KeyD";
    keyConfig.lane2 = "KeyJ";
    keyConfig.lane3 = "KeyK";
    keyConfig.quit = "Escape";
    keyConfig.restart = "Slash";
    config.keyConfig = keyConfig;
  }
  function writeKeyBindsToTable() {
    let bindingsToWrite = [
      { code: config.keyConfig.lane0, action: 0 /* LANE0 */ },
      { code: config.keyConfig.lane1, action: 1 /* LANE1 */ },
      { code: config.keyConfig.lane2, action: 2 /* LANE2 */ },
      { code: config.keyConfig.lane3, action: 3 /* LANE3 */ },
      { code: config.keyConfig.quit, action: 4 /* QUIT */ },
      { code: config.keyConfig.restart, action: 5 /* RESTART */ }
    ];
    for (let i = 0; i < keyBindingTable.length; i++) {
      for (let j = 0; j < bindingsToWrite.length; j++) {
        if (keyBindingTable[i][2] === bindingsToWrite[j].action) {
          keyBindingTable[i][0] = bindingsToWrite[j].code;
        }
      }
    }
  }
  var shouldSaveConfig = false;
  var timeOfRequestedSaveMillis = -Infinity;
  var minimumSaveDelayMillis = 200;
  function saveConfig(currentTimeMillis) {
    if (currentTimeMillis - timeOfRequestedSaveMillis > minimumSaveDelayMillis) {
      let configToSave = JSON.stringify(config);
      window.localStorage.setItem(configStorageKey, configToSave);
      shouldSaveConfig = false;
      console.log("Config Saved");
    }
  }
  function setShouldSaveConfig() {
    if (canStoreConfig) {
      shouldSaveConfig = true;
      timeOfRequestedSaveMillis = Math.min(timeOfRequestedSaveMillis, performance.now());
    }
  }
  var playButton = document.getElementById("playButton");
  playButton.onclick = (event) => {
    playButton.disabled = true;
    let difficultyRadios = document.getElementsByName("difficultyRadio");
    for (let i = 0; i < difficultyRadios.length; i++) {
      difficultyRadios[i].disabled = true;
    }
    for (let i = 0; i < currentStepfile.length; i++) {
      let lane = currentStepfile[i];
      for (let j = 0; j < lane.length; j++) {
        lane[j].state = 0 /* DEFAULT */;
      }
    }
    nextUnhitNoteIndexes = [0, 0, 0, 0];
    restartAudio(countdownDurationSeconds);
    gameStartMillis = event.timeStamp + countdownDurationSeconds * 1e3;
    countdownStartMillis = event.timeStamp;
    gameState = 2 /* COUNTDOWN */;
    judgementEvents = [];
    keyEvents = [];
    nextKeyEventToProcess = 0;
    for (let i = 0; i < judgementBars.length; i++) {
      judgementBars[i].count = 0;
    }
    judgementsCounted = false;
    judgementAverage = void 0;
    judgementAbsAverage = void 0;
  };
  function restartAudio(delaySeconds) {
    stopAudio();
    audioSource = audioContext.createBufferSource();
    audioSource.buffer = audioBuffer;
    audioSource.connect(gainNode).connect(audioContext.destination);
    audioSource.start(audioContext.currentTime + delaySeconds);
    audioIsStarted = true;
  }
  function stopAudio() {
    if (audioIsStarted) {
      audioSource.stop();
      audioIsStarted = false;
    }
  }
  var difficultySelectContainer = document.getElementById("difficultySelectContainer");
  difficultySelectContainer.oninput = (event) => {
    let selectedDifficultyString = event.target.value;
    if (selectedDifficultyString === "easy") {
      config.difficulty = 0 /* EASY */;
      currentStepfile = easyStepfile;
    } else if (selectedDifficultyString === "hard") {
      config.difficulty = 1 /* HARD */;
      currentStepfile = hardStepfile;
    }
    setShouldSaveConfig();
  };
  var muteInput = document.getElementById("muteInput");
  var muted = true;
  muteInput.oninput = () => {
    muted = muteInput.checked;
    if ((gameState === 0 /* LOADING */ || gameState === 1 /* DEMO */) && !muted && !audioIsStarted) {
      audioSource.start(audioContext.currentTime, demoGameTimeSeconds);
      audioIsStarted = true;
    }
    updateGain();
  };
  var volumeRangeInput = document.getElementById("volumeRangeInput");
  var volumeManualInput = document.getElementById("volumeManualInput");
  volumeRangeInput.oninput = () => {
    let floatValue = parseFloat(volumeRangeInput.value);
    if (isNaN(floatValue)) {
      return;
    }
    volumeManualInput.value = floatValue.toString();
    config.volume = floatValue;
    updateGain();
    setShouldSaveConfig();
  };
  volumeManualInput.oninput = () => {
    let floatValue = parseFloat(volumeManualInput.value);
    if (isNaN(floatValue)) {
      return;
    }
    volumeRangeInput.value = floatValue.toString();
    config.volume = floatValue;
    updateGain();
    setShouldSaveConfig();
  };
  function updateGain() {
    if (gainNode !== void 0) {
      if (muted) {
        gainNode.gain.value = 0;
      } else {
        gainNode.gain.value = config.volume / 100;
      }
    }
  }
  var scrollOptionContainer = document.getElementById("scrollOptionContainer");
  scrollOptionContainer.oninput = (event) => {
    let selectedScrollDirectionString = event.target.value;
    if (selectedScrollDirectionString === "down") {
      config.scrollDirection = 0 /* DOWN */;
    } else if (selectedScrollDirectionString === "up") {
      config.scrollDirection = 1 /* UP */;
    }
    setShouldSaveConfig();
  };
  var keepSquareInput = document.getElementById("keepSquareInput");
  keepSquareInput.oninput = () => {
    config.keepSquare = keepSquareInput.checked;
    setShouldSaveConfig();
  };
  var noteWidthRangeInput = document.getElementById("noteWidthRangeInput");
  var noteWidthManualInput = document.getElementById("noteWidthManualInput");
  noteWidthRangeInput.oninput = () => {
    let floatValue = parseFloat(noteWidthRangeInput.value);
    if (isNaN(floatValue)) {
      return;
    }
    noteWidthManualInput.value = floatValue.toString();
    updateNoteWidth(floatValue);
    setShouldSaveConfig();
  };
  noteWidthManualInput.oninput = () => {
    let floatValue = parseFloat(noteWidthManualInput.value);
    if (isNaN(floatValue)) {
      return;
    }
    noteWidthRangeInput.value = floatValue.toString();
    updateNoteWidth(floatValue);
    setShouldSaveConfig();
  };
  function updateNoteWidth(newValue) {
    config.noteWidth = newValue;
    if (config.keepSquare) {
      noteHeightManualInput.value = config.noteWidth.toString();
      noteHeightRangeInput.value = config.noteWidth.toString();
      config.noteHeight = config.noteWidth;
    }
    resizeSpritesheet(
      noteskinImage,
      noteskinOriginalSpriteWidth,
      noteskinOriginalSpriteHeight,
      noteskinSpritesheet,
      noteskinCtx,
      config.noteWidth,
      config.noteHeight
    );
    resizeSpritesheet(
      receptorImage,
      receptorOriginalSpriteWidth,
      receptorOriginalSpriteHeight,
      receptorSpritesheet,
      receptorCtx,
      config.noteWidth,
      config.noteHeight
    );
  }
  var noteHeightRangeInput = document.getElementById("noteHeightRangeInput");
  var noteHeightManualInput = document.getElementById("noteHeightManualInput");
  noteHeightRangeInput.oninput = () => {
    let floatValue = parseFloat(noteHeightRangeInput.value);
    if (isNaN(floatValue)) {
      return;
    }
    noteHeightManualInput.value = floatValue.toString();
    updateNoteHeight(floatValue);
    setShouldSaveConfig();
  };
  noteHeightManualInput.oninput = () => {
    let floatValue = parseFloat(noteHeightManualInput.value);
    if (isNaN(floatValue)) {
      return;
    }
    noteHeightRangeInput.value = floatValue.toString();
    updateNoteHeight(floatValue);
    setShouldSaveConfig();
  };
  function updateNoteHeight(newValue) {
    config.noteHeight = newValue;
    if (config.keepSquare) {
      noteWidthManualInput.value = config.noteHeight.toString();
      noteWidthRangeInput.value = config.noteHeight.toString();
      config.noteWidth = config.noteHeight;
    }
    resizeSpritesheet(
      noteskinImage,
      noteskinOriginalSpriteWidth,
      noteskinOriginalSpriteHeight,
      noteskinSpritesheet,
      noteskinCtx,
      config.noteWidth,
      config.noteHeight
    );
    resizeSpritesheet(
      receptorImage,
      receptorOriginalSpriteWidth,
      receptorOriginalSpriteHeight,
      receptorSpritesheet,
      receptorCtx,
      config.noteWidth,
      config.noteHeight
    );
  }
  var laneGapRangeInput = document.getElementById("laneGapRangeInput");
  var laneGapManualInput = document.getElementById("laneGapManualInput");
  laneGapRangeInput.oninput = () => {
    let floatValue = parseFloat(laneGapRangeInput.value);
    if (isNaN(floatValue)) {
      return;
    }
    laneGapManualInput.value = floatValue.toString();
    updateLaneGap(floatValue);
    setShouldSaveConfig();
  };
  laneGapManualInput.oninput = () => {
    let floatValue = parseFloat(laneGapManualInput.value);
    if (isNaN(floatValue)) {
      return;
    }
    laneGapRangeInput.value = floatValue.toString();
    updateLaneGap(floatValue);
    setShouldSaveConfig();
  };
  function updateLaneGap(newValue) {
    config.laneGap = newValue;
  }
  var receptorPositionRangeInput = document.getElementById("receptorPositionRangeInput");
  var receptorPositionManualInput = document.getElementById("receptorPositionManualInput");
  receptorPositionRangeInput.oninput = () => {
    let floatValue = parseFloat(receptorPositionRangeInput.value);
    if (isNaN(floatValue)) {
      return;
    }
    receptorPositionManualInput.value = floatValue.toString();
    updateReceptorPosition(floatValue);
    setShouldSaveConfig();
  };
  receptorPositionManualInput.oninput = () => {
    let floatValue = parseFloat(receptorPositionManualInput.value);
    if (isNaN(floatValue)) {
      return;
    }
    receptorPositionRangeInput.value = floatValue.toString();
    updateReceptorPosition(floatValue);
    setShouldSaveConfig();
  };
  function updateReceptorPosition(newValue) {
    config.receptorPosition = newValue;
  }
  var scrollSpeedRangeInput = document.getElementById("scrollSpeedRangeInput");
  var scrollSpeedManualInput = document.getElementById("scrollSpeedManualInput");
  scrollSpeedRangeInput.oninput = () => {
    let floatValue = parseFloat(scrollSpeedRangeInput.value);
    if (isNaN(floatValue)) {
      return;
    }
    scrollSpeedManualInput.value = floatValue.toString();
    updateScrollSpeed(floatValue);
    setShouldSaveConfig();
  };
  scrollSpeedManualInput.oninput = () => {
    let floatValue = parseFloat(scrollSpeedManualInput.value);
    if (isNaN(floatValue)) {
      return;
    }
    scrollSpeedRangeInput.value = floatValue.toString();
    updateScrollSpeed(floatValue);
    setShouldSaveConfig();
  };
  function updateScrollSpeed(newValue) {
    config.scrollSpeed = newValue;
  }
  var audioOffsetInput = document.getElementById("audioOffsetInput");
  audioOffsetInput.oninput = () => {
    let floatValue = parseFloat(audioOffsetInput.value);
    if (isNaN(floatValue)) {
      return;
    }
    updateAudioOffset(floatValue);
    setShouldSaveConfig();
  };
  function updateAudioOffset(newValue) {
    config.audioOffsetMillis = newValue;
  }
  var videoOffsetInput = document.getElementById("videoOffsetInput");
  videoOffsetInput.oninput = () => {
    let floatValue = parseFloat(videoOffsetInput.value);
    if (isNaN(floatValue)) {
      return;
    }
    updateVisualOffset(floatValue);
    setShouldSaveConfig();
  };
  function updateVisualOffset(newValue) {
    config.videoOffsetMillis = newValue;
  }
  var disableJudgementTextInput = document.getElementById("disableJudgementTextInput");
  disableJudgementTextInput.oninput = () => {
    config.disableJudgementText = disableJudgementTextInput.checked;
  };
  var gameWidth = 500;
  var gameHeight = 900;
  var gameCanvas = document.getElementById("gameCanvas");
  gameCanvas.width = gameWidth;
  gameCanvas.height = gameHeight;
  var gameCtx = gameCanvas.getContext("2d");
  var noteskinSpritesheet = document.createElement("canvas");
  var noteskinCtx = noteskinSpritesheet.getContext("2d");
  var receptorSpritesheet = document.createElement("canvas");
  var receptorCtx = receptorSpritesheet.getContext("2d");
  gameCanvas.addEventListener("click", (event) => {
    if (exitX < event.offsetX && event.offsetX < exitX + exitWidth && exitY < event.offsetY && event.offsetY < exitY + exitHeight && gameState === 4 /* RESULTS */) {
      playButton.disabled = false;
      let difficultyRadios = document.getElementsByName("difficultyRadio");
      for (let i = 0; i < difficultyRadios.length; i++) {
        difficultyRadios[i].disabled = false;
      }
      demoAnimationStartTimeMillis = void 0;
      for (let i = 0; i < currentStepfile.length; i++) {
        let lane = currentStepfile[i];
        for (let j = 0; j < lane.length; j++) {
          lane[j].state = 0 /* DEFAULT */;
        }
      }
      nextUnhitNoteIndexes = [0, 0, 0, 0];
      restartAudio(0);
      gameState = 1 /* DEMO */;
    }
  });
  var exitX = 0.05 * gameWidth;
  var exitY = 0.9 * gameHeight;
  var exitWidth = 0.2 * gameWidth;
  var exitHeight = 0.4 * exitWidth;
  var doneLoadingNoteskinSpritesheet = false;
  var noteskinOriginalSpriteWidth = 80;
  var noteskinOriginalSpriteHeight = 80;
  var noteskinImage = new Image();
  noteskinImage.onload = () => {
    resizeSpritesheet(
      noteskinImage,
      noteskinOriginalSpriteWidth,
      noteskinOriginalSpriteHeight,
      noteskinSpritesheet,
      noteskinCtx,
      config.noteWidth,
      config.noteHeight
    );
    doneLoadingNoteskinSpritesheet = true;
  };
  noteskinImage.src = "simple-ddr-clone/assets/noteskin_spritesheet.png";
  var doneLoadingReceptorSpritesheet = false;
  var receptorOriginalSpriteWidth = 128;
  var receptorOriginalSpriteHeight = 128;
  var receptorImage = new Image();
  receptorImage.onload = () => {
    resizeSpritesheet(
      receptorImage,
      receptorOriginalSpriteWidth,
      receptorOriginalSpriteHeight,
      receptorSpritesheet,
      receptorCtx,
      config.noteWidth,
      config.noteHeight
    );
    doneLoadingReceptorSpritesheet = true;
  };
  receptorImage.src = "simple-ddr-clone/assets/receptor_spritesheet.png";
  var spritePadding = 2;
  function resizeSpritesheet(source, sourceSpriteWidth, sourceSpriteHeight, destination, destinationCtx, desiredSpriteWidth, desiredSpriteHeight) {
    let numColumns = Math.round(source.width / sourceSpriteWidth);
    let numRows = Math.round(source.height / sourceSpriteHeight);
    destination.width = numColumns * desiredSpriteWidth + 2 * numColumns * spritePadding;
    destination.height = numRows * desiredSpriteHeight + 2 * numRows * spritePadding;
    let tempCanvas = document.createElement("canvas");
    tempCanvas.width = sourceSpriteWidth;
    tempCanvas.height = sourceSpriteHeight;
    let tempCtx = tempCanvas.getContext("2d");
    for (let col = 0; col < numColumns; col++) {
      let sx = col * sourceSpriteWidth;
      let dx = col * desiredSpriteWidth + spritePadding + 2 * col * spritePadding;
      for (let row = 0; row < numRows; row++) {
        let sy = row * sourceSpriteHeight;
        let dy = row * desiredSpriteHeight + spritePadding + 2 * row * spritePadding;
        tempCtx.clearRect(0, 0, sourceSpriteWidth, sourceSpriteHeight);
        tempCtx.drawImage(
          source,
          sx,
          sy,
          sourceSpriteWidth,
          sourceSpriteHeight,
          0,
          0,
          sourceSpriteWidth,
          sourceSpriteHeight
        );
        destinationCtx.drawImage(
          tempCanvas,
          dx,
          dy,
          desiredSpriteWidth,
          desiredSpriteHeight
        );
      }
    }
    tempCanvas = void 0;
    tempCtx = void 0;
  }
  var doneLoadingAudio = false;
  var audioFilePath = "simple-ddr-clone/assets/Persistence.ogg";
  var audioContext = new AudioContext();
  var audioSource;
  var audioBuffer;
  var audioDurationSeconds;
  var songEndTimeSeconds;
  var gainNode;
  var audioIsStarted = false;
  fetch(audioFilePath).then((response) => {
    if (response.ok) {
      return response.arrayBuffer();
    } else {
      throw new Error("Failed to load audioFilePath " + audioFilePath);
    }
  }).then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer)).then((buff) => {
    audioBuffer = buff;
    audioDurationSeconds = audioBuffer.duration;
    songEndTimeSeconds = audioDurationSeconds + 2.5;
    audioSource = audioContext.createBufferSource();
    audioSource.buffer = audioBuffer;
    gainNode = audioContext.createGain();
    updateGain();
    audioSource.connect(gainNode).connect(audioContext.destination);
    doneLoadingAudio = true;
  });
  var doneLoadingEasyStepfile = false;
  var easyStepfilePath = "simple-ddr-clone/assets/stepfile_easy.json";
  var easyStepfile;
  fetch(easyStepfilePath).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to load easyStepfilePath " + easyStepfilePath);
    }
  }).then((responseJson) => {
    easyStepfile = [];
    loadStepfile(easyStepfile, responseJson);
    responseJson = void 0;
    currentStepfile = easyStepfile;
    doneLoadingEasyStepfile = true;
  });
  var doneLoadingHardStepfile = false;
  var hardStepfilePath = "simple-ddr-clone/assets/stepfile_hard.json";
  var hardStepfile;
  fetch(hardStepfilePath).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to load hardStepfilePath " + hardStepfilePath);
    }
  }).then((responseJson) => {
    hardStepfile = [];
    loadStepfile(hardStepfile, responseJson);
    responseJson = void 0;
    doneLoadingHardStepfile = true;
  });
  function loadStepfile(destination, source) {
    for (let i = 0; i < source.length; i++) {
      let stepfileLane = [];
      for (let j = 0; j < source[i].length; j++) {
        stepfileLane.push({
          timeInSeconds: source[i][j],
          state: 0 /* DEFAULT */
        });
      }
      destination.push(stepfileLane);
    }
  }
  var gameState = 0 /* LOADING */;
  var waitingForBinding = false;
  var waitingBindingId;
  var keyBindingSectionContainer = document.getElementById("keyBindingSectionContainer");
  keyBindingSectionContainer.onclick = (event) => {
    let clickedElement = event.target;
    if (clickedElement.tagName === "BUTTON") {
      if (waitingBindingId !== void 0) {
        let previousButton = document.getElementById(waitingBindingId);
        let previousCode;
        for (let i = 0; i < keyBindingTable.length; i++) {
          if (keyBindingTable[i][1] === waitingBindingId) {
            previousCode = keyBindingTable[i][0];
            break;
          }
        }
        previousButton.innerText = removeKeyFromCode(previousCode);
      }
      clickedElement.innerText = "Press any key...";
      waitingForBinding = true;
      waitingBindingId = clickedElement.id;
    }
  };
  var KeyEvent = class {
    constructor(state, timeMillis, offsetMillis, laneIndex) {
      this.state = state;
      this.timeMillis = timeMillis;
      this.offsetMillis = offsetMillis;
      this.laneIndex = laneIndex;
    }
  };
  var resetConfigButton = document.getElementById("resetConfigButton");
  resetConfigButton.onclick = () => {
    setConfigToDefault();
    writeKeyBindsToTable();
    updateUIBasedOnConfig();
    if (canStoreConfig) {
      window.localStorage.removeItem(configStorageKey);
    }
    gameState = 0 /* LOADING */;
    doneLoadingConfig = false;
    resizeSpritesheet(
      noteskinImage,
      noteskinOriginalSpriteWidth,
      noteskinOriginalSpriteHeight,
      noteskinSpritesheet,
      noteskinCtx,
      config.noteWidth,
      config.noteHeight
    );
    resizeSpritesheet(
      receptorImage,
      receptorOriginalSpriteWidth,
      receptorOriginalSpriteHeight,
      receptorSpritesheet,
      receptorCtx,
      config.noteWidth,
      config.noteHeight
    );
    console.log("Config reset");
  };
  var Judgement = class {
    constructor(name, rank, minDriftMillis, maxDriftMillis, color) {
      this.name = name;
      this.rank = rank;
      this.minDriftMillis = minDriftMillis;
      this.maxDriftMillis = maxDriftMillis;
      this.color = color;
    }
  };
  var JudgementEvent = class {
    constructor(timeMillis, driftMillis, laneIndex, judgementIndex) {
      this.timeMillis = timeMillis;
      this.driftMillis = driftMillis;
      this.laneIndex = laneIndex;
      this.judgementIndex = judgementIndex;
    }
  };
  var JudgementBar = class {
    constructor(name, color) {
      this.name = name;
      this.color = color;
      this.count = 0;
    }
  };
  var booColor = "rgb(175, 0, 0)";
  var averageColor = "rgb(150, 255, 150)";
  var goodColor = "rgb(240, 240, 0)";
  var perfectColor = "rgb(25, 255, 25)";
  var amazingColor = "rgb(139, 89, 201)";
  var missColor = "rgb(240, 0, 0)";
  var judgements = [
    new Judgement("Boo", 5, 117, 600, booColor),
    new Judgement("Average", 4, 83, 117, averageColor),
    new Judgement("Good", 3, 50, 83, goodColor),
    new Judgement("Perfect", 2, 17, 50, perfectColor),
    new Judgement("Amazing", 1, -17, 17, amazingColor),
    new Judgement("Perfect", 2, -50, -17, perfectColor),
    new Judgement("Good", 3, -83, -50, goodColor),
    new Judgement("Average", 4, -117, -83, averageColor),
    new Judgement("Miss", 6, -Infinity, -117, missColor)
  ];
  var nextUnhitNoteIndexes;
  var judgementEvents;
  var judgementBars = [];
  var judgementsCounted = false;
  var judgementAverage;
  var judgementAbsAverage;
  {
    let currentRank = 1;
    while (true) {
      let judgement;
      for (let i = 0; i < judgements.length; i++) {
        if (judgements[i].rank === currentRank) {
          judgement = judgements[i];
          break;
        }
      }
      if (judgement !== void 0) {
        judgementBars.push(new JudgementBar(
          judgement.name,
          judgement.color
        ));
        currentRank++;
      } else {
        break;
      }
    }
  }
  var laneKeyUpTimeMillis = [-Infinity, -Infinity, -Infinity, -Infinity];
  var laneKeyIsDown = [false, false, false, false];
  var keyEvents = [];
  var nextKeyEventToProcess = 0;
  window.addEventListener("keydown", onKeydown);
  function onKeydown(event) {
    if (event.repeat) {
      return;
    }
    if (waitingForBinding) {
      for (let i = 0; i < keyBindingTable.length; i++) {
        if (waitingBindingId === keyBindingTable[i][1]) {
          keyBindingTable[i][0] = event.code;
          setConfigKeyBinding(event.code, keyBindingTable[i][2]);
          break;
        }
      }
      let bindingButton = document.getElementById(waitingBindingId);
      bindingButton.innerText = removeKeyFromCode(event.code);
      for (let i = 0; i < keyBindingTable.length; i++) {
        if (event.code === keyBindingTable[i][0] && waitingBindingId !== keyBindingTable[i][1]) {
          keyBindingTable[i][0] = void 0;
          setConfigKeyBinding(void 0, keyBindingTable[i][2]);
          let previousButton = document.getElementById(keyBindingTable[i][1]);
          previousButton.innerText = keyNotBoundText;
          break;
        }
      }
      waitingForBinding = false;
      waitingBindingId = void 0;
      setShouldSaveConfig();
    } else {
      let action = keyCodeToKeyAction(event.code);
      let lane;
      switch (action) {
        case 0 /* LANE0 */:
          lane = 0;
          break;
        case 1 /* LANE1 */:
          lane = 1;
          break;
        case 2 /* LANE2 */:
          lane = 2;
          break;
        case 3 /* LANE3 */:
          lane = 3;
          break;
        case 4 /* QUIT */:
          if (gameState === 2 /* COUNTDOWN */ || gameState === 3 /* PLAYING */) {
            stopAudio();
            gameState = 4 /* RESULTS */;
          }
          break;
        case 5 /* RESTART */:
          if (gameState === 2 /* COUNTDOWN */) {
            countdownStartMillis = event.timeStamp;
            gameStartMillis = event.timeStamp + countdownDurationSeconds * 1e3;
            keyEvents = [];
            nextKeyEventToProcess = 0;
            restartAudio(countdownDurationSeconds);
          } else if (gameState === 3 /* PLAYING */) {
            judgementEvents = [];
            nextKeyEventToProcess = 0;
            for (let i = 0; i < judgementBars.length; i++) {
              judgementBars[i].count = 0;
            }
            judgementsCounted = false;
            judgementAverage = void 0;
            judgementAbsAverage = void 0;
            countdownStartMillis = event.timeStamp;
            gameStartMillis = event.timeStamp + countdownDurationSeconds * 1e3;
            restartAudio(countdownDurationSeconds);
            gameState = 2 /* COUNTDOWN */;
          }
          break;
      }
      if (lane === void 0) {
        return;
      }
      if (gameState === 1 /* DEMO */ || gameState === 2 /* COUNTDOWN */ || gameState === 3 /* PLAYING */) {
        keyEvents.push(new KeyEvent(1 /* DOWN */, event.timeStamp, config.videoOffsetMillis, lane));
      }
    }
  }
  function setConfigKeyBinding(keyCode, keyAction) {
    switch (keyAction) {
      case 0 /* LANE0 */:
        config.keyConfig.lane0 = keyCode;
        break;
      case 1 /* LANE1 */:
        config.keyConfig.lane1 = keyCode;
        break;
      case 2 /* LANE2 */:
        config.keyConfig.lane2 = keyCode;
        break;
      case 3 /* LANE3 */:
        config.keyConfig.lane3 = keyCode;
        break;
      case 4 /* QUIT */:
        config.keyConfig.quit = keyCode;
        break;
      case 5 /* RESTART */:
        config.keyConfig.restart = keyCode;
        break;
    }
  }
  window.addEventListener("keyup", onKeyup);
  function onKeyup(event) {
    let action = keyCodeToKeyAction(event.code);
    let lane;
    switch (action) {
      case 0 /* LANE0 */:
        lane = 0;
        break;
      case 1 /* LANE1 */:
        lane = 1;
        break;
      case 2 /* LANE2 */:
        lane = 2;
        break;
      case 3 /* LANE3 */:
        lane = 3;
        break;
      case 4 /* QUIT */:
        break;
      case 5 /* RESTART */:
        break;
    }
    if (lane === void 0) {
      return;
    }
    if (gameState === 1 /* DEMO */ || gameState === 2 /* COUNTDOWN */ || gameState === 3 /* PLAYING */) {
      keyEvents.push(new KeyEvent(0 /* UP */, event.timeStamp, config.videoOffsetMillis, lane));
    }
  }
  function keyCodeToKeyAction(code) {
    let action;
    for (let i = 0; i < keyBindingTable.length; i++) {
      if (code === keyBindingTable[i][0]) {
        action = keyBindingTable[i][2];
        break;
      }
    }
    return action;
  }
  function removeKeyFromCode(code) {
    if (code.startsWith("Key")) {
      return code.substring(3);
    }
    return code;
  }
  var demoAnimationStartTimeMillis;
  var demoGameTimeSeconds;
  var countdownDurationSeconds = 3;
  var countdownStartMillis;
  var gameStartMillis;
  var textColor = "rgb(220, 220, 220)";
  var receptorY;
  var receptorXs = [0, 0, 0, 0];
  var currentStepfile;
  window.requestAnimationFrame(draw);
  function draw(currentTimeMillis) {
    if (shouldSaveConfig) {
      saveConfig(currentTimeMillis);
    }
    gameCtx.globalAlpha = 1;
    gameCtx.fillStyle = "black";
    gameCtx.fillRect(0, 0, gameWidth, gameHeight);
    switch (gameState) {
      case 0 /* LOADING */:
        {
          console.log("loading...");
          gameCtx.fillStyle = textColor;
          gameCtx.globalAlpha = 1;
          gameCtx.font = "bold " + 0.076 * gameWidth + "px sans-serif";
          gameCtx.textAlign = "center";
          gameCtx.textBaseline = "middle";
          gameCtx.fillText("LOADING...", gameWidth / 2, gameHeight / 2);
          if (doneLoadingEasyStepfile && doneLoadingHardStepfile && !doneLoadingConfig) {
            if (config.difficulty === 0 /* EASY */) {
              currentStepfile = easyStepfile;
            } else if (config.difficulty === 1 /* HARD */) {
              currentStepfile = hardStepfile;
            }
            doneLoadingConfig = true;
          }
          if (doneLoadingNoteskinSpritesheet && doneLoadingReceptorSpritesheet && doneLoadingAudio && doneLoadingEasyStepfile && doneLoadingHardStepfile && doneLoadingConfig) {
            playButton.disabled = false;
            resetConfigButton.disabled = false;
            gameState = 1 /* DEMO */;
          }
        }
        break;
      case 1 /* DEMO */:
        {
          if (demoAnimationStartTimeMillis === void 0) {
            demoAnimationStartTimeMillis = currentTimeMillis;
          }
          demoGameTimeSeconds = (currentTimeMillis - demoAnimationStartTimeMillis + config.audioOffsetMillis) / 1e3;
          if (demoGameTimeSeconds > songEndTimeSeconds) {
            restartAudio(0);
            demoAnimationStartTimeMillis = currentTimeMillis;
            demoGameTimeSeconds = 0;
            keyEvents = [];
            nextKeyEventToProcess = 0;
          }
          processKeyEventsAndJudgements(demoGameTimeSeconds, demoAnimationStartTimeMillis);
          let noteFieldWidth = 4 * config.noteWidth + 3 * config.laneGap;
          let noteFieldLeftX = gameWidth / 2 - noteFieldWidth / 2;
          let noteFieldHeight = gameHeight;
          updateReceptorXs(noteFieldLeftX);
          updateReceptorY(noteFieldHeight);
          let minGameTime = demoGameTimeSeconds - (config.receptorPosition / 100 * noteFieldHeight + config.noteHeight / 2) / config.scrollSpeed;
          let maxGameTime = demoGameTimeSeconds + ((1 - config.receptorPosition / 100) * noteFieldHeight + config.noteHeight / 2) / config.scrollSpeed;
          gameCtx.globalAlpha = 1;
          drawReceptors(receptorXs, receptorY, currentTimeMillis);
          drawNotes(
            currentStepfile,
            minGameTime,
            maxGameTime,
            receptorY,
            receptorXs,
            demoGameTimeSeconds
          );
          let textAnimationElapsedSeconds = (currentTimeMillis - demoAnimationStartTimeMillis) / 1e3;
          let textAnimationDurationSeconds = 2.5;
          let textHalfDuration = textAnimationDurationSeconds / 2;
          let textAnimationStateSeconds = textAnimationElapsedSeconds % textAnimationDurationSeconds;
          let textMessageState = (textAnimationElapsedSeconds + textHalfDuration) % (2 * textAnimationDurationSeconds) / textAnimationDurationSeconds;
          let textAlpha;
          let maxAlpha = 0.8;
          if (textAnimationStateSeconds < textHalfDuration) {
            textAlpha = maxAlpha * (textHalfDuration - textAnimationStateSeconds) / textHalfDuration;
          } else {
            textAlpha = maxAlpha * (textAnimationStateSeconds - textHalfDuration) / textHalfDuration;
          }
          gameCtx.fillStyle = textColor;
          gameCtx.font = "bold " + 0.076 * gameWidth + "px sans-serif";
          gameCtx.textAlign = "center";
          gameCtx.textBaseline = "middle";
          gameCtx.globalAlpha = textAlpha;
          if (textMessageState < 1) {
            gameCtx.fillText("DEMO MODE", gameWidth / 2, gameHeight / 2);
          } else {
            gameCtx.fillText("PRESS PLAY", gameWidth / 2, gameHeight / 2);
          }
        }
        break;
      case 2 /* COUNTDOWN */:
      case 3 /* PLAYING */:
        {
          let currentGameTimeSeconds = (currentTimeMillis - gameStartMillis + config.audioOffsetMillis) / 1e3;
          processKeyEventsAndJudgements(currentGameTimeSeconds, gameStartMillis);
          let noteFieldWidth = 4 * config.noteWidth + 3 * config.laneGap;
          let noteFieldHeight = gameHeight;
          let noteFieldLeftX = gameWidth / 2 - noteFieldWidth / 2;
          updateReceptorY(noteFieldHeight);
          updateReceptorXs(noteFieldLeftX);
          let minGameTime = currentGameTimeSeconds - (config.receptorPosition / 100 * noteFieldHeight + config.noteHeight / 2) / config.scrollSpeed;
          let maxGameTime = currentGameTimeSeconds + ((1 - config.receptorPosition / 100) * noteFieldHeight + config.noteHeight / 2) / config.scrollSpeed;
          gameCtx.globalAlpha = 1;
          drawReceptors(receptorXs, receptorY, currentTimeMillis);
          drawNotes(
            currentStepfile,
            minGameTime,
            maxGameTime,
            receptorY,
            receptorXs,
            currentGameTimeSeconds
          );
          if (gameState === 2 /* COUNTDOWN */) {
            let countdownRemainingSeconds = countdownDurationSeconds - (currentTimeMillis - countdownStartMillis) / 1e3;
            if (countdownRemainingSeconds <= 0) {
              gameState = 3 /* PLAYING */;
            } else {
              let currentCountdownText = Math.ceil(countdownRemainingSeconds).toString();
              let currentNumberAnimationProgress = 1 - countdownRemainingSeconds % 1;
              let overlayMaxAlpha = 0.8;
              let overlayAlpha = overlayMaxAlpha - overlayMaxAlpha * currentNumberAnimationProgress;
              let defaultFontSize = 0.2 * gameWidth;
              gameCtx.fillStyle = textColor;
              gameCtx.font = "bold " + defaultFontSize + "px sans-serif";
              gameCtx.textAlign = "center";
              gameCtx.textBaseline = "middle";
              gameCtx.globalAlpha = 1;
              gameCtx.fillText(currentCountdownText, gameWidth / 2, gameHeight / 2);
              let overlayFontSize = (1 + 1.5 * currentNumberAnimationProgress) * defaultFontSize;
              gameCtx.font = "bold " + overlayFontSize + "px sans-serif";
              gameCtx.globalAlpha = overlayAlpha;
              gameCtx.fillText(currentCountdownText, gameWidth / 2, gameHeight / 2);
            }
          }
          if (gameState === 3 /* PLAYING */ && judgementEvents.length > 0 && !config.disableJudgementText) {
            let lastJudgementEvent = judgementEvents[judgementEvents.length - 1];
            let elapsedTimeMillis = currentGameTimeSeconds * 1e3 - lastJudgementEvent.timeMillis;
            let jumpDurationMillis = 110;
            let holdDurationMillis = 500;
            let fadeDurationMillis = 190;
            let totalDurationMillis = jumpDurationMillis + holdDurationMillis + fadeDurationMillis;
            if (elapsedTimeMillis < totalDurationMillis) {
              let defaultFontSize = 0.12 * gameWidth;
              let textAlpha;
              let y = gameHeight / 2;
              if (elapsedTimeMillis < jumpDurationMillis) {
                textAlpha = 1;
                let jumpHeight = 0.2 * defaultFontSize;
                y -= jumpHeight * Math.sin(Math.PI / jumpDurationMillis * elapsedTimeMillis);
              } else if (elapsedTimeMillis < jumpDurationMillis + holdDurationMillis) {
                textAlpha = 1;
              } else {
                let fadeProgress = (elapsedTimeMillis - holdDurationMillis) / (totalDurationMillis - holdDurationMillis);
                textAlpha = 1 - fadeProgress;
              }
              let lastJudgement = judgements[lastJudgementEvent.judgementIndex];
              let judgementText = lastJudgement.name;
              gameCtx.fillStyle = textColor;
              gameCtx.font = "bold " + defaultFontSize + "px sans-serif";
              gameCtx.textAlign = "center";
              gameCtx.textBaseline = "middle";
              gameCtx.globalAlpha = textAlpha;
              gameCtx.fillText(judgementText, gameWidth / 2, y);
            }
          }
          if (currentGameTimeSeconds > songEndTimeSeconds) {
            gameState = 4 /* RESULTS */;
          }
        }
        break;
      case 4 /* RESULTS */:
        {
          if (!judgementsCounted) {
            for (let i = 0; i < judgementEvents.length; i++) {
              let event = judgementEvents[i];
              let judgement = judgements[event.judgementIndex];
              judgementBars[judgement.rank - 1].count++;
            }
            judgementsCounted = true;
          }
          let maxJudgementCount = 0;
          for (let i = 0; i < currentStepfile.length; i++) {
            maxJudgementCount += currentStepfile[i].length;
          }
          let topMargin = 0.04 * gameHeight;
          let outerMargin = 0.05 * gameWidth;
          let barSectionGap = 0.01 * gameHeight;
          let width = gameWidth;
          let height = 0.4 * gameHeight;
          let numBars = judgementBars.length;
          let barSectionHeight = (height - (numBars - 1) * barSectionGap - 2 * outerMargin) / numBars;
          let textHeight = 0.03 * gameHeight;
          let judgementMaxHeight = 0.5 * textHeight;
          let judgementNameIndent = 0.05 * gameWidth;
          let judgementCountIndent = judgementNameIndent + 0.45 * gameWidth;
          let judgementSlashIndent = judgementCountIndent + 0.2 * gameWidth;
          let judgementMaxIndent = judgementSlashIndent + 0.05 * gameWidth;
          let innerGap = 5e-3 * gameHeight;
          let barHeight = barSectionHeight - textHeight - innerGap;
          let barWidth = width - 2 * outerMargin;
          let y = topMargin;
          let x = outerMargin;
          gameCtx.lineWidth = 1;
          gameCtx.textAlign = "left";
          gameCtx.textBaseline = "top";
          gameCtx.strokeStyle = "white";
          for (let i = 0; i < judgementBars.length; i++) {
            gameCtx.fillStyle = "white";
            gameCtx.font = textHeight + "px sans-serif";
            gameCtx.fillText(judgementBars[i].name, x + judgementNameIndent, y);
            gameCtx.fillText(judgementBars[i].count.toString(), x + judgementCountIndent, y);
            gameCtx.fillText("/", x + judgementSlashIndent, y);
            gameCtx.font = judgementMaxHeight + "px sans-serif";
            gameCtx.fillText(maxJudgementCount.toString(), x + judgementMaxIndent, y + 0.38 * textHeight);
            y += textHeight + innerGap;
            gameCtx.fillStyle = judgementBars[i].color;
            gameCtx.fillRect(x, y, Math.min(1, judgementBars[i].count / maxJudgementCount) * barWidth, barHeight);
            gameCtx.strokeRect(x, y, barWidth, barHeight);
            y += barHeight + barSectionGap;
          }
          let graphOutlineWidth = barWidth;
          let graphOutlineHeight = 0.18 * gameHeight;
          let dotSize = 2;
          let graphWidth = graphOutlineWidth - 2 * dotSize;
          let graphHeight = graphOutlineHeight - 2 * dotSize;
          let maxDriftMillis = judgements[0].minDriftMillis;
          let minDriftMillis = judgements[judgements.length - 1].maxDriftMillis;
          let maxTimeMillis = songEndTimeSeconds * 1e3;
          y += 0.05 * gameHeight;
          gameCtx.strokeRect(x, y, graphOutlineWidth, graphOutlineHeight);
          y += dotSize;
          x += dotSize;
          for (let i = 0; i < judgementEvents.length; i++) {
            let event = judgementEvents[i];
            let judgement = judgements[event.judgementIndex];
            let dotCenterX = x + event.timeMillis / maxTimeMillis * graphWidth;
            let dotCenterY = y + Math.min(1, (event.driftMillis - minDriftMillis) / (maxDriftMillis - minDriftMillis)) * graphHeight;
            gameCtx.fillStyle = judgement.color;
            gameCtx.fillRect(dotCenterX - dotSize / 2, dotCenterY - dotSize / 2, dotSize, dotSize);
          }
          gameCtx.fillStyle = "white";
          gameCtx.font = judgementMaxHeight + "px sans-serif";
          gameCtx.textBaseline = "top";
          gameCtx.fillText(minDriftMillis + " ms (Late)", x, y);
          gameCtx.textBaseline = "bottom";
          gameCtx.fillText("+" + maxDriftMillis + " ms (Early)", x, y + graphHeight + 2);
          if (judgementAverage === void 0) {
            judgementAverage = 0;
            judgementAbsAverage = 0;
            let count = 0;
            for (let i = 0; i < judgementEvents.length; i++) {
              let event = judgementEvents[i];
              if (event.judgementIndex !== 0 && event.judgementIndex !== judgements.length - 1) {
                judgementAverage += event.driftMillis;
                judgementAbsAverage += Math.abs(event.driftMillis);
                count++;
              }
            }
            if (count > 0) {
              judgementAverage /= count;
              judgementAbsAverage /= count;
              judgementAverage = Math.round(100 * judgementAverage) / 100;
              judgementAbsAverage = Math.round(100 * judgementAbsAverage) / 100;
            }
          }
          y += graphHeight + 0.05 * gameHeight;
          let statTextHeight = 0.02 * gameHeight;
          gameCtx.font = statTextHeight + "px sans-serif";
          gameCtx.textBaseline = "top";
          gameCtx.fillText("Average Drift: " + judgementAverage + " ms", x, y);
          y += statTextHeight + 5e-3 * gameHeight;
          gameCtx.fillText("Absolute Average Drift: " + judgementAbsAverage + " ms", x, y);
          let fontHeight = 0.6 * exitHeight;
          gameCtx.font = "bold" + statTextHeight + "px sans-serif";
          gameCtx.lineWidth = 2;
          gameCtx.textBaseline = "middle";
          gameCtx.textAlign = "center";
          gameCtx.strokeRect(exitX, exitY, exitWidth, exitHeight);
          gameCtx.fillText(
            "EXIT",
            exitX + exitWidth / 2,
            exitY + exitHeight / 2 + 0.03 * fontHeight
          );
        }
        break;
    }
    window.requestAnimationFrame(draw);
  }
  function processKeyEventsAndJudgements(currentGameTimeSeconds, gameStartMillis2) {
    let keyEventsLength = keyEvents.length;
    let missDriftMillis = judgements[judgements.length - 1].maxDriftMillis;
    while (nextKeyEventToProcess < keyEventsLength) {
      let keyEvent = keyEvents[nextKeyEventToProcess];
      let keyEventGameTimeMillis = keyEvent.timeMillis + keyEvent.offsetMillis - gameStartMillis2;
      if (keyEventGameTimeMillis / 1e3 > currentGameTimeSeconds) {
        break;
      }
      let laneIndex = keyEvent.laneIndex;
      if (keyEvent.state === 1 /* DOWN */) {
        laneKeyIsDown[laneIndex] = true;
      } else if (keyEvent.state === 0 /* UP */) {
        laneKeyIsDown[laneIndex] = false;
        laneKeyUpTimeMillis[laneIndex] = keyEvent.timeMillis + keyEvent.offsetMillis;
      }
      if (gameState === 3 /* PLAYING */ && keyEvent.state === 1 /* DOWN */) {
        while (true) {
          let noteIndex2 = nextUnhitNoteIndexes[laneIndex];
          if (noteIndex2 >= currentStepfile[laneIndex].length) {
            break;
          }
          let note2 = currentStepfile[laneIndex][noteIndex2];
          let driftMillis2 = note2.timeInSeconds * 1e3 - keyEventGameTimeMillis;
          if (driftMillis2 <= missDriftMillis) {
            nextUnhitNoteIndexes[laneIndex]++;
            note2.state = 2 /* MISSED */;
            judgementEvents.push(new JudgementEvent(
              note2.timeInSeconds * 1e3 - missDriftMillis,
              missDriftMillis,
              laneIndex,
              judgements.length - 1
            ));
          } else {
            break;
          }
        }
        let noteIndex = nextUnhitNoteIndexes[laneIndex];
        if (noteIndex >= currentStepfile[laneIndex].length) {
          break;
        }
        let note = currentStepfile[laneIndex][noteIndex];
        let driftMillis = note.timeInSeconds * 1e3 - keyEventGameTimeMillis;
        let judgementIndex;
        for (let i = 0; i < judgements.length - 1; i++) {
          let judgement = judgements[i];
          if (judgement.minDriftMillis < driftMillis && driftMillis <= judgement.maxDriftMillis) {
            judgementIndex = i;
            break;
          }
        }
        if (judgementIndex === void 0 && driftMillis <= judgements[0].maxDriftMillis) {
          console.warn("Undefined judgement index! This is a bug!");
          break;
        }
        if (judgementIndex !== void 0) {
          if (judgementIndex !== 0) {
            nextUnhitNoteIndexes[laneIndex]++;
            note.state = 1 /* HIT */;
          }
          judgementEvents.push(new JudgementEvent(
            keyEventGameTimeMillis,
            driftMillis,
            laneIndex,
            judgementIndex
          ));
        }
      }
      nextKeyEventToProcess++;
    }
    if (gameState === 3 /* PLAYING */) {
      for (let laneIndex = 0; laneIndex < 4; laneIndex++) {
        while (true) {
          let noteIndex = nextUnhitNoteIndexes[laneIndex];
          if (noteIndex >= currentStepfile[laneIndex].length) {
            break;
          }
          let note = currentStepfile[laneIndex][noteIndex];
          let driftMillis = (note.timeInSeconds - currentGameTimeSeconds) * 1e3;
          if (driftMillis <= missDriftMillis) {
            nextUnhitNoteIndexes[laneIndex]++;
            note.state = 2 /* MISSED */;
            judgementEvents.push(new JudgementEvent(
              note.timeInSeconds * 1e3 - missDriftMillis,
              missDriftMillis,
              laneIndex,
              judgements.length - 1
            ));
          } else {
            break;
          }
        }
      }
    }
  }
  function updateReceptorY(noteFieldHeight) {
    if (config.scrollDirection === 0 /* DOWN */) {
      receptorY = (1 - config.receptorPosition / 100) * noteFieldHeight - config.noteHeight / 2;
    } else {
      receptorY = config.receptorPosition / 100 * noteFieldHeight - config.noteHeight / 2;
    }
  }
  function updateReceptorXs(noteFieldLeftX) {
    for (let laneIndex = 0; laneIndex < 4; laneIndex++) {
      receptorXs[laneIndex] = noteFieldLeftX + laneIndex * (config.noteWidth + config.laneGap);
    }
  }
  function drawReceptors(receptorXs2, receptorY2, currentTimeMillis) {
    let destinationY = receptorY2;
    for (let laneIndex = 0; laneIndex < 4; laneIndex++) {
      let sourceX;
      let numFrames = 7;
      if (laneKeyIsDown[laneIndex]) {
        sourceX = spritePadding + (numFrames - 1) * (config.noteWidth + 2 * spritePadding);
      } else {
        let animationDurationMillis = 100;
        let animationDeltaMillis = currentTimeMillis - laneKeyUpTimeMillis[laneIndex];
        let frameIndex = numFrames - 1 - Math.min(numFrames - 1, Math.ceil(animationDeltaMillis / animationDurationMillis * (numFrames - 1)));
        sourceX = spritePadding + frameIndex * (config.noteWidth + 2 * spritePadding);
      }
      let sourceY = spritePadding + laneIndex * (config.noteHeight + 2 * spritePadding);
      let destinationX = receptorXs2[laneIndex];
      gameCtx.drawImage(
        receptorSpritesheet,
        sourceX,
        sourceY,
        config.noteWidth,
        config.noteHeight,
        destinationX,
        destinationY,
        config.noteWidth,
        config.noteHeight
      );
    }
  }
  function drawNotes(notes, minTime, maxTime, receptorY2, receptorXs2, gameTimeInSeconds) {
    for (let laneIndex = 0; laneIndex < 4; laneIndex++) {
      let sourceY = spritePadding + laneIndex * (config.noteHeight + 2 * spritePadding);
      let destinationX = receptorXs2[laneIndex];
      updateCulledIndices(notes[laneIndex], minTime, maxTime);
      for (let i = culledIndicesResult.endIndex; i >= culledIndicesResult.startIndex; i--) {
        let note = notes[laneIndex][i];
        if (note.state === 1 /* HIT */) {
          continue;
        }
        let sourceX;
        if (note.state === 0 /* DEFAULT */) {
          sourceX = spritePadding;
        } else if (note.state === 2 /* MISSED */) {
          sourceX = config.noteWidth + 3 * spritePadding;
        }
        let destinationY;
        if (config.scrollDirection === 0 /* DOWN */) {
          destinationY = receptorY2 - config.scrollSpeed * (note.timeInSeconds - gameTimeInSeconds);
        } else {
          destinationY = receptorY2 + config.scrollSpeed * (note.timeInSeconds - gameTimeInSeconds);
        }
        gameCtx.drawImage(
          noteskinSpritesheet,
          sourceX,
          sourceY,
          config.noteWidth,
          config.noteHeight,
          destinationX,
          destinationY,
          config.noteWidth,
          config.noteHeight
        );
      }
    }
  }
  var culledIndicesResult = { startIndex: -1, endIndex: -1 };
  function updateCulledIndices(notes, minTimeSeconds, maxTimeSeconds) {
    binarySearch(notes, minTimeSeconds);
    culledIndicesResult.startIndex = binarySearchResult.right;
    binarySearch(notes, maxTimeSeconds);
    culledIndicesResult.endIndex = binarySearchResult.left;
  }
  var binarySearchResult = { left: -1, right: -1 };
  function binarySearch(notes, targetTimeSeconds) {
    let left = -1;
    let right = notes.length;
    while (right - left > 1) {
      let middle = Math.floor((left + right) / 2);
      if (targetTimeSeconds < notes[middle].timeInSeconds) {
        right = middle;
      } else {
        left = middle;
      }
    }
    binarySearchResult.left = left;
    binarySearchResult.right = right;
  }
})();
//# sourceMappingURL=bundle.js.map
