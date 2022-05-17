import { Link } from "react-router-dom";
// import { CommentIcon } from '../assets/img/CommentIcon.png'
// import { RetweetIcon } from '../assets/img/RetweetIcon.png'
// import { LikeIcon } from '../assets/img/LikeIcon.png'
// import { ShareIcon } from '../assets/img/SahreIcon.png'
import birdie from "../assets/img/Birdie.png";

export default function Post(props) {
  return (
    <div className="post">
      <div className="userPic">
        <Link to={"/user/" + props.post.postedBy.username}>
          <div className="borderAvatar">
            <img
              // src={props.post.postedBy.profilePicture} // richtige Route!
              src={birdie} // Nur zum stlyen
              // alt={"Avatar of " + props.post.postedBy.username}
            />
          </div>
        </Link>
      </div>
      <div className="postBody">
        <div className="postHeader">
          <Link to={"/user/" + props.post.postedBy.username}>
            <h3>{props.post.postedBy.username}</h3>
            <p>{props.post.postedBy.uniqueUsername}</p>
          </Link>
          <p>postedAt: 14:00</p>
        </div>
        <div className="PostDiv">
          <p>{props.post.postText ? props.post.postText : ""}</p>

          {props.post.picture ? (
            <div className="box imgBox">
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
      <hr />
      {/* <div className='iconInteractionBarDiv'>
                <div><img src={CommentIcon} alt="Link to comment this tweet" /></div>
                <div><img src={RetweetIcon} alt="Link to Retweet this Tweet" /></div>
                <div><img src={LikeIcon} alt="Link to like thi post / Tweet" /></div>
                <div><img src={ShareIcon} alt="Link to share this post / Tweet" /></div>
            </div> */}
    </div>
  );
}
