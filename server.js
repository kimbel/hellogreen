// We create  UDP socket of type udp4
var server = require('dgram').createSocket('udp4');
// Module node.js for compress files/buffer
var zlib = require('zlib');
// Module node.js for managing files
var fs = require('fs');

server.on('listening', function () {
    // var address = server.address();
    // console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (compressedMessage) {
	// method inflate uncompress the message which is received
	zlib.inflate(compressedMessage, function(err, message) {
		if (err) throw err;
		// Write message from raspberry into /opt/gclc/gclc.log
		// server.js is set into /opt/gclc/hellogreen/
	    fs.writeFile('../gclc.log', message, function(err) {
	    	if (err) throw err;
	    	// console.log('File gclc.log written');
	    });
	});
	
});
// The socket which received the data is listening on 3000 port
server.bind(3000);
