import React, { useEffect, useState } from "react";
import Card from "./Card";
import { updateScores } from "../../services/operations/scoreAPI";
import { useDispatch, useSelector } from "react-redux";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/authAPI";

const cardImages = [
  { src: "/images/angular.png", matched: false },
  { src: "/images/mongodb.png", matched: false },
  { src: "/images/nextjs.png", matched: false },
  { src: "/images/nodejs.png", matched: false },
  { src: "/images/reactjs.png", matched: false },
  { src: "/images/postgres.png", matched: false },
];

const Board = ({ setHighestScore, setAllScores, highScore }) => {
  const { token } = useSelector((state) => state.auth);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // State for confetti

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);

    setCards(shuffledCards);
    setTurns(0);
    setShowConfetti(false); // Hide confetti when starting a new game
  };

  // Handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Check game completion
  useEffect(() => {
    const checkGameOver = async () => {
      if (cards.length && cards.every((card) => card.matched)) {
        // Game over
        const result = await updateScores(token, turns);

        if (result.highestScore > highScore) {
          setShowConfetti(true); // Show confetti for new high score
          // setTimeout(() => setShowConfetti(false), 5000);
        }

        setHighestScore(result.highestScore);
        setAllScores(result.allScores);
      }
    };
    checkGameOver();
  }, [turns]);

  // Start game
  useEffect(() => {
    shuffleCards();
  }, []);

  //logout
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout(navigate));
  };
  return (
    <div className="text-richblack-50 p-6">
      {showConfetti && <Confetti />} {/* Display confetti */}
      <div className="flex items-center justify-between mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
        {/* Turns display */}
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold text-caribbeangreen-100">Turns</p>
          <p className="text-4xl font-extrabold text-gray-800">{turns}</p>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={shuffleCards}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            New game
          </button>
          <button
            onClick={logoutHandler}
            className="px-4 py-2 bg-pink-200 text-white rounded-lg shadow-md hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Quit game
          </button>
        </div>
      </div>
      <div className="card-grid grid grid-cols-4 gap-4 h-[500px] -mt-2">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
