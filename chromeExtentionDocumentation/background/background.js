// start = '<button class="glassmorphic-button" id="start">Start</button>';
// style = "";
// var start = document.createElement("button");
// start.innerHTML = "start";
// start.className += "glassmorphic-button";
// start.id += "start";

// start.onclick = clicked;
// function clicked() {
//   btns.innerHTML =
//     '<button class="glassmorphic-button" id="stop">Stop</button><button class="glassmorphic-button" id="lap">Lap</button>';
//   btns.setAttribute("style", "grid-template-columns: 100px 100px");
//   console.log(btns.innerHTM);
//   chrome.storage.local.set({
//     stopWatchRunning: true,
//     stopWatchButtons: btns.innerHTML,
//     stopWatchButtonsStyle: btns.getAttribute(),
//   });
// }

chrome.storage.local.get(
  [
    "lastPage",
    "stopWatchRunning",
    "stopWatchTime",
    "stopWatchButtons",
    "timerTime",
    "timerRunning",
    "timerStatus",
  ],
  (result) => {
    const lastPage = result.lastPage || "popup.html";
    const stopWatchTime = result.stopWatchTime || 0;
    const stopWatchButtons = result.stopWatchButtons || "";
    const stopWatchButtonsStyle = result.stopWatchButtonsStyle || "";
    const timerTime = result.timerTime || 0;
    const timerRunning = result.timerRunning || false;
    const stopWatchRunning = result.stopWatchRunning || false;
    const timerStatus = result.timerStatus || [];

    chrome.storage.local.set({
      lastPage: lastPage,
      stopWatchTime: stopWatchTime,
      stopWatchRunning: stopWatchRunning,
      stopWatchButtons: stopWatchButtons,
      stopWatchButtonsStyle: stopWatchButtonsStyle,
      timerTime: timerTime,
      timerRunning: timerRunning,
      timerStatus: timerStatus,
    });
    // window.location.href = lastPage;
  }
);

chrome.alarms.create("loop", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarms) => updateStatus());

function updateStatus() {
  chrome.storage.local.get(
    [
      "lastPage",
      "stopWatchRunning",
      "stopWatchTime",
      "timerTime",
      "timerRunning",
      "timerstates",
    ],
    (result) => {
      if (result.stopWatchRunning) {
        result.stopWatchTime += 1;
        chrome.storage.local.set({ stopWatchTime: result.stopWatchTime });
        console.log(result.stopWatchTime);
      }
      // else {
      //     console.log("stopwatch not running");
      //   }
      if (result.timerRunning) {
        result.timerTime -= 1;
        chrome.storage.local.set({ timerTime: result.timerTime });
      }
      //   else {
      //     console.log("timer not running");
      //   }
    }
  );
}
