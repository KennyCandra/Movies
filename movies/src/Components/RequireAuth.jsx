import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setUser } from "../redux/bearPopulationSlice";
import { setWatchList } from "../redux/watchListSlice";
import { fetchWatchList } from "../Modules/Movies";

function RequireAuth() {
  const sessionD = localStorage.getItem("session_id") ?? null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const userStorage = localStorage.getItem("user" ?? null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetchWatchList(JSON.parse(userStorage));
      dispatch(setWatchList(response));
    } catch (error) {
      console.error("Failed to fetch watch list:", error);
    }
  }, [userStorage, dispatch]);

  useEffect(() => {
    if (!userStorage || !sessionD) {
      navigate("/login");
      return;
    }

    if (!user) {
      dispatch(setUser(JSON.parse(userStorage)));
      fetchData();
    }
  }, [userStorage, sessionD, user, navigate, dispatch, fetchData]);
  return <Outlet />;
}

export default RequireAuth;
