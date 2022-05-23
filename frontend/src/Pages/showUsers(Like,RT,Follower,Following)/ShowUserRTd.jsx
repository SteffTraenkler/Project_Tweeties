import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiBaseUrl } from "../../api/api";
import ShowUsersArray from "../../Components/ShowUsersArray";
import "../../styles/postDetails.css"
import ArrowBack from "../../assets/icons/Arrow1.png"

export default function ShowUserRTd(props) {

    const { postId } = useParams(props)
    const [users, setUsers] = useState()
    const [interactionChange, setInteractionChange] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        fetch(apiBaseUrl + "/api/users/retweets/" + postId, {
            headers: {
                token: "JWT " + props.token
            }
        })
            .then((resp) => resp.json())
            .then((userArrResult) => {
                if (userArrResult.err) {
                    setError(userArrResult.err.message)
                    return
                }
                setUsers(userArrResult)
            })
    }, [interactionChange, props.token])

    function goBackOnClick() {
        navigate(-1)
    }

    return (
        <>{error ?
            <h2 className="noUser">{error}</h2>
            : (<div>
                <div className="backFlex">
                    <p onClick={goBackOnClick}><img className="backArrow" src={ArrowBack} alt="" /></p>
                    <h1 className="rtdFrom">Retweetet von</h1>
                </div>
                <ShowUsersArray users={users} token={props.token} interactionChange={interactionChange} setInteractionChange={setInteractionChange}
                    profileInfo={props.profileInfo}
                />
            </div>)
        }

        </>
    )
}