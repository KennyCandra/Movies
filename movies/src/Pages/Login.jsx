import React from "react";
import axios from "axios";
import { loginMethods } from "../variables/loginMethods";

function Login() {
  const getRequestToken = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=efe9113f3d59fb2b004bd1d702a26064`
      );
      const { request_token } = response.data;
      localStorage.setItem("request_token", request_token);
      window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=http://localhost:5173/callback`;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-loginBackGround h-full">
      <div className=" bg-white max-w-[1080px] flex m-auto">
        <section className="right-section flex flex-col justify-center flex-wrap items-center">
          <h1 className="font-bold">Sign In</h1>
          <div className="login-methods">
            {loginMethods.map((method) => {
              return (
                <div key={method.name} className="border m-3">
                  <button className="flex p-1">
                    <img
                      src="/images/Facebook-logo.png"
                      className="w-[64px] h-[32px]"
                    />
                    <h1>Sign In With {method.name} </h1>
                  </button>
                </div>
              );
            })}
          </div>
          <div className="divider flex flex-col ">
            <div className="flex justify-center my-5 before:border-b-[1px] before:border-b-black after:border-b-[1px] after:border-b-black before:mr-6 after:ml-6 before:ml-24 after:mr-24 before:my-2 after:my-2 before:flex-1 after:flex-1">
              <span className="text-sm">or</span>
            </div>
            <div className="flex w-96">
              <button className="bg-buttonColor m-auto w-[50%] rounded-md font-bold p-[10px]" onClick={getRequestToken}>
                Sign In using TMBD!
              </button>
            </div>
            <p className="text-xs m-5">
              By signing in,
              <span className="text-blue-500 text-xs hover:underline hover:cursor-pointer">
                you agree to IMDb's Conditions of Use and Privacy Policy.
              </span>
            </p>
          </div>
        </section>
        <section className="left-section mx-4">
          <h1 className="font-bold text-2xl">
            Benefits of your free IMDb account
          </h1>
          <div className="my-2">
            <h2 className="font-semibold">Personalized Recommendations</h2>
            <p className="text-sm">Discover shows you'll love.</p>
          </div>
          <div className="my-2">
            <h2 className="font-semibold">Your Watchlist</h2>
            <p className="text-sm">
              Track everything you want to watch and receive e-mail when movies
              open in theaters.
            </p>
          </div>
          <div className="my-2">
            <h2 className="font-semibold">Your Ratings</h2>
            <p className="text-sm">Rate and remember everything you've seen.</p>
          </div>

          <div className="my-2">
            <h2 className="font-semibold">Contribute to IMDb</h2>
            <p className="text-sm">
              Add data that will be seen by millions of people and get cool
              badges.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;

//   <button className="4" onClick={getRequestToken}>
//     Login!
//   </button>
