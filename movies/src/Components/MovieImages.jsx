import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MovieImages({ images  , id}) {
  const [index, setIndex] = useState(1);
  const navigate = useNavigate();
  const indexToRight = () => {
    if (index === images.length) {
      setIndex(1);
    } else {
      setIndex(index + 1);
    }
  };

  const indexToLeft = () => {
    if (index === 1) {
      setIndex(images.length);
    } else {
      setIndex(index - 1);
    }
  };

  const navigateToMoviePage = () => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="bg-black w-[100vw] h-[100vh] text-white relative">
      <div
        className="absolute right-0 border top-[50%] p-5 flex justify-center content-center"
        onClick={indexToRight}
      >
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <div
        className="absolute left-0 border rotate-180 top-[50%] p-5 flex justify-center content-center"
        onClick={indexToLeft}
      >
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <div className="top-[3vh] px-5 py-1 ml-4  rounded-full absolute border w-fit cursor-pointer" onClick={navigateToMoviePage}>
        close
      </div>
      <div className="text-right">
        {index} / {images.length}
      </div>
      {images.length !== 0 ? (
        images.slice(index, index + 1).map((image) => {
          return (
            <img
              src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
              className={`h-[80vh] aspect-1 m-auto bg-black`}
            />
          );
        })
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default MovieImages;
