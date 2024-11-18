import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import { options } from "../variables/loginMethods";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [option, setOption] = useState("popularity.desc");
  const [activeButtons, setActiveButtons] = useState({});
  const [expand, setExpand] = useState({
    sort: false,
    whereToWatch: false,
    Filters: false,
  });
  const [num, setNum] = useState(1);

  const header = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmU5MTEzZjNkNTlmYjJiMDA0YmQxZDcwMmEyNjA2NCIsIm5iZiI6MTcyODU2NjQ1Mi4xNjUwNDUsInN1YiI6IjY2ZmJlMjgxZjJiOWM5N2MxZGQ2MzY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.46ZdohKOAXxABXt9pV-dNn23WiLnYXGz-L2sHuq-MSU",
  };

  let filterdFenre = [];
  let finalGenreArr = [];
  useEffect(() => {
    for (let property in activeButtons) {
      activeButtons[property] === true ? filterdFenre.push(property) : null;
      console.log(filterdFenre);
    }
    finalGenreArr = genres
      .filter((genre) => filterdFenre.includes(genre.name))
      .map((genre) => genre.id);
    console.log(finalGenreArr);
  }, [activeButtons]);

  const search = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie`,
        {
          params: { sort_by: option, with_genres: finalGenreArr, page: 1 },
          headers: header,
        }
      );
      console.log(finalGenreArr);
      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
    setNum(2);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US?&page=`,
        {
          params: { sort_by: option, with_genres: finalGenreArr, page: num },
          headers: header,
        }
      );
      setMovies([...movies, ...response.data.results]);
      setNum((prev) => (prev = prev + 1));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list`,
        { headers: header }
      );
      setGenres(response.data.genres);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchGenres();
  }, []);
  return (
    <>
      <Header />
      <div className="flex w-[1700px] flex-wrap justify-center content-center pt-10 gap-10">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-3xl mb-5">Popular Movies</h1>
          <div className="w-[258px] border shadow-lg">
            <h1
              className="cursor-pointer px-[14px] font-bold py-4 border-b"
              onClick={() => setExpand({ ...expand, sort: !expand.sort })}
            >
              Sort
            </h1>
            {expand.sort && (
              <div className="flex flex-col px-[14px] py-4">
                <p className="mb-5">Sort Results By</p>
                <select
                  className="bg-gray-500 text-xs py-1 px-1 rounded-md"
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                >
                  {options.map((option) => {
                    return (
                      <option key={option.option} value={option.option}>
                        {option.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          </div>
          <div className="border shadow-lg">
            <h1
              className="cursor-pointer px-[14px] font-bold py-4 border-b"
              onClick={() =>
                setExpand({ ...expand, whereToWatch: !expand.whereToWatch })
              }
            >
              Where To Watch
            </h1>
            {expand.whereToWatch && <div>Hello</div>}
          </div>
          <div className="border shadow-lg">
            <h1
              className="cursor-pointer px-[14px] font-bold py-4 border-b"
              onClick={() => setExpand({ ...expand, Filters: !expand.Filters })}
            >
              Filters
            </h1>
            {expand.Filters && (
              <div className="grid grid-cols-2 gap-2 py-5">
                {genres.map(({ id, name }) => {
                  return (
                    <button
                      key={id}
                      onClick={() =>
                        setActiveButtons((prev) => ({
                          ...prev,
                          [name]: !prev[name],
                        }))
                      }
                      className={`rounded-full border text-md hover:bg-blue-600 hover:text-white transition ${
                        activeButtons[name] ? "bg-blue-600 text-white" : null
                      }`}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <button
            onClick={search}
            className="hover:bg-blue-600 hover:text-white transition border rounded-full"
          >
            Search
          </button>
        </div>
        <div className="grid gap-3 grid-cols-5 ">
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
      </div>
      <div className="flex flex-wrap justify-center content-center my-3">
        <button onClick={fetchData}>CLick For More!</button>
      </div>
      <Footer />
    </>
  );
}

export default Movies;
