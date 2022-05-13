import React from "react";
import {
  Audio,
  Bars,
  Hearts,
  Puff,
  Rings,
  TailSpin,
} from "react-loader-spinner";
import birdLogo from "../assets/img/Birdie.png";
import "../App.css";

const Loader = () => {
  return (
    <div className="twitterLoading fade-out">
      <TailSpin height="300" width="300" color="blue" ariaLabel="Loading" />
      <img className="twitterLoadingPic" src={birdLogo} alt="picture" />
    </div>
  );
};

export default Loader;
