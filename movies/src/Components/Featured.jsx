import { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import FeaturedMovieCard from "./FeaturedMovieCard";
import * as movie from "../Modules/Movies";

function Featured() {
  const containerRef = useRef(null);
  const [list, setList] = useState([]);
  const { user, watchlist } = useSelector(
    (state) => ({
      user: state.user?.data,
      watchlist: state.watchlist.watchlist,
    }),
    shallowEqual
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await movie.topThisWeek();
      setList(response);
    };
    fetchData();
  }, []);

  const handleScrollClickLeft = () => {
    if (containerRef.current) {
      if (window.innerWidth > 1280) {
        containerRef.current.scrollLeft -= 1280;
      } else {
        containerRef.current.scrollLeft -= window.innerWidth;
      }
    }
  };

  const handleScrollClickRight = () => {
    if (containerRef.current) {
      if (window.innerWidth > 1280) {
        containerRef.current.scrollLeft += 1280;
      } else {
        containerRef.current.scrollLeft += window.innerWidth;
      }
    }
  };

  const watchListInFeatured = watchlist?.filter((item1) =>
    list.some((item2) => item1.id === item2.id)
  );
  return (
    <div className="py-10 h-auto bg-black relative w-full">
      <div className="px-3 relative lg:w-[1013px] xl:w-[1280px] m-auto">
        <h1 className="text-[#f5c518] font-bold px-6 text-3xl mb-5">
          Top Rated Movies
        </h1>
        <div
          className="grid grid-flow-col gap-3 my-1 overflow-hidden snap-x snap-mandatory scroll-smooth"
          ref={containerRef}
        >
          {list?.map((movie) => (
            <FeaturedMovieCard
              key={movie.id}
              movie={movie}
              user={user}
              watchlist={watchlist}
              watchListInFeatured={watchListInFeatured}
            />
          ))}
        </div>
        <button
          className="absolute z-50 top-[40%] border bg-gray-700 opacity-50 hover:bg-gray-500 hover:opacity-100 transform-translate-y-1/2 p-5 rotate-180"
          onClick={handleScrollClickLeft}
        >
          <svg
            className="invert"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
          </svg>
        </button>
        <button
          className="absolute z-50 top-[40%] right-3 border bg-gray-700 opacity-50 hover:bg-gray-500 hover:opacity-100 transform-translate-y-1/2 p-5"
          onClick={handleScrollClickRight}
        >
          <svg
            className="invert"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Featured;
