var ws = null;

function connect() {
  ws = new WebSocket('ws://127.0.0.1:1337');
  setTimeout(bindEvents, 1000);
  setReadyState();
}

function bindEvents() {
  ws.onopen = function() {
    log('onopen called');
    setReadyState();
  };
}

function setReadyState() {
  log('ws.readyState: ' + ws.readyState);
}

function log(msg) {
  if(document.body) {
    var text = document.createTextNode(msg);
    document.body.appendChild(text);
  }
}
