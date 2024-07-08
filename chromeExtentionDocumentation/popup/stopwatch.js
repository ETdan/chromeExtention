const time = document.getElementById("time");
const btns = document.getElementById("btns");
const lapBox = document.getElementById("lapBox");

const back = document.getElementById("back");

const timerStorage = JSON.parse(localStorage.getItem("timer"));

back.addEventListener("click", () => {
  timerStorage.path = "popup.html";
  localStorage.setItem("timer", JSON.stringify(timerStorage));
  window.location.href = "popup.html";
});

let counter = 0;
let paused = true;

const myTimer = () => {
  if (!paused) {
    time.innerHTML = `${fancyTimeFormat(counter)}`;
    counter += 1;
  }
};

const myInterval = setInterval(myTimer, 1000);

const attachEventListeners = () => {
  const start = document.getElementById("start");
  const stop = document.getElementById("stop");
  const resume = document.getElementById("resume");
  const reset = document.getElementById("reset");
  const lap = document.getElementById("lap");

  if (start) {
    start.addEventListener("click", () => {
      paused = false;
      btns.innerHTML =
        '<button class="glassmorphic-button" id="stop">Stop</button><button class="glassmorphic-button" id="lap">Lap</button>';
      btns.setAttribute("style", "grid-template-columns: 100px 100px");
      attachEventListeners();
    });
  }

  if (stop) {
    stop.addEventListener("click", () => {
      paused = true;
      btns.innerHTML =
        '<button class="glassmorphic-button" id="resume">Resume</button><button class="glassmorphic-button" id="reset">Reset</button>';
      attachEventListeners();
    });
  }

  if (resume) {
    resume.addEventListener("click", () => {
      paused = false;
      btns.innerHTML =
        '<button class="glassmorphic-button" id="stop">Stop</button><button class="glassmorphic-button" id="lap">Lap</button>';
      attachEventListeners();
    });
  }

  if (reset) {
    reset.addEventListener("click", () => {
      paused = true;
      counter = 0;
      time.innerHTML = "00:00";
      btns.innerHTML =
        '<button class="glassmorphic-button" id="start">Start</button>';
      btns.setAttribute("style", "grid-template-columns:100px");
      lapBox.innerHTML = "";
      attachEventListeners();
    });
  }
  if (lap) {
    lap.addEventListener("click", () => {
      lapBox.innerHTML = time.textContent;
    });
  }
};

attachEventListeners();

function fancyTimeFormat(duration) {
  const hrs = Math.floor(duration / 3600);
  const mins = Math.floor((duration % 3600) / 60);
  const secs = duration % 60;

  let ret = "";

  if (hrs > 0) {
    ret += `${hrs}:${mins < 10 ? "0" : ""}`;
  }

  ret += `${mins}:${secs < 10 ? "0" : ""}${secs}`;

  return ret;
}
