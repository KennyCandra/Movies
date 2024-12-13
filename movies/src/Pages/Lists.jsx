import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFavouriteList, fetchList, fetchWatchList } from "../Modules/Movies";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import MovieCardList from "../Components/MovieCardList";
import AsideLists from "../Components/AsideLists";
import NewList from "../Components/NewList";
import { shallowEqual, useSelector } from "react-redux";

function Lists() {
  const { id } = useParams();
  const [list, setList] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createNewList, setCreateNewList] = useState(false);
  const { user, watchlist } = useSelector(
    (state) => ({
      user: state.user.data,
      watchlist: state.watchlist.watchlist,
    }),
    shallowEqual
  );
  const fetchUserList = async () => {
    const respone = await fetchFavouriteList(user);
    setMovies(respone);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchList(id);
      setList(data);
      setMovies(data.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWatList = async () => {
    try {
      setLoading(true);
      const data = await fetchWatchList(user);
      setList(data);
      setMovies(data);
      console.log(data)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchingFunction = async () => {
      if (id === "favourteList") {
        fetchUserList();
      } else if (id === "watchlist") {
        fetchWatList();
      } else {
        fetchData();
      }
    };

    fetchingFunction();
  }, [id]);

  return (
    <>
      <Header />
      <main className="w-full bg-[#1f1f1f] h-[262px] flex justify-center gap-4 items-center">
        <section className="w-[50%] flex flex-col gap-6">
          <h1 className="text-white text-4xl">
            {id === "watchlist"
              ? "Your Watchlist"
              : id === "favourteList"
              ? "Your Favourite List"
              : `List :${list.name}`}
          </h1>
          <p className="text-white">
            Created By :
            <span className="text-cyan-600 px-2">
              {id === "watchlist"
                ? user.username
                : id === "favourteList"
                ? user.username
                : list.created_by}
            </span>
          </p>
          <p className="text-white">
            {id === "watchlist"
              ? `Your Watchlist is the place to track the titles you want to watch.
            You can sort your Watchlist by the IMDb rating, popularity score and
            arrange your titles in the order you want to see them.`
              : id === "favourteList"
              ? `Your Favourite List is the place to track the titles you want to watch.
            You can sort your Watchlist by the IMDb rating, popularity score and
            arrange your titles in the order you want to see them.`
              : list.description}
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
      </main>
      <div className="w-full flex justify-center items-start gap-10 flex-wrap mt-5">
        <section className="w-[878px] border-8 h-auto overflow-visible">
          {loading ? (
            <div>loading</div>
          ) : movies.length === 0 ? (
            <div>{`NO MOVIES TRY TO ADD SOME >.<`}</div>
          ) : (
            movies.map((movie, index) => {
              return (
                <MovieCardList
                  key={movie.id}
                  movie={movie}
                  index={index}
                  setMovies={setMovies}
                  watchListMovies={movies}
                />
              );
            })
          )}
        </section>
        <AsideLists />
      </div>
      <Footer />
      {createNewList && <NewList setCreateNewList={setCreateNewList} />}
    </>
  );
}

export default Lists;
