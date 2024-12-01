import React from "react";
import { footerLogos } from "../variables/loginMethods";

function Footer() {
  return (
    <footer className="bg-black flex flex-col justify-center py-4 w-full h-[368px]">
      <section className="flex flex-wrap justify-center gap-2">
        <div className="h-28 w-[400px] border rounded-lg border-gray-300 flex flex-col justify-center items-center">
          <h1 className="text-white">Follow IMDb on Social</h1>
          <div className="flex justify-evenly w-full">
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

        <div className="w-[400px] h-28 border rounded-lg border-gray-300 flex justify-around items-center">
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

      <section className="flex flex-col gap-4 mt-3 w-full">
        <div className="flex justify-center gap-12 text-white">
          <a href="#">Help</a>
          <a href="#">Site Index</a>
          <a href="#">IMDbPro</a>
          <a href="#">Box Office Mojo</a>
          <a href="#">License IMDb Data</a>
        </div>
        <div className="flex justify-center gap-12 text-white">
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
