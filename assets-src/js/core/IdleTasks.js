//region Polyfill requestIdleCallback
window.requestIdleCallback =
  window.requestIdleCallback ||
  function(handler) {
    let startTime = Date.now();

    return setTimeout(function() {
      handler({
        didTimeout: false,
        timeRemaining: function() {
          return Math.max(0, 50.0 - (Date.now() - startTime));
        }
      });
    }, 1);
  };
window.cancelIdleCallback =
  window.cancelIdleCallback ||
  function(id) {
    clearTimeout(id);
  };
//endregion

let taskList = [];
let totalTaskCount = 0;
let currentTaskNumber = 0;
let taskHandle = null;

function enqueueTask(taskHandler, taskData) {
  taskList.push({
    handler: taskHandler,
    data: taskData
  });

  totalTaskCount++;

  if (!taskHandle) {
    taskHandle = requestIdleCallback(runTaskQueue, { timeout: 1000 });
  }
}

function runTaskQueue(deadline) {
  while (
    (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
    taskList.length
  ) {
    let task = taskList.shift();
    currentTaskNumber++;

    task.handler(task.data);
  }

  if (taskList.length) {
    taskHandle = requestIdleCallback(runTaskQueue, { timeout: 1000 });
  } else {
    taskHandle = 0;
  }
}

export default enqueueTask;
