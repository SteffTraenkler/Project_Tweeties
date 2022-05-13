// import "../App.css";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
// import Birdie from "../../assets/img/Birdie.png";
import "../../styles/navbarLogin.css";
import { NavbarLogin } from "../../Components/NavbarLogin";

function Login(props) {
  return (
    <div>
      {/* <Link to={"/"}>
        <div className="birdieLogin">
          <img src={Birdie} alt="" />
        </div>
      </Link> */}
      <NavbarLogin />
      <h1>Finde heraus, was gerade in der Welt los ist.</h1>
      <LoginForm loginSuccess={props.loginSuccess} />
      <small>
        By singing up, you agree to our <a href="#">Terms, </a>
        <a href="#">Privacy, </a>
        <a href="#">Policy </a> and <a href="#">Cookie Use.</a>
      </small>
      <Link to={"/signup"}>
        <button className="">Du hast kein Konto? Regestieren!</button>
      </Link>
    </div>
  );
}

export default Login;
