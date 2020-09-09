# Exploring Service Workers

Following along with Kyle Simpson's (@getify) course on service workers.

For the solutions and additional info, head to the course repo:

1. [Web Workers](https://github.com/FrontendMasters/web-workers)

2. [Service Workers](https://github.com/FrontendMasters/service-workers-offline)

## General Notes

### Cool/New Things I Learned/Did

1. Created/Used a Non Express Server after a long time

2. Learned more about the self property and the Window Object (and other objects as well, I guess)

   1. The [self property vs this](https://stackoverflow.com/questions/16875767/difference-between-this-and-self-in-javascript)

   2. [Window.self](https://developer.mozilla.org/en-US/docs/Web/API/Window/self)

   3. [Web Workers api](https://developer.mozilla.org/en-US/docs/Web/API/Worker)

3. Transferables, Shared Array Buffers, Atomics and High Resolution Timer Issues ([see FEM notes](https://frontendmasters.com/courses/service-workers/data-transfer-solutions/))

   1. [Transferables](https://developer.mozilla.org/en-US/docs/Web/API/Transferable)

   2. [Shared Array buffers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)

   3. [Atomics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics)

## Web Worker Notes

1. Ceate a new Worker() Instance

   1. Argument = url to a JS file, which will be run in a separete thread

2. We can add MessageEvent Listeners to workers (see api)

3. Webworker: Needs 2 Pieces =>

   1. Ability to listen to messages coming from it

   2. Ability to send messages to it

4. In worker.js (or whatever file worker is given) the self refers to [DedicatedWorkerGlobalScope](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope) Object

5. [MDN example](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

6. [MDN repo](https://github.com/mdn/simple-web-worker/blob/gh-pages/main.js)

7. Finally see that even when the fibonacci solution is being calculated, our browser is not loading. We can scroll, click etc.

8. **Basic Code Summary** (see actual files main.js and worker.js for working code).

```javascript
// Here's the general idea

// Main.js
{
  let worker;

  function start() {
    //Step 1 and 2
    worker = new Worker("/js/worker.js");
    worker.addEventListener("message", onMessage);

    // Send Msg to Worker (to worker's inner scope TBMS)
    worker.postMessage("Hello from client");
  }

  // Then in some function, we listen and send to/from the worker.
  // Most likely will be 2 different functions

  function onMessage(event) {
    // Msg Received from Web Worker
    console.log("Data Received From Worker", event.data);
  }

  function stop() {
    //In some function we will terminate the worker
    worker.terminate();
  }
}

// Worker.js
{
  // Send Msg to Client
  self.postMessage("Hello from web worker");

  const onMessage = (event) => {
    console.log("Client Event:", event);
  };

  //Receive from client
  self.onmessage = onMessage;
}
```

### Conclusion

1. For Basics see branch web-worker-basic
2. For Entire Solution see branch web-worker-fibonacci

## Service Worker Notes

1. Is a type of Web Worker

2. Has different lifecycle than a regular Web Worker

3. Was initially to be called Network worker (a more accurate naem for what it does)

4. It sits between our web app and rest of the web. This means:

   1. Every web request that happens (files, AJAX calls, whatever), will funnel themselves through the service worker first

   2. Service Worker can either just let them pass (do nothing) or listen for such requests and then process them for the client app

## Links From the Course

- https://serviceworke.rs/

- https://developers.google.com/web/fundamentals/primers/service-workers/

- https://developers.google.com/web/ilt/pwa/introduction-to-service-worker

- https://developers.google.com/web/tools/workbox/

- https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

- https://abookapart.com/products/going-offline

- https://adactio.com/journal/15122
