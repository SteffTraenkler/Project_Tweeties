import { useState } from "react";
import { apiBaseUrl } from "../api/api";
import DeleteTweetIcon from "./../assets/icons/tweeties/DeleteTweetIcon.png"
import ModalDelPost from "./ModalDelPost";

export default function PostDeleteToggle(props) {
    const [postActive, setPostActive] = useState(false)
    const [delModal, setDelModal] = useState(false)
    const profileInfo = props.profileInfo

    const profileInfoID = profileInfo === null ? "ProfileInfo not fetched" : profileInfo._id


    function togglePostMore() {
        postActive ?
            setPostActive(false)
            : setPostActive(true)

    }

    const followUser = (event, ID) => {
        event.preventDefault()

        fetch(apiBaseUrl + "/api/users/follow/" + ID, {
            method: "POST",
            headers: {
                token: "JWT " + props.token,
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                props.interactionChange
                    ? props.setInteractionChange(false)
                    : props.setInteractionChange(true)
            })
    }

    return (
        <div>
            {delModal &&
                <ModalDelPost token={props.token}
                    post={props.post}
                    setDelModal={setDelModal}
                    setPostActive={setPostActive}
                    interactionChange={props.interactionChange}
                    setInteractionChange={props.setInteractionChange}
                />}
            <div className="postToggleDeleteFollow" onClick={togglePostMore}>
                <img src={DeleteTweetIcon} alt="Post Show more" />
            </div>
            {
                postActive &&
                < div >
                    {profileInfoID ?
                        (profileInfoID === props.post.postedBy._id ?
                            <div className="deletePost">
                                <p
                                    onClick={() => { setDelModal(true); setPostActive(false) }}
                                >Tweet löschen
                                </p>

                            </div>
                            : (props.post.postedBy.youFollow ?
                                <div className="unfollowButton" onClick={e => followUser(e, props.post.postedBy._id)}>
                                    <p>Entfolgen</p>
                                </div>
                                : <div className="followButton" onClick={e => followUser(e, props.post.postedBy._id)}>
                                    <p>Folgen</p>
                                </div>)
                        )
                        : <div></div>
                    }
                </div>
            }
        </div>
    )

}
