import axios from "axios";
import React, { useEffect, useState } from "react";

function Main() {
  const [popularList, setPopularList] = useState([]);
  const header = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmU5MTEzZjNkNTlmYjJiMDA0YmQxZDcwMmEyNjA2NCIsIm5iZiI6MTcyODg1MDg1MC4xMzkzMSwic3ViIjoiNjZmYmUyODFmMmI5Yzk3YzFkZDYzNjcxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cscRHnA4UIi60yO1sS6mac9XrSPVkgFDFp1NahVeffs",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          { headers: header }
        );
        setPopularList(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center">
      <section className="w-[850px]">div</section>
      <section className="right-section w-[405px] max-h-[445px] overflow-hidden">
        <h1 className="text-[#f5c518] text-xl h-14 font-bold mt-1">Up Next</h1>
        <div className="flex flex-col gap-2 bg-white">
          {popularList.map((list) => {
            return (
              <div className="flex">
                <section>
                  <div>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${list.poster_path}`}
                        className="w-[90px] h-[130px]"
                    />
                  </div>
                </section>
                <section></section>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Main;
