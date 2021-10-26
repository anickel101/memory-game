import { useEffect, useState } from 'react';
import './App.css';

import Card from './components/Card';


const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // start a game initially
  useEffect(() => {
    shuffleCards()
  }, [])


  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle choice
  const handleChoice = (card) => {
    if (choiceOne && choiceOne.id !== card.id) {
      setChoiceTwo(card)
    } else {
      setChoiceOne(card)
    }
  }

  // compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // reset turn & +1 to turns
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => <Card key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled} />)}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
