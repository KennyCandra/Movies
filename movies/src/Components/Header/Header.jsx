import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setWatchList } from "../../redux/watchListSlice";
import { useEffect } from "react";
import axios from "axios";
import { userlogout } from "../../redux/bearPopulationSlice";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, watchlist } = useSelector((state) => ({
    user: state.user?.data,
    watchlist: state.watchlist,
  }));
  const [hovered, setHovered] = useState(false);
  const [search, setSearch] = useState("");
  const [searchArr, setSearchArr] = useState(null);

  const logOut = () => {
    localStorage.clear();
    dispatch(userlogout());
    dispatch(setWatchList([]));
    navigate("/login");
  };

  useEffect(() => {
    const searchMovie = async () => {
      const headers = {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmU5MTEzZjNkNTlmYjJiMDA0YmQxZDcwMmEyNjA2NCIsIm5iZiI6MTcyODg1MDg1MC4xMzkzMSwic3ViIjoiNjZmYmUyODFmMmI5Yzk3YzFkZDYzNjcxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cscRHnA4UIi60yO1sS6mac9XrSPVkgFDFp1NahVeffs",
      };
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${search}`,
          {
            headers: headers,
          }
        );
        setSearchArr(response.data.results);
        console.log(searchArr);
      } catch (error) {
        console.error(error);
      }
    };

    searchMovie();
  }, [search]);

  useEffect(() => {
    console.log(search);
  }, [search]);
  useEffect(() => {
    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmU5MTEzZjNkNTlmYjJiMDA0YmQxZDcwMmEyNjA2NCIsIm5iZiI6MTcyODg1MDg1MC4xMzkzMSwic3ViIjoiNjZmYmUyODFmMmI5Yzk3YzFkZDYzNjcxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cscRHnA4UIi60yO1sS6mac9XrSPVkgFDFp1NahVeffs",
    };
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/account/${user.id}/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`,
        { headers: headers }
      );
      dispatch(setWatchList(response.data.results));
    };
    fetchData();
  }, []);

  const navigation = (movieId) => {
    navigate(`/movie/${movieId}`);
    window.location.reload();
  };

  return (
    <nav className="h-12 flex w-[100%] content-center justify-center flex-wrap m-auto gap-4 bg-navBg">
      <img
        src="/images/imbd.png"
        className="w-16 h-8 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="flex flex-wrap content-center justify-center">
        <img
          src="/images/burger_menu-removebg-preview.png"
          className="size-8 invert"
        />
        <div className="content-evenly text-white">Menu</div>
      </div>
      <div className="flex flex-wrap content-center justify-center gap-4 relative">
        <div className="text-white">All</div>
        <div>
          <input
            className="h-5 p-3 rounded-md w-[720px] "
            placeholder="Search for your favourite Movie"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {searchArr !== null && (
            <div className="flex flex-col absolute w-[720px] max-h-[500px] top-8 text-white bg-black gap-3 z-50 overflow-scroll">
              {searchArr
                .filter((movie) => movie.poster_path !== null)
                .map((movie) => {
                  return (
                    <div
                      onClick={() => navigation(movie.id)}
                      className="flex gap-4 cursor-pointer hover:bg-gray-950 h-[80px]"
                    >
                      <div className="h-[70px] w-[50px]">
                        <img
                          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                          alt="movie image"
                        />
                      </div>
                      <div>
                        <h1>{movie.title}</h1>
                        <p>{movie.release_date}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
      <img src="/images/imbd.png" className="w-16 h-8" />
      <div className="flex gap-3 content-center justify-center flex-wrap">
        <p
          className="text-white cursor-pointer"
          onClick={() => navigate("/watchlist")}
        >
          Watch List
          <span className="inline-flex justify-center flex-wrap content-center size-5 mx-1 rounded-[50%] border">
            <span className="">
              {watchlist?.watchlist.length === 0
                ? "+"
                : watchlist.watchlist.length}
            </span>
          </span>
        </p>
        <div
          className="text-white relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {user ? `welcome ${user.username}` : `Sign In`}
          {hovered ? (
            <div
              className="absolute right-3 bg-white w-full"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <button className="text-black" onClick={logOut}>
                Log out
              </button>{" "}
            </div>
          ) : null}
        </div>

        <p className="text-white">En</p>
      </div>
    </nav>
  );
}

export default Header;
