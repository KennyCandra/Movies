import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/bearPopulationSlice";

function RequireAuth() {
  const navigate = useNavigate();
  const session_id = localStorage.getItem("session_id") || null;
  const request_token = localStorage.getItem("request_token") || null;
  const bear = useSelector((state) => state.bear);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!session_id) {
      navigate('/login')
    } else if (bear.data === "") {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/account?api_key=efe9113f3d59fb2b004bd1d702a26064&session_id=${session_id}`
          );
          dispatch(setUser(response.data));
        } catch (error) {
          console.error(error);
          navigate('/login')
        }
      };
      fetchData();
    }
  }, [session_id]);

  useEffect(() => {
    if(request_token === null){
      navigate('/login')
    }
  },[])

  return <Outlet />;
}

export default RequireAuth;
