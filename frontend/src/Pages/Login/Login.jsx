// import "../App.css";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

// import Birdie from "../../assets/img/Birdie.png";
import "../../styles/navbarLogin.css";
import { NavbarLogin } from "../../Components/NavbarLogin";
import Loader from "../../Components/Loader";
import { useEffect, useState } from "react";
import "../../styles/loginForm.css";


function Login(props) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div>

      {/* <Link to={"/"}>
        <div className="birdieLogin">
          <img src={Birdie} alt="" />
        </div>
      </Link> */}

      {loading ? (
        <Loader />
      ) : (
        <div>
          <NavbarLogin />
          <h1 className="introText">Finde heraus, was gerade in der Welt los ist.</h1>
          <LoginForm loginSuccess={props.loginSuccess} />
          <div className="registerMiddle">
            <Link to={"/signup"}>
              <button className="register">
                Du hast kein Konto? Regestieren!
              </button>
            </Link>
          </div>
          <div className="terms">
            <small>
              By singing up, you agree to our{" "}
              <a className="blueTerms" href="#">
                Terms,{" "}
              </a>
              <a className="blueTerms" href="#">
                Privacy,{" "}
              </a>
              <a className="blueTerms" href="#">
                Policy{" "}
              </a>{" "}
              and{" "}
              <a className="blueTerms" href="#">
                Cookie Use.
              </a>
            </small>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
