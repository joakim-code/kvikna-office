
import './App.css';
import Time from './components/timecounter/Time';
import CountDown from './components/countdown/CountDown'

function App() {

  return (
    <div id="">
      <div id="route-container"></div>
      <div id="time-container">
        <Time></Time>
      <div align="right">
        <div id="spinner-container">
                <img id="static-logo" src="icons_v1/kvikna_spinner_black.png" alt="Static Logo"/>
                <img id="static-logo-white" src="icons_v1/kvikna_spinner_white.png" alt="Static Logo White"/>
                <img id="rotating-logo" src="icons_v1/kvikna_spinner_red.png" alt="Rotating Logo"/>
            </div>
        </div>
      </div>
      <div id="destination-container">
        <CountDown></CountDown>
      </div>
    </div>
    
  );
}

export default App;