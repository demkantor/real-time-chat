import React, { useState, useHook, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './chat.css';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    // declares our url
    const ENDPOINT = 'localhost:5000';

    // handles when a user joins or leaves a room
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {
            
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        };
        
    }, [ENDPOINT, location.search]);

    // add new messags
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);

    // handles sending messages
    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    };

    console.log(message, messages)

    return (
        <div className="outerContainer">
            <div className="container">
                <input 
                    value={message} 
                    onChange={(event) => setMessage(event.target.value)} 
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} />
            </div>
        </div>
    )
};

export default Chat;
