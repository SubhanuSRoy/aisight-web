import React from "react";
import { Link } from "react-router-dom";
import pic from "../images/pic.svg";

function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <img src={pic} className="w-1/4" />

      <div className="text-white text-2xl my-2 mb-8">
        Protect your vision with every scan
      </div>
      <div className="flex w-3/4 justify-around items-center flex-wrap sm:flex-nowrap gap-4">
        <Link
          to="upload"
          className="h-12 sm:w-1/4 bg-purple-200 flex items-center text-base sm:text-xl justify-center gap-4 md:gap-4 p-2 sm:px-4 sm:py-4 rounded-md shadow-xl text-black font-bold"
        >
          Upload Retinal Image{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
            />
          </svg>
        </Link>
        <Link
          to="/capture"
          className="h-12 sm:w-1/4 bg-purple-200 flex items-center text-base sm:text-xl justify-center gap-4 md:gap-4 p-2 sm:px-4 sm:py-4 rounded-md shadow-xl text-black font-bold"
        >
          Capture Retinal Image{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default Home;
