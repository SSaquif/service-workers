"use strict";

let fibIndex = 0;

// self generally refers to window.self on the browser
// But since Web Worker runs away from the main thread
// Here self refers to a DedicatedWorkerGlobalScope Object ()
console.log("self in worker", self);

//send to client

const onMessage = (event) => {
  getNextFib();
};

self.onmessage = onMessage;

function getNextFib() {
  let fibNum = fib(fibIndex);
  self.postMessage({ fibIndex: fibIndex, fibNum: fibNum });
  fibIndex++;
  // Put in set Timeout so that there is a very small break
  // And the worker can do other stuff: maybe receive another message
  setTimeout(getNextFib, 0);
}

// **************Fibonacci*****************
function fib(n) {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}
