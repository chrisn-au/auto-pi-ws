const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 1234 });

wss.on('connection', function connection(ws) {
    console.log('connected');
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
});

count = 0;
const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {

        let msg = { "pid" : "bbm" , value : count++}
        ws.send(JSON.stringify(msg));
        msg = { "pid" : "rpm" , value : count*5}
        ws.send(JSON.stringify(msg));
        if (count == 100) count = 0;
    });
  }, 1000);
   
  wss.on('close', function close() {
    clearInterval(interval);
  });