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
    var p = document.createElement("div");
    p.innerText = `Fib(${num}): ${fib}`;
    if (fibsList.childNodes.length > 0) {
      fibsList.insertBefore(p, fibsList.childNodes[0]);
    } else {
      fibsList.appendChild(p);
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
  }

  function stopFibs() {
    startStopBtn.removeEventListener("click", stopFibs, false);
    startStopBtn.addEventListener("click", startFibs, false);

    startStopBtn.innerText = "Start";

    // TODO
  }

  function onMessage(event) {
    // Msg Received from Web Worker
    console.log("Data Received From Worker", event.data);

    // Send Msg to Worker (to worker's inner scope TBMS)
    worker.postMessage("Hello from client");
  }
})();
