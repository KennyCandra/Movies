import React, { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import { useSelector } from "react-redux";
import MovieCardList from "../Components/MovieCardList";
import axios from "axios";

function watchlist() {
  const bear = useSelector((state) => state.bear.data);
  const [watchListMovies, setWatchListMovies] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmU5MTEzZjNkNTlmYjJiMDA0YmQxZDcwMmEyNjA2NCIsIm5iZiI6MTcyODg1MDg1MC4xMzkzMSwic3ViIjoiNjZmYmUyODFmMmI5Yzk3YzFkZDYzNjcxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cscRHnA4UIi60yO1sS6mac9XrSPVkgFDFp1NahVeffs",
    };
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/account/${bear.id}/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`,
        { headers: headers }
      );
      setWatchListMovies(response.data.results);
      console.log(watchListMovies);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="w-full bg-[#1f1f1f] h-[262px] flex justify-center gap-4 items-center">
        <section className="w-[50%] flex flex-col gap-6">
          <h1
            className="text-white text-4xl"
            onClick={() => console.log(watchListMovies)}
          >
            Your Watchlist
          </h1>
          <p className="text-white">
            Created By:<span className="text-cyan-600">{bear.username}</span>
          </p>
          <p className="text-white">
            Your Watchlist is the place to track the titles you want to watch.
            You can sort your Watchlist by the IMDb rating, popularity score and
            arrange your titles in the order you want to see them.
          </p>
        </section>
        <section>
          <button
            className="bg-[#f5c518] rounded-sm h-[48px] w-[231px] px-4"
            onClick={() => alert(`DON't Click At ME ${bear.username}`)}
          >
            <p className="font-bold text-xs">Create A New List</p>
            <p className="text-xs">List your movie , TV & Celebrity picks</p>
          </button>
        </section>
      </div>
      <div className="w-full">
        <div className="w-[878px] m-auto border-8">
          {watchListMovies.length === 0 ? (
            <div>loading</div>
          ) : (
            watchListMovies.map((movie, index) => {
              return (
                <MovieCardList
                  movie={movie}
                  index={index}
                  watchListMovies={watchListMovies}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default watchlist;
