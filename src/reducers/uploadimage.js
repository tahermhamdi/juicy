import { UPLOAD_IMAGE } from "../actions";

const initialState = {
    imagedata: []
};

export default function uploadimage(state = initialState, action) {
    switch (action.type) {
        case UPLOAD_IMAGE:
            return {
                imagedata: action.imagedata
            };

        default:
            return state;
    }
}
