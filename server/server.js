const express = require('express');
const socketio = require('socket.io');
const http = require('http');

// get helper function middleware
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// sets the router for our server
const router = require('./router');
app.use(router);


io.on('connection', (socket) => {
    // handles when a new user joins a room
    socket.on('join', ({ name, room }, callback)=> {
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name} welcome to the room ${user.room}!` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!!` });
        socket.join(user.room);

        callback();
    });

    // handles when a user sends a message
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });


    socket.on('disconnect', () => {
        console.log('User has left!!');
    });

});









// set server to port 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server is now running on port: ${PORT}`));
