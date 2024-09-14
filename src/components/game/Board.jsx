import React, { useEffect, useState } from "react";
import Card from "./Card";
import { updateScores } from "../../services/operations/scoreAPI";
import { useDispatch, useSelector } from "react-redux";
import Confetti from "react-confetti";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/authAPI";
import { useWindowSize } from "react-use"; // Import useWindowSize hook

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

  // Get the window size
  const { width, height } = useWindowSize();

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
    <div className="text-richblack-50 p-6 relative">
      {showConfetti && (
        <Confetti width={width} height={height} /> // Set Confetti width and height dynamically
      )}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 p-4 bg-gray-100 rounded-lg shadow-md space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Turns display */}
        <div className="flex flex-col items-center sm:items-start">
          <p className="text-2xl font-bold text-caribbeangreen-100">Turns</p>
          <p className="text-4xl font-extrabold text-gray-800">{turns}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/leader-board">
            <button className="px-4 py-2 w-full sm:w-auto bg-richblue-100 text-white rounded-lg shadow-md hover:bg-richblue-200 focus:outline-none focus:ring-2 focus:ring-richblue-400">
              Leader Board
            </button>
          </Link>
          <button
            onClick={shuffleCards}
            className="px-4 py-2 w-full sm:w-auto bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            New Game
          </button>
          <button
            onClick={logoutHandler}
            className="px-4 py-2 w-full sm:w-auto bg-pink-200 text-white rounded-lg shadow-md hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Quit Game
          </button>
        </div>
      </div>
      <div className="card-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
