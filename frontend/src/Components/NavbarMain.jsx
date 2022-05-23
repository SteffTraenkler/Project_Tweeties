import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StrokeIcon from "../assets/img/StrokeIcon.png";
import Birdie from "../assets/img/Birdie.png";
import "../styles/navbarMain.css";
import "../styles/Sidebar.css";
import { SidebarData } from "./SlidebarData";

export const NavbarMain = (props) => {

  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  const profileInfo = props.profileInfo;

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
              <div className="profilePicNav" onClick={showSidebar}>
                <img src={profileInfo.profilePicture} alt={`Profilbild von User ${profileInfo.username}`} />
              </div>
            </Link>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <p>X</p>
              </li>
              <div className="profileInfoFlex">
                <Link to="#" className="menu-bars">

                  <Link className="profileInfo" to={"/secure/home/user/" + profileInfo.username}>
                    <div className="firstFlex">
                      <div className="profilePicSide">
                        <img src={profileInfo.profilePicture} alt={`Profilbild von User ${profileInfo.username}`} />
                      </div>
                      <h1>{profileInfo.username}</h1>
                      <p>@{profileInfo.uniqueUsername}</p>
                    </div>
                  </Link>

                  <div className="secoundFlex">
                    <Link to={"/secure/home/users/following/" + profileInfo._id}>
                      <p className="followingCountfollowingCount">{profileInfo.following.length}</p>
                      <p className="followingCount">Following</p>
                    </Link>
                    <Link to={"/secure/home/users/follower/" + profileInfo._id}>
                      <p className="followingCountfollowingCount">{profileInfo.follower.length}</p>
                      <p className="followingCount">Follower</p>
                    </Link>
                  </div>
                </Link>
              </div>
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
        </div>
        )
      }
    </>
  );
};