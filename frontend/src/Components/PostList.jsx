import { Link } from "react-router-dom";
import Post from "./Post";
import {
    CommentInteraction,
    LikeInteraction,
    RetweetInteraction,
    ShareInteraction,
} from "./PostInteraction";
import "../styles/postInteraction.css";

export default function PostList(props) {
    console.log(props.posts);

    return (
        <div className="postFeedListDiv">
            {props.posts.map((post, key) => {
                return (
                    // <Link to={"/secure/home/post/" + post._id} key={key}>
                    <div className="postFeedPostCard">
                        <Post post={post} token={props.token} />
                        <div className="iconInteractionBarDiv">
                            <CommentInteraction
                                post={post}
                                token={props.token}
                                setInteractionChange={props.setInteractionChange}
                                interactionChange={props.interactionChange}
                            />{" "}
                            <p>{post.comments.length}</p>
                            <RetweetInteraction
                                post={post}
                                token={props.token}
                                setInteractionChange={props.setInteractionChange}
                                interactionChange={props.interactionChange}
                            />{" "}
                            <p className={post.rtByUser ? "activated" : "deactivated"}>{post.retweets.length}</p>
                            <LikeInteraction
                                post={post}
                                token={props.token}
                                setInteractionChange={props.setInteractionChange}
                                interactionChange={props.interactionChange}
                            />{" "}
                            <p className={post.likedByUser ? "liked" : "dislike"}>
                                {post.likes.length}
                            </p>
                            <ShareInteraction post={post} token={props.token} />
                        </div>
                    </div>
                    // </Link>
                );
            })}
        </div>
    );
}
