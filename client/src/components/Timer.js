import React from "react";
import Countdown from 'react-countdown'
import Winner from './Winner'
const FakeTimer = () => <span>Draw In: 00:00:10</span>;
const CountDown = (time, callback) => <Countdown date={Date.now() + (time * 1000)} renderer= {callback} />;


function Timer(props)
{
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
          // Render a completed state
          return <Winner />
        } else {
          if(hours.length === 1)
          {
            hours = 0+""+hours;
          }
          if(minutes.length === 1)
          {
            minutes = 0+""+minutes;
          }
          if(seconds.length === 1)
          {
            seconds = 0+""+seconds;
          }
          return <span>Draw In: {hours}:{minutes}:{seconds}</span>;
        }
    };
    return (
        <div className="timer">
            {(props.start) ? CountDown(10, renderer) : <FakeTimer/>}
        </div>
    );
}
export default Timer;