import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/bearPopulationSlice";

function RequireAuth() {
  const navigate = useNavigate();
  const session_id = localStorage.getItem("session_id") ?? null;
  const request_token = localStorage.getItem("request_token") ?? null;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/account?api_key=9ddc2f1438cb3e4e1cbcf0137b3dd7f7&session_id=${session_id}`
      );
      dispatch(setUser(response.data));
      navigate('/')
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!session_id) navigate("/login");
    if (session_id && user.data === "") fetchData();
  }, []);

  useEffect(() => {
    if (request_token === null) navigate("/login");
    if (user.data !== "") return navigate("/");
  }, [request_token, user , location]);

  return <Outlet />;
}

export default RequireAuth;
