document.addEventListener("DOMContentLoaded", () => {
  const stopwatch = document.getElementById("stopwatch");
  const timer = document.getElementById("timer");

  const timerStorage = {
    path: "popup.html",
    timer: 0,
    stopwatch: 0,
  };

  const savedTimerStorage = localStorage.getItem("timer");
  if (savedTimerStorage) {
    const savedPath = JSON.parse(savedTimerStorage).path;
    if (savedPath !== "popup.html") {
      window.location.href = savedPath;
      return; // Ensure no further execution
    }
  }

  localStorage.setItem("timer", JSON.stringify(timerStorage));

  stopwatch.addEventListener("click", () => {
    timerStorage.path = "stopwatch.html";
    localStorage.setItem("timer", JSON.stringify(timerStorage));
    window.location.href = "stopwatch.html";
  });

  timer.addEventListener("click", () => {
    timerStorage.path = "timer.html";
    localStorage.setItem("timer", JSON.stringify(timerStorage));
    window.location.href = "timer.html";
  });
});
