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
                        <div>
                            <div>
                                <img src={profileInfo.profilePicture} alt={"Avatar of " + profileInfo.username} />
                            </div>
                            <div>
                                <h2>{profileInfo.username}</h2>
                                <p>{profileInfo.uniqueUsername}</p>
                            </div>
                        </div>
                    </Link>
                    <div className="together">
                        <div>
                            <div>
                                <h2 onClick={returnToPreviousSide}>Cancel</h2>
                            </div>
                        </div>
                        <div>
                            <h2 onClick={profilepicture || newUsername || newBio ? editProfile : null}>Speichern</h2>
                        </div>
                    </div>
                    <h3>Feel free to change your Profile Infromations</h3>
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
                                <img src={imgPreview} />
                                <div onClick={() => {
                                    fileInputRef.current.value = null;
                                    setProfilePicture();
                                }}
                                >
                                    <div>X</div>
                                </div>
                            </div>
                        ) : null}
                    </form>
                    {error && <p>{error}</p>}
                    <div onClick={() => {
                        fileInputRef.current.click();
                    }}>
                        <img src={Camera} alt="Camer Icon edit Pic" />
                    </div>
                    <input
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