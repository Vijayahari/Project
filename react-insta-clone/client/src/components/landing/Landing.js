import React from "react";
import { Link } from "react-router-dom";
import home from "../../images/home.png";
const Landing = () => {
  return (
    <div className="home-content flex flex-row justify-center mt-[80px]">
      <div className="landing-img w-[300px]">
        <img src={home} alt="home" />
      </div>
      <div className="landing-content text-center mt-[200px] ml-9">
        <h3 className="mb-4 text-black-600 text-2xl ">10x Team 07</h3>
        <Link to={"postview"} className="bg-violet-600 p-3 text-center rounded-lg text-white hover:bg-black">
          <button>Enter</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
