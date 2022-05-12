import { useState } from "react";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../../api/api";

const LoginForm = (props) => {
  const [username, setUserName] = useState("Shmell");
  const [password, setPassword] = useState("Hallo123");

  const [error, setError] = useState("");
  const loginUser = (event) => {
    event.preventDefault();

    fetch(apiBaseUrl + "api/users/login", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.err) {
          props.loginSuccess(data.token);
          return;
        }

        if (data.err.validationErrors) {
          const firstError = data.err.validationErrors[0];
          setError(firstError.msg + ": " + firstError.param);
          return;
        }

        setError(data.err.message);
      });
  };

  return (
    <div>
      <form>
        <div>
          <input
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            type="email"
            className=""
            id="floatingInput"
            placeholder="name@example.com"
            autoComplete="off"
          />
          <label htmlFor="floatingInput">Username or Email</label>
        </div>
        <div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className=""
            id="floatingPassword"
            placeholder="Password"
            autoComplete="off"
          />
          <label htmlFor="floatingInput">Username or Email</label>
        </div>
        <button onClick={loginUser} className="" type="submit">
          Anmelden
        </button>
        {error && <p className="text-danger">{error}</p>}
      </form>
      <small>
        <Link to="/passwort/reset" className="">
          Password lost?
        </Link>
      </small>
    </div>
  );
};
export default LoginForm;
