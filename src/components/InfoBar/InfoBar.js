import React from 'react';
import './InfoBar.css';


const InfoBar = ({ room }) => (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <i className="onlineIcon fas fa-chevron-circle-right"></i>
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/"><i className="closeIcon fas fa-times-circle"></i></a>
      </div>
    </div>
  );
  
  export default InfoBar;
