const { useState } = require("react")
const { Link } = require("react-router-dom")
const { apiBaseUrl } = require("../../api/api")

const VerifyEmailForm = (props) => {
    const [email, setEmail] = useState("")
    const [sixDigitCode, setSixDigitCode] = useState("")

    const [error, setError] = useState("")

    const verifyAccount = (event) => {
        event.preventDefault()

        fetch(apiBaseUrl + "/api/users/verifyEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, sixDigitCode })
        })
            .then(response => response.json())
            .then(data => {
                if (!data.err) {
                    setError("")
                    props.userVerificationSuccessfull()
                    return
                }

                if (data.err.validationErrors) {
                    const firstError = data.err.validationErrors[0]
                    setError(firstError.msg + ": " + firstError.param)
                    return
                }
                setError(data.err.message)
            })
    }

    return (
        <div>
            {props.userWasVerified
                ? <Link to="/">
                    <button>
                        <div>Jetzt als {email} einloggen</div>
                    </button>
                </Link>
                : <form>
                    <div>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@example.com" />
                        <label htmlFor="floatingInpurt">Email</label>
                    </div>
                    <div>
                        <input value={sixDigitCode} onChange={(e) => setSixDigitCode(e.target.value)} type="email" placeholder="123456" />
                        <label htmlFor="floatingInput">Verification Code</label>
                    </div>
                    <a onClick={verifyAccount} type="submit">Account Verifizieren</a>
                    {error && <p>Das hier ist ein error {error}</p>}
                </form>}
        </div>
    )
}

export default VerifyEmailForm