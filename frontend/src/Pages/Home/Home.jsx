// import "../App.css";
import { apiBaseUrl } from "../../api/api";
import { useEffect, useState } from "react";
import PostList from "../../Components/PostList";
import { useNavigate } from "react-router-dom";
import postTweet from "../../assets/icons/tweet&mess/Add text icon.png";
import "../../styles/home.css";

export const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)

  const [interactionChange, setInteractionChange] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    fetch(apiBaseUrl + "/api/posts/feed", {
      headers: {
        token: "JWT " + props.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.err) {
          alert("Error loading posts: " + data.err);
        } else {
          setPosts(data);
        }
        setLoading(false)
      });
  }, [interactionChange]);

  const createNewTweet = () => navigate("/addPost");

  return (
    <div>
      <article className="newPost">
        {loading ? (
          <h1>Loading....</h1>
        )
          : (
            posts.length === 0 ? (
              <h2 className="noPost">
                Sorry 😧, your feed is currently empty... Add your first post!
              </h2>
            ) : (
              <PostList posts={posts} token={props.token} setInteractionChange={setInteractionChange} interactionChange={interactionChange}
                profileInfo={props.profileInfo}
              />
            )
          )}
      </article>
      <div className="posRela">
        <div
          className="addTweet-btn"
          onClick={createNewTweet}
          style={{
            backgroundImage: `url(${postTweet})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {/* <img className="addTweet" src={postTweet} alt="" /> */}
        </div>
      </div>
    </div>

  );
};

export default Home;
