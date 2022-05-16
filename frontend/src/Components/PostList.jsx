import Post from "./Post"
import { CommentInteraction, LikeInteraction, RetweetInteraction, ShareInteraction } from "./PostInteraction"

export default function PostList(props) {

    console.log(props.posts);

    return (
        <div className="postFeedListDiv">
            {props.posts.map((post, key) => {
                return (
                    <div className="postFeedPostCard" key={key}>
                        <Post post={post} token={props.token} />
                        <div className='iconInteractionBarDiv'>
                            <CommentInteraction post={post} token={props.token} setInteractionChange={props.setInteractionChange} interactionChange={props.interactionChange} /> <p>{post.comments.length}</p>
                            <RetweetInteraction post={post} token={props.token} setInteractionChange={props.setInteractionChange} interactionChange={props.interactionChange} /> <p>{post.retweets.length}</p>
                            <LikeInteraction post={post} token={props.token} setInteractionChange={props.setInteractionChange} interactionChange={props.interactionChange} /> <p>{post.likes.length}</p>
                            <ShareInteraction post={post} token={props.token} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}