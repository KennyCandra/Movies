import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";

function CallBack() {
  const location = useLocation();
  const navigate = useNavigate();

  const getAccessToken = async (requestToken) => {
    try {
      const respone = await axios.post(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=efe9113f3d59fb2b004bd1d702a26064`,
        { request_token: requestToken }
      );
      const { session_id } = respone.data;
      localStorage.setItem("session_id", session_id);
      navigate("/");
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
  },[location , navigate]);

  return (
    <>
      <Loader />
    </>
  );
}

export default CallBack;
