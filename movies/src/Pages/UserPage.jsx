import React, { useEffect, useRef, useState } from "react";
import Header from "../Components/Header/Header";
import { shallowEqual, useSelector } from "react-redux";
import FeaturedMovieCard from "../Components/FeaturedMovieCard";
import Footer from "../Components/Footer";

function UserPage() {
  const containerRef = useRef(null);
  const { user, watchlist } = useSelector(
    (state) => ({
      user: state.user?.data,
      watchlist: state.watchlist.watchlist,
    }),
    shallowEqual
  );
  const [hideButtons, setHideButtons] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth;
    if (
      (windowWidth > 1280 && containerWidth > 1278) ||
      (windowWidth > 1024 && containerWidth > 1012) ||
      windowWidth < containerWidth
    ) {
      setHideButtons(true);
    } else {
      setHideButtons(false);
    }
  }, [windowWidth]);

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


  return (
    <div>
      <Header />
      <div className="bg-[#1f1f1f] h-[303px] flex flex-col gap-3 px-4 ">
        <div className="flex justify-end gap-2 text-white">
          <div className="p-3 rounded-full hover:bg-gray-500 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="p-3 rounded-full hover:bg-gray-500 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="flex justify-between">
          <section className="flex items-center text-white gap-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-20 md:size-52 text-gray-600 hover:text-black"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="space-y-2">
              <h1 className="font-bold text-xl md:text-3xl">{user.username}</h1>
              <h2 className="text-xs md:text-xl">Joined Some day</h2>
              <button className="text-blue-400 bg-gray-700 font-bold text-sm py-2 px-4 rounded-3xl w-fit">
                Edit Profile
              </button>
            </div>
          </section>

          <section className="grid grid-cols-2  lg:grid-cols-4 gap-3 text-white">
            <div className="bg-black h-[75px] flex items-center justify-center font-bold flex-col rounded-lg md:w-[160px] md:h-[75px] text-sm md:text-md">
              Ratings <p>{watchlist.length}</p>
            </div>
            <div className="bg-black h-[75px] flex items-center justify-center font-bold flex-col rounded-lg md:w-[160px] md:h-[75px] text-sm md:text-md">
              <h1>Watchlist</h1>
              <p>{watchlist.length}</p>
            </div>
            <div className="bg-black h-[75px] flex items-center justify-center font-bold flex-col rounded-lg md:w-[160px] md:h-[75px] text-sm md:text-md">
              Lists <p>{watchlist.length}</p>
            </div>
            <div className="bg-black h-[75px] flex items-center justify-center font-bold flex-col rounded-lg md:w-[160px] md:h-[75px] text-sm md:text-md">
              More{" "}
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </p>
            </div>
          </section>
        </div>
      </div>
      <div className="relative w-auto lg:max-w-[1013px] xl:max-w-[1280px] m-auto">
        {hideButtons && (
          <>
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
              className="absolute z-50 top-[40%] right-0 border bg-gray-700 opacity-50 hover:bg-gray-500 hover:opacity-100 transform-translate-y-1/2 p-5"
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
          </>
        )}
        <h1 className="text-3xl font-bold mb-3 relative before:w-1 w-auto before:rounded-sm before:absolute before:bg-yellow-500 before:h-full mt-3">
          <span className="pl-3"> Watchlist </span>
        </h1>
        <div
          className="grid grid-flow-col w-fit gap-3 lg:max-w-[1013px] xl:max-w-[1280px] my-1 overflow-hidden snap-x snap-mandatory scroll-smooth border border-black rounded-md"
          ref={containerRef}
        >
          {watchlist.map((movie) => {
            return (
              <FeaturedMovieCard
                key={movie.id}
                movie={movie}
                user={user}
                watchlist={watchlist}
                watchListInFeatured={watchlist}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserPage;
