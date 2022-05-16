import Post from "./Post"
import PostInteraction from "./PostInteraction"

export default function PostList(props) {
    return (
        <div className="postFeedListDiv">
            {props.posts.map((post, key) => {
                return (
                    <div className="postFeedPostCard" key={key}>
                        <Post post={post} token={props.token} />
                        <PostInteraction post={post} token={props.token} />
                    </div>
                )
            })}
        </div>
    )
}