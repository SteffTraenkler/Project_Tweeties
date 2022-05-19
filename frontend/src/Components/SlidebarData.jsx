import ProfileIcon from "../assets/icons/menuProfil/ProfileStrokeIcon.png"
import ListsIcon from "../assets/icons/menuProfil/ListsIcon.png"
import TopicIcon from "../assets/icons/menuProfil/TopicsStrokeIcon.png"
import BookmarkIcon from "../assets/icons/menuProfil/BookmarksIcon.png"
import MomentsIcon from "../assets/icons/menuProfil/MomentsIcon.png"
import LogoutIcon from "../assets/icons/menuProfil/LogoutIconTwitter.png"
import "../styles/Sidebar.css"

export const SidebarData = [
  {
    title: "Profile",
    path: "/profile",
    icon: <img src={ProfileIcon} alt="" />,
    cName: "nav-text"
  },
  {
    title: "Lists",
    path: "/list",
    icon: <img src={ListsIcon} alt="" />,
    cName: "nav-text"
  },
  {
    title: "Topics",
    path: "/topics",
    icon: <img src={TopicIcon} alt="" />,
    cName: "nav-text"
  },
  {
    title: "Bookmarks",
    path: "/bookmark",
    icon: <img src={BookmarkIcon} alt="" />,
    cName: "nav-text"
  },
  {
    title: "Moments",
    path: "/moments",
    icon: <img src={MomentsIcon} alt="" />,
    cName: "nav-text"
  },
  {
    title: "Logout",
    path: "/",
    icon: <img className="logoutIcon" src={LogoutIcon} alt="" />,
    cName: "nav-text"
  },
]