import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import { fetchTypes, fetchDataMovie, search } from "../Modules/Movies";
import MovieSearchPageAside from "../Components/MovieSearchPageAside";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    genres: [],
    options: "popularity.desc",
    num: 1,
    selectedGenres: [],
  });

  const [activeButtons, setActiveButtons] = useState({});
  const searching = async () => {
    try {
      const activeGenres = Object.entries(activeButtons)
        .filter(([_, isActive]) => isActive)
        .map(([genre]) => genre);

      const finalGenreArr = filters.genres
        .filter((genre) => activeGenres.includes(genre.name))
        .map((genre) => genre.id);

      setFilters((prev) => ({
        ...prev,
        num: 2,
        selectedGenres: finalGenreArr,
      }));
      const data = await search(filters.options, finalGenreArr, 1);
      setMovies(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchGenre = async () => {
    const genres = await fetchTypes();
    setFilters((prev) => ({ ...prev, genres: genres }));
  };
  const fetchData = async () => {
    const Data = await fetchDataMovie(
      filters.options,
      filters.selectedGenres,
      filters.num
    );
    setMovies([...movies, ...Data]);
    setFilters((prev) => ({ ...prev, num: prev.num + 1 }));
  };
  useEffect(() => {
    fetchData();
    fetchGenre();
  }, []);

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
        <button onClick={fetchData}>CLick For More!</button>
      </div>
      <Footer />
    </>
  );
}

export default Movies;
