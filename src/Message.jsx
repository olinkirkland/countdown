import React from 'react';

const Message = ({ reward, onClickClose, onClickFavorite }) => {
  if (!reward) return <></>;

  return (
    <div className="container message">
      <span>#{reward.index}</span>
      <button className="btn-close" onClick={onClickClose}>
        <i className="fas fa-times"></i>
      </button>
      <h2>{reward.data.title}</h2>
      <p
        dangerouslySetInnerHTML={{
          __html: reward.data.description.replaceAll('<br />', '<br /><br />')
        }}
      ></p>

      {/* <button
        className={`btn-favorite ${reward.isFavorite ? 'active' : ''}`}
        onClick={onClickFavorite}
      >
        <img src="/images/star.png" />
      </button> */}
    </div>
  );
};

export default Message;
