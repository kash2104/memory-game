import React, { useEffect, useState } from "react";
import { getLeaderboard } from "../../services/operations/scoreAPI";
import { useSelector } from "react-redux";

const LeaderBoard = () => {
  const { token } = useSelector((state) => state.auth);

  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLeaders = async () => {
      setLoading(true);
      try {
        const result = await getLeaderboard(token);
        console.log("Leaderboard result is ", result);
        setLeaders(result);
      } catch (error) {
        console.log("Error while fetching leaderboard", error);
      }
      setLoading(false);
    };
    fetchLeaders();
  }, []);

  return (
    <div className="flex flex-col items-center w-11/12 mx-auto bg-richblack-900 mt-6">
      <h1 className="text-3xl font-bold text-yellow-50 mb-6">LeaderBoard</h1>

      {loading ? (
        <p className="text-lg text-white">Loading...</p>
      ) : (
        <div className="w-full max-w-md bg-richblack-700 p-6 rounded-lg shadow-lg">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-richblack-600 py-4"
            >
              <p className="text-white text-lg font-medium">
                {leader.user.email}
              </p>
              <p className=" text-btn text-lg font-bold">
                {leader.user.highestScore}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;
