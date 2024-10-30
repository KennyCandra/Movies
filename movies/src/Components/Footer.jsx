import React from "react";

function Footer() {
  const arr = [",", ",", ",", ",", ","];
  return (
    <footer className="bg-black flex content-center flex-wrap justify-center flex-col">
      <section className="flex flex-wrap justify-center content-center gap-2">
        <div className="h-28 w-[400px] border flex flex-wrap justify-center content-center flex-col  rounded-lg border-gray-300">
          <h1 className="self-center">Follow IMDB on Social</h1>
          <div className="flex justify-evenly">
            {arr.map((login , index) => {
              return (
                <div key={index} className="size-12 flex justify-center content-center flex-wrap rounded-[50%] bg-black cursor-pointer hover:bg-imgHover transition duration-700">
                  <img src="/images/Facebook-logo.png" className="size-6" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex border flex-wrap justify-around content-center w-[400px] h-28 rounded-lg border-gray-300">
          <div>
            <h1>Follow IMDb App</h1>
            <h2 className="text-gray-400">For Android and IOS</h2>
          </div>
          <div>
            <img src="/images/licensed-image.jpg" className="size-16 cursor-pointer" alt="Qr Reader" />
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4 mt-3 flex-wrap justify-center content-center w-full">
        <div className="flex justify-center gap-12">
          <a>Help</a>
          <a>Site Index</a>
          <a>IMDbPro</a>
          <a>Box Office Mojo</a>
          <a>Liscense IMDb Data</a>
        </div>
        <div className="flex justify-center gap-12">
          <a>Press Room</a>
          <a>Advertising</a>
          <a>Jobs</a>
          <a>Conditions of Use</a>
          <a>Privacy Policy</a>
          <a>Your Ads privacy Choices</a>
        </div>
      </section>
      <div>
        Hello
      </div>
    </footer>
  );
}

export default Footer;
