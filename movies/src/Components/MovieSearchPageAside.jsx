import React, { useEffect, useState } from "react";
import { options } from "../variables/loginMethods";

function MovieSearchPageAside({
  searching,
  activeButtons,
  setActiveButtons,
  filters,
  setFilters,
}) {
  const [expand, setExpand] = useState({
    sort: false,
    whereToWatch: false,
    Filters: false,
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const genreParam = queryParams.get("genre");
    if (genreParam) {
      setExpand((prevExpand) => ({
        ...prevExpand,
        Filters: true,
      }));
    }
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold text-3xl mb-5">Popular Movies</h1>
      <div className="border shadow-lg">
        <h1
          className="cursor-pointer font-bold p-4 border-b"
          onClick={() => setExpand({ ...expand, sort: !expand.sort })}
        >
          Sort
        </h1>
        {expand.sort && (
          <div className="flex flex-col p-4">
            <p className="mb-5">Sort Results By</p>
            <select
              className="bg-slate-300 text-xs p-2 rounded-md cursor-pointer"
              value={filters.options}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, options: e.target.value }))
              }
            >
              {options.map((option) => {
                return (
                  <option
                    key={option.option}
                    value={option.option}
                    className="bg-white"
                  >
                    {option.name}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>
      <div
        className="border shadow-lg"
        onClick={() => console.log(activeButtons)}
      >
        <h1
          className="cursor-pointer p-4 font-bold border-b"
          onClick={() =>
            setExpand({ ...expand, whereToWatch: !expand.whereToWatch })
          }
        >
          Where To Watch
        </h1>
        {expand.whereToWatch && <div>Hello</div>}
      </div>
      <div className="border shadow-lg">
        <h1
          className="cursor-pointer  font-bold p-4 border-b"
          onClick={() => setExpand({ ...expand, Filters: !expand.Filters })}
        >
          Filters
        </h1>
        {expand.Filters && (
          <div className="grid md:grid-cols-2 grid-cols-1  gap-3 p-4">
            {filters.genres?.map(({ id, name }) => {
              return (
                <button
                  key={id}
                  onClick={() =>
                    setActiveButtons((prev) => ({
                      ...prev,
                      [id]: !prev[id],
                    }))
                  }
                  className={`rounded-full border hover:bg-blue-600 text-xs md:text-base hover:text-white transition px-3 ${
                    activeButtons[id] ? "bg-blue-600 text-white" : null
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <button
        onClick={searching}
        className="hover:bg-blue-600 hover:text-white transition border rounded-full"
      >
        Search
      </button>
    </div>
  );
}

export default MovieSearchPageAside;
