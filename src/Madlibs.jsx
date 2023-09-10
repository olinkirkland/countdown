import React, { useEffect, useState } from 'react';
import { fetchMadlib } from './MadlibsController';

export default function Madlibs() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [story, setStory] = useState('');

  useEffect(() => {
    document.body.style.overflow = isPopupOpen ? 'hidden' : 'auto';
  }, [isPopupOpen]);

  useEffect(() => {
    (async () => {
      setStory(JSON.stringify(await fetchMadlib()));
    })();
  }, []);

  return (
    <>
      <button className="fortune-button" onClick={() => setIsPopupOpen(true)}>
        <img src="images/madlibs.png" alt="madlibs" />
      </button>
      <div
        className={'popup-overlay ' + (isPopupOpen ? 'active' : '')}
        onClick={() => setIsPopupOpen(false)}
      ></div>
      <div className={'popup madlibs ' + (isPopupOpen ? 'active' : '')}>
        <button className="btn-close" onClick={() => setIsPopupOpen(false)}>
          <i className="fas fa-times"></i>
        </button>
        <h2>Madlibs</h2>
        <p>Let's write a story together.</p>
        <pre>{story}</pre>
      </div>
    </>
  );
}
