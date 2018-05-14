import axios from "axios";

export const IMAGES_LIST = "IMAGES_LIST";
export const REQUEST_IMAGE = "REQUEST_IMAGE";
export const UPLOAD_IMAGE = "UPLOAD_IMAGE";
export const UPDATE_IMAGE = "UPDATE_IMAGE";
export const DELETE_IMAGE = "DELETE_IMAGE";
export const UPDATE_FIELD = "UPDATE_FIELD";
export async function imagesList() {
    const { data } = await axios.get("/imageslist");
    return {
        type: IMAGES_LIST,
        imageslist: data
    };
}
export async function requestImage(id) {
    const { data } = await axios.get("/image", id);
    return {
        type: REQUEST_IMAGE,
        imagedata: data
    };
}
export async function updateField(data) {
    return {
        type: UPDATE_FIELD,
        field: data
    };
}
export async function updateImage() {
    const { data } = await axios.post("/updateimage");
    return {
        type: UPDATE_IMAGE,
        imageslist: data
    };
}
export async function uploadImage(formData) {
    console.log("into uploadImage action");
    const { data } = await axios.post("/uploadimage", formData);
    console.log("data : ", data);
    return {
        type: UPLOAD_IMAGE,
        imagedata: data
    };
}
export async function deleteImage() {
    const { data } = await axios.post("/deleteimage");
    return {
        type: DELETE_IMAGE,
        imageslist: data
    };
}
