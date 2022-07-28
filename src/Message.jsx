import React from 'react';

const Message = ({ reward, onClickClose }) => {
  if (!reward) return <></>;

  return (
    <div className="container message">
      <button className="btn-close" onClick={onClickClose}>
        <img src="/images/close.png" />
      </button>
      <h2>{reward.data.title}</h2>
      <p
        dangerouslySetInnerHTML={{
          __html: reward.data.description.replaceAll('<br />', '<br /><br />')
        }}
      ></p>
    </div>
  );
};

export default Message;
