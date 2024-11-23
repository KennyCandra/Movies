import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchList } from "../Modules/Movies";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import MovieCardList from "../Components/MovieCardList";
import AsideLists from "../Components/AsideLists";

function Lists() {
  const { id } = useParams();
  const [list, setList] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

    fetchData();
  }, [id]);
  return (
    <>
      <Header />
      <div
        className="w-full bg-[#1f1f1f] h-[262px] flex justify-center gap-4 items-center"
      >
        <section className="w-[50%] flex flex-col gap-6">
          <h1 className="text-white text-4xl">List :{list.name}</h1>
          <p className="text-white">
            Created By :
            <span className="text-cyan-600 px-2">{list.created_by}</span>
          </p>
          <p className="text-white">{list.description}</p>
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
      <div className="w-full flex justify-center items-start gap-10 flex-wrap mt-5">
        <section className="w-[878px] border-8 h-auto overflow-visible">
          {loading ? (
            <div>loading</div>
          ) : (
            movies.map((movie, index) => {
              return (
                <MovieCardList
                  className="h-auto"
                  key={movie.id}
                  movie={movie}
                  index={index}
                  watchListMovies={movies}
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
