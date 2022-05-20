import { useState } from "react";
import { apiBaseUrl } from "../api/api";
import { useProfileInfo } from "../hooks/useProfileInfo";
import DeleteTweetIcon from "./../assets/icons/tweeties/DeleteTweetIcon.png"

export default function PostDeleteToggle(props) {
    const [postActive, setPostActive] = useState(false)

    const profileInfo = useProfileInfo(props.token)

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

    // console.log("YourFollow?", props.post.postedBy.youFollow);

    return (
        <div>
            <div className="postToggleDeleteFollow" onClick={togglePostMore}>
                <img src={DeleteTweetIcon} alt="Post Show more" />
            </div>
            {
                postActive &&
                < div >
                    {profileInfoID ?
                        (profileInfoID === props.post.postedBy._id ?
                            <div>
                                <h2>Tweet löschen</h2>
                            </div>
                            : (props.post.postedBy.youFollow ?
                                <div className="unfollowBtn" onClick={e => followUser(e, props.post.postedBy._id)}>
                                    <p>Entfolgen</p>
                                </div>
                                : <div className="followBtn" onClick={e => followUser(e, props.post.postedBy._id)}>
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
