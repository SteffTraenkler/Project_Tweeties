// import "../App.css";
import { apiBaseUrl } from "../../api/api";
import { useEffect, useState } from "react";

export const Home = (props) => {
  const [posts, setPosts] = useState([]);

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
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Ich bin Home!"</h1>
    </div>
  );
};
