var spicedPg = require("spiced-pg");
const express = require("express");
const app = express();
//const compression = require("compression");
const compression = require("compression");
const bodyParser = require("body-parser");
const db = require("./db");
const s3 = require("./s3");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const config = require("./config");
const axios = require("axios");
const criteria = require("./criteria");
var clarifai = require("./image_recog");

app.use(express.static("public"));

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 20971520
    }
});
app.post("/uploadimage", uploader.single("image"), s3.upload, function(
    req,
    res
) {
    const imageUrl = config.s3Url + "taher/" + req.file.filename;
    const imagePath = __dirname + "/uploads/" + req.file.filename;
    var imageId = "";
    db.uploadImage(imageUrl).then(response => {
        imageId = response.rows[0].id;
        console.log("response.rows[0] ", response.rows[0].id);
        db.getImageById(response.rows[0].id).then(resp => {
            console.log("STEP 1 UPLOAD OK: " + resp.rows);
            res.json(resp.rows);
        });
    });

    var keywordsData = "";
    var hashtagsData = "";
    var articlesData = "";
    //KEYWORDS
    var keywords = "";
    clarifai(imagePath, "", function(err, data) {
        if (err) {
            console.log("Error from Clarifai " + err);
            return next(err);
        } else {
            //keywords = data.outputs.data;
            var keywordsarticles = "";
            for (i = 0; i < data.outputs[0].data.concepts.length; i++) {
                var name = data.outputs[0].data.concepts[i].name;
                var value = data.outputs[0].data.concepts[i].value;
                if (i < criteria.ARTICLES_NUMBER) {
                    if (i == criteria.ARTICLES_NUMBER - 1) {
                        keywordsarticles += name;
                    } else {
                        keywordsarticles += name + "+";
                    }
                    const riteurl =
                        `https://api.ritekit.com/v1/stats/hashtag-suggestions/` +
                        name +
                        `?client_id=9d333288798305be660c3fe11bc68d52486fd3294fae`;

                    axios.get(riteurl).then(resp => {
                        for (i = 0; i < resp.data.data.length; i++) {
                            if (i < criteria.HASHTAGS_KEYWORD) {
                                hashtagsData +=
                                    "#" + resp.data.data[i].hashtag + " ";
                                console.log(
                                    "HASHTAGS : " +
                                        JSON.stringify(
                                            resp.data.data[i].hashtag
                                        )
                                );
                            }
                        }
                        const nytimesurl =
                            `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=` +
                            keywordsarticles +
                            `&api-key=00d51e466def4332b0c206dcc4e8efe7`;
                        console.log("nytimesurl " + nytimesurl);
                        axios.get(nytimesurl).then(resp => {
                            for (
                                i = 0;
                                i < resp.data.response.docs.length;
                                i++
                            ) {
                                if (i < criteria.ARTICLE_NUMBER) {
                                    articlesData +=
                                        resp.data.response.docs[i].web_url +
                                        " ";
                                    articlesData +=
                                        resp.data.response.docs[i].snippet +
                                        " ";
                                }
                            }
                        });
                    });
                }
            }
        }
    });
});
app.get("/imageslist", function(req, res) {
    db.getImages().then(response => {
        res.json(response.rows);
    });
});
app.get("/images", function(req, res) {
    let id = req.headers.referer.slice(
        req.headers.referer.indexOf("/images/") + 7
    );
    console.log("images id : " + id);
    db.getImageById(id).then(response => {
        console.log("getImageById : " + response.rows[0]);
        res.json(response.rows[0]);
    });
});
app.set("/updateimage", function(req, res) {
    db.updateImage(data).then(response => {
        res.json(response.rows[0]);
    });
});
app.set("/deleteimage", function(req, res) {
    db.deleteImage(imageId).then(response => {
        res.json(response.rows[0]);
    });
});
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
