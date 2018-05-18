import axios from "axios";
import events from "../events";

export const IMAGES_LIST = "IMAGES_LIST";
export const UPLOAD_IMAGE = "UPLOAD_IMAGE";
export const UPDATE_IMAGE = "UPDATE_IMAGE";
export const UPDATE_FIELD = "UPDATE_FIELD";
export const REQUEST_IMAGE = "REQUEST_IMAGE";
export const IMAGES_CRITERIA = "IMAGES_CRITERIA";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const OPEN_MODAL = "OPEN_MODAL";

export async function imagesList() {
    const { data } = await axios.get("/getimages");
    return {
        type: IMAGES_LIST,
        imageslist: data
    };
}
export async function requestImage(id) {
    const { data } = await axios.get("/image?id=" + id);
    return {
        type: REQUEST_IMAGE,
        imagedata: data
    };
}
export async function updateField(name, data) {
    return {
        type: UPDATE_FIELD,
        key: name,
        value: data
    };
}
export async function updateImage(imagedata) {
    const { data } = await axios.post("/updateimage", imagedata);
    return {
        type: UPDATE_IMAGE,
        imagedata: data
    };
}
export async function onCriteriaChange(criteria) {
    const { data } = await axios.get("/imagesbycriteria?criteria=" + criteria);
    return {
        type: IMAGES_CRITERIA,
        imageslist: data
    };
}
export async function uploadImage(formData) {
    const { data } = await axios.post("/uploadimage", formData);
    return {
        type: UPLOAD_IMAGE,
        imagedata: data
    };
}
export async function openModal(slotinfo) {
    return {
        type: OPEN_MODAL,
        slotinfo: slotinfo
    };
}

export async function closeModal(id, slotinfo) {
    return {
        type: CLOSE_MODAL,
        slotinfo: slotinfo,
        selectedImage: id
    };
}
