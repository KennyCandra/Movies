import axios from "axios";
import React, { useEffect, useState } from "react";

function Main() {
  const [popularList, setPopularList] = useState([]);
  const [index, setIndex] = useState(0);
  const [newList, setNewList] = useState([]);

  const header = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmU5MTEzZjNkNTlmYjJiMDA0YmQxZDcwMmEyNjA2NCIsIm5iZiI6MTcyODg1MDg1MC4xMzkzMSwic3ViIjoiNjZmYmUyODFmMmI5Yzk3YzFkZDYzNjcxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cscRHnA4UIi60yO1sS6mac9XrSPVkgFDFp1NahVeffs",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          { headers: header }
        );
        setPopularList(response.data.results);
        setNewList(response.data.results.slice(0, 1));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (popularList.length > 0) {
      setNewList(popularList.slice(index, index + 1));
    }
  }, [index, popularList]);

  const handleNext = () => {
    if (index < popularList.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };

  const favoriteList = async (movieId) => {
    let url1 =
      "https://api.themoviedb.org/3/account/2147483647/favorite?session_id=bc5fbe1bb70203d72d6423bfbb4207be1da66066";
    const data = {
      media_type: "movie",
      media_id: movieId,
      favorite: true,
    };
    const header = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmU5MTEzZjNkNTlmYjJiMDA0YmQxZDcwMmEyNjA2NCIsIm5iZiI6MTcyODU2NjQ1Mi4xNjUwNDUsInN1YiI6IjY2ZmJlMjgxZjJiOWM5N2MxZGQ2MzY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.46ZdohKOAXxABXt9pV-dNn23WiLnYXGz-L2sHuq-MSU",
    };
    try {
      const response = await axios.post(url1, data, { headers: header });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center gap-10">
      <section className="w-[850px] border self-center">
        {newList.map((item) => {
          return (
            <div className="relative" key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                className="shadow-2xl"
              />
              <div className="flex h-[165px] flex-row gap-3 bottom-[-40px] bg-[rgba(0,0,0,0.5)] w-full absolute left-0 items-start px-5 group cursor-pointer">
                <div className="w-[165px] h-[300px] relative">
                  <div className="absolute bottom-44">
                    <button
                      className="absolute"
                      onClick={() => favoriteList(item.id)}
                    >
                      add to watch list
                    </button>
                    <img
                      className="w-[165px] h-[245px]  "
                      src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                    />
                  </div>
                </div>
                <img
                  src="/images/player-icon.svg"
                  className="size-20 invert group-hover:filter-none transition"
                />
                <div className="flex flex-col justify-evenly">
                  <h1>{item.title}</h1>
                  <span className="text-white w-[500px] text-ellipsis overflow-hidden whitespace-nowrap">
                    {item.overview}
                  </span>
                  <div className="flex content-center flex-wrap gap-2">
                    <p className="text-white">{item.vote_count}</p>
                    <img
                      src="/images/like-svgrepo-com.svg"
                      className="size-4 self-center invert hover:filter-none transition"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
      <section className="right-section w-[405px]">
        <h1 className="text-[#f5c518] text-xl h-14 font-bold mt-1">Up next</h1>
        <div className="flex flex-col gap-2 bg-[#121212] h-[444px]">
          {popularList.slice(index, index + 3).map((list) => {
            return (
              <div className="flex gap-2 px-4 h-[150px]" key={list.id}>
                <section onClick={() => console.log(newList)}>
                  <div>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${list.poster_path}`}
                      className="w-[90px] h-[130px]"
                    />
                  </div>
                </section>
                <section className=" w-[75%] flex flex-col content-center justify-center gap-1">
                  <img
                    src="/images/player-icon.svg"
                    className="size-10 invert"
                  />
                  <h1 className="text-white">{list.title}</h1>
                  <span className="text-white w-full text-ellipsis overflow-hidden whitespace-nowrap">
                    {list.overview}
                  </span>
                  <div className="flex content-center flex-wrap gap-2">
                    <p className="text-white">{list.vote_count}</p>
                    <img
                      src="/images/like-svgrepo-com.svg"
                      className="size-4 self-center invert hover:filter-none transition"
                    />
                  </div>
                </section>
              </div>
            );
          })}
        </div>
        <button onClick={handleNext}>Next item</button>
      </section>
    </div>
  );
}

export default Main;
