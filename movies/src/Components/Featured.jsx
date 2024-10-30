import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setWatchList } from "../redux/watchListSlice";

function Featured() {
  // fix the positions of the elements
  const [list, setList] = useState([]);
  const containerRef = useRef(null);
  const [popularList, setPopularList] = useState([]);
  const [index, setIndex] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmU5MTEzZjNkNTlmYjJiMDA0YmQxZDcwMmEyNjA2NCIsIm5iZiI6MTcyODU2NjQ1Mi4xNjUwNDUsInN1YiI6IjY2ZmJlMjgxZjJiOWM5N2MxZGQ2MzY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.46ZdohKOAXxABXt9pV-dNn23WiLnYXGz-L2sHuq-MSU",
      };

      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,
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

  const favoriteList = async (movieId) => {
    let url1 =
      "https://api.themoviedb.org/3/account/2147483647/favorite?session_id=bc5fbe1bb70203d72d6423bfbb4207be1da66066";
    const data = {
      media_type: "movie",
      media_id: movieId,
      favorite: true,
    };
    const header = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmU5MTEzZjNkNTlmYjJiMDA0YmQxZDcwMmEyNjA2NCIsIm5iZiI6MTcyODU2NjQ1Mi4xNjUwNDUsInN1YiI6IjY2ZmJlMjgxZjJiOWM5N2MxZGQ2MzY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.46ZdohKOAXxABXt9pV-dNn23WiLnYXGz-L2sHuq-MSU",
    };
    try {
      const response = await axios.post(url1, data, { headers: header });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex mt-10 justify-center bg-black relative">
      <section className="w-[850px] relative px-3">
        <h1
          className="text-[#f5c518] font-bold text-3xl mb-9"
          onClick={() => console.log(watchlist)}
        >
          Featured today
        </h1>
        <button
          onClick={handleScrollClickLeft}
          className="absolute top-[50%] z-50"
        >
          Scroll Left by 200px
        </button>
        <button
          onClick={handleScrollClickRight}
          className="absolute top-[50%] right-0 z-50"
        >
          Scroll right by 200px
        </button>
        <div
          className="flex gap-[12.5px] flex-row overflow-hidden h-[520px] border mb-12"
          ref={containerRef}
        >
          {list.map((item) => (
            <div
              className="h-[520px] w-[200px] relative border"
              key={item.title}
            >
              <div className="h-[290px] w-[195px] flex justify-center content-center flex-wrap">
                <button
                  onClick={() => favoriteList(item.id)}
                  className="absolute top-0 left-0"
                >
                  Add To Favourite
                </button>
                <img
                  className="h-[290px] w-[200px]"
                  src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-10 mt-3">
                  <p>⭐{item.vote_average}</p>
                  <button className="hover:bg-white cursor-pointer">⭐</button>
                </div>
                <div className="flex flex-col">
                  <h1 className="w-[200px] h-full">{item.title}</h1>
                  <button onClick={() => favoriteList(item.id)}>
                    + Watchlist
                  </button>
                  <button>{`< Trailer`}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="right-section w-[405px]">
        <h1
          className="text-[#f5c518] text-xl font-bold cursor-pointer hover:underline transition"
          onClick={() => navigate("/watchlist")}
        >
          favourite List
        </h1>
        <div className="flex flex-col gap-2  bg-[#121212] h-[500px]">
          {popularList?.slice(index, index + 3).map((list) => {
            return (
              <div className="flex gap-2 px-4 h-[150px]" key={list.id}>
                <section onClick={() => console.log(newList)}>
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
  );
}

export default Featured;
