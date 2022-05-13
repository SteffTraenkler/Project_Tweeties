const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const cookieSession = require("cookie-session")
const { userRouter } = require("./routes/user-routes")
const { postsRouter } = require("./routes/posts-routes")


const PORT = process.env.PORT || 9000;
const app = express();

app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true }));

const oneDayinMs = 24 * 60 * 60 * 1000;
const isLocalHost = process.env.FRONTEND_URL === "http://localhost:3000";

app.set("trust proxy", 1); //trust first proxy

app.use(
  cookieSession({
    name: "session",
    secret: process.env.COOKIE_SESSION_SECRET,
    httpOnly: true,
    expires: new Date(Date.now() + oneDayinMs),
    sameSite: isLocalHost ? "lax" : "none",
    secure: isLocalHost ? false : true,
  })
);

app.use(morgan("dev")); // logger -> loggt Aktivitäten -> Middleware -> ((req,res),next)
app.use(express.json()); //body parser für json
app.use(express.static("assets")); //for picture birdie :0

//Running test Route

app.get("/", (req, res) => {
  res.send("Server is on an running");
});

//Routen aus dem Routes-Ordner

app.use("/api/users", userRouter)  // url ergibt sich aus localhost + diese url + spezifische Route aus userRouter
app.use("/api/posts", postsRouter) // url ergibt sich aus localhost + diese url + spezifische Route aus postsRouter


app.listen(PORT, () => console.log("Server runs on port", PORT));
