const { useState, useEffect } = require("react");
const { useParams, Link } = require("react-router-dom");
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

  return (
    <div token={props.token}>
      {error ? (
        <h2>{error}</h2>
      ) : user ? (
        <div>
          <div>
            <img src={user.profilePicture} alt={"Avatar of " + user.username} />
          </div>

          <div>
            <div>
              <h1>{user.username}</h1>
              <h2>@{user.uniqueUsername}</h2>
              <button>Profile Bearbeiten</button>
            </div>
            <h3>{user.posts.length} Posts</h3>
            <h3>{user.email}</h3>
          </div>
          <hr />

          <div>
            {user.posts.map((post, index) => (
              <Link to={"/post/" + post._id} key={index}>
                <img
                  src={post.picture}
                  alt={"Post " + index + " of " + user.username}
                />
                <p>{user.postText}</p>
              </Link>
            ))}
          </div>
          <Link to={"/home"}>Back to Home</Link>
        </div>
      ) : (
        <h2>Loading ...</h2>
      )}
    </div>
  );
};
export default Profile;
