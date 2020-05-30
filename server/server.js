const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

// get helper function middleware
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// sets the router for our server
const router = require('./router');
app.use(router);
// set cors middleware
app.use(cors());


io.on('connection', (socket) => {
    // handles when a new user joins a room
    socket.on('join', ({ name, room }, callback)=> {
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error);

        socket.join(user.room);
        socket.emit('message', { user: 'chat-bot', text: `${user.name} welcome to the room ${user.room}!` });
        socket.broadcast.to(user.room).emit('message', { user: 'chat-bot', text: `${user.name} has joined!!` });

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();
    });

    // handles when a user sends a message
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    // handles user leaving a room
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('message', { user: 'chat-bot', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        }
    });

});


// set server to port 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server is now running on port: ${PORT}`));
