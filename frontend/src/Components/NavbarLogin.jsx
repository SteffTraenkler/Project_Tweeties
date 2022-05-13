import { Link, useNavigate } from "react-router-dom";
import ArrowBack from "../assets/icons/Arrow1.png";
import Birdie from "../assets/img/Birdie.png";
import "../styles/navbarLogin.css";

export const NavbarLogin = () => {
  let navigate = useNavigate();
  return (
    <>
      <div className="birdie">
        <a className="backBtn" onClick={() => navigate(-1)}>
          <img src={ArrowBack} />
        </a>
        <Link className="bird" to={"/"}>
          <img src={Birdie} alt="" />
        </Link>
      </div>
    </>
  );
};
