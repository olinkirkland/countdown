import { useEffect, useState } from 'react';
import Collection from './Collection';
import Message from './Message';
import collectionData from './CollectionData.json';
import toSemanticDate from './semanticDate';
import Fortune from './Fortune';

const SERVER_URL = 'https://countdown-backend-production.up.railway.app/';
// const SERVER_URL = 'http://127.0.0.1:3001/';

let version2 = false;
let isAuthenticated = false;

function Main() {
  const targetTime = new Date('2023-03-23T19:30:00');
  const countdownPatchReleaseFromTime = new Date('2023-01-01T00:00:00');
  const patchReleaseTime = new Date('2023-03-01T00:00:00');

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [weeks, setWeeks] = useState(0);

  const [secondsUntilPatchRelease, setSecondsUntilPatchRelease] = useState(0);
  const [percentUntilUpdate, setPercentUntilUpdate] = useState(0);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Rewards
  const [collection, setCollection] = useState(collectionData);
  const [showCollection, setShowCollection] = useState(false);

  // Message popup
  const [currentReward, setCurrentReward] = useState();

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

    // Update the seconds until patchReleaseTime
    setSecondsUntilPatchRelease(
      Math.floor((patchReleaseTime.valueOf() - new Date().valueOf()) / 1000)
    );

    if (
      window.location.hostname === 'localhost' ||
      secondsUntilPatchRelease <= 0
    ) {
      // Show the 20 week update
      version2 = true;
    }
  };

  useEffect(() => {
    const totalSeconds =
      (patchReleaseTime.valueOf() - countdownPatchReleaseFromTime.valueOf()) /
      1000;

    const percent = Math.floor(
      ((totalSeconds - secondsUntilPatchRelease) / totalSeconds) * 100
    );

    setPercentUntilUpdate(percent);
  }, [secondsUntilPatchRelease]);

  function setRewardFavorite(index, isFavorite) {
    console.log('setRewardFavorite', index, isFavorite);
    fetch(
      SERVER_URL +
        'favorite?password=' +
        password +
        '&index=' +
        index +
        '&favorite=' +
        isFavorite
    ).then((response) => {
      response.json().then((collectionData) => {
        setCollection(collectionData);
        const rewardIndex = index;
        setTimeout(() => {
          setCurrentReward(null);
          setCurrentReward(collectionData[rewardIndex - 1]);
        });
      });
    });
  }

  useEffect(() => {
    if (!isLoading) {
      // Focus the password input
      const inputPassword = document.querySelector('.container--auth input');
      if (inputPassword) inputPassword.focus();
    }
  }, [isLoading]);

  function validatePassword(passwordOverride) {
    // Is the password valid?
    const p = passwordOverride ? passwordOverride : password;
    fetch(SERVER_URL + '?password=' + p).then((response) => {
      if (response.status === 200) {
        isAuthenticated = true;
        localStorage.setItem('password', p);
        setPassword(p);
      } else isAuthenticated = false;

      setIsLoading(false);
    });
  }

  return (
    // div className="main", if isLoading, className="main hidden"
    <>
      {isLoading && (
        <div className="loading-message">
          <span>Connecting...</span>
        </div>
      )}
      <div className={isLoading ? 'main hidden' : 'main'}>
        {!version2 && (
          <div className="version2-waiting">
            <span>Spring update is coming soon!</span>
            <div className="progress">
              <div
                style={{
                  width: percentUntilUpdate + '%'
                }}
              />
            </div>
            <span>{percentUntilUpdate}%</span>
          </div>
        )}

        <div className="container countdown">
          <header>
            <h2>Counting Down</h2>
            <span className="flex-row">
              <p>to our next reunification</p>
            </span>
            {(version2 && isAuthenticated && <Fortune />) || (
              <img className="logo" src="images/logo.png" alt="logo" />
            )}
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
            Can't wait to see you on {toSemanticDate(targetTime)}!
          </span>
        </div>

        {!isAuthenticated && (
          <div className="container container--auth">
            <p>Enter the code to unlock.</p>
            <div className="input-with-button">
              <input
                type="text"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button className="icon" onClick={() => validatePassword()}>
                <i className="fas fa-right-to-bracket" />
              </button>
            </div>
          </div>
        )}

        {isAuthenticated && !currentReward && (
          <div className="container container--reward">
            <button
              className="button button--show-collection"
              onClick={() =>
                setShowCollection((showCollection) => !showCollection)
              }
            >
              {showCollection ? 'Hide' : 'Show'}
              <i className="fas fa-heart" />
              Notes
            </button>
            {showCollection && (
              <Collection
                collection={collection}
                onSelectReward={(reward) => {
                  setCurrentReward(reward);
                }}
              />
            )}
          </div>
        )}

        {currentReward && (
          <Message
            reward={currentReward}
            onClickClose={() => {
              setCurrentReward(null);
            }}
            onClickFavorite={() => {
              setRewardFavorite(currentReward.index, !currentReward.isFavorite);
            }}
          />
        )}

        <div className="flex-row tagline">
          <span>Made with lub for my bug</span>
        </div>
      </div>
    </>
  );
}

export default Main;
