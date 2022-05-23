import CommentIcon from "../assets/icons/tweeties/CommentIcon.png";
import RetweetIcon from "../assets/icons/tweeties/RetweetIcon.png";
import LikeIcon from "../assets/icons/tweeties/LikeIcon.png";
import ShareIcon from "../assets/icons/tweeties/ShareIcon.png";
import { apiBaseUrl } from "../api/api";
import "../styles/postInteraction.css";

const LikeInteraction = (props) => {

  const likePost = (event) => {
    event.preventDefault();

    fetch(apiBaseUrl + "/api/posts/like/" + props.post._id, {
      method: "POST",
      headers: {
        token: "JWT " + props.token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        props.interactionChange
          ? props.setInteractionChange(false)
          : props.setInteractionChange(true);
      });
  };

  return (
    <div
      onClick={likePost}
      className={props.post.likedByUser ? "heart-liked" : "heart-dislike"}
    >
      <img src={LikeIcon} alt="Link to like thi post / Tweet" />
    </div>
  );
};

const CommentInteraction = (props) => {
  return (
    <div >
      <img src={CommentIcon} alt="Link to comment this tweet" />
    </div>
  );
};

const RetweetInteraction = (props) => {
  const retweetPost = (event) => {
    event.preventDefault()

    fetch(apiBaseUrl + "/api/posts/retweet/" + props.post._id, {
      method: "POST",
      headers: {
        token: "JWT " + props.token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        props.interactionChange
          ? props.setInteractionChange(false)
          : props.setInteractionChange(true)
      })
  }
  return (
    <div onClick={retweetPost}
    // className={props.post.rtByUser ? "retweet-activated" : "retweet-deactivated"}
    >
      <img className={props.post.rtByUser ? "retweet-activated" : "retweet-deactivated"} src={RetweetIcon} alt="Link to Retweet this Tweet" />
    </div>
  );
};

const ShareInteraction = (props) => {
  <div>
    <img src={ShareIcon} alt="Link to share this post / Tweet" />
  </div>;
};

export {
  LikeInteraction,
  CommentInteraction,
  RetweetInteraction,
  ShareInteraction,
};
