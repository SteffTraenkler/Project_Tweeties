import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../../api/api";
import Post from "../../Components/Post";
import {
  CommentInteraction,
  LikeInteraction,
  RetweetInteraction,
  ShareInteraction,
} from "../../Components/PostInteraction";
import birdLogo from "../../assets/img/Birdie.png";

export default function PostDetail(props) {
  const { postId } = useParams();
  const [post, setPost] = useState();

  const [interactionChange, setInteractionChange] = useState(false);

  const [error, setError] = useState("");

  console.log("beforeUseeffect");

  useEffect(() => {
    fetch(apiBaseUrl + "/api/posts/" + postId, {
      headers: {
        token: "JWT " + props.token,
      },
    })
      .then((resp) => resp.json())
      .then((postResult) => {
        if (postResult.err) {
          console.log("Error", postResult.err);
          setError(postResult.err.message);
          return;
        }
        console.log("Post", postResult);
        setPost(postResult);
      });
  }, [props.token, postId, interactionChange]);

  console.log(post);
  return (
    <div>
      {error ? (
        <h1 className="errorMsg">{error}</h1>
      ) : post ? (
        <div className="postDetailDiv">
          <Post post={post} token={props.token} />
          {post.likes || post.retweets || post.quotedTweets ? (
            <div className="countPostInteraktionsDiv">
              {/* onclick on the p tags with each a function!! */}
              {post.retweets.length > 0 ? (
                <p>{post.retweets.length} Retweets</p>
              ) : null}
              {post.quotedTweets > 0 ? (
                <p> {post.retweets.length} Zitierte Tweets</p>
              ) : null}
              {post.likes.length > 0 ? <p>{post.likes.length} Likes</p> : null}
            </div>
          ) : (
            ""
          )}
          <hr />
          <div className="iconInteractionBarDiv">
            <CommentInteraction
              post={post}
              token={props.token}
              setInteractionChange={setInteractionChange}
              interactionChange={interactionChange}
            />
            <RetweetInteraction
              post={post}
              token={props.token}
              setInteractionChange={setInteractionChange}
              interactionChange={interactionChange}
            />
            <LikeInteraction
              post={post}
              token={props.token}
              setInteractionChange={setInteractionChange}
              interactionChange={interactionChange}
            />
            <ShareInteraction
              post={post}
              token={props.token}
              setInteractionChange={setInteractionChange}
              interactionChange={interactionChange}
            />
          </div>
        </div>
      ) : (
        <div className="pagePicLoader">
          {" "}
          <img
            className="twitterLoadingPic"
            src={birdLogo}
            alt="birdLogo"
          />{" "}
        </div>
      )}
    </div>
  );
}
