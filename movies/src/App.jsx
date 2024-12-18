import { Route, Routes } from "react-router-dom";
import "./App.css";
import CallBack from "./Pages/CallBack";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home";
import RequireAuth from "./Components/RequireAuth";
import Login from "./Pages/Login.Jsx";
import Movies from "./Pages/Movies";
import MoviePage from "./Components/MoviePage";
import Footer from "./Components/Footer";
import Lists from "./Pages/Lists";
import UserPage from "./Pages/UserPage";

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
        <Route path="/header" element={<Header />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/user" element={<UserPage />} />
        <Route
          path="/movie/:id"
          element={
            <div className="bg-black">
              <Header />
              <MoviePage />
              <Footer />
            </div>
          }
        />
        <Route path="/lists/:id" element={<Lists />} />
      </Route>
      <Route path="/callBack" element={<CallBack />} />
      <Route
        path="/login"
        element={
          <>
            <Header />
            <Login />
            <Footer />
          </>
        }
      />
    </Routes>
  );
}

export default App;
