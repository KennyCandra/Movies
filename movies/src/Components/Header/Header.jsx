import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setWatchList } from "../../redux/watchListSlice";
import { useEffect } from "react";
import { userlogout } from "../../redux/bearPopulationSlice";
import { useState } from "react";
import { searching } from "../../Modules/Movies";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, watchlist } = useSelector(
    (state) => ({
      user: state.user?.data,
      watchlist: state.watchlist.watchlist,
    }),
    shallowEqual
  );
  const [hovered, setHovered] = useState(false);
  const [search, setSearch] = useState("");
  const [searchArr, setSearchArr] = useState(null);
  const location = useLocation();

  const logOut = () => {
    localStorage.clear();
    dispatch(userlogout());
    dispatch(setWatchList([]));
    navigate("/login");
  };

  useEffect(() => {
    const searchMovie = async () => {
      try {
        const response = await searching(search);
        setSearchArr(response);
      } catch (error) {
        console.error(error);
      }
    };
    searchMovie();
  }, [search]);

  const navigation = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <nav className="h-12 w-full bg-navBg">
      <div className="max-w-[1280px] flex h-full justify-between gap-2 content-center m-auto px-2">
        <div className="flex flex-wrap lg:flex-row flex-row-reverse items-center justify-center gap-5">
          <img
            src="/images/imbd.png"
            className="w-16 h-8 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-white"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <div className="content-evenly hidden text-white">Menu</div>
        </div>
        <div className="md:flex hidden content-center justify-center gap-4 relative flex-wrap grow">
          <div className="text-white self-center">All</div>
          <div className="flex grow">
            <input
              className="h-5 px-3 py-4 rounded-md grow"
              placeholder="Search for your favourite Movie"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {searchArr !== null && (
              <div className="flex flex-col absolute w-[720px] max-h-[500px] top-8 text-white bg-black gap-3 z-50 overflow-scroll">
                {location.pathname !== "/login" &&
                  searchArr
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
        <div className="lg:flex hidden flex-wrap content-center">
          <img
            src="/images/imbd.png"
            className="w-16 h-8 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="gap-3 flex items-center justify-center">
          <p
            className="hidden lg:block text-white cursor-pointer hover:bg-gray-700 transition-all px-3 rounded-full"
            onClick={() =>
              location.pathname === "/login" ? null : navigate("/lists/watchlist")
            }
          >
            Watch List
            <span className="inline-flex justify-center flex-wrap content-center h-4 hover:bg-yellow-300 w-6 text-xs bg-yellow-500 text-black mx-1 rounded-full border">
              {Array.isArray(watchlist) ? watchlist.length : "0"}
            </span>
          </p>
          <div
            className="text-white hidden md:block cursor-pointer hover:bg-gray-700 transition-all px-3 rounded-full relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => navigate('/user')}
          >
            {user ? `${user.username}` : `Sign In`}
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
          <p className="text-white cursor-pointer hidden lg:block hover:bg-gray-700 transition-all px-3 rounded-full">
            En
          </p>
          <div className="flex justify-center items-center gap-3">
            <span className="cursor-pointer md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </span>
            <span className="cursor-pointer md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <button className="bg-yellow-500 rounded-full lg:hidden font-bold px-2 py-1">
              Use app
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
