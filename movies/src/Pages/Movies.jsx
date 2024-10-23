import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../Components/MovieCard";
import Header from "../Components/Header/Header";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [num, setNum] = useState(1);
  let url = ` https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${num}&sort_by=popularity.desc`;
  const fetchData = async () => {
    try {
      const header = {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmU5MTEzZjNkNTlmYjJiMDA0YmQxZDcwMmEyNjA2NCIsIm5iZiI6MTcyODU2NjQ1Mi4xNjUwNDUsInN1YiI6IjY2ZmJlMjgxZjJiOWM5N2MxZGQ2MzY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.46ZdohKOAXxABXt9pV-dNn23WiLnYXGz-L2sHuq-MSU",
      };
      let response = await axios.get(url, { headers: header });
      console.log(response.data.results);
      setMovies([...movies, ...response.data.results]);
      setNum(num + 1);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <h1
        className="font-bold text-3xl m-auto"
        onClick={() => console.log(movies)}
      >
        Movies
      </h1>
      <div className="grid gap-3 grid-cols-4 m-10">
        {movies.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              id={movie.id}
              movie={movie}
              poster={movie.poster_path}
              title={movie.original_title}
              score={movie.vote_average}
            />
          );
        })}
      </div>
      <button onClick={() => fetchData()}>Click for more</button>
    </>
  );
}

export default Movies;
