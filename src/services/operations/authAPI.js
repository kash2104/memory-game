import { authEndpoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";

const { SIGNUP_API, LOGIN_API } = authEndpoints;

export function signUp(name, email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Signing up...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        name,
        email,
        password,
      });

      console.log("signup response is ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup successfull");
      navigate("/login");
    } catch (error) {
      console.log("signup api error is ", error);
      toast.error("Username already exists. Please try again");
      navigate("/signup");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("login response is ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setToken(response.data.token));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      toast.success("Login successfull");
      navigate("/play");
    } catch (error) {
      console.log("login api error is ", error);
      toast.error("Login failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    localStorage.removeItem("token");
    navigate("/login");
  };
}
