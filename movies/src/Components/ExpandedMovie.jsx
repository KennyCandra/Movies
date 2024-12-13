import { useEffect, useRef } from "react";

function ExpandedMovie({ name, movie, setMoviesDetails }) {
  const containerRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("overflow-y-hidden");
  }, []);

  const closeExpandedMovie = () => {
    document.body.classList.remove("overflow-y-hidden");
    setMoviesDetails(false);
  };

  const handleClickOutSide = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      closeExpandedMovie();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 text-white flex justify-center items-center z-[51] flex-col">
      <div
        className="bg-white text-black w-full max-w-lg p-4 rounded-lg shadow-lg"
        ref={containerRef}
      >
        <h1 className="text-xl font-bold">{name}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
        <h1 className="font-bold">{movie.overview}</h1>
      </div>
    </div>
  );
}

export default ExpandedMovie;
