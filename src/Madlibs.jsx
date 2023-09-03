import React, { useEffect, useState } from 'react';

export default function Madlibs() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <button className="fortune-button" onClick={() => setIsPopupOpen(true)}>
        <img src="images/madlibs.png" alt="madlibs" />
      </button>
    </>
  );
}
