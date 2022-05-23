import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { apiBaseUrl } from "../../api/api";
import { useProfileInfo } from "../../hooks/useProfileInfo"
import Camera from "../../assets/icons/CameraIcon.png"
import "../../styles/profileEdit.css"

export default function EditProfile(props) {

    const profileInfo = useProfileInfo(props.token)

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
            console.log("useEffect imgPreview");
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

        console.log("newusername", newUsername);
        console.log("pic", profilepicture);
        console.log("newBio", newBio);

        if (!profilepicture && !newUsername && !newBio) {
            setError("Nothing to change")
            return
        }

        const formData = new FormData();

        if (profilepicture) {
            formData.set("profilePicture", profilepicture, profilepicture.name)
            console.log("profilepicture+name", profilepicture.name);
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
                console.log("data", data);
                console.log("data err", data.err);
                if (data._id && (data.newUsername || data.newBio || data.profilePicture)) {
                    navigate("/secure/home")
                    return;
                }
                // console.log(data.err.message);
                // setError(data.err.message)
            })
    }

    console.log("newusername", newUsername);
    console.log("pic", profilepicture);
    console.log("newBio", newBio);

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