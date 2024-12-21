import React, { useEffect, useState } from "react";
import { createList } from "../Modules/Movies";

function NewList({ setCreateNewList, newListRef }) {
  const [values, setValues] = useState({
    name: "",
    description: "",
    language: "en",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setCreateNewList(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setCreateNewList]);

  const createMyOwnList = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createList(values);
      alert(`You just created a new list: ${values.name}`);
      setCreateNewList(false);
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 text-white flex justify-center items-center z-50"
      onClick={() => setCreateNewList(false)}
      ref={newListRef}
    >
      <div
        className="bg-white text-black w-full max-w-lg p-4 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-xl font-bold">Create your Own List!</h1>
        <h1 className="font-bold">Your List Details</h1>
        <form className="flex flex-col gap-4" onSubmit={createMyOwnList}>
          <label htmlFor="username" className="flex flex-col gap-2">
            List name:
            <input
              className="border border-black rounded-md px-4"
              type="text"
              name="username"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </label>
          <label htmlFor="description" className="flex flex-col gap-2">
            List description:
            <input
              className="border text-right border-black rounded-md px-4"
              type="text"
              name="description"
              value={values.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </label>
          <button
            disabled={
              isLoading || values.name === "" || values.description === ""
            }
            type="submit"
            className={`mt-4 px-4 py-2 rounded ${
              values.name && values.description && !isLoading
                ? "bg-blue-500 text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
        <button
          onClick={() => setCreateNewList((prev) => !prev)}
          className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default NewList;
