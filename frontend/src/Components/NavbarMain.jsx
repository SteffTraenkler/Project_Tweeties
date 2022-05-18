import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Birdie from "../assets/img/Birdie.png";
import "../styles/navbarMain.css";
import { SidebarData } from "./SlidebarData";

export const NavbarMain = () => {
  // let navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  return (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <button onClick={showSidebar}>Avatar</button>
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <h2>x</h2>
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="birdieMain">
        <Link className="birdMain" to={"/home"}>
          <img src={Birdie} alt="" />
        </Link>
      </div>
    </>
  );
};