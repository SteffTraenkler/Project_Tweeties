import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiBaseUrl } from "../../api/api";
import ShowUsersArray from "../../Components/ShowUsersArray";
import ArrowBack from "../../assets/icons/Arrow1.png"

export default function ShowUsersFollowed(props) {

    const { userId } = useParams(props)
    const [users, setUsers] = useState()
    const [interactionChange, setInteractionChange] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        fetch(apiBaseUrl + "/api/users/following/" + userId, {
            headers: {
                token: "JWT " + props.token,
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

    let noUser
    const errorHandling = users ? (users.length === 0 ? noUser = "There is currently no one here :/" : noUser) : "users not fetched yet"

    return (
        <>{error ?
            <h2> {error}</h2>
            : (
                <div>
                    <div className="backFlex">
                        <p onClick={goBackOnClick}><img className="backArrow" src={ArrowBack} alt="" /></p>
                        <h1 className="rtdFrom">Folge ich</h1>
                    </div>
                    {noUser ?
                        <h1 className="noUser"> {noUser}</h1>
                        :
                        <ShowUsersArray users={users} token={props.token} interactionChange={interactionChange} setInteractionChange={setInteractionChange}
                            profileInfo={props.profileInfo}
                        />}
                </div>
            )
        }
        </>
    )

}