const path = require("path");
require("dotenv").config({ path: path.resolve(".env.local") });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const postRoute = require("./routes/post.route");
const userRoute = require("./routes/user.route");
const followerRoute = require("./routes/follower.route");
const followingRoute = require("./routes/following.route");
const bookmarkRoute = require("./routes/bookmark.route");
const suggestedUserRoute = require("./routes/suggested.route");
const activeUserRoute = require("./routes/activeUser.route");
const storyRoute = require("./routes/story.route");
const infoRoute = require("./routes/info.route");

const app = express();

app.use(morgan("tiny"), express.json(), cors({ origin: true }));
app.options("*", cors());

app.get("/", (_, res) => {
    res.send(
        `<h1 style="display: grid;place-items: center; justify-items: center; height: 100vh;width: 100vw;">Home Page</h1>`
    );
});

app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/follower", followerRoute);
app.use("/following", followingRoute);
app.use("/bookmark", bookmarkRoute);
app.use("/suggested-user", suggestedUserRoute);
app.use("/active-user", activeUserRoute);
app.use("/story", storyRoute);
app.use("/info", infoRoute);

app.get("/test", (req, res) => {
    res.json({ query: req.query });
});
app.get("*", (_, res) => {
    res.send(
        `<h1 style="display: grid;place-items: center; justify-items: center; height: 100vh;width: 100vw;">Route Not Found</h1>`
    );
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server running at port http://localhost:${PORT}`);
    mongoose
        .connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log(process.env.MONGODB_URL);
            console.log(`mongodb connected`);
        })
        .catch((e) => {
            console.error(e);
        });
});
