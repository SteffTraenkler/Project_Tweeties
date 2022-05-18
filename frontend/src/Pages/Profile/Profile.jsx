import PostList from "../../Components/PostList";

const { useState, useEffect } = require("react");
const { useParams, Link } = require("react-router-dom");
const { apiBaseUrl } = require("../../api/api");

const Profile = (props) => {
  const { userId } = useParams();

  const [user, setUser] = useState();
  const [error, setError] = useState("");

  const [interactionChange, setInteractionChange] = useState(false);


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
  }, [userId, props.token, interactionChange]);

  console.log("user", user);

  let rt = (postId) => {
    if (user.posts.retweets.includes(user._id)) {
      console.log("user_id ist " + user._id + " and user includes in retweets this id?: " + user.posts.retweets.includes(user._id))
      let retweeted = `${user.username} retweeetete`
      return retweeted
    } else { console.log("userid not found in rts?"); }
  }
  //rt not yet implemented -> muss mir dazu noch eine genaue Lösung einfallen lassen. Evtl ein Abbild basierend auf der PostId erstellen? Da mehrere User retweeten können und der Tweet dann nochmals erscheint (aber alle Retweets gelöscht werden, wenn das Original gelöscht wird.)



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
          <PostList
            posts={user.posts}
            token={props.token}
            setInteractionChange={setInteractionChange}
            interactionChange={interactionChange}
          />
          {/* <div>
            {user.posts.map((post, index) => (
              
              <Link to={"/post/" + post._id} key={index}>
                <img
                  src={post.picture}
                  alt={"Post " + index + " of " + user.username}
                />
                <span>{new Date(post.postedAt).toLocaleDateString()}</span>
                <p>{post.postText}</p>
              </Link>
            ))}
          </div> */}

          <Link to={"/secure/home"}>Back to Home</Link>
        </div>
      ) : (
        <h2>Loading ...</h2>
      )}
    </div>
  );
};
export default Profile;
