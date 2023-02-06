export default function TimeUntilNextFortune({ onBegin, disabled }) {
  const [timeUntilNextFortune, setTimeUntilNextFortune] = useState(
    getTimeUntilNextFortune
  );

  const formattedTimeUntilNextFortune = formatTime(timeUntilNextFortune);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeUntilNextFortune(timeUntilNextFortune());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      {timeUntilNextFortune > 0 && (
        <div className="please-wait">
          <p>
            You can receive another reading in {formattedTimeUntilNextFortune}.
          </p>
        </div>
      )}

      <button
        className="button button--primary"
        onClick={onBegin}
        disabled={timeUntilNextFortune > 0 || disabled}
      >
        Begin
      </button>
    </>
  );
}

function getTimeUntilNextFortune() {
  const timeNextFortuneUnlocks = localStorage.getItem("timeNextFortuneUnlocks");

  if (window.location.hostname === "localhost" || !timeNextFortuneUnlocks)
    return 0;

  return Math.max(0, timeNextFortuneUnlocks - Date.now());
}

function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);

  if (seconds < 60) {
    return seconds + " seconds";
  }
  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return minutes + " minutes";
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 2) {
    return hours + " hours and " + (minutes % 60) + " minutes";
  }

  return "about " + hours + " hours";
}
