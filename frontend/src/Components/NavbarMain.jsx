import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StrokeIcon from "../assets/img/StrokeIcon.png";
import Birdie from "../assets/img/Birdie.png";
import "../styles/navbarMain.css";
import "../styles/Sidebar.css";
import { SidebarData } from "./SlidebarData";
import { useProfileInfo } from "../hooks/useProfileInfo";

export const NavbarMain = (props) => {
  // let navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  const profileInfo = useProfileInfo(props.token);

  console.log("profileInfo", profileInfo);

  // const profileLink = "/secure/home/user/" + profileInfo.username

  return (
    <>
      {(profileInfo === null || profileInfo.length < 2) ? (
        <div>
          <p>Loading...</p>
        </div>)
        :
        (<div className="birdieMain">
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <div onClick={showSidebar}>
                <img src={profileInfo.profilePicture} alt={`Profilbild von User ${profileInfo.username}`} />
              </div>
            </Link>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <div>

                    <Link to={"/secure/home/user/" + profileInfo.username}>
                      <div>
                        <div>
                          <img src={profileInfo.profilePicture} alt={`Profilbild von User ${profileInfo.username}`} />
                        </div>
                        <h1>{profileInfo.username}</h1>
                        <p>@{profileInfo.uniqueUsername}</p>
                      </div>
                    </Link>

                    <div>
                      <Link to="#">
                        <p className="followingCount">{profileInfo.following.length}</p>
                        <p>Following</p>
                      </Link>
                      <Link to="#">
                        <p className="followerCount">{profileInfo.follower.length}</p>
                        <p>Follower</p>
                      </Link>
                    </div>
                  </div>
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

          <Link className="birdMain" to={"/secure/home"}>
            <img src={Birdie} alt="" />
          </Link>
          <img className="strokeIcon" src={StrokeIcon} alt="" />
        </div>)
      }
    </>
  );
};