import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../api/api";

import Camera from "../../assets/icons/CameraIcon.png";
import "../../styles/addTweet.css";

export default function AddTweetForm(props) {
  const [picture, setPicture] = useState();
  const [postText, setPostText] = useState("");
  const [imgPreview, setImgPreview] = useState();
  const fileInputRef = useRef(); //used for preview of the chosen image

  const [error, setError] = useState("");

  const navigate = useNavigate(); //navigate back to home after posting, reset states (also, let the page slide down?)

  const profileInfo = props.profileInfo; //used to display ProfileAvatar

  //Image Preview
  useEffect(() => {
    if (picture) {
      const imgreader = new FileReader();
      imgreader.onloadend = () => {
        setImgPreview(imgreader.result);
      };
      imgreader.readAsDataURL(picture);
    } else {
      setImgPreview(null);
    }
  }, [picture]);

  const addPost = (event) => {
    event.preventDefault();

    if (!picture && !postText) {
      setError("Your Tweet must include something... (•̥́_•ૅू˳)");
      return;
    }

    const formData = new FormData();

    if (picture) {
      formData.set("picture", picture, picture.name);
    }

    if (postText) {
      formData.set("postText", postText);
    }

    fetch(apiBaseUrl + "/api/posts/add", {
      method: "POST",
      headers: {
        token: "JWT " + props.token,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data._id && (data.postText || data.picture)) {
          navigate("/secure/home");
        }
      });
  };

  const returnHome = () => {
    navigate("/secure/home");
  };

  return (
    <section>
      {profileInfo === null ? (
        <h1>Loading....</h1>
      ) : (
        <div>
          <Link to={"/secure/home/user/" + profileInfo.username}>
            <div className="flexTop">
              <div className="divTweetProfilePic">
                <img
                  src={profileInfo.profilePicture}
                  alt={"Avatar of " + profileInfo.username}
                />
              </div>
              <div className="userName">
                <h2>{profileInfo.username}</h2>
                <p>{profileInfo.uniqueUsername}</p>
              </div>
            </div>
          </Link>
          <div className="dFlex">
            <div className="closePost" onClick={returnHome}>
              Cancel
            </div>
            <div className="header-PostAdd">
              <p
                id="tweet"
                className={
                  picture || postText
                    ? "addPost-btn"
                    : "addPost-btn-deactivated"
                }
                style={
                  picture || postText
                    ? { cursor: "pointer" }
                    : { backgroundColor: "#e1e8ed", cursor: "default" }
                }
                onClick={picture || postText ? addPost : null}
              >
                Tweet
              </p>
            </div>
          </div>
          <form>
            <div className="posRel">
              <textarea
                cols={30}
                rows={15}
                maxLength={160}
                onChange={(e) => setPostText(e.target.value)}
                type="text"
                id="inputTweet"
                placeholder="Was passiert gerade?"
              />
            </div>

            {imgPreview ? (
              <div className="prevPicContainer">
                <img className="prevPic" src={imgPreview} />
                <div className="posRel">
                  <div
                    className="delete-pic-from-post"
                    onClick={() => {
                      fileInputRef.current.value = null;
                      setPicture();
                    }}
                  >
                    <div className="x">X</div>
                  </div>
                </div>
              </div>
            ) : null}
          </form>
          {error && <p className="error-msg-add-post">{error}</p>}

          <div
            className="cameraIconDiv"
            onClick={() => {
              fileInputRef.current.click();
            }}
          >
            <img src={Camera} alt="Camera Icon add picture" />
          </div>
          <input
            className="unvisible"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => {
              setPicture(e.target.files[0]);
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
      )}
    </section>
  );
}
