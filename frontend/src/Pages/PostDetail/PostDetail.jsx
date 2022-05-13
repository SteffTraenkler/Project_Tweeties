import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../../api/api";
import Post from "../../Components/Post";
import PostInteraction from "../../Components/PostInteraction";
import birdLogo from "../assets/img/Birdie.png";


export default function (props) {
    const { postId } = useParams()
    const [post, setPost] = useState()

    const [error, setError] = useState("")

    useEffect(() => {
        fetch(apiBaseUrl + "/api/posts/" + postId, {
            headers: {
                token: "JWT " + props.token
            }
        })
            .then(resp => resp.json())
            .then(postResult => {
                if (postResult.err) {
                    setError(postResult.err.message)
                    return
                }

                setPost(postResult)
            })
    }, [props.token, postId])


    return (
        <div>
            {
                error ?
                    <h1 className="errorMsg">{error}</h1>

                    : post ?
                        <div className="postDetailDiv">
                            <Post post={post} token={props.token} />
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
                            <PostInteraction post={post} token={props.token} />
                        </div>

                        : <div className="pagePicLoader"> <img className="twitterLoadingPic" src={birdLogo} alt="birdLogo" /> </div>
            }
        </div>

    )
}