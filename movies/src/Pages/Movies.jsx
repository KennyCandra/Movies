import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import { fetchTypes, fetchDataMovie, search } from "../Modules/Movies";
import MovieSearchPageAside from "../Components/MovieSearchPageAside";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [activeButtons, setActiveButtons] = useState({});
  const [filters, setFilters] = useState({
    genres: [],
    options: "popularity.desc",
    num: 1,
    selectedGenres: [],
  });

  const searching = async () => {
    try {
      const activeGenres = Object.entries(activeButtons)
        .filter(([_, isActive]) => isActive === true)
        .map(([genreId, _]) => Number(genreId));
      setFilters((prev) => ({ ...prev, selectedGenres: activeGenres, num: 2 }));
      const data = await search(filters.options, activeGenres, 1);
      setMovies(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGenre = async () => {
    const genres = await fetchTypes();
    setFilters((prev) => ({ ...prev, genres: genres }));
  };

  const LoadMoreMovies = async () => {
    const Data = await fetchDataMovie(
      filters.options,
      filters.selectedGenres,
      filters.num
    );
    setMovies([...movies, ...Data]);
    setFilters((prev) => ({ ...prev, num: prev.num + 1 }));
  };

  const fetchData = async () => {
    const queryParams = new URLSearchParams(location.search);
    const genreParam = queryParams.get("genre");
    const Data = await fetchDataMovie(filters.options, genreParam, filters.num);
    setMovies([...movies, ...Data]);
    setFilters((prev) => ({
      ...prev,
      num: prev.num + 1,
      selectedGenres: [genreParam],
    }));
  };

  useEffect(() => {
    fetchGenre();
    fetchData();
    const queryParams = new URLSearchParams(location.search);
    const genreParam = queryParams.get("genre");

    if (genreParam && activeButtons[genreParam] !== true) {
      setActiveButtons((prev) => ({
        ...prev,
        [genreParam]: true,
      }));
      setFilters((prev) => ({ ...prev, num: 2 }));
    }
  }, [location.search]);

  return (
    <>
      <Header />
      <div className="pt-10 flex justify-center gap-20">
        <div>
          <MovieSearchPageAside
            filters={filters}
            setFilters={setFilters}
            searching={searching}
            activeButtons={activeButtons}
            setActiveButtons={setActiveButtons}
          />
        </div>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
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
        <button onClick={LoadMoreMovies}>CLick For More!</button>
      </div>
      <Footer />
    </>
  );
}

export default Movies;
