import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../api/api";
import "../../styles/loginForm.css";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  let navigate = useNavigate();

  const doRegistration = (event) => {
    event.preventDefault();

    fetch(apiBaseUrl + "/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, fullname, username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.err) {
          navigate("/verify-email");
          return;
        }

        if (data.err.validationErrors) {
          const firstError = data.err.validationErrors[0]
          setError(firstError.msg + ": " + firstError.param)
          return
        }

        setError(data.err.message);
      });
  };

  return (
    <div>
      <form>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className=""
            id="floatingInput"
            placeholder="name@example.com"
            autoComplete="off"
          />
        </div>
        <div>
          <input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            type="text"
            className=""
            id="floatingInput"
            placeholder="Your Full Name"
            autoComplete="off"
          />
        </div>
        <div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className=""
            id="floatingInput"
            placeholder="Your Username"
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
            placeholder="Your Password"
            autoComplete="off"
          />
        </div>
        <button onClick={doRegistration} className="" type="submit">
          Weiter
        </button>
        {error && <p className="">{error}</p>}
      </form>
    </div>
  );
};
