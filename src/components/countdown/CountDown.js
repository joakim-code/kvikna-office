import React, { useEffect, useState } from 'react';
import './CountDown.css'
import getJourneys from './entur-graphql';

function CountDown() {
  const [currentStartTime, setCurrentStartTime] = useState('');
  const [currentTimeToGo, setCurrentTimeToGo] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [journeys, setJourneys] = useState([]);


  useEffect(() => {
    async function fetchData() {
  
      const fromTime = new Date();
      const fromStation = "NSR:StopPlace:58876"
      const toStation = "NSR:StopPlace:59872"
      const result = await getJourneys(fromStation, toStation, fromTime);
      console.log(JSON.stringify(result));
      setJourneys(result.tripPatterns);
  
    }
  
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {

        const nextTrip =  journeys[0];

        const expectedStartTime = new Date(nextTrip.expectedStartTime);
        const startTime = new Date(nextTrip.startTime);

        const now = new Date();
        now.setHours(now.getHours() + 1);
        const timeToGo = new Date(startTime-now);

        const hours = ('0' + timeToGo.getHours()).slice(-2);
        const minutes = ('0' + timeToGo.getMinutes()).slice(-2);
        const seconds = ('0' + timeToGo.getSeconds()).slice(-2);

        const currentTimeToGo = `${hours}:${minutes}:${seconds}`;

        const shours = ('0' + startTime.getHours()).slice(-2);
        const sminutes = ('0' + startTime.getMinutes()).slice(-2);
        const sseconds = ('0' + startTime.getSeconds()).slice(-2);

        const currentStartTime = `${shours}:${sminutes}:${sseconds}`;
        
        setCurrentStatus('sitting');

        if((timeToGo.getHours() === 0 && timeToGo.getMinutes() < 12) || timeToGo.getHours() > 0) {
            //to close to make it, go back to work wait for next one
            setCurrentStatus('sitting');
        }

        if((timeToGo.getHours() === 0 && timeToGo.getMinutes() > 12) && timeToGo.getMinutes() <= 18) {
            setCurrentStatus('running');
        }

        if((timeToGo.getHours() === 0 && timeToGo.getMinutes() > 18) && timeToGo.getMinutes() < 30) {
            setCurrentStatus('walking');
        }

        setCurrentTimeToGo(currentTimeToGo);
        setCurrentStartTime(currentStartTime);
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on unmount
  }, [journeys]);

  return (
    <div id="countdown-clock">
        <div id="selected-station">Tønsberg <img height="10px" width="10px" alt="ikon" src="icons_v1/train.png"></img> Oslo</div>
        <div id="current-time">{currentTimeToGo}</div>
        <div id="selected-station">Neste avgang er {currentStartTime}</div>
        <div>
            <img id={currentStatus} src={`icons_v1/${currentStatus}.png`} alt={currentStatus}></img>
        </div>
    </div>
  )

}

export default CountDown;

/*
          <tbody>
            {journeys.map((journey, index) => (
              <tr key={index}>
                <td>{journey.expectedStartTime}</td>
                <td>{journey.duration}</td>
                <td>{journey.walkDistance}</td>
                <td>{journey.aimedEndTime}</td>
                <td>{journey.aimedStartTime}</td>
                <td>{journey.endTime}</td>
                <td>{journey.expectedEndTime}</td>
                <td>{journey.distance}</td>
                <td>{journey.startTime}</td>
                <td>{journey.waitingTime}</td>
              </tr>
            ))}
          </tbody>

*/