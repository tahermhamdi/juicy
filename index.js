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

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(compression());

app.use(express.static("public"));
var cookieSession = require("cookie-session");
app.use(
    cookieSession({
        secret: "taher",
        maxAge: 1000 * 60 * 60 * 24 * 14,
        htttpOnly: true
    })
);
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
        req.session.imageId = response.rows[0].id;
        console.log("response.rows[0] ", response.rows[0].id);
        console.log("req.session.imageId ", req.session.imageId);
    });

    var keywordsData = "";
    var hashtagsData = "";
    var articlesData = "";
    //KEYWORDS
    var keywords = "";
    var keywordsArray = [];
    clarifai(imagePath, "", function(err, data) {
        if (err) {
            console.log("Error from Clarifai " + err);
            return next(err);
        } else {
            var keywordsarticle = "";
            for (i = 0; i < criteria.KEYWORDS_NUMBER; i++) {
                var name = data.outputs[0].data.concepts[i].name;
                var value = data.outputs[0].data.concepts[i].value;
                keywordsData += name + " " + value + "\n";
                keywordsArray.push(name);
                if (i < criteria.KEYWORDS_ARTICLE) {
                    if (i == criteria.KEYWORDS_ARTICLE - 1) {
                        keywordsarticle += name;
                    } else {
                        keywordsarticle += name + "+";
                    }
                }
            }
        }
        const urlArray = [];
        for (var i = 0; i < keywordsArray.length; i++) {
            const riteurl =
                `https://api.ritekit.com/v1/stats/hashtag-suggestions/` +
                keywordsArray[i] +
                `?client_id=a448ccc81fbcce9c3b33efd234ea7771ab404fdd4acb`;

            urlArray.push(riteurl);
        }

        Promise.all(getTheHashTags(urlArray)).then(results => {
            for (i = 0; i < keywordsArray.length; i++) {
                for (
                    k = 0;
                    k < criteria.HASHTAGS_KEYWORD &&
                    k < results[i].data.data.length;
                    k++
                ) {
                    hashtagsData += "#" + results[i].data.data[k].hashtag + " ";
                }
            }
            console.log("hashtagsData  : ", hashtagsData);
            console.log("urlArray  : ", urlArray);
            console.log("keywordsArray  : ", keywordsArray);
            console.log("keywordsarticle : " + keywordsarticle);
            const nytimesurl =
                `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=` +
                keywordsarticle +
                `&api-key=00d51e466def4332b0c206dcc4e8efe7`;
            console.log("nytimesurl : " + nytimesurl);
            nytimesurl.replace(" ", "20%");
            axios.get(nytimesurl).then(resp => {
                for (i = 0; i < resp.data.response.docs.length; i++) {
                    if (i < criteria.ARTICLES_NUMBER) {
                        articlesData +=
                            resp.data.response.docs[i].web_url + "\n";
                        articlesData +=
                            resp.data.response.docs[i].snippet + "\n";
                    }
                }
                console.log("articlesData : " + articlesData);
                console.log("hashtagsData : " + hashtagsData);
                console.log("keywordsData : " + keywordsData);
                db.getImageById(req.session.imageId).then(resp => {
                    //console.log("res.rows", resp.rows[0].hashtags);
                    resp.rows[0].hashtags = hashtagsData;
                    resp.rows[0].keywords = keywordsData;
                    resp.rows[0].articles = articlesData;
                    res.json(resp.rows);
                });
            });
        });

        function getTheHashTags(arr) {
            let promises = [];
            for (var i = 0; i < arr.length; i++) {
                promises.push(axios.get(arr[i]));
            }
            return promises;
        }
    });
});
app.get("/getimages", function(req, res) {
    db.getImages().then(response => {
        res.json(response.rows);
    });
});
app.get("/imagesbycriteria", function(req, res) {
    db.getImagesByCriteria(req.query.criteria).then(response => {
        console.log("response.rows : ", response.rows);
        res.json(response.rows);
    });
});
app.get("/image", function(req, res) {
    console.log("response.rows : ", req.query.id);
    db.getImageById(req.query.id).then(response => {
        console.log("response.rows : ", response.rows);
        res.json(response.rows);
    });
});
app.get("/images", function(req, res) {
    let id = req.headers.referer.slice(
        req.headers.referer.indexOf("/images/") + 7
    );
    console.log("images id : " + id);
    db.getImageById(id).then(response => {
        res.json(response.rows[0]);
    });
});
app.post("/updateimage", function(req, res) {
    console.log("Inside imagedata : body", req.body[0].blog);

    db
        .updateImage(
            req.body[0].id,
            req.body[0].title,
            req.body[0].url,
            req.body[0].description,
            req.body[0].hashtags,
            req.body[0].keywords,
            req.body[0].articles,
            req.body[0].blog
        )
        .then(response => {
            res.json(response.rows[0]);
        });
});
app.post("/deleteimage", function(req, res) {
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
