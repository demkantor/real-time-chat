import React from 'react';
import './TextContainer.css';


const TextContainer = ({ users }) => (
    <div className="textContainer">
        <h1>Realtime Chat Application 
            <span role="img" aria-label="emoji">
                💬
            </span>
        </h1>
        {users
        ? (
            <>
                <h1>People currently chatting:</h1>
                <div className="activeContainer">
                    <h2>
                        {users.map(({name}) => (
                            <div key={name} className="activeItem">
                                <i className="onlineIcon fas fa-chevron-circle-right"></i>
                                {name}
                            </div>
                        ))}
                    </h2>
                </div>
            </>
        ) : 
        null}
    </div>
);


export default TextContainer;
