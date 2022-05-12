import { Link } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";

export const Registration = () => {
  return (
    <div>
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
