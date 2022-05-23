import { useEffect, useState } from "react";
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
