import React from "react";
import { footerLogos } from "../variables/loginMethods";

function Footer() {
  return (
    <footer className="bg-black flex flex-col justify-center py-4 w-full h-fit mt-10">
      <section className="flex flex-wrap justify-center gap-2 w-full">
        <div className="h-28 rounded-lg lg:border md:border-gray-300 flex flex-col justify-center items-center w-[100%] md:w-[25%]">
          <h1 className="text-white hidden">Follow IMDb on Social</h1>
          <div className="flex justify-evenly w-full gap-2">
            {footerLogos.map((icon, index) => (
              <a
                target="_blank"
                href={icon.url}
                key={index}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-black cursor-pointer hover:bg-imgHover transition duration-700"
              >
                <img
                  src={icon.src}
                  className="w-6 h-6"
                  alt={`Social icon ${index + 1}`}
                />
              </a>
            ))}
          </div>
        </div>

        <div className="h-28 border w-[25%] rounded-lg border-gray-300 md:flex md:visible justify-around items-center hidden">
          <div>
            <h1 className="text-white">Follow IMDb App</h1>
            <h2 className="text-gray-400">For Android and iOS</h2>
          </div>
          <div>
            <img
              src="/images/licensed-image.jpg"
              className="w-16 h-16 cursor-pointer"
              alt="QR Code for IMDb App"
            />
          </div>
        </div>
      </section>

      <section className="flex justify-center gap-4 mt-3 w-full items-center">
        <div className="grid-cols-1 md:grid-cols-3 max-w-[500px] grid justify-center items-center gap-2 text-white">
          <a href="#">Help</a>
          <a href="#">Site Index</a>
          <a href="#">IMDbPro</a>
          <a href="#">Box Office Mojo</a>
          <a href="#">License IMDb Data</a>
        </div>
        <div className="grid-cols-1 md:grid-cols-3 max-w-[500px] grid justify-center items-center gap-2 text-white">
          <a href="#">Press Room</a>
          <a href="#">Advertising</a>
          <a href="#">Jobs</a>
          <a href="#">Conditions of Use</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Your Ads Privacy Choices</a>
        </div>
      </section>

      <div className="flex flex-col justify-center items-center mt-4 gap-4">
        <div className="text-white">An Amazon Company</div>
        <div className="text-white">© 1990-2024 by IMDb.com, Inc</div>
      </div>
    </footer>
  );
}

export default Footer;
