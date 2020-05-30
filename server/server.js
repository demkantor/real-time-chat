const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const router = require('./router');
app.use(router);

io.on('connection', (socket) => {
    console.log('We have a connection!!');

    socket.on('join', ({ name, room }, callback)=> {
        console.log(name, room);


        
    });

    socket.on('disconnect', () => {
        console.log('User has left!!');
    });

});











// set server to port 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server is now running on port: ${PORT}`));
