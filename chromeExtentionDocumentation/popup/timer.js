const error = document.getElementById("error");

const btns = document.getElementById("btns");
const inputs = document.getElementById("inputs");
const time = document.getElementById("time");
const back = document.getElementById("back");

const timerStorage = JSON.parse(localStorage.getItem("timer"));

back.addEventListener("click", () => {
  timerStorage.path = "popup.html";
  localStorage.setItem("timer", JSON.stringify(timerStorage));
  window.location.href = "popup.html";
});

let counter = 10;
let paused = true;
interval = setInterval(func, 1000);

function func() {
  console.log("here");
  if (!paused && counter > 0) {
    counter -= 1;
    time.innerHTML = fancyTimeFormat(counter);
    inputs.innerHTML = "";
    // btns.style.gridTemplateColumns = `repeat(1, 100px)`;
  }
}
// if (counter == 0) {
//   clearInterval(interval);
//   paused = true;
//   inputs.innerHTML =
//     '<input required type="number" max="60" id="hour" placeholder="Hour"></input><input required type="number" max="60" id="minute" placeholder="Minute"></input><input required type="number" max="60" id="second" placeholder="Second"></input>';
//   btns.innerHTML = '<button class='glassmorphic-button' id="start">Start</button>';
//   attachEventListeners();
// }

error_counter = 0;
function attachEventListeners() {
  const start = document.getElementById("start");
  const pause = document.getElementById("pause");
  const cancel = document.getElementById("cancel");
  const resume = document.getElementById("resume");

  let hour = document.getElementById("hour");
  let minute = document.getElementById("minute");
  let second = document.getElementById("second");

  if (start) {
    start.addEventListener("click", () => {
      if (hour.value || minute.value || second.value) {
        if (!interval) {
          console.log("hereeeee");
          interval = setInterval(func, 1000);
        }
        counter = hour.value * 3600 + minute.value * 60 + second.value * 1;

        paused = false;
        btns.style.gridTemplateColumns = `repeat(2, 100px)`;

        btns.innerHTML =
          "<button class='glassmorphic-button' id='pause'>Pause</button><button class='glassmorphic-button' id='cancel'>Cancel</button>";
        error.innerHTML = "";
      } else {
        error.innerHTML = "<p>Please set the timer.</p>";
        error_counter += 1;
      }
      attachEventListeners();
    });
  }

  if (cancel) {
    cancel.addEventListener("click", () => {
      //   clearInterval(interval);
      time.innerHTML = "";
      inputs.innerHTML =
        '<input required type="number" max="60" id="hour" placeholder="Hour"></input><input required type="number" max="60" id="minute" placeholder="Minute"></input><input required type="number" max="60" id="second" placeholder="Second"></input>';
      btns.style.gridTemplateColumns = `repeat(1, 100px)`;
      btns.innerHTML =
        "<button class='glassmorphic-button' id='start'>Start</button>";

      //   attachEventListeners();

      paused = true;
      counter = 0;
      //   btns.setAttribute("style", "grid-template-columns:100px");
      attachEventListeners();
    });
  }

  if (pause) {
    pause.addEventListener("click", () => {
      paused = true;
      btns.style.gridTemplateColumns = `repeat(2, 100px)`;
      btns.innerHTML =
        "<button class='glassmorphic-button' id='resume'>Resume</button><button class='glassmorphic-button' id='cancel'>Cancel</button>";

      attachEventListeners();
    });
  }

  if (resume) {
    resume.addEventListener("click", () => {
      paused = false;
      //   interval;
      //   inputs = fancyTimeFormat(counter);
      btns.style.gridTemplateColumns = `repeat(2, 100px)`;
      btns.innerHTML =
        "<button class='glassmorphic-button' id='pause'>Pause</button><button class='glassmorphic-button' id='cancel'>Cancel</button>";

      attachEventListeners();
    });
  }
}

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
