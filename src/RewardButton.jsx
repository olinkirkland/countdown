import React from 'react';

const RewardButton = ({ reward, onClick }) => {
  if (!reward) return <></>;
  const timeWhenAvailable = new Date(reward.availableOnDate).getTime();
  // const timeUntilAvailable = timeAvailable - Date.now().getTime();

  return (
    <div className="button-reward-box">
      <img
        src={
          timeWhenAvailable > Date.now()
            ? '/images/mail.png'
            : '/images/love.png'
        }
        alt=""
      />

      <p>
        {timeWhenAvailable > Date.now()
          ? 'A message is on its way.'
          : 'A special message is waiting for you!'}
      </p>
      <button
        onClick={onClick}
        className={timeWhenAvailable > Date.now() ? '' : 'active'}
      >
        {(timeWhenAvailable > Date.now() && (
          <div className="flex-row">
            {Math.floor(
              (timeWhenAvailable - new Date().getTime()) / 1000 / 60 / 60
            ) > 0 && (
              <span className="hours">
                {Math.floor(
                  (timeWhenAvailable - new Date().getTime()) / 1000 / 60 / 60
                )}
                h
              </span>
            )}
            <span className="minutes">
              {Math.floor(
                (timeWhenAvailable - new Date().getTime()) / 1000 / 60
              ) % 60}
              m
            </span>
            <span className="seconds">
              {Math.floor((timeWhenAvailable - new Date().getTime()) / 1000) %
                60}
              s
            </span>
          </div>
        )) || <span>See my Message</span>}
      </button>
    </div>
  );
};

export default RewardButton;
