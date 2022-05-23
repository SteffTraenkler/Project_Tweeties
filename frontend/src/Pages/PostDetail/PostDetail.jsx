import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiBaseUrl } from "../../api/api";
import Post from "../../Components/Post";
import "../../styles/postDetails.css"
import ArrowBack from "../../assets/icons/Arrow1.png";
import postTweet from "../../assets/icons/tweet&mess/Add text icon.png";
import { Triangle } from "react-loader-spinner";

import {
    CommentInteraction,
    LikeInteraction,
    RetweetInteraction,
    ShareInteraction,
} from "../../Components/PostInteraction";
import birdLogo from "../../assets/img/Birdie.png";
import PostDeleteToggle from "../../Components/PostDeleteToggle";

export default function PostDetail(props) {
    const { postId } = useParams();
    const [post, setPost] = useState();

    const [interactionChange, setInteractionChange] = useState(false);

    const [error, setError] = useState("");

    const navigate = useNavigate()

    useEffect(() => {
        fetch(apiBaseUrl + "/api/posts/" + postId, {
            headers: {
                token: "JWT " + props.token,
            },
        })
            .then((resp) => resp.json())
            .then((postResult) => {
                if (postResult.err) {
                    setError(postResult.err.message);
                    return;
                }
                setPost(postResult);
            });
    }, [props.token, postId, interactionChange]);

    const createNewTweet = () => navigate("/addPost");

    return (
        <div>
            {error ? (
                <div className="noTweet">
                    <a className="backButton" onClick={() => navigate(-1)}>
                        <img src={ArrowBack} />
                    </a>
                    <h1 className="errorMsg">Dieser Tweet existiert nicht mehr...</h1>
                </div>
            ) : post ? (
                <div className="postDetailDiv">

                    <PostDeleteToggle post={post} token={props.token} interactionChange={interactionChange} setInteractionChange={setInteractionChange}
                        profileInfo={props.profileInfo}
                    />

                    <Post post={post} token={props.token} />
                    {post.likes || post.retweets || post.quotedTweets ? (
                        <div className="countPostInteraktionsDiv">
                            {post.retweets.length > 0 ? (
                                <Link to={"/secure/home/post/retweets/" + post._id}>
                                    <p>{post.retweets.length}
                                        <span> Retweets</span>
                                    </p>
                                </Link>
                            ) : null}
                            {post.quotedTweets > 0 ? (
                                <p> {post.retweets.length} Zitierte Tweets</p>
                            ) : null}
                            {post.likes.length > 0 ?
                                (<Link to={"/secure/home/post/likes/" + post._id}>
                                    <p>{post.likes.length}
                                        <span>Likes</span>
                                    </p>
                                </Link>
                                ) : null}
                        </div>
                    ) : (
                        ""
                    )}
                    <hr />
                    <div className="iconInteractionBarDiv">
                        <CommentInteraction
                            post={post}
                            token={props.token}
                            setInteractionChange={setInteractionChange}
                            interactionChange={interactionChange}
                        />
                        <RetweetInteraction
                            post={post}
                            token={props.token}
                            setInteractionChange={setInteractionChange}
                            interactionChange={interactionChange}
                        />
                        <LikeInteraction
                            post={post}
                            token={props.token}
                            setInteractionChange={setInteractionChange}
                            interactionChange={interactionChange}
                        />
                        <ShareInteraction
                            post={post}
                            token={props.token}
                            setInteractionChange={setInteractionChange}
                            interactionChange={interactionChange}
                        />
                    </div>
                </div>
            ) : (
                <div className="pagePicLoader">
                    {" "}
                    <div className="twitterLoading fade-out">
                        <Triangle height="300" width="300" color="#fff" ariaLabel="Loading" />
                        <img className="twitterLoadingPic" src={birdLogo} alt="picturePic" />
                    </div>{" "}
                </div>
            )}
            <div className="posRela">
                <div
                    className="addTweet-btn"
                    onClick={createNewTweet}
                    style={{
                        backgroundImage: `url(${postTweet})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                    }}
                >
                    {/* <img className="addTweet" src={postTweet} alt="" /> */}
                </div>
            </div>
        </div>
    );
}
