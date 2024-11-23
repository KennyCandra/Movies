import React, { useEffect, useState } from "react";
import { fetchList } from "../Modules/Movies";
import { useNavigate } from "react-router-dom";

function List({ list }) {
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchList(list.id);
        setMovie(data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div
      key={list.id}
      className="flex flex-col flex-wrap border-black justify-between hover:bg-gray-100 cursor-pointer h-[95px] w-[370px] border pl-5 content-between p-[3px] rounded-lg"
    >
      <div className="flex flex-col justify-around h-full">
        <h2
          className="hover:underline cursor-pointer"
          onClick={() => navigate(`/lists/${list.id}`)}
        >
          {list.description}
        </h2>
        <p>{list.item_count === 1 ? '1 movie' : list.item_count + ' movies'}</p>
      </div>
      <div className="w-[72px] h-[107px] overflow-hidden">
        {movie.length !== 0 ? (
          <img
            src={`https://image.tmdb.org/t/p/original/${movie[0].poster_path}`}
          />
        ) : (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="ipc-icon ipc-icon--movie ipc-icon--inline ipc-media__icon"
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
}

export default List;
