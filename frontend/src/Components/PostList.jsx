import { Link } from "react-router-dom";
import Post from "./Post";
import {
    CommentInteraction,
    LikeInteraction,
    RetweetInteraction,
    ShareInteraction,
} from "./PostInteraction";
import "../styles/postInteraction.css";
import PostDeleteToggle from "./PostDeleteToggle";

export default function PostList(props) {

    return (
        <div className="postFeedListDiv">
            {props.posts.map((post, key) => {
                return (
                    <div key={key}>

                        <PostDeleteToggle post={post} token={props.token} interactionChange={props.interactionChange} setInteractionChange={props.setInteractionChange}
                            profileInfo={props.profileInfo}
                        />


                        <Link to={"/secure/home/post/" + post._id} >
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
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}
