import toast from "react-hot-toast";
import { scoreEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const {
  GET_ALL_SCORES_API,
  GET_HIGHEST_SCORE,
  UPDATE_SCORE_API,
  GET_LEADERBOARD_API,
} = scoreEndpoints;

export const getAllScores = async (token) => {
  let result = [];
  // const toastId = toast.loading("Fetching scores...");

  try {
    const response = await apiConnector("GET", GET_ALL_SCORES_API, null, {
      Authorization: `Bearer ${token}`,
    });
    // console.log("get all scores API response is ", response);

    if (!response?.data?.success) {
      throw new Error("Could not fetch scores");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("get all scores API error is ", error);
    toast.error(`${error.response?.data?.message || "Could not fetch scores"}`);
  }

  // toast.dismiss(toastId);

  return result;
};

export const getHighestScore = async (token) => {
  let result = null;

  // const toastId = toast.loading("Fetching highest score...");

  try {
    const response = await apiConnector("GET", GET_HIGHEST_SCORE, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not fetch highest score");
    }

    console.log("get highest score API response is ", response);

    result = response?.data?.data;
  } catch (error) {
    console.log("get highest score API error is ", error);
    toast.error(
      `${error.response?.data?.message || "Could not fetch highest score"}`
    );
  }

  // toast.dismiss(toastId);
  return result;
};

export const updateScores = async (token, turns) => {
  let result;

  // const toastId = toast.loading("Updating the score...");

  try {
    const response = await apiConnector(
      "POST",
      UPDATE_SCORE_API,
      {
        turns,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could not update scores");
    }

    console.log("update score API response is ", response);

    result = response?.data?.data;
  } catch (error) {
    console.log("update score API error is ", error);
    toast.error(`${error.response?.data?.message || "Could not update score"}`);
  }

  // toast.dismiss(toastId);

  return result;
};

export const getLeaderboard = async (token) => {
  let result = [];

  // const toastId = toast.loading("Fetching leaderboard...");

  try {
    const response = await apiConnector("GET", GET_LEADERBOARD_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not fetch leaderboard");
    }

    console.log("get leaderboard API response is ", response);

    result = response?.data?.data;

    result.sort((a, b) => a.user.highestScore - b.user.highestScore);
  } catch (error) {
    console.log("get leaderboard API error is ", error);
    toast.error(
      `${error.response?.data?.message || "Could not fetch leaderboard"}`
    );
  }

  // toast.dismiss(toastId);

  return result;
};
