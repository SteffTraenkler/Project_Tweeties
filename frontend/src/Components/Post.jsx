import { Link } from 'react-router-dom'
import { CommentIcon } from '../assets/img/CommentIcon.png'
import { RetweetIcon } from '../assets/img/RetweetIcon.png'
import { LikeIcon } from '../assets/img/LikeIcon.png'
import { ShareIcon } from '../assets/img/SahreIcon.png'

export default function Post(props) {

    return (
        <div>
            <div className='userInfoPostDiv'>
                <div className='userPic'>
                    <Link to={"/user/" + props.post.postedBy.username}>
                        <img src={props.post.postedBy.profilePicture} alt={"Avatar of " + props.post.postedBy.username} />
                    </Link>
                </div>
                <div className='usernameLinkPostDiv'>
                    <Link to={"/user/" + props.post.postedBy.username}>
                        <h3>{props.post.postedBy.username}</h3>
                        <p>{props.post.postedBy.uniqueUsername}</p>
                    </Link>
                </div>
            </div>


            <div className='PostDiv'>
                <p>{props.post.postText ? props.post.postText : ""}</p>

                {props.post.picture ? <img src={props.post.picture} alt={"Image Post by User " + props.post.postedBy.username} /> : ""}

                <p>postedAt: Let there be dates which programmers hate to implement! (┛❍ᴥ❍)┛彡┻━┻</p>
            </div>
            <hr />
            {
                (props.post.likes || props.post.retweets || props.post.quotedTweets)
                    ?
                    <div className='countPostInteraktionsDiv'>
                        {/* onclick on the p tags with each a function!! */}
                        <p>{props.post.retweets.length} Retweets</p>
                        <p>{props.post.retweets.length} Zitierte Tweets</p>
                        <p>{props.post.likes.length} Likes</p>
                    </div>
                    :
                    ""
            }

            <hr />

            <div className='iconInteractionBarDiv'>
                <div><img src={CommentIcon} alt="Link to comment this tweet" /></div>
                <div><img src={RetweetIcon} alt="Link to Retweet this Tweet" /></div>
                <div><img src={LikeIcon} alt="Link to like thi post / Tweet" /></div>
                <div><img src={ShareIcon} alt="Link to share this post / Tweet" /></div>
            </div>
        </div >
    )
}