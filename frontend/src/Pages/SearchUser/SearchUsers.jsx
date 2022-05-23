import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../api/api";
import ShowUsersArray from "../../Components/ShowUsersArray";

export default function SearchUsers(props) {
    const [allUsers, setAllUsers] = useState([])
    const [search, setSearch] = useState("")
    const [filteredUsers, setFilteredUsers] = useState([])
    const [error, setError] = useState("")
    const [interactionChange, setInteractionChange] = useState(false)
    const navigate = useNavigate()



    useEffect(() => {
        fetch(apiBaseUrl + "/api/users/all", {
            headers: {
                token: "JWT " + props.token,
            },
        })
            .then((resp) => resp.json())
            .then((allUsersArr) => {
                if (allUsersArr.err) {
                    setError(allUsersArr.err.message)
                    return
                }
                setAllUsers(allUsersArr)
            })
    }, [interactionChange, props.token])

    const handleChange = (e) => {
        const searchedWord = e.target.value
        setSearch(searchedWord)
        const nFilter = allUsers.filter((value) => {
            return value.username.toLowerCase().includes(searchedWord.toLowerCase())
        })

        if (searchedWord === "") {
            setFilteredUsers([])
        } else {
            setFilteredUsers(nFilter)
        }
    }

    const emptySearch = () => {
        setSearch("")
        setFilteredUsers([])
    }
    function goBackOnClick() {
        navigate(-1)
    }

    let noUser
    const errorHandlingAll = allUsers ? (allUsers.length === 0 ? noUser = "There is currently no one here :/" : noUser) : "users not fetched yet"
    let noUserSearch
    const errorHandlingSearch = filteredUsers ? (filteredUsers.length === 0 ? noUserSearch = "Leider konnten wir keine User mit diesem Namen finden :/" : noUserSearch) : "users not fetched yet"

    return (
        <>
            {error ?
                <h1>{error}</h1>
                : (
                    <section>
                        <form>
                            <div onClick={goBackOnClick}><p>Zurück</p></div>
                            <input
                                type="text"
                                value={search}
                                onChange={handleChange} />
                            <div onClick={emptySearch}>X</div>
                        </form>
                        {search.length === 0 ?
                            (
                                noUser ?
                                    <h1> {noUser}</h1>
                                    :
                                    <ShowUsersArray
                                        users={allUsers}
                                        token={props.token}
                                        interactionChange={interactionChange} setInteractionChange={setInteractionChange}
                                        profileInfo={props.profileInfo}
                                    />
                            )
                            : (
                                noUserSearch ?
                                    <h1> {noUserSearch}</h1>
                                    :
                                    <ShowUsersArray
                                        users={filteredUsers}
                                        token={props.token}
                                        interactionChange={interactionChange} setInteractionChange={setInteractionChange}
                                        profileInfo={props.profileInfo}
                                    />
                            )

                        }
                    </section>
                )
            }
        </>
    )
}