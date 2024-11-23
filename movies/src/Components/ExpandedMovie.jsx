import { useEffect } from "react";

function ExpandedMovie({ name, movie, setMovieDeails }) {
  useEffect(() => {
    document.body.classList.add('overflow-y-hidden')
  },[])
  const closeExpandedMovie = () => {
    document.body.classList.remove('overflow-y-hidden')
    setMovieDeails(false)
  }
  return (
    <div className="fixed  top-0 left-0 w-screen h-screen bg-black bg-opacity-80 text-white flex justify-center items-center z-[51] flex-col">
      <div className="bg-white text-black w-full max-w-lg p-4 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold">{name}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
        <h1 className="font-bold">{movie.overview}</h1>
        <button onClick={closeExpandedMovie}>Close Me</button>
      </div>
    </div>
  );
}

export default ExpandedMovie;
