import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { apiBaseUrl } from "../../api/api";
import Camera from "../../assets/icons/CameraIcon.png"
import "../../styles/profileEdit.css"

export default function EditProfile(props) {

    const profileInfo = props.profileInfo

    const [profilepicture, setProfilePicture] = useState();
    const [newUsername, setNewUsername] = useState("");
    const [newBio, setNewBio] = useState("")

    const [imgPreview, setImgPreview] = useState();
    const fileInputRef = useRef();

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const returnToPreviousSide = () => {
        navigate(-1)
    }

    useEffect(() => {
        if (profilepicture) {
            const imgreader = new FileReader();
            imgreader.onloadend = () => {
                setImgPreview(imgreader.result)
            }
            imgreader.readAsDataURL(profilepicture)
        } else {
            setImgPreview(null);
        }
    }, [profilepicture])



    const editProfile = (event) => {
        event.preventDefault();

        if (!profilepicture && !newUsername && !newBio) {
            setError("Nothing to change")
            return
        }

        const formData = new FormData();

        if (profilepicture) {
            formData.set("profilePicture", profilepicture, profilepicture.name)
        }

        if (newUsername) {
            formData.set("username", newUsername);
        }

        if (newBio) {
            formData.set("biography", newBio)
        }

        fetch(apiBaseUrl + "/api/users/profile/editProfile", {
            method: "PUT",
            headers: {
                token: "JWT " + props.token,
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data._id && (data.newUsername || data.newBio || data.profilePicture)) {
                    return;
                }
                console.log(profileInfo.username);
                navigate("/secure/home/user/" + profileInfo.username)

                // console.log(data.err.message);
                // setError(data.err.message)
            })
    }

    return (
        <section>
            {profileInfo === null ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    <Link to={"/secure/home/user/" + profileInfo.username}>
                        <div className="flexTop">
                            <div className="divTweetProfilePic">
                                <img src={profileInfo.profilePicture} alt={"Avatar of " + profileInfo.username} />
                            </div>
                            <div className="userName">
                                <h2>{profileInfo.username}</h2>
                                <p>{profileInfo.uniqueUsername}</p>
                            </div>
                        </div>
                    </Link>
                    <div className="together">
                        <div>
                            <div>
                                <div className="closePost" onClick={returnToPreviousSide}>Cancel</div>
                            </div>
                        </div>
                        <div>
                            <p id="save" onClick={profilepicture || newUsername || newBio ? editProfile : null}>Speichern</p>
                        </div>
                    </div>
                    <h4 className="profileChangeTxt">Feel free to change your Profile Infromations</h4>
                    <form>
                        <div>
                            <label htmlFor="">Username</label>
                            <input type="text" onChange={(e) => setNewUsername(e.target.value)} placeholder={profileInfo.username} />
                            <label htmlFor="">Biography</label>
                            <input type="text" onChange={(e) => setNewBio(e.target.value)} placeholder={profileInfo.biography} />
                        </div>
                        <h2>Profile Picture</h2>
                        {imgPreview ? (
                            <div>
                                <img className="prevPic" src={imgPreview} />

                                <div className="posRel">
                                    <div
                                        className="delete-pic-from-post2"
                                        onClick={() => {
                                            fileInputRef.current.value = null;
                                            setProfilePicture();
                                        }}
                                    >
                                        <div className="x">X</div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </form>
                    {error && <p>{error}</p>}
                    <div className="cameraIconDiv" onClick={() => {
                        fileInputRef.current.click();
                    }}>
                        <img src={Camera} alt="Camer Icon edit Pic" />
                    </div>
                    <input
                        className="unvisible"
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={(e) => {
                            setProfilePicture(e.target.files[0])
                        }}
                    />
                </div>
            )}
        </section >
    )
}