var spicedPg = require("spiced-pg");
if (process.env.DATABASE_URL) {
    var db = spicedPg(process.env.DATABASE_URL);
} else {
    var db = spicedPg("postgres:postgres:postgres@localhost:5432/juicy");
}

function getImages() {
    return db.query("SELECT * FROM IMAGES ORDER BY IMAGES.id DESC");
}
function getImageById(image_id) {
    return db.query("SELECT * FROM IMAGES WHERE IMAGES.id=$1", [image_id]);
}
function getImagesByCriteria(name) {
    return db.query(
        "SELECT * FROM IMAGES WHERE LOWER(IMAGES.title) LIKE LOWER ('%" +
            name +
            "%')"
    );
}
function deleteImage(image_id) {
    return db.query("DELETE FROM IMAGES WHERE IMAGES.id=$1", [image_id]);
}
function updateImage(
    id,
    title,
    url,
    description,
    hashtags,
    keywords,
    articles,
    blog
) {
    //INSERT the id of the last record from the table criteria
    return db.query(
        "UPDATE IMAGES set title = $2, url=$3, description=$4,hashtags=$5, keywords=$6, articles=$7,blog=$8 " +
            "WHERE id= $1 RETURNING id",
        [id, title, url, description, hashtags, keywords, articles, blog]
    );
}
function uploadImage(url) {
    return db.query("INSERT into IMAGES(url) VALUES($1) RETURNING id", [url]);
}

exports.getImagesByCriteria = getImagesByCriteria;
exports.getImages = getImages;
exports.getImageById = getImageById;
exports.deleteImage = deleteImage;
exports.updateImage = updateImage;
exports.uploadImage = uploadImage;
