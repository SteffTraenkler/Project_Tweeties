// import "../App.css";
import { apiBaseUrl } from "../../api/api";
import { useEffect, useState } from "react";
import PostList from "../../Components/PostList";
import { useNavigate } from "react-router-dom";

export const Home = (props) => {
  const [posts, setPosts] = useState([]);

  const [interactionChange, setInteractionChange] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    console.log("useeffect rendert");
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
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactionChange]);

  const createNewTweet = () => navigate("/addPost")

  return (
    <div>
      <h1>Ich bin Home!"</h1>
      {/* <aside>
        <p>
        Modal-Fenster Component
        </p>
      </aside> */}
      <article>
        {/* Post add- Component */}
        {posts.length === 0 ?
          <h2>Sorry, your feed is currently empty... Add your first post!</h2>
          : <PostList posts={posts} token={props.token} setInteractionChange={setInteractionChange} interactionChange={interactionChange} />}

      </article>
      <div className="addTweet-btn" onClick={createNewTweet}>
        <img src="" alt="" />
        <p>add Tweet</p>
      </div>
    </div >
  );
};
