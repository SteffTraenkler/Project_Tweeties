import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
import { apiBaseUrl } from "../api/api";

const AuthRequired = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.token) {
      setLoading(false);
      return;
    }

    fetch(apiBaseUrl + "/api/users/refreshtoken", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        if (data.token) {
          props.setToken(data.token);
        }
      });
  }, [props]);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Noch keine Navigation!!!
  // if(!props.token) {
  //     return <Navigate to="/" />
  // }

  return <>{props.children}</>;
};
export default AuthRequired;
