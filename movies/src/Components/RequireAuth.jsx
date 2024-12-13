import { useEffect } from "react";
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
  const userStorage = localStorage.getItem("user");

  const fetchData = async () => {
    const response = await fetchWatchList(JSON.parse(userStorage));
    dispatch(setWatchList(response));
  };
  useEffect(() => {
    if (!user) {
      dispatch(setUser(JSON.parse(userStorage)));
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (!sessionD) navigate("/login");
  }, [sessionD]);

  return <Outlet />;
}

export default RequireAuth;
