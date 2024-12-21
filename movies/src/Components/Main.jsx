import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../Modules/Movies";
import FunctionalWatchListButton from "./FunctionalWatchListButton";

function Main() {
  const [popularList, setPopularList] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const secContainerRef = useRef(null);
  const [number, setNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchMovies();
      setPopularList(response);
    };
    fetchData();
  }, []);

  const handleScrollClickLeft = () => {
    if (number === 1) {
      setNumber(20);
      containerRef.current.scrollLeft =
        containerRef.current.scrollWidth - containerRef.current.offsetWidth;

      secContainerRef.current.scrollTop =
        secContainerRef.current.scrollHeight -
        secContainerRef.current.offsetHeight;
      return;
    }
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 600;
      secContainerRef.current.scrollTop -= 150;
    }
    setNumber(number - 1);
  };

  const handleScrollClickRight = () => {
    if (number === 20) {
      setNumber(1);
      containerRef.current.scrollLeft = 0;
      secContainerRef.current.scrollTop = 0;
      return;
    }
    if (containerRef.current) {
      containerRef.current.scrollLeft += 650;
      secContainerRef.current.scrollTop += 150;
    }
    setNumber(number + 1);
  };

  return (
    <main className="flex max-w-[1280px] m-auto justify-center">
      <section className="relative w-[100vw] xl:w-[850px] lg:w-[670px] max-w-[850px] h-[calc(0.562*100vw+70.2px)] md:w-full md:h-full px-5">
        <div
          className="w-auto h-[calc(0.562*100vw+70.2px)] relative lg:h-[450px] xl:h-[550px] overflow-x-hidden whitespace-nowrap snap-x snap-mandatory scroll-smooth overflow-y-hidden"
          ref={containerRef}
        >
          {popularList.map((movie) => {
            return (
              <div
                className="snap-start inline-block w-[100vw] h-[calc(0.562*100vw+70.2px)] lg:w-[670px] xl:w-[850px] md:h-full relative"
                key={movie.id}
              >
                <img
                  alt={`${movie.backdrop_path} image`}
                  src={
                    movie.backdrop_path !== null
                      ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                      : `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                  }
                  className="w-full h-full object-cover"
                />
                <div className="flex h-[130px] md:h-[84px] xl:h-[96px] gap-3 bottom-0 left-0 bg-[rgba(0,0,0,0.5)] justify-start w-100% absolute items-start px-5 group cursor-pointer">
                  <div className="relative w-[90px] h-[134px] top-[-4px] md:top-[-50px] lg:h-[200px] lg:top-[-116px] lg:w-[134px] xl:h-[245px] xl:w-[165px] xl:top-[-149px]">
                    <FunctionalWatchListButton
                      movie={movie}
                      setLoading={setLoading}
                      loading={loading}
                    />
                    <img
                      onClick={() => navigate(`/movie/${movie.id}`)}
                      className="object-cover"
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={`${movie.title} poster`}
                    />
                  </div>
                  <img
                    src="/images/player-icon.svg"
                    className="w-5 h-5 invert group-hover:filter-none transition"
                    alt="Play Icon"
                  />
                  <div className="flex flex-col justify-evenly overflow-hidden">
                    <h1>{movie.title}</h1>
                    <span className="text-white">{movie.overview}</span>
                    <div className="flex items-center gap-2">
                      <p className="text-white">{movie.vote_count}</p>
                      <img
                        src="/images/like-svgrepo-com.svg"
                        className="w-4 h-4 self-center invert hover:filter-none transition"
                        alt="Like Icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="absolute z-50 top-[40%] left-5 border bg-gray-700 opacity-50 hover:bg-gray-500 hover:opacity-100 transform-translate-y-1/2 p-5 rotate-180"
          onClick={handleScrollClickLeft}
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
        <button
          className="absolute z-50 top-[40%] right-5 border bg-gray-700 opacity-50 hover:bg-gray-500 hover:opacity-100 transform-translate-y-1/2 p-5"
          onClick={handleScrollClickRight}
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
      <section className="right-section lg:w-[330px] xl:w-[405px] h-full absolute z-[-1] lg:relative lg:z-10">
        <h1 className="text-[#f5c518] text-xl h-14 font-bold mt-1">Up next</h1>
        <div
          className=" space-y-2 bg-[#121212] h-[370px] xl:h-[470px] overflow-hidden snap-y snap-mandatory scroll-smooth"
          ref={secContainerRef}
        >
          {popularList.map((movie) => {
            return (
              <div
                className="flex gap-2 pt-4 px-4 h-[115px] xl:h-[150px] snap-start cursor-pointer"
                onClick={() => navigate(`/movie/${movie.id}`)}
                key={movie.id}
              >
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    className="w-[70px] h-[100px] xl:w-[90px] xl:h-[130px] cursor-pointer"
                    loading="lazy"
                    alt={`${movie.title} poster`}
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  />
                </div>
                <section className="w-[75%] flex flex-col px-2 content-center justify-center gap-1">
                  <img
                    src="/images/player-icon.svg"
                    className="size-10 invert"
                    alt="Player Icon"
                  />
                  <h1 className="text-white">{movie.title}</h1>
                  <span className="text-white w-full text-ellipsis overflow-hidden whitespace-nowrap">
                    {movie.overview}
                  </span>
                  <div className="flex items-center gap-2">
                    <p className="text-white">{movie.vote_count}</p>
                    <img
                      src="/images/like-svgrepo-com.svg"
                      className="size-4 self-center invert hover:filter-none transition"
                      alt="Like Icon"
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
