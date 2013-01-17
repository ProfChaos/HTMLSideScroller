var net = require('net');

var server = net.createServer(function (socket) {

  // "on data" event listener:
  socket.on('data', function(data) {

    console.log('Got this data: ' + data)

    // Echo:
    socket.write('You said: Hello');
  });
});

server.listen(1337, '127.0.0.1');