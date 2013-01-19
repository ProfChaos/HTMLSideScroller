var net = require('net'),
	crypto = require('crypto'),
	handshake = true;

function parseHandshake(text)
{
	var text = text.toString();

	var response, shasum = crypto.createHash('sha1');
	
	var key = text.match(/Sec-WebSocket-Key: (.*)\r\n/);

	shasum.update(key[1]+'258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
	response = shasum.digest('base64');
	return response;
}

function decodeWebSocket (data){
    var datalength = data[1] & 127;
    var indexFirstMask = 2;
    if (datalength == 126) {
        indexFirstMask = 4;
    } else if (datalength == 127) {
        indexFirstMask = 10;
    }
    var masks = data.slice(indexFirstMask,indexFirstMask + 4);
    var i = indexFirstMask + 4;
    var index = 0;
    var output = "";
    while (i < data.length) {
        output += String.fromCharCode(data[i++] ^ masks[index++ % 4]);
    }
    return output;
}

var server = net.createServer(function (socket) {
    
    // "on data" event listener:
    socket.on('data', function(data) 
    {
        console.log('Got this data: ' + data);

      	if(handshake)
        {
            var response = 'HTTP/1.1 101 WebSocket Protocol Handshake\r\n'
            + 'Upgrade: WebSocket\r\n'
            + 'Connection: Upgrade\r\n'
            + 'Sec-WebSocket-Version: 8\r\n'
            + 'Sec-WebSocket-Origin: http://game.localhost\r\n'
            + 'Sec-WebSocket-Accept: ' + parseHandshake(data) + '\r\n\r\n';

            console.log(response);
            socket.write(response, 'binary');
            handshake = false;
        }
        else
        {
            console.log(decodeWebSocket(data));
            socket.write("test", 'binary');
        }

    });
});

server.listen(1337, '127.0.0.1');