import { Link } from "react-router-dom";

export default function Post(props) {

  return (
    <div className="post">
      <div className="userPic">
        <Link to={"/secure/home/user/" + props.post.postedBy.username}>
          <div className="borderAvatar">
            <img src={props.post.postedBy.profilePicture} alt={"Avatar of" + props.post.postedBy.username} />
          </div>
        </Link>
      </div>
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
    </div >
  );
}
