import { useState } from "react";
import { Link } from "react-router-dom";
import { apiBaseUrl } from "../api/api"
import { useProfileInfo } from "../hooks/useProfileInfo"

export default function ShowUsersArray(props) {

    const profileInfo = useProfileInfo(props.token)

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
                            <div>
                                <img src={user.profilePicture} alt={"Profile Picture of " + user.username} />
                            </div>
                            <div>
                                <p>
                                    {profileInfoID === user._id
                                        ? ""
                                        : (user.yourFollower ?
                                            "Folgt dir"
                                            : ""
                                        )
                                    }
                                </p>
                                <h1>{user.username}</h1>
                                <p>{user.uniqueUsername}</p>
                                <p>{user.biography}</p>
                                {profileInfoID === user._id ?
                                    null
                                    : (user.youFollow ?
                                        <div className="buttonUnfollow" onClick={e => followUser(e, user._id)}>
                                            <p>Entfolgen</p>
                                        </div>
                                        : <div className="buttonFollow" onClick={e => followUser(e, user._id)}>
                                            <p>Folgen</p>
                                        </div>)
                                }
                            </div>
                        </div>
                    </Link>
                )
            )
            :
            <h1>Loading...</h1>

    )
}