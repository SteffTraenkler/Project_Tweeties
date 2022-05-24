import { useState } from "react";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../../api/api";
import "../../styles/loginForm.css";

const LoginForm = (props) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const loginUser = (event) => {
    event.preventDefault();

    fetch(apiBaseUrl + "/api/users/login", {
      method: "POST",
      mode: 'cors',
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
            placeholder="Username or Email"
            autoComplete="off"
          />
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
        </div>
        <button onClick={loginUser} className="" type="submit">
          Anmelden
        </button>
        {error && <p className="text-danger">{error}</p>}
      </form>
      <div className="pwLost">
        <small>
          <Link to="/passwort/reset">Password lost?</Link>
        </small>
      </div>
    </div>
  );
};
export default LoginForm;
