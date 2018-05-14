import { UPDATE_IMAGE } from "../actions";

const initialState = {
    data: []
};

export default function updateimage(state = initialState, action) {
    switch (action.type) {
        case UPDATE_IMAGE:
            return {
                ...state,
                data: action.imageslist
            };

        default:
            return state;
    }
}
