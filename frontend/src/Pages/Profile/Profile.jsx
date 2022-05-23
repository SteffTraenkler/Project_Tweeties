import PostList from "../../Components/PostList";
import { useProfileInfo } from "../../hooks/useProfileInfo";
import "../../styles/userDetail.css"

const { useState, useEffect } = require("react");
const { useParams, Link } = require("react-router-dom");
const { apiBaseUrl } = require("../../api/api");

const Profile = (props) => {
  const { userId } = useParams();

  const [user, setUser] = useState();
  const [error, setError] = useState("");

  const [interactionChange, setInteractionChange] = useState(false);

  const profileInfo = useProfileInfo(props.token)

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
  let userID = user ? user._id : "user not yet fetched"
  let profileInfoID = profileInfo === null ? "ProfileInfo not fetched" : profileInfo._id

  console.log("userID", userID);
  console.log("ProfileInfoID", profileInfoID);

  //USer
  const followUser = (event) => {
    event.preventDefault()

    fetch(apiBaseUrl + "/api/users/follow/" + user._id, {
      method: "POST",
      headers: {
        token: "JWT " + props.token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        interactionChange
          ? setInteractionChange(false)
          : setInteractionChange(true)
      })
  }

  return (
    <div token={props.token}>
      {error ? (
        <h2>{error}</h2>
      ) : user ? (
        <div>
          <div className="profilePic">
            <img src={user.profilePicture} alt={"Avatar of " + user.username} />
            <div>
              {profileInfoID === userID ?
                <div className="buttonProfileEdit">
                  <Link to={"/secure/home/user/editProfile/" + userId}><p>Profil bearbeiten</p></Link>
                </div>
                : (user.youFollow ?
                  <div className="buttonUnfollow" onClick={followUser}>
                    <p>Entfolgen</p>
                  </div>
                  : <div className="buttonFollow" onClick={followUser}>
                    <p>Folgen</p>
                  </div>
                )
              }
            </div>
          </div>

          <div>
            <div className="userInfo">
              <h1>{user.username}</h1>
              <h2>{user.uniqueUsername}</h2>
              <p>{profileInfoID === userID ?
                ""
                : (
                  user.yourFollower ?
                    "Folgt dir"
                    : ""
                )
              }</p>
              <p>{user.biography}</p>
            </div>

          </div>



          <div className="follower">
            <h3>{user.posts.length} Posts</h3>
            <h3>{user.email}</h3>
            <Link to={"/secure/home/users/following/" + user._id}>
              <div className="littleFlex">
                <p>{user.following.length}</p>
                <p>Folge ich</p>
              </div>
            </Link>
            <Link to={"/secure/home/users/follower/" + user._id}>
              <div className="littleFlex">
                <p>{user.follower.length}</p>
                <p>Follower</p>
              </div>
            </Link>
          </div>
          <div className="blueBorder"></div>
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
        </div>
      ) : (
        <h2>Loading ...</h2>
      )}
    </div>
  );
};
export default Profile;
