import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../api/api";
import "../../styles/loginForm.css";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [biography, setBiography] = useState("");
  const [uniqueUsername, setUniqueUsername] = useState("")

  const [validError, setValidError] = useState(false)

  const [error, setError] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    if (uniqueUsername === "") {
      setValidError({ error: false, msg: "emty Field" })
    } else if (uniqueUsername.includes("@")) {
      setValidError({ error: false, msg: "includes @ Tag" })
    } else {
      setValidError({ error: true, msg: "missing @ Tag" })
    }
  }, [uniqueUsername])



  const doRegistration = (event) => {
    event.preventDefault();
    if (!validError.error) {
      fetch(apiBaseUrl + "/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullname, username, password, biography, uniqueUsername }),
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
  }




  // if (!valid) {
  //   if (uniqueUsername.value && uniqueUsername.value.contains('@'))
  //     setValid(true)
  //   return
  // }

  // if (uniqueUsername.length === 0) {
  //   console.log("Not a @")
  // } else if (uniqueUsername.length > 0) {
  //   console.log("else if function");

  //   if (uniqueUsername && uniqueUsername.includes("@")) {
  //     setValidError("Must start with a @")

  //     console.log("Include @");
  //   }
  // } else {
  //   console.log("niqueUsername");

  // }

  // if (uniqueUsername && uniqueUsername.includes("@")) {
  //   setValidError(false)
  // }


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
        <div>
          <h2>Tell us about yourself *</h2>
          <input
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            type="text"
            className=""
            id="floatingInput"
            placeholder="Your Biograhpy"
          />
        </div>
        <div>
          <h2>How do you like to be called? *</h2>
          <input
            value={uniqueUsername}
            onChange={(e) => setUniqueUsername(e.target.value)}
            type="email"
            className=""
            id="floatingInput"
            placeholder="@FredFuchs"
          />
          <h2>{validError.msg}</h2>
        </div>
        <button onClick={doRegistration} className="" type="submit">
          Weiter
        </button>
        <h5>*Optional not required</h5>
        {error && <p className="">{error}</p>}
      </form>
    </div>
  );
};
