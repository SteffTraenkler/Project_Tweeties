import { apiBaseUrl } from "../api/api";
import "../styles/modalDelPost.css"

export default function ModalDelPost(props) {

    function deletePost(e, postId) {
        e.preventDefault()

        fetch(apiBaseUrl + "/api/posts/delete/post/" + postId, {
            method: "DELETE",
            headers: {
                token: "JWT " + props.token,
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                props.interactionChange
                    ? props.setInteractionChange(false)
                    : props.setInteractionChange(true);
                props.setDelModal(false)
                props.setPostActive(false)
            })

    }

    return (
        <div className="modal-deleteTweet-bg">
            <div className="modal-del-container">
                <div className="modal-title">
                    <h2>Tweet löschen?</h2>
                </div>
                <div className="modal-body">
                    <p>Das kann nicht rückgänging gemacht werden und er
                        wird aus deinem Profil, der Timelime aller Accounts,
                        die dir folgen und den Tweetie Suchergebnissen entfernt.
                    </p>
                </div>
                <div className="modal-footer">
                    <h3 className="modal-abbrechen"
                        onClick={() => { props.setDelModal(false); props.setPostActive(true) }}
                    >Abbrechen
                    </h3>
                    <h3 className="modal-delete-post-btn"
                        onClick={(e) => deletePost(e, props.post._id)}
                    >Tweet löschen</h3>
                </div>
            </div>
        </div>
    )
}