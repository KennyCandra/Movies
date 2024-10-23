import React from "react";

function Loader() {
  return (
    <div className="flex flex-col justify-center content-center flex-wrap self-center">
      <h1 className="text-3xl">Loading....</h1>
      <img src="/images/Spinner@1x-1.0s-200px-200px.gif" className="" />
    </div>
  );
}

export default Loader;
