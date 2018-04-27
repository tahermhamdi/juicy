import axios from "axios";

export const REQUEST_GIFS = "REQUEST_GIFS";
export const REQUEST_TRENDING = "REQUEST_TRENDING";
export const REQUEST_SINGLE = "REQUEST_SINGLE";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export function requestGifs(criteria = null) {
    //const data = request.get(`${API_URL}${term.replace(/\s/g, "+")}${API_KEY}`);
    const url = `https://api.giphy.com/v1/gifs/search?q=${criteria.replace(
        /\s/g,
        "+"
    )}&api_key=dc6zaTOxFJmzC&limit=20`;

    const data = axios.get(url);
    return {
        type: REQUEST_GIFS,
        payload: data
    };
}
export function requestTrending() {
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=5`;

    const data = axios.get(url);
    return {
        type: REQUEST_TRENDING,
        payload: data
    };
}
export function openModal(gif) {
    return {
        type: OPEN_MODAL,
        gif
    };
}

export function closeModal() {
    return {
        type: CLOSE_MODAL
    };
}
