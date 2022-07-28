import React from 'react';

const Collection = ({ collection, onSelectReward }) => {
  if (!collection) return <></>;

  return (
    <div className="collection-box">
      <ul className="collection">
        {collection.map((reward) => (
          <li
            key={reward.index}
            onClick={() => {
              onSelectReward(reward);
            }}
          >
            <h3>{reward.index}</h3>
          </li>
        ))}
        <li className="next"></li>
      </ul>

      <ul className="collection-back">
        {new Array(Math.floor((collection.length + 1) / 8 + 1) * 8)
          .fill(0)
          .map((n) => (
            <li></li>
          ))}
      </ul>
    </div>
  );
};

export default Collection;
