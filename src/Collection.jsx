import React from 'react';

const Collection = ({ collection, onSelectReward }) => {
  if (!collection) return <></>;

  return (
    <div className="collection-box">
      <ul className="collection">
        {collection.map((reward) => (
          <li
            key={'collection-' + reward.index}
            onClick={() => {
              onSelectReward(reward);
            }}
          >
            <h3>{reward.index}</h3>
            {/* {reward.isFavorite && <img src="images/star.png" />} */}
            {reward.isUnlocked && (
              // reward.data.description contains '<img', then add the .with-image class
              <div
                className={`date-badge ${
                  reward.data.description.includes('<img') ? 'with-image' : ''
                }`}
              >
                {formatDate(reward.availableOnDate)}
              </div>
            )}
          </li>
        ))}
        {/* <li className="next"></li> */}
      </ul>

      <ul className="collection-back">
        {new Array(Math.floor(collection.length)).fill(0).map((n, index) => (
          <li key={'collection-back-' + index}></li>
        ))}
      </ul>
    </div>
  );
};

function formatDate(date) {
  // 2022-08-02T21:55:38.867Z to 8/2
  const d = new Date(date);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export default Collection;
