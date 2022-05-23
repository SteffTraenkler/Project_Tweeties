import "../styles/navbarBottom.css"
import HomeIcon from "../assets/icons/navbar/HomeStrokeIcon.png"
import SearchIcon from "../assets/icons/navbar/SearchStrokeIcon.png"
import BellIcon from "../assets/icons/navbar/BellStrokeIcon.png"
import MailIcon from "../assets/icons/navbar/MailStrokeIcon.png"
import { Link } from "react-router-dom"

export const NavbarBottom = () => {
  return (
    <>
      <div className="puffer">
        <div className="flex">
          <Link to={"/secure/Home"} >
            <img src={HomeIcon} alt="" />
          </Link>
          <Link to={"/secure/home/user/searchUsers"}>
            <img src={SearchIcon} alt="" />
          </Link>

          <img src={BellIcon} alt="" />
          <img src={MailIcon} alt="" />
        </div>
      </div>
    </>
  )
}