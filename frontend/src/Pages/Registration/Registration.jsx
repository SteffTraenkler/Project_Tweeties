import { Link } from "react-router-dom";
import { NavbarLogin } from "../../Components/NavbarLogin";
import { RegisterForm } from "./RegisterForm";

export const Registration = () => {
  return (
    <div>
      <NavbarLogin className="show" />
      <h1>Create your account</h1>
      <RegisterForm />
      <Link to="/">
        <button className="" type="btn">
          Sign Up
        </button>
      </Link>
    </div>
  );
};
