import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteTweetIcon from "./../assets/icons/tweeties/DeleteTweetIcon.png"

export default function Post(props) {
  const [postActive, setPostActive] = useState(false)

  function togglePostMore(e) {
    postActive ?
      setPostActive(false)
      : setPostActive(true)
  }


  return (
    <div className="post">
      <div className="userPic">
        <Link to={"/secure/home/user/" + props.post.postedBy.username}>
          <div className="borderAvatar">
            <img src={props.post.postedBy.profilePicture} alt={"Avatar of" + props.post.postedBy.username} />
          </div>
        </Link>
      </div>

      <div className="postToggleDeleteFollow" onClick={togglePostMore}>
        <img src={DeleteTweetIcon} alt="Post Show more" />
      </div>
      {
        postActive &&
        < div >
          <p>TestDiv</p>
          <h1>next DIV</h1>
        </div>
      }

      <div className="postBody">
        <div className="postHeader">
          <Link className="flexBox" to={"/secure/home/user/" + props.post.postedBy.username}>
            <h3>{props.post.postedBy.username}</h3>
            <p>{props.post.postedBy.uniqueUsername}</p>
          </Link>
          <p>{new Date(props.post.postedAt).toLocaleDateString()}</p>
        </div>
        <div className="PostDiv">
          <p>{props.post.postText ? props.post.postText : ""}</p>

          {props.post.picture ? (
            <div className="box">
              <img
                src={props.post.picture}
                alt={"Image Post by User " + props.post.postedBy.username}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* <div className='iconInteractionBarDiv'>
                <div><img src={CommentIcon} alt="Link to comment this tweet" /></div>
                <div><img src={RetweetIcon} alt="Link to Retweet this Tweet" /></div>
                <div><img src={LikeIcon} alt="Link to like thi post / Tweet" /></div>
                <div><img src={ShareIcon} alt="Link to share this post / Tweet" /></div>
            </div> */}
    </div >
  );
}
