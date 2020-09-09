(function Home() {
  "use strict";

  let startStopBtn;
  let fibsList;
  let worker;
  console.log(self);

  document.addEventListener("DOMContentLoaded", ready, false);

  // **********************************

  function ready() {
    startStopBtn = document.getElementById("start-stop-btn");
    fibsList = document.getElementById("fibs");

    startStopBtn.addEventListener("click", startFibs, false);
  }

  function renderFib(num, fib) {
    const fibDiv = document.createElement("div");
    fibDiv.innerText = `Fib(${num}): ${fib}`;

    if (fibsList.childNodes.length > 0) {
      fibsList.insertBefore(fibDiv, fibsList.childNodes[0]);
    } else {
      fibsList.appendChild(fibDiv);
    }
  }

  // Worker related functions
  function startFibs() {
    startStopBtn.removeEventListener("click", startFibs, false);
    startStopBtn.addEventListener("click", stopFibs, false);

    startStopBtn.innerText = "Stop";
    fibsList.innerHTML = "";

    // Create new Worker instance
    // Argument = ulr to a JS file, which will be run in a separete thread
    worker = new Worker("/js/worker.js");

    // We can add MessageEvent Listeners to workers
    worker.addEventListener("message", onMessage);

    //
    worker.postMessage({ start: true });
  }

  function stopFibs() {
    startStopBtn.removeEventListener("click", stopFibs, false);
    startStopBtn.addEventListener("click", startFibs, false);

    startStopBtn.innerText = "Start";

    // Kill our web Worker
    worker.terminate();
  }

  function onMessage(event) {
    // Msg Received from Web Worker
    console.log("Data Received From Worker", event.data);
    const { fibIndex, fibNum } = event.data;
    renderFib(fibIndex, fibNum);
  }
})();
