import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiBaseUrl } from "../../api/api";
import ShowUsersArray from "../../Components/ShowUsersArray";


export default function ShowUserLiked(props) {

    const { postId } = useParams(props)
    const [users, setUsers] = useState()
    const [interactionChange, setInteractionChange] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        fetch(apiBaseUrl + "/api/users/likes/" + postId, {
            headers: {
                token: "JWT " + props.token,
            }
        })
            .then((resp) => resp.json())
            .then((userArrResult) => {
                if (userArrResult.err) {
                    console.log("Error fetching User who liked Post Array", userArrResult.err);
                    setError(userArrResult.err.message)
                    return
                }
                console.log("UserArray who like Post:", userArrResult);
                setUsers(userArrResult)
            })
    }, [interactionChange, props.token])

    function goBackOnClick() {
        navigate(-1)
    }



    return (
        <>
            {error ?
                <h2>{error}</h2>
                : (<div>
                    <div>
                        <p onClick={goBackOnClick}>"Zurück"</p>
                        <h1>Retweetet von</h1>
                    </div>
                    <ShowUsersArray users={users} token={props.token} interactionChange={interactionChange} setInteractionChange={setInteractionChange} />
                </div>)
            }
        </>
    )
}