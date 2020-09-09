"use strict";

var curFib = 0;

// self generally refers to window.self on the browser
// But since Web Worker runs away from the main thread
// Here self refers to a DedicatedWorkerGlobalScope Object ()
console.log("self in worker", self);

//send to client
self.postMessage("Hello from web worker");

const onMessage = (event) => {
  console.log("Client Event:", event);
};

self.onmessage = onMessage;

// **************Fibonacci*****************
function fib(n) {
  if (n < 2) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}
