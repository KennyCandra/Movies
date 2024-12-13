import React, { useEffect, useState } from "react";
import { getMyLists } from "../Modules/Movies";
import { shallowEqual, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import List from "./List";

function AsideLists() {
  const navigate = useNavigate();
  const { watchlist, user } = useSelector(
    (state) => ({
      watchlist: state.watchlist.watchlist,
      user: state.user,
    }),
    shallowEqual
  );
  const [myList, setMyLists] = useState([]);
  const location = useLocation();

  const fetchLists = async () => {
    const lists = await getMyLists(user);
    setMyLists(lists);
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <aside className="w-[412px] flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold mb-3 relative before:w-1 before:rounded-sm before:absolute  before:bg-yellow-500 before:h-full ">
          <span className="pl-3">More To explore </span>
        </h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col flex-wrap justify-between h-[95px] w-[370px] border pl-5 py-2 cursor-pointer hover:bg-gray-100 content-between rounded-md overflow-hidden px-2 border-black ">
            <div className="flex flex-col justify-between h-full">
              <h2 onClick={() => navigate('/lists/favourteList')} className="hover:underline">your favourite list</h2>
              <p className="text-xs font-normal text-gray-400">
                Titles you are or have watched
              </p>
            </div>
            <div className="w-[72px] h-[107px] overflow-hidden">
              {watchlist.length !== 0 && (
                <img
                  src={`https://image.tmdb.org/t/p/original/${watchlist[0].poster_path}`}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col flex-wrap justify-between h-[95px] w-[370px] border pl-5 py-2 cursor-pointer hover:bg-gray-100 content-between rounded-md overflow-hidden px-2 border-black ">
            <div className="flex flex-col justify-between h-full">
              <h2 className="hover:underline">your Rating</h2>
              <p className="text-xs font-normal text-gray-400">
                Titles you are or have watched
              </p>
            </div>
            <div className="w-[72px] h-[107px] overflow-hidden border"></div>
          </div>
          <div className="flex flex-col flex-wrap justify-between h-[95px] w-[370px] border pl-5 py-2 cursor-pointer hover:bg-gray-100 content-between rounded-md overflow-hidden px-2 border-black ">
            <div className="flex flex-col justify-around h-full">
              <h2
                onClick={() =>
                  location.pathname === "/watchlist"
                    ? null
                    : navigate("/lists/watchlist")
                }
                className="hover:underline"
              >
                your Watchlist
              </h2>
              <p className="text-xs font-normal text-gray-400">
                Titles you are or have watched
              </p>
            </div>
            <div className="w-[72px] h-[107px] overflow-hidden">
              {watchlist.length !== 0 && (
                <img
                  src={`https://image.tmdb.org/t/p/original/${watchlist[0].poster_path}`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="my-5">
        <div className="flex flex-col ">
          <h1 className="text-3xl font-bold group w-max cursor-pointer flex items-end">
            Your Lists
            <span className="group-hover:text-yellow-500 font-bold transition duration-300 inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </span>
          </h1>
          <button className="rounded-full my-5 px-2 hover:bg-gray-400 w-max">
            <span className="text-xl">+</span>
            <span className="text-md"> Create your own list</span>
          </button>
        </div>
        <div className="flex flex-col gap-1">
          {myList.map((list) => {
            return <List key={list.id} list={list} />;
          })}
        </div>
      </div>
    </aside>
  );
}

export default AsideLists;
