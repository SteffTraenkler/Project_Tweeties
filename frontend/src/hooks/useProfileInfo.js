import { useEffect, useState } from "react"
import { apiBaseUrl } from "../api/api"


export const useProfileInfo = (token) => {
    const [profileInfo, setProfileInfo] = useState(null)

    useEffect(() => {
        if (!token) {
            return
        }

        fetch(apiBaseUrl + "/api/users/myProfileInfo", {
            headers: {
                token: "JWT " + token
            }
        })
            .then(resp => resp.json())
            .then(profileInfoResult => setProfileInfo(profileInfoResult))
    }, [token])

    return profileInfo
}