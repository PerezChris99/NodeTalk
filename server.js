const express = require('express');
const http = require('http');
const sockets = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketio(server);

//routes
app.get('/', (req, res)=> {
    res.sendFile(__dirname+ '/index.html');
})

//socket connection handler
io.on('connection', (socket) => {
    console.log('A new user connected to the chat');

    //handle incoming messages
    socket.on('message', (message) => {
        console.log('Message received: ', message);
        //broadcasting the message to all connected users
        io.emit('message', message)
    });

    //disconneced handler
    socket.on('disconnect', () => {
        console.log('A user disconneced')
    })
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
