import { useEffect, useState } from "react";
import { addRating } from "../Modules/Movies";
import { useRef } from "react";

function Rating({ movie, setRating, ratingModal, ratingRes }) {
  const rating = Array(10).fill(5);
  const [hoverIndex, setHoverIndex] = useState(ratingRes.value - 1 || -1);
  const [ratingValue, setRatingValue] = useState(ratingRes.value || 0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (ratingModal) {
      document.body.classList.add("overflow-y-hidden");
    }
  }, [ratingModal]);

  const handleClickOutSide = (e) => {
    if (!containerRef.current && containerRef.current.contains(e.target)) {
      document.body.classList.remove("overflow-y-hidden");
      setRating(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  });

  const possibleScale = [
    "scale-1",
    "scale-2",
    "scale-3",
    "scale-4",
    "scale-5",
    "scale-6",
    "scale-7",
    "scale-8",
    "scale-9",
    "scale-10",
  ];

  const handleClick = (value) => {
    setRatingValue(value);
    setHoverIndex(value - 1);
  };

  const addRatingAPI = async (id) => {
    await addRating(id, ratingValue);
    setRating(false);
    document.body.classList.remove("overflow-y-hidden");
  };

  const onMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const onMouseLeave = () => {
    setHoverIndex(-1);
  };

  return (
    <div className="bg-[#00000099] fixed top-0 z-[9999] w-[100vw] h-[100vh]">
      <div ref={containerRef} className="p-6 w-[620px] h-[230px] bg-[#1f1f1f] flex flex-col justify-between items-center gap-2 relative translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
        <h1 className="absolute text-xs size-[100px] transition-all left-[42%] top-[-40%]">
          {" "}
          <span
            className={`absolute top-[35%] ${
              ratingValue === 1 ? "text-2xl left-[45%]" : "text-3xl"
            } font-bold ${
              ratingValue === 10 ? "left-[35%]" : "left-[42%]"
            } z-50 text-black`}
          >
            {ratingValue === false ? "?" : ratingValue}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`fill-white scale-${ratingValue} transition-all`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        </h1>
        <h1 className="text-yellow-400 py-4 font-bold">RATE THIS</h1>
        <h1>{movie.title}</h1>
        <div className="flex">
          {rating.map((_, index) => {
            return (
              <button key={index + 1} onClick={() => handleClick(index + 1)}>
                <svg
                  // onMouseEnter={() => onMouseEnter(index)}
                  // onMouseLeave={() => onMouseLeave()}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`size-10 px-1 text-yellow-500 ${
                    hoverIndex > index - 1 ? "fill-[#eab308]" : ""
                  }`}
                  onClick={() => handleClick(index + 1)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </button>
            );
          })}
        </div>
        <button
          className={`m-4 px-4 w-[288px] h-9 rounded-full ${
            ratingValue === 0 ? "bg-gray-600" : "bg-yellow-500"
          }`}
          onClick={() => addRatingAPI(movie.id, ratingValue)}
        >
          <span className="text-xl">Rate</span>
        </button>
      </div>
    </div>
  );
}

export default Rating;
