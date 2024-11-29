import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import Main from "../Components/Main";
import Featured from "../Components/Featured";
import Footer from "../Components/Footer";
import { useEffect } from "react";
import { fetchWatchList } from "../Modules/Movies";
import { setWatchList } from "../redux/watchListSlice";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const fetchData = async () => {
    const response = await fetchWatchList(user);
    dispatch(setWatchList(response));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (user.data === "")
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
      <Footer />
    </div>
  );
}

export default Home;
