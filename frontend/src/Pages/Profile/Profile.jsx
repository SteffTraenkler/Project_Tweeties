const { useState, useEffect } = require("react");
const { useParams } = require("react-router-dom");
const { apiBaseUrl } = require("../../api/api");

const Profile = (props) => {
  const { userId } = useParams();

  const [user, setUser] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(apiBaseUrl + "/api/users/profile/" + userId, {
      headers: {
        token: "JWT " + props.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.err) {
          setError(data.err.message);
          return;
        }
        console.log(data);
        setUser(data);
      });
  }, [userId, props.token]);

  return <></>;
};
export default Profile;
