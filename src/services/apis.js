const BASE_URL = process.env.REACT_APP_BASE_URL;

//auth apis
export const authEndpoints = {
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
};

export const scoreEndpoints = {
  GET_ALL_SCORES_API: BASE_URL + "/score/getAllScores",
  GET_HIGHEST_SCORE: BASE_URL + "/score/getHighestScore",
};
