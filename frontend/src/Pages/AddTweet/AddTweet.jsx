import AddTweetForm from "./AddTweetForm";


export default function AddTweet(props) {
    return (

        <AddTweetForm token={props.token} profileInfo={props.profileInfo} />

    )
}