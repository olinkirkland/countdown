import React from 'react';

const Message = ({ reward, onClickClose }) => {
  if (!reward) return <></>;

  return (
    <div className="container message">
      <button className="btn-close" onClick={onClickClose}>
        <img src="/images/close.png" />
      </button>
      <h2>
        {reward.data.title}
      </h2>
      <p>{reward.data.description}</p>
    </div>
  );
};

export default Message;
