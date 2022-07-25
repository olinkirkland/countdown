import { useEffect, useState } from 'react';

let version2 = false;

function Main() {
  const targetTime = new Date('2022-12-16T00:00:00');

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [weeks, setWeeks] = useState(0);
  const [secondsUntil20Weeks, setSecondsUntil20Weeks] = useState(0);

  useEffect(() => {
    setValues();
    const interval = setInterval(setValues, 1000);

    return () => clearInterval(interval);
  }, []);

  const setValues = () => {
    const _seconds = (targetTime - new Date()) / 1000;
    const _minutes = _seconds / 60;
    const _hours = _minutes / 60;
    const _days = _hours / 24;
    const _weeks = _days / 7;

    setSeconds(Math.floor(_seconds % 60));
    setMinutes(Math.floor(_minutes % 60));
    setHours(Math.floor(_hours % 24));
    setDays(Math.floor(_days % 7));
    setWeeks(Math.floor(_weeks));

    const _secondsUntil20Weeks = _seconds - 60 * 60 * 24 * 7 * 20;
    console.log(_secondsUntil20Weeks);
    setSecondsUntil20Weeks(Math.floor(_secondsUntil20Weeks));
    if (_secondsUntil20Weeks <= 0) {
      // Show the 20 week update
      version2 = true;
    }
  };

  return (
    <div className="main">
      {!version2 && (
        <div className="version2-waiting">
          <span>20 week update is coming soon</span>
          <div className="progress">
            <div
              style={{
                width: `${((345600 - secondsUntil20Weeks) / 345600) * 100}%`
              }}
            />
          </div>
        </div>
      )}
      <div className="container countdown">
        <header>
          <h2>Counting Down</h2>
          <p>To Amber's Return ✈️🌎</p>
        </header>
        <div className="countdown-group">
          <div className="countdown-item">
            <div className="countdown-item-number">{weeks}</div>
            <div className="countdown-item-label">Weeks</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-item-number">{days}</div>
            <div className="countdown-item-label">Days</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-item-number">{hours}</div>
            <div className="countdown-item-label">Hours</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-item-number">{minutes}</div>
            <div className="countdown-item-label">Minutes</div>
          </div>
          <div className="countdown-item">
            <div className="countdown-item-number">{seconds}</div>
            <div className="countdown-item-label">Seconds</div>
          </div>
        </div>
        <span className="celebrate">
          <span>Get ready to 🎉 celebrate on </span>
          <span>{targetTime.toLocaleDateString()}</span>
        </span>
      </div>
      {version2 && <div className="container"></div>}
      <p className="tagline">Made with ❤️</p>
    </div>
  );
}

export default Main;
