import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userlogout } from "../redux/bearPopulationSlice";
import axios from "axios";
import Loader from "../Components/Loader";
import Main from "../Components/Main";
import Featured from "../Components/Featured";
import Footer from "../Components/Footer";

function Home() {
  const navigate = useNavigate();
  let sessionD = localStorage.getItem("session_id");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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

  if (user.data === "")
    return (
      <>
        <button onClick={() => console.log(user.data)}>Click</button>
        <Loader />
      </>
    );
  return (
    <div className="bg-black text-white w-screen h-screen">
      <div className="p-5" />
      <Main />
      <Featured />
      <Footer />
    </div>
  );
}

export default Home;
