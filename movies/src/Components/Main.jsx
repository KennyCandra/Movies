import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies, addToFavoriteList } from "../Modules/Movies";

function Main() {
  const [popularList, setPopularList] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const secContainerRef = useRef(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchMovies();
      setPopularList(response);
    };
    fetchData();
  }, []);

  const handleScrollClickLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 848;
      containerRef.current.style.scrollBehavior = "smooth";

      secContainerRef.current.scrollTop -= 138;
      secContainerRef.current.style.scrollBehavior = "smooth";
    }
    setDisabled(true);
  };

  const handleScrollClickRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 848;
      containerRef.current.style.scrollBehavior = "smooth";

      secContainerRef.current.scrollTop += 138;
      secContainerRef.current.style.scrollBehavior = "smooth";
    }
    setDisabled(true);
  };

  useEffect(() => {
    if (disabled === true) {
      const timeout = setTimeout(() => {
        setDisabled(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [disabled]);

  return (
    <main className="flex justify-around gap-10 max-w-[1280px] m-auto">
      <section className="w-[850px] border flex relative self-center h-[528px]">
        <button
          className="absolute z-50 border bottom-[50%] p-5 rotate-180"
          onClick={handleScrollClickLeft}
          disabled={disabled ? true : false}
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
          className="w-full border flex relative overflow-x-scroll overflow-y-hidden self-center h-full"
          ref={containerRef}
        >
          {popularList.map((item) => {
            return (
              <div className="relative" key={item.id}>
                <div className="w-[848px] h-[477px]">
                  <img
                    alt="image"
                    src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                    className="shadow-2xl"
                  />
                </div>
                <div className="flex h-[165px] flex-row gap-3 bottom-[-40px] bg-[rgba(0,0,0,0.5)] w-full absolute left-0 items-start px-5 group cursor-pointer">
                  <div className="w-[165px] h-[300px] relative">
                    <div className="absolute bottom-44">
                      <div
                        role="button"
                        className="absolute"
                        onClick={() => addToFavoriteList(item.id)}
                      >
                        <div className="relative w-8 h-10 bg-gray-500 opacity-50 hover:opacity-100 hover:bg-gray-800 rounded-t-md rounded-bl-md overflow-hidden flex items-center justify-center">
                          <span className="text-white text-xl font-bold">
                            +
                          </span>
                          <div className="absolute bottom-0 left-0 overflow-hidden">
                            <div className="bg-brown-600 rotate-45 transform origin-top-left"></div>
                          </div>
                        </div>
                      </div>
                      <img
                        onClick={() => navigate(`/movies/${item.id}`)}
                        className="w-[165px] h-[245px]  "
                        src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                      />
                    </div>
                  </div>
                  <img
                    src="/images/player-icon.svg"
                    className="size-20 invert group-hover:filter-none transition"
                  />
                  <div className="flex flex-col justify-evenly">
                    <h1>{item.title}</h1>
                    <span className="text-white w-[500px] text-ellipsis overflow-hidden whitespace-nowrap">
                      {item.overview}
                    </span>
                    <div className="flex content-center flex-wrap gap-2">
                      <p className="text-white">{item.vote_count}</p>
                      <img
                        src="/images/like-svgrepo-com.svg"
                        className="size-4 self-center invert hover:filter-none transition"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="absolute z-50 border bottom-[50%] right-0 p-5"
          onClick={handleScrollClickRight}
          disabled={disabled ? true : false}
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
      </section>
      <section className="right-section w-[405px] h-[528px]">
        <h1 className="text-[#f5c518] text-xl h-14 font-bold mt-1">Up next</h1>
        <div
          className="flex flex-col gap-2 bg-[#121212] h-[444px] overflow-scroll"
          ref={secContainerRef}
        >
          {popularList.map((list) => {
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
        <button
          className="text-2xl hover:text-yellow-500"
          onClick={() => alert(`we don't have trailers`)}
        >{`Browse Trailers >`}</button>
      </section>
    </main>
  );
}

export default Main;
