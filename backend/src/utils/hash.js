const crypto = require("crypto")
const jwt = require("jsonwebtoken");


// Hash Funktion für Passwort Hash
function hash(input) {
    return crypto.createHash('sha256').update(input).digest('hex')
}

//Salt Funktion für 2. Hash
function createRandomSalt() {
    return crypto.randomBytes(64).toString('hex');
}

// Funktion doppelter Hash des Passwortes 
function createPasswordHash(password, salt) {
    return hash(password + salt)
}

//create Token durchs Frontend
function createToken(user, type = "access", lifespanInSeconds = 60 * 10) {
    const initiatedAt = Math.floor(Date.now() / 1000) //ohne Millisekungen ( x/ 1000)
    const expiresAt = initiatedAt + lifespanInSeconds // gesamt - Minuten/stunden etc

    const tokenPayload = {
        sub: user._id,  // "sub" -> Subjekt -> Token wird an UserID geheftet
        type: type,  // bspw: "access" token oder/vs. "refresh" token
        iat: initiatedAt,
        exp: expiresAt
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET)
    return token
}

// imBuffer -> zum speichern/abwandeln der image files
function imageBufferToBase64(imgBuffer, mimeType) {
    return "data:" + mimeType + ";base64," + imgBuffer.toString('base64')
}

//funktion für random Verifizierungscode
function generateRandomSixDigitCode() {
    return Math.random().toString().slice(2, 8)
}

module.exports = {
    hash,
    createRandomSalt,
    createPasswordHash,
    createToken,
    imageBufferToBase64,
    generateRandomSixDigitCode
}