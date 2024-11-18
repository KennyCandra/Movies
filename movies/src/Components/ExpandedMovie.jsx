function ExpandedMovie({ name, movie, setMovieDeails }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 text-white flex justify-center items-center z-50 flex-col">
      <div className="bg-white text-black w-full max-w-lg p-4 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold">{name}</h1>
        <p>Movie details can be displayed here...</p>
        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
        <h1 className="font-bold">{movie.overview}</h1>
        <button onClick={() => setMovieDeails(false)}>Close Me</button>
      </div>
    </div>
  );
}

export default ExpandedMovie;
