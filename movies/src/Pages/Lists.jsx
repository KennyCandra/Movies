import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchList } from "../Modules/Movies";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";
import MovieCardList from "../Components/MovieCardList";
import AsideLists from "../Components/AsideLists";

function Lists() {
  const { id } = useParams();
  const { user, watchlist } = useSelector((state) => ({
    user: state.user.data,
    watchlist: state.watchlist.watchlist,
  }));
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchList(id);
      setList(data);
    };

    fetchData();
  }, []);
  return (
    <>
      <Header />
      <div className="w-full bg-[#1f1f1f] h-[262px] flex justify-center gap-4 items-center" onClick={() => console.log(list)}>
        <section className="w-[50%] flex flex-col gap-6">
          <h1 className="text-white text-4xl" onClick={() => fetchMovie()}>
            Your Watchlist
          </h1>
          <p className="text-white">
            Created By:<span className="text-cyan-600">{user.username}</span>
          </p>
          <p className="text-white">
            Your Watchlist is the place to track the titles you want to watch.
            You can sort your Watchlist by the IMDb rating, popularity score and
            arrange your titles in the order you want to see them.
          </p>
        </section>
        <section>
          <button
            className="bg-[#f5c518] rounded-full h-[48px] w-[231px] px-4"
            onClick={() => setCreateNewList(!createNewList)}
          >
            <p className="font-bold text-xs">Create A New List</p>
            <p className="text-xs">List your movie , TV & Celebrity picks</p>
          </button>
        </section>
      </div>
      <div className="w-full flex justify-center gap-10 flex-wrap mt-5">
        <section className="w-[878px] border-8">
          {watchlist.length === 0 ? (
            <div>loading</div>
          ) : (
            watchlist.map((movie, index) => {
              return (
                <MovieCardList
                  key={movie.id}
                  movie={movie}
                  index={index}
                  watchListMovies={watchlist}
                />
              );
            })
          )}
        </section>
        <AsideLists />
      </div>
      <Footer />
    </>
  );
}

export default Lists;
