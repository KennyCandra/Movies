import "./App.css";
import Header from "./Components/Header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [datas, setData] = useState();

    const getRequestToken = async () => {
      try {
        const respone = await axios.get(
          `https://api.themoviedb.org/3/authentication/token/new?api_key=efe9113f3d59fb2b004bd1d702a26064`
        );
        const requestToken = respone.data.request_token;
        console.log(requestToken)
        window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/callback`
      } catch (err) {
        console.log(err)
      }
    }
  // if (datas.length === 0) return <div>loading..</div>;

  return (
    <>
      <div>
        {/* <Header /> */}
        <button onClick={getRequestToken}>click</button>
      </div>
    </>
  );
}

export default App;
