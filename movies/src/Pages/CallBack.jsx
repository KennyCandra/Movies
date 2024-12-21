import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/bearPopulationSlice";
import { setWatchList } from "../redux/watchListSlice";
import { fetchWatchList } from "../Modules/Movies";

function CallBack() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, watchlist } = useSelector(
    (state) => ({
      user: state.user?.data,
      watchlist: state.watchlist.watchlist,
    }),
    shallowEqual
  );

  const setLocalStorage = async (token, token1) => {
    localStorage.setItem(token, token1);
  };

  const fetchUser = async (sessionD) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/account?api_key=9ddc2f1438cb3e4e1cbcf0137b3dd7f7&session_id=${sessionD}`
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch(setUser(response.data));
      navigate("/");
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  const setReduxWatchList = async (response) => {
    dispatch(setWatchList(response));
  };

  const fetchWatchListData = async (user) => {
    const response = await fetchWatchList(user);
    await setReduxWatchList(response);
  };

  const navigation = async () => {
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
      await fetchUser(session_id);
      await fetchWatchListData(user);
      navigation();
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
