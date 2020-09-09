# Exploring Service Workers

Following along with Kyle Simpson's (@getify) course on service workers.

## Starter Files

This package contains the starter files for the Web Workers and Service Workers sections of the course

For the solutions and additional info, head to the course repo:

1. [Web Workers](https://github.com/FrontendMasters/web-workers)

2. [Service Workers](https://github.com/FrontendMasters/service-workers-offline)

## Notes

### Cool/New Things I Learned/Did

1. Created/Used a Non Express Server after a long time

2. Learned more about the self property and the Window Object (and other objects as well, I guess)

   1. The [self property vs this](https://stackoverflow.com/questions/16875767/difference-between-this-and-self-in-javascript)

   2. [Window.self](https://developer.mozilla.org/en-US/docs/Web/API/Window/self)

   3. [Web Workers api](https://developer.mozilla.org/en-US/docs/Web/API/Worker)

### Web Worker Notes

1. Ceate a new Worker() Instance

   1. Argument = ulr to a JS file, which will be run in a separete thread

2. We can add MessageEvent Listeners to workers (see api)

3. Webworker: Needs 2 Pieces =>

   1. Ability to listen to messages coming from it

   2. Ability to send messages to it

4. In worker.js (or whatever file worker is given) the self refers to [DedicatedWorkerGlobalScope](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope) Object

5. [MDN example](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

6. [MDN repo](https://github.com/mdn/simple-web-worker/blob/gh-pages/main.js)

7. Code summary (see actual files main.js and worker.js for working code). Below is partial code.

```javascript
// Main.js
{
  //Step 1 and 2
  worker = new Worker("/js/worker.js");
  worker.addEventListener("message", onMessage);

  // Then in some function, we listen and send to/from the worker.
  // Most likely will be 2 different functions

  function onMessage(event) {
    // Msg Received from Web Worker
    console.log("Data Received From Worker", event.data);

    // Send Msg to Worker (to worker's inner scope TBMS)
    worker.postMessage("Hello from client");
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

### Service Worker Notes

```javascript

```

## Links From the Course

- https://serviceworke.rs/

- https://developers.google.com/web/fundamentals/primers/service-workers/

- https://developers.google.com/web/ilt/pwa/introduction-to-service-worker

- https://developers.google.com/web/tools/workbox/

- https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

- https://abookapart.com/products/going-offline

- https://adactio.com/journal/15122
