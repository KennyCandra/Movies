import React from "react";
import { getMyLists } from "../Modules/Movies";
import { useEffect, useState } from "react";
import axios from "axios";

function MoviesLists({ movie }) {
  const [list, setList] = useState([]);

  const headers = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmU5MTEzZjNkNTlmYjJiMDA0YmQxZDcwMmEyNjA2NCIsIm5iZiI6MTcyODg1MDg1MC4xMzkzMSwic3ViIjoiNjZmYmUyODFmMmI5Yzk3YzFkZDYzNjcxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cscRHnA4UIi60yO1sS6mac9XrSPVkgFDFp1NahVeffs",
    "Content-Type": "application/json;charset=utf-8",
  };

  const fetchLists = async () => {
    const lists = await getMyLists();
    setList(lists);
  };

  const data = { media_id: movie.id };
  const addToList = async (id) => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/list/${id}/add_item`,
        data,
        { headers: headers }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div onClick={() => console.log(list)}>
      {list.map((list) => {
        return (
          <h1 key={list.id} onClick={() => addToList(list.id, movie.id)}>
            {list.description}
          </h1>
        );
      })}
    </div>
  );
}

export default MoviesLists;
