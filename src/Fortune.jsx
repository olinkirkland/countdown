import React, { useEffect, useState } from "react";
import FortuneTeller from "./FortuneTeller";

export default function Fortune() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fortuneTeller, setFortuneTeller] = useState(null);
  const [interview, setInterview] = useState([]);
  const [step, setStep] = useState(-1);
  const [chosenCards, setChosenCards] = useState([]);
  const [deckMessage, setDeckMessage] = useState(null);
  const [reading, setReading] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isPopupOpen ? "hidden" : "auto";
  }, [isPopupOpen]);

  useEffect(() => {
    if (deckMessage === "Analyzing your cards...") return;
    if (deckMessage) setTimeout(() => setDeckMessage(null), 2000);
  }, [deckMessage]);

  useEffect(() => {
    if (chosenCards.length === 0 || step !== interview.length + 1) return;
    if (chosenCards.every((card) => card.revealed)) {
      setStep((step) => step + 0.5);
      setTimeout(() => {
        // Scroll where section.fortune-about-cards is at the top
        const fortuneAboutCards = document.querySelector(
          "section.fortune-about-cards"
        );
        if (fortuneAboutCards)
          fortuneAboutCards.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 2000);
    }
  }, [chosenCards]);

  useEffect(() => {
    if (step % 1 !== 0) return;
    setTimeout(() => {
      // Smooth scroll to bottom of the popup for firefox
      const popup = document.querySelector(".popup.fortune");
      popup.scrollTo({
        top: popup.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  }, [step]);

  useEffect(() => {
    if (!reading) return;
    setTimeout(() => {
      // Scroll where section.fortune-reading is at the top
      const fortuneAboutCards = document.querySelector(
        "section.fortune-reading"
      );
      if (fortuneAboutCards)
        fortuneAboutCards.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 200);
  }, [reading]);

  function onBegin() {
    const f = new FortuneTeller();
    setFortuneTeller(f);
    setInterview(f.interviewQuestions);
    setStep(0);
  }

  return (
    <>
      <button className="fortune-button" onClick={() => setIsPopupOpen(true)}>
        <img src="images/fortune.png" alt="fortune" />
      </button>
      <div
        className={"popup-overlay " + (isPopupOpen ? "active" : "")}
        onClick={() => setIsPopupOpen(false)}
      ></div>
      <div className={"popup fortune " + (isPopupOpen ? "active" : "")}>
        <button className="btn-close" onClick={() => setIsPopupOpen(false)}>
          <i className="fas fa-times"></i>
        </button>
        <div className="fortune__intro">
          <h2>My Fortune</h2>
          <h3>How does it work?</h3>
          <p className="muted">
            First, Answer some questions about how you feel today.
          </p>
          <p className="muted">
            Shuffle and cut the tarot deck as you wish. Then, reveal three
            cards.
          </p>
          <p className="muted">
            The AI will then interpret the cards along with your answers to give
            you a unique reading.
          </p>

          <TimeUntilNextFortune
            onBegin={onBegin}
            disabled={interview.length > 0}
          />
        </div>

        {interview.length > 0 && (
          <section className="fortune-interview">
            <ul>
              {interview.map((interviewQuestion, questionIndex) => (
                <li
                  className={
                    "fortune-interview__question-group" +
                    (questionIndex === step ? " active" : "")
                  }
                  style={questionIndex <= step ? {} : { display: "none" }}
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
                            "button" +
                            (interviewQuestion.choice === answerIndex
                              ? " button--primary"
                              : "")
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
                  <div className="row">
                    <button
                      className="button button--fit"
                      onClick={() => {
                        interviewQuestion.choice = undefined;
                        setStep(step + 1);
                      }}
                    >
                      Skip
                    </button>
                    <button
                      className="button button-link button--fit"
                      disabled={interviewQuestion.choice === undefined}
                      onClick={() => {
                        setStep(step + 1);
                      }}
                    >
                      Next
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {deckMessage && (
          <div className="deck-message">
            <img src="images/cards.png" alt="fortune" />
            {deckMessage}
          </div>
        )}

        {step >= interview.length && (
          <section
            className={
              "fortune-deck" + (step === interview.length ? " active" : "")
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
                setDeckMessage("Shuffling the deck...");
              }}
            >
              <i className="fas fa-random"></i>
              Shuffle the deck
            </button>
            <button
              className="button button"
              onClick={() => {
                fortuneTeller.cutDeck();
                setDeckMessage("Cutting the deck...");
              }}
            >
              <i className="fas fa-random"></i>
              Cut the deck
            </button>

            <button
              className="button button--primary"
              onClick={() => {
                setStep((step) => step + 1);
                setChosenCards(fortuneTeller.drawCards());
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
                    "fortune-cards__card" + (card.revealed ? " revealed" : "")
                  }
                >
                  <div className="fortune-cards__card__front">
                    <img
                      src={
                        "images/tarot/art/" +
                        (card.image ? card.image : "sword") +
                        ".png"
                      }
                      alt="fortune"
                    />
                    <div className="fortune-cards__card__front__content">
                      <img
                        className="card-icon"
                        src={
                          card.type.includes("Major")
                            ? "images/tarot/icon-major.png"
                            : "images/tarot/icon-minor.png"
                        }
                        alt="fortune"
                      />
                      <span>{card.name}</span>
                    </div>
                  </div>

                  <div
                    className="fortune-cards__card__back"
                    onClick={() => {
                      setChosenCards((chosenCards) => {
                        chosenCards[cardIndex].revealed = true;
                        return chosenCards.slice();
                      });
                    }}
                  >
                    <img
                      src={
                        card.type.includes("Major")
                          ? "images/tarot/back-major.png"
                          : "images/tarot/back-minor.png"
                      }
                      alt="fortune"
                    />
                    <div className="fortune-cards__card__back__type">
                      <img
                        className="card-icon"
                        src={
                          card.type.includes("Major")
                            ? "images/tarot/icon-major.png"
                            : "images/tarot/icon-minor.png"
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
        {step >= interview.length + 1.5 && (
          <section className="fortune-about-cards">
            <h3>About your cards</h3>
            <p className="muted">
              The cards you've chosen may have different meanings depending on
              their context. Here are some of their more common interpretations.
            </p>
            <ul className="fortune-about-cards__list">
              {chosenCards.map((card, cardIndex) => (
                <li key={cardIndex}>
                  <img
                    src={
                      "images/tarot/art/" +
                      (card.image ? card.image : "sword") +
                      ".png"
                    }
                    alt="fortune"
                  />

                  <div className="fortune-about-cards__list__content">
                    <h3>
                      {card.name}
                      <span className="muted"> • {card.type}</span>
                    </h3>
                    <p>{card.meaning}</p>
                  </div>
                </li>
              ))}
            </ul>

            <h3>Ready to receive your reading?</h3>

            <button
              className="button button--primary"
              disabled={!!reading}
              onClick={async () => {
                setReading(-1);
                setDeckMessage("Analyzing your cards...");
                setTimeout(async () => {
                  const r = await fortuneTeller.performReading();
                  setReading(r);
                  setDeckMessage(null);
                }, 500);
              }}
            >
              Perform my reading now
            </button>

            <p className="muted">
              * By tapping the button, both your selected cards and the answers
              to your questions from the beginning will be analyzed by the GPT-3
              autoregressive language model. It will take a moment for the AI to
              interpret your cards.
            </p>
          </section>
        )}

        {reading !== null && reading !== -1 && (
          <section className="fortune-reading">
            <h3>Your reading</h3>
            {reading.split("\n").map((line, lineIndex) => (
              <p key={lineIndex}>{line}</p>
            ))}

            <div className="share-buttons">
              {navigator.share && (
                <button
                  className="button button--fit"
                  onClick={() => {
                    navigator.share(reading);
                  }}
                >
                  <i className="fas fa-share-alt"></i>
                  Share
                </button>
              )}

              <button
                className="button button--fit"
                onClick={() => {
                  navigator.clipboard.writeText(reading);
                }}
              >
                <i className="fas fa-copy"></i>
                Copy
              </button>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
