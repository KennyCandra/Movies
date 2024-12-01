import { useSelector } from "react-redux";
import Loader from "../Components/Loader";
import Main from "../Components/Main";
import Featured from "../Components/Featured";
import Footer from "../Components/Footer";

function Home() {
  const user = useSelector((state) => state.user);

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
      <Footer />
    </div>
  );
}

export default Home;
