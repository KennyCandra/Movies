import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToList, fetchList, removeFromList } from "../Modules/Movies";
import Loader from "./Loader";

function AddToListLists({ item, movie }) {
  const navigate = useNavigate();
  const [listMovies, setListMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchMovies = async () => {
    try {
      const response = await fetchList(item.id);
      setListMovies(response.items);
    } catch (error) {
      console.error("Error fetching list movies:", error);
    }
  };

  useEffect(() => {
    handleFetchMovies();
  }, []);

  const foundMovie = listMovies.filter(
    (movieList) => movieList.id === movie.id
  );

  const movieAction = async () => {
    try {
      setLoading(true);
      if (foundMovie.length) {
        setListMovies((prevList) =>
          prevList.filter((movie1) => movie1.id !== movie.id)
        );
        const response = await removeFromList(item.id, movie);
      } else {
        setListMovies([movie, ...listMovies]);
        const response = await addToList(item.id, movie);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div key={item.id} className="flex justify-between h-[50px] items-center">
      <div
        className="grow hover:bg-gray-600 h-full px-4 flex cursor-pointer"
        onClick={movieAction}
      >
        <h1 className="self-center flex items-end justify-center gap-1">
          {loading ? (
            <img src="/images/Spinner@1x-1.0s-200px-200px.gif" className="size-4" />
          ) : foundMovie.length ? (
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
                d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
              />
            </svg>
          ) : (
            "+ "
          )}
          {item.name}
        </h1>
      </div>
      <div
        className="hover:bg-gray-600 cursor-pointer px-4 h-full flex"
        onClick={() => navigate(`/lists/${item.id}`)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 self-center"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>
  );
}

export default AddToListLists;
