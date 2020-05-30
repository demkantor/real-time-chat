import React, { useState, useHook, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './chat.css';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {
            
        });
    }, [ENDPOINT, location.search]);

    return (
        <h1>Chat with me!</h1>
    )
};

export default Chat;