var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({ //When this runs, the WebSockets server is established and bound to the specified port
    port: port
});
var messages = []; //Will hold on to messages

console.log('websockets server started');

ws.on('connection', function (socket) {
    console.log('client connection established');

    messages.forEach(function (msg) { //Sends out all the old messages to each new connection as it arrives
        socket.send(msg); //As soon as a connection is made, the server iterates through the messages and sends each one to the new connection
    });

    socket.on('message', function (data) {
        console.log('message received: ' + data);
        messages.push(data); //Adds each new message to your array as it arrives
        ws.clients.forEach(function (clientSocket) { //Keeps track of all connections via its clients property. It is an arrya that you can iterate through
            clientSocket.send(data); //In your iterator callback, you only need to send the message data
        });
    });
});