const express = require("express");
const app = express();
//const compression = require("compression");
const compression = require("compression");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const bcrypt = require("bcryptjs");
const uidSafe = require("uid-safe");
app.use(express.static("public"));

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`I'm listening.`);
});
