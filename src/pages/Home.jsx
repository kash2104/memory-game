import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllScores, getHighestScore } from "../services/operations/scoreAPI";
import Board from "../components/game/Board";

const Home = () => {
  const { token } = useSelector((state) => state.auth);
  const [highestScore, setHighestScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allScores, setAllScores] = useState([]);

  useEffect(() => {
    const fetchHighScore = async () => {
      setLoading(true);
      try {
        const result = await getHighestScore(token);
        setHighestScore(result);
      } catch (error) {
        console.log("Error while getting the highest score", error);
      }
      setLoading(false);
    };
    fetchHighScore();
  }, [setHighestScore]);

  useEffect(() => {
    const fetchAllScores = async () => {
      setLoading(true);
      try {
        const result = await getAllScores(token);
        setAllScores(result);
        setLoading(false);
      } catch (error) {
        console.log("Error while fetching all scores", error);
      }
      setLoading(false);
    };
    fetchAllScores();
  }, [setAllScores]);

  const lastTenScores = allScores.slice(0, 10);

  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 px-4 py-6 lg:px-8 lg:py-10">
      <div className="w-full lg:w-[300px] mx-auto lg:mx-0 p-6 bg-richblack-25 rounded-lg shadow-md">
        {/* Highest Score */}
        <div className="flex justify-between items-center border-b-2 pb-4 mb-6">
          <p className="text-lg font-semibold text-gray-700">Highest Score</p>
          <div className="text-2xl font-bold text-green-500">
            {highestScore}
          </div>
        </div>
        {/* Previous Scores */}
        <div>
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Previous Scores
          </p>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <ul className="space-y-2">
              {lastTenScores.length > 0 ? (
                lastTenScores.map((score, index) => (
                  <li
                    key={index}
                    className="bg-white rounded-lg shadow-md px-4 py-2 flex items-center justify-between text-gray-800 transform transition-all hover:scale-105 hover:bg-green-100"
                  >
                    <span className="font-medium text-lg">{index + 1}.</span>
                    <span className="text-lg font-semibold">{score}</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No previous scores available.</p>
              )}
            </ul>
          )}
        </div>
      </div>

      <div className="flex-1">
        <Board
          setHighestScore={setHighestScore}
          setAllScores={setAllScores}
          highScore={highestScore}
        />
      </div>
    </div>
  );
};

export default Home;
