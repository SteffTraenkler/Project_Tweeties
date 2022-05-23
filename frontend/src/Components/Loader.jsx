import React from "react";
import { Triangle } from "react-loader-spinner";
import birdLogo from "../assets/img/Birdie.png";
import "../App.css";

const Loader = () => {
  return (
    <div className="twitterLoading fade-out">
      <Triangle height="300" width="300" color="#fff" ariaLabel="Loading" />
      <img className="twitterLoadingPic" src={birdLogo} alt="picturePic" />
    </div>
  );
};

export default Loader;
