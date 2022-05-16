import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../api/api";
import { useProfileInfo } from "../../hooks/useProfileInfo";
import Camera from '../../assets/icons/CameraIcon.png'


export default function AddTweetForm(props) {
    const [picture, setPicture] = useState()
    const [postText, setPostText] = useState("")
    const [imgPreview, setImgPreview] = useState()
    const fileInputRef = useRef() //used for preview of the chosen image


    const [error, setError] = useState("")

    const navigate = useNavigate() //navigate back to home after posting, reset states (also, let the page slide down?)

    const profileInfo = useProfileInfo(props.token) //used to display ProfileAvatar


    //Image Preview
    useEffect(() => {
        if (picture) {
            console.log("useEffect impPreview");
            const imgreader = new FileReader()
            imgreader.onloadend = () => {
                setImgPreview(imgreader.result)
            }
            imgreader.readAsDataURL(picture)
        } else {
            setImgPreview(null)
        }
    }, [picture])

    const addPost = (event) => {
        event.preventDefault()

        if (!picture && !postText) {
            setError("Your Tweet must include something... (•̥́_•ૅू˳)")
            return
        }

        const formData = new FormData()

        if (picture) {
            formData.set("picture", picture, picture.name)
        }

        if (postText) {
            formData.set("postText", postText)
        }

        fetch(apiBaseUrl + "/api/posts/add", {
            method: "POST",
            headers: {
                token: "JWT " + props.token
            },
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                if (data._id && (data.postText || data.picture)) {
                    navigate("/home")
                }
            })
    }

    const returnHome = () => {
        navigate("/home")
    }

    console.log(profileInfo);
    console.log("picture", picture);
    console.log("imgPreview", imgPreview);
    console.log("text", postText);

    return (
        <section>
            {
                profileInfo === null

                    ? <h1>Loading....</h1>

                    :

                    <div>
                        <Link to={"/user/" + profileInfo.username}>
                            <div className="divTweetProfilePic">
                                <img src={profileInfo.profilePicture} alt={"Avatar of " + profileInfo.username} />
                            </div>
                        </Link>


                        <form>

                            <div>
                                <input
                                    onChange={(e) => setPostText(e.target.value)}
                                    type="text"
                                    id="inputTweet"
                                    placeholder="Was passiert gerade?"
                                />
                            </div>

                            {imgPreview
                                ? (<div>
                                    <img src={imgPreview} />
                                    <div className="delete-pic-from-post" onClick={() => {
                                        fileInputRef.current.value = null
                                        setPicture()
                                    }}>X</div>
                                </div>)
                                : (null)
                            }

                            {error && <p className="error-msg-add-post">{error}</p>}

                            <div>
                                <img src={picture} alt="" />
                            </div>
                            <div>
                                <div className="cameraIconDiv"
                                    onClick={() => {
                                        fileInputRef.current.click()
                                    }}
                                >
                                    <img src={Camera} alt="Camera Icon add picture" />
                                </div>
                                <input
                                    accept="image/*"
                                    ref={fileInputRef}
                                    // style={{ display: "none" }}
                                    onChange={(e) => {
                                        setPicture(e.target.files[0])
                                        // if (file && file.type.substring(0, 5) === "image") {
                                        //     setPicture(file)
                                        // } else {
                                        //     setPicture(null)
                                        // }
                                    }}
                                    type="file"
                                    id="inputPic"
                                />
                            </div>

                            <div className="header-PostAdd">
                                <div className="closePost" onClick={returnHome}>X</div>
                                <p
                                    className={(picture || postText) ? "addPost-btn" : "addPost-btn-deactivated"}
                                    onClick={(picture || postText) ? addPost : null} >
                                    Twe..Crap
                                </p>
                            </div>
                        </form>
                    </div >
            }
        </section>
    )
}