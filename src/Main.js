import { useEffect, useState } from 'react';

function Main() {
  const targetTime = new Date('2022-12-16T00:00:00');

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [weeks, setWeeks] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
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
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main">
      <div className="countdown">
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
        <p>Get ready to 🎉 celebrate on {targetTime.toDateString()}</p>
      </div>
      <p className="tagline">
        Made with ❤️ for Amber <span className="muted">| from Olin</span>
      </p>
    </div>
  );
}

export default Main;
