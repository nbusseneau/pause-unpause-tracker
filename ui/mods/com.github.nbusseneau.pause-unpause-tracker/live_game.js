// wrappers
function pause(originalFunction) {
  originalFunction();
  api.Panel.message("chat", "pause");
}

var unpauseMutexLock = false;
function unpause(originalFunction) {
  if (!unpauseMutexLock) {
    unpauseMutexLock = true;
    countdown(originalFunction, 3);
  }
}

function countdown(originalFunction, counter) {
  api.Panel.message("chat", "unpause", counter);
  if (counter > 0) {
    counter--;
    setTimeout(countdown, 1000, originalFunction, counter);
  } else {
    originalFunction();
    unpauseMutexLock = false;
  }
}

// register wrappers over original functions
// "Pause Game" toggle (default keybind: pause/break)
var originalTogglePause = model.togglePause;
model.togglePause = function () {
  if (model.paused()) {
    unpause(originalTogglePause);
  } else {
    pause(originalTogglePause);
  }
};

// Game Menu (Esc) "Pause Game" button
var originalMenuPauseGame = model.menuPauseGame;
model.menuPauseGame = function () {
  pause(originalMenuPauseGame);
};

// Game Menu (Esc) "Resume Game" button
var originalMenuResumeGame = model.menuResumeGame;
model.menuResumeGame = function () {
  unpause(originalMenuResumeGame);
};

// Pause notification (top bar) "Resume" button
var originalGamePausedResumeHandler = handlers["game_paused.resume"];
handlers["game_paused.resume"] = function () {
  unpause(originalGamePausedResumeHandler);
};
