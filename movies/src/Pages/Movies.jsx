import { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import { options } from "../variables/loginMethods";
import { fetchTypes, fetchDataMovie, search } from "../Modules/Movies";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    genres: [],
    options: "popularity.desc",
    num: 1,
    selectedGenres: [],
  });
  const [activeButtons, setActiveButtons] = useState({});
  const [expand, setExpand] = useState({
    sort: false,
    whereToWatch: false,
    Filters: false,
  });

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
      const Data = await search(filters.options, finalGenreArr, 1);
      setMovies(Data);
      setFilters((prev) => ({
        ...prev,
        num: prev.num + 1,
      }));
    } catch (error) {
      console.error("Search failed:", error);
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
    setMovies((prev) => [...prev, ...Data]);
    setFilters((prev) => ({ ...prev, num: prev.num + 1 }));
  };

  useEffect(() => {
    fetchData();
    fetchGenre();
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
                  value={filters.options}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, options: e.target.value }))
                  }
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
                {filters.genres?.map(({ id, name }) => {
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
            onClick={searching}
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
