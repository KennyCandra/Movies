import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as movie from "../Modules/Movies";
import { addMovie } from "../redux/watchListSlice";

function Featured() {
  const [list, setList] = useState([]);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { watchlist } = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmU5MTEzZjNkNTlmYjJiMDA0YmQxZDcwMmEyNjA2NCIsIm5iZiI6MTcyODU2NjQ1Mi4xNjUwNDUsInN1YiI6IjY2ZmJlMjgxZjJiOWM5N2MxZGQ2MzY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.46ZdohKOAXxABXt9pV-dNn23WiLnYXGz-L2sHuq-MSU",
      };

      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=3&sort_by=popularity.desc`,
        { headers: headers }
      );
      setList(response.data.results);
    };
    fetchData();
  }, []);

  const handleScrollClickLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 850;
      containerRef.current.style.scrollBehavior = "smooth";
    }
  };

  const handleScrollClickRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 850;
      containerRef.current.style.scrollBehavior = "smooth";
    }
  };

  const addToWatchlist = (movie1, id) => {
    const wantedToAddMovie = watchlist.find((movie) => movie.id === id);
    if (!wantedToAddMovie) {
      dispatch(addMovie(movie1));
      movie.addToWatchlist(id);
    } else {
      console.log(wantedToAddMovie);
    }
  };

  return (
    <div className="flex mt-10 flex-col justify-center bg-black relative">
      <div className="flex flex-wrap justify-around content-around gap-5 max-w-[1280px] m-auto">
        <section className="w-[850px] h-[620px] relative px-3 flex flex-col">
          <h1 className="text-[#f5c518] font-bold text-3xl mb-6">Movies</h1>
          <button
            onClick={handleScrollClickLeft}
            className="absolute top-[40%] z-50 bg-gray-700 opacity-50 hover:opacity-100 size-9 flex flex-wrap justify-center content-center"
          >
            <svg
              className="invert rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
            </svg>
          </button>
          <button
            onClick={handleScrollClickRight}
            className="absolute top-[40%] right-2 opacity-50 hover:opacity-100 z-50 size-9 flex flex-wrap justify-center content-center bg-gray-700"
          >
            <svg
              className="invert"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
            </svg>
          </button>
          <div
            className="flex gap-[12.5px] flex-row w-[830px] overflow-x-scroll h-[528px] border"
            ref={containerRef}
          >
            {list?.map((item) => (
              <div
                className="w-[200px] h-[528px] relative border"
                key={item.title}
              >
                <div className="h-[290px] w-[195px] flex justify-center content-center flex-wrap">
                  <button
                    onClick={() => movie.addToFavoriteList(item.id)}
                    className="absolute top-0 left-0"
                  >
                    <div className="relative w-8 h-10 bg-gray-500 opacity-50 hover:opacity-100 hover:bg-gray-800 rounded-t-md rounded-bl-md overflow-hidden flex items-center justify-center">
                      <span className="text-white text-xl font-bold">+</span>
                      <div className="absolute bottom-0 left-0 overflow-hidden">
                        <div className="bg-brown-600 rotate-45 transform origin-top-left"></div>
                      </div>
                    </div>
                  </button>
                  <img
                    className="h-[290px] w-[200px]"
                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-10 mt-3">
                    <p>⭐{item.vote_average}</p>
                    <button className="hover:bg-white cursor-pointer">
                      ⭐
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="w-[200px]">{item.title}</h1>
                    <button onClick={() => addToWatchlist(item, item.id)}>
                      + Watchlist
                    </button>
                    <button>{`< Trailer`}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="right-section h-[620px] w-[405px]">
          <h1
            className="text-[#f5c518] font-bold text-3xl mb-6"
            onClick={() => navigate("/watchlist")}
          >
            favourite List
          </h1>
          <div className="flex flex-col gap-2 bg-[#121212] h-[528px] overflow-scroll">
            {watchlist?.map((list) => {
              return (
                <div className="flex gap-2 px-4 h-[150px]" key={list.id}>
                  <section>
                    <div>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${list.poster_path}`}
                        className="w-[90px] h-[130px]"
                      />
                    </div>
                  </section>
                  <section className=" w-[75%] flex flex-col content-center justify-center gap-1">
                    <img
                      src="/images/player-icon.svg"
                      className="size-10 invert"
                    />
                    <h1 className="text-white">{list.title}</h1>
                    <span className="text-white w-full text-ellipsis overflow-hidden whitespace-nowrap">
                      {list.overview}
                    </span>
                    <div className="flex content-center flex-wrap gap-2">
                      <p className="text-white">{list.vote_count}</p>
                      <img
                        src="/images/like-svgrepo-com.svg"
                        className="size-4 self-center invert hover:filter-none transition"
                      />
                    </div>
                  </section>
                </div>
              );
            })}
          </div>
        </section>
      </div>
      <button
        className="self-center mb-10 flex bg-yellow-600 hover:bg-yellow-700 hover:bg- text-white transition px-10 py-3 rounded-lg"
        onClick={() => navigate("/movies")}
      >
        Discover More Movies from Here!
      </button>
    </div>
  );
}

export default Featured;
