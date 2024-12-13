import { useSelector } from "react-redux";
import Loader from "../Components/Loader";
import Main from "../Components/Main";
import Featured from "../Components/Featured";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate()

  if (user === "")
    return (
      <>
        <Loader />
      </>
    );
  return (
    <div className="bg-black text-white w-screen h-screen">
      <div className="pt-2" />
      <Main />
      <Featured />
      <div className="w-screen flex justify-center bg-black m-auto">
        <button className="bg-buttonColor text-black font-bold py-2 px-5 rounded" onClick={() => navigate('/movies')}>Discover More Movies</button>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
