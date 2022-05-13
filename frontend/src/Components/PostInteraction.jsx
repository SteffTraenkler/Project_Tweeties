import { Link } from 'react-router-dom'
import { CommentIcon } from '../assets/img/CommentIcon.png'
import { RetweetIcon } from '../assets/img/RetweetIcon.png'
import { LikeIcon } from '../assets/img/LikeIcon.png'
import { ShareIcon } from '../assets/img/SahreIcon.png'

export default function PostInteraction(props) {

    // const likePostToggle

    return (
        <div className='iconInteractionBarDiv'>
            <div><img src={CommentIcon} alt="Link to comment this tweet" /></div>
            <div><img src={RetweetIcon} alt="Link to Retweet this Tweet" /></div>
            <div><img src={LikeIcon} alt="Link to like thi post / Tweet" /></div>
            <div><img src={ShareIcon} alt="Link to share this post / Tweet" /></div>
        </div>
    )
}