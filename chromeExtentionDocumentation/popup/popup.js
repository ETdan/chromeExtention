document.addEventListener("DOMContentLoaded", () => {
  const stopwatch = document.getElementById("stopwatch");
  const timer = document.getElementById("timer");

  chrome.storage.local.get(["lastPage"], (response) => {
    window.location.href = response.lastPage;
  });

  stopwatch.addEventListener("click", () => {
    chrome.storage.local.set({ lastPage: "stopwatch.html" });
    window.location.href = "stopwatch.html";
  });

  timer.addEventListener("click", () => {
    chrome.storage.local.set({ lastPage: "timer.html" });
    window.location.href = "timer.html";
  });
});
