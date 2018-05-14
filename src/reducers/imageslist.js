import { IMAGES_LIST } from "../actions";

const initialState = {
    data: []
};

export default function imageslist(state = initialState, action) {
    switch (action.type) {
        case IMAGES_LIST:
            return {
                ...state,
                data: action.imageslist
            };

        default:
            return state;
    }
}
