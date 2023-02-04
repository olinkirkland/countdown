import React, { useEffect, useState } from 'react';
import FortuneTeller from './FortuneTeller';

export default function Fortune() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [timeUntilNext, setTimeUntilNext] = useState(0);
  const [fortuneTeller, setFortuneTeller] = useState(null);
  const [interview, setInterview] = useState([]);
  const [step, setStep] = useState(-1);
  const [chosenCards, setChosenCards] = useState([]);
  const [deckMessage, setDeckMessage] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isPopupOpen ? 'hidden' : 'auto';
  }, [isPopupOpen]);

  useEffect(() => {
    console.log(interview);
  }, [interview]);

  useEffect(() => {
    if (deckMessage) setTimeout(() => setDeckMessage(null), 2000);
  }, [deckMessage]);

  function onBegin() {
    const f = new FortuneTeller();
    setFortuneTeller(f);
    setInterview(f.interviewQuestions);
    setStep(0);
    scrollToBottom();
  }

  function scrollToBottom() {
    setTimeout(() => {
      // Smooth scroll to bottom of the popup for firefox
      const popup = document.querySelector('.popup.fortune');
      // popup.scrollTop = popup.scrollHeight;
      popup.scrollTo({
        top: popup.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  }

  return (
    <>
      <button className="fortune-button" onClick={() => setIsPopupOpen(true)}>
        <img src="images/fortune.png" alt="fortune" />
      </button>
      <div
        className={'popup-overlay ' + (isPopupOpen ? 'active' : '')}
        onClick={() => setIsPopupOpen(false)}
      ></div>

      <div className={'popup fortune ' + (isPopupOpen ? 'active' : '')}>
        <button className="btn-close" onClick={() => setIsPopupOpen(false)}>
          <i className="fas fa-times"></i>
        </button>

        <div className="fortune__intro">
          <h2>My Fortune</h2>
          <h3>How does it work?</h3>
          <p>Receive a personal tarot reading using AI.</p>
          <p className="muted">
            First, Answer some questions about how you feel today.
          </p>
          <p className="muted">Then, reveal three cards.</p>
          <p className="muted">
            The AI will then interpret the cards along with your answers to give
            you a unique reading.
          </p>

          <p className="muted">
            You can receive a new reading one time every day.
          </p>

          <button
            className="button button--primary"
            onClick={onBegin}
            disabled={timeUntilNext > 0 || interview.length > 0}
          >
            Begin
          </button>
        </div>

        {interview.length > 0 && (
          <section className="fortune-interview">
            <ul>
              {interview.map((interviewQuestion, questionIndex) => (
                <li
                  className={
                    'fortune-interview__question-group' +
                    (questionIndex === step ? ' active' : '')
                  }
                  style={questionIndex <= step ? {} : { display: 'none' }}
                  key={questionIndex}
                >
                  <h3 className="fortune-interview__question">
                    {questionIndex + 1}. {interviewQuestion.question}
                  </h3>
                  <ul className="fortune-interview__answers">
                    {interviewQuestion.answers.map((answer, answerIndex) => (
                      <li key={answerIndex}>
                        <button
                          className={
                            'button' +
                            (interviewQuestion.choice === answerIndex
                              ? ' button--primary'
                              : '')
                          }
                          onClick={() => {
                            setInterview((interview) => {
                              interview[questionIndex].choice = answerIndex;
                              return interview;
                            });
                          }}
                        >
                          {interviewQuestion.choice === answerIndex && (
                            <i className="fas fa-check"></i>
                          )}
                          {answer}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="button button--fit button-next"
                    disabled={interviewQuestion.choice === undefined}
                    onClick={() => {
                      setStep(step + 1);
                      scrollToBottom();
                    }}
                  >
                    Next
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {step >= interview.length && (
          <section
            className={
              'fortune-deck' + (step === interview.length ? ' active' : '')
            }
          >
            <h3>Prepare the deck</h3>
            <p className="muted">
              Even though it's a digital deck, you can still shuffle it. I've
              shuffled it randomly once, but you can shuffle the deck as many
              times as you want, and even cut the cards.
            </p>
            <p className="muted">
              Once you complete this step, three cards will be removed from the
              deck: One from the top, one from the middle, and one from the
              bottom.
            </p>
            <button
              className="button button"
              onClick={() => {
                fortuneTeller.shuffleDeck();
                setDeckMessage('Shuffling the deck...');
              }}
            >
              <i className="fas fa-random"></i>
              Shuffle the deck
            </button>
            <button
              className="button button"
              onClick={() => {
                fortuneTeller.cutDeck();
                setDeckMessage('Cutting the deck...');
              }}
            >
              <i className="fas fa-random"></i>
              Cut the deck
            </button>

            {deckMessage && (
              <div className="deck-message">
                <img src="images/cards.png" alt="fortune" />
                {deckMessage}
              </div>
            )}

            <button
              className="button button--primary"
              onClick={() => {
                setStep((step) => step + 1);
                setChosenCards(fortuneTeller.drawCards());
                scrollToBottom();
              }}
            >
              Reveal the cards
            </button>
          </section>
        )}
        {step >= interview.length + 1 && (
          <section className="fortune-cards">
            <h3>Reveal the cards</h3>
            <p className="muted">Tap each card to reveal it.</p>
            <div className="fortune-cards__deck">
              {chosenCards.map((card, cardIndex) => (
                <li
                  key={cardIndex}
                  className={
                    'fortune-cards__card' + (card.revealed ? ' revealed' : '')
                  }
                  onClick={() => {
                    setChosenCards((chosenCards) => {
                      chosenCards[cardIndex].revealed = true;
                      return chosenCards;
                    });
                  }}
                >
                  <div className="fortune-cards__card__front">
                    <img
                      src={
                        'images/tarot/' +
                        (card.image ? card.image : 'sword') +
                        '.png'
                      }
                      alt="fortune"
                    />
                  </div>

                  <div className="fortune-cards__card__back">
                    <img
                      src={
                        card.type.includes('Major')
                          ? 'images/tarot/back-major.png'
                          : 'images/tarot/back-minor.png'
                      }
                      alt="fortune"
                    />
                    <div className="fortune-cards__card__back__type">
                      <img
                        src={
                          card.type.includes('Major')
                            ? 'images/tarot/icon-major.png'
                            : 'images/tarot/icon-minor.png'
                        }
                        alt="fortune"
                      />
                      <span>{card.type}</span>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
