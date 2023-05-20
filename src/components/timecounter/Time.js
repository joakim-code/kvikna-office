import React, { useEffect, useState } from 'react';
import './Time.css'

function Time(props) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      
      const now = new Date();
      const hours = ('0' + now.getHours()).slice(-2);
      const minutes = ('0' + now.getMinutes()).slice(-2);
      const seconds = ('0' + now.getSeconds()).slice(-2);

      const currentTime = `${hours}:${minutes}:${seconds}`;
      setCurrentTime(currentTime);
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <div id="countdown-clock">
        <div id="selected-station">Kvikna Tønsberg</div>
        <div id="current-time">{currentTime}</div>
        <div id="selected-station">Lunch time!</div>
    </div>
  )
}

export default Time;
