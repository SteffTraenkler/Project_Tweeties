import { useState } from 'react'
import VerifyEmailForm from './VerifyEmailForm'

function VerifyEmail() {

    const [message, setMessage] = useState("Wir haben dir einen Verifizierungs-Code per Email zugesendet, damit du deinen account aktivierst.")
    const [userWasVerified, setUserWasVerified] = useState(false)

    const userVerificationSuccessfull = () => {
        setMessage("Du hast dich erfolgreich registriert, nun darfst du dich einloggen...")
        setUserWasVerified(true)
    }

    return (
        <div>
            <div>
                <div>
                    <img src="" alt="" />
                    <h4>Twitter</h4>
                    {!userWasVerified && <div>Schritt 2 - E-mail verifizieren</div>}
                    <h5>{message}</h5>{console.log(message)}
                </div>

                <div>
                    <VerifyEmailForm
                        userWasVerified={userWasVerified}
                        userVerificationSuccessfull={userVerificationSuccessfull}
                    />
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail;