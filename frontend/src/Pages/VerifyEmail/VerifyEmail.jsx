import { useState } from 'react'
import VerifyEmailForm from './VerifyEmailForm'
import Birdie from "../../assets/img/Birdie.png";

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
                <div className='verfifyTxt'>
                    <img src={Birdie} alt="" />
                    {!userWasVerified && <div>Schritt 2 - E-mail verifizieren</div>}
                    <h5>{message}</h5>
                </div>

                <div className='backToLogin'>
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