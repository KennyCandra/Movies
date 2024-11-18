import React, { useState } from "react";
import axios from "axios"; // Ensure axios is imported if not already

function NewList({ setCreateNewList }) {
  const [values, setValues] = useState({
    name: "",
    description: "",
    language: "en",
  });

  const createMyOwnList = async (e) => {
    e.preventDefault();
    const headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmU5MTEzZjNkNTlmYjJiMDA0YmQxZDcwMmEyNjA2NCIsIm5iZiI6MTcyODg1MDg1MC4xMzkzMSwic3ViIjoiNjZmYmUyODFmMmI5Yzk3YzFkZDYzNjcxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cscRHnA4UIi60yO1sS6mac9XrSPVkgFDFp1NahVeffs",
    };

    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/list`,
        values,
        {
          headers: headers,
        }
      );
      console.log(response);
      setCreateNewList(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 text-white flex justify-center items-center z-50 flex-col">
      <div className="bg-white text-black w-full max-w-lg p-4 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold">Create your Own List!</h1>
        <h1 className="font-bold">Your List Details</h1>
        <form className="flex flex-col gap-4" onSubmit={createMyOwnList}>
          <label htmlFor="username">
            List name:
            <input
              className="border border-black rounded-md px-4 mx-4"
              type="text"
              name="username"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </label>
          <label htmlFor="description">
            List description:
            <input
              className="border border-black rounded-md px-4 mx-4"
              type="text"
              name="description"
              value={values.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </label>
          <button
            disabled={values.name == "" || values.description == ""}
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
        <button onClick={() => setCreateNewList(false)} className="mt-4">
          Close
        </button>
      </div>
    </div>
  );
}

export default NewList;
