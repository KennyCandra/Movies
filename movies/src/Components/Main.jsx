import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovies, addToFavoriteList } from "../Modules/Movies";
import { AnimatePresence, motion } from "framer-motion";

function Main() {
  const [popularList, setPopularList] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const secContainerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const slideVariants = {
    initial: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 70,
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 70,
      },
    }),
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchMovies();
      setPopularList(response);
    };
    fetchData();
  }, []);

  const handleScrollClickLeft = () => {
    setDirection(-1);
    setIndex((prevIndex) =>
      prevIndex === 0 ? popularList.length - 1 : prevIndex - 1
    );
  };

  const handleScrollClickRight = () => {
    setDirection(1);
    setIndex((prevIndex) =>
      prevIndex === popularList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const MovieToShow = popularList[index] ?? null;

  return (
    <main className="flex justify-around gap-10 max-w-[1280px] m-auto">
      <section className="max-w-[850px] flex relative self-center h-auto">
        <button
          className="absolute z-50 border bottom-[50%] p-5 rotate-180"
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
        <AnimatePresence initial={false} custom={direction}>
          {MovieToShow && (
            <motion.div
              key={MovieToShow.id}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex w-auto h-auto"
            >
              <img
                alt="image"
                src={`https://image.tmdb.org/t/p/original/${MovieToShow.backdrop_path}`}
                className="shadow-2xl object-cover rounded-sm"
              />
              <div className="flex h-[165px] flex-row gap-3 bottom-0 bg-[rgba(0,0,0,0.5)] justify-start w-full absolute left-0 items-start px-5 group cursor-pointer">
                <div className="w-[500px] relative">
                  <button
                    className="absolute"
                    onClick={() => addToFavoriteList(MovieToShow.id)}
                  >
                    <p className="relative w-8 h-10 bg-gray-500 opacity-50 hover:opacity-100 hover:bg-gray-800 rounded-t-md rounded-bl-md overflow-hidden flex items-center justify-center">
                      <span className="text-white text-xl font-bold">+</span>
                    </p>
                  </button>
                  <img
                    onClick={() => navigate(`/movie/${MovieToShow.id}`)}
                    className="w-full h-[245px] object-cover"
                    src={`https://image.tmdb.org/t/p/original/${MovieToShow.poster_path}`}
                    alt={`${MovieToShow.title} poster`}
                  />
                </div>
                <img
                  src="/images/player-icon.svg"
                  className="w-5 h-5 invert group-hover:filter-none transition"
                  alt="Play Icon"
                />
                <div className="flex flex-col justify-evenly overflow-hidden">
                  <h1>{MovieToShow.title}</h1>
                  <span className="text-white w-full text-ellipsis overflow-hidden whitespace-nowrap">
                    {MovieToShow.overview}
                  </span>
                  <div className="flex items-center gap-2">
                    <p className="text-white">{MovieToShow.vote_count}</p>
                    <img
                      src="/images/like-svgrepo-com.svg"
                      className="w-4 h-4 self-center invert hover:filter-none transition"
                      alt="Like Icon"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          className="absolute z-50 border bottom-[50%] right-0 p-5"
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
      <section className="right-section max-w-[405px] h-[528px]">
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
                      alt={`${list.title} poster`}
                    />
                  </div>
                </section>
                <section className="w-[75%] flex flex-col content-center justify-center gap-1">
                  <img
                    src="/images/player-icon.svg"
                    className="size-10 invert"
                    alt="Player Icon"
                  />
                  <h1 className="text-white">{list.title}</h1>
                  <span className="text-white w-full text-ellipsis overflow-hidden whitespace-nowrap">
                    {list.overview}
                  </span>
                  <div className="flex items-center gap-2">
                    <p className="text-white">{list.vote_count}</p>
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
