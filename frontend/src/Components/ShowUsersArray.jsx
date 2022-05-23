import { useState } from "react";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../api/api"
import "../styles/postDetails.css"

export default function ShowUsersArray(props) {

    const profileInfo = props.profileInfo

    const profileInfoID = profileInfo === null ? "ProfileInfo not fetched" : profileInfo._id

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

        props.users
            ?
            (
                props.users.map((user, key) =>
                    <Link to={"/secure/home/user/" + user.username} key={key}>
                        <div>
                            <div className="flexUserInfo">
                                <div className="retweetPic">
                                    <img src={user.profilePicture} alt={"Profile Picture of " + user.username} />
                                </div>
                                <div className="rtdUserInfo">
                                    <h1>{user.username}</h1>
                                    <p>{user.uniqueUsername}</p>
                                    <p>{user.biography}</p>
                                </div>


                                <div className="followOrUnfollow">
                                    {profileInfoID === user._id ?
                                        null
                                        : (user.youFollow ?
                                            <div className="unfollowBtn" onClick={e => followUser(e, user._id)}>
                                                <p>Entfolgen</p>
                                            </div>
                                            : <div className="followBtn" onClick={e => followUser(e, user._id)}>
                                                <p>Folgen</p>
                                            </div>)
                                    }
                                    <p>
                                        {profileInfoID === user._id
                                            ? ""
                                            : (user.yourFollower ?
                                                <p className="followYou">Folgt dir</p>
                                                : ""
                                            )
                                        }
                                    </p>
                                </div>
                            </div>
                            <div>


                            </div>
                        </div>
                    </Link>
                )
            )
            :
            <h1>Loading...</h1>

    )
}