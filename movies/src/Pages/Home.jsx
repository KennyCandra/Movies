import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setUser, userlogout } from "../redux/bearPopulationSlice";
import axios from "axios";
import Loader from "../Components/Loader";
import Main from "../Components/Main";

function Home() {
  const navigate = useNavigate();
  let sessionD = localStorage.getItem("session_id");
  const dispatch = useDispatch();
  const bear = useSelector((state) => state.bear);

  const userLogOut1 = async () => {
    const data = {
      session_id: sessionD,
    };
    try {
      const response = await axios.delete(
        `https://api.themoviedb.org/3/authentication/session `,
        {
          headers: header,
          data: data,
        }
      );
      dispatch(userlogout());
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  if (bear.data === "")
    return (
      <>
        <button onClick={() => console.log(bear.data)}>Click</button>
        <Loader />
      </>
    );
  return (
    <div
      onClick={() => console.log(bear.data)}
      className="bg-black text-white w-screen h-screen"
    >
      <Main />
    </div>
  );
}

export default Home;
