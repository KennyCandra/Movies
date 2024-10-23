import { Route, Routes } from "react-router-dom";
import "./App.css";
import CallBack from "./Pages/CallBack";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home";
import RequireAuth from "./Components/RequireAuth";
import Login from "./Pages/Login.Jsx";
import Movies from "./Pages/Movies";
import WatchList from './Pages/WatchList'

function App() {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route path="/callBack" element={<CallBack />} />
        <Route path="/header" element={<Header />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/watchlist" element={<WatchList />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
