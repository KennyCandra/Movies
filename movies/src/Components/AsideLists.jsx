import React, { useEffect, useState } from "react";
import * as action from "../Modules/Movies";
import { useSelector } from "react-redux";

function AsideLists() {
  const { watchlist } = useSelector((state) => ({
    watchlist: state.watchlist.watchlist,
  }));

  const [myList, setMyLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const lists = await action.getMyLists();
      setMyLists(lists);
    };
    fetchLists();
  }, []);
  return (
    <aside className="w-[412px] flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold px-5">More To explore</h1>
        <div className="flex flex-col flex-wrap justify-between h-[95px] w-[370px] border pl-5 content-between">
          <div className="flex flex-col justify-between h-full">
            <h2>your Check-ins</h2>
            <p>Titles you are or have watched</p>
          </div>
          <div className="w-[72px] h-[107px] overflow-hidden">
            {watchlist.length !== 0 && (
              <img
                src={`https://image.tmdb.org/t/p/original/${watchlist[0].poster_path}`}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col flex-wrap justify-between h-[95px] w-[370px] border pl-5 content-between">
          <div className="flex flex-col justify-between h-full">
            <h2>your Rating</h2>
            <p>Titles you are or have watched</p>
          </div>
          <div className="w-[72px] h-[107px] overflow-hidden">
            {watchlist.length !== 0 && (
              <img
                src={`https://image.tmdb.org/t/p/original/${watchlist[0].poster_path}`}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col flex-wrap justify-between h-[95px] w-[370px] border pl-5 content-between">
          <div className="flex flex-col justify-around h-full">
            <h2>your Watchlist</h2>
            <p>Titles you are or have watched</p>
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
      <div className="my-5">
        <h1 className="text-3xl font-bold group mb-5">
          Your Lists{" "}
          <span className="group-hover:text-yellow-500 transition">{`>`}</span>
        </h1>
        <button
          onClick={() => console.log(myList)}
          className="rounded-full my-5 hover:bg-buttonHover py-2 px-5 flex flex-wrap content-center justify-center items-end gap-1"
        >
          <span className="text-xl">+</span>
          <span className="text-md"> Create your own list</span>
        </button>
        <div className="flex flex-col gap-1">
          {myList.map((list) => {
            return (
              <div
                key={list.id}
                className="flex flex-col flex-wrap justify-between h-[95px] w-[370px] border pl-5 content-between p-[3px] rounded-lg"
              >
                <div className="flex flex-col justify-around h-full">
                  <h2>{list.description}</h2>
                  <p>{list.item_count}</p>
                </div>
                <div className="w-[72px] h-[107px] overflow-hidden">
                  {list.poster_path !== null ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${watchlist[0].poster_path}`}
                    />
                  ) : (
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        class="ipc-icon ipc-icon--movie ipc-icon--inline ipc-media__icon"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        role="presentation"
                      >
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M18 4v1h-2V4c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v1H6V4c0-.55-.45-1-1-1s-1 .45-1 1v16c0 .55.45 1 1 1s1-.45 1-1v-1h2v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h2v1c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1s-1 .45-1 1zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path>
                      </svg>{" "}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default AsideLists;
