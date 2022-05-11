const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const cookieSession = require("cookie-session")

const PORT = process.env.PORT || 9000
const app = express()

// app.use(cors({origin: [process.env.FRONTEND_URL], credentials: true}))

app.use(morgan('dev')) // logger -> loggt Aktivitäten -> Middleware -> ((req,res),next)
app.use(express.json()) //body parser für json

//Running test Route

app.get("/", (req, res) => {
    res.send("Server is on an running")
})

//Routen aus dem Routes-Ordner

//blablubb lol :D

app.listen(PORT, () => console.log("Server runs on port", PORT))