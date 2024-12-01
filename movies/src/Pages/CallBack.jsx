import { useEffect } from "react";
import { replace, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/bearPopulationSlice";
import { setWatchList } from "../redux/watchListSlice";

function CallBack() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setLocalStorage = async (token, token1) => {
    localStorage.setItem(token, token1);
  };

  const fetchData = async (sessionD) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/account?api_key=9ddc2f1438cb3e4e1cbcf0137b3dd7f7&session_id=${sessionD}`
      );
      console.log(response);
      dispatch(setUser(response.data));
      navigate("/");
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  const fetchWatchList = async () => {
    const response = await fetchWatchList(user);
    dispatch(setWatchList(response));
  };

  const navigattion = async () => {
    navigate("/");
  };
  const getAccessToken = async (requestToken) => {
    const data = {
      request_token: requestToken,
    };
    try {
      const respone = await axios.post(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=9ddc2f1438cb3e4e1cbcf0137b3dd7f7`,
        data
      );
      const { session_id } = await respone.data;
      await setLocalStorage("session_id", session_id);
      await fetchData(session_id);
      await fetchWatchList();
      await navigattion();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const requestToken = params.get("request_token");
    if (requestToken) {
      getAccessToken(requestToken);
    }
  }, []);

  return (
    <>
      <Loader />
    </>
  );
}

export default CallBack;
