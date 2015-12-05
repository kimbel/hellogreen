// dgram is a Node js module which allow us to get Datagram sockets
// using UDP protocol
var dgram = require('dgram');

// We create UDP socket of type udp4
var syslog = dgram.createSocket('udp4');

// zlib is a Node js module which allow us to compress string 
var zlib = require('zlib');

var messageConcat = '';
var date;

syslog.on('listening', function () {
    // var address = syslog.address();
    // console.log('UDP Raspberry listening on ' + address.address + ":" + address.port);
});

syslog.on('message', function (message, remote) {
    // console.log(remote.address + ':' + remote.port +' - ' + message);

	// if we detect in message the string "UTC+0100"
    if (message.indexOf('(UTC+0100') != -1) {
    	// a timeout is triggered
    	setTimeout(function() {
		 	// we compress the message which is received
    		zlib.deflate(messageConcat, function(err, dataBuffer) {
				if (err) throw err;

                // console.log('------ START FILE -----');
                // console.log(messageConcat);
                // console.log('------ END FILE -----');

				// we empty the variable messageConcat
				messageConcat = '';
				// We create UDP socket of type udp4 to send mesage
				var rpi = dgram.createSocket('udp4');
				// we send the data to our server on 3000 port
	    		rpi.send(dataBuffer, 0, dataBuffer.length, 3000, '51.255.62.46', function(err) {
				    if (err) throw err;
                    // console.log('UDP message sent to 51.255.62.46:3000');
				    rpi.close();
				});
			});
		 	
    	}, 240000); //Timer set to 4 min
    };

    date = new Date().toString().split(' '); //array ["Fri", "Dec", "04", "2015", "06:55:35", "GMT+0100", "(CET)"]

    // Concatenate message with date
    messageConcat += date[1];
    messageConcat += ' ';
    messageConcat += date[2].replace(/^0+/, ' ');
    messageConcat += ' ';
    messageConcat += date[4];
    messageConcat += ' ';
    messageConcat += message;

});
// The socket which received the data is listening on 514 port
syslog.bind(514);