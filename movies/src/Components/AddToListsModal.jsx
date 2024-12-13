import { useRef, useEffect, useState } from "react";
import { fetchList, getMyLists } from "../Modules/Movies";
import AddToListLists from "./AddToListLists";
import { useNavigate } from "react-router-dom";

function AddToListsModal({ setListsModal, movie, user }) {
  const containerRef = useRef(null);
  const [myList, setMyLists] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add("overflow-y-hidden");
  }, []);

  const closeExpandedMovie = () => {
    document.body.classList.remove("overflow-y-hidden");
    setListsModal(false);
  };

  const handleClickOutSide = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      closeExpandedMovie();
    }
  };

  const fetchLists = async () => {
    const lists = await getMyLists(user);
    setMyLists(lists);
  };

  useEffect(() => {
    fetchLists();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 text-white z-[51] flex items-end md:justify-center md:items-center">
      <div
        className="rounded-lg w-full shadow-lg absolute md:max-w-[700px] bg-[#1a1a1a]"
        ref={containerRef}
      >
        <div className="flex p-4 gap-5 rounded-full">
          <img
            className="w-[43px] h-[64px]"
            alt="Movie Picture"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          />
          <div className="space-y-2">
            <h2 className="text-sm text-gray-400">{movie.title}</h2>
            <h1 className="text-xl font-bold">Add to list</h1>
          </div>
        </div>

        <div className="bg-[#1f1f1f] pt-2 pb-[60px] divide-y-[1px] divide-gray-400 ">
          <div className="flex hover:bg-gray-600 px-4 justify-between h-[50px] items-center">
            <div className="grow h-full flex" onClick={() => navigate('/lists/watchlist')}>
              <h1 className="self-center">View Watchlist</h1>
            </div>

            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 h-full cursor-pointer hover:bg-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </p>
          </div>
          <div className="flex hover:bg-gray-600 px-4 justify-between h-[50px] items-center">
            <div className="grow hover:bg-gray-600 h-full flex">
              <h1 className="self-center"> Create new list</h1>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 h-full cursor-pointer hover:bg-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
          {myList.length === 0 ? (
            <div>their is no lists</div>
          ) : (
            myList.map((item) => {
              return <AddToListLists item={item} movie={movie} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default AddToListsModal;
