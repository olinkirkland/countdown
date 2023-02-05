import cardDefinitions from './data/card-definitions.json';
import questionDefinitions from './data/questions.json';
import { SERVER_URL } from './Main';

export default class FortuneTeller {
  constructor() {
    this.prepareInterviewQuestions();
    this.prepareDeck();
  }

  prepareInterviewQuestions() {
    // Choose 3 unique questions from the question definitions
    this.interviewQuestions = [];
    while (this.interviewQuestions.length < 3) {
      const question = this.getRandomQuestion();
      if (!this.interviewQuestions.includes(question)) {
        this.interviewQuestions.push(question);
      }
    }
  }

  getRandomQuestion() {
    const index = Math.floor(Math.random() * questionDefinitions.length);
    return questionDefinitions[index];
  }

  prepareDeck() {
    this.deck = [];
    cardDefinitions.forEach((card) => {
      this.deck.push(card);
    });

    this.shuffleDeck();
  }

  shuffleDeck(deck) {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  cutDeck() {
    // Move the top half of the deck to the bottom
    const halfIndex = Math.floor(this.deck.length / 2);
    const halfDeck = this.deck.splice(0, halfIndex);
    this.deck = this.deck.concat(halfDeck);
  }

  drawCards() {
    // Returns three cards from the top, middle, and bottom
    // of the deck to simulate cutting the deck into three piles
    this.chosenCards = [
      this.deck[0],
      this.deck[Math.floor(this.deck.length / 2)],
      this.deck[this.deck.length - 1]
    ];

    return this.chosenCards;
  }

  async performReading() {
    const past = this.chosenCards[0];
    const present = this.chosenCards[1];
    const future = this.chosenCards[2];

    const fortuneData = {
      questions: this.interviewQuestions.map((question) => {
        return `${question.question} "${question.answers[question.choice]}"`;
      }),
      cards: [
        `The past is ${past.name}.`,
        `The present is ${present.name}.`,
        `The future is ${future.name}.`
      ]
    };

    const response = await fetch(SERVER_URL + 'fortune?password=miffy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fortuneData)
    });

    const fortune = await response.json();
    return fortune;
  }
}
