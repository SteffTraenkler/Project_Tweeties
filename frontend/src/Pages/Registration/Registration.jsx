import { Link } from "react-router-dom";
import { NavbarLogin } from "../../Components/NavbarLogin";
import { RegisterForm } from "./RegisterForm";
import "../../styles/loginForm.css";

export const Registration = () => {
  return (
    <div>
      <NavbarLogin className="show" />
      <h1 className="introText">Create your account</h1>
      <RegisterForm />
      <p className="smallTxt">Allready have an Account?</p>
      <div className="signUp">
        <Link to="/">
          <button className="" type="button">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};
