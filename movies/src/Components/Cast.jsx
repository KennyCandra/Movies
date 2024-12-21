function Cast({ movie, credits }) {
  return (
    <div className="bg-[#c4c4c0] w-full h-full">
      {movie && (
        <div className="w-[1000px] bg-white m-auto items-start flex flex-start">
          <div className="w-[620px] px-2 py-3  rounded  border-black">
            <div className="flex">
              <div className="pr-5">
                <img
                  className="w-[70px] h-[100px]"
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                />
              </div>
              <div>
                <h1 className="text-3xl text-blue-600">
                  {movie.original_title}{" "}
                  <span className="text-xs text-black">
                    {movie.release_date}
                  </span>
                </h1>
                <h1 className="text-3xl">FULL Cast & Crew</h1>
                <button className="flex border px-2 rounded cursor-pointer">
                  <img src="/images/IMDB.png" className="w-[55px] h-6" />
                  See agents for this cast & crew on IMDbPro
                </button>
              </div>
            </div>
            <h1>cast series</h1>
            <div className="space-y-2">
              {credits.cast.map((credit) => (
                <div key={credit.cast_id} className="flex gap-2 border">
                  <div>
                    <img
                      className="w-8 h-11"
                      src={`https://image.tmdb.org/t/p/original/${credit.profile_path}`}
                    />
                  </div>
                  <div className="flex gap-10">
                    <h1>{credit.name}</h1>
                    <h1>{credit.character}</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#f2f2f2] px-14 py-5 text-blue-400">
            <h1 className="">{movie.title} Movie</h1>
            <div className="w-full border mt-5" />
            <h2 className="text-black">Details</h2>
            <h2>Full Cast and Crew</h2>
            <h2>Release Dates</h2>
            <h2>Official Sites</h2>
            <h2>Company Credits</h2>
            <h2>Filming Production</h2>
            <h2>Technical Specs</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cast;

//     "adult": false,
//     "gender": 1,
//     "id": 19537,
//     "known_for_department": "Acting",
//     "name": "Megan Fox",
//     "original_name": "Megan Fox",
//     "popularity": 63.99,
//     "profile_path": "/zQp2YM0zbC27Ws97LNbyicysk8p.jpg",
//     "cast_id": 1,
//     "character": "Alice",
//     "credit_id": "63a33c33be6d88007f198c71",
//     "order": 0
