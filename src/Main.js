import { useEffect, useState } from 'react';

const SERVER_URL = 'https://ambertime.herokuapp.com/';

let version2 = false;
let isAuthenticated = false;

function Main() {
  const targetTime = new Date('2022-12-16T00:00:00');

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [weeks, setWeeks] = useState(0);
  const [secondsUntil20Weeks, setSecondsUntil20Weeks] = useState(0);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to get the auth code from the auth localstorage
    const localPassword = localStorage.getItem('password');
    setPassword(localPassword ? localPassword : '');
    if (localPassword) validatePassword(localPassword);
    else setIsLoading(false);

    // Start countdown loop
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
    setSecondsUntil20Weeks(Math.floor(_secondsUntil20Weeks));

    if (window.location.hostname === 'localhost' || _secondsUntil20Weeks <= 0) {
      // Show the 20 week update
      version2 = true;
    }

    version2 = false;
  };

  useEffect(() => {
    if (!isLoading) {
      // Focus the password input
      const inputPassword = document.querySelector('.container--auth input');
      if (inputPassword) inputPassword.focus();
    }
  }, [isLoading]);

  function validatePassword(passwordOverride) {
    // Is the password valid?
    console.log(password, passwordOverride);
    const p = passwordOverride ? passwordOverride : password;
    fetch(SERVER_URL + '?password=' + p).then((response) => {
      if (response.status === 200) {
        isAuthenticated = true;
        localStorage.setItem('password', p);
      } else isAuthenticated = false;

      setIsLoading(false);
    });
  }

  return (
    // div className="main", if isLoading, className="main hidden"
    <div className={isLoading ? 'main hidden' : 'main'}>
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
          <span className="flex-row">
            <p>to Amber's return</p>
          </span>
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
        <span className="flex-row celebrate">
          Get ready to celebrate on {targetTime.toLocaleDateString()}
        </span>
      </div>

      {version2 && !isAuthenticated && (
        <div className="container container--auth">
          <p>Enter the code to unlock.</p>
          <div className="input-with-button">
            <input
              type="text"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="icon" onClick={() => validatePassword()}>
              <img src="images/ok.png" alt="" />
            </button>
          </div>
        </div>
      )}

      {version2 && isAuthenticated && <div className="container"></div>}
      <div className="flex-row tagline">
        <span>Made with</span>
        <img className="icon-inline" src="images/heart.png" alt="" />
      </div>
    </div>
  );
}

export default Main;
