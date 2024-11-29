import React, { useState } from "react";

function Reviews({ reviews }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index === reviews.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const previous = () => {
    if (index === 0) {
      setIndex(reviews.length - 1);
    } else {
      setIndex(index - 1);
    }
  };
  return (
    <div
      className="w-[1280px] flex flex-col justify-center content-center mx-auto my-5"
      onClick={() => console.log(reviews)}
    >
      <div className="w-[890px]">
        <section className="flex flex-wrap justify-between mb-4">
          <h3 className="pl-3 text-3xl font-bold">
            User Reviews
            <span className="text-xs pl-5 text-gray-400">{reviews.length}</span>
          </h3>
          <button className="text-blue-400 self-end">+ Review</button>
        </section>
        <section className="">
          {reviews.slice(index, index + 1).map((review) => {
            return (
              <div key={review.id} className="">
                <div className="border px-2 mb-4 p-4">
                  <div className="mb-4">
                    <div className="flex justify-between">
                      <h1 className="text-black px-5 py-1 rounded-full font-bold mb-5 relative">
                        <p className="z-50 relative px-5"> Featured Review</p>
                        <svg
                          className="absolute top-0 z-1"
                          width="175"
                          viewBox="0 0 494 99"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M408.128 99C421.748 99 434.433 92.0691 441.79 80.6065L493.241 0.446386C493.365 0.253423 493.229 0 493 0V0H30C13.4315 0 0 13.4315 0 30V69C0 85.5685 13.4315 99 30 99H408.128Z"
                            fill="#F5C518"
                          />
                        </svg>
                      </h1>
                      <p>{review.author_details.rating}/ 10 ⭐</p>
                    </div>
                    <h1 className="font-bold text-3xl">
                      {review.author_details.username}
                    </h1>
                    <p>{review.content}</p>
                    <div className="flex flex-wrap justify-between content-center my-5">
                      <button
                        onClick={previous}
                        className="border rounded-full px-5 py-1 hover:bg-buttonHover"
                      >
                        previous Review
                      </button>
                      <button
                        onClick={next}
                        className="border rounded-full px-5 py-1 hover:bg-buttonHover"
                      >
                        Next Review
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-20 pl-5">
                    <button className="flex flex-wrap content-center justify-center items-center hover:bg-buttonHover px-5 rounded-full">
                      <img src="/images/like.png" className="invert size-10" />
                      <p>Helpful</p>
                    </button>
                    <button className="hover:bg-buttonHover px-5 rounded-full">
                      Not Helpful
                    </button>
                  </div>
                </div>
                <div className="flex gap-5 py-3 text-sm">
                  <div className="relative">
                    <svg
                    className="absolute top-[-145%] right-5"
                      width="50"
                      height="25"
                      viewBox="0 0 150 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M75 100L0.52182 0.25L149.478 0.25L75 100Z"
                        fill="white"
                      />
                    </svg>

                    <h1 className="text-blue-500">{review.author}</h1>
                  </div>
                  <p>{review.created_at}</p>
                  <a
                    href={review.url}
                    className="text-blue-600 hover:underline"
                  >
                    PermaLink
                  </a>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default Reviews;

{
  /* <div className="font-bold bg-white text-black h-[460px] w-[872px] p-6">
<div className="flex flex-wrap justify-between">
  <h1 className="after:bg-black py-6">User Reviews</h1>
  <button
    className="text-blue-500"
    onClick={() => alert(`i don't know how to add review please wait`)}
  >
    + Review
  </button>
</div>
<div className="flex flex-col overflow-hidden h-[330px]">
  {reviews.length !== 0 ?
    reviews.map((review) => {
      return (
        <div key={review.id} className="p-4 h-[330px] w-[800px] flex flex-wrap content-between">
          <div>
            <div className="flex flex-wrap justify-between">
              <h1 className="bg-yellow-500 pr-5 pl-4 rounded-full">
                Featured Review
              </h1>
              <h1>{review.author_details.rating}/10 ⭐</h1>
            </div>
            <h1
              onClick={() => console.log(review)}
              className="mt-5 ml-4 font-bold"
            >
              {review.author}
            </h1>
            <p className="ml-4">{review.content}</p>
          </div>
          <div className="ml-4 flex gap-3">
            <button>Helpful</button>
            <button>Dislike</button>
          </div>
        </div>
      );
    }) : <h1>{`No Reviews :"(`}</h1>}
</div>
</div> */
}
