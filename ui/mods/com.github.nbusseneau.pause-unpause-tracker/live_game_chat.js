// register chat handlers
handlers.pause = function () {
  model.send_message("chat_message", {
    message: "PAUSED the game",
  });
};

handlers.unpause = function (counter) {
  if (counter > 0) {
    model.send_message("chat_message", {
      message: "UNPAUSING in " + counter + "...",
    });
  } else {
    model.send_message("chat_message", {
      message: "UNPAUSED the game",
    });
  }
};
