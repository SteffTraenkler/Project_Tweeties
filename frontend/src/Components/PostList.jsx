import Post from "./Post"
import PostInteraction from "./PostInteraction"

export default function PostList(props) {
    return (
        <div className="postFeedListDiv">
            {props.posts.map(post => {
                return (
                    <div className="postFeedPostCard">
                        <Post post={post} token={props.token} />
                        <PostInteraction post={post} token={props.token} />
                    </div>
                )
            })}
        </div>
    )
}