import { Link, useNavigate } from "react-router-dom";
import Birdie from "../assets/img/Birdie.png";
import "../styles/navbarMain.css";

export const NavbarMain = () => {
  let navigate = useNavigate();

  return (
    <>
      <div className="birdieMain">
        <Link className="birdMain" to={"/home"}>
          <img src={Birdie} alt="" />
        </Link>
      </div>
    </>
  );
};